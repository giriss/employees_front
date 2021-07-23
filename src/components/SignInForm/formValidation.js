import * as yup from "yup";

const formValidation = yup.object().shape({
  username: yup
    .string()
    .trim()
    .min(3)
    .required(),
  password: yup
    .string()
    .min(8)
    .required(),
});

export default formValidation;
