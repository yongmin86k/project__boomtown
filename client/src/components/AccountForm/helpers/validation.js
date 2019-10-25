export default function validate(values, formToggle) {
  const errors = {};
  if (!values.email) {
    errors.email = "Required";
  }
  if (!values.password) {
    errors.password = "Required";
  }
  if (!formToggle && !values.fullname) {
    errors.fullname = "Required";
  }
  return errors;
}
