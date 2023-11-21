import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from './theme1';
import Productday from './Productday';
import GeoChart from './GeoChart';
import BarChart from './BarChart';
import ProgressCircle from './ProgressCircle';
import Header from './header';
import { mockTransactions } from './mockdata';
import LineChart from './LineChart';
import Starbox from './Starbox';
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import Highcharttesr from './Highcharttesr';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';




const HomeDashboards = () => {
  const [userCount, setUserCount] = useState(0);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    // Fetch the user count from your API endpoint and update the userCount state.
    axios
      .get('http://localhost:8082/getUserCount')
      .then((response) => {
        setUserCount(response.data.totalUserCount);
      })
      .catch((error) => {
        console.error('Error fetching user count:', error);
      });
  }, []);
  return (
  <Box m="15px">
   <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="100px"
        gap="20px"
      >
     <Box
          gridColumn="span 4"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          style={{
           
            height: '100px', // Set your desired height
          }}
        >
          <Starbox
            title={userCount.toString()}
            subtitle="Number of user"
            progress="0.75"
            increase="+14%"
            icon={
              <PersonAddIcon
              sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
            />
            }
          />
    </Box>  

     <Box
          gridColumn="span 4"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          style={{
           
            height: '100px', // Set your desired height
          }}
        >
          <Starbox
            title="431"
            subtitle="Sales"
            progress="0.5"
            increase="+21%"
            icon={
              <PointOfSaleIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        <Box
          gridColumn="span 4"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          style={{
           
            height: '100px', // Set your desired height
          }}
        >
          <Starbox
            title="32,441"
            subtitle="Clients"
            progress="0.4"
            increase="+14%"
            icon={
              <PersonAddIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        
    


      {/*LineChart*/}
      <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
         
        >
        
          <Box height="100px" ml="0px">
    <Highcharttesr width ='120px' height='75px'/>
          </Box>
        </Box>

 {/*transaction*/}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Typography variant="h5" fontWeight="600" sx={{ mb: "15px" }}>
            Geo traffic
          </Typography>
          <Box height="200px">
            <GeoChart isDashboard={true} />
          </Box>
        </Box>

         {/*Row 3*/}
         <Box
          gridColumn="span 6"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="30px"
          style={{
           
            height: '175px', // Set your desired height
          }}
        >
          <Typography variant="h5" fontWeight="600">
            Campaign
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="25px"
          >
            <ProgressCircle size="125" />
            <Typography
              variant="h5"
              color={colors.greenAccent[500]}
              sx={{ mt: "15px" }}
            >
              48,345 revenue
            </Typography>
            <Typography variant="h5" fontWeight="600">
              Includes extra costs
            </Typography>
          </Box>
        </Box>

        <Box
          gridColumn="span 6"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="30px"
           style={{
           
            height: '175px', // Set your desired height
          }}
        >
          <Typography variant="h5" fontWeight="600">
            Sales Quantity
          </Typography>
          <Box height="150px" mt="-25px">
            <BarChart isDashboard={true} />
          </Box>
        </Box>

        
    </Box> 



  </Box>
   
  )
}

export default HomeDashboards;
