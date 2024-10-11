import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CalendarDays, CheckCircle, Clock, XCircle } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { prisma } from "@/prisma/prisma";
import { auth } from "@/auth";

export default async function LeaveRequestDashboard() {
    const session = await auth();
    let userId;
    let leaveDatas: any[] = [];

    if (session?.user.type === 'student') {
        userId = session.user.id;
        leaveDatas = await prisma.leave.findMany({
            where: {
                studentId: userId
            }
        });
    } else if (session?.user.type === 'staff') {
        userId = session.user.id;
        leaveDatas = await prisma.leave.findMany({
            where: {
                staffId: userId
            }
        });
    } else {
        console.error("Unknown user type");
    }

    const leaveRequests = leaveDatas.map(request => ({
        id: request.id,
        type: request.leaveType, 
        from: request.fromDate.toISOString().split('T')[0], 
        to: request.toDate.toISOString().split('T')[0], 
        mentorStatus: request.approvals?.hodApproval || "Pending", 
        classInchargeStatus: request.approvals?.classInchargeApproval || "Pending", 
        hosStatus: request.status === 'PENDING' ? "Pending" : request.status 
    }));

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
                        <div className="text-2xl font-bold">2 To Do</div>
                        <p className="text-xs text-muted-foreground">75% approval rate</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Pending</CardTitle>
                        <Clock className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">8 To Do</div>
                        <p className="text-xs text-muted-foreground">Wait for the approval</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Rejected</CardTitle>
                        <XCircle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">0 To Do</div>
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
                            <TableRow>
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
                                    <TableCell className="capitalize">{request.type}</TableCell>
                                    <TableCell>{request.from}</TableCell>
                                    <TableCell>{request.to}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center justify-center">
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
                                                    {/* Conditionally render comments based on user type */}
                                                    {session?.user.type === 'student' ? (
                                                        <>
                                                            <h4 className="font-medium leading-none">HOD: {request.mentorStatus}</h4>
                                                            <h4 className="font-medium leading-none">Class In Charge: {request.classInchargeStatus}</h4>
                                                            <h4 className="font-medium leading-none">Mentor: {request.hosStatus}</h4>
                                                        </>
                                                    ) : session?.user.type === 'staff' ? (
                                                        <>
                                                            <h4 className="font-medium leading-none">HOD: {request.mentorStatus}</h4>
                                                        </>
                                                    ) : null}
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
    );
}

function getStatusColor(status: any) {
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
