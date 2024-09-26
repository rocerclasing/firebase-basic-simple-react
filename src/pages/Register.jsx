//hooks
import { useState } from "react";
//firebase
import { register } from "../config/firebase";
//context
import { useUserContext } from "../context/UserContext";
//Active
import { useRedirectActiveUser } from "../hooks/useRedirectActiveUsers";
//react router dom
import { Link, useNavigate } from "react-router-dom";

//MUI
import AddPhotoIcon from "@mui/icons-material/AddAPhoto"
import { LoadingButton } from "@mui/lab";
import { Avatar, Box, TextField, Typography,Button } from "@mui/material";
import { Formik } from "formik";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import * as yup from "yup"


const Register = () => {
  const [email, setEmail] = useState("test@test.com");
  const [password, setPassword] = useState("123123");

  const { user } = useUserContext();

  // alternativa con hook
  useRedirectActiveUser(user, "/dashboard");

 //Evento submit
  const onSubmit = async (
    { email, password },
    { setSubmitting, setErrors, resetForm }
  ) => {
    try {
      await register({ email, password });
      console.log("user registered");
      resetForm();
    } catch (error) {
      console.log(error.code);
      console.log(error.message);
      if (error.code === "auth/email-already-in-use") {
        setErrors({ email: "Email already in use" });
      }
    } finally {
      setSubmitting(false);
    }
  };

  //yum validaciones
  const  validationSchema  = yup.object().shape({
    email:yup.string().email("Email no valido").required("Email requerido"),
    password:yup.string().trim().min(6,"Minimo 6 caracteres").required("password requerido")

})

  return (
    //elemento MUI BOX,Avatar,Typography
    <Box sx={{ mt: 8, maxWidth: 400, mx: "auto", textAlign: "center" }}>
      <Avatar sx={{ mx: "auto", bgcolor: "#444" }}>
        <LockOutlinedIcon />
      </Avatar>

      <Typography
        component="h1"
        variant="h5"
      >
        Sign up
      </Typography>

      

      <Formik 
        initialValues={{ email: "", password: "" }}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({
          handleSubmit,
          handleChange,
          values,
          isSubmitting,
          errors,
         touched, 
          handleBlur,
        }) => (

          <Box
            onSubmit={handleSubmit}
            component="form"
            sx={{ mt: 1 }}
          >
            <TextField
              type="text"
              label="Ingrese email"
              value={values.email}
              onChange={handleChange}
              name="email"
              fullWidth
              sx={{ mb: 3 }}
              id="email"
              placeholder="test@example.com"
              onBlur={handleBlur}
              error={errors.email && touched.email}
              helperText={errors.email && touched.email && errors.email}
            />

            <TextField                                                                                                                                                                               
              type="password"
              placeholder="Ingrese contraseña"
              value={values.password}
              onChange={handleChange}
              name="password"
              onBlur={handleBlur}
              id="password"
              label="Ingrese contraseña"
              fullWidth
              sx={{ mb: 3 }}
              error={errors.password && touched.password}
              helperText={
                errors.password && touched.password && errors.password
              }
            />

            <LoadingButton
              type="submit"
              disabled={isSubmitting}
              loading={isSubmitting}
              variant="contained"
              fullWidth
              sx={{ mb: 3 }}
            >
              Register
            </LoadingButton>

            <Button
              component={Link}
              to="/"
              fullWidth
            >
              ¿Ya tienes cuenta? Ingresa
            </Button>
          </Box>
        )}
      </Formik>
    </Box>
  );
};

export default Register;
