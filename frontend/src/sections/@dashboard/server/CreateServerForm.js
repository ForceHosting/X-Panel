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
import { addToQueueRoute } from '../../../utils/APIRoutes';
import Iconify from '../../../components/Iconify';
import Label from "../../../components/Label";


const steps = ["Resources", "Location", "Software"];

const CreateServerForm = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const locations = [
    { 
        name: 'Stormbreaker',
        uid: '1',
        country: 'Germany',
        flag: 'DE',
    },
    {
        name: 'Valerius',
        uid: '6',
        country: 'Finland',
        flag: 'FN'
    },
    {
        name: 'Optimus',
        uid: '4',
        country: 'United States',
        flag: 'US'
    },
    {
        name: 'Odin',
        uid: '5',
        country: 'United States',
        flag: 'US'
    },
  ];

  const software = [
    { 
        name: 'PaperMC',
        uid: '15',
        brand: 'Minecraft'
    },
    {
        name: 'Bungeecord',
        uid: '16',
        brand: 'Minecraft'
    },
    {
        name: 'Vanilla',
        uid: '17',
        brand: 'Minecraft'
    },
    {
      name: 'Vanilla',
      uid: '31',
      brand: 'Minecraft, Bedrock/PE'
  },
  {
    name: 'PMMP',
    uid: '32',
    brand: 'Minecraft, Bedrock/PE'
},
    {
        name: 'Forge',
        uid: '18',
        brand: 'Minecraft'
    },
    {
        name: 'Lavalink',
        uid: '19',
        brand: 'Voice'
    },
    {
        name: 'Python',
        uid: '21',
        brand: 'Programming'
    },
    {
        name: 'NodeJS',
        uid: '20',
        brand: 'Programming'
    },
    {
        name: 'MongoDB',
        uid: '22',
        brand: 'Databases'
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
      const { name, cpu, disk, memory, location, software} = formData;

      const {data} = await axios.post(addToQueueRoute,{name,location,software,memory,disk,cpu},{
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

  const renderSoftware = software.map((soft) => (
    <Grid xs={12} md={5} key={soft.uid} sx={{mt:3, ml:3}}>
      <Stack
        component={Paper}
        variant="outlined"
        onClick={() => handleSoftwareChange(soft.uid)}
        name="location"
        value={soft.uid}
        sx={{
          p: 2.5,
          position: 'relative',
          cursor: 'pointer',
          ...(soft.uid && {
            opacity: 0.48,
            cursor: 'default',
          }),
          
          ...(soft.uid === currentSoftware && {
            boxShadow: (theme) => `0 0 0 2px ${theme.palette.text.primary}`,
          }),
        }}
      >
        {soft.uid === currentSoftware && (
          <Label
            color="info"
            startIcon={<Iconify icon="eva:star-fill" />}
            sx={{ position: 'absolute', top: 8, right: 8 }}
          >
            Current
          </Label>
        )}
  
  
        <Box
          sx={{
            typography: 'subtitle2',
            mt: 2,
            mb: 0.5,
            textTransform: 'capitalize',
          }}
        >
          {soft.brand}
        </Box>
  
        <Stack direction="row" alignItems="center" sx={{ typography: 'h4' }}>
          {soft.name || 'Free'}
  
        
        </Stack>
      </Stack>
    </Grid>
  ));

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
          {location.flag === 'FN' && <IconFlagEU />}
        </Box>

        <Box
          sx={{
            typography: 'subtitle2',
            mt: 2,
            mb: 0,
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
                label="Memory"
                name="memory"
                type="number"
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="CPU"
                type="number"
                name="cpu"
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Disk"
                type="number"
                name="disk"
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
            {renderSoftware}
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



export default CreateServerForm;