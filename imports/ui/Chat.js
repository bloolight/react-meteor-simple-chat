import { PropTypes } from 'prop-types';
import React, { Component } from 'react';
import { Col, Grid, Row, ListGroup, ListGroupItem } from 'react-bootstrap';
import { withTracker } from 'meteor/react-meteor-data';
import { toast } from 'react-toastify';

import * as ChatMessages from '../api/chatMessage';
import * as ChatRooms from '../api/chatRooms';
import UsersDropdown from './UsersDropdown';
import ChatMessage from './ChatMessage';
import BackToChatsButton from './BackToChatsButton';
import MessageList from './MessageList';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatId: null
    }

    this.addMessage = this.addMessage.bind(this);
  }


  componentWillMount() {
    const { id } = this.props.match.params;
    this.setState({chatId: id})
  }


  addMessage(message) {
    console.info('add message',  message);
    ChatMessages.addMessage(
      this.state.chatId,
      'userID',
      message,
      (err) => {
        if (err) {
          return toast.error('There was an error');
        }
      }
    );
  }
  render() {

    const { chatRoomInfo, messages } = this.props;
    const chatMembers = chatRoomInfo.members || [];

    const chatRoomMembers = chatMembers.map(member => {
      return {
        _id: member,
        name: `User ${member}`
      }
    });

    return (
      <div className="main-chat-screen">
        <Grid>
          <Row className="show-grid">
            <Col xs={3} xsOffset={9}>
              <BackToChatsButton />
            </Col>
          </Row>
          <Row className="show-grid">
            <Col xs={12} md={8}>
              <h3>{ chatRoomInfo.title }</h3>
              <MessageList messages={messages} />
            </Col>
            <Col xs={12} md={4}>
              <h3>Participants</h3>
              <ListGroup>
                {chatRoomMembers.map(user => {
                  return <ListGroupItem key={user._id}>{user.name}</ListGroupItem>
                })}
              </ListGroup>
              <UsersDropdown title="Add User to Chat"></UsersDropdown>
            </Col>
          </Row>
        </Grid>
        <ChatMessage addMessage={this.addMessage}/>

        <pre>{JSON.stringify(chatRoomInfo, null, ' ')}</pre>
        <pre>{JSON.stringify(messages, null, ' ')}</pre>
      </div>
    );
  }
}

Chat.propTypes = {
  match: PropTypes.object.isRequired,
  messages: PropTypes.array,
  chatRoomInfo: PropTypes.object.isRequired
}

export default withTracker((props) => {
  const chatId = props.match.params.id;
  return {
    messages: ChatMessages.getMessages(chatId),
    chatRoomInfo: ChatRooms.getChatRoom(chatId)
  }
})(Chat);
