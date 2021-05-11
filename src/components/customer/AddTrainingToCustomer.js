import { React, useState }from "react";
import { Button, Dialog } from '@material-ui/core';
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { DataGrid } from "@material-ui/data-grid";
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Switch from '@material-ui/core/Switch'


function AddTrainingToCustomer(props) {
    const [openDialogue, setOpenDialog] = useState(false);
    const [training, setTrainings] = useState({
        date: "",
        duration: 0,
        activity: "",
    })

    const inputChanged = (e) => {
        setTrainings({...training, [e.target.name]: [e.target.value]});
        handleClose();
    }

    const handleClickOpen = () => {
        setOpenDialog(true);
    }

    const handleClose = () => {
        setOpenDialog(false);
    }

    const handleSave = () => {
        props.addTrainingToCustomer(training);
        setOpenDialog(false);
    }

    return (
        <>
       
         <Button color="primary" sx={{margin: 1}} onClick={handleClickOpen} >ADD TRAININGS</Button>
         <Dialog open={openDialogue} onClose={handleClose} >
             <DialogTitle>NEW TRAINING</DialogTitle>
             <DialogContent>
                <form noValidate>
                    <FormControl >
                    {/* <InputLabel htmlFor="max-width">maxWidth</InputLabel> */}
                    <Select
                        autoFocus
                        inputProps={{
                        name: 'max-width',
                        id: 'max-width',
                        }}
                    >
                        <MenuItem >false</MenuItem>
                        <MenuItem>xs</MenuItem>
                        <MenuItem>sm</MenuItem>
                        <MenuItem>md</MenuItem>
                        <MenuItem>lg</MenuItem>
                        <MenuItem>xl</MenuItem>
                    </Select>
                    </FormControl>
                </form>
                {/* <DataGrid
                {...training}>
                </DataGrid> */}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="inherit" >
                    Cancel
                </Button>
                <Button onClick={handleSave} color="primary" >
                    Save
                </Button>
            </DialogActions>
         </Dialog>
        </>
    )
}

export default AddTrainingToCustomer;