import bgImage from "./assets/bg.png";
import { useNavigate } from "react-router-dom";
import Header from "./components/Header";
import Title from "./components/Title";

export default function App() {
  const navigate = useNavigate();
  return (
    <>
      <Header />
      <div
        style={{ backgroundImage: `url(${bgImage})` }}
        className="mx-auto h-screen bg-no-repeat bg-cover bg-bottom flex flex-col items-center justify-center font-Jomhuria"
      >
        <Title />
        <div className="flex gap-20">
          <div
            onClick={() => navigate("/abc")}
            className="card text-[#6B6BAF] bg-yellow-400 hover:bg-[#6B6BAF] hover:text-gray-800 cursor-pointer hover:scale-110 transition-all"
          >
            <div className="bg flex justify-center items-center">
              <h2 className="text-[12rem] leading-none relative mt-6">AB</h2>
              <div className="absolute -top-1 text-3xl text-black">
                Kategori
              </div>
            </div>
            <div className="blob"></div>
          </div>
          <div
            // onClick={() => navigate("/d")}
            className="card text-[#6B6BAF] bg-yellow-400 hover:bg-[#6B6BAF] hover:text-gray-800 cursor-pointer hover:scale-110 transition-all"
          >
            <div className="bg flex justify-center items-center">
              <h2 className="text-[12rem] leading-none relative mt-6">CD</h2>
              <div className="absolute -top-1 text-3xl text-black">
                Kategori
              </div>
            </div>
            <div className="blob"></div>
          </div>
        </div>
      </div>
    </>
  );
}
