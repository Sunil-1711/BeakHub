PGDMP  7    "                }            grafana "   13.15 (Ubuntu 13.15-1.pgdg22.04+1)    17.0 7    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                           false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                           false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                           false            �           1262    16659    grafana    DATABASE     s   CREATE DATABASE grafana WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf-8';
    DROP DATABASE grafana;
                  	   beakadmin    false            
            2615    16632    metric_helpers    SCHEMA        CREATE SCHEMA metric_helpers;
    DROP SCHEMA metric_helpers;
                     postgres    false            �           0    0    SCHEMA metric_helpers    ACL     c   GRANT USAGE ON SCHEMA metric_helpers TO admin;
GRANT USAGE ON SCHEMA metric_helpers TO robot_zmon;
                        postgres    false    10                        2615    16661    pooler    SCHEMA        CREATE SCHEMA pooler;
    DROP SCHEMA pooler;
                     postgres    false            �           0    0    SCHEMA pooler    ACL     (   GRANT USAGE ON SCHEMA pooler TO pooler;
                        postgres    false    11            	            2615    16589    user_management    SCHEMA        CREATE SCHEMA user_management;
    DROP SCHEMA user_management;
                     postgres    false            �           0    0    SCHEMA user_management    ACL     0   GRANT USAGE ON SCHEMA user_management TO admin;
                        postgres    false    9            D           1255    16638    get_btree_bloat_approx()    FUNCTION     �  CREATE FUNCTION metric_helpers.get_btree_bloat_approx(OUT i_database name, OUT i_schema_name name, OUT i_table_name name, OUT i_index_name name, OUT i_real_size numeric, OUT i_extra_size numeric, OUT i_extra_ratio double precision, OUT i_fill_factor integer, OUT i_bloat_size double precision, OUT i_bloat_ratio double precision, OUT i_is_na boolean) RETURNS SETOF record
    LANGUAGE sql IMMUTABLE STRICT SECURITY DEFINER
    SET search_path TO 'pg_catalog'
    AS $$
SELECT current_database(), nspname AS schemaname, tblname, idxname, bs*(relpages)::bigint AS real_size,
  bs*(relpages-est_pages)::bigint AS extra_size,
  100 * (relpages-est_pages)::float / relpages AS extra_ratio,
  fillfactor,
  CASE WHEN relpages > est_pages_ff
    THEN bs*(relpages-est_pages_ff)
    ELSE 0
  END AS bloat_size,
  100 * (relpages-est_pages_ff)::float / relpages AS bloat_ratio,
  is_na
  -- , 100-(pst).avg_leaf_density AS pst_avg_bloat, est_pages, index_tuple_hdr_bm, maxalign, pagehdr, nulldatawidth, nulldatahdrwidth, reltuples, relpages -- (DEBUG INFO)
FROM (
  SELECT coalesce(1 +
         ceil(reltuples/floor((bs-pageopqdata-pagehdr)/(4+nulldatahdrwidth)::float)), 0 -- ItemIdData size + computed avg size of a tuple (nulldatahdrwidth)
      ) AS est_pages,
      coalesce(1 +
         ceil(reltuples/floor((bs-pageopqdata-pagehdr)*fillfactor/(100*(4+nulldatahdrwidth)::float))), 0
      ) AS est_pages_ff,
      bs, nspname, tblname, idxname, relpages, fillfactor, is_na
      -- , pgstatindex(idxoid) AS pst, index_tuple_hdr_bm, maxalign, pagehdr, nulldatawidth, nulldatahdrwidth, reltuples -- (DEBUG INFO)
  FROM (
      SELECT maxalign, bs, nspname, tblname, idxname, reltuples, relpages, idxoid, fillfactor,
            ( index_tuple_hdr_bm +
                maxalign - CASE -- Add padding to the index tuple header to align on MAXALIGN
                  WHEN index_tuple_hdr_bm%maxalign = 0 THEN maxalign
                  ELSE index_tuple_hdr_bm%maxalign
                END
              + nulldatawidth + maxalign - CASE -- Add padding to the data to align on MAXALIGN
                  WHEN nulldatawidth = 0 THEN 0
                  WHEN nulldatawidth::integer%maxalign = 0 THEN maxalign
                  ELSE nulldatawidth::integer%maxalign
                END
            )::numeric AS nulldatahdrwidth, pagehdr, pageopqdata, is_na
            -- , index_tuple_hdr_bm, nulldatawidth -- (DEBUG INFO)
      FROM (
          SELECT n.nspname, ct.relname AS tblname, i.idxname, i.reltuples, i.relpages,
              i.idxoid, i.fillfactor, current_setting('block_size')::numeric AS bs,
              CASE -- MAXALIGN: 4 on 32bits, 8 on 64bits (and mingw32 ?)
                WHEN version() ~ 'mingw32' OR version() ~ '64-bit|x86_64|ppc64|ia64|amd64' THEN 8
                ELSE 4
              END AS maxalign,
              /* per page header, fixed size: 20 for 7.X, 24 for others */
              24 AS pagehdr,
              /* per page btree opaque data */
              16 AS pageopqdata,
              /* per tuple header: add IndexAttributeBitMapData if some cols are null-able */
              CASE WHEN max(coalesce(s.stanullfrac,0)) = 0
                  THEN 2 -- IndexTupleData size
                  ELSE 2 + (( 32 + 8 - 1 ) / 8) -- IndexTupleData size + IndexAttributeBitMapData size ( max num filed per index + 8 - 1 /8)
              END AS index_tuple_hdr_bm,
              /* data len: we remove null values save space using it fractionnal part from stats */
              sum( (1-coalesce(s.stanullfrac, 0)) * coalesce(s.stawidth, 1024)) AS nulldatawidth,
              max( CASE WHEN a.atttypid = 'pg_catalog.name'::regtype THEN 1 ELSE 0 END ) > 0 AS is_na
          FROM (
              SELECT idxname, reltuples, relpages, tbloid, idxoid, fillfactor,
                  CASE WHEN indkey[i]=0 THEN idxoid ELSE tbloid END AS att_rel,
                  CASE WHEN indkey[i]=0 THEN i ELSE indkey[i] END AS att_pos
              FROM (
                  SELECT idxname, reltuples, relpages, tbloid, idxoid, fillfactor, indkey, generate_series(1,indnatts) AS i
                  FROM (
                      SELECT ci.relname AS idxname, ci.reltuples, ci.relpages, i.indrelid AS tbloid,
                          i.indexrelid AS idxoid,
                          coalesce(substring(
                              array_to_string(ci.reloptions, ' ')
                              from 'fillfactor=([0-9]+)')::smallint, 90) AS fillfactor,
                          i.indnatts,
                          string_to_array(textin(int2vectorout(i.indkey)),' ')::int[] AS indkey
                      FROM pg_index i
                      JOIN pg_class ci ON ci.oid=i.indexrelid
                      WHERE ci.relam=(SELECT oid FROM pg_am WHERE amname = 'btree')
                        AND ci.relpages > 0
                  ) AS idx_data
              ) AS idx_data_cross
          ) i
          JOIN pg_attribute a ON a.attrelid = i.att_rel
                             AND a.attnum = i.att_pos
          JOIN pg_statistic s ON s.starelid = i.att_rel
                             AND s.staattnum = i.att_pos
          JOIN pg_class ct ON ct.oid = i.tbloid
          JOIN pg_namespace n ON ct.relnamespace = n.oid
          GROUP BY 1,2,3,4,5,6,7,8,9,10
      ) AS rows_data_stats
  ) AS rows_hdr_pdg_stats
) AS relation_stats;
$$;
 ^  DROP FUNCTION metric_helpers.get_btree_bloat_approx(OUT i_database name, OUT i_schema_name name, OUT i_table_name name, OUT i_index_name name, OUT i_real_size numeric, OUT i_extra_size numeric, OUT i_extra_ratio double precision, OUT i_fill_factor integer, OUT i_bloat_size double precision, OUT i_bloat_ratio double precision, OUT i_is_na boolean);
       metric_helpers               postgres    false    10            �           0    0 H  FUNCTION get_btree_bloat_approx(OUT i_database name, OUT i_schema_name name, OUT i_table_name name, OUT i_index_name name, OUT i_real_size numeric, OUT i_extra_size numeric, OUT i_extra_ratio double precision, OUT i_fill_factor integer, OUT i_bloat_size double precision, OUT i_bloat_ratio double precision, OUT i_is_na boolean)    ACL     V  REVOKE ALL ON FUNCTION metric_helpers.get_btree_bloat_approx(OUT i_database name, OUT i_schema_name name, OUT i_table_name name, OUT i_index_name name, OUT i_real_size numeric, OUT i_extra_size numeric, OUT i_extra_ratio double precision, OUT i_fill_factor integer, OUT i_bloat_size double precision, OUT i_bloat_ratio double precision, OUT i_is_na boolean) FROM PUBLIC;
GRANT ALL ON FUNCTION metric_helpers.get_btree_bloat_approx(OUT i_database name, OUT i_schema_name name, OUT i_table_name name, OUT i_index_name name, OUT i_real_size numeric, OUT i_extra_size numeric, OUT i_extra_ratio double precision, OUT i_fill_factor integer, OUT i_bloat_size double precision, OUT i_bloat_ratio double precision, OUT i_is_na boolean) TO admin;
GRANT ALL ON FUNCTION metric_helpers.get_btree_bloat_approx(OUT i_database name, OUT i_schema_name name, OUT i_table_name name, OUT i_index_name name, OUT i_real_size numeric, OUT i_extra_size numeric, OUT i_extra_ratio double precision, OUT i_fill_factor integer, OUT i_bloat_size double precision, OUT i_bloat_ratio double precision, OUT i_is_na boolean) TO robot_zmon;
          metric_helpers               postgres    false    324            C           1255    8448317 0   get_nearly_exhausted_sequences(double precision)    FUNCTION     !  CREATE FUNCTION metric_helpers.get_nearly_exhausted_sequences(threshold double precision, OUT schemaname name, OUT sequencename name, OUT seq_percent_used numeric) RETURNS SETOF record
    LANGUAGE sql STRICT SECURITY DEFINER
    SET search_path TO 'pg_catalog'
    AS $$
SELECT *
FROM (
  SELECT 
    schemaname,
    sequencename,
    round(abs(
      ceil((abs(last_value::numeric - start_value) + 1) / increment_by) / 
        floor((CASE WHEN increment_by > 0
                    THEN (max_value::numeric - start_value)
                    ELSE (start_value::numeric - min_value)
                    END + 1) / increment_by
              ) * 100 
      ), 
    2) AS seq_percent_used
  FROM pg_sequences
  WHERE NOT CYCLE AND last_value IS NOT NULL
) AS s
WHERE seq_percent_used >= threshold;
$$;
 �   DROP FUNCTION metric_helpers.get_nearly_exhausted_sequences(threshold double precision, OUT schemaname name, OUT sequencename name, OUT seq_percent_used numeric);
       metric_helpers               postgres    false    10            �           0    0 �   FUNCTION get_nearly_exhausted_sequences(threshold double precision, OUT schemaname name, OUT sequencename name, OUT seq_percent_used numeric)    ACL     %  REVOKE ALL ON FUNCTION metric_helpers.get_nearly_exhausted_sequences(threshold double precision, OUT schemaname name, OUT sequencename name, OUT seq_percent_used numeric) FROM PUBLIC;
GRANT ALL ON FUNCTION metric_helpers.get_nearly_exhausted_sequences(threshold double precision, OUT schemaname name, OUT sequencename name, OUT seq_percent_used numeric) TO admin;
GRANT ALL ON FUNCTION metric_helpers.get_nearly_exhausted_sequences(threshold double precision, OUT schemaname name, OUT sequencename name, OUT seq_percent_used numeric) TO robot_zmon;
          metric_helpers               postgres    false    323            G           1255    16633    get_table_bloat_approx()    FUNCTION     w  CREATE FUNCTION metric_helpers.get_table_bloat_approx(OUT t_database name, OUT t_schema_name name, OUT t_table_name name, OUT t_real_size numeric, OUT t_extra_size double precision, OUT t_extra_ratio double precision, OUT t_fill_factor integer, OUT t_bloat_size double precision, OUT t_bloat_ratio double precision, OUT t_is_na boolean) RETURNS SETOF record
    LANGUAGE sql IMMUTABLE STRICT SECURITY DEFINER
    SET search_path TO 'pg_catalog'
    AS $$
SELECT
  current_database(),
  schemaname,
  tblname,
  (bs*tblpages) AS real_size,
  ((tblpages-est_tblpages)*bs) AS extra_size,
  CASE WHEN tblpages - est_tblpages > 0
    THEN 100 * (tblpages - est_tblpages)/tblpages::float
    ELSE 0
  END AS extra_ratio,
  fillfactor,
  CASE WHEN tblpages - est_tblpages_ff > 0
    THEN (tblpages-est_tblpages_ff)*bs
    ELSE 0
  END AS bloat_size,
  CASE WHEN tblpages - est_tblpages_ff > 0
    THEN 100 * (tblpages - est_tblpages_ff)/tblpages::float
    ELSE 0
  END AS bloat_ratio,
  is_na
FROM (
  SELECT ceil( reltuples / ( (bs-page_hdr)/tpl_size ) ) + ceil( toasttuples / 4 ) AS est_tblpages,
    ceil( reltuples / ( (bs-page_hdr)*fillfactor/(tpl_size*100) ) ) + ceil( toasttuples / 4 ) AS est_tblpages_ff,
    tblpages, fillfactor, bs, tblid, schemaname, tblname, heappages, toastpages, is_na
    -- , tpl_hdr_size, tpl_data_size, pgstattuple(tblid) AS pst -- (DEBUG INFO)
  FROM (
    SELECT
      ( 4 + tpl_hdr_size + tpl_data_size + (2*ma)
        - CASE WHEN tpl_hdr_size%ma = 0 THEN ma ELSE tpl_hdr_size%ma END
        - CASE WHEN ceil(tpl_data_size)::int%ma = 0 THEN ma ELSE ceil(tpl_data_size)::int%ma END
      ) AS tpl_size, bs - page_hdr AS size_per_block, (heappages + toastpages) AS tblpages, heappages,
      toastpages, reltuples, toasttuples, bs, page_hdr, tblid, schemaname, tblname, fillfactor, is_na
      -- , tpl_hdr_size, tpl_data_size
    FROM (
      SELECT
        tbl.oid AS tblid, ns.nspname AS schemaname, tbl.relname AS tblname, tbl.reltuples,
        tbl.relpages AS heappages, coalesce(toast.relpages, 0) AS toastpages,
        coalesce(toast.reltuples, 0) AS toasttuples,
        coalesce(substring(
          array_to_string(tbl.reloptions, ' ')
          FROM 'fillfactor=([0-9]+)')::smallint, 100) AS fillfactor,
        current_setting('block_size')::numeric AS bs,
        CASE WHEN version()~'mingw32' OR version()~'64-bit|x86_64|ppc64|ia64|amd64' THEN 8 ELSE 4 END AS ma,
        24 AS page_hdr,
        23 + CASE WHEN MAX(coalesce(s.null_frac,0)) > 0 THEN ( 7 + count(s.attname) ) / 8 ELSE 0::int END
           + CASE WHEN bool_or(att.attname = 'oid' and att.attnum < 0) THEN 4 ELSE 0 END AS tpl_hdr_size,
        sum( (1-coalesce(s.null_frac, 0)) * coalesce(s.avg_width, 0) ) AS tpl_data_size,
        bool_or(att.atttypid = 'pg_catalog.name'::regtype)
          OR sum(CASE WHEN att.attnum > 0 THEN 1 ELSE 0 END) <> count(s.attname) AS is_na
      FROM pg_attribute AS att
        JOIN pg_class AS tbl ON att.attrelid = tbl.oid
        JOIN pg_namespace AS ns ON ns.oid = tbl.relnamespace
        LEFT JOIN pg_stats AS s ON s.schemaname=ns.nspname
          AND s.tablename = tbl.relname AND s.inherited=false AND s.attname=att.attname
        LEFT JOIN pg_class AS toast ON tbl.reltoastrelid = toast.oid
      WHERE NOT att.attisdropped
        AND tbl.relkind = 'r'
      GROUP BY 1,2,3,4,5,6,7,8,9,10
      ORDER BY 2,3
    ) AS s
  ) AS s2
) AS s3 WHERE schemaname NOT LIKE 'information_schema';
$$;
 P  DROP FUNCTION metric_helpers.get_table_bloat_approx(OUT t_database name, OUT t_schema_name name, OUT t_table_name name, OUT t_real_size numeric, OUT t_extra_size double precision, OUT t_extra_ratio double precision, OUT t_fill_factor integer, OUT t_bloat_size double precision, OUT t_bloat_ratio double precision, OUT t_is_na boolean);
       metric_helpers               postgres    false            �           0    0 :  FUNCTION get_table_bloat_approx(OUT t_database name, OUT t_schema_name name, OUT t_table_name name, OUT t_real_size numeric, OUT t_extra_size double precision, OUT t_extra_ratio double precision, OUT t_fill_factor integer, OUT t_bloat_size double precision, OUT t_bloat_ratio double precision, OUT t_is_na boolean)    ACL     ,  REVOKE ALL ON FUNCTION metric_helpers.get_table_bloat_approx(OUT t_database name, OUT t_schema_name name, OUT t_table_name name, OUT t_real_size numeric, OUT t_extra_size double precision, OUT t_extra_ratio double precision, OUT t_fill_factor integer, OUT t_bloat_size double precision, OUT t_bloat_ratio double precision, OUT t_is_na boolean) FROM PUBLIC;
GRANT ALL ON FUNCTION metric_helpers.get_table_bloat_approx(OUT t_database name, OUT t_schema_name name, OUT t_table_name name, OUT t_real_size numeric, OUT t_extra_size double precision, OUT t_extra_ratio double precision, OUT t_fill_factor integer, OUT t_bloat_size double precision, OUT t_bloat_ratio double precision, OUT t_is_na boolean) TO admin;
GRANT ALL ON FUNCTION metric_helpers.get_table_bloat_approx(OUT t_database name, OUT t_schema_name name, OUT t_table_name name, OUT t_real_size numeric, OUT t_extra_size double precision, OUT t_extra_ratio double precision, OUT t_fill_factor integer, OUT t_bloat_size double precision, OUT t_bloat_ratio double precision, OUT t_is_na boolean) TO robot_zmon;
          metric_helpers               postgres    false    327            H           1255    16633    get_table_bloat_approx()    FUNCTION     w  CREATE FUNCTION metric_helpers.get_table_bloat_approx(OUT t_database name, OUT t_schema_name name, OUT t_table_name name, OUT t_real_size numeric, OUT t_extra_size double precision, OUT t_extra_ratio double precision, OUT t_fill_factor integer, OUT t_bloat_size double precision, OUT t_bloat_ratio double precision, OUT t_is_na boolean) RETURNS SETOF record
    LANGUAGE sql IMMUTABLE STRICT SECURITY DEFINER
    SET search_path TO 'pg_catalog'
    AS $$
SELECT
  current_database(),
  schemaname,
  tblname,
  (bs*tblpages) AS real_size,
  ((tblpages-est_tblpages)*bs) AS extra_size,
  CASE WHEN tblpages - est_tblpages > 0
    THEN 100 * (tblpages - est_tblpages)/tblpages::float
    ELSE 0
  END AS extra_ratio,
  fillfactor,
  CASE WHEN tblpages - est_tblpages_ff > 0
    THEN (tblpages-est_tblpages_ff)*bs
    ELSE 0
  END AS bloat_size,
  CASE WHEN tblpages - est_tblpages_ff > 0
    THEN 100 * (tblpages - est_tblpages_ff)/tblpages::float
    ELSE 0
  END AS bloat_ratio,
  is_na
FROM (
  SELECT ceil( reltuples / ( (bs-page_hdr)/tpl_size ) ) + ceil( toasttuples / 4 ) AS est_tblpages,
    ceil( reltuples / ( (bs-page_hdr)*fillfactor/(tpl_size*100) ) ) + ceil( toasttuples / 4 ) AS est_tblpages_ff,
    tblpages, fillfactor, bs, tblid, schemaname, tblname, heappages, toastpages, is_na
    -- , tpl_hdr_size, tpl_data_size, pgstattuple(tblid) AS pst -- (DEBUG INFO)
  FROM (
    SELECT
      ( 4 + tpl_hdr_size + tpl_data_size + (2*ma)
        - CASE WHEN tpl_hdr_size%ma = 0 THEN ma ELSE tpl_hdr_size%ma END
        - CASE WHEN ceil(tpl_data_size)::int%ma = 0 THEN ma ELSE ceil(tpl_data_size)::int%ma END
      ) AS tpl_size, bs - page_hdr AS size_per_block, (heappages + toastpages) AS tblpages, heappages,
      toastpages, reltuples, toasttuples, bs, page_hdr, tblid, schemaname, tblname, fillfactor, is_na
      -- , tpl_hdr_size, tpl_data_size
    FROM (
      SELECT
        tbl.oid AS tblid, ns.nspname AS schemaname, tbl.relname AS tblname, tbl.reltuples,
        tbl.relpages AS heappages, coalesce(toast.relpages, 0) AS toastpages,
        coalesce(toast.reltuples, 0) AS toasttuples,
        coalesce(substring(
          array_to_string(tbl.reloptions, ' ')
          FROM 'fillfactor=([0-9]+)')::smallint, 100) AS fillfactor,
        current_setting('block_size')::numeric AS bs,
        CASE WHEN version()~'mingw32' OR version()~'64-bit|x86_64|ppc64|ia64|amd64' THEN 8 ELSE 4 END AS ma,
        24 AS page_hdr,
        23 + CASE WHEN MAX(coalesce(s.null_frac,0)) > 0 THEN ( 7 + count(s.attname) ) / 8 ELSE 0::int END
           + CASE WHEN bool_or(att.attname = 'oid' and att.attnum < 0) THEN 4 ELSE 0 END AS tpl_hdr_size,
        sum( (1-coalesce(s.null_frac, 0)) * coalesce(s.avg_width, 0) ) AS tpl_data_size,
        bool_or(att.atttypid = 'pg_catalog.name'::regtype)
          OR sum(CASE WHEN att.attnum > 0 THEN 1 ELSE 0 END) <> count(s.attname) AS is_na
      FROM pg_attribute AS att
        JOIN pg_class AS tbl ON att.attrelid = tbl.oid
        JOIN pg_namespace AS ns ON ns.oid = tbl.relnamespace
        LEFT JOIN pg_stats AS s ON s.schemaname=ns.nspname
          AND s.tablename = tbl.relname AND s.inherited=false AND s.attname=att.attname
        LEFT JOIN pg_class AS toast ON tbl.reltoastrelid = toast.oid
      WHERE NOT att.attisdropped
        AND tbl.relkind = 'r'
      GROUP BY 1,2,3,4,5,6,7,8,9,10
      ORDER BY 2,3
    ) AS s
  ) AS s2
) AS s3 WHERE schemaname NOT LIKE 'information_schema';
$$;
 P  DROP FUNCTION metric_helpers.get_table_bloat_approx(OUT t_database name, OUT t_schema_name name, OUT t_table_name name, OUT t_real_size numeric, OUT t_extra_size double precision, OUT t_extra_ratio double precision, OUT t_fill_factor integer, OUT t_bloat_size double precision, OUT t_bloat_ratio double precision, OUT t_is_na boolean);
       metric_helpers               postgres    false    10            �           0    0 :  FUNCTION get_table_bloat_approx(OUT t_database name, OUT t_schema_name name, OUT t_table_name name, OUT t_real_size numeric, OUT t_extra_size double precision, OUT t_extra_ratio double precision, OUT t_fill_factor integer, OUT t_bloat_size double precision, OUT t_bloat_ratio double precision, OUT t_is_na boolean)    ACL     ,  REVOKE ALL ON FUNCTION metric_helpers.get_table_bloat_approx(OUT t_database name, OUT t_schema_name name, OUT t_table_name name, OUT t_real_size numeric, OUT t_extra_size double precision, OUT t_extra_ratio double precision, OUT t_fill_factor integer, OUT t_bloat_size double precision, OUT t_bloat_ratio double precision, OUT t_is_na boolean) FROM PUBLIC;
GRANT ALL ON FUNCTION metric_helpers.get_table_bloat_approx(OUT t_database name, OUT t_schema_name name, OUT t_table_name name, OUT t_real_size numeric, OUT t_extra_size double precision, OUT t_extra_ratio double precision, OUT t_fill_factor integer, OUT t_bloat_size double precision, OUT t_bloat_ratio double precision, OUT t_is_na boolean) TO admin;
GRANT ALL ON FUNCTION metric_helpers.get_table_bloat_approx(OUT t_database name, OUT t_schema_name name, OUT t_table_name name, OUT t_real_size numeric, OUT t_extra_size double precision, OUT t_extra_ratio double precision, OUT t_fill_factor integer, OUT t_bloat_size double precision, OUT t_bloat_ratio double precision, OUT t_is_na boolean) TO robot_zmon;
          metric_helpers               postgres    false    328            B           1255    16647    pg_stat_statements(boolean)    FUNCTION     �   CREATE FUNCTION metric_helpers.pg_stat_statements(showtext boolean) RETURNS SETOF public.pg_stat_statements
    LANGUAGE sql IMMUTABLE STRICT SECURITY DEFINER
    AS $$
  SELECT * FROM public.pg_stat_statements(showtext);
$$;
 C   DROP FUNCTION metric_helpers.pg_stat_statements(showtext boolean);
       metric_helpers               postgres    false    10            �           0    0 -   FUNCTION pg_stat_statements(showtext boolean)    ACL       REVOKE ALL ON FUNCTION metric_helpers.pg_stat_statements(showtext boolean) FROM PUBLIC;
GRANT ALL ON FUNCTION metric_helpers.pg_stat_statements(showtext boolean) TO admin;
GRANT ALL ON FUNCTION metric_helpers.pg_stat_statements(showtext boolean) TO robot_zmon;
          metric_helpers               postgres    false    322            J           1255    16662    user_lookup(text)    FUNCTION       CREATE FUNCTION pooler.user_lookup(i_username text, OUT uname text, OUT phash text) RETURNS record
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
		BEGIN
			SELECT usename, passwd FROM pg_catalog.pg_shadow
			WHERE usename = i_username INTO uname, phash;
			RETURN;
		END;
		$$;
 S   DROP FUNCTION pooler.user_lookup(i_username text, OUT uname text, OUT phash text);
       pooler               postgres    false    11            �           0    0 E   FUNCTION user_lookup(i_username text, OUT uname text, OUT phash text)    ACL     �   REVOKE ALL ON FUNCTION pooler.user_lookup(i_username text, OUT uname text, OUT phash text) FROM PUBLIC;
GRANT ALL ON FUNCTION pooler.user_lookup(i_username text, OUT uname text, OUT phash text) TO pooler;
          pooler               postgres    false    330            8           1255    16591    create_application_user(text)    FUNCTION     ]  CREATE FUNCTION user_management.create_application_user(username text) RETURNS text
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO 'pg_catalog'
    AS $_$
