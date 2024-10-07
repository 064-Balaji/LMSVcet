import { auth } from "@/auth";
import { ModeToggle } from "@/components/Toggle";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();
  if (session) redirect("/student/dashboard");
  return (
    <div>
      Hello
      <ModeToggle />
    </div>
  );
}
