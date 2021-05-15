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
      .then((data) => setData(data))
      .catch((err) => console.error(err));
      console.log(data);
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
      <Paper >
        <BarChart width={1200} height={800} data={data} margin={{ top: 5, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="duration" fill="#8884d8"  />
        </BarChart> 
      </Paper>
    </>
  )


  // const CustomizedLabel = React.createClass({
    
  //   render () {
  //     const {x, y, fill, value} = this.props;
  //      return <text 
  //                x={x} 
  //                y={y} 
  //                dy={-4} 
  //                fontSize='16' 
  //                fontFamily='sans-serif'
  //                fill={fill}
  //                textAnchor="middle">{value}%</text>
  //   }
  // });
    
  // //******************************************************************************************************************* */
  //      const RenderLabel = (props: any) => {
  //          const { x, y, textAnchor, key, value, index, ...others } = props;

  //          if (x === +x && y === +y) {
  //            return (
  //              <text x={trainings.trainingsName} y={trainings.trainingsDuration} dy={-10} textAnchor={trainings.trainingsName} key={key}>
  //                {_.isArray(trainings) ? trainings[1] : trainings}
  //              </text>
  //            );
  //          }
  //          return null;
  //        };

  //      const CustomTick = function () {
  //          const { trainings, x, y } = this.props;

  //          return <text x={trainings.trainingsName} y={trainings.trainingsDuration} fill="#666" textAnchor="middle" dy={-4}>{trainings.trainingsDuration}</text>;
  //  };

  //  const CustomAxisTick = function () {
  //    const { x, y, trainings } = this.props;

  //    return (
  //      <g transform={`translate(${x},${y})`}>
  //        <text x={0} y={0} dy={16} textAnchor="end" fill="#666" transform="rotate(-35)">{trainings.value}</text>
  //      </g>
  //    );
  //  };

  //  const CustomBar = (props) => {
  //    const { x, y, width, height, fill } = props;

  //    if (x === +x && y === +y) {
  //      const path = `M${x},${y + height}
  //            C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3} ${x + width / 2}, ${y}
  //            C${x + width / 2},${y + height / 3} ${x + 2 * width / 3},${y + height} ${x + width}, ${y + height}
  //            Z`;

  //      return <path d={path} stroke="none" fill={fill} />;
  //    }

  //    return null;
  //  };

  //  const CustomCursor = (props) => {
  //    const { x, y, width, height, fill, payloadIndex } = props;
  //    return (<Rectangle x={x} y={y} fill={fill} width={width} height={height} onMouseEnter={() => console.log(payloadIndex)} />);
  //  }

  //******************************************************************************************************************* */

  // const BarTwo = () => {
  //   const getPath = () => {
  //     const { x, y, width, height } = this.props;

  //     if (x === +x && y === +y) {
  //       const extend = width * 0.2;

  //       return `M${x - extend},${y + height}
  //               C${x - extend + width / 3},${y + height} ${x + width / 6},${y} ${x + width / 2}, ${y}
  //               C${x + 5 * width / 6},${y} ${x + extend + 2 * width / 3},${y + height} ${x + width + extend}, ${y + height}
  //               Z`;
  //     }

  //     return null;
  //   }

  //  const render = () => {
  //     const { fill, fillOpacity } = this.props;

  //     return <path d={this.getPath()} stroke="none" fillOpacity={fillOpacity} fill={fill} />;
  //   }
  // }

  // const CustomAxis = () => {
  //   const getIcon =() => {
  //     const { x, y, payload } = this.props;
  //     let icon;

  //     switch (payload.value) {
  //       case 'food':
  //         icon = (
  //           <svg x={x - 10} y={y} width={20} height={20} version="1.1" viewBox="0 0 1024 1024">
  //             <path fill="#387908" d="M960 682.666667c-8.533333 0-21.333333 0-21.333333 0l-85.333333 0c-23.466667 0-42.666667-19.2-42.666667-42.666667 0-8.533333 0-21.333333 0-21.333333 0-6.4 0-14.933333 0-21.333333 0-164.266667-134.4-298.666667-298.666667-298.666667s-298.666667 134.4-298.666667 298.666667c0 6.4 0 14.933333 2.133333 21.333333 0 0-2.133333 12.8-2.133333 21.333333 0 23.466667-19.2 42.666667-42.666667 42.666667L85.333333 682.666667c0 0-12.8 0-21.333333 0-23.466667 0-42.666667-19.2-42.666667-42.666667s19.2-42.666667 42.666667-42.666667c8.533333 0 21.333333 0 21.333333 0l42.666667 0c0-189.866667 138.666667-347.733333 320-377.6 0-2.133333 0-4.266667 0-6.4 0-36.266667 27.733333-64 64-64s64 27.733333 64 64c0 2.133333 0 4.266667 0 6.4 181.333333 29.866667 320 187.733333 320 377.6l42.666667 0c0 0 12.8 0 21.333333 0 23.466667 0 42.666667 19.2 42.666667 42.666667S983.466667 682.666667 960 682.666667zM469.333333 384 469.333333 384c0 0 6.4 0 10.666667 0 17.066667 0 32 14.933333 32 32S497.066667 448 480 448c-4.266667 0-10.666667 0-10.666667 0l0 0c-70.4 0-128 57.6-128 128 0 0 0 6.4 0 10.666667 0 17.066667-14.933333 32-32 32S277.333333 603.733333 277.333333 586.666667c0-4.266667 0-10.666667 0-10.666667C277.333333 469.333333 362.666667 384 469.333333 384zM64 789.333333l896 0c23.466667 0 42.666667 19.2 42.666667 42.666667s-19.2 42.666667-42.666667 42.666667L64 874.666667c-23.466667 0-42.666667-19.2-42.666667-42.666667S40.533333 789.333333 64 789.333333z" />
  //           </svg>
  //         );
  //         break;
  //       case 'cosmetic':
  //         icon = (
  //           <svg x={x - 10} y={y} width={20} height={20} version="1.1" viewBox="0 0 1024 1024">
  //             <path fill="#387908" d="M874.666667 940.8 149.333333 940.8c-23.466667 0-42.666667-19.2-42.666667-42.666667s19.2-42.666667 42.666667-42.666667l42.666667 0 0-170.666667c0-23.466667 19.2-42.666667 42.666667-42.666667l64 0 0-512c0-23.466667 17.066667-42.666667 38.4-46.933333 8.533333-2.133333 19.2 2.133333 19.2 2.133333S680.533333 256 682.666667 258.133333c25.6 8.533333 42.666667 25.6 42.666667 42.666667l0 341.333333 64 0c23.466667 0 42.666667 19.2 42.666667 42.666667l0 170.666667 42.666667 0c23.466667 0 42.666667 19.2 42.666667 42.666667S898.133333 940.8 874.666667 940.8zM640 334.933333 384 196.266667l0 445.866667 256 0L640 334.933333zM746.666667 727.466667l-21.333333 0-85.333333 0L384 727.466667l-85.333333 0-21.333333 0 0 128 469.333333 0L746.666667 727.466667z" />
  //           </svg>
  //         );
  //         break;
  //       case 'storage':
  //         icon = (
  //           <svg x={x - 10} y={y} width={20} height={20} version="1.1" viewBox="0 0 1024 1024">
  //             <path fill="#387908" d="M896 928.234667 128 928.234667C104.426667 928.234667 85.333333 909.141333 85.333333 885.568L85.333333 629.568C85.333333 605.994667 104.426667 586.901333 128 586.901333L163.52 586.901333 434.837333 116.970667C446.613333 96.554667 472.704 89.578667 493.12 101.354667L714.816 229.354667C735.232 241.130667 742.208 267.221333 730.432 287.637333L714.176 315.797333 864.426667 402.56C884.842667 414.336 891.84 440.426667 880.042667 460.842667L807.274667 586.901333 896 586.901333C919.573333 586.901333 938.666667 605.994667 938.666667 629.568L938.666667 885.568C938.666667 909.141333 919.573333 928.234667 896 928.234667ZM487.402667 196.586667 262.058667 586.901333 459.114667 586.901333 635.2 281.92 487.402667 196.586667ZM557.653333 586.901333 708.736 586.901333 784.810667 455.125333 671.509333 389.696 557.653333 586.901333ZM853.333333 672.234667 170.666667 672.234667 170.666667 842.901333 853.333333 842.901333 853.333333 672.234667Z" />
  //           </svg>
  //         );
  //         break;
  //       case 'digital':
  //         icon = (
  //           <svg x={x - 10} y={y} width={20} height={20} version="1.1" viewBox="0 0 1024 1024">
  //             <path fill="#387908" d="M896 896 128 896C104.426667 896 85.333333 876.906667 85.333333 853.333333L85.333333 298.666667C85.333333 275.093333 104.426667 256 128 256L896 256C919.573333 256 938.666667 275.093333 938.666667 298.666667L938.666667 853.333333C938.666667 876.906667 919.573333 896 896 896ZM853.333333 341.333333 170.666667 341.333333 170.666667 810.666667 853.333333 810.666667 853.333333 341.333333ZM512 405.333333C606.250667 405.333333 682.666667 481.749333 682.666667 576 682.666667 670.250667 606.250667 746.666667 512 746.666667 417.749333 746.666667 341.333333 670.250667 341.333333 576 341.333333 481.749333 417.749333 405.333333 512 405.333333ZM512 661.333333C559.125333 661.333333 597.333333 623.125333 597.333333 576 597.333333 528.874667 559.125333 490.666667 512 490.666667 464.874667 490.666667 426.666667 528.874667 426.666667 576 426.666667 623.125333 464.874667 661.333333 512 661.333333ZM448 213.333333 234.666667 213.333333C211.093333 213.333333 192 194.24 192 170.666667 192 147.093333 211.093333 128 234.666667 128L448 128C471.573333 128 490.666667 147.093333 490.666667 170.666667 490.666667 194.24 471.573333 213.333333 448 213.333333Z" />
  //           </svg>
  //         );
  //         break;
  //     }

  //     return icon;
  //   }

  //  const render = () => {
  //     const { x, y, data } = this.props;

  //     return (
  //       <g>
  //         {this.getIcon()}
  //         <text textAnchor="middle" x={x} y={y} dy={34}>{data.value}</text>
  //       </g>
  //     );
  //   }
  // }
//   const CustomizedLabel = React.createClass({
    
//     render () {
//       const {x, y, fill, value} = this.props;
//        return <text 
//                  x={trainings.trainingsName} 
//                  y={trainings.trainingsDuration} 
//                  dy={-4} 
//                  fontSize='16' 
//                  fontFamily='sans-serif'
//                  fill={fill}
//                  textAnchor="middle">{value}%</text>
//     }
//   });

//  default export SimpleBarChart = React.createClass({
//     render () {
//       return (
//         <BarChart 
//               width={900} 
//               height={260} 
//               data={trainings}
//               margin={{top: 0, right: 0, left: 0, bottom: 25}}>
//          <XAxis 
//              dataKey="Text"
//              fontFamily="sans-serif"
//              tickSize
//              dy='25'
//          />
//          <YAxis hide/>
//          <CartesianGrid 
//              vertical={false}
//              stroke="#ebf3f0"
//          />
//          <Bar 
//              dataKey="RespondentPercentage" 
//              barSize ={170}
//              fontFamily="sans-serif"
//              label={<CustomizedLabel />}
//              >
//               {
//                   trainings.map((training, index) => (
//                       <Cell fill={trainings[index].AnswerRef === "three" ? '#61bf93' : '#ededed'} />
//                   ))
//               }
//           </Bar>
//         </BarChart>
//       );
//     }
//   })
// }
//   const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
  //  return (
  //    <>
  //      <Paper >
         {/* <div className={classes.sideText}>
                     <p>Projected Revenue Over 5 Years</p>
                 </div> */}
         {/* <BarChart
           width={900}
           height={400}
           data={trainings}
           margin={{ top: 25, right: 0, left: 0, bottom: 25 }}
         >
           <XAxis dataKey={trainings.trainingsName} fontFamily="sans-serif" tickSize dy="25" />
           <YAxis  />
           <Bar
             dataKey={trainings.trainingsDuration}
             barSize={170}
           >
             {trainings.map((training, index) => (
               <Cell fill={trainings[index].color} />
             ))}
           </Bar>
         </BarChart> */}
         {/* <BarChart width={1200} height={800} data={data} margin={{ top: 5, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis  dataKey="name" />
                      <YAxis dataKey="pv" />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="duration" fill="#8884d8"  />
                  </BarChart> */}
       {/* </Paper>
     </> */}


}

export default TrainingGraphStatistics;


