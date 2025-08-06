import { createBrowserRouter } from "react-router-dom";
//Layout

import RootLayout from "../Layouts/RootLayout";
import AdminLayout from "../Layouts/AdminLayout";
import DoctorLayout from "../Layouts/DoctorLayout.jsx";
//Home Page
import Mati from "../Pages/Soil";
import DoctorDetails from "../Pages/DoctorDetails";
import CommonDiseaseDetails from "../Components/CommonDiseaseDetails";
import Blog from "../Components/Blog";
import Blogs from "../Components/Blogs";

//Nabvar
import Home from "../Pages/Home";
import Market from "../Pages/Market";
import SeasonalCrops from "../Pages/SeasonalCrops";
import PlantDetect from "../Pages/PlantDetect";
import Services from "../Pages/Services";
import Contact from "../Pages/Contact";
import About from "../Pages/About";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
//Services
import AllCrops from "../Pages/AllCrops";
import CropDetails from "../Pages/CropDetails";
import SoilAdvisor from "../Pages/SoilAdvisor";
import SummerPage from "../Pages/SummerPage";
import RainyPage from "../Pages/RainyPage";
import AutumnPage from "../Pages/AutumnPage";
import LateAutumnPage from "../Pages/LateAutumnPage";
import WinterPage from "../Pages/WinterPAge";
import SpringPage from "../Pages/SpringPage";
import CartDetails from "../Pages/CartDetails"
import ProtectedRoute from "../routes/ProtectedRoute";

//admin
import AdminHome from "../Pages/AdminDash/AdminHome";
import AdminLogin from "../Pages/AdminDash/AdminLogin";
import AddProduct from "../Pages/AdminDash/AddProduct";
import DiseaseInfoAdd from "../Pages/AdminDash/diseaseInfoAdd";
import TotalOrders from "../Pages/AdminDash/TotalOrders";
import UserProblem from "../Pages/AdminDash/FarmersProblem.jsx";
import AllOrders from "../Pages/AllOrders";
import AdminRoute from "./AdminRoute";
import OurDoctors from "../Pages/AdminDash/OurDoctors";
import WeatherMarket from "../Components/WeatherMarket";
import WeatherUpzila from "../Pages/WeatherUpzila";
import TotalOrdersEdit from "../Pages/AdminDash/TotalOrdersEdit";
import AddDoctor from "../Pages/AdminDash/AddDoctor";
import EditDoctor from "../Pages/AdminDash/EditDoctor";
import AllDiseaseAIInfo from "../Pages/AdminDash/AllDiseaseAiinfo";
import AddCrops from "../Pages/AdminDash/AddCrops";
import AllCropsdetails from "../Pages/AdminDash/AllCropsdetails.jsx"
import EditCrop from "../Pages/AdminDash/EditCrop.jsx";
import AdminProfile from "../Pages/AdminDash/AdminProfile.jsx";
import DoctorWorkpanel from "../Pages/DoctorDashbroad/DoctorWorkpanel.jsx";
import DoctorHome from "../Pages/DoctorDashbroad/DoctorHome.jsx";
import DoctorLogin from "../Pages/DoctorDashbroad/Doctorlogin.jsx";
import DoctorRoute from "./DoctorRoute.jsx";
import EditProfileFarmer from "../Components/EditProfileFarmer.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: Home },
      { path: "soil", Component: Mati },
      { path: "allcrops", Component: AllCrops },
      { path: "crop/:id", element: <CropDetails /> },
       { path: "blog/:id", element: <Blog /> },
      { path: "login", Component: Login },
      { path: "register", Component: Register },
      { path: "services", Component: Services },
      { path: "blogs", Component: Blogs },
      { path: "contact", Component: Contact },
      { path: "seasonalcrops", Component: SeasonalCrops },
      { path: "soiladvisor", Component: SoilAdvisor },
      { path: "summer", Component: SummerPage },
      { path: "rainy", Component: RainyPage },
      { path: "autumn", Component: AutumnPage },
      { path: "late-autumn", Component: LateAutumnPage },
      { path: "winter", Component: WinterPage },
      { path: "spring", Component: SpringPage },
      { path: "/allorders", Component: AllOrders },
      { path: "/about", Component: About },
      { path: "/weather-alerts", Component: WeatherMarket },
      { path:"/weatherdetails", Component:WeatherUpzila},
      { path: "editprofile/:uid", element: <EditProfileFarmer /> },

      
      
      
      
      // 🔒 Protected User Routes
      {
        path: "/commondiseasedetails/:id",
        element: (
          <ProtectedRoute>
            <CommonDiseaseDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "plantdiseasedetect",
        element: (
          <ProtectedRoute>
            <PlantDetect />
          </ProtectedRoute>
        ),
      },
      
      {
        path: "market",
        element: (
          <ProtectedRoute>
            <Market />
          </ProtectedRoute>
        ),
      },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <CartDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "/doctor/:id",
        element: (
          <ProtectedRoute>
            <DoctorDetails />
          </ProtectedRoute>
        ),
      },
    ],
  },

 {
  path: "/admin",
  element: (
    <AdminRoute>
      <AdminLayout />
    </AdminRoute>
  ),
  children: [
    { index: true, element: <AdminHome /> },
    { path: "addproduct", element: <AddProduct /> },
    { path: "orders", element: <TotalOrders /> },
    { path: "totalorderedit/:id", element: <TotalOrdersEdit /> },
    { path: "userproblem", element: <UserProblem /> },
    { path: "doctors", element: <OurDoctors /> },
    { path: "add-doctor", element: <AddDoctor /> },
    { path: "edit-doctor/:id", element: <EditDoctor /> },
     { path: "diseaseInfoAdd", element: <DiseaseInfoAdd /> },
    { path: "diseaseinfoai", element: <AllDiseaseAIInfo /> },
    { path: "addcrops", element: <AddCrops /> },
    { path: "all-crops-details", element: <AllCropsdetails /> },
    { path: "edit-crop/:id", element: <EditCrop /> },
    { path: "profile", element: <AdminProfile /> }
    
  ],
},
// Admin login route (outside protected section)
{
  path: "/admin-login",
  element: <AdminLogin />,
},



// ✅ Doctor Admin Protected Panel
{
  path: "/admindoctor",
  element: <DoctorRoute><DoctorLayout /></DoctorRoute>,
  children: [
    { index: true, element: <DoctorHome /> },
    { path: "doctorwork", element: <DoctorWorkpanel /> },
  ],
},

// ✅ Doctor Admin Login
{
  path: "/admin-login-doctor",
  element: <DoctorLogin />,
}

]);

export default router;