DECLARE
    pw text;
BEGIN
    SELECT user_management.random_password(20) INTO pw;
    EXECUTE format($$ CREATE USER %I WITH PASSWORD %L $$, username, pw);
    RETURN pw;
END
$_$;
 F   DROP FUNCTION user_management.create_application_user(username text);
       user_management               postgres    false    9    9            �           0    0 /   FUNCTION create_application_user(username text)    COMMENT     �   COMMENT ON FUNCTION user_management.create_application_user(username text) IS 'Creates a user that can login, sets the password to a strong random one,
which is then returned';
          user_management               postgres    false    312            �           0    0 /   FUNCTION create_application_user(username text)    ACL     �   REVOKE ALL ON FUNCTION user_management.create_application_user(username text) FROM PUBLIC;
GRANT ALL ON FUNCTION user_management.create_application_user(username text) TO admin;
          user_management               postgres    false    312            >           1255    16594 6   create_application_user_or_change_password(text, text)    FUNCTION     �  CREATE FUNCTION user_management.create_application_user_or_change_password(username text, password text) RETURNS void
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO 'pg_catalog'
    AS $_$
BEGIN
    PERFORM 1 FROM pg_roles WHERE rolname = username;

    IF FOUND
    THEN
        EXECUTE format($$ ALTER ROLE %I WITH PASSWORD %L $$, username, password);
    ELSE
        EXECUTE format($$ CREATE USER %I WITH PASSWORD %L $$, username, password);
    END IF;
