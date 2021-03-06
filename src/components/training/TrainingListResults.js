import React, { useState, useEffect } from "react";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { Alert, Snackbar } from "@material-ui/core";
import DeleteTraining from "./DeleteTraining";
import { DataGrid, GridToolbar } from "@material-ui/data-grid";
import "./training.css";

function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });
  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return windowSize;
}

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      borderBottom: "unset",
      h6: "1.25rem",
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
    [theme.breakpoints.down("xs")]: {
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
  const size = useWindowSize();

  const openSnackbar = () => {
    setOpen(true);
  };

  const closeSnackbar = () => {
    setOpen(false);
  };

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
              customer: "",
            };
          } else {
            return {
              id: x.id.toString(),
              activity: x.activity,
              date: x.date,
              duration: x.duration,
              customer: x.customer.firstname + " " + x.customer.lastname,
            };
          }
        });
        setTrainings(trainingWithCustomerDetails);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchTrainings();
  }, []);

  const deleteTraining = (trainingId) => {
    fetch(`https://customerrest.herokuapp.com/api/trainings/${trainingId}`, {
      method: "DELETE",
    })
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
  };

  const columns = [
    {
      field: "actions",
      headerName: "Actions",
      width: size.width > 1000 ? 200 : 20,
      align: "center",
      headerAlign: "center",
      filterable: false,
      sortable: false,
      editable: false,
      renderCell: (params) => (
        <DeleteTraining
          trainingid={params.id}
          deleteTraining={deleteTraining}
        />
      ),
    },
    { field: "activity", flex: 1, headerName: "Activity", filterable: true },
    {
      field: "date",
      flex: 1,
      headerName: "Date",
      filterable: true,
      renderCell: (params) => (
        <div>
          {moment(params.date)
            ? moment(params.date).format("ddd DD/MM/YYYY, hh:mm A")
            : ""}
        </div>
      ),
      hide: size.width < 1000,
    },
    {
      field: "duration",
      flex: 1,
      headerName: "Duration (mins)",
      filterable: true,
      hide: size.width < 1000,
    },
    { field: "customer", flex: 1, headerName: "Customer", filterable: true },
  ];

  return (
    <>
      <Paper {...rest} className={classes.root}>
        {trainings.length > 0 && (
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
          ></DataGrid>
        )}
        <Snackbar
          open={open}
          autoHideDuration={4000}
          onClose={closeSnackbar}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert onClose={closeSnackbar} severity={alertSeverity}>
            {message}
          </Alert>
        </Snackbar>
      </Paper>
    </>
  );
};

export default TrainingListResults;
