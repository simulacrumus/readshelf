import { connect } from 'react-redux'
import React, { useEffect } from "react"
import { getPublicProfile } from '../actions/profile/getPublicProfile';
import Loading from '../components/layout/Loading';
import { Navigate, useParams } from 'react-router-dom'
import ProfileSummary from '../components/profile/ProfileSummary';
import ProfileTabs from '../components/profile/ProfileTabs';
import GridLayout from "../components/layout/GridLayout";

const Profile = ({
    getPublicProfile, 
    profile: {user, profile},
    publicProfile:{isLoading},
    auth
}) => {
    const { username } = useParams();
    useEffect(() => {
        getPublicProfile(username)
        window.scrollTo(0, 0)
    }, [getPublicProfile, username])

    const LoadedPublicProfileTabs = () => {
        return(
            <ProfileTabs profile={profile}/>
        )
    }

    return(
        isLoading.loadProfile || profile === null ? <Loading /> :
        auth.user._id === user._id ? <Navigate to="/profile" /> :
        <>
            <GridLayout
                leftComponent={ProfileSummary}
                rightComponent={LoadedPublicProfileTabs}
                reverseGrid={true}
            />
        </>
    );
};

const mapStateToProps = state => ({
    profile: state.publicProfile,
    auth: state.auth,
    publicProfile: state.publicProfile
});

export default connect(mapStateToProps, {getPublicProfile})(Profile);