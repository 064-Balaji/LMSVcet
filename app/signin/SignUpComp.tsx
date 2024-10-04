"use client";

import { Batch, Department, Section } from "@prisma/client";
import { Button, Flex, Select, Text, TextField } from "@radix-ui/themes";
import axios from "axios";
import {
  BookUser,
  CalendarDays,
  FileDigit,
  House,
  Key,
  Mail,
  Phone,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";

const SignUpComp = () => {
  const [curDept, setCurDept] = useState("");
  const [curSec, setCurSec] = useState("");
  const [curBatch, setCurBatch] = useState("");
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
      const section = await axios.get(`/api/batch?dept=${curDept}`);
      setBatch(section.data);
    };

    fetchBatch();
  }, [curDept]);

  return (
    <form action="" className="flex flex-col gap-3 overflow-y-scroll">
      <Flex direction="column">
        <Text>Roll No:</Text>
        <TextField.Root placeholder="23LCSEB01">
          <TextField.Slot>
            <FileDigit />
          </TextField.Slot>
        </TextField.Root>
      </Flex>
      <Flex direction="column">
        <Text>Register No:</Text>
        <TextField.Root placeholder="913122104302">
          <TextField.Slot>
            <BookUser />
          </TextField.Slot>
        </TextField.Root>
      </Flex>
      <Flex direction="column">
        <Text>Name:</Text>
        <TextField.Root placeholder="Balaji P N">
          <TextField.Slot>
            <User />
          </TextField.Slot>
        </TextField.Root>
      </Flex>
      <Flex direction="column">
        <Text>Email:</Text>
        <TextField.Root placeholder="balajipn005@gmail.com">
          <TextField.Slot>
            <Mail />
          </TextField.Slot>
        </TextField.Root>
      </Flex>
      <Flex direction="column">
        <Text>Phone:</Text>
        <TextField.Root placeholder="6379889613">
          <TextField.Slot>
            <Phone />
          </TextField.Slot>
        </TextField.Root>
      </Flex>
      <Flex direction="column">
        <Text>Password:</Text>
        <TextField.Root placeholder="********">
          <TextField.Slot>
            <Key />
          </TextField.Slot>
        </TextField.Root>
      </Flex>
      <Flex direction="column">
        <Text>Department:</Text>
        <Select.Root value={curDept} onValueChange={setCurDept}>
          <Select.Trigger>
            {dept.map((d) => (d.id == curDept ? <>{d.deptName}</> : null))}
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
        <Select.Root value={curBatch} onValueChange={setCurBatch}>
          <Select.Trigger>
            {batch.map((b) => (b.id == curDept ? <>{b.batchName}</> : null))}
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
        <TextField.Root placeholder="913122104302">
          <TextField.Slot>
            <House />
          </TextField.Slot>
        </TextField.Root>
      </Flex>
      <Button>Hello</Button>
    </form>
  );
};

export default SignUpComp;
