import React from "react";
import { Box, Button, TextField, Typography, Link } from "@mui/material";
import {
  DEFAULT_FONT_COLOR,
  LOGGIN_PANEL_BACKGROUND_COLOR,
} from "../../theme/paletteUtils";
import IconsFactory from "../../icons/IconsFactory";
import * as yup from "yup";
import {
  Field,
  FieldInputProps,
  FieldMetaProps,
  Form,
  Formik,
  FormikBag,
  yupToFormErrors,
} from "formik";
import PanelLayout from "../../components/panel";
import useToken from "../../hooks/useToken";
import authService from "../../services/auth/authService";
import { FS_TREE_ROUTE_URL } from "../../routes/routes";
import { usernamePasswordValidationSchema } from "../../utils/validation";

interface LoginPageProps {}

function LoginPage(props: LoginPageProps) {
  const {} = props;
  const { setToken } = useToken();

  function handleSubmit(
    values: any,
    setSubmitting: (isSubmitting: boolean) => void
  ) {
    // console.log("Got to the submit", values);
    authService
      .fetchToken(values.username, values.password)
      .then((token) => {
        window.open(FS_TREE_ROUTE_URL, "_self");
        // console.log("And we will");
        // console.log("Got the token", token);
        return token;
      })
      .then(setToken)
      .then(() => {})
      .catch((err) => {
        // console.log("Error", err);
      });
  }

  return (
    <PanelLayout
      viewName={"login-page"}
      description={"Please login"}
      link={"/register"}
      linkTitle={"Register here"}
      linkDescription={"Don't have an account?"}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <Formik
          initialValues={{ username: "", password: "" }}
          validationSchema={usernamePasswordValidationSchema}
          onSubmit={(values, { setSubmitting }) => {
            console.log("Are we here?");
            handleSubmit(values, setSubmitting);
          }}
        >
          {({
            resetForm,
            values,
            errors,
            touched,
            isSubmitting,
            handleSubmit,
            handleChange,
            setFieldValue,
            dirty,
            isValidating,
            initialValues,
            isValid,
          }) => {
            return (
              <Form onSubmit={handleSubmit} data-testid={"login-form"}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    px: "20px",
                    gap: "10px",
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
                    error={errors.username && touched.username}
                  />
                  {touched.username && errors.username && (
                    <Typography sx={{ color: "red" }}>
                      {errors.username}
                    </Typography>
                  )}
                  <Field
                    as={TextField}
                    inputProps={{
                      sx: { width: "300px", height: "16px" },
                    }}
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    placeholder={"Password"}
                    initialValues={undefined}
                    error={touched.password && errors.password}
                  />
                  {touched.password && errors.password && (
                    <Typography sx={{ color: "red" }}>
                      {errors.password}
                    </Typography>
                  )}
                  <Button type="submit" disabled={isSubmitting || !!errors.password || !!errors.username || !dirty}>
                    {"Login"}
                  </Button>
                </Box>
              </Form>
            );
          }}
        </Formik>
      </Box>
    </PanelLayout>
  );
}

export default LoginPage;
