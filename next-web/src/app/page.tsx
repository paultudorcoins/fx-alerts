"use client";

import { useEffect, useState } from "react";
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  TimeScale,
  CategoryScale,
} from "chart.js";
import { Line } from "react-chartjs-2";

Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  TimeScale,
  CategoryScale
);

export default function Home() {
  const [prices, setPrices] = useState<number[]>([]);

  useEffect(() => {
    const ev = new EventSource("/api/stream");
    ev.onmessage = (e) => {
      const obj = JSON.parse(e.data);
      if (obj.data) {
        const p = obj.data[0].p;
        setPrices((prev) => [...prev.slice(-199), p]); // keep last 200
      }
    };
    return () => ev.close();
  }, []);

  const data = {
    labels: prices.map((_, i) => i),
    datasets: [
      {
        label: "EUR/USD",
        data: prices,
        borderColor: "rgb(0, 200, 255)",      // bright cyan line
        backgroundColor: "rgba(0, 200, 255, 0.3)",
        borderWidth: 2,
        pointRadius: 2,
        tension: 0.3,
      },
    ],
  };
  const options = {
    plugins: { legend: { display: false } },
    scales: {
      x: { ticks: { color: "#888" }, grid: { color: "#222" } },
      y: { ticks: { color: "#888" }, grid: { color: "#222" } },
    },
  };
  return (
    <main className="max-w-2xl mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Live EUR/USD</h1>
      <Line data={data} options={options as any} />
    </main>
  );
}
