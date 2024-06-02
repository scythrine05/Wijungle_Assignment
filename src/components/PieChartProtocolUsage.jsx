import React from "react";
import { PieChart, Pie, Tooltip, Cell, Legend } from "recharts";

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p>{` protocol : ${payload[0].name}`}</p>
        <p>{`usage: ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};

const PieChartProtocolUsage = ({ data }) => {
  const COLORS = ["#82ca9d", "#FFBB28"];
  const renderTooltip = (props) => <CustomTooltip {...props} />;

  return (
    <div className="pie_chart">
      <h3>Network Protocol usage</h3>
      <PieChart width={330} height={350}>
      <Legend />
        <Pie
          data={data}
          dataKey="count"
          nameKey="protocol"
          cx="70%"
          cy="50%"
          outerRadius={100}
          fill="#82ca9d"
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip content={renderTooltip} />
      </PieChart>
    </div>
  );
};

export default PieChartProtocolUsage;
