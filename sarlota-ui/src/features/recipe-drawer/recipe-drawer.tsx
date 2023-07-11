// Libs
import { useEffect, useState } from "react";
import {
  Button,
  Col,
  Drawer,
  DrawerProps,
  Form,
  Input,
  Row,
  Select,
  Space,
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

import Upload, { UploadFile, UploadProps } from "antd/es/upload";

// Services
import { Namirnica, Recipe } from "../../api/services/recipes.service";
import { api } from "../../api";

interface RecipeDrawerProps extends DrawerProps {
  recipe?: Recipe | null;
  onClose: () => void;
}

export const RecipeDrawer: React.FunctionComponent<RecipeDrawerProps> = ({
  recipe,
  open,
  onClose,
}) => {
  const [form] = Form.useForm<Recipe>();
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const [selectOptions, setSelectOptions] = useState([]);

  const fetchNamirnice = async () => {
    const response = await api.nabavke.fetchIngredients();
    const data = await response.json();
    setSelectOptions(
      data.map((n: Namirnica) => {
        return {
          value: n.id,
          label: n.naziv,
        };
      })
    );
  };

  const onSubmit = async (values: Recipe) => {
    const data = { ...values, fotografija: fileList[0]?.thumbUrl || "" };
    let response;

    response = await api.recepti.addRecipe(JSON.stringify(data));

    form.resetFields();
    setFileList([]);
    onClose();

    // if (recipe) {
    //   response = await api.recepti.editRecipe(recipe.id, data);
    // } else {
    //   response = await api.recepti.addRecipe(data);
    // }

    // if (response.status === 200) {
    //   form.resetFields();
    //   setFileList([]);
    //   onClose();
    // }

    // form.resetFields();
    // setFileList([]);
    // onClose();
  };

  const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  useEffect(() => {
    fetchNamirnice();
  }, []);

  useEffect(() => {
    if (recipe) {
      form.setFieldsValue({
        naslov: recipe.naslov,
        sastojci: recipe.sastojci,
        priprema: recipe.priprema,
        fotografija: recipe.fotografija,
      });
      setFileList([
        {
          uid: "-1",
          name: "Dodajte fotografiju",
          status: "done",
          thumbUrl: recipe?.fotografija,
        },
      ]);
    } else {
      setFileList([]);
      form.resetFields();
    }
  }, [recipe, form]);

  return (
    <Drawer
      title="Dodajte novi recept"
      width={720}
      onClose={onClose}
      open={open}
      bodyStyle={{ paddingBottom: 80 }}
      extra={
        <Space>
          <Button onClick={onClose}>Poništi</Button>
          <Button onClick={form.submit} type="primary">
            Potvrdi
          </Button>
        </Space>
      }
    >
      <Form layout="vertical" hideRequiredMark form={form} onFinish={onSubmit}>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item>
              <Upload
                listType="picture-card"
                fileList={fileList}
                onChange={onChange}
                beforeUpload={() => false}
              >
                {fileList.length < 1 && "+ Upload"}
              </Upload>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="naslov"
              label="Naslov"
              rules={[{ required: true, message: "Polje je obavezno" }]}
            >
              <Input placeholder="Naziv recepta" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="priprema"
              label="Priprema"
              rules={[
                {
                  required: true,
                  message: "Polje je obavezno",
                },
              ]}
            >
              <Input.TextArea rows={6} placeholder="Priprema" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
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
                      Dodajte sastojak
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
};
