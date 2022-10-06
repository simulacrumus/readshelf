import React from 'react';
import { Snackbar as MaterialSnackbar, Alert, Slide } from "@mui/material";
const SnackBar = ({message, alertType}) => (
    <MaterialSnackbar
        sx={{

        }}
        open={Boolean(message)} 
        autoHideDuration={3000}
        TransitionComponent={(props) => <Slide {...props}/>}
        direction="left"
    >
        <Alert severity={alertType}>{message}</Alert>
    </MaterialSnackbar>
);

export default SnackBar;