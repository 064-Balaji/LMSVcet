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
import { useForm } from "react-hook-form";

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
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <div className="flex flex-1 items-center gap-2">
              <span className="min-w-fit">Course Title:</span>
              <Input {...register("title")} />
            </div>
            <div className="flex flex-1 items-center gap-2">
              <span className="min-w-fit">Course Code:</span>
              <Input {...register("code")} />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="min-w-fit">Course Description:</span>
            <Textarea {...register("description")} />
          </div>
          <div className="flex gap-2">
            <div className="flex flex-col align-middle gap-1">
              <Label>Department</Label>
              <Popover>
                <PopoverTrigger>
                  <Button
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
            </div>
            <div className="flex flex-col gap-1">
              <Label>Batch</Label>
              <Popover>
                <PopoverTrigger>
                  <Button
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
            </div>
            <div className="flex flex-col  gap-1">
              <Label>Section</Label>
              <Popover>
                <PopoverTrigger>
                  <Button
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
            </div>
          </div>
          <div className="flex flex-col">
            <Button>Create the Course</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddCourse;
