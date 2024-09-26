import { Button } from "@mui/material";
import { logOut } from "../config/firebase";

const Dashboard = () => {
  const handleLogout = async () => {
    await logOut();
  };

  return (
    <>
      <h1>Dashboard</h1>
      <Button variant="contained" onClick={handleLogout} >Logout</Button>
      
    </>
  );
};

export default Dashboard;
