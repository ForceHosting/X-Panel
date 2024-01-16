// @mui
import { Stack, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { FormProvider } from '../../../components/hook-form';
// ----------------------------------------------------------------------

export default function LoginForm() {


  return (
    <FormProvider >
      <Stack spacing={3}>
        <Alert severity="error">All legacy accounts are now being forced to use Discord for authentication as of August 4 2023.</Alert>
      </Stack>
      <LoadingButton fullWidth size="large" sx={{mt:3}} type="submit" variant="contained" href="/api/auth">
        Login with Discord
      </LoadingButton>
    </FormProvider>
  );
}
