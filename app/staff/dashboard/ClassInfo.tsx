import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { prisma } from "@/prisma/prisma";

const ClassInfo = async () => {
  const dept = await prisma.department.findMany();
  return (
    <div className="flex items-center gap-3">
      <Popover>
        <Label>Department</Label>
        <PopoverTrigger>
          <Button>Select Department</Button>
        </PopoverTrigger>
        <PopoverContent>
          <Command>
            <CommandInput placeholder="Search Department..." className="h-9" />
            <CommandList>
              <CommandEmpty>No Departments found...</CommandEmpty>
              <CommandGroup>
                {dept.map((d) => (
                  <CommandItem
                    key={d.id}
                    value={d.id}
                    onSelect={(val) => SetValue("departmentId", val)}
                  >
                    {d.deptName}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ClassInfo;
