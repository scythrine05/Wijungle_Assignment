import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const CustomTooltip = ({ active, payload}) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p>{`category: ${payload[0].payload.category}`}</p>
        <p>{`alert count: ${payload[0].payload.count}`}</p>
      </div>
    );
  }

  return null;
};

const BarChartAlertCategories = ({ data }) => {
  const renderTooltip = (props) => <CustomTooltip {...props} />;

  return (
    <div className="bar_chart">
      <h3>Network Alerts by Category</h3>
      <ResponsiveContainer width={500} height={450}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 60, left: 60, bottom: 5 }}
        >
          <XAxis dataKey="category" tick={false} />
          <YAxis />
          <Tooltip content={renderTooltip} cursor={false} />
          <Bar dataKey="count" stroke="#cae9d5" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartAlertCategories;
