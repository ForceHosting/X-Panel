import * as Yup from 'yup';
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Link, Stack, Alert, IconButton, InputAdornment, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// routes
import { PATH_AUTH } from '../../../routes/paths';
// hooks
import useIsMountedRef from '../../../hooks/useIsMountedRef';
// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField, RHFCheckbox } from '../../../components/hook-form';
import axios from '../../../utils/axios';
import { loginRoute } from '../../../utils/APIRoutes';
// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();

  const isMountedRef = useIsMountedRef();

  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    email: 'example@forcehost.net',
    password: 'YourPassword',
    remember: true,
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(loginRoute, {
        email: data.email,
        password: data.password
      });
      console.log(res.status)
      if(res.status === 200){
        const token = res.data.user
        localStorage.setItem(
          'token',
          token
        )
      navigate("/app")
      }else{
        reset();
        if(isMountedRef.current) {
          setError('afterSubmit', { ...res, message: res.data.msg})
        }
      }
    } catch (error) {
      console.error(error);

      reset();

      if (isMountedRef.current) {
        setError('afterSubmit', { ...error, message: error.message });
      }
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}

        <RHFTextField name="email" label="Email address" />

        <RHFTextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <RHFCheckbox name="remember" label="Remember me" />
        <Link component={RouterLink} variant="subtitle2" to={PATH_AUTH.resetPassword}>
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
        Login
      </LoadingButton>
      <LoadingButton fullWidth size="large" variant="contained" sx={{color:'white', my: 2}}><a sx={{ textDecoration: 'none', color: 'white' }} href="/api/auth">Login With Discord</a></LoadingButton>
    </FormProvider>
  );
}
