import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"

export default function LeaveRequestForm() {
    return (
        <div className="flex items-center justify-center p-4">
            <Card className="w-full max-w-2xl shadow-lg">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold tracking-tight">
                        Request Leave
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="classIncharge">Class Incharge Name</Label>
                            <Input id="classIncharge" placeholder="Enter name" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="mentor">Mentor Name</Label>
                            <Input id="mentor" placeholder="Enter name" />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="fromDate">From Date</Label>
                            <Input id="fromDate" type="date" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="toDate">To Date</Label>
                            <Input id="toDate" type="date" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label>Leave Duration</Label>
                        <RadioGroup defaultValue="full" className="flex space-x-4">
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="full" id="full" />
                                <Label htmlFor="full">Full Day</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="half" id="half" />
                                <Label htmlFor="half">Half Day</Label>
                            </div>
                        </RadioGroup>
                    </div>
                    <div className="space-y-2">
                        <Label>Leave Type</Label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-center space-x-2">
                                <Checkbox id="medical" />
                                <Label htmlFor="medical">Medical Leave</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="personal" />
                                <Label htmlFor="personal">Personal Leave</Label>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="reason">Reason for Leave</Label>
                        <Textarea id="reason" placeholder="Please provide a detailed reason for your leave request" />
                    </div>
                    <Button className="w-full">Submit Leave Request</Button>
                </CardContent>
            </Card>
        </div>
    )
}