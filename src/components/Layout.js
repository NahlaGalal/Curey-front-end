import React, { Fragment, Component } from "react";
import NavigationBar from "./layout/NavigationBar";
import Footer from "./layout/Footer";
import Navbar from "./layout/Nav";

class Layout extends Component {
  state = {
    notificationList: false,
    userThumbnailList: false
  };

  hideLists = () =>
    this.setState({ userThumbnailList: false, notificationList: false });

  render() {
    return (
      <div onClick={this.hideLists}>
        <NavigationBar
          notificationList={this.state.notificationList}
          userThumbnailList={this.state.userThumbnailList}
          toggleNotifocationsList={e => {
            e.stopPropagation();
            this.setState({
              notificationList: !this.state.notificationList,
              userThumbnailList: false
            });
          }}
          toggleUserThumbnailList={e => {
            e.stopPropagation();
            this.setState({
              userThumbnailList: !this.state.userThumbnailList,
              notificationList: false
            });
          }}
          hideLists={this.hideLists}
        />
        <Navbar />
        {this.props.children}
        <Footer />
      </div>
    );
  }
}

export default Layout;
