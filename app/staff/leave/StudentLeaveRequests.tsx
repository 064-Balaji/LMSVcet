"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Check, Search, X } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

// Mock data for leave requests
const leaveRequests = [
    { id: 1, student: "John Doe", type: "Medical", from: "2023-07-01", to: "2023-07-05", mentorStatus: "approved", classInchargeStatus: "approved", hosStatus: "approved" },
    { id: 2, student: "Jane Smith", type: "Personal", from: "2023-07-03", to: "2023-07-04", mentorStatus: "pending", classInchargeStatus: "approved", hosStatus: "pending" },
    { id: 3, student: "Mike Johnson", type: "Event", from: "2023-07-10", to: "2023-07-10", mentorStatus: "rejected", classInchargeStatus: "approved", hosStatus: "rejected" },
    { id: 4, student: "Emily Brown", type: "Medical", from: "2023-07-15", to: "2023-07-20", mentorStatus: "approved", classInchargeStatus: "pending", hosStatus: "pending" },
    { id: 5, student: "Chris Wilson", type: "Personal", from: "2023-07-02", to: "2023-07-03", mentorStatus: "approved", classInchargeStatus: "approved", hosStatus: "approved" },
]

const getStatusColor = (status: string) => {
    switch (status) {
        case "approved":
            return "bg-green-500"
        case "pending":
            return "bg-yellow-500"
        case "rejected":
            return "bg-red-500"
        default:
            return "bg-gray-500"
    }
}

export default function StudentLeaveRequests() {
    const [search, setSearch] = useState("")

    return (
        <div className="container mx-auto p-6">
            <h1 className="mb-6 text-3xl font-bold">Student Leave Requests</h1>

            <Card>
                <CardHeader>
                    <CardTitle>Leave Requests</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="mb-4 flex items-center justify-between">
                        <div className="flex items-center space-x-2">

                            <div className="relative">
                                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search student"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="pl-8"
                                />
                            </div>
                        </div>
                        <Button>Export Report</Button>
                    </div>
                    <Table>
                        <TableHeader >
                            <TableRow>
                                <TableHead className="text-center">Student</TableHead>
                                <TableHead className="text-center">Roll No</TableHead>
                                <TableHead className="text-center">From-To</TableHead>
                                <TableHead className="text-center">Status</TableHead>
                                <TableHead className="text-center">Comments</TableHead>
                                <TableHead className="text-center">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {leaveRequests.map((request) => (
                                <TableRow key={request.id} className="text-center">
                                    <TableCell className="font-medium">{request.student}</TableCell>
                                    <TableCell className="font-medium">{request.student}</TableCell>
                                    <TableCell>{request.from} / {request.to}</TableCell>
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
                                                <Button variant="outline">Comments</Button>
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
                                    <TableCell className="flex items-center justify-around">

                                        <Button variant="outline" className="bg-green-500 hover:bg-green-600 p-2 text-white">
                                            <Check className="rounded-full" />
                                        </Button>
                                        <Button variant="outline" className="bg-red-500 hover:bg-red-600 p-2 text-white">
                                            <X />
                                        </Button>

                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}