import React from 'react';
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import Loading from '../components/layout/Loading';

const PrivateRoute = ({
  component: Component,
  auth: { isAuthenticated, isLoading, emailVerified },
  profile
}) => {
  if (isLoading.login || isLoading.user || profile.isLoading.loadProfile) return <Loading />;
  if (!isAuthenticated) return <Navigate to="/login" />;
  if (!emailVerified) return <Navigate to="/verify-email-alert" />

  return <Component />;
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps)(PrivateRoute);