import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
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
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import CustomerListToolBar from "./CustomerListToolBar";

import TablePagination from '@material-ui/core/TablePagination';
import TableSortLabel from '@material-ui/core/TableSortLabel';

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});

function CustomerListResults(props) {
  const [customers, setCustomers] = useState([]);
  // const [page, setPage] = useState(0);
  // const [rowsPerPage, setRowsPerPage] = useState(5);
  // const handleChangePage = (event, newPage) => {
  //   setPage(newPage);
  // };
  // const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
  // const handleChangeRowsPerPage = (event) => {
  //   setRowsPerPage(parseInt(event.target.value, 10));
  //   setPage(0);
  // };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = () => {
    fetch("https://customerrest.herokuapp.com/api/customers")
      .then((response) => response.json())
      .then((data) => setCustomers(data.content))
      .catch((err) => console.error(err));
  };

  function Row(props) {
    const { row } = props;
    const [trainings, setTrainings] = useState([]);
    const [trainingOpen, setTrainingOpen] = useState(false);
    const classes = useRowStyles();

    const fetchTrainings = (row) => {
      var url = row.links[2].href;
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setTrainings(data.content);
          setTrainingOpen(true);
        })
        .catch((err) => console.error(err));
    };

    const handleOpen = (row) => {
      if (trainingOpen) {
        setTrainingOpen(false);
      } else {
        fetchTrainings(row);
      }
    };

    return (
      <React.Fragment>
        <TableRow className={classes.root}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => handleOpen(row)}
            >
              {trainingOpen ? (
                <KeyboardArrowUpIcon />
              ) : (
                <KeyboardArrowDownIcon />
              )}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            {row.firstname}
          </TableCell>
          <TableCell align="center">{row.lastname}</TableCell>
          <TableCell align="center">{row.email}</TableCell>
          <TableCell align="center">{row.phone}</TableCell>
          <TableCell align="center">{row.streetaddress}</TableCell>
          <TableCell align="center">{row.postcode}</TableCell>
          <TableCell align="center">{row.city}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
            <Collapse in={trainingOpen}>
              <Box margin={1}>
                <Typography variant="h6" gutterBottom component="div">
                  Trainings
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell><strong>Date</strong></TableCell>
                      <TableCell><strong>Activity</strong></TableCell>
                      <TableCell><strong>Duration</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {trainings.map((training, index) => (
                      <TableRow key={index}>
                        <TableCell component="th" scope="row">
                          {training.activity}
                        </TableCell>
                        <TableCell>
                          {moment(training.date).format("DD/MM/YYYY")}
                        </TableCell>
                        <TableCell>{training.duration}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }

  return (
    <Paper>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Firstname</TableCell>
              <TableCell align="center">Lastname</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Phone</TableCell>
              <TableCell align="center">Address</TableCell>
              <TableCell align="center">Postcode</TableCell>
              <TableCell align="center">City</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers
              .filter((row) => {
                if (props.searchString !== "") {
                  return row.firstname.toLowerCase().includes(props.searchString);
                } else {
                  return true;
                }
              })
              .map((row, index) => (
                <Row key={index} row={row} />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        count={customers.length}

      />
    </Paper>
  );
}

export default CustomerListResults;
