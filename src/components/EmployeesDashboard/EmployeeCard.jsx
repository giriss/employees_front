import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, Label } from "semantic-ui-react";
import { deleteEmployee } from "../../reducers/employeesSlice";
import { selectToken } from "../../reducers/tokenSlice";

function EmployeeCard({ employee }) {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);

  const remove = useCallback(() => {
    dispatch(deleteEmployee({ employee, token }))
  }, [dispatch, employee, token]);

  return (
    <Card raised>
      <Card.Content>
        <Card.Header>{employee.first_name} {employee.last_name}</Card.Header>
        <Card.Meta>{employee.email}</Card.Meta>
        <Card.Description>
          {employee.first_name} {employee.last_name} ({employee.email}) was born on {employee.dob}.
          <br />
          <br />
          <Label color={employee.permanent ? 'green' : 'red'}>
          {employee.permanent ? 'PERMANENT' : 'NON-PERMANENT'}
          </Label>
        </Card.Description>
      </Card.Content>
      <Card.Content extra textAlign="right">
        <Button basic color="red" onClick={remove}>
          Delete
        </Button>
      </Card.Content>
    </Card>
  );
}

export default EmployeeCard;
