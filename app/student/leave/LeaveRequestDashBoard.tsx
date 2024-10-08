import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CalendarDays, CheckCircle, Clock, XCircle } from "lucide-react"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
export default function LeaveRequestDashboard() {
    return (
        <div className="container mx-auto p-6">
            <h1 className="mb-6 text-3xl font-bold">Leave Request Dashboard</h1>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
                        <CalendarDays className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{leaveRequests.length}</div>
                        <p className="text-xs text-muted-foreground">+2 from last month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Approved</CardTitle>
                        <CheckCircle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">2</div>
                        <p className="text-xs text-muted-foreground">75% approval rate</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Pending</CardTitle>
                        <Clock className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">8</div>
                        <p className="text-xs text-muted-foreground">Wait for the approval</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Rejected</CardTitle>
                        <XCircle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">0</div>
                        <p className="text-xs text-muted-foreground">-1 from last month</p>
                    </CardContent>
                </Card>
            </div>

            <Card className="mt-6">
                <CardHeader>
                    <CardTitle>Recent Leave Requests</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow className="">
                                <TableHead className="text-center">Type</TableHead>
                                <TableHead className="text-center">From</TableHead>
                                <TableHead className="text-center">To</TableHead>
                                <TableHead className="text-center">Status</TableHead>
                                <TableHead className="text-center">Comments</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody className="text-center">
                            {leaveRequests.map((request) => (
                                <TableRow key={request.id}>
                                    <TableCell>{request.type}</TableCell>
                                    <TableCell>{request.from}</TableCell>
                                    <TableCell>{request.to}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center justify-center">
                                            <div className={`h-3 w-3 rounded-full ${getStatusColor(request.mentorStatus)} mr-1`} />
                                            <div className={`h-3 w-3 rounded-full ${getStatusColor(request.classInchargeStatus)} mr-1`} />
                                            <div className={`h-3 w-3 rounded-full ${getStatusColor(request.hosStatus)}`} />
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button variant="outline">View</Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-80">
                                                <div className="grid gap-4">
                                                    <h4 className="font-medium leading-none">HOD</h4>
                                                    <h4 className="font-medium leading-none">ClassIncharge</h4>
                                                    <h4 className="font-medium leading-none">Mentor</h4>
                                                </div>
                                            </PopoverContent>
                                        </Popover>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <div className="mt-6 flex justify-end space-x-4">
                <Button variant="outline">Export Report</Button>
            </div>
        </div>
    )
}

const leaveRequests = [
    { id: 1, type: "Vacation", from: "2023-07-01", to: "2023-07-05", mentorStatus: "Approved", classInchargeStatus: "Approved", hosStatus: "Approved" },
    { id: 2, type: "Sick Leave", from: "2023-07-03", to: "2023-07-04", mentorStatus: "Approved", classInchargeStatus: "Pending", hosStatus: "Approved" },
    { id: 3, type: "Personal", from: "2023-07-10", to: "2023-07-10", mentorStatus: "Pending", classInchargeStatus: "Pending", hosStatus: "Pending" },
    { id: 4, type: "Vacation", from: "2023-07-15", to: "2023-07-20", mentorStatus: "Rejected", classInchargeStatus: "Pending", hosStatus: "Pending" },
    { id: 5, type: "Sick Leave", from: "2023-07-02", to: "2023-07-03", mentorStatus: "Approved", classInchargeStatus: "Rejected", hosStatus: "Pending" },
    { id: 6, type: "Sick Leave", from: "2023-07-02", to: "2023-07-03", mentorStatus: "Approved", classInchargeStatus: "Rejected", hosStatus: "Pending" },
    { id: 7, type: "Sick Leave", from: "2023-07-02", to: "2023-07-03", mentorStatus: "Approved", classInchargeStatus: "Rejected", hosStatus: "Pending" },
    { id: 8, type: "Sick Leave", from: "2023-07-02", to: "2023-07-03", mentorStatus: "Approved", classInchargeStatus: "Rejected", hosStatus: "Pending" },
    { id: 9, type: "Sick Leave", from: "2023-07-02", to: "2023-07-03", mentorStatus: "Approved", classInchargeStatus: "Rejected", hosStatus: "Pending" },
    { id: 10, type: "Sick Leave", from: "2023-07-02", to: "2023-07-03", mentorStatus: "Approved", classInchargeStatus: "Rejected", hosStatus: "Pending" },
]

// Function to return status color based on status string
function getStatusColor(status:any) {
    switch (status) {
        case "Approved":
            return "bg-green-500";
        case "Pending":
            return "bg-yellow-500";
        case "Rejected":
            return "bg-red-500";
        default:
            return "bg-gray-500";
    }
}
