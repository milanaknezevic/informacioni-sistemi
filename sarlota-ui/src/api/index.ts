import {
  fetchContacts,
  addContact,
  deleteContact,
  editContact,
  searchContacts,
} from "./services/contacts.service";
import {
  addEmployee,
  deleteEmployee,
  editEmployee,
  fetchEmployees,
  searchEmployees,
  updateEmployee,
} from "./services/employee.service";
import {
  fetchOrders,
  changeStatus,
  editOrder,
  addOrder,
  deleteOrder,
  searchOrders,
  searchOrdersByPersonName,
} from "./services/orders.service";
import {
  fetchPurchases,
  addFoodStuff,
  fetchIngredients,
  addPurchase,
} from "./services/purchases.service";
import {
  fetchRecipes,
  fetchRecipe,
  deleteRecipe,
  editRecipe,
  searchRecipes,
  addRecipe,
  toggleFavorite,
} from "./services/recipes.service";

import {
  getTotalIncome,
  getNumOfOrders,
  getExpenditure,
  getIncome,
  getBestseleri,
  getGrupisaneNarudzbe,
  getPotrosnjaNarudzbe,
} from "./services/statistics.service";

import { login, signUp } from "./services/users.service";

export const api = {
  kontakti: {
    fetchContacts,
    addContact,
    deleteContact,
    editContact,
    searchContacts,
  },
  login: {
    login,
    signUp,
  },
  zaposleni: {
    fetchEmployees,
    addEmployee,
    deleteEmployee,
    editEmployee,
    searchEmployees,
    updateEmployee,
  },
  recepti: {
    fetchRecipes,
    fetchRecipe,
    deleteRecipe,
    editRecipe,
    searchRecipes,
    addRecipe,
    toggleFavorite,
  },
  narudzbe: {
    fetchOrders,
    editOrder,
    addOrder,
    deleteOrder,
    searchOrders,
    searchOrdersByPersonName,
    changeStatus,
  },
  nabavke: {
    fetchPurchases,
    addFoodStuff,
    fetchIngredients,
    addPurchase,
  },
  statistike: {
    getIncome,
    getBestseleri,
    getExpenditure,
    getTotalIncome,
    getNumOfOrders,
    getGrupisaneNarudzbe,
    getPotrosnjaNarudzbe,
  },
};
