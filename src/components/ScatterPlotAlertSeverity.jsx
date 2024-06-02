import React from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="label">{` dest_port : ${payload[0].payload.dest_port}`}</p>
        <p className="intro">{`severity: ${payload[0].payload.severity}`}</p>
      </div>
    );
  }

  return null;
};

const ScatterPlotAlertSeverity = ({ data }) => {

  const renderTooltip = (props) => (
    <CustomTooltip {...props} title={["timestamp", "alert count"]} />
  );

  return (
    <div className="scatter_chart">
      <h3>Alert Severity vs. Destination Port</h3>
      <ResponsiveContainer width="100%" height={400}>
        <ScatterChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="dest_port" name="Destination Port" tick={false} />
          <YAxis dataKey="severity" name="Severity" />
          <Tooltip
            cursor={{ strokeDasharray: "3 3" }}
            content={renderTooltip}
          />
          <Scatter name="Alerts" data={data} fill="#82ca9d" size={4} />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ScatterPlotAlertSeverity;
