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
  return <div className="flex items-center gap-3"></div>;
};

export default ClassInfo;
