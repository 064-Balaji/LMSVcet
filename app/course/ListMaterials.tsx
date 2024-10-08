import { prisma } from "@/prisma/prisma";
import React from "react";

const ListMaterials = async ({ courseId }: { courseId: string }) => {
  // const materials = await prisma.materials.findMany({ where: { courseId } });
  // console.log(materials);
  // return <div>ListMaterials</div>;
};

export default ListMaterials;
