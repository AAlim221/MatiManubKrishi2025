import {createBrowserRouter,} from "react-router";
import RootLayout from "../Components/RootLayout";
import Home from "../Pages/Home"
import Mati from "../Pages/Soil";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Services from "../Pages/Services";
import Blog from "../Pages/Blog";
import Contact from "../Pages/Contact";
import Crops from "../Pages/Crops";
import market from "../Pages/market";
import PlantDetect from "../Pages/PlantDetect";
import SoilAdvisor from "../Pages/SoilAdvisor"

const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path:'/soil',
                Component: Mati,
               
            }
            ,
             {
                path:'/login',
                Component: Login,
               
            }
            , {
                path:'/register',
                Component: Register,
               
            }
            ,
             {
                path:'/services',
                Component: Services,
               
            }
            ,
             {
                path:'/blog',
                Component: Blog,
               
            }
            ,
             {
                path:'/contact',
                Component: Contact,
               
            }
            ,
             {
                path:'/crops',
                Component: Crops,
               
            }
                        ,
             {
                path:'/market',
                Component: market,
               
            }
            ,
           {
                path:'/plantdiseasedetect',
                Component: PlantDetect,
               
            }
            ,
             {
                path:'/soiladvisor',
                Component: SoilAdvisor,
               
            }
        ]
    },
]);

export default router;