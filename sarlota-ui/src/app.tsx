// Libs
import { useRoutes } from "react-router";

// Layout
import { AdminLayout } from "./layouts/admin-layout";

// Pages
import { LoginPage } from "./pages/login";
import { SignUpPage } from "./pages/sign-up";
import { StatisticsPage } from "./pages/statistics";
import { CalendarPage } from "./pages/calendar";
import { HomePage } from "./pages/home";
import { EmployeesPage } from "./pages/employees";
import { SettingsPage } from "./pages/settings";
import { ContactsPage } from "./pages/contacts";
import { RecipesPage } from "./pages/recipes";
import { OrdersPage } from "./pages/orders";
import { RecipePage } from "./pages/recipe";
import { PurchasesPage } from "./pages/purchases";
import { BestselersPage } from "./pages/bestselers";

import "moment/locale/bs";
import moment from "moment";

moment.locale("bs");

function App() {
  const routes = useRoutes([
    { path: "/", element: <LoginPage /> },
    { path: "/prijava", element: <LoginPage /> },
    { path: "/signup", element: <SignUpPage /> },
    {
      path: "/admin",
      element: <AdminLayout />,
      children: [
        { path: "pregled", element: <OrdersPage /> },
        { path: "kalendar", element: <CalendarPage /> },
        { path: "narudzbe", element: <OrdersPage /> },
        { path: "statistika", element: <StatisticsPage /> },
        { path: "bestselers", element: <BestselersPage /> },
        { path: "nabavke", element: <PurchasesPage /> },
        { path: "zaposleni", element: <EmployeesPage /> },
        { path: "recepti", element: <RecipesPage /> },
        { path: "recepti/:id", element: <RecipePage /> },
        { path: "kontakti", element: <ContactsPage /> },
        { path: "podesavanja", element: <SettingsPage /> },
        { path: "*", element: <OrdersPage /> },
      ],
    },
    { path: "*", element: <LoginPage /> },
  ]);

  return routes;
}

export default App;
