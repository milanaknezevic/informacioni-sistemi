// Libs
import { useCallback, useEffect, useState } from "react";
import { Empty, message, Typography } from "antd";
import { Input, Button } from "antd";

// Components
import { ContactCard } from "../../components/contact";
import { Spinner } from "../../components/spinner";
import { ContactModal } from "../../features/contact-modal";

// Assets
import { UserAddOutlined } from "@ant-design/icons";

// Utils
import { Contact } from "../../api/services/contacts.service";
import { api } from "../../api";
import "./contacts.scss";

const { Title } = Typography;
const { Search } = Input;

export const ContactsPage: React.FunctionComponent = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [contactToEdit, setContactToEdit] = useState<
    Contact | null | undefined
  >(null);

  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const [showModal, setShowModal] = useState(false);

  const [messageApi, contextHolder] = message.useMessage();

  const fetchContacts = useCallback(async () => {
    setLoading(true);
    const response = await api.kontakti.fetchContacts();
    const data = await response.json();
    setContacts(data);
    setLoading(false);
  }, []);

  const onSearch = async (value: string) => {
    if (value === "") {
      fetchContacts();
    } else {
      const response = await api.kontakti.searchContacts(value);
      const data = await response.json();
      setContacts(data);
    }
  };

  const onNewContactClick = () => {
    setShowModal(true);
    setContactToEdit(null);
  };

  const onModalClose = () => {
    setShowModal(false);
    setContactToEdit(null);
    setRefresh((is) => !is);
  };

  const onContactDelete = async (id: number) => {
    const response = await api.kontakti.deleteContact(id);

    if (response.status === 200) {
      messageApi.open({
        type: "success",
        content: "Kontakt je uspješno obrisan!",
      });
    } else {
      messageApi.open({
        type: "error",
        content: "Došlo je do greške.",
      });
    }

    setRefresh((is) => !is);
  };

  const onContactEdit = (contact: Contact) => {
    setContactToEdit(contact);
    setShowModal(true);
    setRefresh((is) => !is);
  };

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts, refresh]);

  return (
    <div className="contacts">
      {contextHolder}

      <ContactModal
        title={contactToEdit ? "Izmijenite kontakt" : "Dodajte novi kontakt"}
        isModalOpen={showModal}
        contact={contactToEdit}
        onModalClose={onModalClose}
      />

      <div className="contacts__header">
        <Title level={3} style={{ marginTop: 0 }}>
          Kontakti
        </Title>

        <div className="contacts__header__actions">
          <Button
            type="primary"
            size="large"
            icon={<UserAddOutlined />}
            onClick={onNewContactClick}
          >
            Dodaj kontakt
          </Button>

          <Search
            className="contacts__header__actions__search"
            placeholder="Pretraži kontakte"
            allowClear
            enterButton="Pretraga"
            size="large"
            onSearch={onSearch}
          />
        </div>
      </div>

      {loading ? (
        <Spinner />
      ) : (
        <div className="contacts__content">
          {contacts.length > 0 ? (
            contacts?.map((contact) => (
              <ContactCard
                contact={contact}
                onDeleteClick={onContactDelete}
                onEditClick={onContactEdit}
              />
            ))
          ) : (
            <Empty
              description="Nisu pronađeni kontakti."
              style={{ margin: "auto", marginTop: "20vh" }}
            />
          )}
        </div>
      )}
    </div>
  );
};
