import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import loadTemtplate, { data } from "./template";


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
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
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}


export default function FullWidthTabs() {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {    
    setValue(newValue);
    setTimeout(() => {
        loadTemtplate(data[newValue])
    },0)
  };

  const handleChangeIndex = (index) => {
    setValue(index);
    setTimeout(() => {
        loadTemtplate(data[index])
    },0)
  };

  useEffect(() => {
    setTimeout(() => {
        loadTemtplate(data[0])
    }, 0)
  }, [])

  return (
    <div id="tab-contents">
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="옥상출입문 설치 여부" {...a11yProps(0)} />
          <Tab label="옥상 대피 공간" {...a11yProps(1)} />
          <Tab label="지붕형태" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <div value={value} index={0} dir={theme.direction}>
           <div id="chart"></div>
        </div>
        <div value={value} index={1} dir={theme.direction}>
          <div id="chart1"></div>
        </div>
        <div value={value} index={2} dir={theme.direction}>
          <div id="chart2"></div>
        </div>
      </SwipeableViews>
    </div>
  );
}
