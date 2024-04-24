"use client";
import React, { useMemo } from "react";
import Task from "./Task";
import { useTaskStore } from "@/lib/store";

export default function Column({
  title,
  status,
}: {
  title: string;
  status: string;
}) {
  // get tasks from store

  const tasks = useTaskStore((state) => state.tasks);

  console.log(tasks);

  const filteredTasks = useMemo(
    () => tasks.filter((task) => task.status === status),
    [tasks, status]
  );

  return (
    <section className="h-[600px] flex-1">
      <h2 className="ml-1 font-serif text-2xl font-semibold">{title}</h2>

      <div className="mt-3.5 h-full w-full flex-1 rounded-xl bg-gray-700/50 p-4">
        <div className="flex flex-col gap-4">
          {filteredTasks.map((task) => {
            return <Task key={task.id} {...task} />;
          })}
        </div>
      </div>
    </section>
  );
}
