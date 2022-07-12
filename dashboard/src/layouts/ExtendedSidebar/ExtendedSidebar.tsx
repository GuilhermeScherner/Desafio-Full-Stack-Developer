import { Outlet } from "react-router-dom";
import { Header, Sidebar } from "components";

type Props = {
  children?: React.ReactNode;
};
export const ExtendedSidebar = ({ children }: Props) => {
  return (
    <div className="flex min-h-screen">
      <div className="hidden md:block">
        <Sidebar />
      </div>
      <div className="flex flex-col bg-gray-300 w-full">
        <Header />
        <div className="px-1 md:px-8 py-4 box-border">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
