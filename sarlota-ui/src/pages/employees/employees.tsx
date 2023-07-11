// Libs
import { useCallback, useEffect, useState } from "react";
import { Button, Empty, message, Typography } from "antd";
import Search from "antd/es/input/Search";

// Components
import { EmployeeCard } from "../../components/employee";
import { EmployeeDetails } from "../../features/employee-details";
import { EmployeeModal } from "../../features/employee-modal";
import { Spinner } from "../../components/spinner";

// Assets
import { UserAddOutlined } from "@ant-design/icons";

// Services
import { Employee } from "../../api/services/employee.service";
import { api } from "../../api";

// Rest
import "./employees.scss";
import { userInfo } from "os";
import { useNavigate } from "react-router";
import { useAuth } from "../../contexts/user.context";

const { Title } = Typography;

export const EmployeesPage: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [employees, setEmployees] = useState<Employee[]>([]);
  const [employeeToEdit, setEmployeeToEdit] = useState<Employee | null>(null);

  const [employeeDetails, setEmployeeDetails] = useState<Employee | null>(null);

  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const [messageApi, contextHolder] = message.useMessage();

  const fetchEmployees = useCallback(async () => {
    setLoading(true);
    const response = await api.zaposleni.fetchEmployees();
    const data = await response.json();
    setEmployees(data);
    setLoading(false);
  }, []);

  const onSearch = async (value: string) => {
    if (value === "") {
      fetchEmployees();
    } else {
      const response = await api.zaposleni.searchEmployees(value);
      const data = await response.json();
      setEmployees(data);
    }
  };

  const onNewEmployeeClick = () => {
    setShowModal(true);
    setEmployeeToEdit(null);
  };

  const onModalClose = () => {
    setShowModal(false);
    setRefresh((is) => !is);
    fetchEmployees();
  };

  const onEmployeeDelete = async (id: number) => {
    const response = await api.zaposleni.deleteEmployee(id);

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

  const onEmployeeEdit = (employee: Employee) => {
    setEmployeeToEdit(employee);
    setShowModal(true);
    setRefresh((is) => !is);
  };

  const onEmployeeDetailsClick = (employee: Employee) => {
    setShowDetails(true);
    setEmployeeDetails(employee);
  };

  const onEmployeeDetailsClose = () => {
    setShowDetails(false);
    setEmployeeDetails(null);
  };

  useEffect(() => {
    user?.tipZaposlenog === "POSLASTICAR"
      ? fetchEmployees()
      : navigate("/admin/pregled");
  }, [fetchEmployees, refresh]);

  return (
    <div className="employees">
      {contextHolder}

      <EmployeeDetails
        employee={employeeDetails}
        open={showDetails}
        onClose={onEmployeeDetailsClose}
      />

      <EmployeeModal
        employee={employeeToEdit}
        title={
          employeeToEdit
            ? "Izmijenite informacije o zaposlenom"
            : "Dodajte novog zaposlenog"
        }
        isModalOpen={showModal}
        onModalClose={onModalClose}
      />

      <div className="contacts__header">
        <Title level={3} style={{ marginTop: 0 }}>
          Zaposleni
        </Title>

        <div className="contacts__header__actions">
          <Button
            type="primary"
            size="large"
            icon={<UserAddOutlined />}
            onClick={onNewEmployeeClick}
          >
            Dodaj zaposlenog
          </Button>
          <Search
            className="contacts__header__actions__search"
            placeholder="Pretraži zaposlene"
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
        <div className="employees__content">
          {employees.length > 0 ? (
            employees?.map((employee) => (
              <EmployeeCard
                employee={employee}
                onDetailsClick={onEmployeeDetailsClick}
                onDeleteClick={onEmployeeDelete}
                onEditClick={onEmployeeEdit}
              />
            ))
          ) : (
            <Empty
              description="Nisu pronađeni zaposleni"
              style={{ margin: "auto", marginTop: "20vh" }}
            />
          )}
        </div>
      )}
    </div>
  );
};
