import { auth } from "@/auth";
import { redirect } from "next/navigation";
import AddCourse from "./AddCourse";
import ShowCourses from "./ShowCourses";

const page = async () => {
  const session = await auth();
  if (!session) redirect("/");
  return (
    <div className="min-h-screen flex flex-col p-6 ">
      <div className="flex items-center justify-between  w-full">
        <h1 className="text-3xl font-bold text-center mb-6">Course Management</h1>

        <div className="flex justify-center mb-6">
          <AddCourse />
        </div>

      </div>
      <div className="">
        <h1 className="text-2xl font-bold mb-6">Your courses</h1>
        <ShowCourses />
      </div>
    </div>

  );
};

export default page;
