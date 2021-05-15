import React, { useState, useEffect, createClass } from "react";

import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import {
  BarChart,
  Bar,
  Brush,
  Cell,
  CartesianGrid,
  ReferenceLine,
  ReferenceArea,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ErrorBar,
  LabelList,
  Rectangle,
  ResponsiveContainer
} from "recharts";
import _ from "lodash";
// // import { changeNumberOfData } from './utils';

 const useStyles = makeStyles((theme) => ({
   root: {
     padding: 50,
   },
   container: {
     padding: "10px",
     width: "900px",
     height: "260px",
     backgroundColor: "#fff",
   },
   label: {
     fontFamily: "sans-serif",
   },
   sideText: {
     transform: [{ rotate: "180deg" }],
     position: "absolute",
     left: "-120px",
     top: "150px",
     // zindex: "9999999",
     // text-transform: "uppercase",
   },
 }));


const TrainingGraphStatistics = () => {
  const [data, setData] = useState([]);
  const classes = useStyles();
  // const colors = scaleOrdinal(schemeCategory10).range();
  const fetchData = () => {
    fetch(`https://customerrest.herokuapp.com/gettrainings`)
      .then((response) => response.json())
      .then((data) => setData(data.sort((a,b) => b.duration - a.duration)))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchData();
  },[]);

  const CustomizedLabel = (props) =>({
    render () {
     const {x, y, fill, value} = this.props;
      return <text 
                x={x} 
                y={y} 
                dy={-4}
                // fontSize='16' 
                // fontFamily='sans-serif'
                fill={fill}
                textAnchor="middle">{value}</text>
   }
 });

  return (
    <>
      <Paper sx={{height: "calc(100vh - 120px)", padding: 4, paddingLeft: 3, paddingBottom: 2}}>
        <ResponsiveContainer width="100%" height="100%" >
          <BarChart 
            data={data} 
            margin={{ top: 5, bottom: 5, left: 5 }}
          >
            <XAxis dataKey="activity" style={{ fontFamily: 'Roboto' }} />
            <YAxis dataKey="duration" style={{ fontFamily: 'Roboto' }} label={{ value: 'Duration (minutes)', angle: -90, position: 'insideLeft', fontFamily: "Roboto" }} />
            <Tooltip />
            {/* <CartesianGrid/> */}
            {/* <Legend /> */}
            <Bar dataKey="duration" fill="#5664d2" />
          </BarChart> 
        </ResponsiveContainer>
      </Paper>
    </>
  )

}

export default TrainingGraphStatistics;


