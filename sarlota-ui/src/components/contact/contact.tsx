// Libs
import { Card, Modal } from "antd";

// Assets
import {
  EditOutlined,
  DeleteOutlined,
  PhoneTwoTone,
  MailTwoTone,
  ExclamationCircleFilled,
  SmileTwoTone,
} from "@ant-design/icons";

// Service
import { Contact } from "../../api/services/contacts.service";

// Styles
import "./contact.scss";

const { confirm } = Modal;

interface ContactCardProps {
  contact: Contact;
  onEditClick: (contact: Contact) => void;
  onDeleteClick: (id: number) => void;
}

export const ContactCard: React.FunctionComponent<ContactCardProps> = ({
  contact,
  onEditClick,
  onDeleteClick,
}) => {
  const onEdit = () => {
    onEditClick(contact);
  };

  const onDelete = () => {
    confirm({
      title: "Da li ste sigurni da želite da obrišete ovaj kontakt?",
      icon: <ExclamationCircleFilled />,
      content: "Ovu akciju ne možete opozvati.",
      onOk() {
        onDeleteClick(contact.id);
      },
      cancelText: "Poništi",
    });
  };

  return (
    <Card
      title={`${contact.ime}  ${contact.prezime}`}
      className="contact"
      hoverable
      actions={[
        <EditOutlined key="izmjena" onClick={onEdit} />,
        <DeleteOutlined key="brisanje" onClick={onDelete} />,
      ]}
    >
      <p>
        <PhoneTwoTone /> {contact.brojTelefona}
      </p>
      <p>
        <MailTwoTone />
        {contact.email}
      </p>
      <p>
        <SmileTwoTone />
        <a href={contact.linkProfila} rel="noreferrer" target="_blank">
          Profil
        </a>
      </p>
    </Card>
  );
};
