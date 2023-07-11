// Libs
import { Card, Modal, Tooltip } from "antd";

// Assets
import {
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleFilled,
  EyeOutlined,
} from "@ant-design/icons";

// Services
import { Orders } from "../../api/services/orders.service";

// Rest
import "./order.scss";

const { Meta } = Card;
const { confirm } = Modal;

interface OrderCardProps {
  order: Orders;
  onDetailsClick: (order: Orders) => void;
  onDeleteClick: (id: number) => void;
  onEditClick: (order: Orders) => void;
  onChangeStatus: (id: number) => void;
}

export const OrderCard: React.FunctionComponent<OrderCardProps> = ({
  order,
  onDetailsClick,
  onDeleteClick,
  onEditClick,
  onChangeStatus,
}) => {
  const onEdit = () => {
    onEditClick(order);
  };

  const onDetails = () => {
    onDetailsClick(order);
  };

  const onDelete = () => {
    confirm({
      title: "Da li ste sigurni da želite da obrišete narudžbu?",
      icon: <ExclamationCircleFilled />,
      content: "Ovu akciju ne možete opozvati.",
      onOk() {
        onDeleteClick(order.id ? order.id : 0);
      },
      cancelText: "Poništi",
    });
  };

  const onchange = () => {
    onChangeStatus(order.id ? order.id : 0);
  };
  const formatDateTime = (date: string) => {
    return new Date(date).toLocaleDateString("en-GB", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });
  };

  return (
    <Card
      hoverable
      className="order"
      cover={
        <img
          alt="example"
          style={{ height: "400px", width: "100%", objectFit: "cover" }}
          src={
            order?.slika !== ""
              ? order.slika
              : "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/450px-No_image_available.svg.png"
          }
        />
      }
      actions={[
        <Tooltip title="Detalji" placement="bottom">
          <EyeOutlined key="detalji" onClick={onDetails} />
        </Tooltip>,
        <Tooltip title="Izmjena" placement="bottom">
          <EditOutlined key="izmjena" onClick={onEdit} />
        </Tooltip>,
        <Tooltip title="Brisanje" placement="bottom">
          <DeleteOutlined key="brisanje" onClick={onDelete} />
        </Tooltip>,
      ]}
    >
      <Meta title={`${order?.naziv}`} />
      <p>Datum prijema: {formatDateTime(order.datumPrijema)}</p>
      <p>Datum isporuke: {formatDateTime(order.datumIsporuke)}</p>

      <p
        style={{
          marginBottom: order.aktivna ? "" : "38px",
        }}
      >
        Status:{" "}
        <span
          style={{
            color: order.aktivna ? "red" : "green",
          }}
        >
          {order.aktivna ? "nije isporučena" : "isporučena"}
        </span>
      </p>

      {order.aktivna === true && <button onClick={onchange}>Isporuči</button>}
    </Card>
  );
};
