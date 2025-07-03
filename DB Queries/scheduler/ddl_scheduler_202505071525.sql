INSERT INTO public.ddl_scheduler (database_name,table_name,"type",isactive,createddate,createdby,modifieddate,modifiedby,ddl_query) VALUES
	 ('scheduler','job_details','table',true,'2025-01-15 11:38:55.20595','1','2025-01-15 11:38:55.20595','1','CREATE TABLE public.job_details(id int8 GENERATED ALWAYS AS IDENTITY( INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START 1 CACHE 1 NO CYCLE) NOT NULL,
	job_id varchar NOT NULL,
	job_desc varchar NULL,
	status varchar NOT NULL,
	run_at timestamp NULL,
	trigger_type varchar NOT NULL,
	finished_at timestamp NULL,
	created_at timestamp NULL,
	detailstatus varchar NULL,
	"exception" varchar NULL,
	traceback varchar NULL,
	scheduled_run_time timestamp NULL,
	substatus varchar NOT NULL,
	tenantid int4 NULL,
	job_type varchar NULL,
	companyid int4 NULL,
	CONSTRAINT id PRIMARY KEY (id)
);
CREATE INDEX ix_job_details_id ON public.job_details USING btree (id);
CREATE INDEX ix_job_details_scheduled_run_time ON public.job_details USING btree (scheduled_run_time);'),
	 ('scheduler','job_scheduler','table',true,'2025-01-15 11:39:15.908961','1','2025-01-15 11:39:15.908961','1','CREATE TABLE public.job_scheduler(id varchar(191) NOT NULL,
	next_run_time float8 NULL,
	job_state bytea NOT NULL,
	job_type varchar NOT NULL,
	tenantid int4 NOT NULL,
	companyid int4 NULL,
	occurrences int4 NULL,
	delay int4 NULL,
	CONSTRAINT job_scheduler_pkey PRIMARY KEY (id)
);
CREATE INDEX ix_job_scheduler_next_run_time ON public.job_scheduler USING btree (next_run_time);');
