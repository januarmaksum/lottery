import LogoRsab from "../assets/logo-rsab-harkit.png";
import LogoKemenkes from "../assets/logo-hi.png";

export default function Header() {
  return (
    <div className="fixed top-0 left-0 right-0">
      <div className="flex justify-between">
        <div className="w-96 flex relative top-4 left-4">
          <div className="border-shape relative left-3 w-[19rem] h-[9rem] bg-white opacity-90"></div>
          <img
            src={LogoRsab}
            alt="logo rsab"
            className="absolute left-0 top-10 image"
          />
        </div>
        <div className="w-64 flex relative">
          <div className="border-shape-2 relative top-10 w-[10rem] h-[8rem] bg-white opacity-90"></div>
          <img
            src={LogoKemenkes}
            alt="logo rsab"
            className="h-40 absolute left-3 top-3 image"
          />
        </div>
      </div>
    </div>
  );
}
