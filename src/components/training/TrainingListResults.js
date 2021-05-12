import React, { useState, useEffect } from "react";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import TablePagination from "@material-ui/core/TablePagination";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import { CsvBuilder } from 'filefy';
import { Alert, Snackbar } from "@material-ui/core";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

function TrainingListResults () {
    const useStyles = makeStyles((theme) => ({
        root: {
          "& > *": {
            borderBottom: "unset",
            h6: "1.25rem"
          },
        },
        visuallyHidden: {
          border: 0,
          clip: "rect(0 0 0 0)",
          height: 1,
          margin: -1,
          overflow: "hidden",
          padding: 0,
          position: "absolute",
          top: 20,
          width: 1,
        },
        snackbar: {
          position: "center",
          [theme.breakpoints.down('xs')]: {
            bottom: 90,
          },
        },
      }));
    
    const classes = useStyles();
    const [trainings, setTrainings] = useState([]);
    const [customer, setCustomer] = useState()
    
    const fetchTrainings = () => {
        fetch(`https://customerrest.herokuapp.com/api/trainings`)
        .then((response) => response.json())
        .then((data) => {
            const trainingWithIds = data.content.map((x) => {
                return {
                    ...x, 
                    id: x.links[0].href.split("/").reverse()[0], 
                    customer: fetch(`${x.links[2].href}`
                    .then((response) => response.json())
                    
                    )};
            });
            console.log(trainingWithIds);
            setTrainings(trainingWithIds);
        })
        .catch((err) => console.error(err));
    }

    useEffect(() => {
        fetchTrainings();
    }, []);

    const headCell = [
        {id: "activity", label: "Activity"},
        {id: "date", label: "Date"},
        {id: "duration", label: "Duration"},
        {id: "customer", label: "Customer"},
    ]

    return (
        <>
            <TableContainer component={Paper} >
                <Table>
                    <TableHead>
                        <TableRow>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                            {trainings.map((training, index) => {
                                return <div>
                                    {training.activity}
                                    {training.duration}
                                    {training.date}
                                </div>
                            })}
                    </TableBody>
                </Table>
            </TableContainer>

                
        </>
    )
}

export default TrainingListResults;