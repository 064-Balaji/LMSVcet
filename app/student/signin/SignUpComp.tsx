"use client";

import { Batch, Department, Section, Student } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import {
  LogIn
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Label } from "@radix-ui/react-dropdown-menu";
import { ScaleLoader } from 'react-spinners';

const SignUpComp = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Student>();
  const watchDept = watch("departmentId");
  const watchBatch = watch("batchId");
  const watchSec = watch("sectionId");
  const [dept, setDept] = useState<Department[]>([]);
  const [batch, setBatch] = useState<Batch[]>([]);
  const [sec, setSec] = useState<Section[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const fetchDept = async () => {
      const dept = await axios.get("/api/dept");
      setDept(dept.data);
    };
    fetchDept();
  }, []);

  useEffect(() => {
    const fetchBatch = async () => {
      const batch = await axios.get(`/api/batch?dept=${watchDept}`);
      setBatch(batch.data);
    };

    if (watchDept != "") fetchBatch();
  }, [watchDept]);

  useEffect(() => {
    const fetchSec = async () => {
      const section = await axios.get(
        `/api/section?dept=${watchDept}&batch=${watchBatch}`
      );
      setSec(section.data);
    };

    if (watchBatch != "") fetchSec();
  }, [watchBatch]);

  const onSubmit: SubmitHandler<Student> = (data) => {
    setIsSubmitting(true);  // Start the submission

    axios
      .post("/api/user/student", data)
      .then(() => {
        router.push("/student/signin");  // Redirect on success
      })
      .catch((err) => {
        console.log(err.response?.data?.message || "An error occurred during submission.");
      })
      .finally(() => {
        setIsSubmitting(false);  // Stop the loading state
      });
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-4">
          <div className="space-y-2">
            <Label>Roll No</Label>
            <div className="relative">
              <Input
                id="rollNo"
                placeholder="22cseb48"
                {...register("rollNo", {
                  required: "Roll No Number is required",
                  minLength: {
                    value: 8,
                    message: "Must be 8 characters length",
                  },
                })}
              />
            </div>
            {errors.rollNo && (
              <p className="text-red-500 text-sm">{errors.rollNo.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label>Register No</Label>
            <div className="relative">
              <Input
                id="registerNo"
                placeholder="913122104302"
                {...register("registerNo", {
                  required: "Register Number is required",
                  minLength: {
                    value: 12,
                    message: "Must be 12 characters length",
                  },
                })}
              />
            </div>
            {errors.registerNo && (
              <p className="text-red-500 text-sm">{errors.registerNo.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label>Name</Label>
            <div className="relative">
              <Input
                id="name"
                placeholder="Balaji P N"
                {...register("name", { required: "Name is Required" })}
              />
            </div>
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label>Email      </Label>
            <div className="relative">
              <Input
                id="email"
                placeholder="balajipn005@gmail.com"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                    message: "Invalid email address",
                  },
                })} />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}

          </div>
          <div className="space-y-2">
            <Label>Phone      </Label>
            <div className="relative">
              <Input
                id="phone"
                placeholder="6379889613"
                {...register("phone", {
                  pattern: {
                    value: /^[6-9]\d{9}$/,
                    message: "Invalid phone number",
                  },
                })}
              />
            </div>
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label>Password      </Label>

            <div className="relative">
              <Input
                id="password"
                type="password"
                placeholder="********"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
              />
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>
        </div>
        <div className="grid gap-4">
          <div className="space-y-2">
            <label htmlFor="department" className="block text-sm font-medium  ">
              Department
            </label>
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
              <p className="text-red-500 text-sm">
                {errors.departmentId.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="batch" className="block text-sm font-medium  ">
              Batch
            </label>
            <Select
              value={watchBatch}
              onValueChange={(val) => setValue("batchId", val)}
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
            {errors.batchId && (
              <p className="text-red-500 text-sm">{errors.batchId.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="section" className="block text-sm font-medium  ">
              Section
            </label>
            <Select
              value={watchSec}
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

          <Button type="submit" className="w-full dark:bg-slate-400 py-2">
            {isSubmitting ?
              <ScaleLoader height={15} radius={50}  color="white"/>
              :
              <>
                Signup <LogIn className="ml-2 h-4 w-4" />
              </>
            }
          </Button>
        </div>
      </form>
    </>
  );
};

export default SignUpComp;
