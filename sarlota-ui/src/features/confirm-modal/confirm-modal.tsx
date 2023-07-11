import { Modal } from "antd";

interface ConfirmModalProps {
  title: string;
}

export const ConfirmModal: React.FunctionComponent<ConfirmModalProps> = ({
  title,
}) => {
  return <Modal title={title}></Modal>;
};