END
$_$;
 h   DROP FUNCTION user_management.create_application_user_or_change_password(username text, password text);
       user_management               postgres    false    9            �           0    0 Q   FUNCTION create_application_user_or_change_password(username text, password text)    COMMENT     .  COMMENT ON FUNCTION user_management.create_application_user_or_change_password(username text, password text) IS 'USE THIS ONLY IN EMERGENCY!  The password will appear in the DB logs.
Creates a user that can login, sets the password to the one provided.
If the user already exists, sets its password.';
          user_management               postgres    false    318            �           0    0 Q   FUNCTION create_application_user_or_change_password(username text, password text)    ACL     �   REVOKE ALL ON FUNCTION user_management.create_application_user_or_change_password(username text, password text) FROM PUBLIC;
GRANT ALL ON FUNCTION user_management.create_application_user_or_change_password(username text, password text) TO admin;
          user_management               postgres    false    318            @           1255    16593    create_role(text)    FUNCTION     S  CREATE FUNCTION user_management.create_role(rolename text) RETURNS void
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO 'pg_catalog'
    AS $_$
BEGIN
    -- set ADMIN to the admin user, so every member of admin can GRANT these roles to each other
    EXECUTE format($$ CREATE ROLE %I WITH ADMIN admin $$, rolename);
