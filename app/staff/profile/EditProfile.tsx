"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Batch, Course, Department, Prisma, Section, Staff } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type StaffWithRelations = Prisma.StaffGetPayload<{
  include: {
    staff: true,
    department: true,
    section: true,
    courses: true,
  };
}>;

const EditProfile = ({ userData }: { userData: any }) => {
  if (!userData) {
    return <div>No user data available</div>;
  }
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<StaffWithRelations>();
  const watchDept = watch("departmentId");
  const [isLoading, setIsLoading] = useState(false);
  const [disableAllFields, setDisableAllFields] = useState(true);
  const [curBatch, setCurBatch] = useState("");
  const watchSec = watch("sectionId");
  const [dept, setDept] = useState<Department[]>([]);
  const [batch, setBatch] = useState<Batch[]>([]);
  const [sec, setSec] = useState<Section[]>([]);
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEditTrigger = () => {
    setDisableAllFields(!disableAllFields);
  };

  useEffect(() => {
    const fetchDept = async () => {
      const dept = await axios.get("/api/dept");
      setDept(dept.data);
    };
    fetchDept();
  }, []);

  useEffect(() => {
    const fetchBatch = async () => {
      if (watchDept) {
        const batch = await axios.get(`/api/batch?dept=${watchDept}`);
        setBatch(batch.data);
      }
    };
    fetchBatch();
  }, [watchDept]);

  useEffect(() => {
    const fetchSec = async () => {
      if (curBatch && watchDept) {
        const section = await axios.get(`/api/section?dept=${watchDept}&batch=${curBatch}`);
        setSec(section.data);
      }
    };
    fetchSec();
  }, [curBatch, watchDept]);

  useEffect(() => {
    if (userData) {
      setValue("staffName", userData.staffName || "");
      setValue("email", userData.email || "");
      setValue("staffPhone", userData.staffPhone || "");
      setValue("departmentId", userData.department?.id || "");
      setValue("sectionId", userData.section?.id || "");
      setCurBatch(userData.section?.batchId || "");
    }
  }, [userData, setValue]);


  if (isLoading) {
    return <div>Loading...</div>;
  }

  const onSubmit: SubmitHandler<StaffWithRelations> = async (data) => {
    // Handle submit logic here
    console.log(data);
  };

  return (
    <Dialog>
      <DialogTrigger className="bg-black text-white p-2 rounded-md">
        <span>Edit Profile</span>
      </DialogTrigger>
      {userData ?
        (
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit Profile</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col items-center">
              <Avatar className="h-32 w-32 mb-4">
                <AvatarImage src={''} />
                <AvatarFallback>{userData?.staffName.split(' ').map((n: string) => n[0].toUpperCase()).join('')}</AvatarFallback>
              </Avatar>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-3 items-center gap-2 py-2">
                <Label className="text-md">Name</Label>
                <Input
                  className="col-span-2"
                  disabled={disableAllFields}
                  {...register("staffName", { required: "Name is required" })}
                  defaultValue={userData.staffName}
                />
                {errors.staffName && <p className="text-red-500 text-sm">{errors.staffName.message}</p>}
              </div>

              <div className="grid grid-cols-3 items-center gap-2 py-2">
                <Label className="text-md">Email</Label>
                <Input
                  className="col-span-2"
                  disabled={disableAllFields}
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
                      message: "Invalid email address",
                    },
                  })}
                  defaultValue={userData.email}
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
              </div>

              <div className="grid grid-cols-3 items-center gap-2 py-2">
                <Label className="text-md">Phone</Label>
                <Input
                  className="col-span-2"
                  disabled={disableAllFields}
                  {...register("staffPhone", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: "Invalid phone number",
                    },
                  })}
                  defaultValue={userData.staffPhone || ''}
                />
                {errors.staffPhone && <p className="text-red-500 text-sm">{errors.staffPhone.message}</p>}
              </div>

              <div className="grid grid-cols-2 gap-3 py-2">
                <div className="space-y-2 col-span-1 md:col-span-2">
                  <Label className="text-md" htmlFor="department">Department</Label>
                  <Select
                    disabled={disableAllFields}
                    value={watchDept}
                    onValueChange={(val) => setValue("departmentId", val)}
                  >
                    <SelectTrigger id="department">
                      <SelectValue placeholder="Select Department" />
                    </SelectTrigger>
                    <SelectContent>
                      {dept.map((d) => (
                        <SelectItem key={d.id} value={d.id}>
                          {d.deptName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.departmentId && (
                    <p className="text-red-500 text-sm">{errors.departmentId.message}</p>
                  )}
                </div>

                <div className="space-y-2 py-2">
                  <Label className="text-md" htmlFor="batch">Batch</Label>
                  <Select
                    disabled={disableAllFields}
                    value={curBatch}
                    onValueChange={setCurBatch}
                  >
                    <SelectTrigger id="batch">
                      <SelectValue placeholder="Select Batch" />
                    </SelectTrigger>
                    <SelectContent>
                      {batch.map((b) => (
                        <SelectItem key={b.id} value={b.id}>
                          {b.batchName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2 py-2">
                  <Label className="text-md" htmlFor="section">Section</Label>
                  <Select
                    disabled={disableAllFields}
                    value={watchSec!}
                    onValueChange={(val) => setValue("sectionId", val)}
                  >
                    <SelectTrigger id="section">
                      <SelectValue placeholder="Select Section" />
                    </SelectTrigger>
                    <SelectContent>
                      {sec.map((s) => (
                        <SelectItem key={s.id} value={s.id}>
                          {s.sectionName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <DialogFooter className="pt-3">
                <div className="flex items-center justify-between w-full">
                  <div className="flex flex-1">
                    <Button type="submit" className="w-[100px]">
                      {disableAllFields ? "Edit Profile" : "Save"}
                    </Button>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline">Change Password</Button>
                    <Button variant="destructive">Delete Account</Button>
                  </div>
                </div>
              </DialogFooter>
            </form>
          </DialogContent>

        )
        : (
          <div>Loading user data...</div>
        )}
    </Dialog>
  );
};

export default EditProfile;
