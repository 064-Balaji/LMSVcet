import { prisma } from "@/prisma/prisma";
import { Session } from "next-auth";

const ClassInfo = async ({ user }: { user: Session }) => {
  const classIn = await prisma.section.findUnique({
    where: { classInchargeId: user.user.id },
  });

  if (!classIn) return null;

  return <div className="flex items-center gap-3">Hello Class Incharge</div>;
};

export default ClassInfo;