END;
$_$;
 :   DROP FUNCTION user_management.create_role(rolename text);
       user_management               postgres    false    9            �           0    0 #   FUNCTION create_role(rolename text)    COMMENT     �   COMMENT ON FUNCTION user_management.create_role(rolename text) IS 'Creates a role that cannot log in, but can be used to set up fine-grained privileges';
          user_management               postgres    false    320            �           0    0 #   FUNCTION create_role(rolename text)    ACL     �   REVOKE ALL ON FUNCTION user_management.create_role(rolename text) FROM PUBLIC;
GRANT ALL ON FUNCTION user_management.create_role(rolename text) TO admin;
          user_management               postgres    false    320            <           1255    16592    create_user(text)    FUNCTION     G  CREATE FUNCTION user_management.create_user(username text) RETURNS void
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO 'pg_catalog'
    AS $_$
BEGIN
    EXECUTE format($$ CREATE USER %I IN ROLE zalandos, admin $$, username);
    EXECUTE format($$ ALTER ROLE %I SET log_statement TO 'all' $$, username);
END;
$_$;
 :   DROP FUNCTION user_management.create_user(username text);
       user_management               postgres    false    9            �           0    0 #   FUNCTION create_user(username text)    COMMENT     �   COMMENT ON FUNCTION user_management.create_user(username text) IS 'Creates a user that is supposed to be a human, to be authenticated without a password';
          user_management               postgres    false    316            �           0    0 #   FUNCTION create_user(username text)    ACL     �   REVOKE ALL ON FUNCTION user_management.create_user(username text) FROM PUBLIC;
