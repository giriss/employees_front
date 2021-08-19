import { Formik } from "formik";
import { useEffect, useState } from "react";
import { useRef, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Icon, Image, Modal } from "semantic-ui-react";
import { PICTURE_BASE_URL } from "../../app/constants";
import { createEmployee, updateEmployee, addEmployeePicture, deleteEmployeePicture } from "../../reducers/employeesSlice";
import { selectToken } from "../../reducers/tokenSlice";
import EmployeeForm from "./EmployeeForm";
import ImageDropzone from "./ImageDropzone";

function EmployeeCreateForm({ open, employee, onOpen, onClose }) {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const formRef = useRef();
  const formikRef = useRef();
  const isUpdate = useMemo(() => !!employee, [employee]);
  const [picture, setPicture] = useState();
  const [submitting, setSubmitting] = useState(false);
  const imageUrl = useMemo(() => {
    if (picture === false) {
      return null;
    }
    if (!!picture) {
      return URL.createObjectURL(picture);
    }
    if (employee?.pictureId) {
      return `${PICTURE_BASE_URL}/${employee.pictureId}`;
    }
    return null;
  }, [picture, employee?.pictureId]);

  const createOrUpdate = useCallback(
    async (editedEmployee, { resetForm }) => {
      setSubmitting(true);
      const result = await dispatch(
        isUpdate ?
          updateEmployee({ employee: { ...editedEmployee, id: employee.id }, token }) :
          createEmployee({ employee: editedEmployee, token })
      );
      if (/^employees\/.+\/fulfilled$/.test(result.type)) {
        const { payload: { id } } = result;
        if (!!picture) {
          await dispatch(addEmployeePicture({ id, picture, token }));
        } else if (employee?.pictureId && !imageUrl) {
          await dispatch(deleteEmployeePicture({ id, token }));
        }
        resetForm();
        onClose();
      } else {
        const { payload: { errors } } = result;
        formikRef.current.setErrors(errors);
      }
      setSubmitting(false);
    },
    [token, dispatch, onClose, isUpdate, employee, picture, imageUrl],
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
      setPicture(undefined);
    }
  }, [open]);

  return (
    <Formik
      innerRef={formikRef}
      enableReinitialize
      initialValues={{
        firstName: employee?.firstName || '',
        lastName: employee?.lastName || '',
        email: employee?.email || '',
        permanent: employee?.permanent || false,
        dob: employee?.dob || '',
        status: employee?.status || 0
      }}
      onSubmit={createOrUpdate}
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
            {!imageUrl && <ImageDropzone onAdd={image => setPicture(image)} />}
            {!!imageUrl && (
              <Image
                size="small"
                src={imageUrl}
                label={{
                  as: 'a',
                  color: 'red',
                  corner: 'right',
                  icon: 'delete',
                  onClick: () => setPicture(false)
                }}
              />
            )}
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={onClose}>Cancel</Button>
            <Button
              loading={submitting}
              primary
              disabled={!props.isValid || submitting}
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
