"use client";

import React, { useState, useRef } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DialogTitle } from "@radix-ui/react-dialog";
import createClient from "@/components/supabase";
import { X, Upload, File as FileIcon } from "lucide-react";
import { Assignment } from "@prisma/client";
import axios from "axios";
import { toast } from "sonner";

const supabase = createClient;

const AddAssignment = ({ courseId }: { courseId: string }) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<Assignment>();

  const onSubmit: SubmitHandler<Assignment> = async (data) => {
    setIsUploading(true);
    try {
      const uploadedFileUrls = await Promise.all(
        selectedFiles.map(async (file) => {
          const { data: uploadData, error } = await supabase.storage
            .from("assignments")
            .upload(`${courseId}/${file.name}`, file);

          if (error) throw error;
          return uploadData?.path;
        })
      );

      const assignmentData = {
        ...data,
        docs: uploadedFileUrls.filter(
          (url): url is string => url !== undefined
        ),
        courseId,
      };

      console.log("Assignment data to be submitted:", assignmentData);

      axios
        .post("/api/course/assignment", assignmentData)
        .then(() => toast.success("assignment uploaded"))
        .catch(() => toast.error("something went wrong while creation"));

      reset();
      setSelectedFiles([]);
    } catch (error) {
      console.error("Error submitting assignment:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(Array.from(e.target.files));
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles((files) => files.filter((_, i) => i !== index));
  };

  return (
    <div className="flex justify-between mx-2 items-center">
      <p>Add Assignment</p>
      <Dialog>
        <DialogTrigger asChild>
          <Button>Add Assignment</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Assignment</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                {...register("title", { required: "Title is required" })}
              />
              {errors.title && (
                <span className="text-red-500">{errors.title.message}</span>
              )}
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" {...register("description")} />
            </div>

            <div>
              <Label htmlFor="referLink">Reference Link</Label>
              <Input id="referLink" type="url" {...register("referLink")} />
            </div>

            <div>
              <Label htmlFor="dueDate">Due Date</Label>
              <Controller
                name="dueDate"
                control={control}
                rules={{ required: "Due date is required" }}
                render={({ field }) => (
                  <Input type="datetime-local" {...register("dueDate")} />
                )}
              />
              {errors.dueDate && (
                <span className="text-red-500">{errors.dueDate.message}</span>
              )}
            </div>

            <div>
              <Label>Documents</Label>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                onChange={handleFileChange}
                className="hidden"
              />
              <div
                onClick={() => fileInputRef.current?.click()}
                className="cursor-pointer border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors"
              >
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-600">
                  Click to upload files
                </p>
              </div>
              {selectedFiles.length > 0 && (
                <div className="mt-4 space-y-2">
                  {selectedFiles.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-gray-100 p-2 rounded"
                    >
                      <div className="flex items-center">
                        <FileIcon className="w-4 h-4 mr-2" />
                        <span className="text-sm truncate">{file.name}</span>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(index)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Button type="submit" disabled={isUploading} className="w-full">
              {isUploading ? "Uploading..." : "Add Assignment"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddAssignment;
