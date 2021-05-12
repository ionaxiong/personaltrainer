import { React, useState } from "react";
import Button from '@material-ui/core/Button';
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const DeleteTraining = (props) => {
    const [openDialog, setOpenDialog] = useState(false);

    const handleClickOpen = () => {
        setOpenDialog(true);
    }

    const handleClose = () => {
        setOpenDialog(false);
    }

    const trainingDeletion = () => {
        props.deleteTraining(props.trainingid)
        handleClose();
    }

    return(
        <>
            <IconButton aria-label="delete" onClick={handleClickOpen} >
                <DeleteIcon fontSize="small" />
            </IconButton>
            <Dialog 
                open={openDialog} 
                onClose={handleClose} 
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                >
                <DialogTitle sx={{fontSize: "1.25rem"}} id="alert-dialog-title" >DELETE BOOKMARK</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                    Are you sure that you want to delete this training? This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="inherit" >Cancel</Button>
                    <Button onClick={trainingDeletion} color="secondary" >Delete</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default DeleteTraining;