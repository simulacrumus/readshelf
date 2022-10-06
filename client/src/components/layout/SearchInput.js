import React from 'react';

const SearchInput = ({onChange, value}) => (
    <input
        type="search"
        name="search"
        onChange={onChange}
        placeholder='Search by book title, author or ISBN'
        value={value}
        style={{
            width: "100%",
            border: '.5px solid rgb(200, 200, 200)',
            borderRadius: "10px 0 0 10px",
            borderRight:'0',
            font: 'inherit',
            letterSpacing: 'inherit',
            color: 'currentColor',
            boxSizing: 'contentBox',
            height: '3em',
            display: 'block',
            minWidth: 0,
            padding: '16.5px 14px'
        }}
        className='search-input'
    />
);

export default SearchInput;