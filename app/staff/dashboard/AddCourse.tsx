"use client";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { Batch, Course, Department, Section } from "@prisma/client";
import axios from "axios";
import { BadgePlus, Check } from "lucide-react";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const AddCourse = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Course>();

  const watchDept = watch("departmentId");
  const watchBatch = watch("batchId");
  const [dept, setDept] = useState<Department[]>([]);
  const [batch, setBatch] = useState<Batch[]>([]);
  const [sec, setSec] = useState<Section[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDept, setSelectedDept] = useState<string>("");
  const [selectedBatch, setSelectedBatch] = useState<string>("");
  const [selectedSection, setSelectedSection] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const fetchDept = async () => {
      try {
        const response = await axios.get("/api/dept");
        setDept(response.data);
      } catch (error) {
        console.error("Error fetching departments:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDept();
  }, []);

  useEffect(() => {
    const fetchBatch = async () => {
      if (watchDept) {
        try {
          const response = await axios.get(`/api/batch?dept=${watchDept}`);
          setBatch(response.data);
        } catch (error) {
          console.error("Error fetching batches:", error);
        }
      }
    };
    fetchBatch();
  }, [watchDept]);

  useEffect(() => {
    const fetchSec = async () => {
      if (watchBatch && watchDept) {
        try {
          const response = await axios.get(
            `/api/section?dept=${watchDept}&batch=${watchBatch}`
          );
          setSec(response.data);
        } catch (error) {
          console.error("Error fetching sections:", error);
        }
      }
    };
    fetchSec();
  }, [watchBatch, watchDept]);

  const handleDeptSelect = (value: string) => {
    setValue("departmentId", value);
    setSelectedDept(dept.find((d) => d.id === value)?.deptName || "");
    setBatch([]);
    setSec([]);
    setSelectedBatch("");
    setSelectedSection("");
  };

  const handleBatchSelect = (value: string) => {
    setValue("batchId", value);
    setSelectedBatch(batch.find((b) => b.id === value)?.batchName || "");
    setSec([]);
    setSelectedSection("");
  };

  const handleSectionSelect = (value: string) => {
    setValue("sectionId", value);
    setSelectedSection(sec.find((s) => s.id === value)?.sectionName || "");
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const onSubmit: SubmitHandler<Course> = async (data) => {
    try {
      const response = await axios.post("/api/course/add", data);
      console.log("Course added successfully:", response.data);
      // Here you might want to close the dialog or show a success message
    } catch (error) {
      console.error("Error adding course:", error);
      // Here you might want to show an error message to the user
    } finally {
      setIsDialogOpen(false);
    }
  };

  return (
    <Dialog open={isDialogOpen}>
      <DialogTrigger>
        <Button onClick={() => setIsDialogOpen(!isDialogOpen)} className="gap-2">
          <span>Add Course</span>
          <BadgePlus />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>New Course</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4">
            <div className="flex gap-4">
              <div className="flex flex-1 flex-col gap-1">
                <Label htmlFor="title">Course Title:</Label>
                <Input
                  id="title"
                  {...register("title", { required: "Title is required" })}
                />
                {errors.title && (
                  <span className="text-red-500 text-sm">
                    {errors.title.message}
                  </span>
                )}
              </div>
              <div className="flex flex-1 flex-col gap-1">
                <Label htmlFor="code">Course Code:</Label>
                <Input
                  id="code"
                  {...register("code", { required: "Course code is required" })}
                />
                {errors.code && (
                  <span className="text-red-500 text-sm">
                    {errors.code.message}
                  </span>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <Label htmlFor="description">Course Description:</Label>
              <Textarea id="description" {...register("description")} />
            </div>
            <div className="flex gap-2">
              <div className="flex flex-col gap-1">
                <Label>Department</Label>
                <Popover>
                  <PopoverTrigger>
                    <Button
                      type="button"
                      variant="outline"
                      className="w-[200px] justify-between"
                    >
                      {selectedDept || "Select Department"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <Command>
                      <CommandInput placeholder="search department" />
                      <CommandList>
                        <CommandEmpty>No Department Found.</CommandEmpty>
                        <CommandGroup>
                          {dept.map((d) => (
                            <CommandItem
                              key={d.id}
                              value={d.id}
                              onSelect={handleDeptSelect}
                            >
                              <Check
                                className={
                                  selectedDept === d.deptName
                                    ? "opacity-100"
                                    : "opacity-0"
                                }
                              />
                              {d.deptName}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                {errors.departmentId && (
                  <span className="text-red-500 text-sm">
                    Department is required
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <Label>Batch</Label>
                <Popover>
                  <PopoverTrigger>
                    <Button
                      type="button"
                      variant="outline"
                      className="w-[200px] justify-between"
                      disabled={!watchDept}
                    >
                      {selectedBatch || "Select Batch"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <Command>
                      <CommandInput placeholder="search batch" />
                      <CommandList>
                        <CommandEmpty>No Batch Found.</CommandEmpty>
                        <CommandGroup>
                          {batch.map((b) => (
                            <CommandItem
                              key={b.id}
                              value={b.id}
                              onSelect={handleBatchSelect}
                            >
                              <Check
                                className={
                                  selectedBatch === b.batchName
                                    ? "opacity-100"
                                    : "opacity-0"
                                }
                              />
                              {b.batchName}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                {errors.batchId && (
                  <span className="text-red-500 text-sm">
                    Batch is required
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <Label>Section</Label>
                <Popover>
                  <PopoverTrigger>
                    <Button
                      type="button"
                      variant="outline"
                      className="w-[200px] justify-between"
                      disabled={!watchBatch}
                    >
                      {selectedSection || "Select Section"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <Command>
                      <CommandInput placeholder="search section" />
                      <CommandList>
                        <CommandEmpty>No Section Found.</CommandEmpty>
                        <CommandGroup>
                          {sec.map((s) => (
                            <CommandItem
                              key={s.id}
                              value={s.id}
                              onSelect={handleSectionSelect}
                            >
                              <Check
                                className={
                                  selectedSection === s.sectionName
                                    ? "opacity-100"
                                    : "opacity-0"
                                }
                              />
                              {s.sectionName}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                {errors.sectionId && (
                  <span className="text-red-500 text-sm">
                    Section is required
                  </span>
                )}
              </div>
            </div>
            <div className="flex flex-col">
              <Button type="submit">Create the Course</Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddCourse;
