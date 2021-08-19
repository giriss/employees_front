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

function camelToSnakeCase(str) {
  return str.split('').map(char => {
    const charCode = char.charCodeAt(0);
    if (charCode >= 65 && charCode <= 90) {
      return `_${String.fromCharCode(charCode + 32)}`;
    }
    return char;
  }).join('');
}

function snakeToCamelCase(str) {
  const parts = str.split('_');
  let camelized = parts[0];
  for (let i = 1; i < parts.length; i++) {
    const part = parts[i];
    camelized += String.fromCharCode(part.charCodeAt(0) - 32) + part.substr(1);
  }
  return camelized;
}

export function snakeToCamelCaseObj(obj) {
  return Object.fromEntries(
    Object.entries(obj).map(entry => [snakeToCamelCase(entry[0]), entry[1]])
  );
}

export function camelToSnakeCaseObj(obj) {
  return Object.fromEntries(
    Object.entries(obj).map(entry => [camelToSnakeCase(entry[0]), entry[1]])
  );
}
