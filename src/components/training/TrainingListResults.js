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
import DeleteTraining from "./DeleteTraining";

const TrainingListResults = (props, { ...rest }) => {
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
    const [message, setMessage] = useState("");
    const [alertSeverity, setAlertSeverity] = useState("error");
    const [open, setOpen] = useState(false);

    const openSnackbar = () => {
        setOpen(true);
    }

    const closeSnackbar = () => {
        setOpen(false);
    }
    
    // customer: fetch(`${x.links[2].href}`
    // .then((response) => response.json())
    // .then((data) => {
    //     data.
    // })
    
    // )};

    const fetchTrainings = () => {
        fetch(`https://customerrest.herokuapp.com/api/trainings`)
        .then((response) => response.json())
        .then((data) => {
            const trainingWithIds = data.content.map((x) => {
                return {
                    ...x, 
                    id: x.links[0].href.split("/").reverse()[0],
                }
            });
            setTrainings(trainingWithIds);
        })
        .catch((err) => console.error(err));
    }

    useEffect(() => {
        fetchTrainings();
    }, []);

    const deleteTraining = (trainingId) => {
        fetch(`https://customerrest.herokuapp.com/api/trainings/${trainingId}`, {method: "DELETE"})
        .then((response) => {
            if (response.ok) {
                setMessage("Training is deleted successfully!");
                setAlertSeverity("success");
                openSnackbar();
                fetchTrainings();
            } else {
                setMessage("Something went wrong when deleting training!");
                setAlertSeverity("error");
                openSnackbar();
            }
        })            
        .catch((err) => console.log(err));
    }

    const headCells = [
        {id: "activity", label: "Activity"},
        {id: "date", label: "Date"},
        {id: "duration", label: "Duration (mins)"},
        {id: "customer", label: "Customer"},
    ]

    return (
        <>
            <TableContainer component={Paper} >
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" >Actions</TableCell>
                            {headCells.map((headCell, index) => (
                                <TableCell
                                    align="left"
                                    key={headCell.id}
                                >
                                    {headCell.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {trainings.map((training, index) => (
                            <TableRow key={training.id} className={classes.root} hover={true} >
                                <TableCell align="center"><DeleteTraining trainingid={training.id} deleteTraining={deleteTraining} /></TableCell>
                                <TableCell component="th" scope="row" >{training.activity}</TableCell>
                                <TableCell align="left" >{moment(training.date).format("ddd DD/MM/YYYY, hh:mm A")}</TableCell>
                                <TableCell align="left" >{training.duration}</TableCell>
                                <TableCell align="left" >{training.duration}</TableCell>
                            </TableRow>
                        ))}
                            {/* {trainings.map((training, index) => {
                                return <div>
                                    {training.activity}
                                    {training.duration}
                                    {training.date}
                                </div>
                            })} */}
                    </TableBody>
                </Table>
            </TableContainer>

                
        </>
    )
}

export default TrainingListResults;