import { auth } from "@/auth";
import { redirect } from "next/navigation";
import AddCourse from "./AddCourse";
import ShowCourses from "./ShowCourses";

const page = async () => {
  const session = await auth();
  console.log(session?.user);
  
  if (!session) redirect("/");
  console.log(session)
  return (
    <div className="min-h-screen">
      <div className="">
        <h3>Courses</h3>
        <AddCourse />
        <ShowCourses />
      </div>
    </div>
  );
};

export default page;
