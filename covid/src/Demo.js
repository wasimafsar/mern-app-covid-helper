import React, {useRef} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import SignIn from './SignIn';
import Tab2  from './Tab2';
import StickyHeadTable   from './List1';
import StickyHeadTable2   from './List2';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Deletion from './Deletion';
import Stats from './Stats';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography component='div'>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
function submitDetails(e){
  e.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function SimpleTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const numberField = useRef();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" centered>
          <Tab label="Need Help" {...a11yProps(0)} />
          <Tab label="Can Help" {...a11yProps(1)} />
          <Tab label="Need Help List" {...a11yProps(2)} />
          <Tab label="Can Help List" {...a11yProps(3)} />
          <Tab label="Statistics" {...a11yProps(4)} />
          <Tab label="Request Deletion" {...a11yProps(5)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <SignIn />
      </TabPanel>
      <TabPanel value={value} index={1}>
      <div>
        <Tab2 />
        </div>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <StickyHeadTable />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <StickyHeadTable2 />
      </TabPanel>
      <TabPanel value={value} index={4}>
      <div class="center">
        <Stats />
        </div>
      </TabPanel>
      <TabPanel value={value} index={5}>
        <div>
          <Deletion />
        </div>
      </TabPanel>
    </div>
  );
}
