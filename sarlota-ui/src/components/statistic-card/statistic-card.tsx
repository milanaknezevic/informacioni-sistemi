import React from "react";
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  NumberOutlined,
} from "@ant-design/icons";
import { Card, Col, Row, Statistic } from "antd";

import "./statistic-card.scss";

export interface StatisticCardProps {
  title: string;
  value: number;
  precision: number;
}

const StatisticCard = ({ title, value, precision }: StatisticCardProps) => (
  <div className="card_content">
    <Card bordered={false}>
      <Statistic
        title={title}
        value={value}
        precision={precision}
        valueStyle={{ color: "#001427" }}
        prefix={<NumberOutlined />}
      />
    </Card>
  </div>
);

export default StatisticCard;
