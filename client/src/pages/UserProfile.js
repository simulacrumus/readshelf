import { connect } from 'react-redux'
import React, { useEffect } from "react"
import UserProfileSummary from '../components/user_profile/UserProfileSummary';
import GridLayout from "../components/layout/GridLayout";
import UserProfileTabs from "../components/user_profile/UserProfileTabs";
import { resetAllAlerts } from '../actions/errors';

const UserProfile = (
    {resetAllAlerts}
) => {
    useEffect(() => {
        window.scrollTo(0, 0)
        resetAllAlerts()
      }, [resetAllAlerts])

    return (
        <GridLayout
            leftComponent={UserProfileSummary}
            rightComponent={UserProfileTabs}
            reverseGrid={true}
        />
    )
};

const mapStateToProps = state => ({
    profile: state.profile
});

export default connect(mapStateToProps, {resetAllAlerts})(UserProfile);