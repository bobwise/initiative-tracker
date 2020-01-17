import React, { Component } from "react";
import "./ChatLog.scss";
import classNames from "classnames";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

class ChatLog extends Component {
  render() {
    var chatTips;

    if (this.props.visible) {
      chatTips = (
        <div
          className={classNames({
            hidden: this.props.hidden,
            chat: true
          })}
        >
          {this.props.children}
        </div>
      );
    }

    return (
      <ReactCSSTransitionGroup
        transitionName="chatTips"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={250}
      >
        {chatTips}
      </ReactCSSTransitionGroup>
    );
  }
}

export default ChatLog;
