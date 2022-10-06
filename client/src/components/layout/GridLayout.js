import React from "react"
import { Container, Grid } from '@mui/material';

const GridLayout = ({
    leftComponent: LeftComponent,
    rightComponent: RightComponent,
    reverseGrid
}) => {
    return(
        <Container maxWidth="md">
            <Grid
                container
                spacing={3}
            >
                <Grid
                    item
                    lg={Boolean(reverseGrid) ? 4 : 8}
                    md={Boolean(reverseGrid) ? 4 : 8}
                    xs={12}
                >
                    <LeftComponent />
                </Grid>
                <Grid
                    item
                    lg={Boolean(reverseGrid) ? 8 : 4}
                    md={Boolean(reverseGrid) ? 8 : 4}
                    xs={12}
                >
                    <RightComponent />
                </Grid>
            </Grid>
        </Container>
    );
};

export default GridLayout