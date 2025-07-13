import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Cart from "./components/Cart/Cart";
import Header from "./components/commons/Header";
import Dashboard from "./components/Dashboard/Dashboard";
import DashboardProducts from "./components/Dashboard/DashboardProducts";
import Stats from "./components/Dashboard/Stats";
import HomePage from "./components/Home/HomePage";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import GlobalProvider from "./Providers/GlobalProvider";
import UserProvider from "./Providers/UserProvider";
function App() {
  return (
    <GlobalProvider>
      <UserProvider>
        <div>
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />

            <Route path="/dashboard" element={<Dashboard />}>
              <Route path="/dashboard/" element={<Stats />} />
              <Route
                path="/dashboard/manage-products"
                element={<DashboardProducts />}
              />
            </Route>
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
          <Toaster />
        </div>
      </UserProvider>
    </GlobalProvider>
  );
}

export default App;
