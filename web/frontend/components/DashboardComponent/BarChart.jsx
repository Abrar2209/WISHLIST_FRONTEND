import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip
);

const BarChart = () => {
  const data = {
    labels: ["1 June", "7 June", "13 June", "19 June", "25 June"],
    datasets: [
      {
        label: "Sale of the Today",
        data: [6, 4, 6, 6, 2],
        borderColor: "#ff720d",
        backgroundColor: "#ff720d",
        tension: 0.4,
      },
      {
        label: "Sale of the Yesterday",
        data: [4, 6, 8, 2, 7],
        borderColor: "#fcc297",
        backgroundColor: "#fcc297",
        tension: 0.4,
      },
    ],
  };

  const options = {
    plugins: {
      legend: true,
    },
  };

  return (
    <div className="line-chart">
      <h2 className="line-chart-header">Sales Over Time</h2>
      <Line
        data={data}
        options={options}
        style={{ width: "100%", display: "unset" }}
      ></Line>
    </div>
  );
};

export default BarChart;
