import React from "react";

import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  AreaChart,
  Area,
  ResponsiveContainer,
} from "recharts";

import "./area-chart.scss";

export interface GraphProps {
  title: string;
  data: any;
  date: string;
  value: string;
  width?: number;
  height?: number;
  color?: string;
}

const AreaChartComponent = ({
  title,
  data,
  date,
  value,
  width,
  height,
  color,
}: GraphProps) => {
  return (
    <div className="container">
      <p className="title">{title}</p>
      <AreaChart
        width={width}
        height={height}
        data={data}
        margin={{ top: 10, right: 30, left: 20, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopOpacity={0.4} stopColor={color} />
            <stop offset="95%" stopOpacity={0} stopColor={color} />
          </linearGradient>
        </defs>
        <XAxis
          dataKey={date}
          axisLine={false}
          tickLine={false}
          tickMargin={10}
          tick={{
            fill: "#8892B5",
            fontSize: "14px",
            fontFamily: "Open Sans",
            letterSpacing: "0.02em",
            offset: "0",
          }}
        />
        <YAxis
          dataKey={value}
          axisLine={false}
          tickMargin={20}
          tickLine={false}
          tick={{
            fill: "#8892B5",
            fontSize: "14px",
            fontFamily: "Open Sans",
            letterSpacing: "0.02em",
          }}
        />
        <CartesianGrid strokeDasharray="5" vertical={false} />
        <Tooltip
          wrapperStyle={{ outline: "none" }}
          //   content={
          //     <CustomToolTip
          //       title={title}
          //       label={data}
          //       bar={false}
          //       type="large"
          //     />
          //   }
        />
        <Area
          type="monotone"
          dataKey={value}
          stroke="#3861ED"
          fillOpacity={1}
          fill="url(#colorPv)"
        />
        <Area
          type="monotone"
          dataKey={date}
          stroke="white"
          fillOpacity={1}
          fill="url(#colorUv)"
        />
      </AreaChart>
    </div>
  );
};

export default AreaChartComponent;
