import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import React, { useState, } from "react"

const CustomPanel = (props) => {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

CustomPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

const a11yProps = (index) => {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const TabPanel = ({children}) => {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const CustomizedTabPanel = styled(CustomPanel)`
      & .css-19kzrtu {
            padding-left: 0;
            padding-right:0
        }
    `;

    let componentIndex= 0;

    return (
        <Box sx={{ width: '100%'}}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider'}}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    {(
                        children.map(item =>
                            <Tab label={item.text} key={item.text} {...a11yProps(item.text)} />
                        )
                    )}
                </Tabs>
            </Box>
            {(
                children.map(Item =>{
                    const Component = Item.Component
                    return (
                        <CustomizedTabPanel value={value} index={componentIndex++} key={Item.text}>
                            <Component />
                        </CustomizedTabPanel>
                    )
                })
            )}
        </Box>
    );
}

TabPanel.propTypes = {
    components: PropTypes.array
};

export default TabPanel