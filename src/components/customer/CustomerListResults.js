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
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

import TablePagination from "@material-ui/core/TablePagination";
import TableSortLabel from "@material-ui/core/TableSortLabel";

const useRowStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      borderBottom: "unset",
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
}));

const CustomerListResults = (props, { ...rest }) => {
  const [customers, setCustomers] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [sortBy, setSortBy] = useState("");
  const [sort, setSort] = useState("desc");
  const classes = useRowStyles();

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
        if (sortBy === "firstname") {
          return a.firstname.localeCompare(b.firstname);
        } else if (sortBy === "lastname") {
          return a.lastname.localeCompare(b.lastname);
        }
      });
  };

  const headCells = [
    { id: "firstname", label: "Fristname" },
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
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }

  return (
    <Paper {...rest}>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              {headCells.map((headCell) => (
                <TableCell
                  key={headCell.id}
                  sortDirection={sortBy === headCell.id ? sortBy : false}
                >
                  <TableSortLabel
                    active={sortBy === headCell.id}
                    direction={sortBy === headCell.id ? sort : "asc"}
                    onClick={() => setSortBy(headCell.id)}
                  >
                    {headCell.label}
                    {sortBy === headCell.id ? (
                      <span className={classes.visuallyHidden}>
                        {sort === "desc"
                          ? "sorted descending"
                          : "sorted ascending"}
                      </span>
                    ) : null}
                  </TableSortLabel>
                </TableCell>
              ))}
              {/* <TableCell />
              <TableCell onClick={() => setSortBy("firstname")}>
                Firstname
                <TableSortLabel
                  active={true} direction={'desc'}
                  />
              </TableCell> */}
              {/* <TableCell align="center" onClick={() => setSortBy("lastname")}>Lastname</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Phone</TableCell>
              <TableCell align="center">Address</TableCell>
              <TableCell align="center">Postcode</TableCell>
              <TableCell align="center">City</TableCell> */}
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
    </Paper>
  );
};

export default CustomerListResults;
