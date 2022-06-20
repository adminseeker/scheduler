import React from "react";
import { connect } from 'react-redux';
import { useLocation, Navigate } from "react-router-dom";


const Landing = (props)=>{
    let location = useLocation();
    if (props.isAuthenticated) {
        return <Navigate to="/dashboard" state={{ from: location }} replace />;
    }
    
    return props.loading ? <h1>Loading ...</h1> :   <div>
       
      <h1>This is Landing Component!</h1>
    </div>
}

const mapStateToProps = (state, props) => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading,
});

export default connect(mapStateToProps)(Landing);