GRANT ALL ON FUNCTION user_management.create_user(username text) TO admin;
          user_management               postgres    false    316            ?           1255    16597    drop_role(text)    FUNCTION     �   CREATE FUNCTION user_management.drop_role(username text) RETURNS void
    LANGUAGE sql SECURITY DEFINER
    SET search_path TO 'pg_catalog'
    AS $$
SELECT user_management.drop_user(username);
$$;
 8   DROP FUNCTION user_management.drop_role(username text);
       user_management               postgres    false    9            �           0    0 !   FUNCTION drop_role(username text)    COMMENT     �   COMMENT ON FUNCTION user_management.drop_role(username text) IS 'Drop a human or application user.  Intended for cleanup (either after team changes or mistakes in role setup).
Roles (= users) that own database objects cannot be dropped.';
          user_management               postgres    false    319            �           0    0 !   FUNCTION drop_role(username text)    ACL     �   REVOKE ALL ON FUNCTION user_management.drop_role(username text) FROM PUBLIC;
GRANT ALL ON FUNCTION user_management.drop_role(username text) TO admin;
          user_management               postgres    false    319            ;           1255    16596    drop_user(text)    FUNCTION     �   CREATE FUNCTION user_management.drop_user(username text) RETURNS void
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO 'pg_catalog'
    AS $_$
