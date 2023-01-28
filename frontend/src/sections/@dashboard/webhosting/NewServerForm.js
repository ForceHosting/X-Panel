import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack } from '@mui/material';
import { createNewWebRoute } from '../../../utils/APIRoutes';
import axios from '../../../utils/axios';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import { FormProvider, RHFTextField } from '../../../components/hook-form';



export default function NewServerForm() {
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const NewServerSchema = Yup.object().shape({
    name: Yup.string().required('Domain name is required'),
    password: Yup.string().required('Account password is required'),
  });

  const methods = useForm({
    resolver: yupResolver(NewServerSchema)
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (event) => {
    try {
        const { name, password } = event;
        const {data} = await axios.post(createNewWebRoute,{name,password},{
            headers: {
              'Authorization': `${localStorage.getItem('token')}`
            }
          });
      reset();
      console.log(data)
      if(data.added === false){
        enqueueSnackbar(data.msg, { variant: 'error'})
      }
      if(data.added === true){
        enqueueSnackbar('Server created successfully')
        navigate(PATH_DASHBOARD.root);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={5}>

      <Grid item xs={12} md={2}/>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Box
              sx={{
                textAlign: 'center',
                display: 'grid',
                columnGap: 2,
                rowGap: 3,
              }}
            >
              <RHFTextField name="name" label="Domain Name - Currently Unavailable" disabled xs={12} />
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {'Create Web'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
