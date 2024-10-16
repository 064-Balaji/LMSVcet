"use client";
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { useForm } from 'react-hook-form';
import React, { useState } from 'react';
import { Prisma } from '@prisma/client';
import { BarLoader, ScaleLoader } from 'react-spinners';
import axios from 'axios';
import { toast } from "sonner"

type LeavesWithRelations = Prisma.LeaveGetPayload<{
    include: {
        student: true;
        staff: true;
        department: true;
        section: true;
        courses: true;
    };
}>;

interface LeaveFormProps {
    userData: LeavesWithRelations;
    userType: 'staff' | 'student';
}


const LeaveForm: React.FC<LeaveFormProps> = ({ userData, userType }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        setValue
    } = useForm();

    const watchFromDate = watch('fromDate');
    const watchToDate = watch('toDate');
    const watchLeaveDuration = watch('leaveDuration', 'full');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    React.useEffect(() => {
        if (!userData) return;

        setValue('deptId', userData.department.id || '');
        setValue('sectionId', userData.section.id || '');
        setValue('userType', userType || '');

        if (userType === "student") {
            setValue('studentId', userData.id || '');
            setValue('batchId', userData.batchId || '');
            setValue('approvals', {
                mentorApproval: 'PENDING',
                classInchargeApproval: 'PENDING',
                hodApproval: 'PENDING',
            });
        } else if (userType === "staff") {
            setValue('staffId', userData.id || '');
            setValue('approvals', {
                hodApproval: 'PENDING',
            });
        }
    }, [userData, userType, setValue]);



    const isNonWorkingDay = (date: Date) => {
        const day = date.getDay(); // Sunday is 0, Saturday is 6
        const dateOfMonth = date.getDate();
        const isSecondSaturday = day === 6 && (dateOfMonth >= 8 && dateOfMonth <= 14); // 2nd Saturday
        const isFourthSaturday = day === 6 && (dateOfMonth >= 22 && dateOfMonth <= 28); // 4th Saturday
        return day === 0 || isSecondSaturday || isFourthSaturday;
    };

    const calculateLeaveDays = (fromDate: Date, toDate: Date) => {
        let dayDifference = 0;
        let currentDate = new Date(fromDate);

        while (currentDate <= toDate) {
            if (!isNonWorkingDay(currentDate)) {
                dayDifference++;
            }
            currentDate.setDate(currentDate.getDate() + 1);
        }
        if (watchLeaveDuration === 'half') {
            dayDifference = dayDifference === 1 ? 0.5 : dayDifference - 0.5;
        }

        return dayDifference;
    };

    React.useEffect(() => {
        if (watchFromDate && watchToDate) {
            const fromDate = new Date(watchFromDate);
            const toDate = new Date(watchToDate);
            if (toDate >= fromDate) {
                const days = calculateLeaveDays(fromDate, toDate);
                setValue('days', days > 0 ? days : 0);
            } else {
                setValue('days', 0);
            }
        }
    }, [watchFromDate, watchToDate, watchLeaveDuration, setValue]);


    const onSubmit = async (data: any) => {
        setIsSubmitting(true);
        setSuccessMessage(null);
        setErrorMessage(null);
        try {
            const response = await axios.post("/api/leave", data);
            setSuccessMessage(response.data.message || "Leave request submitted successfully.");
            toast("Leave request submitted successfully.", {
                description: "Updates will be notified via mail",
            })
        } catch (err: any) {
            console.log(err.response?.data?.message || "An error occurred during submission.");
            setErrorMessage(err.response?.data?.message || "An error occurred during submission.");
            toast("An error occurred during submission.", {
                description: "Cannot Submit the leave",
            })
        } finally {
            setIsSubmitting(false);
        }
    };



    return (
        <div className="flex items-center justify-center p-4">
            <Card className="w-full max-w-2xl shadow-lg">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold tracking-tight">
                        Request Leave
                    </CardTitle>
                </CardHeader>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="fromDate">From Date</Label>
                                <Input
                                    {...register('fromDate', {
                                        required: 'From Date is required',
                                        validate: (value) => {
                                            const selectedDate = new Date(value);
                                            const today = new Date();
                                            today.setHours(0, 0, 0, 0);
                                            return selectedDate >= today || 'From Date cannot be in the past';
                                        }
                                    })}
                                    id="fromDate"
                                    type="date"
                                    disabled={isSubmitting}
                                />
                                {errors.fromDate && typeof errors.fromDate.message === 'string' && (
                                    <p className="text-red-500">{errors.fromDate.message}</p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="toDate">To Date</Label>
                                <Input
                                    {...register('toDate', {
                                        required: 'To Date is required',
                                        validate: (value) =>
                                            new Date(value) >= new Date(watchFromDate) ||
                                            'To Date cannot be before From Date',
                                    })}
                                    id="toDate"
                                    type="date"
                                    disabled={isSubmitting}
                                />
                                {errors.toDate && typeof errors.toDate.message === 'string' && (
                                    <p className="text-red-500">{errors.toDate.message}</p>
                                )}
                            </div>
                        </div>



                        <div className="space-y-2">
                            <Label>Leave Duration</Label>
                            <div className="flex space-x-4">
                                <div className="flex items-center space-x-2">
                                    <input
                                        {...register('leaveDuration', { required: 'Please select a leave duration' })}
                                        type="radio"
                                        value="full"
                                        id="full"
                                        disabled={isSubmitting}
                                    />
                                    <Label htmlFor="full">Full Day</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <input
                                        {...register('leaveDuration')}
                                        type="radio"
                                        value="half"
                                        id="half"
                                        disabled={isSubmitting}
                                    />
                                    <Label htmlFor="half">Half Day</Label>
                                </div>
                            </div>
                            {errors.leaveDuration && typeof errors.leaveDuration.message === 'string' && (
                                <p className="text-red-500">{errors.leaveDuration.message}</p>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-center space-x-2">
                                <input
                                    {...register('forMedical')}
                                    type='checkbox'
                                    id="medical"
                                    disabled={isSubmitting}
                                />
                                <Label htmlFor="medical">Medical Leave</Label>
                            </div>
                        </div>
                        {userType === 'staff' && (
                            <div className="space-y-2">
                                <Label htmlFor="leaveType">Leave Type</Label>
                                <select {...register('leaveType', { required: 'Please select a leave type' })} id="leaveType"
                                    disabled={isSubmitting}>
                                    <option value="">Select Leave Type</option>
                                    <option value="sick">Sick Leave</option>
                                    <option value="vacation">Vacation Leave</option>
                                    <option value="casual">Casual Leave</option>
                                    {/* Add more leave types as necessary */}
                                </select>
                                {errors.leaveType && typeof errors.leaveType.message === 'string' && (
                                    <p className="text-red-500">{errors.leaveType.message}</p>
                                )}
                            </div>
                        )}
                        <div className="space-y-2">
                            <Label htmlFor="reason">Reason for Leave</Label>
                            <Textarea
                                {...register('reason', {
                                    required: 'Please provide a reason for leave',
                                })}
                                id="reason"
                                disabled={isSubmitting}
                                placeholder="Please provide a detailed reason for your leave request"
                            />
                            {errors.reason && typeof errors.reason.message === 'string' && (
                                <p className="text-red-500">{errors.reason.message}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label>No. of Days</Label>
                            <Input
                                {...register('days')}
                                readOnly
                                type="number"
                                disabled={isSubmitting}
                                placeholder="No. of leave days"
                            />
                        </div>
                        {/* {successMessage && (
                            <div className="mb-4 text-green-600">
                                {successMessage}
                            </div>
                        )}
                        {errorMessage && (
                            <div className="mb-4 text-red-600">
                                {errorMessage}
                            </div>
                        )} */}
                        <Button type="submit" className="w-full py-2 dark:bg-slate-400">
                            {isSubmitting ?
                                <ScaleLoader height={15} radius={50} color="white" />
                                :
                                "Submit Leave Request"
                            }

                        </Button>
                    </CardContent>
                </form>
            </Card>
        </div>
    );
};

export default LeaveForm;