BEGIN
    EXECUTE format($$ DROP ROLE %I $$, username);
END
$_$;
 8   DROP FUNCTION user_management.drop_user(username text);
       user_management               postgres    false    9            �           0    0 !   FUNCTION drop_user(username text)    COMMENT     �   COMMENT ON FUNCTION user_management.drop_user(username text) IS 'Drop a human or application user.  Intended for cleanup (either after team changes or mistakes in role setup).
Roles (= users) that own database objects cannot be dropped.';
          user_management               postgres    false    315            �           0    0 !   FUNCTION drop_user(username text)    ACL     �   REVOKE ALL ON FUNCTION user_management.drop_user(username text) FROM PUBLIC;
GRANT ALL ON FUNCTION user_management.drop_user(username text) TO admin;
          user_management               postgres    false    315            :           1255    16590    random_password(integer)    FUNCTION     �  CREATE FUNCTION user_management.random_password(length integer) RETURNS text
    LANGUAGE sql
    SET search_path TO 'pg_catalog'
    AS $$
WITH chars (c) AS (
    SELECT chr(33)
    UNION ALL
    SELECT chr(i) FROM generate_series (35, 38) AS t (i)
    UNION ALL
    SELECT chr(i) FROM generate_series (42, 90) AS t (i)
    UNION ALL
    SELECT chr(i) FROM generate_series (97, 122) AS t (i)
),
bricks (b) AS (
    -- build a pool of chars (the size will be the number of chars above times length)
    -- and shuffle it
    SELECT c FROM chars, generate_series(1, length) ORDER BY random()
)
SELECT substr(string_agg(b, ''), 1, length) FROM bricks;
$$;
 ?   DROP FUNCTION user_management.random_password(length integer);
       user_management               postgres    false    9    9            =           1255    16595    revoke_admin(text)    FUNCTION     �   CREATE FUNCTION user_management.revoke_admin(username text) RETURNS void
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO 'pg_catalog'
    AS $_$
