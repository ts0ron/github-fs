import * as yup from "yup";


export const usernamePasswordValidationSchema = yup.object().shape({
    username: yup
      .string()
      .min(5)
      .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,"Email is not valid")
      .required("Email is required"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .required()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must contain minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"
      ),
  });