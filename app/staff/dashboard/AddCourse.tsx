"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DialogTitle } from "@radix-ui/react-dialog";
import { BadgePlus } from "lucide-react";
import ClassInfo from "./ClassInfo";
import { useForm } from "react-hook-form";
import { Course } from "@prisma/client";

const AddCourse = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Course>();
  return (
    <Dialog>
      <DialogTrigger>
        <Button className="gap-2">
          <span>Add Course</span>
          <BadgePlus />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>New Course</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <div className="flex flex-1">
              <span>Course Title:</span>
              <Input />
            </div>
            <div className="flex flex-1">
              <span>Course Code:</span>
              <Input />
            </div>
          </div>
          <div className="flex">
            <span>Course Description:</span>
            <Textarea />
          </div>
          {/* <ClassInfo /> */}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddCourse;
