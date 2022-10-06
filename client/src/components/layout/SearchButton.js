import React from 'react';
import SearchIcon from '@mui/icons-material/Search';

const SearchButton = () => (
    <button
        type='submit'
        style={{
            backgroundColor:"#fff",
            border: ".5px solid rgb(200, 200, 200)",
            borderRadius: "0 10px 10px 0",
            borderLeft:'none',
            cursor: 'pointer',
            color: '',
            transition: 'all 0.25s',
            padding: '0 10px',
            "&:hover": {
                backgroundColor: "#003366"
            }
        }}
    >
        <SearchIcon />
    </button>
);

export default SearchButton;