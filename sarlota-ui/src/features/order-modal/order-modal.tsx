// Libs
import {
  Button,
  Form,
  Input,
  Modal,
  Select,
  Upload,
  UploadFile,
  UploadProps,
} from "antd";

// Services
import { Orders } from "../../api/services/orders.service";
import { api } from "../../api";

import "./order-modal.scss";

// Rest
import { useEffect, useState } from "react";
import { element } from "prop-types";
import { Recipe } from "../../api/services/recipes.service";

interface OrderModalProps {
  title?: string;
  order: Orders | null;
  isModalOpen: boolean;
  onModalClose: () => void;
}

export const OrderModal: React.FunctionComponent<OrderModalProps> = ({
  title,
  order,
  isModalOpen,
  onModalClose,
}) => {
  const [form] = Form.useForm<Orders>();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [totalPrice, setTotalPrice] = useState(0.0);
  const [recipesTitle, setRecipesTitle] = useState([]);

  const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const handleOk = async (values: Orders) => {
    let response;
    values = {
      ...values,
      datumIsporuke: new Date(values.datumIsporuke).toISOString(),
      datumPrijema: new Date(values.datumPrijema).toISOString(),
      aktivna: true,
      slika: fileList[0]?.thumbUrl || "",
    };

    if (order)
      response = await api.narudzbe.editOrder(order.id ? order.id : 0, values);
    else {
      response = await api.narudzbe.addOrder(values);
    }

    if (response.status === 200) {
      setFileList([]);
      form.resetFields();
      onModalClose();
    }
    onModalClose();
  };

  const handleCancel = () => {
    setFileList([]);
    form.resetFields();
    onModalClose();
  };

  const fetchRecipes = async () => {
    const response = await api.recepti.fetchRecipes();
    const data = await response.json();
    const titleArray = data.map((elem: any) => ({
      value: elem.naslov,
      label: elem.naslov,
    }));
    setRecipesTitle(titleArray);
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  useEffect(() => {
    if (order) {
      form.setFieldsValue({
        datumIsporuke: new Date(order.datumIsporuke).toLocaleDateString(
          "fr-CA",
          { year: "numeric", month: "2-digit", day: "2-digit" }
        ),
        datumPrijema: new Date(order.datumPrijema).toLocaleDateString("fr-CA", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        }),
        naziv: order.naziv,
        imeNarucioca: order.imeNarucioca,
        kontakt: order.kontakt,
        adresa: order.adresa,
        brojKomada: order.brojKomada,
        slika: order.slika,
        napomene: order.napomene,
        velicina: order.velicina,
        nazivRecepta: order.nazivRecepta,
        cijena: order.cijena,
      });
      setFileList([
        {
          uid: "-1",
          name: "Dodajte fotografiju",
          status: "done",
          thumbUrl: order?.slika,
        },
      ]);
    }
  }, [order, form]);

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
        labelAlign="left"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 14 }}
        style={{ maxWidth: 500, marginTop: "25px" }}
        onFinish={handleOk}
        form={form}
      >
        <Form.Item className="order_upload">
          <Upload
            listType="picture-card"
            fileList={fileList}
            onChange={onChange}
            beforeUpload={() => false}
          >
            {fileList.length < 1 && "+ Upload"}
          </Upload>
        </Form.Item>
        <Form.Item
          label="Datum prijema"
          name="datumPrijema"
          rules={[{ required: true, message: "Polje je obavezno!" }]}
        >
          <Input type="date" />
        </Form.Item>
        <Form.Item
          label="Datum isporuke"
          name="datumIsporuke"
          rules={[{ required: true, message: "Polje je obavezno!" }]}
        >
          <Input name="datumIsporuke" type="date" />
        </Form.Item>
        <Form.Item
          label="Napomene"
          name="napomene"
          rules={[{ required: true, message: "Polje je obavezno!" }]}
        >
          <Input name="napomene" />
        </Form.Item>
        <Form.Item
          label="Naziv"
          name="naziv"
          rules={[{ required: true, message: "Polje je obavezno!" }]}
        >
          <Input name="naziv" />
        </Form.Item>
        <Form.Item
          label="Broj komada"
          name="brojKomada"
          rules={[{ required: true, message: "Polje je obavezno!" }]}
        >
          <Input name="brojKomada" type="number" />
        </Form.Item>
        <Form.Item
          label="Velicina"
          name="velicina"
          rules={[{ required: true, message: "Polje je obavezno!" }]}
        >
          <Select
            onChange={(value) => form.setFieldValue("velicina", value)}
            options={[
              { value: "Mala", label: "Mala" },
              { value: "Srednja", label: "Srednja" },
              { value: "Velika", label: "Velika" },
            ]}
          />
        </Form.Item>
        <Form.Item
          label="Naziv recepta"
          name="nazivRecepta"
          rules={[{ required: true, message: "Polje je obavezno!" }]}
        >
          <Select
            onChange={(value) => form.setFieldValue("nazivRecepta", value)}
            options={recipesTitle}
          />
        </Form.Item>
        <Form.Item
          label="Cijena"
          name="cijena"
          rules={[{ required: true, message: "Polje je obavezno!" }]}
        >
          <Input name="cijena" value={totalPrice} />
        </Form.Item>
        <Form.Item
          label="Ime naručioca"
          name="imeNarucioca"
          rules={[{ required: true, message: "Polje je obavezno!" }]}
        >
          <Input name="imeNarucioca" />
        </Form.Item>
        <Form.Item
          label="Kontakt"
          name="kontakt"
          rules={[{ required: true, message: "Polje je obavezno!" }]}
        >
          <Input name="kontakt" />
        </Form.Item>
        <Form.Item
          label="Adresa"
          name="adresa"
          rules={[{ required: true, message: "Polje je obavezno!" }]}
        >
          <Input name="adresa" />
        </Form.Item>
      </Form>
    </Modal>
  );
};
