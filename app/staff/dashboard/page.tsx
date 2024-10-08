import { auth } from "@/auth";
import { redirect } from "next/navigation";
import AddCourse from "./AddCourse";

const page = async () => {
  const session = await auth();
  if (!session) redirect("/");
  console.log(session);
  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center mx-4 my-2">
        <h3>Courses</h3>
        <AddCourse />
      </div>
    </div>
  );
};

export default page;
