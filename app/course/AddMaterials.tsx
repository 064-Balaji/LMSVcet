"use client";

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
import { Materials } from "@prisma/client";
import {
  ArrowRight,
  File as FileIcon,
  PlusCircle,
  Upload,
  X,
} from "lucide-react";
import { useSession } from "next-auth/react";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";

interface FileWithPreview {
  file: File;
  preview: string;
  id: string;
}

const isImageFile = (fileName: string) => {
  const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "webp", "svg"];
  const extension = fileName.split(".").pop()?.toLowerCase() || "";
  return imageExtensions.includes(extension);
};

const AddMaterials = ({ courseId }: { courseId: string }) => {
  const session = useSession();
  const [selectedFiles, setSelectedFiles] = useState<FileWithPreview[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (session?.data?.user.type !== "staff") return null;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Materials>();

  const onSubmit = (data: Materials) => {
    console.log(data, selectedFiles);
    reset();
    setSelectedFiles([]);
    setIsDialogOpen(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).map((file) => ({
        file,
        preview: isImageFile(file.name) ? URL.createObjectURL(file) : "",
        id: Math.random().toString(36).substr(2, 9),
      }));
      setSelectedFiles((prev) => [...prev, ...filesArray]);
    }
  };

  const removeFile = (id: string) => {
    setSelectedFiles((files) => {
      const fileToRemove = files.find((f) => f.id === id);
      if (fileToRemove && fileToRemove.preview) {
        URL.revokeObjectURL(fileToRemove.preview);
      }
      return files.filter((f) => f.id !== id);
    });
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex justify-between mx-4 my-4">
      <div className="flex items-center gap-2">
        Add New Materials <ArrowRight />
      </div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button className="gap-2">
            Add Materials
            <PlusCircle className="w-4 h-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-3xl">
          <DialogHeader className="text-lg font-semibold">
            Add new materials
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                {...register("title", { required: "Title is required" })}
              />
              {errors.title && (
                <p className="text-red-600">{errors.title.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" {...register("description")} />
            </div>
            <div className="space-y-2">
              <Label>Documents</Label>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                onChange={handleFileChange}
                className="hidden"
              />
              <div
                onClick={triggerFileInput}
                className="cursor-pointer border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors"
              >
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-600">
                  Click to upload files
                </p>
              </div>
              {selectedFiles.length > 0 && (
                <div className="mt-4 grid grid-cols-3 gap-4">
                  {selectedFiles.map((fileObj) => (
                    <div key={fileObj.id} className="relative p-2 rounded">
                      <div className="flex items-center justify-center h-24 mb-2">
                        {isImageFile(fileObj.file.name) && fileObj.preview ? (
                          <img
                            src={fileObj.preview}
                            alt={fileObj.file.name}
                            className="max-h-full max-w-full object-contain"
                          />
                        ) : (
                          <FileIcon className="w-12 h-12 text-gray-400" />
                        )}
                      </div>
                      <p className="text-xs truncate">{fileObj.file.name}</p>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute top-1 right-1"
                        onClick={() => removeFile(fileObj.id)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <Button type="submit" className="w-full">
              Add
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddMaterials;
