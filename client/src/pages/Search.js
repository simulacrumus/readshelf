import { connect } from 'react-redux'
import React, { useEffect } from "react"
import { searchBooks } from '../actions/book/searchBooks'
import RecentlyViewedBooks from '../components/book/RecentlyViewedBooks'
import { useParams } from 'react-router-dom'
import SearchBox from '../components/book/SearchBox';
import SearchResult from '../components/book/SearchResult';
import GridLayout from '../components/layout/GridLayout';

const Search = ({
    books:{searchResult}, 
    searchBooks
}) => {
    const { query } = useParams();
    useEffect(() => {
        window.scrollTo(0, 0)
        if(query && query.toString().trim())
            searchBooks(query)
    }, [searchBooks, query])

    const SearchComponent = () => {
        return(
            <>
                <SearchBox value={query}/>
                <SearchResult books={searchResult}/>
            </>
        )
    }

    return (
        <GridLayout 
            leftComponent={SearchComponent}
            rightComponent={RecentlyViewedBooks}
        />
    )
}

const mapStateToProps = state => ({
    books: state.books
});

export default connect(mapStateToProps, {searchBooks})(Search);