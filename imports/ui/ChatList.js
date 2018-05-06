import { PropTypes } from 'prop-types';
import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Well } from 'react-bootstrap';
import { withTracker } from 'meteor/react-meteor-data';

import * as ChatRoomsApi from "../api/chatRooms";

class ChatList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { chatRooms, handleChatClick } = this.props;

    return (
      <React.Fragment>
        {chatRooms.length > 0
          ? <ListGroup className="chats-list">
              {chatRooms.map(chat => {
                return (
                  <ListGroupItem key={chat._id} onClick={handleChatClick.bind(null, chat)}>
                    {chat.title} ({chat.members ? chat.members.length : 0} participants)
                  </ListGroupItem>
                )
              })}
            </ListGroup>
          : <Well bsSize="large">Create a chat and it will show up here</Well>
        }
        <pre>{JSON.stringify(this.props.chatRooms, null, ' ')}</pre>
      </React.Fragment>
    );
  }
}

ChatList.propTypes = {
  chatRooms: PropTypes.array.isRequired,
  handleChatClick: PropTypes.func.isRequired
}

export default withTracker(() => {
  return {
    chatRooms: ChatRoomsApi.getAllChatRooms()
  }
})(ChatList);
