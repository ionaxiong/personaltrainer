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
import { DataGrid, GridToolbar } from "@material-ui/data-grid";
import './training.css';

const useStyles = makeStyles((theme) => ({
    root: {
      "& > *": {
        borderBottom: "unset",
        h6: "1.25rem"
      },
    width: "100%",
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

const TrainingListResults = (props, { ...rest }) => {
    const classes = useStyles();
    const [trainings, setTrainings] = useState([]);
    const [message, setMessage] = useState("");
    const [alertSeverity, setAlertSeverity] = useState("error");
    const [open, setOpen] = useState(false);

    const openSnackbar = () => {
        setOpen(true);
    }

    const closeSnackbar = () => {
        setOpen(false);
    }

    const fetchTrainings = () => {
        fetch(`https://customerrest.herokuapp.com/gettrainings`)
        .then((response) => response.json())
        .then((data) => {
            const trainingWithCustomerDetails = data.map((x) => {
                if (x.customer == null) {
                    return {
                        id: x.id.toString(),
                        activity: x.activity,
                        date: x.date,
                        duration: x.duration,
                        customer: ""
                    } 
                } else {
                    return {
                        id: x.id.toString(),
                        activity: x.activity,
                        date: x.date,
                        duration: x.duration,
                        customer: x.customer.firstname + " " + x.customer.lastname
                    }
                }
            });
            setTrainings(trainingWithCustomerDetails);
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

    const columns = [
        {
            field: "actions", 
            headerName: "Actions",
            width: 200,
            align: "center",
            headerAlign: "center",
            filterable: false,
            sortable: false,
            editable: false,
            renderCell: ((params) => <DeleteTraining trainingid={params.id} deleteTraining={deleteTraining} />)
        },
        {field: "activity", flex: 1, headerName: "Activity", filterable: true, },
        {
            field: "date", 
            flex: 1, 
            headerName: "Date", 
            filterable: true,
            renderCell: ((params) => <div>{moment(params.date) ? moment(params.date).format("ddd DD/MM/YYYY, hh:mm A") : ""}</div>)
        },
        {field: "duration", flex: 1, headerName: "Duration (mins)", filterable: true, },
        {field: "customer", flex: 1, headerName: "Customer", filterable: true, },
    ]

    return (
        <>
            <Paper {...rest} className={classes.root} >
                {trainings.length > 0 &&
                    <DataGrid
                        rows={trainings}
                        columns={columns}
                        pagination
                        pageSize={5}
                        rowsPerPageOptions={[5, 10, 25]}
                        autoHeight
                        components={{
                            Toolbar: GridToolbar,
                        }}
                    >
                    </DataGrid>
                }
                <Snackbar
                open={open}
                autoHideDuration={4000}
                onClose={closeSnackbar}
                anchorOrigin={{vertical: "bottom", horizontal: "center"}}
            >
                <Alert onClose={closeSnackbar} severity={alertSeverity} >{message}</Alert>
            </Snackbar>
            </Paper>
            {/* <TableContainer component={Paper} >
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" >Actions</TableCell>
                            {headCells.map((headCell, index) => (
                                <TableCell
                                    align="left"
                                    key={index}
                                >
                                    {headCell.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {trainings.map((training, index) => (
                            <TableRow key={index} className={classes.root} hover={true} >
                                <TableCell align="center"><DeleteTraining trainingid={training.id} deleteTraining={deleteTraining} /></TableCell>
                                <TableCell component="th" scope="row" >{training.activity}</TableCell>
                                <TableCell align="left" >{moment(training.date) ? moment(training.date).format("ddd DD/MM/YYYY, hh:mm A") : ""}</TableCell>
                                <TableCell align="left" >{training.duration}</TableCell>
                                <TableCell align="left" >{training.customerFirstname + " " + training.customerLastname}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer> */}
        </>
    )
}

export default TrainingListResults;