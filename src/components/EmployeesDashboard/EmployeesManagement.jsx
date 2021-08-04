import { useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Divider, Header } from "semantic-ui-react";
import { listEmployees, selectEmployees } from "../../reducers/employeesSlice";
import { selectToken } from "../../reducers/tokenSlice";
import EmployeeCreateForm from "../EmployeeCreateForm";
import PaddedContainer from "../styled-components/PaddedContainer";
import { useHistory } from "react-router-dom";
import { EmployeesList } from "./EmployeesList";

function EmployeesManagement({ isCreateOrEdit, editEmployeeId }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const token = useSelector(selectToken);
  const employees = useSelector(selectEmployees);
  const hasEmployee = useMemo(() => !!employees && !!employees.length, [employees]);

  const editEmployee = useMemo(() => (
    employees.find(({ id }) => id === +editEmployeeId)
  ), [employees, editEmployeeId]);

  useEffect(() => {
    dispatch(listEmployees(token));
  }, [dispatch, token]);

  return (
    <>
      <Header as="h1">Employees Management</Header>
      <Divider />
      <PaddedContainer bottom size="15px">
        <EmployeeCreateForm
          open={!!isCreateOrEdit}
          employee={editEmployee}
          onOpen={() => history.push('/employees/new')}
          onClose={() => history.push('/employees')}
        />
      </PaddedContainer>
      {hasEmployee && <EmployeesList items={employees} />}
      {!hasEmployee && (
        <Container textAlign="center">
          No employee found
        </Container>
      )}
    </>
  );
}

export default EmployeesManagement;
