import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600&display=swap');

  .dc-section { margin-top: 56px; font-family: 'DM Sans', sans-serif; }
  .dc-section-title { font-size: 11px; letter-spacing: 3px; text-transform: uppercase; color: #555; margin-bottom: 20px; }
  .dc-charts { display: grid; grid-template-columns: 1.6fr 1fr; gap: 24px; }
  .dc-chart-card { background: #141414; border: 1px solid #1e1e1e; border-radius: 12px; padding: 28px; position: relative; overflow: hidden; }
  .dc-chart-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px; background: linear-gradient(to right, #b8860b, transparent); }
  .dc-chart-label { font-family: 'Bebas Neue', sans-serif; font-size: 22px; letter-spacing: 2px; color: #fff; margin-bottom: 20px; }
  @media (max-width: 900px) { .dc-charts { grid-template-columns: 1fr; } }
`;

const GOLD_PALETTE = ["#b8860b", "#d4a017", "#8b6508", "#ffd700", "#c9960c", "#a0750a"];

const DashboardCharts = ({ parts }) => {
  const categoryMap = {};
  parts.forEach((part) => {
    if (!categoryMap[part.category]) categoryMap[part.category] = 0;
    categoryMap[part.category] += part.stock;
  });

  const labels = Object.keys(categoryMap);
  const data = Object.values(categoryMap);

  const barData = {
    labels,
    datasets: [{
      label: "Stock",
      data,
      backgroundColor: "rgba(184,134,11,0.75)",
      borderColor: "#b8860b",
      borderWidth: 1,
      borderRadius: 6,
    }]
  };

  const barOptions = {
    plugins: {
      legend: { display: false },
      tooltip: { backgroundColor: "#1a1a1a", titleColor: "#b8860b", bodyColor: "#ccc", borderColor: "#2a2a2a", borderWidth: 1 }
    },
    scales: {
      x: { grid: { color: "rgba(255,255,255,0.04)" }, ticks: { color: "#666", font: { family: "'DM Sans'" } } },
      y: { grid: { color: "rgba(255,255,255,0.04)" }, ticks: { color: "#666", font: { family: "'DM Sans'" } } }
    }
  };

  const pieData = {
    labels,
    datasets: [{
      data,
      backgroundColor: GOLD_PALETTE,
      borderColor: "#0c0c0c",
      borderWidth: 3,
    }]
  };

  const pieOptions = {
    plugins: {
      legend: {
        position: "bottom",
        labels: { color: "#888", font: { family: "'DM Sans'", size: 12 }, padding: 16, boxWidth: 12 }
      },
      tooltip: { backgroundColor: "#1a1a1a", titleColor: "#b8860b", bodyColor: "#ccc", borderColor: "#2a2a2a", borderWidth: 1 }
    }
  };

  if (!parts || parts.length === 0) return null;

  return (
    <>
      <style>{CSS}</style>
      <div className="dc-section">
        <div className="dc-section-title">Inventory Analytics</div>
        <div className="dc-charts">
          <div className="dc-chart-card">
            <div className="dc-chart-label">Stock by Category</div>
            <Bar data={barData} options={barOptions} />
          </div>
          <div className="dc-chart-card">
            <div className="dc-chart-label">Category Share</div>
            <Pie data={pieData} options={pieOptions} />
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardCharts;