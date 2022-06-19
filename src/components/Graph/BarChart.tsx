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

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip rounded border-2 bg-white p-2 shadow-md">
        <p className="label font-semibold">{`${label} : ${payload[0].value}`}</p>
        <p className="desc text-gray-500">
          {`${payload[0].payload.description}`}.
        </p>
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

export default function BarGraph() {
  const { groupList } = useContext(GroupContext);
  return (
    <div className="flex flex-col items-center justify-start">
      <p className="pb-6 text-xl  font-semibold"> Group vs Expense Count</p>
      {groupList.length > 0 ? (
        <div className="mt-3 flex flex-col items-center">
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
      ) : (
        <div className="flex h-72 items-center justify-center">
          <div>
            <h1 className="flex items-center justify-center text-xl font-semibold">
              <span className="mr-2 block text-4xl mb-6">🏎</span>{" "}
              <span className="block">No Group Data</span>
            </h1>
            <p className=" text-gray-600">Bar-chart not available </p>
          </div>
        </div>
      )}
    </div>
  );
}