BEGIN
    EXECUTE format($$ REVOKE admin FROM %I $$, username);
END
$_$;
 ;   DROP FUNCTION user_management.revoke_admin(username text);
       user_management               postgres    false    9            �           0    0 $   FUNCTION revoke_admin(username text)    COMMENT     �   COMMENT ON FUNCTION user_management.revoke_admin(username text) IS 'Use this function to make a human user less privileged,
ie. when you want to grant someone read privileges only';
          user_management               postgres    false    317            �           0    0 $   FUNCTION revoke_admin(username text)    ACL     �   REVOKE ALL ON FUNCTION user_management.revoke_admin(username text) FROM PUBLIC;
GRANT ALL ON FUNCTION user_management.revoke_admin(username text) TO admin;
          user_management               postgres    false    317            A           1255    16598    terminate_backend(integer)    FUNCTION     �   CREATE FUNCTION user_management.terminate_backend(pid integer) RETURNS boolean
    LANGUAGE sql SECURITY DEFINER
    SET search_path TO 'pg_catalog'
    AS $$
SELECT pg_terminate_backend(pid);
$$;
 >   DROP FUNCTION user_management.terminate_backend(pid integer);
       user_management               postgres    false    9            �           0    0 '   FUNCTION terminate_backend(pid integer)    COMMENT     =  COMMENT ON FUNCTION user_management.terminate_backend(pid integer) IS 'When there is a process causing harm, you can kill it using this function.  Get the pid from pg_stat_activity
(be careful to match the user name (usename) and the query, in order not to kill innocent kittens) and pass it to terminate_backend()';
          user_management               postgres    false    321            �           0    0 '   FUNCTION terminate_backend(pid integer)    ACL     �   REVOKE ALL ON FUNCTION user_management.terminate_backend(pid integer) FROM PUBLIC;
