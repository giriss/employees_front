import { useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import { selectToken } from "../../reducers/tokenSlice";
import EmployeesManagement from "./EmployeesManagement";

export default function EmployeesDashboard() {
  const token = useSelector(selectToken);

  if (!token) {
    return <Redirect to="/" />
  }
  return (
    <Switch>
      <Route exact path="/employees" component={EmployeesManagement} />
      <Route exact path="/employees/new">
        <EmployeesManagement isCreation />
      </Route>
    </Switch>
  );
}
