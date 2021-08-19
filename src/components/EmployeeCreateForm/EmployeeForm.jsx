import { forwardRef } from "react";
import { Form, Ref } from "semantic-ui-react";
import { generateInputProps } from "../../app/tools";

const EmployeeForm = forwardRef(function({
  onSubmit,
  values,
  errors,
  touched,
  handleBlur,
  handleChange,
  setFieldValue,
  setFieldTouched,
}, ref) {
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
    <Ref innerRef={ref}>
      <Form onSubmit={onSubmit}>
        <Form.Group widths="equal">
          <Form.Input {...generateFieldProps('firstName', 'First name')} />
          <Form.Input {...generateFieldProps('lastName', 'Last name')} />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Input {...generateFieldProps('email', 'Email')} />
          <Form.Input {...generateFieldProps('dob', 'Date of birth')} type="date" />
        </Form.Group>
        <Form.Group inline>
          <label>Permanent?</label>
          <Form.Radio
            label="Yes"
            onChange={() => {
              setFieldValue('permanent', true);
              setFieldTouched('permanent');
            }}
            checked={values.permanent === true}
          />
          <Form.Radio
            label="No"
            onChange={() => {
              setFieldValue('permanent', false);
              setFieldTouched('permanent');
            }}
            checked={values.permanent === false}
          />
        </Form.Group>
      </Form>
    </Ref>
  );
});

export default EmployeeForm;
