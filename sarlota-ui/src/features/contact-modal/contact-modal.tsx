// Libs
import { Button, Form, Input, Modal } from "antd";

// Services
import { Contact } from "../../api/services/contacts.service";
import { api } from "../../api";

// Rest
import "./contact-modal.scss";
import { useEffect } from "react";

interface NewContactModalProps {
  title?: string;
  contact: Contact | null | undefined;
  isModalOpen: boolean;
  onModalClose: () => void;
}

export const ContactModal: React.FunctionComponent<NewContactModalProps> = ({
  title,
  contact,
  isModalOpen,
  onModalClose,
}) => {
  const [form] = Form.useForm<Contact>();

  const handleOk = async (values: Contact) => {
    let response;

    if (contact) response = await api.kontakti.editContact(contact.id, values);
    else response = await api.kontakti.addContact(values);

    if (response.status === 200) {
      form.resetFields();
      onModalClose();
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onModalClose();
  };

  useEffect(() => {
    if (contact) {
      form.setFieldsValue({
        ime: contact.ime,
        prezime: contact.prezime,
        brojTelefona: contact.brojTelefona,
        email: contact.email,
        linkProfila: contact.linkProfila,
      });
    }
  });

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
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 14 }}
        style={{ maxWidth: 500, marginTop: "25px" }}
        onFinish={handleOk}
        form={form}
      >
        <Form.Item
          label="Ime"
          name="ime"
          rules={[{ required: true, message: "Polje je obavezno!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Prezime"
          name="prezime"
          rules={[{ required: true, message: "Polje je obavezno!" }]}
        >
          <Input name="prezime" />
        </Form.Item>

        <Form.Item
          label="Broj Telefona"
          name="brojTelefona"
          rules={[{ required: true, message: "Polje je obavezno!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Polje je obavezno!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Link profila"
          name="linkProfila"
          rules={[{ required: true, message: "Polje je obavezno!" }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};
