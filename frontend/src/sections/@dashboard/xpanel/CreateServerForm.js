import { useState, useCallback } from "react";
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Typography,
  Button,
  TextField,
  Stepper,
  Step,
  StepLabel,
  Box,
  Checkbox,
  Stack,
  Paper
} from "@mui/material";
import {
  IconFlagUS,
  IconFlagDE,
  IconFlagEU
} from 'material-ui-flags'
import { useSnackbar } from 'notistack';
import { PATH_DASHBOARD } from '../../../routes/paths';
import axios from '../../../utils/axios';
import { deployXPanel } from '../../../utils/APIRoutes';
import Iconify from '../../../components/Iconify';
import Label from "../../../components/Label";
import Markdown from "../../../components/Markdown";


const steps = ["Information", "Location", "Conformation"];

const CreateXPanelForm = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const locations = [
    {
        name: 'Curiosity',
        uid: '2',
        country: 'Germany',
        flag: 'DE'
    },
    {
        name: 'Optimus',
        uid: '4',
        country: 'United States',
        flag: 'US'
    },
  ];

  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [currentLocation, setLocation] = useState(null);
  const [currentSoftware, setSoftware] = useState(null);
  const [isSubmit, setSubmit] = useState(false)

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleLocationChange = useCallback(
    (newValue) => {
      console.log(newValue);
        setLocation(newValue);
        setFormData({
          ...formData,
          location: newValue
        })
    },
  );

  const handleSoftwareChange = useCallback(
    (newValue) => {
      console.log(newValue);
        setSoftware(newValue);
        setFormData({
          ...formData,
          software: newValue
        })
    },
  );

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
    console.log(formData)
  };

  const handleSubmit = async () => {
    try {
      setSubmit(true)
      const { name, token, ptero, license, cid, csec, domain, mongoUsr, mongoPwd, mongoIp} = formData;

      const {data} = await axios.post(deployXPanel,{name, token, ptero, license, cid, csec, domain, currentLocation, mongoUsr, mongoPwd, mongoIp},{
          headers: {
            'Authorization': `${localStorage.getItem('token')}`
          }
        });
    if(data.status === 400){
      enqueueSnackbar(data.msg, {variant: 'error'});
      setSubmit(false);
    }
    if(data.status !== 200){
      enqueueSnackbar(data.msg, { variant: 'error'})
      setSubmit(false);
    }
    if(data.status === 200){
      enqueueSnackbar('Server created successfully')
      navigate(PATH_DASHBOARD.root);
    }
    } catch (error) {
      console.error(error);
    }
  };

  const renderPlans = locations.map((location) => (
    <Grid xs={12} md={5} key={location.uid} sx={{mt:3, ml:3}}>
      <Stack
        component={Paper}
        variant="outlined"
        onClick={() => handleLocationChange(location.uid)}
        name="location"
        value={location.uid}
        sx={{
          p: 2.5,
          position: 'relative',
          cursor: 'pointer',
          ...(location.uid && {
            opacity: 0.48,
            cursor: 'default',
          }),
          
          ...(location.uid === currentLocation && {
            boxShadow: (theme) => `0 0 0 2px ${theme.palette.text.primary}`,
          }),
        }}
      >
        {location.uid === currentLocation && (
          <Label
            color="info"
            startIcon={<Iconify icon="eva:star-fill" />}
            sx={{ position: 'absolute', top: 8, right: 8 }}
          >
            Current
          </Label>
        )}

        <Box sx={{ width: 48, height: 48 }}>
          {location.flag === 'US' && <IconFlagUS />}
          {location.flag === 'DE' && <IconFlagDE />}
          {location.flag === 'FL' && <IconFlagEU />}
        </Box>

        <Box
          sx={{
            typography: 'subtitle2',
            mt: 2,
            mb: 0.5,
            textTransform: 'capitalize',
          }}
        >
          {location.country}
        </Box>

        <Stack direction="row" alignItems="center" sx={{ typography: 'h4' }}>
          {location.name || 'Free'}

        
        </Stack>
      </Stack>
    </Grid>
  ));

  return (
    
    <Container>
      <Stepper activeStep={activeStep}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Grid container spacing={2} alignItems='center'>
          {activeStep === 0 && (
            <>
            <Grid item xs={12} md={12} alignItems="center" sx={{
                display: 'grid',
                columnGap: 2,
                rowGap: 2,
                mb: 2,
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
              }}>

              <TextField
                label="Name"
                name="name"
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Bot Token"
                name="token"
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Pterodactyl Key"
                name="ptero"
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="License Key"
                name="license"
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Discord Client ID"
                name="cid"
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Discord Client Secret"
                name="csec"
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Domain Name (leave blank for generic default one)"
                name="domain"
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="MongoDB Username"
                name="mongoUsr"
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="MongoDB Password"
                name="mongoPwd"
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="MongoDB IP"
                name="mongoIp"
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              </Grid>
            </>
          )}
          {activeStep === 1 && (
            <>
            <Grid container spacing={2} sx={{ p: 3 }}>
            {renderPlans}
            </Grid>
            </>
          )}
          {activeStep === 2 && (
            <>
            <Grid container spacing={2} sx={{ p: 3 }}>
            <Grid  sx={{mt:3, ml:1}}>
              <Markdown align="center">
                # Custom Domains </Markdown>
                <Markdown align="center">
                ### To use a custom domain, you must fill out the domain name input on the first page.
                </Markdown>
                <Markdown align="center">
                ### To use a custom domain, point a CNAME record to the auto-generated domain upon creation.
                </Markdown>
              </Grid>
            </Grid>
            </>
          )}
          </Grid>
        <Grid item xs={12}>
          {activeStep > 0 && (
            <Button
              variant="contained"
              color="secondary"
              onClick={handleBack}
            >
              Back
            </Button>
          )}
          <Button
            variant="contained"
            color="primary"
            onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}
            disabled={isSubmit === true}
            sx={{
              ...(activeStep > 0 && {
                ml: 8,
              }),
            }}
          >
            {activeStep === steps.length - 1 ? "Submit" : "Next"}
          </Button>
          
        </Grid>
    </Container>
  );
};



export default CreateXPanelForm;