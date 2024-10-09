import supabase from "@/components/supabase";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { prisma } from "@/prisma/prisma";
import { FileText } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function MaterialPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  if (!searchParams?.mid) notFound();

  const mid = String(searchParams.mid);
  const material = await prisma.materials.findUnique({
    where: { id: mid },
    include: { course: true },
  });

  if (!material) notFound();

  const links = material.docs.map((link) =>
    supabase.storage.from("Materials").getPublicUrl(link)
  );

  return (
    <div className="container mx-auto p-4 min-h-screen">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">{material.title}</CardTitle>
          <CardDescription>{material.course.title}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-6">{material.description}</p>
          <h2 className="text-lg font-semibold mb-4">Documents</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {links.map((link) => {
              const displayName = link.data.publicUrl.split("/").pop();
              return (
                <Link
                  href={link.data.publicUrl}
                  target="_blank"
                  key={link.data.publicUrl}
                >
                  <Button
                    variant="outline"
                    className="w-full h-full py-6 flex flex-col items-center justify-center gap-2 hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    <FileText className="h-8 w-8" />
                    <span className="text-sm text-center break-all">
                      {displayName}
                    </span>
                  </Button>
                </Link>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function MaterialPageSkeleton() {
  return (
    <div className="container mx-auto p-4 min-h-screen">
      <Card className="w-full">
        <CardHeader>
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-4 w-full mb-6" />
          <Skeleton className="h-6 w-1/4 mb-4" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-24 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
