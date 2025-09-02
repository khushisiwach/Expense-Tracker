import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import CustomLegend from "./CustomLegend";

// Optional: Custom tooltip component
const CustomToolTip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-200 rounded-md px-3 py-2 shadow text-sm">
        <p className="text-gray-700 font-medium">{payload[0].name}</p>
        <p className="text-gray-500">₹{payload[0].value}</p>
      </div>
    );
  }
  return null;
};

const CustomPieChart = ({
  data,
  label,
  totalAmount,
  colors,
  showTextAnchor,
}) => {
  return (
    <div className="w-full h-64 flex flex-col items-center justify-center">
      <h2 className="text-md font-semibold text-gray-600 ">{label}</h2>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="amount"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={70}
            innerRadius={50}
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
              />
            ))}
          </Pie>

          <Tooltip content={CustomToolTip} />
          <Legend content={CustomLegend} />

          {showTextAnchor && (
            <>
              <text
                x="50%"
                y="45%"
                dy={10}
                textAnchor="middle"
                fill="#333"
                fontSize="18px"
                fontWeight="600"
              >
                {totalAmount}
              </text>
              {/* <text
                x="50%"
                y="85%"
                dy={-25}
                textAnchor="middle"
                fill="#666"
                fontSize="14px"
              >
                {label}
              </text>  */}
            </>
          )}
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomPieChart;
