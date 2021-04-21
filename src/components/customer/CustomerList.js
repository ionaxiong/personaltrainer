import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import moment from 'moment';
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

// import { AgGridReact } from "ag-grid-react";
// import "ag-grid-community/dist/styles/ag-grid.css";
// import "ag-grid-community/dist/styles/ag-theme-material.css";

// import IconButton from "@material-ui/core/IconButton";
// import DeleteIcon from "@material-ui/icons/Delete";
// import GetAppIcon from '@material-ui/icons/GetApp';

// import Snackbar from "@material-ui/core/Snackbar";

// function CustomerList() {
//   const [customers, setCustomers] = useState([]);

//   const columns = [
//     { field: 'firstname', sortable: true, filter: true },
//     { field: 'lastname', sortable: true, filter: true },
//     { field: 'email', sortable: true, filter: true },
//     { field: 'phone', sortable: true, filter: true },
//     { field: 'streetaddress', sortable: true, filter: true },
//     { field: 'postcode', sortable: true, filter: true },
//     { field: 'city', sortable: true, filter: true },
//   ]

//   return (
//     <div
//     className="ag-theme-material"
//     style={{ height: 600, width: "90%", margin: "auto" }}>
//       <AgGridReact
//         rowData={customers}
//         columnDefs={columns}
//         pagination={true}
//         paginationPageSize={10}
//       />
//       </div>
//     );
// }

// export default CustomerList;

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});

function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [open, setOpen] = useState(false);
  const classes = useRowStyles();

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
    }  

    const handleOpen = (row) => {
      if (trainingOpen) {
        setTrainingOpen(false)
      } else {
        fetchTrainings(row)
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
              {trainingOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            {row.firstname}
          </TableCell>
          <TableCell align="right">{row.lastname}</TableCell>
          <TableCell align="right">{row.email}</TableCell>
          <TableCell align="right">{row.phone}</TableCell>
          <TableCell align="right">{row.streetaddress}</TableCell>
          <TableCell align="right">{row.postcode}</TableCell>
          <TableCell align="right">{row.city}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
            <Collapse in={trainingOpen} >
              <Box margin={1}>
                <Typography variant="h6" gutterBottom component="div">
                  Trainings
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell>Activity</TableCell>
                      <TableCell>Duration</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {trainings.map((training, index) => (
                      <TableRow key={index}>
                        <TableCell component="th" scope="row">
                          {training.activity}
                        </TableCell>
                        <TableCell>{moment(training.date).format('DD/MM/YYYY')}</TableCell>
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

  const CollapsibleTable = () => {
    return (
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Firstname</TableCell>
              <TableCell align="right">Lastname</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Phone</TableCell>
              <TableCell align="right">Address</TableCell>
              <TableCell align="right">Postcode</TableCell>
              <TableCell align="right">City</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map((row, index) => (
              <Row key={index} row={row} />
            ))}
            {/* {customers.map((customer, id) => (
              <tr key={id}>
                <td>{customer.firstname}</td>
                <td>{customer.lastname}</td>
                <td>{customer.email}</td>
                <td>{customer.phone}</td>
                <td>{customer.address}</td>
                <td>{customer.postcode}</td>
                <td>{customer.city}</td>
              </tr>
            ))} */}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  return (
    <CollapsibleTable>
      <React.Fragment>
        <TableRow className={classes.root}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            customer name
          </TableCell>
          <TableCell align="right">{customers.firstname}</TableCell>
          <TableCell align="right">{customers.lastname}</TableCell>
          <TableCell align="right">{customers.email}</TableCell>
          <TableCell align="right">{customers.phone}</TableCell>
          <TableCell align="right">{customers.address}</TableCell>
          <TableCell align="right">{customers.postcode}</TableCell>
          <TableCell align="right">{customers.city}</TableCell>
        </TableRow>
        {/* <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box margin={1}>
                <Typography variant="h6" gutterBottom component="div">
                  History
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell>Customer</TableCell>
                      <TableCell align="right">Amount</TableCell>
                      <TableCell align="right">Total price ($)</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.history.map((historyRow) => (
                      <TableRow key={historyRow.date}>
                        <TableCell component="th" scope="row">
                          {historyRow.date}
                        </TableCell>
                        <TableCell>{historyRow.customerId}</TableCell>
                        <TableCell align="right">{historyRow.amount}</TableCell>
                        <TableCell align="right">
                          {Math.round(historyRow.amount * row.price * 100) /
                            100}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow> */}
      </React.Fragment>
    </CollapsibleTable>
  );

}

export default CustomerList;
