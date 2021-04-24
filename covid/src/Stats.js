import React, {useEffect, Fragment, useState} from 'react'
import Chart from "react-google-charts";
import axios from 'axios';

export default function Stats() {
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  async function getHelps(){
    const api = axios.create({baseURL:'/api',headers:{'Content-Type':'application/json'}});
     const response1 = await api.get('/gethelp/');
     const response2 = await api.get('/canhelp/');
     setData1(response1.data);
     setData2(response2.data);
}

  useEffect(() => {
    getHelps();
}, []);
    return (
      <Fragment>
    {data1.length == 0 ? (<div></div>):(
        <Chart
  width={'50em'}
  height={'30em'}
  chartType="PieChart"
  loader={<div>Loading Chart</div>}
  data={[
    ['Task', 'Hours per Day'],
    ['Need', data1.length],
    ['Can Help', data2.length],
  ]}
  options={{
    title: 'Need vs Can Help Chart',
    // Just add this option
    is3D: true,
  }}
  rootProps={{ 'data-testid': '2' }}
/>
)}
            </Fragment> )
    
}
