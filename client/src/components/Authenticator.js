import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { getToken } from "./helpers";

class Auth extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: undefined
    };
  }

  componentDidMount() {
    this.getUser();
  }

  getUser() {
    const jwt = getToken();
    if (!jwt) {
      this.setState({
        user: null
      });
      return;
    }

    console.log(jwt);

    axios
      .get("http://localhost:5000/api/users/verify", {
        headers: {
          Authorization: getToken(),
          "Content-Type": "application/json"
        }
      })
      .then(res => {
        console.log(res);
        this.setState({
          user: res.data
        });
      })
      .catch(err => {
        localStorage.removeItem("JWT");
        console.error("verify error: ", err);
        this.props.history.push("/users/login");
      });
  }

  render() {
    const { user } = this.state;
    if (user === undefined) {
      return <h1>loading...</h1>;
    }
    if (user === null) {
      this.props.history.push("/users/login");
    }
    return this.props.children;
  }
}

export default withRouter(Auth);
