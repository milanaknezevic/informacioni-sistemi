// Libs
import { Button, Form, Input, Modal, Select } from "antd";

// Services
import { api } from "../../api";
import { Namirnica } from "../../api/services/purchases.service";
// Rest
import "./foodstuff-modal.scss";
import { useEffect } from "react";

interface FoodStuffModalProps {
  title?: string;
  isModalOpen: boolean;
  onModalClose: () => void;
}

export const FoodStuffModal: React.FunctionComponent<FoodStuffModalProps> = ({
  title,
  isModalOpen,
  onModalClose,
}) => {
  const [form] = Form.useForm<Namirnica>();

  const handleOk = async (values: Namirnica) => {
    let response = await api.nabavke.addFoodStuff(values);
    if (response.status === 200) {
      form.resetFields();
      onModalClose();
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onModalClose();
  };

  return (
    <Modal
      title={title}
      open={isModalOpen}
      onCancel={handleCancel}
      onOk={form.submit}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Poništi
        </Button>,
        <Button
          key="back"
          type="primary"
          htmlType="submit"
          onClick={form.submit}
        >
          Potvrdi
        </Button>,
      ]}
    >
      <Form
        // layout="vertical"
        labelAlign="left"
        labelCol={{ span: 7 }}
        wrapperCol={{ span: 14 }}
        style={{ maxWidth: 500, marginTop: "25px" }}
        onFinish={handleOk}
        form={form}
      >
        <Form.Item
          label="Naziv"
          name="naziv"
          rules={[{ required: true, message: "Polje je obavezno!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Jedinica"
          name="jedinica"
          rules={[{ required: true, message: "Polje je obavezno!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Cijena po jedinici"
          name="cijenaPoJedinici"
          rules={[{ required: true, message: "Polje je obavezno!" }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};
