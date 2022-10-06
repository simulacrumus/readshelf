import {Card, CardContent, Box,CardHeader, Typography, Divider } from "@mui/material";
import React from "react"
import StyledLink from "./StyledLink";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const EmptyListBox = ({ message}) => {
    return(
        <Card >
                <CardHeader
                    sx={{pb:0}}
                    title={message}
                />
                <CardContent
                    sx={{pt:2}}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        <StyledLink 
                            to={`/search`}
                           
                        >
                            <Typography
                                color="textSecondary"
                                gutterBottom
                                variant="subtitle2"
                                sx={{ display: 'flex', justifyContent: 'flex-end'}}
                            >
                                Search books 
                                <ArrowForwardIcon sx={{fontSize: '16px'}}/>
                            </Typography>
                        </StyledLink>
                    </Box>
                </CardContent>
                <Divider />
        </Card>
    )
}

export default EmptyListBox