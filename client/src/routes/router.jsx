import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../Components/RootLayout";
import AdminLayout from "../Components/AdminLayout";

import Home from "../Pages/Home";
import Mati from "../Pages/Soil";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Services from "../Pages/Services";
import Contact from "../Pages/Contact";
import SeasonalCrops from "../Pages/SeasonalCrops";
import Market from "../Pages/Market";
import PlantDetect from "../Pages/PlantDetect";
import SoilAdvisor from "../Pages/SoilAdvisor";
import SummerPage from "../Pages/SummerPage";
import RainyPage from "../Pages/RainyPage";
import AutumnPage from "../Pages/AutumnPage";
import LateAutumnPage from "../Pages/LateAutumnPage";
import WinterPage from "../Pages/WinterPAge";
import SpringPage from "../Pages/SpringPage";
import AddCrops from "../Pages/AdminDash/AddCrops";
import BlogDetails from "../Pages/BlogDetails";
import ProtectedRoute from "../routes/ProtectedRoute";
import CartDetails from "../Pages/CartDetails";
import AdminHome from "../Pages/AdminDash/AdminHome";
import AddProduct from "../Pages/AdminDash/AddProduct";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: Home },
      { path: "soil", Component: Mati },
      { path: "login", Component: Login },
      { path: "register", Component: Register },
      { path: "services", Component: Services },
      { path: "blogdetails", Component: BlogDetails },
      { path: "contact", Component: Contact },
      { path: "seasonalcrops", Component: SeasonalCrops },
      { path: "plantdiseasedetect", Component: PlantDetect },
      { path: "soiladvisor", Component: SoilAdvisor },
      { path: "summer", Component: SummerPage },
      { path: "rainy", Component: RainyPage },
      { path: "autumn", Component: AutumnPage },
      { path: "late-autumn", Component: LateAutumnPage },
      { path: "winter", Component: WinterPage },
      { path: "spring", Component: SpringPage },

      // 🔒 Protected User Routes
      {
        path: "addcrops",
        Component: () => (
          <ProtectedRoute>
            <AddCrops />
          </ProtectedRoute>
        ),
      },
      {
        path: "market",
        Component: () => (
          <ProtectedRoute>
            <Market />
          </ProtectedRoute>
        ),
      },
      {
        path: "cart",
        Component: () => (
          <ProtectedRoute>
            <CartDetails />
          </ProtectedRoute>
        ),
      },
    ],
  },

  // 👨‍💼 Admin Section (separate layout, prefixed with /admin)
  {
    path: "/admin",
    Component: AdminLayout,
    children: [
      { index: true, Component: AdminHome },
      { path: "addcrops", Component: AddCrops },
      { path: "addproduct", Component: AddProduct },
    ],
  },
]);

export default router;
