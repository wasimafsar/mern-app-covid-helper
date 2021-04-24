import React, {useRef, useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import ContactPhone from '@material-ui/icons/ContactPhone';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select'
import axios from 'axios';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Covid help
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const [age, setAge] = React.useState('');
  const nameField = useRef();
  const numberField = useRef();
  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState(0);
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  function submitDetails(e){
    e.preventDefault();
    const obj = {name: nameField.current.childNodes[1].firstChild.value, mobileNumber: numberField.current.childNodes[1].firstChild.value, type: age};
    getHelp(obj);
  }
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

   async function getHelp(obj){
    const api = axios.create({baseURL:'/api',headers:{'Content-Type':'application/json'}});
    const response = await api.post('/gethelp/me',obj);
    console.log(response);
    nameField.current.childNodes[1].firstChild.value = '';
    numberField.current.childNodes[1].firstChild.value = '' ;
    setAge('');
    handleClick();
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <ContactPhone />
        </Avatar>
        <Typography component="h1" variant="h5">
          Fill up Details
        </Typography>
        <form className={classes.form}   noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Patient Name"
            name="name"
            autoComplete="name"
            ref={nameField}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="mobilenumber"
            label="Mobile Number"
            name="mobilenumber"
            autoComplete="mobilenumber"
            type="number"
            ref={numberField}
            autoFocus
          />
          <div className="pad">

          </div>

          <FormControl variant="outlined" className={classes.formControl} required
            fullWidth>
        <InputLabel id="demo-simple-select-outlined-label">Looking For</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={age}
          onChange={handleChange}
          label="Age"
        >
          <MenuItem value={'Plasma'}>Plasma</MenuItem>
          <MenuItem value={'Oxygen Cylinder'}>Oxygen Cylinder</MenuItem>
        </Select>
      </FormControl>
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={submitDetails}
            className={classes.submit}
          >
            Submit
          </Button>
        </form>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Details successfully submitted!
        </Alert>
</Snackbar>
* Your Information will be publicly available so that potential helper's may reach you ,you can request for deletion in 'Request Deletion' Tab once your need is met.
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}