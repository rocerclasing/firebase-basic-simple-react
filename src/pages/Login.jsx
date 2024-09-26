//hook
import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
//firebase
import { login } from "../config/firebase";
//context
import { useUserContext } from "../context/UserContext";
//formik
import {Formik} from "formik"
//yup
import * as yup from "yup"
//MUI
import AddPhotoIcon from "@mui/icons-material/AddAPhoto"
import { LoadingButton } from "@mui/lab";
import { Avatar, Box, TextField, Typography,Button } from "@mui/material";



const Login = () => {
  const [email, setEmail] = useState("test@test.com");
  const [password, setPassword] = useState("123123");

  const { user } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/dashboard");
  }, [user]);


  const onSubmit = async({email,password},{setSubmitting,setErrors,resetForm}) => {
    console.log({email,password})
    try {
      await login({ email, password });
      console.log("user logged in");
      //resetea
      resetForm();
    } catch (error) {
      console.log(error.code);
      console.log(error.message);
      //validacion email
      if(error.code === "auth/user-not-found"){

       return setErrors({email:"Usuario no registrado"})
        
      }
      //validacion password
      if(error.code ==="auth/wrong-password" )
      {
        return setErrors({password:"Password incorrecta "})
      }

      setSubmitting(false)

    }

  }

  //yum validaciones
  const  validationSchema  = yup.object().shape({
      email:yup.string().email("Email no valido").required("Email requerido"),
      password:yup.string().trim().min(6,"Minimo 6 caracteres").required("password requerido")

  })

  //yup errors errores, touched mensaje tiempo real
  return (
    <Box sx={{mt:8,maxwidth:"400px",mx:"auto",textAlign:"center"}}>

        <Avatar sx={{mx:"auto",bgcolor:"#111"}}>
           <AddPhotoIcon/>
         </Avatar>

         <Typography variant="h5" component="h1">
            Login
         </Typography>

      <Formik
          initialValues={{email:"test@test.com",password:"123123"}}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
      >
        {
          ({values,
            handleSubmit,
            handleChange,
            errors,
            touched,
            handleBlur,
            isSubmitting}) =>(
              
            <Box onSubmit={handleSubmit} sx={{mt:1} }
                 component="form">

             <TextField 

                  type="text"
                  placeholder="email@example.com"
                  value={values.email}
                  onChange={(handleChange)}
                  name="email"
                  onBlur={handleBlur}
                  id="email"
                  label="Ingrese email"
                  fullWidth
                  sx={{mb:3}}
                  error={errors.email&&touched.email}
                  helperText={errors.email&&touched.email}

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
            sx={{mb:3}}
            
            >Acceder</LoadingButton>

            <Button  
              fullWidth
              component={Link}
              to="/register"
              >
              ¿No tienes cuentas? registrate
            </Button>

           </Box>

          
          )
          
        }

      </Formik>
    </Box>
  );
};

export default Login;
