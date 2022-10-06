import React , {useState } from "react"
import SearchInput from "../layout/SearchInput";
import SearchButton from "../layout/SearchButton";
import { useNavigate } from 'react-router-dom'

const SearchBox = ({value}) => {

    const navigate = useNavigate();

    const [searchKey, setSearchKey] = useState(value || '')

    const onChange = e => {
        setSearchKey(e.target.value)
    };

    const onSubmit = e => {
        e.preventDefault();
        if(searchKey)
            navigate(`/search/${searchKey}`)
    };

    return (
        <form
            onSubmit={onSubmit}
            style={{
                display: 'flex',
                margin: '10px 0'
            }}
        >
           <SearchInput onChange={onChange} value={searchKey}/>
           <SearchButton />
        </form>
    )
}

export default SearchBox;