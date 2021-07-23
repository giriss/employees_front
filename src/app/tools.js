export const generateInputProps = (
  name,
  label,
  values,
  touched,
  errors,
  handleBlur,
  handleChange,
) => ({
  name,
  label,
  fluid: true,
  onBlur: handleBlur,
  onChange: handleChange,
  value: values[name],
  placeholder: label,
  error: touched[name] && errors[name],
});
