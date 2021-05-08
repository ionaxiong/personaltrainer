import React, { forwardRef, useState } from 'react';
import { 
    Button, 
    Dialog,
    ListItemText,
    ListItem,
    List,
    Divider,
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Slide, 
    makeStyles
    } from '@material-ui/core';
import CloseIcon from "@material-ui/icons/Close";

function AddCustomer (props) {
    const useStyles = makeStyles((theme) => ({
        appBar: {
            position: "relative",
        },
        title: {
            marginLeft: theme.spacing(2),
            flex: 1,
        },
    }));

    const Transition = forwardRef(function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
    });
    
    const classes = useStyles();
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
        props.AddCustomer(customer);
        setOpenDialogue(false);
    }

    return (
        <>
            <Button
                color="primary"
                variant="contained"
                onClick={handleClickOpen}
            >
                ADD CUSTOMER
            </Button>
            <Dialog 
                fullScreen
                open={openDialogue}
            >

            </Dialog>
        </>
    )
}

export default AddCustomer;