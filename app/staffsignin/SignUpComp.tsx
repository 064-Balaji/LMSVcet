"use client";

import { Batch, Department, Section, Staff } from "@prisma/client";
import {
  Button,
  Flex,
  Select,
  Switch,
  Text,
  TextField,
} from "@radix-ui/themes";
import axios from "axios";
import { Key, LogIn, Mail, Phone, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm, useFieldArray } from "react-hook-form";

const SignUpComp = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useForm<Staff>();
  const watchDept = watch("departmentId");
  const watchInCharge = watch("isClassIncharge");
  const watchMentor = watch("isMentor");
  const watchBatch = watch("batchId");
  const watchSec = watch("sectionId");
  const [dept, setDept] = useState<Department[]>([]);
  const [batch, setBatch] = useState<Batch[]>([]);
  const [sec, setSec] = useState<Section[]>([]);

  const router = useRouter();

  const {
    fields: mentorBatchFields,
    append: addBatch,
    remove: removeBatch,
  } = useFieldArray({
    control,
    name: "",
  });

  const addMentorBatch = () => {
    addBatch({ batchId: "", sectionId: "" });
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
      const batch = await axios.get(`/api/batch?dept=${watchDept}`);
      setBatch(batch.data);
    };

    if (watchDept != "") fetchBatch();
  }, [watchInCharge]);

  useEffect(() => {
    const fetchSec = async () => {
      const section = await axios.get(
        `/api/section?dept=${watchDept}&batch=${watchBatch}`
      );
      setSec(section.data);
    };

    if (watchBatch != "") fetchSec();
  }, [watchBatch]);

  const onSubmit: SubmitHandler<Staff> = (data) => console.log(data);

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
      <Flex direction="column">
        <Text>Name:</Text>
        <TextField.Root
          placeholder="Balaji P N"
          {...register("staffName", { required: "Name is Required" })}
        >
          <TextField.Slot>
            <User />
          </TextField.Slot>
        </TextField.Root>
        <Text color="red">{errors.staffName?.message}</Text>
      </Flex>
      <Flex direction="column">
        <Text>Email:</Text>
        <TextField.Root
          placeholder="balajipn005@gmail.com"
          {...register("staffMail", {
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
        <Text color="red">{errors.staffMail?.message}</Text>
      </Flex>
      <Flex direction="column">
        <Text>Phone:</Text>
        <TextField.Root placeholder="6379889613" {...register("staffPhone")}>
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
      <Flex direction="column">
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
      <Flex align="center" gap="3">
        <Text>Are you Head of the Department? </Text>
        <Switch {...register("isHoD")} />
      </Flex>
      <Flex align="center" gap="3">
        <Text>Are you Class In Charge? </Text>
        <Switch onCheckedChange={(c) => setValue("isClassIncharge", c)} />
      </Flex>
      <Flex align="center" gap="3">
        <Text>Are you Mentor? </Text>
        <Switch onCheckedChange={(c) => setValue("isMentor", c)} />
      </Flex>

      {/* Class In-Charge Section */}
      {watchInCharge && (
        <Flex gap="2">
          <Flex direction="column" className="flex-1">
            <Text>Batch:</Text>
            <Select.Root
              value={watchBatch || undefined}
              onValueChange={(val) => setValue("", val)}
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
              value={watchBatch!}
              onValueChange={(val) => setValue("sectionId", val)}
              {...register("sectionId", {
                required: "Section must be selected",
              })}
            >
              <Select.Trigger>
                {sec.map((b) =>
                  b.id == watchSec ? <>{b.sectionName}</> : null
                )}
              </Select.Trigger>
              <Select.Content>
                {sec.map((b) => (
                  <Select.Item value={b.id} key={b.id}>
                    {b.sectionName}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Root>
            <Text color="red">{errors.sectionId?.message}</Text>
          </Flex>
        </Flex>
      )}

      {/* Mentor Batch and Section Section */}
      {watchMentor && (
        <Flex direction="column" gap="2">
          <Text>Mentor Batches and Sections:</Text>
          {mentorBatchFields.map((item, index) => (
            <Flex key={item.id} gap="2">
              <Flex direction="column" className="flex-1">
                <Text>Batch:</Text>
                <Select.Root
                  value={watchBatch || undefined}
                  onValueChange={(val) =>
                    setValue(`mentorBatches.${index}.batchId`, val)
                  }
                  {...register(`mentorBatches.${index}.batchId`, {
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
              </Flex>
              <Flex direction="column" className="flex-1">
                <Text>Section:</Text>
                <Select.Root
                  value={watchSec || undefined}
                  onValueChange={(val) =>
                    setValue(`mentorBatches.${index}.sectionId`, val)
                  }
                  {...register(`mentorBatches.${index}.sectionId`, {
                    required: "Section must be selected",
                  })}
                >
                  <Select.Trigger>
                    {sec.map((b) =>
                      b.id == watchSec ? <>{b.sectionName}</> : null
                    )}
                  </Select.Trigger>
                  <Select.Content>
                    {sec.map((b) => (
                      <Select.Item value={b.id} key={b.id}>
                        {b.sectionName}
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select.Root>
              </Flex>
              <Button onClick={() => removeBatch(index)}>Remove</Button>
            </Flex>
          ))}
          <Button onClick={addMentorBatch}>Add Batch and Section</Button>
        </Flex>
      )}

      <Button color="violet" type="submit">
        Register
      </Button>
    </form>
  );
};

export default SignUpComp;
