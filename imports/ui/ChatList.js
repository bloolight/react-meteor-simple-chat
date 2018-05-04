import { PropTypes } from 'prop-types';
import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

class ChatList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { chats, handleChatClick } = this.props;

    return (
      <ListGroup>
        {chats.map(chat => {
          return <ListGroupItem key={chat.id} onClick={handleChatClick.bind(null, chat)}>{chat.title}</ListGroupItem>
        })}
      </ListGroup>
    );
  }
}

ChatList.propTypes = {
  chats: PropTypes.array.isRequired ,
  handleChatClick: PropTypes.func.isRequired
}

export default ChatList;
