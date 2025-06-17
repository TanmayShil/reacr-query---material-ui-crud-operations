import { memo } from 'react';
import {
  Box,
  Button,
  Typography,
  Paper,
  Stack,
  InputLabel,
} from "@mui/material";
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Input from '../components/Input';
import { useSignup } from '../hooks/react-query/useAuth';
import { ToastContainer, toast } from 'react-toastify';
import Cookies from 'js-cookie';

const schema = Yup.object().shape({
  first_name: Yup.string().required().min(2),
  last_name: Yup.string().required().min(2),
  email: Yup.string().email().required(),
  password: Yup.string().required().min(6),
  profile_pic: Yup.mixed().required("Profile image is required"),
});


const Signup = () => {
  const navigate = useNavigate();
  const signupMutation = useSignup();
  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      profile_pic: null,
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await signupMutation.mutateAsync(data);
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
      <Paper elevation={3} sx={{ p: 4, width: 450, bgcolor: "#fff", borderRadius: 2 }}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Stack spacing={2}>
            <Input name="first_name" label="First Name" control={control} errors={errors} />
            <Input name="last_name" label="Last Name" control={control} errors={errors} />
            <Input name="email" label="Email" control={control} errors={errors} />
            <Input name="password" label="Password" type="password" control={control} errors={errors} />
            <Box>
              <InputLabel sx={{ mb: 1 }}>Profile Image</InputLabel>
              <input
                type="file"
                accept="image/jpeg, image/png, image/jpg"
                onChange={(e) => {
                  const file = e.target.files[0];
                  setValue("profile_pic", file, { shouldValidate: true });
                }}
              />
              {errors.profile_pic && (
                <Typography color="error" variant="body2">
                  {errors.profile_pic.message}
                </Typography>
              )}
            </Box>

            <Button type="submit" variant="contained" fullWidth sx={{ mt: 1 }}>
              Sign Up
            </Button>
          </Stack>
        </form>
        <Box
          mt={3}
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          <ArrowBackIcon color="primary" fontSize="small" sx={{ mr: 1 }} />
          <Typography variant="body2" color="primary">
            Back to Login
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}

export default memo(Signup);
