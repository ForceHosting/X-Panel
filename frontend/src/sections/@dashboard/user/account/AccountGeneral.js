import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
// form
import jwtDecode from 'jwt-decode';
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
import { updateUserProfile, getUserDataRoute } from '../../../../utils/APIRoutes';
import axios from '../../../../utils/axios';

// components
import Label from '../../../../components/Label';
import { FormProvider, RHFSelect, RHFSwitch, RHFTextField, RHFUploadAvatar } from '../../../../components/hook-form';
import Image from '../../../../components/Image';

// ----------------------------------------------------------------------


export default function AccountGeneral() {
  const navigate = useNavigate();

  const [user, setUserInfo] = useState([]);
  const [quickBanner, setQuickBanner] = useState();
  const [refCode, setRefCode] = useState(null);
  const [refUses, setRefUses] = useState(null); 
  useEffect(() => {
    const token = localStorage.getItem('token')
      const decoded = jwtDecode(token);
      setUserInfo(decoded)
  }, [])

  const { enqueueSnackbar } = useSnackbar();
  console.log(user)
  useEffect(() => {
    (async function getUData() {
    const userData = await axios.get(`${getUserDataRoute}`,{
      headers: {
        'Authorization': `${localStorage.getItem('token')}`
      }
    });
    setRefCode(userData.data.refCode);
    setRefUses(userData.data.refUses);
    console.log(`Hey, ${user.username}! Want a job?`)
})();
}, [user]);
  const NewUserSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().required('Email is required').email(),
    credits: Yup.string().required('User credits is required'),
    aboutMe: Yup.string().required('An about me is required'),
    userUid: Yup.string().required('User uid is required'),
    profileCover: Yup.string().required('Profile cover is required')
  });

  const defaultValues = useMemo(
    () => ({
      name: user?.username || '',
      email: user?.email || '',
      credits: user?.credits || '0',
      avatarUrl: user?.profilePicture || '',
      aboutMe: user?.aboutMe || '',
      userUid: user?._id || '',
      company: user?.company || '',
      compRole: user?.compRole || '',
      profileCover: user?.profileCover || 'https://cdn.vectorstock.com/i/preview-1x/82/99/no-image-available-like-missing-picture-vector-43938299.jpg'
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user]
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
    if (user) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    setQuickBanner(values.profileCover)
  })

  const onSubmit = async (event) => {
    try {
      const _id = user._id
      const { aboutMe, compRole, company, profileCover } = event;
        const data = await axios.post(updateUserProfile,{ aboutMe, compRole, company, profileCover },{
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
          <Card sx={{ py: 3, px: 3 }}>


            <Box>
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
                    Avatar image automatically
                    <br /> pulled from Discord
                  </Typography>
                }
              />
            </Box>
          </Card>
          <Card sx={{ py: 3, px: 3, mt:3 }}>


            <Box>
            <Image alt="profile cover" src={quickBanner} sx={{ position: 'relative', top: 0, left: 0, right: 0, bottom: 0 }} />
            
            </Box>
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
              <RHFTextField name="credits" label="Credits" disabled />

              <RHFTextField name="userUid" label="User UID" disabled />
              <RHFTextField name="company" label="Company" />
              <RHFTextField name="compRole" label="Role at Company"  />
              
            </Box>
            <Box
            sx={{
              display: 'grid',
              columnGap: 1,
              gap:3,
              gridTemplateColumns: {xs: 'repeat(1,1fr)', sm: 'repeat(1, 1fr)'},
            }}>
              <RHFTextField name="referUrl" value={`https://my.forcehost.net/api/ref/?ref=${refCode}`} label="Referral URL" sx={{mt:3}} />
            </Box>
            <Box
            sx={{
              display: 'grid',
              columnGap: 1,
              gap:3,
              gridTemplateColumns: {xs: 'repeat(1,1fr)', sm: 'repeat(1, 1fr)'},
            }}>
              <RHFTextField name="profileCover" label="Profile Cover" sx={{mt:3}} />
            </Box>
            <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
              <RHFTextField name="aboutMe" multiline rows={4} label="About Me" inputProps={{maxLength: 150}} />
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                Save Changes
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
