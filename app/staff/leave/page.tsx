import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import React from 'react'
import LeaveRequestDashboard from '../../../components/Leave/LeaveRequestDashBoard'
import StudentLeaveRequests from './StudentLeaveRequests'
import LeaveReports from './LeaveReports'
import LeaveRequestForm from '@/components/Leave/LeaveRequestForm'

const page = () => {
  return (
    <div className='min-h-screen flex  container mx-auto py-8'>
    <Tabs defaultValue="studentRequests" className="flex flex-col md:flex-row w-full gap-2">
        <div className="w-full md:w-1/4 p-4 rounded-lg  md:border-r-4 ">
            <h2 className="text-xl font-bold mb-4">Dashboard</h2>
            <TabsList className="flex flex-col min-h-fit p-2 rounded-lg">
                <TabsTrigger value="studentRequests" className="w-full text-left p-2 rounded-lg hover:bg-gray-200 transition-colors">
                    Student Leave Requests
                </TabsTrigger>
                <TabsTrigger value="reports" className="w-full text-left p-2 rounded-lg hover:bg-gray-200 transition-colors">
                    Reports
                </TabsTrigger>
                <TabsTrigger value="requestLeave" className="w-full text-left p-2 rounded-lg hover:bg-gray-200 transition-colors">
                    Request Leave
                </TabsTrigger>
                <TabsTrigger value="yourRequest" className="w-full text-left p-2 rounded-lg hover:bg-gray-200 transition-colors">
                    Your Leave Request
                </TabsTrigger>
            </TabsList>
        </div>
        <div className="w-full md:w-3/4 p-4 rounded-lg ">
            <TabsContent value="studentRequests">
                <StudentLeaveRequests />
            </TabsContent>
            <TabsContent value="reports">
                <LeaveReports />
            </TabsContent>
            <TabsContent value="requestLeave">
                <LeaveRequestForm />
            </TabsContent>
            <TabsContent value="yourRequest">
                <LeaveRequestDashboard />
            </TabsContent>
        </div>
    </Tabs>
</div>
  )
}

export default page