// Libs
import { Typography } from "antd";

// Components
import SettingsCard from "../../features/settings-card/settings-card";

import "./settings.scss";

export const SettingsPage: React.FunctionComponent = () => {
  const { Title } = Typography;

  return (
    <div className="settings">
      <div className="settings__header">
        <Title level={3} style={{ marginTop: 0, marginBottom: 0 }}>
          Podešavanje profila
        </Title>
      </div>
      <div className="settings__content">
        <SettingsCard />
      </div>
    </div>
  );
};
