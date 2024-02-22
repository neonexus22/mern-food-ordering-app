import landingImage from "../assets/landing.png";
import appDownloadImage from "../assets/appDownload.png";

const HomePage = () => {
  return (
    <div className="flex flex-col gap-12">
      <div className="bg-white rounded-lg shadow-md py-8 flex flex-col gap-5 text-center -mt-16">
        <h1 className="text-5xl font-bold text-orange-600 tracking-tight">
          Tuck into a takeway today
        </h1>
        <span className="text-xl text-gray-500">
          The best place to find the best food in the world.
        </span>
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        <img src={landingImage} />
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <span className="font-bold text-3xl tracking-tighter ">
            Order takeway even faster!
          </span>
          <span className="text-gray-500">
            Download the MernEats App for faster ordering and personalized
            recommendations.
          </span>
          <img src={appDownloadImage} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
