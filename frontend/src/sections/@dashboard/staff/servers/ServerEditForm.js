import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useCallback, useEffect, useMemo } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack, Switch, Typography, FormControlLabel } from '@mui/material';
// utils
import { fData } from '../../../../utils/formatNumber';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// _mock
import { updateUserDetails } from '../../../../utils/APIRoutes';
import axios from '../../../../utils/axios';

// components
import Label from '../../../../components/Label';
import { FormProvider, RHFSelect, RHFSwitch, RHFTextField, RHFUploadAvatar } from '../../../../components/hook-form';

// ----------------------------------------------------------------------

ServerEditForm.propTypes = {
  isEdit: PropTypes.bool,
  currentServer: PropTypes.object,
};

export default function ServerEditForm({ currentServer }) {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  console.log(currentServer);
  const NewUserSchema = Yup.object().shape({
    serverName: Yup.string().required('Name is required'),
    serverId: Yup.string().required('Email is required').email(),
    serverNode: Yup.string().required('User credits is required'),
    serverMemory: Yup.string().required('Slots is required'),
    serverCPU: Yup.string().required('CPU is required'),
    serverDisk: Yup.string().required('Disk is required'),
    serverStatus: Yup.string().required('Memory is required'),
    serverOwner: Yup.string().required('Ref Code is required'),
  });

  const defaultValues = useMemo(
    () => ({
      serverName: currentServer?.serverName || '',
      serverId: currentServer?.serverId || '',
      serverNode: currentServer?.serverNode || '0',
      serverMemory: currentServer?.serverMemory || '0',
      serverCPU: currentServer?.serverCPU || '0',
      serverDisk: currentServer?.serverDisk || '0',
      serverStatus: currentServer?.serverStatus || '0',
      serverOwner: currentServer?.serverOwner || '',
      avatarUrl: 'https://media.discordapp.net/attachments/739975144625143894/1101212390214860890/Force_Host_-_Mascot.png?width=675&height=675'
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentServer]
  );

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  useEffect(() => {
    if (currentServer) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentServer]);

  const onSubmit = async (event) => {
    try {
      const _id = currentServer._id
      const { availCPU, availDisk, availMem, availSlots, credits, isBanned, refCode } = event;
        const data = await axios.post(updateUserDetails,{ _id, availCPU, availDisk, availMem, availSlots, credits, isBanned, refCode},{
            headers: {
              'Authorization': `${localStorage.getItem('token')}`
            }
          });
      
      reset(defaultValues);
      enqueueSnackbar('Update success!');
      //  navigate(PATH_DASHBOARD.staff.users);
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ py: 6, px: 3 }}>


            <Box sx={{ mb: 5 }}>
              <RHFUploadAvatar
                name="avatarUrl"
                helperText={
                  <Typography
                    variant="caption"
                    sx={{
                      mt: 2,
                      mx: 'auto',
                      display: 'block',
                      textAlign: 'center',
                      color: 'text.secondary',
                    }}
                  >
                    Allowed *.jpeg, *.jpg, *.png, *.gif
                    <br /> max size of {fData(3145728)}
                  </Typography>
                }
              />
            </Box>

              <FormControlLabel
                labelPlacement="start"
                control={
                  <Controller
                    name="isBanned"
                    control={control}
                    render={({ field }) => (
                      <Switch
                        {...field}
                        checked={field.value !== 'false'}
                        onChange={(event) => field.onChange(event.target.checked ? 'true' : 'false')}
                      />
                    )}
                  />
                }
                label={
                  <>
                    <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                      Banned
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Apply disable account
                    </Typography>
                  </>
                }
                sx={{ mx: 0, mb: 3, width: 1, justifyContent: 'space-between' }}
              />
          </Card>
        </Grid>

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
              <RHFTextField name="serverName" label="Full Name" disabled />
              <RHFTextField name="serverId" label="Email Address" disabled />
              <RHFTextField name="serverNode" label="Credits" disabled/>

              <RHFTextField name="serverMemory" label="Available Slots" disabled/>
              <RHFTextField name="serverCPU" label="Available CPU" disabled/>
              <RHFTextField name="serverDisk" label="Available Disk" disabled />
              <RHFTextField name="serverStatus" label="Available Memory" disabled />
              <RHFTextField name="serverOwner" label="Referral Code" disabled />
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {'Save Changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
