// Libs
import { useEffect, useState } from "react";

import {
  Button,
  Card,
  Form,
  Input,
  Upload,
  UploadFile,
  UploadProps,
} from "antd";

// Icons
import { EditOutlined, CloseOutlined, CheckOutlined } from "@ant-design/icons";

// Rest
import { Employee } from "../../api/services/employee.service";
import "./settings-card.scss";
import { api } from "../../api";
import { useAuth } from "../../contexts/user.context";

const SettingsCard: React.FunctionComponent = () => {
  const { user, setUser } = useAuth();
  const [isEditActive, setIsEditActive] = useState(false);
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("********");
  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: "-1",
      name: "image.png",
      status: "done",
      thumbUrl: user?.fotografija,
    },
  ]);
  const [form] = Form.useForm<Employee>();

  const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const editProfile = () => {
    form.resetFields();
    setIsEditActive(!isEditActive);
  };

  const formatFormData = (values: any) => {
    return {
      ime: values.ime,
      prezime: values.prezime,
      korisnickoIme: values.korisnickoIme,
      lozinka: values.lozinka,
      novaLozinka: values.novaLozinka,
      fotografija: fileList[0].thumbUrl,
    };
  };

  const save = async (values: any) => {
    const employee = formatFormData(values);
    let response = await api.zaposleni.editEmployee(user?.id || 0, employee);
    let responseData = await response.text();
    localStorage.setItem("USER", responseData);
    editProfile();
    setUser(JSON.parse(responseData));
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    setUsername(user?.korisnickoIme || "");
    setFirstName(user?.ime || "");
    setLastName(user?.prezime || "");
    setPassword("********");
  }, [user]);

  useEffect(() => {
    if (!isEditActive) {
      setUsername(user?.korisnickoIme || "");
      setFirstName(user?.ime || "");
      setLastName(user?.prezime || "");
      setPassword("********");
    } else {
      setUsername("");
      setFirstName("");
      setLastName("");
      setPassword("");
    }
  }, [isEditActive, user]);

  return (
    <Card className="card">
      <Form
        labelAlign="left"
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 60 }}
        style={{
          maxWidth: 500,
          marginTop: "25px",
        }}
        onFinish={save}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        form={form}
      >
        <Form.Item name="fotografija">
          <Upload
            listType="picture-card"
            fileList={fileList}
            onChange={onChange}
            beforeUpload={() => false}
            className="card__image"
            disabled={!isEditActive}
          >
            {fileList.length !== 0 ? null : "+ Upload"}
          </Upload>
        </Form.Item>
        <Form.Item
          label="Ime"
          name="ime"
          rules={[{ required: true, message: "Polje je obavezno!" }]}
        >
          <Input placeholder={firstName} disabled={!isEditActive} />
        </Form.Item>
        <Form.Item
          label="Prezime"
          name="prezime"
          rules={[{ required: true, message: "Polje je obavezno!" }]}
        >
          <Input disabled={!isEditActive} placeholder={lastName} />
        </Form.Item>

        <Form.Item
          label="Korisničko ime"
          name="korisnickoIme"
          rules={[{ required: true, message: "Polje je obavezno!" }]}
        >
          <Input disabled={!isEditActive} placeholder={username} />
        </Form.Item>
        <Form.Item
          label="Lozinka"
          name="lozinka"
          rules={[{ required: true, message: "Polje je obavezno!" }]}
        >
          <Input.Password disabled={!isEditActive} placeholder={password} />
        </Form.Item>
        {isEditActive && (
          <Form.Item
            label="Nova lozinka"
            name="novaLozinka"
            rules={[{ required: true, message: "Polje je obavezno!" }]}
          >
            <Input.Password disabled={!isEditActive} />
          </Form.Item>
        )}
        {isEditActive && (
          <Form.Item
            label="Potvrda lozinke"
            name="potvrdaLozinke"
            dependencies={["novaLozinka"]}
            rules={[
              { required: true, message: "Polje je obavezno!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("novaLozinka") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Lozinke se ne podudaraju!"));
                },
              }),
            ]}
          >
            <Input.Password disabled={!isEditActive} />
          </Form.Item>
        )}
        <div className="card__row">
          {!isEditActive && (
            <Button
              type="primary"
              size="large"
              icon={<EditOutlined />}
              onClick={editProfile}
            >
              Izmijeni informacije
            </Button>
          )}
          {isEditActive && (
            <Form.Item>
              <Button
                type="primary"
                size="large"
                htmlType="submit"
                icon={<CheckOutlined />}
              >
                Sačuvaj
              </Button>
            </Form.Item>
          )}
          {isEditActive && (
            <Form.Item>
              <Button
                type="primary"
                size="large"
                icon={<CloseOutlined />}
                onClick={editProfile}
              >
                Odustani
              </Button>
            </Form.Item>
          )}
        </div>
      </Form>
    </Card>
  );
};

export default SettingsCard;
