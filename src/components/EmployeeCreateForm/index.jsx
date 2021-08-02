import { Formik } from "formik";
import { useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Icon, Modal } from "semantic-ui-react";
import { createEmployee } from "../../reducers/employeesSlice";
import { selectToken } from "../../reducers/tokenSlice";
import EmployeeForm from "./EmployeeForm";

function EmployeeCreateForm({ open, onOpen, onClose }) {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const formRef = useRef();

  const create = useCallback(
    async (employee, { resetForm }) => {
      const { type } = await dispatch(createEmployee({ employee, token }));
      resetForm();
      onClose && type === 'employees/create/fulfilled' && onClose();
    },
    [token, dispatch, onClose],
  );

  const submitForm = useCallback(() => {
    formRef.current.dispatchEvent(new Event('submit', {
      cancelable: true,
      bubbles: true,
    }));
  }, [formRef]);

  return (
    <Formik
      initialValues={{ first_name: '', last_name: '', email: '', permanent: false, dob: '', status: 0 }}
      onSubmit={create}
    >
      {props => (
        <Modal
          closeIcon
          open={open}
          onOpen={onOpen}
          onClose={onClose}
          trigger={
            <Button icon primary labelPosition="right">
              Create
              <Icon name="add" />
            </Button>
          }
        >
          <Modal.Header>Create employee</Modal.Header>
          <Modal.Content>
            <EmployeeForm
              {...props}
              ref={formRef}
              onSubmit={props.handleSubmit}
            />
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={onClose}>Cancel</Button>
            <Button
              primary
              disabled={!props.isValid}
              onClick={submitForm}
            >
              Create
            </Button>
          </Modal.Actions>
        </Modal>
      )}
    </Formik>
  );
}

export default EmployeeCreateForm;