GRANT ALL ON FUNCTION user_management.terminate_backend(pid integer) TO admin;
          user_management               postgres    false    321            �            1259    16643    index_bloat    VIEW     �  CREATE VIEW metric_helpers.index_bloat AS
 SELECT get_btree_bloat_approx.i_database,
    get_btree_bloat_approx.i_schema_name,
    get_btree_bloat_approx.i_table_name,
    get_btree_bloat_approx.i_index_name,
    get_btree_bloat_approx.i_real_size,
    get_btree_bloat_approx.i_extra_size,
    get_btree_bloat_approx.i_extra_ratio,
    get_btree_bloat_approx.i_fill_factor,
    get_btree_bloat_approx.i_bloat_size,
    get_btree_bloat_approx.i_bloat_ratio,
    get_btree_bloat_approx.i_is_na
   FROM metric_helpers.get_btree_bloat_approx() get_btree_bloat_approx(i_database, i_schema_name, i_table_name, i_index_name, i_real_size, i_extra_size, i_extra_ratio, i_fill_factor, i_bloat_size, i_bloat_ratio, i_is_na);
 &   DROP VIEW metric_helpers.index_bloat;
       metric_helpers       v       postgres    false    324    10            �           0    0    TABLE index_bloat    ACL     {   GRANT SELECT ON TABLE metric_helpers.index_bloat TO admin;
GRANT SELECT ON TABLE metric_helpers.index_bloat TO robot_zmon;
          metric_helpers               postgres    false    210            %           1259    8448318    nearly_exhausted_sequences    VIEW     l  CREATE VIEW metric_helpers.nearly_exhausted_sequences AS
 SELECT get_nearly_exhausted_sequences.schemaname,
    get_nearly_exhausted_sequences.sequencename,
    get_nearly_exhausted_sequences.seq_percent_used
   FROM metric_helpers.get_nearly_exhausted_sequences((0.8)::double precision) get_nearly_exhausted_sequences(schemaname, sequencename, seq_percent_used);
 5   DROP VIEW metric_helpers.nearly_exhausted_sequences;
       metric_helpers       v       postgres    false    323    10            �           0    0     TABLE nearly_exhausted_sequences    ACL     �   GRANT SELECT ON TABLE metric_helpers.nearly_exhausted_sequences TO admin;
GRANT SELECT ON TABLE metric_helpers.nearly_exhausted_sequences TO robot_zmon;
          metric_helpers               postgres    false    293            �            1259    16648    pg_stat_statements    VIEW     �  CREATE VIEW metric_helpers.pg_stat_statements AS
 SELECT pg_stat_statements.userid,
    pg_stat_statements.dbid,
    pg_stat_statements.queryid,
    pg_stat_statements.query,
    pg_stat_statements.plans,
    pg_stat_statements.total_plan_time,
    pg_stat_statements.min_plan_time,
    pg_stat_statements.max_plan_time,
    pg_stat_statements.mean_plan_time,
    pg_stat_statements.stddev_plan_time,
    pg_stat_statements.calls,
    pg_stat_statements.total_exec_time,
    pg_stat_statements.min_exec_time,
    pg_stat_statements.max_exec_time,
    pg_stat_statements.mean_exec_time,
    pg_stat_statements.stddev_exec_time,
    pg_stat_statements.rows,
    pg_stat_statements.shared_blks_hit,
    pg_stat_statements.shared_blks_read,
    pg_stat_statements.shared_blks_dirtied,
    pg_stat_statements.shared_blks_written,
    pg_stat_statements.local_blks_hit,
    pg_stat_statements.local_blks_read,
    pg_stat_statements.local_blks_dirtied,
    pg_stat_statements.local_blks_written,
    pg_stat_statements.temp_blks_read,
    pg_stat_statements.temp_blks_written,
    pg_stat_statements.blk_read_time,
    pg_stat_statements.blk_write_time,
    pg_stat_statements.wal_records,
    pg_stat_statements.wal_fpi,
    pg_stat_statements.wal_bytes
   FROM metric_helpers.pg_stat_statements(true) pg_stat_statements(userid, dbid, queryid, query, plans, total_plan_time, min_plan_time, max_plan_time, mean_plan_time, stddev_plan_time, calls, total_exec_time, min_exec_time, max_exec_time, mean_exec_time, stddev_exec_time, rows, shared_blks_hit, shared_blks_read, shared_blks_dirtied, shared_blks_written, local_blks_hit, local_blks_read, local_blks_dirtied, local_blks_written, temp_blks_read, temp_blks_written, blk_read_time, blk_write_time, wal_records, wal_fpi, wal_bytes);
 -   DROP VIEW metric_helpers.pg_stat_statements;
       metric_helpers       v       postgres    false    322    10            �           0    0    TABLE pg_stat_statements    ACL     �   GRANT SELECT ON TABLE metric_helpers.pg_stat_statements TO admin;
GRANT SELECT ON TABLE metric_helpers.pg_stat_statements TO robot_zmon;
          metric_helpers               postgres    false    211            �            1259    16634    table_bloat    VIEW     �  CREATE VIEW metric_helpers.table_bloat AS
 SELECT get_table_bloat_approx.t_database,
    get_table_bloat_approx.t_schema_name,
    get_table_bloat_approx.t_table_name,
    get_table_bloat_approx.t_real_size,
    get_table_bloat_approx.t_extra_size,
    get_table_bloat_approx.t_extra_ratio,
    get_table_bloat_approx.t_fill_factor,
    get_table_bloat_approx.t_bloat_size,
    get_table_bloat_approx.t_bloat_ratio,
    get_table_bloat_approx.t_is_na
   FROM metric_helpers.get_table_bloat_approx() get_table_bloat_approx(t_database, t_schema_name, t_table_name, t_real_size, t_extra_size, t_extra_ratio, t_fill_factor, t_bloat_size, t_bloat_ratio, t_is_na);
 &   DROP VIEW metric_helpers.table_bloat;
       metric_helpers       v       postgres    false    328    10            �           0    0    TABLE table_bloat    ACL     {   GRANT SELECT ON TABLE metric_helpers.table_bloat TO admin;
GRANT SELECT ON TABLE metric_helpers.table_bloat TO robot_zmon;
          metric_helpers               postgres    false    209           