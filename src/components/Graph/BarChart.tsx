import GroupContext from "contexts/GroupContext";
import React, { useContext } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];


const CustomTooltip = ({ active, payload, label }: any) => {
  console.log(payload, active);
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip rounded border-2 bg-white p-2 shadow-md">
        <p className="label font-semibold">{`${label} : ${payload[0].value}`}</p>
        <p className="desc text-gray-500">{`${payload[0].payload.description}`}.</p>
      </div>
    );
  }

  return null;
};

const getData = (groupList: any) => {
  return groupList.map((group: any) => ({
    name: group.name,
    count: group.totalExpenses,
    description: group.description,
  }));
};

export default function Example() {
  const { groupList } = useContext(GroupContext);
  return (
    <div className="mt-3 flex flex-col items-center">
      <p className="pb-6 text-xl  font-semibold"> Group vs Expense Count</p>
      <BarChart
        width={500}
        height={300}
        data={getData(groupList)}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis allowDecimals={false} />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Bar dataKey="count" barSize={20} fill="#8d89d8" />
      </BarChart>
    </div>
  );
}
