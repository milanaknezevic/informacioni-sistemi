import { Avatar, AvatarProps, Dropdown, MenuProps } from "antd";
import { LogoutOutlined } from "@ant-design/icons";

interface ProfileAvatarProps extends AvatarProps {
  onLogout: () => void;
}

export const ProfileAvatar: React.FunctionComponent<ProfileAvatarProps> = ({
  onLogout,
  ...props
}) => {
  const items: MenuProps["items"] = [
    {
      label: (
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <LogoutOutlined />
          <p onClick={onLogout} style={{ cursor: "pointer" }}>
            Odjava
          </p>
        </div>
      ),
      key: "0",
    },
  ];

  return (
    <Dropdown menu={{ items }} placement="bottomCenter">
      <Avatar size="large" {...props} style={{ cursor: "pointer" }} />
    </Dropdown>
  );
};
