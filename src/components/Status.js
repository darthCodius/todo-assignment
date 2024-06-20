import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

function Status() {
  const [tasks, setTasks] = useState(null);

  const fetchTasks = async () => {
    const res = await fetch("http://localhost:8000/tasks");

    const data = await res.json();

    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  ChartJS.register(ArcElement, Tooltip, Legend);

  const data = {
    labels: ["Pending", "WIP", "Completed"],
    datasets: [
      {
        label: "Tasks",
        data: [
          tasks?.filter((task) => task.status === "pending").length,
          tasks?.filter((task) => task.status === "wip").length,
          tasks?.filter((task) => task.status === "completed").length,
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",

          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",

          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  if (tasks === null) return;

  return (
    <div className="w-[300px] mt-20 ml-20 md:w-[600px] md:ml-24 lg:ml-[600px] flex flex-col items-center">
      <h1 className="text-3xl mb-10">Pie Chart of Tasks</h1>
      <Pie data={data} />
    </div>
  );
}

export default Status;
