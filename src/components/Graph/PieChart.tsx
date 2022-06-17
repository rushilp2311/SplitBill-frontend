import React, { PureComponent } from "react";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";

const data = [
  { name: "Lent", value: 400 },
  { name: "Owe", value: 300 },
];
//
const COLORS = ["#86EFAC", "#FCA5A5"];
const TEXT_COLORS = ["#065F46", "#B91C1C"];
const RADIAN = Math.PI / 180;
export default function Example() {
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill={TEXT_COLORS[index]}
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        className="font-semibold"
      >
        {`${data[index].value}`}
      </text>
    );
  };

  return (
    <div className="flex flex-col items-center">
      <p className="text-xl font-semibold ">Lent vs Owe</p>

      <PieChart width={300} height={300}>
        <Pie
          data={data}
          label={renderCustomizedLabel}
          outerRadius={130}
          labelLine={false}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  );
}
