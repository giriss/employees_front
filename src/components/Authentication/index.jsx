import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { selectIsTokenValid } from "../../reducers/tokenSlice";

function Authentication({ loggedOut = false, children }) {
  const isTokenValid = useSelector(selectIsTokenValid);

  if ((loggedOut && isTokenValid) || (!loggedOut && !isTokenValid)) {
    return <Redirect to={loggedOut ? '/employees' : '/'} />
  }

  return children;
}

export default Authentication;
