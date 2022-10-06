import React, { Fragment } from 'react';
import { Backdrop, CircularProgress } from "@mui/material";
const Loading = () => (
  <Fragment>
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={true}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  </Fragment>
);

export default Loading;