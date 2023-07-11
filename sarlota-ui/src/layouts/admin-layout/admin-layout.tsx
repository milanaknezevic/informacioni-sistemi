// Libs
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Badge, Layout, Menu, theme, Typography } from "antd";

import "./admin-layout.scss";

// Assets
import {
  DesktopOutlined,
  TeamOutlined,
  FileTextOutlined,
  SettingOutlined,
  CalendarOutlined,
  ContactsOutlined,
  LineChartOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  BellOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import logo from "../../assets/logo.png";

// Context
import { useAuth } from "../../contexts/user.context";

import { ProfileAvatar } from "../../components/avatar";

const defaultImg = "https://bit.ly/3XjfBLX";
const { Header, Content, Footer, Sider } = Layout;
const { Text } = Typography;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const adminItems: MenuItem[] = [
  // getItem("Pregled", "pregled", <DesktopOutlined />),
  getItem("Narudžbe", "narudzbe", <ShopOutlined />),
  getItem("Nabavke", "nabavke", <ShoppingCartOutlined />),
  getItem("Statistika", "statistika", <LineChartOutlined />),
  getItem("Recepti", "recepti", <FileTextOutlined />),
  getItem("Bestseller", "bestselers", <ShopOutlined />),
  getItem("Zaposleni", "zaposleni", <TeamOutlined />),
  getItem("Kontakti", "kontakti", <ContactsOutlined />),
  getItem("Profil", "podesavanja", <SettingOutlined />),
];

const employeeItems: MenuItem[] = [
  // getItem("Pregled", "pregled", <DesktopOutlined />),
  getItem("Narudžbe", "narudzbe", <ShopOutlined />),
  getItem("Kalendar", "kalendar", <CalendarOutlined />),
  getItem("Recepti", "recepti", <FileTextOutlined />),
  getItem("Bestseller", "bestselers", <ShopOutlined />),
  getItem("Kontakti", "kontakti", <ContactsOutlined />),
  getItem("Profil", "podesavanja", <SettingOutlined />),
];

export const AdminLayout: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const onNavigate = (item: MenuItem) => {
    navigate(`./${item?.key}`);
  };

  const onLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        className="sider"
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        theme="dark"
        // style= {{background: colorBgContainer}}
      >
        <img
          className="logo"
          src={logo}
          alt="logo"
          style={{ paddingInline: collapsed ? "10px" : "30px" }}
        />
        <Menu
          theme="dark"
          defaultSelectedKeys={["narudzbe"]}
          mode="inline"
          items={
            user?.tipZaposlenog === "POSLASTICAR" ? adminItems : employeeItems
          }
          onClick={onNavigate}
        />
      </Sider>

      <Layout className="site-layout">
        <Header
          className="admin-header"
          style={{ paddingBlock: "10px", background: colorBgContainer }}
        >
          <div>
            <strong>Dobrodošli,</strong> {user?.korisnickoIme}
          </div>

          <div className="admin-header__avatar">
            <Badge dot={true}>
              <BellOutlined />
            </Badge>
            <div>
              <Text
                style={{ marginRight: "10px" }}
              >{`${user?.ime} ${user?.prezime}`}</Text>
              <ProfileAvatar
                src={user?.fotografija ?? defaultImg}
                onLogout={onLogout}
              />
            </div>
          </div>
        </Header>
        <Content style={{ margin: "16px 16px" }}>
          <Outlet />
        </Content>

        <Footer style={{ textAlign: "center" }}>Šarlota ©2023</Footer>
      </Layout>
    </Layout>
  );
};
