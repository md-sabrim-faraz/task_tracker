"use client";
import React, { useEffect, useMemo } from "react";
import Task from "./Task";
import { Status, useTaskStore } from "@/lib/store";

export default function Column({
  title,
  status,
}: {
  title: string;
  status: Status;
}) {
  // get tasks from store

  const tasks = useTaskStore((state) => state.tasks);

  const filteredTasks = useMemo(
    () => tasks.filter((task) => task.status === status),
    [tasks, status]
  );

  const updateTask = useTaskStore((state) => state.updateTask);
  const draggedTask = useTaskStore((state) => state.draggedTask);
  const dragTask = useTaskStore((state) => state.dragTask);

  // hydrate persisted store after on mount
  useEffect(() => {
    useTaskStore.persist.rehydrate();
  }, []);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    if (!draggedTask) return;
    updateTask(draggedTask, status);
    dragTask(null);
  };

  return (
    <section className="h-[600px] flex-1">
      <h2 className="ml-1 font-serif text-2xl font-semibold">{title}</h2>

      <div
        className="mt-3.5 h-full w-full flex-1 rounded-xl bg-gray-700/50 p-4"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <div className="flex flex-col gap-4">
          {filteredTasks.map((task) => {
            return <Task key={task.id} {...task} />;
          })}
        </div>
      </div>
    </section>
  );
}
