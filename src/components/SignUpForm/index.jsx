import { Formik } from "formik";
import { useEffect } from "react";
import { useMemo } from "react";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Header, Message } from "semantic-ui-react";
import { generateInputProps } from "../../app/tools";
import { clearErros, createUserAsync, selectErrors } from "../../reducers/tokenSlice";
import formValidation from "./formValidation";
import Authentication from "../Authentication";

function SignUpForm() {
  const dispatch = useDispatch();

  const submitForm = useCallback(
    ({ username, password }) => {
      dispatch(clearErros());
      dispatch(createUserAsync({ username, password }));
    },
    [dispatch],
  );

  useEffect(() => {
    dispatch(clearErros());
  }, [dispatch]);

  return (
    <Authentication loggedOut>
      <Header as="h1">Sign Up</Header>
      <Formik
        initialValues={{ username: '', password: '', retypePassword: '' }}
        onSubmit={submitForm}
        validationSchema={formValidation}
      >
        {SignUpInnerForm}
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
}) {
  const errs = useSelector(selectErrors);
  const hasError = useMemo(() => errs && errs.length > 0, [errs]);

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
          list={errs}
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
