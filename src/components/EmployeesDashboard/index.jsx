import { Route, Switch } from "react-router-dom";
import EmployeesManagement from "./EmployeesManagement";
import Authentication from "../Authentication";

export default function EmployeesDashboard() {
  return (
    <Authentication>
      <Switch>
        <Route exact path="/employees" component={EmployeesManagement} />
        <Route exact path="/employees/new">
          <EmployeesManagement isCreateOrEdit />
        </Route>
        <Route exact path="/employees/:id">
          {({ match: { params: { id } } }) => (
            <EmployeesManagement isCreateOrEdit editEmployeeId={id} />
          )}
        </Route>
      </Switch>
    </Authentication>
  );
}
