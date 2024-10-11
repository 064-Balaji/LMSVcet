import { Card } from "@/components/ui/card";
import { prisma } from "@/prisma/prisma";
import Link from "next/link";
import React from "react";

const ListAssignments = async ({ courseId }: { courseId: string }) => {
  const assigments = await prisma.assignment.findMany({ where: { courseId } });
  return (
    <div className="flex flex-col">
      <div className="flex">Assigments to Submit</div>
      <div className="grid grid-cols-2 gap-2">
        {assigments.map((m) => (
          <Link href={`/course/assigments?mid=${m.id}`} key={m.id}>
            <Card className="py-2 px-4">
              <h1 className="font-bold">{m.title}</h1>
              <p className="overflow-hidden">{m.description}</p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ListAssignments;
