import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { selectToken } from "../../reducers/tokenSlice";
import LoginOrRegister from "./LoginOrRegister";

function Homepage() {
  const token = useSelector(selectToken);

  if (token) {
    return <Redirect to="/employees" />;
  }

  return <LoginOrRegister />;
}

export default Homepage;
