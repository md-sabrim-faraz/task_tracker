import React from "react";

const tasks = [
  {
    id: "1",
    title: "First Task",
    description: "Some Description",
    status: "DONE",
  },
];

export default function Column({
  title,
  status,
}: {
  title: string;
  status: string;
}) {
  const filteredTasks = tasks.filter((task) => task.status === status);

  console.log(filteredTasks);

  return (
    <section className="h-[600px] flex-1">
      <h2 className="ml-1 font-serif text-2xl font-semibold">{title}</h2>

      <div className="mt-3.5"></div>
    </section>
  );
}
