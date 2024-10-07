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
  BookUser,
  FileDigit,
  Key,
  LogIn,
  Mail,
  Phone,
  User,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

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

  const onSubmit: SubmitHandler<Student> = (data) =>
    axios.post("/api/user/student", data).then(() => router.push("/"));

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-2">
        <label htmlFor="rollNo" className="block text-sm font-medium">
          Roll No
        </label>
        <div className="relative">
          <FileDigit className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" />
          <Input
            id="rollNo"
            className="pl-10"
            placeholder="23LCSEB01"
            {...register("rollNo", {
              required: "Roll No is Required",
              pattern: {
                value: /^\d{2}[A-Za-z]{4,5}\d{2}$/,
                message: "Invalid Roll Number",
              },
            })}
          />
        </div>
        {errors.rollNo && (
          <p className="text-red-500 text-sm">{errors.rollNo.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="registerNo" className="block text-sm font-medium  ">
          Register No
        </label>
        <div className="relative">
          <BookUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" />
          <Input
            id="registerNo"
            className="pl-10"
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
        <label htmlFor="name" className="block text-sm font-medium  ">
          Name
        </label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" />
          <Input
            id="name"
            className="pl-10"
            placeholder="Balaji P N"
            {...register("name", { required: "Name is Required" })}
          />
        </div>
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-medium  ">
          Email
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" />
          <Input
            id="email"
            className="pl-10"
            placeholder="balajipn005@gmail.com"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                message: "Invalid email address",
              },
            })}
          />
        </div>
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="phone" className="block text-sm font-medium  ">
          Phone
        </label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" />
          <Input
            id="phone"
            className="pl-10"
            placeholder="6379889613"
            {...register("phone")}
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="password" className="block text-sm font-medium  ">
          Password
        </label>
        <div className="relative">
          <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" />
          <Input
            id="password"
            type="password"
            className="pl-10"
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
      </div>

      <Button type="submit" className="w-full">
        Signup <LogIn className="ml-2 h-4 w-4" />
      </Button>
    </form>
  );
};

export default SignUpComp;
