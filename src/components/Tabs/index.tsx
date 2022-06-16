import { useState } from "react";

type TabsProps = {
  tabs: Array<{
    label: string;
    content: React.ReactNode;
  }>;
};

const Tabs = (props: TabsProps) => {
  const [activeTab, setActiveTab] = useState(0);
  const { tabs } = props;
  const handleClick = (index: number) => {
    setActiveTab(index);
  };
  return (
    <div className="flex flex-col">
      <div className="flex">
        {tabs.map((tab, index) => {
          const { label } = tab;
          return (
            <div
              key={index}
              className={`${
                activeTab === index
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "bg-white"
              } p-2 cursor-pointer mb-2 font-medium`}
              onClick={() => handleClick(index)}
            >
              {label}
            </div>
          );
        })}
      </div>
      <div className="flex flex-col">
        <div className="p-2">
          {tabs.find((_, index) => index === activeTab)?.content}
        </div>
      </div>
    </div>
  );
};

export default Tabs;
