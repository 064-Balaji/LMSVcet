"use client";

import { Department } from "@prisma/client";
import { Button, Flex, Select, Text, TextField } from "@radix-ui/themes";
import axios from "axios";
import {
  BookUser,
  Building,
  CalendarDays,
  FileDigit,
  House,
  Key,
  Mail,
  Phone,
  User,
} from "lucide-react";
import React, { useEffect, useState } from "react";

const SignUpComp = () => {
  const [curDept, setCurDept] = useState("");
  const [dept, setDept] = useState<Department[]>([]);

  useEffect(() => {
    const fetchDept = async () => {
      const dept = await axios.get("/api/dept");
      setDept(dept.data);
    };
    fetchDept();
  }, []);

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
          <Select.Trigger>{curDept}</Select.Trigger>
          <Select.Content>
            {/* <Select.Item value="Hello">Choose the Department</Select.Item> */}
            {dept.map((d) => (
              <Select.Item value={d.id}>{d.deptName}</Select.Item>
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
      <Flex direction="column">
        <Text>Batch:</Text>
        <TextField.Root placeholder="913122104302">
          <TextField.Slot>
            <CalendarDays />
          </TextField.Slot>
        </TextField.Root>
      </Flex>
      <Button>Hello</Button>
    </form>
  );
};

export default SignUpComp;
