// Libs
import { Button, Card, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";

import { LoginRequest } from "../../api/services/users.service";
import { useAuth } from "../../contexts/user.context";

// Utils
import { api } from "../../api";
import "./login-form.scss";

export const LoginForm: React.FunctionComponent = () => {
  const [form] = Form.useForm<LoginRequest>();
  const { login } = useAuth();
  const navigate = useNavigate();

  const onFinish = async (values: LoginRequest) => {
    const response = await api.login.login(values);
    if (response.status === 200) {
      const user = await response.json();
      const token = user.token;
      login(user, token);
      navigate("/admin/narudzbe");
    } else onFinishFailed("Error");
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="content">
      <Card className="login-style" style={{ width: 400 }}>
        <div className="login-form">
          <img
            src="https://bit.ly/3RzJ1UK"
            alt="rounded"
            style={{
              borderRadius: "50%",
              width: "100px",
              height: "100px",
            }}
          ></img>
          <Form
            name="basic"
            form={form}
            labelAlign="left"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 18 }}
            style={{ maxWidth: 800 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Username"
              name="korisnickoIme"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="lozinka"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button
                type="primary"
                htmlType="submit"
                className="submit-button"
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Card>
    </div>
  );
};
