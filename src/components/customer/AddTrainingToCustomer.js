import { React, useState } from "react";
import { Button, Dialog, makeStyles } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { DataGrid } from "@material-ui/data-grid";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

function AddTrainingToCustomer(props) {
  const useStyles = makeStyles((theme) => ({
    form: {
      display: "flex",
      margin: "auto",
      marginBlockEnd: "1vh",
      width: "100%",
    },
    formControl: {
      marginTop: theme.spacing(2),
      width: "100%",
    },
  }));

  const classes = useStyles();

  const getAvailableTrainingActivities = () => {
    return [
        "Gym training",
        "Fitness",
        "Spinning",
        "Zumba",
        "Jogging",
        "Boxing",
        "Pilates",
        "Swimming",
        "Cardio",
        "Cycling",
        "Flexibility",
        "Martial Arts",
    ]
  };

  const getAvailableTrainingDurations = () => {
    return [
        30,
        45,
        50,
        60,
        75,
        90,
    ]
  }

  const [openDialogue, setOpenDialog] = useState(false);
  const [training, setTraining] = useState([{
    date: "",
    duration: 0,
    activity: "",
  }]);

  const inputChanged = (e) => {
      console.log(e.target.name);
      console.log(e.target.value);
      setTraining({ ...training, [e.target.name]: [e.target.value] });
  };

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleSave = () => {
    props.addTrainingToCustomer(training);
    setOpenDialog(false);
  };

  return (
    <>
      <Button color="primary" sx={{ margin: 1 }} onClick={handleClickOpen}>ADD TRAINING</Button>
      <Dialog open={openDialogue} onClose={handleClose} fullWidth>
        <DialogTitle>NEW TRAINING</DialogTitle>
        <DialogContent>
          <form noValidate className={classes.form}>
            <FormControl className={classes.formControl}>
              <Select inputProps={{ name: "activity", id: "activity" }} onChange={inputChanged}>
                {getAvailableTrainingActivities().map((activity, index) => 
                  <MenuItem key={index} value={activity} >{activity}</MenuItem>
                  )}
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>  
              <Select inputProps={{ name: "duration", id: "duration" }} onChange={inputChanged}>
                {getAvailableTrainingDurations().map((duration, index) => 
                  <MenuItem key={index} value={duration} >{duration}</MenuItem>
                  )}
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <Select value="activity" inputProps={{ name: "max-width", id: "max-width" }}>
                <MenuItem value="activity" >Activity</MenuItem>
              </Select>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="inherit">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AddTrainingToCustomer;
