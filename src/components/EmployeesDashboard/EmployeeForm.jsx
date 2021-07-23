import { Formik } from "formik";
import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "semantic-ui-react";
import { generateInputProps } from "../../app/tools";
import { createEmployee } from "../../reducers/employeesSlice";
import { selectToken } from "../../reducers/tokenSlice";

function EmployeeForm() {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);

  const submitForm = useCallback(
    (employee, { resetForm }) => {
      dispatch(createEmployee({ employee, token }));
      resetForm();
    },
    [dispatch, token],
  );

  return (
    <Formik
      initialValues={{ first_name: '', last_name: '', email: '', permanent: false, dob: '', status: 0 }}
      onSubmit={submitForm}
    >
      {EmployeeInnerForm}
    </Formik>
  );
}

function EmployeeInnerForm({
  values,
  errors,
  touched,
  handleBlur,
  handleChange,
  handleSubmit,
  setFieldValue,
  setFieldTouched,
}) {
  const isInvalid = useMemo(() => {
    return Object.values(values).includes('');
  }, [values]);

  const generateFieldProps = (name, label) => {
    return generateInputProps(
      name,
      label,
      values,
      touched,
      errors,
      handleBlur,
      handleChange,
    );
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group widths="two">
        <Form.Input {...generateFieldProps('first_name', 'First name')} />
        <Form.Input {...generateFieldProps('last_name', 'Last name')} />
      </Form.Group>
      <Form.Group widths="three">
        <Form.Input {...generateFieldProps('email', 'Email')} />
        <Form.Input {...generateFieldProps('dob', 'Date of birth')} placeholder="yyyy-mm-dd" />
        <Form.Dropdown
          selection
          fluid
          options={[{text: 'Yes', value: true}, {text: 'No', value: false}]}
          {...generateFieldProps('permanent', 'Permanent?')}
          onChange={(_, { value }) => setFieldValue('permanent', value)}
          onBlur={() => setFieldTouched('permanent', true)}
        />
      </Form.Group>
      <Form.Button color="violet" disabled={isInvalid}>
        Create
      </Form.Button>
    </Form>
  );
}

export default EmployeeForm;
