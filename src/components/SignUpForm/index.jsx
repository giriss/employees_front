import { Formik } from "formik";
import { useMemo } from "react";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { Form, Header, Message } from "semantic-ui-react";
import { generateInputProps } from "../../app/tools";
import { createUserAsync } from "../../reducers/tokenSlice";
import formValidation from "./formValidation";
import Authentication from "../Authentication";
import { useState } from "react";

function SignUpForm() {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);

  const submitForm = useCallback(
    async ({ username, password }) => {
      const { type, payload } = await dispatch(createUserAsync({ username, password }));
      if (type === 'token/createUser/rejected') {
        setErrors(payload);
      }
    },
    [dispatch],
  );

  return (
    <Authentication loggedOut>
      <Header as="h1">Sign Up</Header>
      <Formik
        initialValues={{ username: '', password: '', retypePassword: '' }}
        onSubmit={submitForm}
        validationSchema={formValidation}
      >
        {props => <SignUpInnerForm {...props} submitErrors={errors} />}
      </Formik>
    </Authentication>
  );
}

function SignUpInnerForm({
  values,
  errors,
  touched,
  handleBlur,
  handleChange,
  handleSubmit,
  isValid,
  dirty,
  submitErrors,
}) {
  const hasError = useMemo(() => submitErrors && submitErrors.length > 0, [submitErrors]);

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
    <Form onSubmit={handleSubmit} error={hasError}>
      <Form.Group widths="two">
        <Form.Input {...generateFieldProps('username', 'Username')} />
      </Form.Group>
      <Form.Group widths="two">
        <Form.Input
          type="password"
          {...generateFieldProps('password', 'Password')}
        />
        <Form.Input
          type="password"
          {...generateFieldProps('retypePassword', 'Retype password')}
        />
      </Form.Group>
      {hasError && (
        <Message
          error
          header="Something went wrong!"
          list={submitErrors}
        />
      )}
      <Form.Button
        primary
        disabled={!isValid || !dirty}
      >
        Sign Up
      </Form.Button>
    </Form>
  );
}

export default SignUpForm;
