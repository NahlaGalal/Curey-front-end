import React, { Fragment, Component } from "react";
import NavigationBar from "./layout/NavigationBar";
import Footer from "./layout/Footer";
import Navbar from "./layout/Nav";

class Layout extends Component {
  state = {
    notificationList: false,
    userThumbnailList: false
  };

  hideLists = () => this.setState({userThumbnailList: false, notificationList: false})

  render() {
    return (
      <Fragment>
        <NavigationBar
          notificationList={this.state.notificationList}
          userThumbnailList={this.state.userThumbnailList}
          toggleNotifocationsList={() => this.setState({notificationList: !this.state.notificationList})}
          toggleUserThumbnailList={() => this.setState({userThumbnailList: !this.state.userThumbnailList})}
          onClick={this.hideLists}
        />
        <Navbar onClick={this.hideLists}/>
        {this.props.children}
        <Footer onClick={this.hideLists}/>
      </Fragment>
    );
  }
}

export default Layout;
