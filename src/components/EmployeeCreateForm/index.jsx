import { Formik } from "formik";
import { useEffect } from "react";
import { useRef, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Icon, Modal } from "semantic-ui-react";
import { createEmployee, updateEmployee } from "../../reducers/employeesSlice";
import { selectToken } from "../../reducers/tokenSlice";
import EmployeeForm from "./EmployeeForm";
import ImageDropzone from "./ImageDropzone";

function EmployeeCreateForm({ open, employee, onOpen, onClose }) {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const formRef = useRef();
  const formikRef = useRef();
  const isUpdate = useMemo(() => !!employee, [employee]);

  const create = useCallback(
    async (editedEmployee, { resetForm }) => {
      const result = await dispatch(
        isUpdate ?
          updateEmployee({ employee: { ...editedEmployee, id: employee.id }, token }) :
          createEmployee({ employee: editedEmployee, token })
      );
      if (/^employees\/.+\/fulfilled$/.test(result.type)) {
        resetForm();
        onClose();
      } else {
        const { payload: { errors } } = result;
        formikRef.current.setErrors(errors);
      }
    },
    [token, dispatch, onClose, isUpdate, employee],
  );

  const submitForm = useCallback(() => {
    formRef.current.dispatchEvent(new Event('submit', {
      cancelable: true,
      bubbles: true,
    }));
  }, []);

  useEffect(() => {
    if (!open) {
      formikRef.current.resetForm();
    }
  }, [open]);

  return (
    <Formik
      innerRef={formikRef}
      enableReinitialize
      initialValues={{
        first_name: employee?.first_name || '',
        last_name: employee?.last_name || '',
        email: employee?.email || '',
        permanent: employee?.permanent || false,
        dob: employee?.dob || '',
        status: employee?.status || 0
      }}
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
          <Modal.Header>{isUpdate ? 'Update' : 'Create'} employee</Modal.Header>
          <Modal.Content scrolling>
            <EmployeeForm
              {...props}
              ref={formRef}
              onSubmit={props.handleSubmit}
            />
            <ImageDropzone />
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={onClose}>Cancel</Button>
            <Button
              primary
              disabled={!props.isValid}
              onClick={submitForm}
            >
              {isUpdate ? 'Update' : 'Create'}
            </Button>
          </Modal.Actions>
        </Modal>
      )}
    </Formik>
  );
}

export default EmployeeCreateForm;
