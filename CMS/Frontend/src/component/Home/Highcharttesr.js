import React, { useEffect, useState, useRef } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { red } from '@mui/material/colors';
import axios from 'axios';

export default function Highcharttesr() {
  const [userCounts, setUserCounts] = useState({ male: 0, female: 0 });

  useEffect(() => {
    // Make an API request to fetch user counts
    axios
      .get('http://localhost:8082/getUserGenderCount')
      .then((response) => {
        const data = response.data;
        const maleCount = data.male;
        const femaleCount = data.female;
        setUserCounts({
          male: maleCount,
          female: femaleCount,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const chartOptions = {
    chart: {
      type: 'column',
      spacing: [1, 1, 1, 1],
      width: 780,
      height: 225,

    },
    title: {
      text: 'Monthly User Count/Gender',
    },
    xAxis: {
      categories: ['count'],
      crosshair: true,
    },
    yAxis: {
      min: 0,
      title: {
        text: 'User Count',
      },
    },
    plotOptions: {},
    series: [
      {
        name: 'Male',
        data: [userCounts.male],
      },
      {
        name: 'Female',
        data: [userCounts.female],
      },
    ],
  };
      return (
        <div >
        <HighchartsReact highcharts={Highcharts} options={chartOptions} />
      </div>
      );
}
