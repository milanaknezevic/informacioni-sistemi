import React, { useEffect, useState } from "react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  DatePicker,
  Divider,
  Form,
  Input,
  Modal,
  ModalProps,
  Select,
  Space,
} from "antd";
import { api } from "../../api";
import { Namirnica } from "../../api/services/purchases.service";

interface PurchaseModalProps extends ModalProps {
  title?: string;
  handleCancel: () => void;
}

interface NamirnicaI {
  idNamirnice: number;
  kolicina: number;
}

interface PurchaseI {
  datumNabavke: string;
  namirnice: NamirnicaI[];
}

export const PurchaseModal: React.FunctionComponent<PurchaseModalProps> = ({
  title,
  handleCancel,
  ...props
}) => {
  const [ingredients, setIngredients] = useState<Namirnica[]>([]);
  const [selectOptions, setSelectOptions] = useState([]);

  const [form] = Form.useForm<PurchaseI>();

  const fetchNamirnice = async () => {
    const response = await api.nabavke.fetchIngredients();
    const data = await response.json();
    setIngredients(data);
    setSelectOptions(
      data.map((n: Namirnica) => {
        return {
          value: n.id,
          label: n.naziv,
        };
      })
    );
  };

  const onFinish = async (values: PurchaseI) => {
    await api.nabavke.addPurchase(JSON.stringify(values));
    form.resetFields();
    handleCancel();
  };

  useEffect(() => {
    fetchNamirnice();
  }, []);

  useEffect(() => {
    form.resetFields();
  }, [props.open]);

  return (
    <Modal
      title={title}
      {...props}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Poništi
        </Button>,
      ]}
    >
      <Form
        name="dynamic_form_nest_item"
        onFinish={onFinish}
        form={form}
        style={{ maxWidth: 600 }}
        autoComplete="off"
      >
        <Form.Item name="datum">
          {/* <Input type="date" style={{ width: "50%" }} /> */}
          <DatePicker format={"dd/mm/yyyy"} />
        </Form.Item>
        <Divider />
        <Form.List name="namirnice">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space
                  key={key}
                  style={{ display: "flex", marginBottom: 8 }}
                  align="baseline"
                >
                  <Form.Item {...restField} name={[name, "idNamirnice"]}>
                    <Select
                      placeholder="Sirovina"
                      style={{ width: 120 }}
                      options={selectOptions}
                    />
                  </Form.Item>
                  <Form.Item {...restField} name={[name, "kolicina"]}>
                    <Input placeholder="Kolicina" />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Kupljena sirovina
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Unesi
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
