import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";


const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="label">{` timestamp : ${new Date(
          label
        ).toLocaleTimeString()}`}</p>
        <p className="intro">{`alert count: ${payload[0].payload.alertCount}`}</p>
      </div>
    );
  }

  return null;
};

const LineChartAlertsOverTime = ({ data }) => {
  // Sort data by timestamp
  const sortedData = data.sort(
    (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
  );
  const renderTooltip = (props) => (
    <CustomTooltip {...props} />
  );

  return (
    <div className="line_chart">
      <h3>Network Alerts over Time</h3>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={sortedData}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <XAxis dataKey="timestamp" tick={false} />
          <YAxis />
          <Tooltip content={renderTooltip} />
          <Line
            type="monotone"
            dataKey="alertCount"
            stroke="#82ca9d"
            fill="#82ca9d"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChartAlertsOverTime;
