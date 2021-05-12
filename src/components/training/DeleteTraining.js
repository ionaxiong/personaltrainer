import { React, useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const DeleteTraining = () => {

    return(
        <>
            <IconButton aria-label="delete" >
                <DeleteIcon fontSize="small" />
            </IconButton>
        </>
    )
}

export default DeleteTraining;