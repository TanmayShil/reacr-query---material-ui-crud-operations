import { memo } from 'react'
import {
  Box,
  Button,
  Typography,
  Paper,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Input from '../components/Input';
import { useNavigate } from 'react-router-dom';
import { useLogin } from '../hooks/react-query/useAuth';
import { ToastContainer, toast } from 'react-toastify';
import Cookies from 'js-cookie';

const schema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().required().min(6),
});

const Login = () => {
  const navigate = useNavigate();
  const loginMutation = useLogin();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    console.log("Form Data:", data);
    try {
      const response = await loginMutation.mutateAsync(data);
       if (response?.status === 200) {
             toast.success(response?.message);
             Cookies.set('token', response.token, {
               expires: 3,
               // secure: true, // set to true if using https
               sameSite: 'Strict'
             });
             reset();
             navigate('/admin/products');
           }
           toast.error(response?.message)
    } catch (error) {
      toast.error(error?.response?.data?.message)
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f0f2f5"
    >
      <ToastContainer />
      <Paper elevation={3} sx={{ padding: 4, width: 400, bgcolor: "white", borderRadius: 2 }}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Input name="email" label="Email" control={control} errors={errors} />
          <Input name="password" label="Password" control={control} errors={errors} type="password" />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3 }}
          >
            Login
          </Button>
        </form>
        <Box
          mt={3}
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{ cursor: "pointer" }}
          onClick={() => navigate("/signup")}
        >
          <Typography variant="body2" color="primary">
            Don't have an account? <span style={{}}>Signup</span>
          </Typography>
        </Box>
      </Paper>
    </Box>
  )
}

export default memo(Login);
