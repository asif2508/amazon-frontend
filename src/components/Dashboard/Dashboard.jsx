import { Outlet } from "react-router-dom";
import { CustomSidebar } from "../commons/Sidebar";

const Dashboard = () => {
  return (
    <div className="w-[100vw] flex justify-between items-start">
      <div className="w-[250px]">
        <CustomSidebar />
      </div>

      <div className="w-[80vw]">
        <div className="w-full flex flex-col items-center">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
