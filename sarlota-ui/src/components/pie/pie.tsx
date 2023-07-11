import React, { useState, useEffect } from "react";
import { Pie, PieChart, ResponsiveContainer, Cell, Label } from "recharts";

export interface PieChartComponentProps {
  troskovi: boolean;
  data: {
    category: string;
    value: number;
  }[];
}

const PieChartComponent: React.FC<PieChartComponentProps> = ({
  data,
  troskovi,
}) => {
  const COLORS = [
    "#8899cc",
    "#e66a60",
    "#6e9ed9",
    "#8fb2ae",
    "#9fbf82",
    "#e6b366",
    "#d5a3b4",
    "#71b6c5",
    "#c3d692",
    "#f0c88d",
  ];

  const [animatedData, setAnimatedData] = useState<any[]>([]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let currentIndex = 0;

    const animateChartData = () => {
      if (currentIndex < data.length) {
        const newData = data.slice(0, currentIndex + 1);
        setAnimatedData(newData);
        currentIndex++;
        timeoutId = setTimeout(animateChartData, 200); // Promijenite ovu vrijednost za željenu odgodu prikaza
      }
    };

    timeoutId = setTimeout(animateChartData, 200); // Promijenite ovu vrijednost za željenu odgodu prikaza

    return () => {
      clearTimeout(timeoutId);
    };
  }, [data]);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          dataKey="value"
          data={animatedData}
          cx="50%"
          cy="50%"
          outerRadius={150}
          labelLine={false}
          label={({
            cx,
            cy,
            midAngle,
            innerRadius,
            outerRadius,
            value,
            index,
          }) => {
            const RADIAN = Math.PI / 180;
            const radius = 25 + innerRadius + (outerRadius - innerRadius);
            const x = cx + radius * Math.cos(-midAngle * RADIAN);
            const y = cy + radius * Math.sin(-midAngle * RADIAN);

            return (
              <text
                x={x}
                y={y}
                fill={COLORS[index % COLORS.length]}
                textAnchor={x > cx ? "start" : "end"}
                dominantBaseline="central"
              >
                {`${animatedData[index]?.category} (${
                  troskovi === true ? parseFloat(value).toFixed(2) : value
                }${troskovi === true ? " KM" : " komada"})`}
              </text>
            );
          }}
          animationBegin={0} // Postavite na 0 kako biste odgodili početak animacije
          animationDuration={200} // Promijenite ovu vrijednost prema željenom trajanju animacije u milisekundama
          animationEasing="ease-in-out" // Dodajte ovu liniju za funkciju olakšavanja animacije
        >
          {animatedData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PieChartComponent;
