import React, { Component } from "react";
import "./ChatMessage.scss";
import classNames from "classnames";

class ChatMessage extends Component {
  render() {
    return (
      <div
        className={classNames({
          mine: this.props.source === "mine",
          yours: this.props.source === "yours",
          messages: true
        })}
      >
        <div
          className={classNames({
            message: true,
            last: this.props.last
          })}
        >
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default ChatMessage;
