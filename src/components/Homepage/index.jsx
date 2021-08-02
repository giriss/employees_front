import LoginOrRegister from "./LoginOrRegister";
import Authentication from "../Authentication";

function Homepage() {
  return (
    <Authentication loggedOut>
      <LoginOrRegister />
    </Authentication>
  );
}

export default Homepage;
