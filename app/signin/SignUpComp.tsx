"use client";

import { Batch, Department, Section, Student } from "@prisma/client";
import { Button, Flex, Select, Text, TextField } from "@radix-ui/themes";
import axios from "axios";
import { BookUser, FileDigit, Key, Mail, Phone, User } from "lucide-react";
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
  const [dept, setDept] = useState<Department[]>([]);
  const [batch, setBatch] = useState<Batch[]>([]);
  const [sec, setSec] = useState<Section[]>([]);

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

    fetchBatch();
  }, [watchDept]);

  useEffect(() => {
    const fetchSec = async () => {
      const section = await axios.get(
        `/api/section?dept=${watchDept}&batch=${watchBatch}`
      );
      setSec(section.data);
    };

    fetchSec();
  }, [watchBatch]);

  const onSubmit: SubmitHandler<Student> = (data) => console.log(data);

  return (
    <form
      className="flex flex-col gap-3 overflow-y-scroll"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Flex direction="column">
        <Text>Roll No:</Text>
        <TextField.Root placeholder="23LCSEB01" {...register("rollNo")}>
          <TextField.Slot>
            <FileDigit />
          </TextField.Slot>
        </TextField.Root>
      </Flex>
      <Flex direction="column">
        <Text>Register No:</Text>
        <TextField.Root placeholder="913122104302" {...register("registerNo")}>
          <TextField.Slot>
            <BookUser />
          </TextField.Slot>
        </TextField.Root>
      </Flex>
      <Flex direction="column">
        <Text>Name:</Text>
        <TextField.Root placeholder="Balaji P N" {...register("name")}>
          <TextField.Slot>
            <User />
          </TextField.Slot>
        </TextField.Root>
      </Flex>
      <Flex direction="column">
        <Text>Email:</Text>
        <TextField.Root
          placeholder="balajipn005@gmail.com"
          {...register("email")}
        >
          <TextField.Slot>
            <Mail />
          </TextField.Slot>
        </TextField.Root>
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
        <TextField.Root placeholder="********" {...register("password")}>
          <TextField.Slot>
            <Key />
          </TextField.Slot>
        </TextField.Root>
      </Flex>
      <Flex direction="column">
        <Text>Department:</Text>
        <Select.Root
          value={watchDept}
          onValueChange={(val) => setValue("departmentId", val)}
          {...register("departmentId")}
        >
          <Select.Trigger>
            {dept.map((d) => (d.id == watchDept ? <>{d.deptName}</> : null))}
          </Select.Trigger>
          <Select.Content>
            {dept.map((d) => (
              <Select.Item value={d.id} key={d.id}>
                {d.deptName}
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Root>
      </Flex>
      <Flex direction="column">
        <Text>Batch:</Text>
        <Select.Root
          value={watchBatch}
          onValueChange={(val) => setValue("batchId", val)}
          {...register("batchId")}
        >
          <Select.Trigger>
            {batch.map((b) => (b.id == curBatch ? <>{b.batchName}</> : null))}
          </Select.Trigger>
          <Select.Content>
            {batch.map((b) => (
              <Select.Item value={b.id} key={b.id}>
                {b.batchName}
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Root>
      </Flex>
      <Flex direction="column">
        <Text>Section:</Text>
        <Select.Root value={curSec} onValueChange={setCurSec}>
          <Select.Trigger>{curSec}</Select.Trigger>
          <Select.Content>
            {sec.map((s) => (
              <Select.Item value={s.sectionName} key={s.id}>
                {s.sectionName}
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Root>
      </Flex>
      <Button>Hello</Button>
    </form>
  );
};

export default SignUpComp;
