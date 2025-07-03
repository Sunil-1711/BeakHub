"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Database, Server, Activity, AlertCircle, CheckCircle } from "lucide-react"

export function EnvironmentsContent() {
  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Product Environments</h2>
      </div>
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Environments</TabsTrigger>
          <TabsTrigger value="dev">Development</TabsTrigger>
          <TabsTrigger value="qa">QA</TabsTrigger>
          <TabsTrigger value="uat">UAT</TabsTrigger>
          <TabsTrigger value="prod">Production</TabsTrigger>
          <TabsTrigger value="ai-dev">AI Dev</TabsTrigger>
          <TabsTrigger value="ai-qa">AI QA</TabsTrigger>
          <TabsTrigger value="ai-prod">AI Prod</TabsTrigger>
          <TabsTrigger value="servicedesk">Service Desk</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Development</CardTitle>
                <Database className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">Dev</div>
                  <Badge variant="outline" className="bg-blue-50">
                    Active
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-2">Latest features and development testing</p>
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                  <Link href="https://apps-dev.beakops.com" target="_blank">
                    Access
                  </Link>
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Quality Assurance</CardTitle>
                <Database className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">QA</div>
                  <Badge variant="outline" className="bg-green-50">
                    Stable
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-2">Quality assurance testing environment</p>
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                  <Link href="https://app-qa.beakops.com" target="_blank">
                    Access
                  </Link>
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">User Acceptance Testing</CardTitle>
                <Database className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">UAT</div>
                  <Badge variant="outline" className="bg-purple-50">
                    Testing
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-2">User acceptance testing environment</p>
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                  <Link href="https://apps-uat.beakops.com" target="_blank">
                    Access
                  </Link>
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Production</CardTitle>
                <Database className="h-4 w-4 text-yellow-600" />
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">Prod</div>
                  <Badge variant="outline" className="bg-yellow-50">
                    Live
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-2">Live production environment</p>
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                  <Link href="https://app.beakops.com" target="_blank">
                    Access
                  </Link>
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">AI Development</CardTitle>
                <Database className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">AI Dev</div>
                  <Badge variant="outline" className="bg-blue-50">
                    Active
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-2">AI features development environment</p>
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                  <Link href="https://ai-dev.beakops.com" target="_blank">
                    Access
                  </Link>
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">AI Quality Assurance</CardTitle>
                <Database className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">AI QA</div>
                  <Badge variant="outline" className="bg-green-50">
                    Testing
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-2">AI features testing environment</p>
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                  <Link href="https://ai-qa.beakops.com" target="_blank">
                    Access
                  </Link>
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">AI Production</CardTitle>
                <Database className="h-4 w-4 text-yellow-600" />
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">AI Prod</div>
                  <Badge variant="outline" className="bg-yellow-50">
                    Live
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-2">AI features production environment</p>
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                  <Link href="https://ai.beakops.com" target="_blank">
                    Access
                  </Link>
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Service Desk</CardTitle>
                <Database className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">Helpdesk</div>
                  <Badge variant="outline" className="bg-red-50">
                    Support
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-2">Customer support and service desk</p>
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                  <Link href="https://helpdesk.beakops.com" target="_blank">
                    Access
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Environment Status</CardTitle>
              <CardDescription>Current status of all BeakOps environments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="mr-4 rounded-full p-2 bg-blue-100">
                      <Server className="h-4 w-4 text-blue-700" />
                    </div>
                    <div>
                      <h3 className="font-medium">Development</h3>
                      <p className="text-xs text-muted-foreground">Last updated: Today, 10:30 AM</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Activity className="h-4 w-4 text-green-600 mr-2" />
                    <span className="text-sm font-medium text-green-600">Operational</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="mr-4 rounded-full p-2 bg-green-100">
                      <Server className="h-4 w-4 text-green-700" />
                    </div>
                    <div>
                      <h3 className="font-medium">QA</h3>
                      <p className="text-xs text-muted-foreground">Last updated: Today, 9:15 AM</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Activity className="h-4 w-4 text-green-600 mr-2" />
                    <span className="text-sm font-medium text-green-600">Operational</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="mr-4 rounded-full p-2 bg-purple-100">
                      <Server className="h-4 w-4 text-purple-700" />
                    </div>
                    <div>
                      <h3 className="font-medium">UAT</h3>
                      <p className="text-xs text-muted-foreground">Last updated: Yesterday, 4:45 PM</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <AlertCircle className="h-4 w-4 text-amber-600 mr-2" />
                    <span className="text-sm font-medium text-amber-600">Operational</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="mr-4 rounded-full p-2 bg-yellow-100">
                      <Server className="h-4 w-4 text-yellow-700" />
                    </div>
                    <div>
                      <h3 className="font-medium">Production</h3>
                      <p className="text-xs text-muted-foreground">Last updated: Today, 8:00 AM</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span className="text-sm font-medium text-green-600">Operational</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="mr-4 rounded-full p-2 bg-blue-100">
                      <Server className="h-4 w-4 text-blue-700" />
                    </div>
                    <div>
                      <h3 className="font-medium">AI Development</h3>
                      <p className="text-xs text-muted-foreground">Last updated: Today, 11:45 AM</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Activity className="h-4 w-4 text-green-600 mr-2" />
                    <span className="text-sm font-medium text-green-600">Operational</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="mr-4 rounded-full p-2 bg-green-100">
                      <Server className="h-4 w-4 text-green-700" />
                    </div>
                    <div>
                      <h3 className="font-medium">AI QA</h3>
                      <p className="text-xs text-muted-foreground">Last updated: Today, 10:20 AM</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Activity className="h-4 w-4 text-green-600 mr-2" />
                    <span className="text-sm font-medium text-green-600">Operational</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="mr-4 rounded-full p-2 bg-yellow-100">
                      <Server className="h-4 w-4 text-yellow-700" />
                    </div>
                    <div>
                      <h3 className="font-medium">AI Production</h3>
                      <p className="text-xs text-muted-foreground">Last updated: Today, 9:30 AM</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span className="text-sm font-medium text-green-600">Operational</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="mr-4 rounded-full p-2 bg-red-100">
                      <Server className="h-4 w-4 text-red-700" />
                    </div>
                    <div>
                      <h3 className="font-medium">Service Desk</h3>
                      <p className="text-xs text-muted-foreground">Last updated: Today, 8:15 AM</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span className="text-sm font-medium text-green-600">Operational</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="dev" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Development Environment</CardTitle>
              <CardDescription>Latest features and development testing</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-lg border p-3">
                    <h3 className="font-medium mb-1">Environment URL</h3>
                    <p className="text-sm text-muted-foreground">https://dev.beakops.com</p>
                  </div>
                  <div className="rounded-lg border p-3">
                    <h3 className="font-medium mb-1">Status</h3>
                    <div className="flex items-center">
                      <Activity className="h-4 w-4 text-green-600 mr-2" />
                      <span className="text-sm text-green-600">Operational</span>
                    </div>
                  </div>
                  <div className="rounded-lg border p-3">
                    <h3 className="font-medium mb-1">Last Deployment</h3>
                    <p className="text-sm text-muted-foreground">Today, 10:30 AM</p>
                  </div>
                  <div className="rounded-lg border p-3">
                    <h3 className="font-medium mb-1">Version</h3>
                    <p className="text-sm text-muted-foreground">v2.4.0-dev</p>
                  </div>
                </div>
                <div className="rounded-lg border p-4">
                  <h3 className="font-medium mb-2">Features in Development</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center text-sm">
                      <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                      Enhanced dashboard analytics
                    </li>
                    <li className="flex items-center text-sm">
                      <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                      New AI-powered recommendations
                    </li>
                    <li className="flex items-center text-sm">
                      <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                      Improved user interface
                    </li>
                    <li className="flex items-center text-sm">
                      <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                      Integration with third-party services
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" asChild>
                <Link href="https://dev.beakops.com" target="_blank">
                  Access Development Environment
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="qa" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>QA Environment</CardTitle>
              <CardDescription>Quality assurance testing environment</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-lg border p-3">
                    <h3 className="font-medium mb-1">Environment URL</h3>
                    <p className="text-sm text-muted-foreground">https://qa.beakops.com</p>
                  </div>
                  <div className="rounded-lg border p-3">
                    <h3 className="font-medium mb-1">Status</h3>
                    <div className="flex items-center">
                      <Activity className="h-4 w-4 text-green-600 mr-2" />
                      <span className="text-sm text-green-600">Operational</span>
                    </div>
                  </div>
                  <div className="rounded-lg border p-3">
                    <h3 className="font-medium mb-1">Last Deployment</h3>
                    <p className="text-sm text-muted-foreground">Today, 9:15 AM</p>
                  </div>
                  <div className="rounded-lg border p-3">
                    <h3 className="font-medium mb-1">Version</h3>
                    <p className="text-sm text-muted-foreground">v2.3.5-qa</p>
                  </div>
                </div>
                <div className="rounded-lg border p-4">
                  <h3 className="font-medium mb-2">Current Test Cycles</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center text-sm">
                      <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                      Regression testing for v2.3.5
                    </li>
                    <li className="flex items-center text-sm">
                      <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                      Performance testing for dashboard
                    </li>
                    <li className="flex items-center text-sm">
                      <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                      Security validation
                    </li>
                    <li className="flex items-center text-sm">
                      <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                      API integration tests
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" asChild>
                <Link href="https://qa.beakops.com" target="_blank">
                  Access QA Environment
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="uat" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>UAT Environment</CardTitle>
              <CardDescription>User acceptance testing environment</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-lg border p-3">
                    <h3 className="font-medium mb-1">Environment URL</h3>
                    <p className="text-sm text-muted-foreground">https://uat.beakops.com</p>
                  </div>
                  <div className="rounded-lg border p-3">
                    <h3 className="font-medium mb-1">Status</h3>
                    <div className="flex items-center">
                      <AlertCircle className="h-4 w-4 text-amber-600 mr-2" />
                      <span className="text-sm text-amber-600">Operational</span>
                    </div>
                  </div>
                  <div className="rounded-lg border p-3">
                    <h3 className="font-medium mb-1">Last Deployment</h3>
                    <p className="text-sm text-muted-foreground">Yesterday, 4:45 PM</p>
                  </div>
                  <div className="rounded-lg border p-3">
                    <h3 className="font-medium mb-1">Version</h3>
                    <p className="text-sm text-muted-foreground">v2.3.2-uat</p>
                  </div>
                </div>
                <div className="rounded-lg border p-4">
                  <h3 className="font-medium mb-2">UAT Test Cases</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center text-sm">
                      <div className="w-2 h-2 rounded-full bg-purple-500 mr-2"></div>
                      User workflow validation
                    </li>
                    <li className="flex items-center text-sm">
                      <div className="w-2 h-2 rounded-full bg-purple-500 mr-2"></div>
                      Business process testing
                    </li>
                    <li className="flex items-center text-sm">
                      <div className="w-2 h-2 rounded-full bg-purple-500 mr-2"></div>
                      End-to-end scenario testing
                    </li>
                    <li className="flex items-center text-sm">
                      <div className="w-2 h-2 rounded-full bg-purple-500 mr-2"></div>
                      Client acceptance validation
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" asChild>
                <Link href="https://uat.beakops.com" target="_blank">
                  Access UAT Environment
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="prod" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Production Environment</CardTitle>
              <CardDescription>Live production environment</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-lg border p-3">
                    <h3 className="font-medium mb-1">Environment URL</h3>
                    <p className="text-sm text-muted-foreground">https://beakops.com</p>
                  </div>
                  <div className="rounded-lg border p-3">
                    <h3 className="font-medium mb-1">Status</h3>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                      <span className="text-sm text-green-600">Operational</span>
                    </div>
                  </div>
                  <div className="rounded-lg border p-3">
                    <h3 className="font-medium mb-1">Last Deployment</h3>
                    <p className="text-sm text-muted-foreground">3 days ago</p>
                  </div>
                  <div className="rounded-lg border p-3">
                    <h3 className="font-medium mb-1">Version</h3>
                    <p className="text-sm text-muted-foreground">v2.3.0</p>
                  </div>
                </div>
                <div className="rounded-lg border p-4">
                  <h3 className="font-medium mb-2">Current Release Notes</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center text-sm">
                      <div className="w-2 h-2 rounded-full bg-yellow-500 mr-2"></div>
                      Improved dashboard performance
                    </li>
                    <li className="flex items-center text-sm">
                      <div className="w-2 h-2 rounded-full bg-yellow-500 mr-2"></div>
                      Enhanced security features
                    </li>
                    <li className="flex items-center text-sm">
                      <div className="w-2 h-2 rounded-full bg-yellow-500 mr-2"></div>
                      Bug fixes and stability improvements
                    </li>
                    <li className="flex items-center text-sm">
                      <div className="w-2 h-2 rounded-full bg-yellow-500 mr-2"></div>
                      New reporting capabilities
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" asChild>
                <Link href="https://beakops.com" target="_blank">
                  Access Production Environment
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="ai-dev" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AI Development Environment</CardTitle>
              <CardDescription>AI features development and testing</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-lg border p-3">
                    <h3 className="font-medium mb-1">Environment URL</h3>
                    <p className="text-sm text-muted-foreground">https://ai-dev.beakops.com</p>
                  </div>
                  <div className="rounded-lg border p-3">
                    <h3 className="font-medium mb-1">Status</h3>
                    <div className="flex items-center">
                      <Activity className="h-4 w-4 text-green-600 mr-2" />
                      <span className="text-sm text-green-600">Operational</span>
                    </div>
                  </div>
                  <div className="rounded-lg border p-3">
                    <h3 className="font-medium mb-1">Last Deployment</h3>
                    <p className="text-sm text-muted-foreground">Today, 11:45 AM</p>
                  </div>
                  <div className="rounded-lg border p-3">
                    <h3 className="font-medium mb-1">Version</h3>
                    <p className="text-sm text-muted-foreground">v1.2.0-dev</p>
                  </div>
                </div>
                <div className="rounded-lg border p-4">
                  <h3 className="font-medium mb-2">AI Features in Development</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center text-sm">
                      <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                      Natural language processing enhancements
                    </li>
                    <li className="flex items-center text-sm">
                      <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                      Predictive analytics module
                    </li>
                    <li className="flex items-center text-sm">
                      <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                      Machine learning model improvements
                    </li>
                    <li className="flex items-center text-sm">
                      <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                      Automated anomaly detection
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" asChild>
                <Link href="https://ai-dev.beakops.com" target="_blank">
                  Access AI Development Environment
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="ai-qa" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AI QA Environment</CardTitle>
              <CardDescription>AI features quality assurance testing</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-lg border p-3">
                    <h3 className="font-medium mb-1">Environment URL</h3>
                    <p className="text-sm text-muted-foreground">https://ai-qa.beakops.com</p>
                  </div>
                  <div className="rounded-lg border p-3">
                    <h3 className="font-medium mb-1">Status</h3>
                    <div className="flex items-center">
                      <Activity className="h-4 w-4 text-green-600 mr-2" />
                      <span className="text-sm text-green-600">Operational</span>
                    </div>
                  </div>
                  <div className="rounded-lg border p-3">
                    <h3 className="font-medium mb-1">Last Deployment</h3>
                    <p className="text-sm text-muted-foreground">Today, 10:20 AM</p>
                  </div>
                  <div className="rounded-lg border p-3">
                    <h3 className="font-medium mb-1">Version</h3>
                    <p className="text-sm text-muted-foreground">v1.1.5-qa</p>
                  </div>
                </div>
                <div className="rounded-lg border p-4">
                  <h3 className="font-medium mb-2">Current AI Test Cycles</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center text-sm">
                      <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                      Regression testing for NLP models
                    </li>
                    <li className="flex items-center text-sm">
                      <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                      Performance testing for prediction algorithms
                    </li>
                    <li className="flex items-center text-sm">
                      <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                      Accuracy validation for ML models
                    </li>
                    <li className="flex items-center text-sm">
                      <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                      Integration testing with core platform
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" asChild>
                <Link href="https://ai-qa.beakops.com" target="_blank">
                  Access AI QA Environment
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="ai-prod" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AI Production Environment</CardTitle>
              <CardDescription>Live AI features and services</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-lg border p-3">
                    <h3 className="font-medium mb-1">Environment URL</h3>
                    <p className="text-sm text-muted-foreground">https://ai.beakops.com</p>
                  </div>
                  <div className="rounded-lg border p-3">
                    <h3 className="font-medium mb-1">Status</h3>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                      <span className="text-sm text-green-600">Operational</span>
                    </div>
                  </div>
                  <div className="rounded-lg border p-3">
                    <h3 className="font-medium mb-1">Last Deployment</h3>
                    <p className="text-sm text-muted-foreground">Yesterday, 2:30 PM</p>
                  </div>
                  <div className="rounded-lg border p-3">
                    <h3 className="font-medium mb-1">Version</h3>
                    <p className="text-sm text-muted-foreground">v1.1.0</p>
                  </div>
                </div>
                <div className="rounded-lg border p-4">
                  <h3 className="font-medium mb-2">Current AI Features</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center text-sm">
                      <div className="w-2 h-2 rounded-full bg-yellow-500 mr-2"></div>
                      Automated incident classification
                    </li>
                    <li className="flex items-center text-sm">
                      <div className="w-2 h-2 rounded-full bg-yellow-500 mr-2"></div>
                      Predictive maintenance alerts
                    </li>
                    <li className="flex items-center text-sm">
                      <div className="w-2 h-2 rounded-full bg-yellow-500 mr-2"></div>
                      Natural language query processing
                    </li>
                    <li className="flex items-center text-sm">
                      <div className="w-2 h-2 rounded-full bg-yellow-500 mr-2"></div>
                      Anomaly detection and reporting
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" asChild>
                <Link href="https://ai.beakops.com" target="_blank">
                  Access AI Production Environment
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="servicedesk" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Service Desk Environment</CardTitle>
              <CardDescription>Customer support and helpdesk services</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-lg border p-3">
                    <h3 className="font-medium mb-1">Environment URL</h3>
                    <p className="text-sm text-muted-foreground">https://helpdesk.beakops.com</p>
                  </div>
                  <div className="rounded-lg border p-3">
                    <h3 className="font-medium mb-1">Status</h3>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                      <span className="text-sm text-green-600">Operational</span>
                    </div>
                  </div>
                  <div className="rounded-lg border p-3">
                    <h3 className="font-medium mb-1">Last Deployment</h3>
                    <p className="text-sm text-muted-foreground">3 days ago</p>
                  </div>
                  <div className="rounded-lg border p-3">
                    <h3 className="font-medium mb-1">Version</h3>
                    <p className="text-sm text-muted-foreground">v3.2.1</p>
                  </div>
                </div>
                <div className="rounded-lg border p-4">
                  <h3 className="font-medium mb-2">Service Desk Features</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center text-sm">
                      <div className="w-2 h-2 rounded-full bg-red-500 mr-2"></div>
                      Ticket management system
                    </li>
                    <li className="flex items-center text-sm">
                      <div className="w-2 h-2 rounded-full bg-red-500 mr-2"></div>
                      Knowledge base and documentation
                    </li>
                    <li className="flex items-center text-sm">
                      <div className="w-2 h-2 rounded-full bg-red-500 mr-2"></div>
                      Live chat support
                    </li>
                    <li className="flex items-center text-sm">
                      <div className="w-2 h-2 rounded-full bg-red-500 mr-2"></div>
                      Customer self-service portal
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" asChild>
                <Link href="https://helpdesk.beakops.com" target="_blank">
                  Access Service Desk
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
