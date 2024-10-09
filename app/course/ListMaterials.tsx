import { Card } from "@/components/ui/card";
import { prisma } from "@/prisma/prisma";
import Link from "next/link";
import React from "react";

const ListMaterials = async ({ courseId }: { courseId: string }) => {
  const materials = await prisma.materials.findMany({ where: { courseId } });
  return (
    <div className="flex flex-col">
      <div className="flex">Available Materials</div>
      <div className="grid grid-cols-2 gap-2">
        {materials.map((m) => (
          <Link href={`/course/materials?mid=${m.id}`} key={m.id}>
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

export default ListMaterials;
