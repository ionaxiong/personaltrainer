import React, { useState } from 'react';
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

function DeleteCustomer (props) {
    const [openDialog, setOpenDialog] = useState(false);
    // const [deletionConfirmation, setDeletionConfirmation] = useState(false);
    
    const handleClickOpen = () => {
        setOpenDialog(true);
    }

    const handleClose = () => {
        setOpenDialog(false)
    }

    const customerDeletion = () => {
        props.deleteCustomer();
        handleClose();
    }

    // const handleCustomerDeletion = () => {
    //     deletionConfirmation === true
    //     ? customerDeletion()
    //     : handleClose();
    // }
 
    {/* onClick={() => props.deleteCustomer(row.links[1].href)} */}

    // cellRendererFramework: (params) => (
    //     <IconButton color="secondary" onClick={() => deleteCar(params.value)}>
    //       <DeleteIcon />
    //     </IconButton>
    //   ),
 
    return (
        <>
            <IconButton aria-label="delete"  onClick={handleClickOpen}>
                <DeleteIcon fontSize="small" />
            </IconButton>
            <Dialog
                open={openDialog}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
            </Dialog>
            <DialogTitle id="alert-dialog-title"> {"Delete bookmark"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description" >
                    Are you sure that you want to delete this customer? This action cannot be undone.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="inherit" variant="outlined" >Cancel</Button>
                <Button onClick={customerDeletion} color="secondary" variant="outlined" >Delete</Button>
            </DialogActions>
        </>
    )
}

export default DeleteCustomer;