import { Spin } from "antd";

import "./spinner.scss";

export const Spinner: React.FunctionComponent = () => {
  return (
    <div className="spinner-container">
      <Spin size="large" />
    </div>
  );
};
