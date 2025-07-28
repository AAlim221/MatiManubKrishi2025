import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Banner from "../Components/Banner";
import Blogs from "../Components/Blogs";
import CommonDisease from "../Components/CommonDisease";
import ReviewSection from "../Components/ReviewSection";
import Services from "../Components/Services";
import ExpertDoctors from "../Components/ExpertDoctors";



const Home = () => {
  const { t } = useTranslation();


  return (
   <div className="w-full overflow-x-hidden">
  {/* header + banner block */}
  <div className="w-screen overflow-x-hidden relative left-1/2 right-1/2 -mx-[50vw] px-0">
  <header className="bg-gradient-to-r from-green-800 via-emerald-900 to-green-800 py-3 shadow-xl border-b-4 border-green-600 animate-fadeInSlow">
    <h1 className="text-white text-center text-5xl md:text-4xl font-extrabold tracking-wide drop-shadow-md font-serif mt-1 uppercase">
      <Link to="/" className="hover:text-green-300 transition-colors duration-300">
        {t("brandName")}
      </Link>
    </h1>
    <p className="text-green-100 text-center mt-1 text-sm md:text-base italic tracking-wide font-light animate-fadeIn">
      Cultivating Progress | Empowering Farmers | Rooted in Innovation
    </p>
  </header>
        <Banner fullWidth={true} />
      </div>

      {/* ✅ Main page content inside container */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 space-y-32">

             {/* Services Section */}
              <Services />

             {/* Expert Doctors Section */}
              <ExpertDoctors />

             {/* Disease Posts Section */}
              <CommonDisease />
       
             {/* Blog Section */}
              <Blogs />
       
             {/* Review Section */}
              <ReviewSection/>
       </div>
    </div>
  );
};

export default Home;
