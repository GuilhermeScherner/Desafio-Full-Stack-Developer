import cryptosImage from "assets/images/cryptos.jpg";
import { Outlet } from "react-router-dom";

type Props = {
  children?: React.ReactNode;
};

export const Unauthenticated = ({ children }: Props) => {
  return (
    <div className="flex flex-row min-h-screen bg-raisin-black">
      <div className="basis-full md:basis-1/3">
        <Outlet />
      </div>
      <div className="hidden md:basis-4/6  md:block">
        <img src={cryptosImage} alt={"coins"} className="object-cover h-full" />
      </div>
    </div>
  );
};
