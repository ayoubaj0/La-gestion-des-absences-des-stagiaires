import React from "react";
import { Bar } from "react-chartjs-2";
// import { Chart a s ChartJS } from "chart.js/auto";

function BarChart({ chartData }) {
  return <Bar data={chartData} />;
}

export default BarChart;
