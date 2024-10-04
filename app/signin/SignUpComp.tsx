"use client";

import { Batch, Department, Section, Student } from "@prisma/client";
import { Button, Flex, Select, Text, TextField } from "@radix-ui/themes";
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
    <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
      <Flex direction="column">
        <Text>Roll No:</Text>
        <TextField.Root
          placeholder="23LCSEB01"
          {...register("rollNo", {
            required: "Roll No is Required",
            pattern: {
              value: /^\d{2}[A-Za-z]{4,5}\d{2}$/,
              message: "Invalid Roll Number",
            },
          })}
        >
          <TextField.Slot>
            <FileDigit />
          </TextField.Slot>
        </TextField.Root>
        <Text color="red">{errors.rollNo?.message}</Text>
      </Flex>
      <Flex direction="column">
        <Text>Register No:</Text>
        <TextField.Root
          placeholder="913122104302"
          {...register("registerNo", {
            required: "Register Number is required",
            minLength: {
              value: 12,
              message: "Must be 12 charcters length",
            },
          })}
        >
          <TextField.Slot>
            <BookUser />
          </TextField.Slot>
        </TextField.Root>
        <Text color="red">{errors.registerNo?.message}</Text>
      </Flex>
      <Flex direction="column">
        <Text>Name:</Text>
        <TextField.Root
          placeholder="Balaji P N"
          {...register("name", { required: "Name is Required" })}
        >
          <TextField.Slot>
            <User />
          </TextField.Slot>
        </TextField.Root>
        <Text color="red">{errors.name?.message}</Text>
      </Flex>
      <Flex direction="column">
        <Text>Email:</Text>
        <TextField.Root
          placeholder="balajipn005@gmail.com"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
              message: "Invalid email address",
            },
          })}
        >
          <TextField.Slot>
            <Mail />
          </TextField.Slot>
        </TextField.Root>
        <Text color="red">{errors.email?.message}</Text>
      </Flex>
      <Flex direction="column">
        <Text>Phone:</Text>
        <TextField.Root placeholder="6379889613" {...register("phone")}>
          <TextField.Slot>
            <Phone />
          </TextField.Slot>
        </TextField.Root>
      </Flex>
      <Flex direction="column">
        <Text>Password:</Text>
        <TextField.Root
          placeholder="********"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          })}
        >
          <TextField.Slot>
            <Key />
          </TextField.Slot>
        </TextField.Root>
        <Text color="red">{errors.password?.message}</Text>
      </Flex>
      <Flex gap="2">
        <Flex direction="column" className="flex-1">
          <Text>Department:</Text>
          <Select.Root
            value={watchDept}
            onValueChange={(val) => setValue("departmentId", val)}
            {...register("departmentId", {
              required: "Department must be selected",
            })}
          >
            <Select.Trigger>
              {dept.map((b) => (b.id == watchDept ? <>{b.deptName}</> : null))}
            </Select.Trigger>
            <Select.Content>
              {dept.map((d) => (
                <Select.Item value={d.id} key={d.id}>
                  {d.deptName}
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Root>
          <Text color="red">{errors.departmentId?.message}</Text>
        </Flex>
        <Flex direction="column" className="flex-1">
          <Text>Batch:</Text>
          <Select.Root
            value={watchBatch}
            onValueChange={(val) => setValue("batchId", val)}
            {...register("batchId", {
              required: "Batch must be selected",
            })}
          >
            <Select.Trigger>
              {batch.map((b) =>
                b.id == watchBatch ? <>{b.batchName}</> : null
              )}
            </Select.Trigger>
            <Select.Content>
              {batch.map((b) => (
                <Select.Item value={b.id} key={b.id}>
                  {b.batchName}
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Root>
          <Text color="red">{errors.batchId?.message}</Text>
        </Flex>
        <Flex direction="column" className="flex-1">
          <Text>Section:</Text>
          <Select.Root
            value={watchSec}
            onValueChange={(val) => setValue("sectionId", val)}
            {...register("sectionId", {
              required: "Section must be selected",
            })}
          >
            <Select.Trigger>
              {sec.map((s) => (s.id == watchSec ? <>{s.sectionName}</> : null))}
            </Select.Trigger>
            <Select.Content>
              {sec.map((s) => (
                <Select.Item value={s.id} key={s.id}>
                  {s.sectionName}
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Root>
          <Text color="red">{errors.sectionId?.message}</Text>
        </Flex>
      </Flex>
      <Button>
        Signup
        <LogIn />
      </Button>
    </form>
  );
};

export default SignUpComp;
