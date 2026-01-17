import { Route, Routes } from "react-router-dom";

import AddProduct from "./page/AddProduct";
import Home from "./page/Home";
import Login from "./components/Login";
import PrivateRoute from "./route/PrivateRoute";
import ProductList from "./components/ProductList";
import PublicRoute from "./route/PublicRoute";
import Signup from "./components/Signup";

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
      <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />
      <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
      <Route path="/addproduct" element={<PrivateRoute><AddProduct/></PrivateRoute>} />
    </Routes>
  );
};

export default App;
