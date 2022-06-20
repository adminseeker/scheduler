import React from "react";
import { connect } from "react-redux";
import {  Route } from "react-router-dom";
import { useLocation, Navigate } from "react-router-dom";

const PrivateRoute = ({component:Component, isAuthenticated,loading,...rest}) => {
    let location = useLocation();
    return (
        <Route {...rest} render={(props)=>(
                (!isAuthenticated && !loading) ? ( 
                     <Navigate to="/login" state={{ from: location }} replace />
                    
                    ) : (
                        <Component  {...props}/>
                    )
                
        )} />
    )
}

const mapStateToProps = (state)=>({
    isAuthenticated:state.auth.isAuthenticated,
    loading:state.loading
})

export default connect(mapStateToProps)(PrivateRoute);