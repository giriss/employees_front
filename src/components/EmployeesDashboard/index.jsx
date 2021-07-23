import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Divider, Segment } from "semantic-ui-react";
import { listEmployees, selectEmployees } from "../../reducers/employeesSlice";
import { selectToken } from "../../reducers/tokenSlice";
import EmployeeCard from "./EmployeeCard";
import EmployeeForm from "./EmployeeForm";

function EmployeesDashboard() {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const employees = useSelector(selectEmployees);

  useEffect(() => {
    dispatch(listEmployees(token));
  }, [dispatch, token]);

  return (
    <Segment stacked>
      <EmployeeForm />
      <Divider />
      <Card.Group centered>
        {employees.map(
          employee => <EmployeeCard employee={employee} key={employee.id} />
        )}
      </Card.Group>
    </Segment>
  );
}

export default EmployeesDashboard;
