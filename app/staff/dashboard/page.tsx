import { auth } from "@/auth";
import { redirect } from "next/navigation";
import AddCourse from "./AddCourse";
import ClassInfo from "./ClassInfo";
import ShowCourses from "./ShowCourses";

const page = async () => {
  const session = await auth();
  if (!session) redirect("/");
  return (
    <div className="min-h-screen flex flex-col p-6 ">
      <div className="flex items-center justify-between  w-full">
        <h1 className="text-3xl font-bold text-center mb-6">
          Course Management
        </h1>
        <AddCourse />
      </div>
      <ShowCourses />
      <ClassInfo user={session} />
    </div>
  );
};

export default page;
