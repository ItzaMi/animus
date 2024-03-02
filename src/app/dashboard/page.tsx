"use client";
import { MoreHorizontal, PlusCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";

import { getUserMoods } from "@/lib/appwrite";

const Dashboard = () => {
  const {
    isLoading,
    isError,
    data: userMoodsData,
    error,
  } = useQuery({
    queryKey: ["user-moods"],
    queryFn: getUserMoods,
  });

  console.log("i", userMoodsData);
  return (
    <div>
      <div className="flex flex-row justify-between items-end mb-4">
        <div>
          <p className="text-lg font-bold text-zinc-800">Events</p>
          <p className="text-zinc-400 text-sm">
            Get an overall look to the events that you&apos;ve registered.
          </p>
        </div>
        <Button size="sm" asChild>
          <a href="/dashboard/event">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Event
          </a>
        </Button>
      </div>

      <Table>
        {/* <TableCaption>A list of your upcoming events.</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="w-[200px]">Tag</TableHead>
            <TableHead className="w-[200px]">Next Ocurrence</TableHead>
            <TableHead>Frequency</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">Cutting hair</TableCell>
            <TableCell>Cut the hair to look/feel better</TableCell>
            <TableCell>
              <Badge>Self-care</Badge>
            </TableCell>
            <TableCell>26.12.2024</TableCell>
            <TableCell>Every 4 months</TableCell>
            <TableCell className="flex justify-end">
              <Button size="icon" variant="outline">
                <MoreHorizontal />
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default Dashboard;
