"use client";

import { Batch, Department, Section, Staff } from "@prisma/client";
import axios from "axios";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ScaleLoader } from "react-spinners";
import { LogIn } from "lucide-react";

const SignUpComp = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Staff>();
  const watchDept = watch("departmentId");
  const watchInCharge = watch("isClassIncharge");
  const [curBatch, setCurBatch] = useState("");
  const watchSec = watch("sectionId");
  const [dept, setDept] = useState<Department[]>([]);
  const [batch, setBatch] = useState<Batch[]>([]);
  const [sec, setSec] = useState<Section[]>([]);
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

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
  }, [watchDept, watchInCharge]);

  useEffect(() => {
    const fetchSec = async () => {
      if (curBatch && watchDept) {
        const section = await axios.get(
          `/api/section?dept=${watchDept}&batch=${curBatch}`
        );
        setSec(section.data);
      }
    };
    fetchSec();
  }, [curBatch, watchDept]);

  const onSubmit: SubmitHandler<Staff> = (data) => {
    setIsSubmitting(true); 
    axios
      .post("/api/user/staff", data)
      .then(() => {
        router.push("/staff/signin");  // Redirect on success
      })
      .catch((err) => {
        console.log(err.response?.data?.message || "An error occurred during submission.");
      })
      .finally(() => {
        setIsSubmitting(false);  
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Name Field */}
      <div className="space-y-2">
        <Label htmlFor="staffName">Name</Label>
        <Input
          id="staffName"
          placeholder="John Doe"
          {...register("staffName", { required: "Name is required" })}
        />
        {errors.staffName && (
          <p className="text-red-500 text-sm">{errors.staffName.message}</p>
        )}
      </div>

      {/* Email Field */}
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="john@example.com"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
              message: "Invalid email address",
            },
          })}
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>

      {/* Phone Field */}
      <div className="space-y-2">
        <Label htmlFor="staffPhone">Phone</Label>
        <Input
          id="staffPhone"
          type="tel"
          placeholder="1234567890"
          {...register("staffPhone")}
        />
      </div>

      {/* Password Field */}
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          })}
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
      </div>

      {/* Department Field */}
      <div className="space-y-2 col-span-1 md:col-span-2">
        <Label htmlFor="department">Department</Label>
        <Select
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

      {/* Role Checkboxes */}
      <div className="flex gap-3 flex-col ">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="isHoD"
            onCheckedChange={(checked: boolean) => setValue("isHoD", checked)}
          />
          <Label htmlFor="isHoD">Head of Department</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="isClassIncharge"
            onCheckedChange={(checked: boolean) =>
              setValue("isClassIncharge", checked)
            }
          />
          <Label htmlFor="isClassIncharge">Class In Charge</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="isMentor"
            onCheckedChange={(checked: boolean) =>
              setValue("isMentor", checked)
            }
          />
          <Label htmlFor="isMentor">Mentor</Label>
        </div>
      </div>

      {/* Batch and Section Fields (Visible when Class In Charge is selected) */}
      {watchInCharge && (
        <div className="space-y-4 col-span-1 md:col-span-2">
          <div className="space-y-2">
            <Label htmlFor="batch">Batch</Label>
            <Select value={curBatch} onValueChange={setCurBatch}>
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

          <div className="space-y-2">
            <Label htmlFor="section">Section</Label>
            <Select
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
            {errors.sectionId && (
              <p className="text-red-500 text-sm">{errors.sectionId.message}</p>
            )}
          </div>
        </div>
      )}

      {/* Submit Button */}
      <div className="col-span-1 md:col-span-2">
      <Button type="submit" className="w-full py-2 dark:bg-slate-400">
            {isSubmitting ?
              <ScaleLoader height={15} radius={50} color="white" />
              :
              <>
                Signup <LogIn className="ml-2 h-4 w-4" />
              </>
            }
          </Button>
      </div>
    </form>

  );
};

export default SignUpComp;
