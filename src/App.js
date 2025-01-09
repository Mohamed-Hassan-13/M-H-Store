// Route
import { Route, Routes } from "react-router-dom";
// Public
import Home from "./pages/Website/Homepage";
import Login from "./pages/Website/Auth/AuthOperations/Login";
import Register from "./pages/Website/Auth/AuthOperations/Rigester";
// Dashboard
import Dashboard from "./pages/Dashboard/dashboard";
// Users
import Users from "./pages/Dashboard/Users/users";
import Edituser from "./pages/Dashboard/Users/EditUser";
import AddUser from "./pages/Dashboard/Users/Addusers";
// Google
import GoogleCallBack from "./pages/Website/Auth/AuthOperations/GoogleCallBack";
// Require
import RequireAuth from "./pages/Website/Auth/Protacting/RequireAuth";
import Requireback from "./pages/Website/Auth/Protacting/Requireback";
// Errors
import Error404 from "./pages/Website/Auth/Errors/404";
// Categories
import Categores from "./pages/Dashboard/Categories/Categores";
import AddCategory from "./pages/Dashboard/Categories/AddCategory";
import EditCategory from "./pages/Dashboard/Categories/EditCategory";
// Products
import Products from "./pages/Dashboard/Products/Products";
import AddProduct from "./pages/Dashboard/Products/AddProduct";
import EditProduct from "./pages/Dashboard/Products/EditProduct";
// Website
import WebsiteCategories from "./pages/Website/Categories/Categories";
import Website from "./pages/Website/Website";
import ProductOnePage from "./pages/Website/ProductOnePage/ProductOnePage";

import ScrollToTop from "./Helpers/ScroolTop";
// Aos
import Aos from "aos";
import "aos/dist/aos.css";
import Checkout from "./pages/Website/Checkout/checkout";
Aos.init();

// App
function App() {
  return (
    <div>
      <ScrollToTop />
      <Routes>
        <Route element={<Website />}>
          <Route path="/" element={<Home />} />
          <Route path="category" element={<WebsiteCategories />} />
          <Route path="product/:id" element={<ProductOnePage />} />
          <Route path="checkout" element={<Checkout />} />
        </Route>
        {/* Public Route */}
        <Route element={<Requireback />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route path="/" element={<Home />} />
        <Route
          path="https://m-h-store-backend-production.up.railway.app/auth/google/callback"
          element={<GoogleCallBack />}
        />
        {/* Prodacted Route */}
        <Route path="/*" element={<Error404 />} />
        <Route element={<RequireAuth allowedRole={["1995", "1996", "1999"]} />}>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route element={<RequireAuth allowedRole={["1995"]} />}>
              <Route path="/dashboard/users" element={<Users />} />
              <Route path="/dashboard/users/:id" element={<Edituser />} />
              <Route path="/dashboard/user/add" element={<AddUser />} />
            </Route>
            <Route element={<RequireAuth allowedRole={["1999", "1995"]} />}>
              {/* Categores */}
              <Route path="/dashboard/Categores" element={<Categores />} />
              <Route path="/dashboard/Categore/add" element={<AddCategory />} />
              <Route
                path="/dashboard/categores/:id"
                element={<EditCategory />}
              />
              {/* Products */}
              <Route path="/dashboard/products" element={<Products />} />
              <Route path="/dashboard/product/add" element={<AddProduct />} />
              <Route path="/dashboard/products/:id" element={<EditProduct />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
