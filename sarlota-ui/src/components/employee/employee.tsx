// Libs
import { Avatar, Card, Modal, Tooltip } from "antd";

// Assets
import {
  EditOutlined,
  UserDeleteOutlined,
  ExclamationCircleFilled,
  UserOutlined,
} from "@ant-design/icons";

// Services
import { Employee } from "../../api/services/employee.service";

// Rest
import "./employee.scss";

const { Meta } = Card;
const { confirm } = Modal;

interface EmployeeCardProps {
  employee: Employee;
  onDetailsClick: (employee: Employee) => void;
  onDeleteClick: (id: number) => void;
  onEditClick: (employee: Employee) => void;
}

export const EmployeeCard: React.FunctionComponent<EmployeeCardProps> = ({
  employee,
  onDetailsClick,
  onDeleteClick,
  onEditClick,
}) => {
  const onDetails = () => {
    onDetailsClick(employee);
  };

  const onEdit = () => {
    onEditClick(employee);
  };

  const onDelete = () => {
    confirm({
      title: "Da li ste sigurni da želite da obrišete zaposlenog?",
      icon: <ExclamationCircleFilled />,
      content: "Ovu akciju ne možete opozvati.",
      onOk() {
        onDeleteClick(employee.id);
      },
      cancelText: "Poništi",
    });
  };

  return (
    <Card
      hoverable
      className="employee"
      cover={<img alt="example" src={employee.fotografija} />}
      actions={[
        <Tooltip title="Detalji" placement="bottom">
          <UserOutlined key="detalji" onClick={onDetails} />
        </Tooltip>,
        <Tooltip title="Izmjena" placement="bottom">
          <EditOutlined key="izmjena" onClick={onEdit} />
        </Tooltip>,
        <Tooltip title="Brisanje" placement="bottom">
          <UserDeleteOutlined key="brisanje" onClick={onDelete} />
        </Tooltip>,
      ]}
    >
      <Meta
        avatar={<Avatar>A</Avatar>}
        title={`${employee.ime} ${employee.prezime}`}
        description={`Pozicija: ${employee.tipZaposlenog.replace("_", " ")}`}
      />
    </Card>
  );
};
