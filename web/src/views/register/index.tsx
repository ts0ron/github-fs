import React from "react";
import { Field, Form, Formik, FormikHelpers, FormikValues } from "formik";
import { Box, Button, TextField, Typography } from "@mui/material";
import PanelLayout from "../../components/panel";
import authService from "../../services/auth/authService";
import useToken from "../../hooks/useToken";
import {
  ConflictHttpError,
  UnprocessableContentHttpError,
} from "../../services/apiservice";
import { usernamePasswordValidationSchema } from "../../utils/validation";
import { RED_PASTEL_COLOR } from "../../theme/paletteUtils";
import { FS_TREE_ROUTE_URL } from "../../routes/routes";

export interface RegisterFormValues {
  username: string;
  password: string;
  last_name?: string;
  first_name?: string;
}

function RegistrationPage() {
  const { setToken } = useToken({});
  const [registerError, setRegisterError] = React.useState<string | undefined>(
    undefined
  );

  function onSubmit(
    values: FormikValues,
    formikHelpers: FormikHelpers<RegisterFormValues>
  ): void | Promise<any> {
    return authService
      .register({
        email: values.username,
        password: values.password,
        last_name: values.last_name,
        first_name: values.first_name,
      })
      .then((response) => {
        if (
          response instanceof ConflictHttpError ||
          response instanceof UnprocessableContentHttpError
        ) {
          if (response.getMessage()) {
              setRegisterError(Array.of(response.getMessage()).join(", "));
          }
        }
        return authService
          .fetchToken(values.username, values.password, true)
          .then(setToken)
          .then(() => {window.location.href = FS_TREE_ROUTE_URL})
          .catch((error) => {
            console.error(error);
          });
      });
  }

  return (
    <PanelLayout
      viewName={"registration-page"}
      description={"Please insert details to register"}
      link="/login"
      linkTitle={"Login"}
      linkDescription={"Already have an account?"}
    >
      <Formik
        initialValues={
          {
            username: "",
            password: "",
          } as RegisterFormValues
        }
        validationSchema={usernamePasswordValidationSchema}
        onSubmit={onSubmit}
      >
        {({
          values,
          handleChange,
          handleSubmit,
          errors,
          touched,
          isSubmitting,
          dirty,
        }) => {
          return (
            <Form onSubmit={handleSubmit}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  alignItems: "center",
                }}
              >
                <Field
                  as={TextField}
                  inputProps={{
                    sx: { width: "300px", height: "16px" },
                  }}
                  name="username"
                  value={values.username}
                  onChange={handleChange}
                  placeholder={"Username"}
                  initialValues={undefined}
                />
                {touched.username && errors.username && (
                  <Typography sx={{ color: RED_PASTEL_COLOR }}>
                    {errors.username}
                  </Typography>
                )}
                <Field
                  as={TextField}
                  inputProps={{
                    sx: { width: "300px", height: "16px" },
                  }}
                  name="password"
                  type={"password"}
                  value={values.password}
                  onChange={handleChange}
                  placeholder={"Password"}
                  initialValues={undefined}
                />
                {touched.password && errors.password && (
                  <Typography sx={{ color: RED_PASTEL_COLOR }}>
                    {errors.password}
                  </Typography>
                )}
                <Field
                  as={TextField}
                  inputProps={{
                    sx: { width: "300px", height: "16px" },
                  }}
                  name="first_name"
                  value={values.first_name}
                  onChange={handleChange}
                  placeholder={"First name"}
                  initialValues={undefined}
                />
                <Field
                  as={TextField}
                  inputProps={{
                    sx: { width: "300px", height: "16px" },
                  }}
                  name="last_name"
                  value={values.last_name}
                  onChange={handleChange}
                  placeholder={"Last name"}
                  initialValues={undefined}
                />
                {registerError && <Typography sx={{color: RED_PASTEL_COLOR}}>{}</Typography>}
                <Button
                  type="submit"
                  disabled={
                    isSubmitting ||
                    !!errors.password ||
                    !!errors.username ||
                    !dirty
                  }
                >
                  {"Submit Registration"}
                </Button>
              </Box>
            </Form>
          );
        }}
      </Formik>
    </PanelLayout>
  );
}

export default RegistrationPage;
