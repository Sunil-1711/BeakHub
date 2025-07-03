"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FileText, Share2, Users, Cloud, Search, FolderOpen, FileIcon, Star } from "lucide-react"

export function DocumentsContent() {
  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Document Resources</h2>
        <div className="flex items-center gap-2">
          <form className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search documents..."
              className="w-[200px] lg:w-[300px] pl-8"
            />
          </form>
        </div>
      </div>
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Documents</TabsTrigger>
          <TabsTrigger value="sharepoint">SharePoint</TabsTrigger>
          <TabsTrigger value="teams">Teams</TabsTrigger>
          <TabsTrigger value="onedrive">OneDrive</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  SharePoint
                </CardTitle>
                <Share2 className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12 Sites</div>
                <p className="text-xs text-muted-foreground mt-2">
                  Company documentation and resources
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/sharepoint">Browse SharePoint</Link>
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Teams
                </CardTitle>
                <Users className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8 Channels</div>
                <p className="text-xs text-muted-foreground mt-2">
                  Team collaboration and files
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/teams">Browse Teams</Link>
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  OneDrive
                </CardTitle>
                <Cloud className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">120+ Files</div>
                <p className="text-xs text-muted-foreground mt-2">
                  Shared documents and resources
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/onedrive">Browse OneDrive</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Recent Documents</CardTitle>
              <CardDescription>
                Recently accessed documents across all platforms
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="mr-4 rounded-full p-2 bg-blue-100">
                    <FileText className="h-4 w-4 text-blue-700" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">Product Roadmap 2023-2024.docx</h3>
                    <p className="text-xs text-muted-foreground">SharePoint &gt; Product Documentation</p>
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="#">Open</Link>
                  </Button>    </div>
                <div className="flex items-center">
                  <div className="mr-4 rounded-full p-2 bg-purple-100">
                    <FileText className="h-4 w-4 text-purple-700" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">Release Notes v2.3.0.pdf</h3>
                    <p className="text-xs text-muted-foreground">Teams &gt; Development Team &gt; Releases</p>
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="#">Open</Link>
                  </Button>
                </div>
                <div className="flex items-center">
                  <div className="mr-4 rounded-full p-2 bg-green-100">
                    <FileText className="h-4 w-4 text-green-700" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">User Guide - BeakOps Platform.pdf</h3>
                    <p className="text-xs text-muted-foreground">OneDrive &gt; Documentation &gt; User Guides</p>
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="#">Open</Link>
                  </Button>
                </div>
                <div className="flex items-center">
                  <div className="mr-4 rounded-full p-2 bg-yellow-100">
                    <FileText className="h-4 w-4 text-yellow-700" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">Q2 2023 Product Metrics.xlsx</h3>
                    <p className="text-xs text-muted-foreground">SharePoint &gt; Analytics &gt; Quarterly Reports</p>
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="#">Open</Link>
                  </Button>
                </div>
                <div className="flex items-center">
                  <div className="mr-4 rounded-full p-2 bg-red-100">
                    <FileText className="h-4 w-4 text-red-700" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">Security Protocols.docx</h3>
                    <p className="text-xs text-muted-foreground">Teams &gt; Security Team &gt; Policies</p>
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="#">Open</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">View All Recent Documents</Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Popular Documents</CardTitle>
              <CardDescription>
                Frequently accessed documents
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="mr-4 rounded-full p-2 bg-amber-100">
                    <Star className="h-4 w-4 text-amber-700" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">BeakOps Platform Overview.pptx</h3>
                    <p className="text-xs text-muted-foreground">SharePoint &gt; Marketing &gt; Presentations</p>
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="#">Open</Link>
                  </Button>
                </div>
                <div className="flex items-center">
                  <div className="mr-4 rounded-full p-2 bg-amber-100">
                    <Star className="h-4 w-4 text-amber-700" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">API Documentation.pdf</h3>
                    <p className="text-xs text-muted-foreground">SharePoint &gt; Development &gt; API</p>
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="#">Open</Link>
                  </Button>
                </div>
                <div className="flex items-center">
                  <div className="mr-4 rounded-full p-2 bg-amber-100">
                    <Star className="h-4 w-4 text-amber-700" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">Employee Handbook.pdf</h3>
                    <p className="text-xs text-muted-foreground">SharePoint &gt; HR &gt; Policies</p>
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="#">Open</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="sharepoint" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>SharePoint Sites</CardTitle>
              <CardDescription>
                Company documentation and resources
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="mr-4 rounded-full p-2 bg-blue-100">
                    <FolderOpen className="h-4 w-4 text-blue-700" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">Product Documentation</h3>
                    <p className="text-xs text-muted-foreground">User guides, API docs, and technical specifications</p>
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="#">Open</Link>
                  </Button>
                </div>
                <div className="flex items-center">
                  <div className="mr-4 rounded-full p-2 bg-blue-100">
                    <FolderOpen className="h-4 w-4 text-blue-700" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">Marketing Resources</h3>
                    <p className="text-xs text-muted-foreground">Presentations, brochures, and brand assets</p>
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="#">Open</Link>
                  </Button>
                </div>
                <div className="flex items-center">
                  <div className="mr-4 rounded-full p-2 bg-blue-100">
                    <FolderOpen className="h-4 w-4 text-blue-700" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">HR Policies</h3>
                    <p className="text-xs text-muted-foreground">Employee handbook and company policies</p>
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="#">Open</Link>
                  </Button>
                </div>
                <div className="flex items-center">
                  <div className="mr-4 rounded-full p-2 bg-blue-100">
                    <FolderOpen className="h-4 w-4 text-blue-700" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">Analytics & Reports</h3>
                    <p className="text-xs text-muted-foreground">Quarterly reports and metrics</p>
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="#">Open</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" asChild>
                <Link href="https://company-sharepoint.com" target="_blank">Open SharePoint</Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="teams" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Teams Channels</CardTitle>
              <CardDescription>
                Team collaboration and shared files
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="mr-4 rounded-full p-2 bg-purple-100">
                    <Users className="h-4 w-4 text-purple-700" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">Development Team</h3>
                    <p className="text-xs text-muted-foreground">Engineering discussions and technical documents</p>
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="#">Open</Link>
                  </Button>
                </div>
                <div className="flex items-center">
                  <div className="mr-4 rounded-full p-2 bg-purple-100">
                    <Users className="h-4 w-4 text-purple-700" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">Product Management</h3>
                    <p className="text-xs text-muted-foreground">Roadmaps, feature planning, and user feedback</p>
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="#">Open</Link>
                  </Button>
                </div>
                <div className="flex items-center">
                  <div className="mr-4 rounded-full p-2 bg-purple-100">
                    <Users className="h-4 w-4 text-purple-700" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">Security Team</h3>
                    <p className="text-xs text-muted-foreground">Security protocols and compliance documents</p>
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="#">Open</Link>
                  </Button>
                </div>
                <div className="flex items-center">
                  <div className="mr-4 rounded-full p-2 bg-purple-100">
                    <Users className="h-4 w-4 text-purple-700" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">Customer Success</h3>
                    <p className="text-xs text-muted-foreground">Client documentation and support resources</p>
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="#">Open</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" asChild>
                <Link href="https://teams.microsoft.com" target="_blank">Open Microsoft Teams</Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="onedrive" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>OneDrive Files</CardTitle>
              <CardDescription>
                Shared documents and resources
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="mr-4 rounded-full p-2 bg-green-100">
                    <FileIcon className="h-4 w-4 text-green-700" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">User Guide - BeakOps Platform.pdf</h3>
                    <p className="text-xs text-muted-foreground">Documentation &gt; User Guides</p>
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="#">Open</Link>
                  </Button>
                </div>
                <div className="flex items-center">
                  <div className="mr-4 rounded-full p-2 bg-green-100">
                    <FileIcon className="h-4 w-4 text-green-700" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">Installation Guide.pdf</h3>
                    <p className="text-xs text-muted-foreground">Documentation &gt; Installation</p>
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="#">Open</Link>
                  </Button>
                </div>
                <div className="flex items-center">
                  <div className="mr-4 rounded-full p-2 bg-green-100">
                    <FileIcon className="h-4 w-4 text-green-700" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">BeakOps Architecture.pptx</h3>
                    <p className="text-xs text-muted-foreground">Presentations &gt; Technical</p>
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="#">Open</Link>
                  </Button>
                </div>
                <div className="flex items-center">
                  <div className="mr-4 rounded-full p-2 bg-green-100">
                    <FileIcon className="h-4 w-4 text-green-700" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">Client Onboarding Template.docx</h3>
                    <p className="text-xs text-muted-foreground">Templates &gt; Client Success</p>
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="#">Open</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" asChild>
                <Link href="https://onedrive.live.com" target="_blank">Open OneDrive</Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
