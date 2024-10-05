import { auth } from "@/auth";
import { Text } from "@radix-ui/themes";

export default async function Home() {
  const session = await auth();
  console.log(session);
  return <Text>{session?.user?.email}</Text>;
}
