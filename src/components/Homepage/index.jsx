import { useSelector } from "react-redux";
import { selectToken } from "../../reducers/tokenSlice";
import EmployeesDashboard from "../EmployeesDashboard";
import LoginOrRegister from "./LoginOrRegister";

function Homepage() {
  const token = useSelector(selectToken);

  if (token) {
    return <EmployeesDashboard />;
  }

  return <LoginOrRegister />;
}

export default Homepage;
