import React from "react"
import { connect } from 'react-redux'
import UserProfileDetails from './UserProfileDetails';
import UserPassword from './UserPassword';
import UserProfileSettings from './UserProfileSettings';
import DeleteAccount from './DeleteAccount'
import TabPanel from '../layout/TabPanel'

const UserProfileTabs = ({
    auth: {user}
}) => {
    const AccountPanel = () => {
        return(
            <>
                <UserPassword />
                <DeleteAccount />
            </>
        )
    }

    const panels = [
        {
            Component: UserProfileDetails,
            text: 'Info'
        },

        {
            Component: UserProfileSettings,
            text: 'Settings'
        },
        {
            Component: user.registerType === 'email' ?  AccountPanel : DeleteAccount,
            text: 'Account'
        }
    ]

    return (
        <TabPanel children={panels} />
    );
}

const mapStateToProps = state => ({
    auth: state.auth,
});

export default connect(mapStateToProps)(UserProfileTabs);