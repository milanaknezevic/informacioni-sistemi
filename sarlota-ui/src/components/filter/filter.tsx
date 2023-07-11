import React, { useState } from "react";
import { FilterOutlined } from "@ant-design/icons";
import { Button, Checkbox, MenuProps } from "antd";
import { Dropdown, Space } from "antd";
import { CheckboxValueType } from "antd/es/checkbox/Group";
import { CheckboxChangeEvent } from "antd/es/checkbox";

import "./filter.scss";

const CheckboxGroup = Checkbox.Group;
const options = ["Danas", "Sutra"];

export interface FilterProps {
  setCheckedOptions: (value: any) => void;
}

const Filter = ({ setCheckedOptions }: FilterProps) => {
  const [checkedList, setCheckedList] = useState<CheckboxValueType[]>([]);
  const [checkAll, setCheckAll] = useState(false);
  const [open, setOpen] = useState(false);

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    if (e.key === "3") {
      setOpen(false);
    }
  };

  const handleOpenChange = (flag: boolean) => {
    setOpen(flag);
  };

  const handleFilter = () => {
    formatFilterRequest();
    setOpen(false);
  };

  const formatFilterRequest = () => {
    let d = new Date();
    const mappedDates = checkedList.map((date) => {
      if (date === "Sutra") {
        d.setDate(d.getDate() + 1);
      }
      return d
        .toLocaleDateString("fr-CA", {
          year: "numeric",
          month: "numeric",
          day: "numeric",
        })
        .split("T")[0];
    });
    setCheckedOptions(mappedDates);
  };

  const onChange = (list: CheckboxValueType[]) => {
    setCheckedList(list);
    setCheckAll(list.length === options.length);
  };

  const onCheckAllChange = (e: CheckboxChangeEvent) => {
    setCheckAll(e.target.checked);
    setCheckedList(e.target.checked ? options : []);
  };

  const items: MenuProps["items"] = [
    {
      label: (
        <CheckboxGroup
          options={options}
          value={checkedList}
          onChange={onChange}
        />
      ),
      key: "1",
    },
    {
      type: "divider",
    },
    {
      label: (
        <Checkbox onChange={onCheckAllChange} checked={checkAll}>
          Izaberi sve
        </Checkbox>
      ),
      key: "2",
    },
    {
      label: (
        <Button onClick={handleFilter} type="primary">
          Filtriraj
        </Button>
      ),
      key: "3",
    },
  ];

  return (
    <div>
      <Dropdown
        align={{ offset: [-40, 4] }}
        className="filter"
        menu={{ items, onClick: handleMenuClick }}
        onOpenChange={handleOpenChange}
        open={open}
      >
        <Space className="filter__name">
          <FilterOutlined />
          Filter
        </Space>
      </Dropdown>
    </div>
  );
};

export default Filter;
