"use client";
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { useEffect, useState } from 'react';

import React from 'react'

const LeaveForm = () => {
    return (
        <div className="flex items-center justify-center p-4">
            <Card className="w-full max-w-2xl shadow-lg">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold tracking-tight">
                        Request Leave
                    </CardTitle>
                </CardHeader>
                <form>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="fromDate">From Date</Label>
                                <Input
                                    name="fromDate"
                                    id="fromDate"
                                    type="date"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="toDate">To Date</Label>
                                <Input
                                    name="toDate"
                                    id="toDate"
                                    type="date"
                                    required
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>Leave Duration</Label>
                            <div className="space-y-2">
                                <div className="flex space-x-4">
                                    <div className="flex items-center space-x-2">
                                        <input
                                            type="radio"
                                            name="leaveDuration"
                                            value="full"
                                            id="full"
                                        />
                                        <Label htmlFor="full">Full Day</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <input
                                            type="radio"
                                            name="leaveDuration"
                                            value="half"
                                            id="half"
                                        />
                                        <Label htmlFor="half">Half Day</Label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-center space-x-2">
                                <input
                                    type='checkbox'
                                    name="forMedical"
                                    id="medical"
                                />
                                <Label htmlFor="medical">Medical Leave</Label>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="reason">Reason for Leave</Label>
                            <Textarea
                                name="reason"
                                id="reason"
                                placeholder="Please provide a detailed reason for your leave request"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>No. of Days</Label>
                            <Input
                                readOnly
                                type="number"
                                placeholder="No. of leave days"
                            />
                        </div>
                        <Button type="submit">Submit Leave Request</Button>
                    </CardContent>
                </form>
            </Card>
        </div>
    );
};

export default LeaveForm;
