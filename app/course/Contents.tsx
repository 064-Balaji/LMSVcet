import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import ListMaterials from "./ListMaterials";
import AddMaterials from "./AddMaterials";

const Contents = ({ courseId }: { courseId: string }) => {
  return (
    <Card className="container mx-auto border-none shadow-xl">
      <Tabs defaultValue="materials" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="materials">Materials</TabsTrigger>
          <TabsTrigger value="assignment">Assignment</TabsTrigger>
          <TabsTrigger value="quiz">Quiz</TabsTrigger>
        </TabsList>
        <TabsContent value="materials" className="pb-2">
          <AddMaterials courseId={courseId} />
          <ListMaterials courseId={courseId} />
        </TabsContent>
        <TabsContent value="assignment">Shows the Assignment</TabsContent>
        <TabsContent value="quiz">Shows the Quiz</TabsContent>
      </Tabs>
    </Card>
  );
};

export default Contents;
