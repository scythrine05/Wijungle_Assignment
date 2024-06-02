import { useState, useEffect } from "react";
import "./App.css";
import data from "./data/data.json";

import LineChartAlertsOverTime from "./components/LineChartAlertsOverTime";
import BarChartAlertCategories from "./components/BarChartAlertCategories";
import PieChartProtocolUsage from "./components/PieChartProtocolUsage";
import ScatterPlotAlertSeverity from "./components/ScatterPlotAlertSeverity";

function App() {
  const [alertData, setAlertData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [protocolData, setProtocolData] = useState([]);
  const [scatterData, setScatterData] = useState([]);

  useEffect(() => {
    const processData = () => {
      const newData = data.map((alert) => ({
        timestamp: new Date(alert.timestamp).toLocaleString(),
        category: alert.alert?.category,
        severity: alert.alert?.severity,
        proto: alert.proto,
        dest_port: alert.dest_port,
      }));

      const alertCount = newData.reduce((acc, alert) => {
        const time = alert.timestamp.split(",")[1].trim();
        if (!acc[time])
          acc[time] = {
            timestamp: new Date(
              `${alert.timestamp.split(",")[0]} ${time}`
            ).toString(),
            alertCount: 0,
          };
        acc[time].alertCount += 1;
        return acc;
      }, {});

      setAlertData(
        Object.values(alertCount).sort(
          (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
        )
      );

      const categoryCounts = newData.reduce((acc, alert) => {
        if (alert.category !== undefined) {
          if (!acc[alert.category])
            acc[alert.category] = { category: alert.category, count: 0 };
          acc[alert.category].count += 1;
        }
        return acc;
      }, {});

      setCategoryData(Object.values(categoryCounts));

      const protocolCounts = newData.reduce((acc, alert) => {
        if (!acc[alert.proto])
          acc[alert.proto] = { protocol: alert.proto, count: 0 };
        acc[alert.proto].count += 1;
        return acc;
      }, {});
      setProtocolData(Object.values(protocolCounts));

      setScatterData(newData);
    };

    processData();
  }, []);

  return (
    <div className="app">
      <div className="sidebar"></div>
      <div className="content">
        <header className="header">
          <h1>Network Analytics</h1>
          <img src="/wijungle_logo.png" width={130} height={40} />
        </header>
        <main class="charts">
          <div class="chart chart_lg">
            <LineChartAlertsOverTime data={alertData} />
          </div>
          <div class="chart chart_sm">
            <BarChartAlertCategories data={categoryData} />
          </div>
          <div class="chart chart_sm">
            <PieChartProtocolUsage data={protocolData} />
          </div>
          <div class="chart chart_lg">
            <ScatterPlotAlertSeverity data={scatterData} />
          </div>
         
        </main>
      </div>
    </div>
  );
}

export default App;
