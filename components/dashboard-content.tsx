"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { FileText, Server, Share2, Users, Database, Cloud, Folder, Star, Clock, Bookmark } from "lucide-react"

export function DashboardContent() {
  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">BeakOps Intranet Portal</h2>
      </div>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="quick-access">Quick Access</TabsTrigger>
          <TabsTrigger value="recent">Recent</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="bg-gradient-to-br from-blue-950 to-blue-900 text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Product Environments</CardTitle>
                <Server className="h-4 w-4 text-yellow-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8</div>
                <p className="text-xs text-blue-200">Dev, QA, UAT, Production, AI Dev, AI QA, AI Prod, Service Desk</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">SharePoint Sites</CardTitle>
                <Share2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">Documentation, Policies, Procedures</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Teams Channels</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8</div>
                <p className="text-xs text-muted-foreground">Project teams, Departments</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">OneDrive Documents</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">120+</div>
                <p className="text-xs text-muted-foreground">Shared documents and files</p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Product Environments</CardTitle>
                <CardDescription>Access all BeakOps environments from one place</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 grid-cols-2 lg:grid-cols-4">
                <Link href="/environments/dev">
                  <div className="flex items-center p-3 rounded-lg border hover:bg-accent transition-colors">
                    <div className="mr-4 rounded-full p-2 bg-blue-100">
                      <Database className="h-4 w-4 text-blue-700" />
                    </div>
                    <div>
                      <h3 className="font-medium">Development</h3>
                      <p className="text-xs text-muted-foreground">Latest features and testing</p>
                    </div>
                  </div>
                </Link>
                <Link href="/environments/qa">
                  <div className="flex items-center p-3 rounded-lg border hover:bg-accent transition-colors">
                    <div className="mr-4 rounded-full p-2 bg-green-100">
                      <Database className="h-4 w-4 text-green-700" />
                    </div>
                    <div>
                      <h3 className="font-medium">QA</h3>
                      <p className="text-xs text-muted-foreground">Quality assurance testing</p>
                    </div>
                  </div>
                </Link>
                <Link href="/environments/uat">
                  <div className="flex items-center p-3 rounded-lg border hover:bg-accent transition-colors">
                    <div className="mr-4 rounded-full p-2 bg-purple-100">
                      <Database className="h-4 w-4 text-purple-700" />
                    </div>
                    <div>
                      <h3 className="font-medium">UAT</h3>
                      <p className="text-xs text-muted-foreground">User acceptance testing</p>
                    </div>
                  </div>
                </Link>
                <Link href="/environments/prod">
                  <div className="flex items-center p-3 rounded-lg border hover:bg-accent transition-colors">
                    <div className="mr-4 rounded-full p-2 bg-yellow-100">
                      <Database className="h-4 w-4 text-yellow-700" />
                    </div>
                    <div>
                      <h3 className="font-medium">Production</h3>
                      <p className="text-xs text-muted-foreground">Live environment</p>
                    </div>
                  </div>
                </Link>
                <Link href="/environments/ai-dev">
                  <div className="flex items-center p-3 rounded-lg border hover:bg-accent transition-colors">
                    <div className="mr-4 rounded-full p-2 bg-blue-100">
                      <Database className="h-4 w-4 text-blue-700" />
                    </div>
                    <div>
                      <h3 className="font-medium">AI Dev</h3>
                      <p className="text-xs text-muted-foreground">AI development environment</p>
                    </div>
                  </div>
                </Link>
                <Link href="/environments/ai-qa">
                  <div className="flex items-center p-3 rounded-lg border hover:bg-accent transition-colors">
                    <div className="mr-4 rounded-full p-2 bg-green-100">
                      <Database className="h-4 w-4 text-green-700" />
                    </div>
                    <div>
                      <h3 className="font-medium">AI QA</h3>
                      <p className="text-xs text-muted-foreground">AI testing environment</p>
                    </div>
                  </div>
                </Link>
                <Link href="/environments/ai-prod">
                  <div className="flex items-center p-3 rounded-lg border hover:bg-accent transition-colors">
                    <div className="mr-4 rounded-full p-2 bg-yellow-100">
                      <Database className="h-4 w-4 text-yellow-700" />
                    </div>
                    <div>
                      <h3 className="font-medium">AI Production</h3>
                      <p className="text-xs text-muted-foreground">AI live environment</p>
                    </div>
                  </div>
                </Link>
                <Link href="/environments/servicedesk">
                  <div className="flex items-center p-3 rounded-lg border hover:bg-accent transition-colors">
                    <div className="mr-4 rounded-full p-2 bg-red-100">
                      <Database className="h-4 w-4 text-red-700" />
                    </div>
                    <div>
                      <h3 className="font-medium">Service Desk</h3>
                      <p className="text-xs text-muted-foreground">Support and helpdesk</p>
                    </div>
                  </div>
                </Link>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/environments">View All Environments</Link>
                </Button>
              </CardFooter>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Document Resources</CardTitle>
                <CardDescription>Quick access to important documents</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="mr-4 rounded-full p-2 bg-blue-100">
                      <Share2 className="h-4 w-4 text-blue-700" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">SharePoint</h3>
                      <p className="text-xs text-muted-foreground">Company documentation</p>
                    </div>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href="/sharepoint">View</Link>
                    </Button>
                  </div>
                  <div className="flex items-center">
                    <div className="mr-4 rounded-full p-2 bg-purple-100">
                      <Users className="h-4 w-4 text-purple-700" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">Teams</h3>
                      <p className="text-xs text-muted-foreground">Team channels and files</p>
                    </div>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href="/teams">View</Link>
                    </Button>
                  </div>
                  <div className="flex items-center">
                    <div className="mr-4 rounded-full p-2 bg-green-100">
                      <Cloud className="h-4 w-4 text-green-700" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">OneDrive</h3>
                      <p className="text-xs text-muted-foreground">Shared documents</p>
                    </div>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href="/onedrive">View</Link>
                    </Button>
                  </div>
                  <div className="flex items-center">
                    <div className="mr-4 rounded-full p-2 bg-yellow-100">
                      <Folder className="h-4 w-4 text-yellow-700" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">All Documents</h3>
                      <p className="text-xs text-muted-foreground">Browse all resources</p>
                    </div>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href="/documents">View</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="quick-access" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Favorites</CardTitle>
              <CardDescription>Your bookmarked resources</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div className="flex items-center p-3 rounded-lg border">
                  <div className="mr-4 rounded-full p-2 bg-yellow-100">
                    <Star className="h-4 w-4 text-yellow-700" />
                  </div>
                  <div>
                    <h3 className="font-medium">Production Dashboard</h3>
                    <p className="text-xs text-muted-foreground">Main production environment</p>
                  </div>
                </div>
                <div className="flex items-center p-3 rounded-lg border">
                  <div className="mr-4 rounded-full p-2 bg-blue-100">
                    <Share2 className="h-4 w-4 text-blue-700" />
                  </div>
                  <div>
                    <h3 className="font-medium">Product Documentation</h3>
                    <p className="text-xs text-muted-foreground">SharePoint site</p>
                  </div>
                </div>
                <div className="flex items-center p-3 rounded-lg border">
                  <div className="mr-4 rounded-full p-2 bg-green-100">
                    <Users className="h-4 w-4 text-green-700" />
                  </div>
                  <div>
                    <h3 className="font-medium">Development Team</h3>
                    <p className="text-xs text-muted-foreground">Teams channel</p>
                  </div>
                </div>
                <div className="flex items-center p-3 rounded-lg border">
                  <div className="mr-4 rounded-full p-2 bg-purple-100">
                    <FileText className="h-4 w-4 text-purple-700" />
                  </div>
                  <div>
                    <h3 className="font-medium">Release Notes</h3>
                    <p className="text-xs text-muted-foreground">Latest product updates</p>
                  </div>
                </div>
                <div className="flex items-center p-3 rounded-lg border">
                  <div className="mr-4 rounded-full p-2 bg-red-100">
                    <Bookmark className="h-4 w-4 text-red-700" />
                  </div>
                  <div>
                    <h3 className="font-medium">User Guides</h3>
                    <p className="text-xs text-muted-foreground">Product documentation</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Manage Favorites
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="recent" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recently Accessed</CardTitle>
              <CardDescription>Your recently viewed resources</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="mr-4 rounded-full p-2 bg-slate-100">
                    <Clock className="h-4 w-4 text-slate-700" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">QA Environment</h3>
                    <p className="text-xs text-muted-foreground">Accessed 2 hours ago</p>
                  </div>
                  <Button variant="ghost" size="sm">
                    Open
                  </Button>
                </div>
                <div className="flex items-center">
                  <div className="mr-4 rounded-full p-2 bg-slate-100">
                    <Clock className="h-4 w-4 text-slate-700" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">Product Roadmap</h3>
                    <p className="text-xs text-muted-foreground">Accessed yesterday</p>
                  </div>
                  <Button variant="ghost" size="sm">
                    Open
                  </Button>
                </div>
                <div className="flex items-center">
                  <div className="mr-4 rounded-full p-2 bg-slate-100">
                    <Clock className="h-4 w-4 text-slate-700" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">Development Team Channel</h3>
                    <p className="text-xs text-muted-foreground">Accessed 2 days ago</p>
                  </div>
                  <Button variant="ghost" size="sm">
                    Open
                  </Button>
                </div>
                <div className="flex items-center">
                  <div className="mr-4 rounded-full p-2 bg-slate-100">
                    <Clock className="h-4 w-4 text-slate-700" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">Release Schedule</h3>
                    <p className="text-xs text-muted-foreground">Accessed 3 days ago</p>
                  </div>
                  <Button variant="ghost" size="sm">
                    Open
                  </Button>
                </div>
                <div className="flex items-center">
                  <div className="mr-4 rounded-full p-2 bg-slate-100">
                    <Clock className="h-4 w-4 text-slate-700" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">UAT Test Cases</h3>
                    <p className="text-xs text-muted-foreground">Accessed 5 days ago</p>
                  </div>
                  <Button variant="ghost" size="sm">
                    Open
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View All Recent
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
