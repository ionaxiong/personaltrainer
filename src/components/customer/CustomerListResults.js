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
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import TablePagination from "@material-ui/core/TablePagination";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import { CsvBuilder } from 'filefy';
import { Alert, Snackbar } from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
// import CustomerListToolbar from './CustomerListToolbar';
import DeleteCustomer from "./DeleteCustomer";

const useRowStyles = makeStyles((theme) => ({
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

const CustomerListResults = (props, { ...rest }) => {
  const [customers, setCustomers] = useState([]);
  const [message, setMessage] = useState("");
  const [open,setOpen] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState("");
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [orderBy, setOrderBy] = useState("");
  const [order, setOrder] = useState("asc");
  const classes = useRowStyles();

  const openSnacknar = () => {
    setOpen(true);
  };

  const closeSnackbar = () => {
    setOpen(false);
  }

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = () => {
    fetch("https://customerrest.herokuapp.com/api/customers")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const customersWithIds = data.content.map((x) => {
          return { ...x, id: x.links[0].href.split("/").reverse()[0] };
        });
        setCustomers(customersWithIds);
      })
      .catch((err) => console.error(err));
  };

  const addCustomer = (newCustomer) => {
    fetch("https://customerrest.herokuapp.com/api/customers", {
      method: "POST",
      body: JSON.stringify(newCustomer),
      headers: {"Content-Type": "application/json"},
    })
    .then((response) => {
      if(response.ok) {
        setMessage("Customer is added sucessfully!");
        setAlertSeverity("success");
        openSnacknar();
        fetchCustomers();
      } else {
        setMessage("Something went wrong when adding customer!");
        setAlertSeverity("error");
        openSnacknar();
      }
    })
    .catch((err) => console.error(err));
  };

  const deleteCustomer = (customerId) => {
    fetch(`https://customerrest.herokuapp.com/api/customers/${customerId}`, {method: "DELETE"})
    .then((response) => {
      if (response.ok) {
        setMessage("Customer is deleted successfully!");
        setAlertSeverity("success");
        openSnacknar();
        fetchCustomers();
      } else {
        setMessage("Something went wrong when deleting customer!");
        setAlertSeverity("error");
        openSnacknar();
      }
    })
    .catch((err) => console.error(err));
  }

  // const editCustomer = (customerId, updatedCustomer) => {
    
  // }

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const filterCustomers = () => {
    return customers
      .filter((row) => {
        if (props.searchString !== "") {
          return row.firstname.toLowerCase().includes(props.searchString);
        } else {
          return true;
        }
      })
      .sort((a, b) => {
        if (orderBy === "") {
          return;
        }
        if (order === "desc") {
          if (a[orderBy] < b[orderBy]) {
            return -1
          } else {
            return 1
          }
        } else {
          if (a[orderBy] > b[orderBy]) {
            return -1
          } else {
            return 1
          }
        }
      });
  };

  function ExportSelectionGrid () {
    const builder = new CsvBuilder('customers.csv');

    const data = filterCustomers();
    data.forEach((v) => { delete v.content; delete v.links });
    const arrays = data.map(x => Object.values(x));

    builder
      .setDelimeter(',')
      .setColumns(['Firstname', 'Lastname', 'Address', 'Postcode', 'City', 'Email', 'Phone', 'ID'])
      .addRows(arrays)
      .exportFile();
  }

  const headCells = [
    { id: "firstname", label: "Firstname" },
    { id: "lastname", label: "Lastname" },
    { id: "email", label: "Email" },
    { id: "phone", label: "Phone" },
    { id: "streetaddress", label: "Address" },
    { id: "postcode", label: "Postcode" },
    { id: "city", label: "City" },
  ];

  function Row(props) {
    const { row } = props;
    const [trainings, setTrainings] = useState([]);
    const [trainingOpen, setTrainingOpen] = useState(false);

    const fetchTrainings = (row) => {
      var url = row.links[2].href;
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          console.log(data.content);
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
        <TableRow className={classes.root} hover={true}>
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
          <TableCell width={80} sx={{display: "flex", border: 0, flexFlow: "row", }}>
            <DeleteCustomer customerId={row.id} deleteCustomer={deleteCustomer}/>
            <IconButton aria-label="edit">
              <EditIcon fontSize="small" />
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            {row.firstname}
          </TableCell>
          <TableCell align="left">{row.lastname}</TableCell>
          <TableCell align="left">{row.email}</TableCell>
          <TableCell align="left">{row.phone}</TableCell>
          <TableCell align="left">{row.streetaddress}</TableCell>
          <TableCell align="left">{row.postcode}</TableCell>
          <TableCell align="left">{row.city}</TableCell>
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
                      <TableCell>
                        <strong>Date</strong>
                      </TableCell>
                      <TableCell>
                        <strong>Activity</strong>
                      </TableCell>
                      <TableCell>
                        <strong>Duration</strong>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {trainings.length > 0 &&
                      trainings[0].rel !== null &&
                      trainings.map((training, index) => (
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
                <Button size="small" color="primary"  sx={{marginTop: 2, marginBottom: 1}} >ADD TRAININGS</Button>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }

  return (
    <>
    {/* <CustomerListToolbar
      ExportSelectionGrid={ExportSelectionGrid}
      searchString={props.searchString}
      setSearchString={props.setSearchString}
      addCustomer={addCustomer}
    /> */}
    <Paper {...rest}>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell align="left" sx={{paddingLeft: 4.5}} >Actions</TableCell>
              {headCells.map((headCell) => (
                <TableCell
                  align={"left"}
                  key={headCell.id}
                  sortDirection={orderBy === headCell.id ? order : false}
                >
                  <TableSortLabel
                    active={orderBy === headCell.id}
                    direction={orderBy === headCell.id ? order : "desc"}
                    onClick={() => {
                      if (orderBy === headCell.id) {
                        if (order === "asc") {
                          setOrder("desc");
                        } else {
                          setOrder("asc");
                        }
                      } else {
                        setOrderBy(headCell.id);
                        setOrder("desc");
                      }
                    }}
                  >
                    {headCell.label}
                    {orderBy === headCell.id ? (
                      <span className={classes.visuallyHidden}>
                        {order === "desc"
                          ? "sorted descending"
                          : "sorted ascending"}
                      </span>
                    ) : null}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filterCustomers()
              .splice(page * limit, limit)
              .map((row, index) => (
                <Row key={index} row={row} />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={filterCustomers().length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={closeSnackbar}
        anchorOrigin={{vertical:"bottom", horizontal:"center"}}
      >
        <Alert onClose={closeSnackbar} severity={alertSeverity} >
          {message}
        </Alert>
      </Snackbar>
    </Paper>
    </>
  );
};

export default CustomerListResults;
