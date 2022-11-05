import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack } from '@mui/material';
import { addToQueueRoute } from '../../../utils/APIRoutes';
import axios from '../../../utils/axios';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import { FormProvider, RHFSelect, RHFTextField } from '../../../components/hook-form';



export default function NewServerForm() {
  const navigate = useNavigate();

  const locations = [
    { 
        name: 'Stormbreaker EU',
        uid: '1',
    },
    {
        name: 'Curiosity EU',
        uid: '2',
    },
    {
        name: 'Omega EU',
        uid: '3',
    },
    {
        name: 'Optimus US',
        uid: '4',
    },
    {
        name: 'Odin US',
        uid: '5',
    },
  ];

  const software = [
    { 
        name: 'PaperMC',
        uid: '15',
    },
    {
        name: 'Bungeecord',
        uid: '16',
    },
    {
        name: 'Vanilla',
        uid: '17',
    },
    {
        name: 'Forge',
        uid: '18',
    },
    {
        name: 'Lavalink',
        uid: '19',
    },
    {
        name: 'Python',
        uid: '21',
    },
    {
        name: 'NodeJS',
        uid: '20',
    },
    {
        name: 'MongoDB',
        uid: '22',
    },

  ]; 


  const { enqueueSnackbar } = useSnackbar();

  const NewServerSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    location: Yup.string().required('Phone number is required'),
    software: Yup.string().required('Address is required'),
    memory: Yup.string().required('country is required'),
    cpu: Yup.string().required('Company is required'),
    disk: Yup.string().required('State is required'),
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
        const { name, location, software, memory, disk, cpu } = event;
        const {data} = await axios.post(addToQueueRoute,{name,location,software,memory,disk,cpu},{
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
      <Grid container spacing={3}>


        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Box
              sx={{
                display: 'grid',
                columnGap: 2,
                rowGap: 3,
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
              }}
            >
              <RHFTextField name="name" label="Server Name" />

              <RHFSelect name="location" label="Location" placeholder="Location">
                <option value="" />
                {locations.map((option) => (
                  <option key={option.uid} value={option.uid}>
                    {option.name}
                  </option>
                ))}
              </RHFSelect>

              <RHFSelect name="software" label="Server Software" placeholder="Server Software">
                <option value="" />
                {software.map((option) => (
                  <option key={option.uid} value={option.uid}>
                    {option.name}
                  </option>
                ))}
              </RHFSelect>
              <RHFTextField name="memory" label="Memory" />
              <RHFTextField name="cpu" label="CPU" />
              <RHFTextField name="disk" label="Disk" />
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {'Create Server'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
