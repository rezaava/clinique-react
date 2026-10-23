import React from "react";
import { Navigate, Outlet } from "react-router-dom";

class AuthCheckComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: false,
            authenticated: false
        };
    }

    componentDidMount() {
        const token = localStorage.getItem("token");

        this.setState({
            checked: true,
            authenticated: !!token
        });        
    }

    render() {
        if (!this.state.checked) {
            return null;
        }

        if (!this.state.authenticated) {
            return <Navigate to="/login" replace />;
        }

        return <Outlet />;
    }
}

export default AuthCheckComponent;