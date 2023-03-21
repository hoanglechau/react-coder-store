import { Button, Stack, Typography } from '@mui/material';
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import useAuth from '../hooks/useAuth';
import FormProvider from '../components/form/FormProvider';
import FTextField from '../components/form/FTextField';

const LoginSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
});
const defaultValues = {
  username: '',
};

function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });
  const { handleSubmit } = methods;

  const onSubmit = async (data) => {
    const from = location.state?.from?.pathname || '/';
    const { username } = data;

    auth.login(username, () => {
      navigate(from, { replace: true });
    });
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3} sx={{ minWidth: '350px' }}>
        <Typography variant="h4" textAlign="center">
          Login
        </Typography>
        <FTextField name="username" label="Username" />

        <Button type="submit" variant="contained">
          Login
        </Button>
      </Stack>
    </FormProvider>
  );
}

export default LoginPage;
