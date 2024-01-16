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

UserNewEditForm.propTypes = {
  isEdit: PropTypes.bool,
  currentUser: PropTypes.object,
};

export default function UserNewEditForm({ currentUser }) {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  console.log(currentUser)
  const NewUserSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().required('Email is required').email(),
    credits: Yup.string().required('User credits is required'),
    availSlots: Yup.string().required('Slots is required'),
    availCPU: Yup.string().required('CPU is required'),
    availDisk: Yup.string().required('Disk is required'),
    availMem: Yup.string().required('Memory is required'),
    refCode: Yup.string().required('Ref Code is required'),
  });

  const defaultValues = useMemo(
    () => ({
      name: currentUser?.username || '',
      email: currentUser?.email || '',
      credits: currentUser?.credits || '0',
      availSlots: currentUser?.availSlots || '0',
      availCPU: currentUser?.availCPU || '0',
      availDisk: currentUser?.availDisk || '0',
      availMem: currentUser?.availMem || '0',
      refCode: currentUser?.refCode || '',
      isBanned: currentUser?.isBanned || 'false',
      avatarUrl: currentUser?.profilePicture || '',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentUser]
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
    if (currentUser) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  const onSubmit = async (event) => {
    try {
      const _id = currentUser._id
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
              <RHFTextField name="name" label="Full Name" disabled />
              <RHFTextField name="email" label="Email Address" disabled />
              <RHFTextField name="credits" label="Credits" />

              <RHFTextField name="availSlots" label="Available Slots" />
              <RHFTextField name="availCPU" label="Available CPU" />
              <RHFTextField name="availDisk" label="Available Disk" />
              <RHFTextField name="availMem" label="Available Memory" />
              <RHFTextField name="refCode" label="Referral Code" />
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
