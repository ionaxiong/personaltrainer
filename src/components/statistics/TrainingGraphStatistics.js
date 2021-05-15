import React, { useState, useEffect, createClass } from "react";
import Paper from "@material-ui/core/Paper";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import _ from "lodash";

const TrainingGraphStatistics = () => {
  const [data, setData] = useState([]);
  const fetchData = () => {
    fetch(`https://customerrest.herokuapp.com/gettrainings`)
      .then((response) => response.json())
      .then((data) => setData(data.sort((a, b) => b.duration - a.duration)))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Paper
        sx={{
          height: "calc(100vh - 120px)",
          padding: 4,
          paddingLeft: 3,
          paddingBottom: 2,
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, bottom: 5, left: 5 }}>
            <XAxis dataKey="activity" style={{ fontFamily: "Roboto" }} />
            <YAxis
              dataKey="duration"
              style={{ fontFamily: "Roboto" }}
              label={{
                value: "Duration (minutes)",
                angle: -90,
                position: "insideLeft",
                fontFamily: "Roboto",
              }}
            />
            <Tooltip />
            <Bar dataKey="duration" fill="#5664d2" />
          </BarChart>
        </ResponsiveContainer>
      </Paper>
    </>
  );
};

export default TrainingGraphStatistics;
