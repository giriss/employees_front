import { useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Container, Divider, Header } from "semantic-ui-react";
import { listEmployees, selectEmployees } from "../../reducers/employeesSlice";
import { selectToken } from "../../reducers/tokenSlice";
import EmployeeCard from "./EmployeeCard";
import EmployeeCreateForm from "../EmployeeCreateForm";
import PaddedContainer from "../styled-components/PaddedContainer";
import { useHistory } from "react-router-dom";

function EmployeesManagement({ isCreation }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const token = useSelector(selectToken);
  const employees = useSelector(selectEmployees);
  const hasEmployee = useMemo(() => !!employees && !!employees.length, [employees]);

  useEffect(() => {
    dispatch(listEmployees(token));
  }, [dispatch, token]);

  return (
    <>
      <Header as="h1">Employees Management</Header>
      <Divider />
      <PaddedContainer bottom size="15px">
        <EmployeeCreateForm
          open={isCreation}
          onOpen={() => history.push('/employees/new')}
          onClose={() => history.push('/employees')}
        />
      </PaddedContainer>
      {hasEmployee && (
        <Card.Group stackable itemsPerRow={2}>
          {employees.map(
            employee => <EmployeeCard employee={employee} key={employee.id} />
          )}
        </Card.Group>
      )}
      {!hasEmployee && (
        <Container textAlign="center">
          No employee found
        </Container>
      )}
    </>
  );
}

export default EmployeesManagement;
