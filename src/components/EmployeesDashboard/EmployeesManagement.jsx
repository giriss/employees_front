import { useMemo, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Divider, Header, Input } from "semantic-ui-react";
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
  const query = useMemo(() => history.location.search.replace('?q=', '').toLowerCase(), [history.location.search]);
  const filteredEmployees = useMemo(() => {
    if (query === '') {
      return employees;
    }
    return employees.filter(({ first_name, last_name }) => (
      first_name.toLowerCase().includes(query) || last_name.toLowerCase().includes(query)
    ));
  }, [query, employees]);
  const searchByName = useCallback((_, elem) => {
    history.push({
      pathname: '/employees',
      search: elem.value === '' ? undefined : `?q=${encodeURIComponent(elem.value)}`,
    });
  }, [history]);

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
            <Input
              value={query}
              placeholder="Search by name"
              onChange={searchByName}
            />
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
