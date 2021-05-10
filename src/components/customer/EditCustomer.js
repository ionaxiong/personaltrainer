import React, { useState } from "react";
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import { Button, Dialog } from '@material-ui/core';
import TextField from "@material-ui/core/TextField";
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';


function EditCustomer(props) {
    const [openDialog, setOpenDialog] = useState(false);
    const [customer, setCustomer] = useState({
        firstname: "",
        lastname: "",
        streetaddress: "",
        postcode: "",
        city: "",
        email: "",
        phone: "",
    })

    const inputChanged = (e) => {
        setCustomer({...customer, [e.target.name]: e.target.value });
    };

    const handleClickOpen = () => {
        setCustomer({
            firstname: props.customer.firstname,
            lastname: props.customer.lastname,
            streetaddress: props.customer.streetaddress,
            postcode: props.customer.postcode,
            city: props.customer.city,
            email: props.customer.email,
            phone: props.customer.phone,
        })
        setOpenDialog(true);
    }

    const handleClose = () => {
        setOpenDialog(false);
    }

    const saveCustomer = () => {
        props.editCustomer(props.customerId, customer);
        setOpenDialog(false);
    }

    return (
        <>
        <IconButton aria-label="edit" onClick={handleClickOpen} >
              <EditIcon fontSize="small" />
        </IconButton>
        <Dialog 
            open={openDialog} 
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
        >
            <DialogTitle id="form-dialog-title" >EDIT CUSTOMER</DialogTitle>
            <DialogContent>
                <TextField 
                    autoFocus
                    margin="dense"
                    label="Firstname"
                    value={customer.firstname}
                    name="firstname"
                    onChange={inputChanged}
                    fullWidth        
                />
                 <TextField
                         autoFocus
                         margin="dense"
                         label="Lastname"
                         value={customer.lastname}
                         name="lastname"
                         onChange={inputChanged}
                         fullWidth
                    />
                    <TextField
                         autoFocus
                         margin="dense"
                         label="Email"
                         value={customer.email}
                         name="email"
                         onChange={inputChanged}
                         fullWidth
                    />
                    <TextField
                         autoFocus
                         margin="dense"
                         label="Phone"
                         value={customer.phone}
                         name="phone"
                         onChange={inputChanged}
                         fullWidth
                    />
                    <TextField
                         autoFocus
                         margin="dense"
                         label="Address"
                         value={customer.streetaddress}
                         name="streetaddress"
                         onChange={inputChanged}
                         fullWidth
                    />
                    <TextField
                         autoFocus
                         margin="dense"
                         label="Postcode"
                         value={customer.postcode}
                         name="postcode"
                         onChange={inputChanged}
                         fullWidth
                    />
                    <TextField
                         autoFocus
                         margin="dense"
                         label="City"
                         value={customer.city}
                         name="city"
                         onChange={inputChanged}
                         fullWidth
                    />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="inherit">
                    Cancel
                </Button>
                <Button onClick={saveCustomer} color="primary">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
        </>
    )
}

export default EditCustomer;