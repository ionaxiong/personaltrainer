import React, { useState } from 'react';
import { Button, Dialog } from '@material-ui/core';
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

function AddCustomer (props) {
    const [openDialogue, setOpenDialogue] = useState(false);
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
        setOpenDialogue(true);
    };

    const handleClose = () => {
        setOpenDialogue(false);
    };

    const handleSave = () => {
        props.addCustomer(customer);
        setOpenDialogue(false);
    }

    return (
        <>
            <Button
                color="primary"
                variant="contained"
                onClick={handleClickOpen}
                sx={{ margin: 1 }}
            >
                ADD CUSTOMER
            </Button>
            <Dialog 
                open={openDialogue}
                onClose={handleClose}
            >
                <DialogTitle id="form-dialog-title" >NEW CUSTOMER</DialogTitle>
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

export default AddCustomer;