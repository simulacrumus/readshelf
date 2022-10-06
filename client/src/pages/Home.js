import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import RecentlyViewedBooks from '../components/book/RecentlyViewedBooks'
import BestSellerBooks from '../components/book/BestSellerBooks'
import Loading from '../components/layout/Loading'
import GridLayout from "../components/layout/GridLayout";
import SearchBox from '../components/book/SearchBox'

const Home = ({
  auth: {user, isLoading},
  profile
}) => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);
    const SearchAndBestSellerBooks = () => {
        return(
            <>
                <SearchBox />
                <BestSellerBooks /> 
            </>
        )
    }
    
    return (
        isLoading.user ? <Loading /> :
        <>
            <GridLayout
                leftComponent={SearchAndBestSellerBooks}
                rightComponent={RecentlyViewedBooks}
            />
        </>
    )
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
});

export default connect(mapStateToProps)(Home)