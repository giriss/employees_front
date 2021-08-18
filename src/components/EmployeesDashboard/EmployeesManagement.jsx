import { useMemo, useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Divider, Header } from "semantic-ui-react";
import { listEmployees, selectEmployees } from "../../reducers/employeesSlice";
import { selectToken } from "../../reducers/tokenSlice";
import EmployeeCreateForm from "../EmployeeCreateForm";
import PaddedContainer from "../styled-components/PaddedContainer";
import { useHistory } from "react-router-dom";
import { EmployeesList } from "./EmployeesList";
import EmployeeSearch from "./EmployeeSearch";

function EmployeesManagement({ isCreateOrEdit, editEmployeeId }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const token = useSelector(selectToken);
  const employees = useSelector(selectEmployees);
  const hasEmployee = useMemo(() => !!employees && !!employees.length, [employees]);
  const [query, setQuery] = useState([]);
  const updateQuery = useCallback(queries => setQuery(queries.map(q => q.toLowerCase())), []);
  const filteredEmployees = useMemo(() => {
    if (query.length === 0) {
      return employees;
    }
    return employees.filter(({ first_name, last_name }) => (
      query.reduce(
        (acc, q) => acc && (first_name.toLowerCase().includes(q) || last_name.toLowerCase().includes(q)),
        true
      )
    ));
  }, [query, employees]);

  const editEmployee = useMemo(() => (
    !!editEmployeeId ? employees.find(({ id }) => id === +editEmployeeId) : undefined
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
      {hasEmployee && (
        <>
          <PaddedContainer bottom size="15px">
            <EmployeeSearch onChange={updateQuery} />
          </PaddedContainer>
          <EmployeesList items={filteredEmployees} />
        </>
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
