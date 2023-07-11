// Libs
import type { BadgeProps } from "antd";
import { Badge, Calendar } from "antd";
import { Typography } from "antd";

import type { Dayjs } from "dayjs";
import {
  Key,
  ReactElement,
  JSXElementConstructor,
  ReactFragment,
  useState,
  useEffect,
} from "react";
import { api } from "../../api";

import "./calendar.scss";

const { Title } = Typography;

const formatDate = (value: Date) => {
  return value.toLocaleDateString("fr-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};

const formatMonth = (value: Date) => {
  return value.toLocaleDateString("fr-CA", {
    year: "numeric",
    month: "2-digit",
  });
};

export const CalendarPage: React.FunctionComponent = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const response = await api.narudzbe.fetchOrders();
    const responseData = await response.json();
    setOrders(responseData);
  };

  const getMonthData = (value: Dayjs) => {
    let filteredData = orders.filter(
      (elem: any) =>
        formatMonth(new Date(elem.datumIsporuke)) ===
        formatMonth(value.toDate())
    );

    const mappedObject = filteredData.map((elem: any) => ({
      content: elem.naziv,
      type: "warning",
    }));

    return mappedObject || [];
  };

  const monthCellRender = (value: Dayjs) => {
    const listData = getMonthData(value);
    return (
      <div className="events">
        {listData.map(
          (item: {
            content:
              | boolean
              | Key
              | ReactElement<any, string | JSXElementConstructor<any>>
              | ReactFragment
              | null
              | undefined;
            type: string | undefined;
          }) => (
            <li>
              <Badge
                text={item.content}
                status={item.type as BadgeProps["status"]}
                color={"blue"}
              />
            </li>
          )
        )}
      </div>
    );
  };

  const getListData = (value: Dayjs) => {
    let filteredData = orders.filter(
      (elem: any) =>
        formatDate(new Date(elem.datumIsporuke)) === formatDate(value.toDate())
    );

    const mappedObject = filteredData.map((elem: any) => ({
      content: elem.naziv,
      type: "warning",
    }));

    return mappedObject || [];
  };

  const dateCellRender = (value: Dayjs) => {
    let listData = getListData(value);
    return (
      <div>
        {listData.map(
          (item: {
            content:
              | boolean
              | Key
              | ReactElement<any, string | JSXElementConstructor<any>>
              | ReactFragment
              | null
              | undefined;
            type: string | undefined;
          }) => (
            <div>
              <Badge
                text={item.content}
                status={item.type as BadgeProps["status"]}
                color={"blue"}
              />
            </div>
          )
        )}
      </div>
    );
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <>
      <Title level={3} style={{ marginTop: 0 }}>
        Kalendarski prikaz
      </Title>
      <Calendar
        className="calendar"
        dateCellRender={dateCellRender}
        monthCellRender={monthCellRender}
      />
    </>
  );
};
