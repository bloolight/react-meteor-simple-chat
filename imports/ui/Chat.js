import { PropTypes } from 'prop-types';
import React, { Component } from 'react';
import {
  Col,
  Grid,
  Row,
  ListGroup,
  ListGroupItem,
  PageHeader
} from 'react-bootstrap';
import { withTracker } from 'meteor/react-meteor-data';
import { toast } from 'react-toastify';

import { WithRootContext } from '../context/WithContext';
import * as ChatMessagesApi from '../api/chatMessage';
import * as ChatRoomsApi from '../api/chatRooms';
import * as UsersApi from '../api/users';
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
    this.addUser = this.addUser.bind(this);
  }

  componentWillMount() {
    const { id } = this.props.match.params;
    this.setState({chatId: id})
  }

  addMessage(message) {
    const { user } = this.props.context.state;

    ChatMessagesApi.addMessage(
      this.state.chatId,
      user._id,
      message,
      (err) => {
        if (err) {
          return toast.error('There was an error');
        }
      }
    );
  }

  addUser(userId) {
    ChatRoomsApi.addChatMember(this.state.chatId, userId);
  }

  render() {
    const { allUsers, chatRoomInfo, chatRoomMembers, messages } = this.props;
    const membersIds = chatRoomMembers.map(c => c._id);

    return (
      <div className="main-chat-screen">
        <BackToChatsButton className="pull-right" />
        <Grid>
          <Row className="show-grid">
            <Col xs={9}>
              <PageHeader>
              { chatRoomInfo.title } <small>{ chatRoomInfo.desc }</small>
              </PageHeader>
            </Col>
            <Col xs={3}>
              <h3>Participants</h3>
            </Col>
          </Row>
          <Row className="show-grid">
            <Col xs={12} md={8}>
              <MessageList messages={messages} />
            </Col>
            <Col xs={12} md={4}>
              <ListGroup>
                {chatRoomMembers.map(user => {
                  return <ListGroupItem key={user._id}>{user.username}</ListGroupItem>
                })}
              </ListGroup>
              <UsersDropdown
                title="Add User to Chat"
                users={allUsers}
                disable={membersIds}
                handleSelect={this.addUser}
              />
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
  allUsers: PropTypes.array,
  match: PropTypes.object.isRequired,
  messages: PropTypes.array,
  context: PropTypes.object,
  chatRoomInfo: PropTypes.object.isRequired,
  chatRoomMembers: PropTypes.array
}

export default withTracker((props) => {
  const chatId = props.match.params.id;
  const chatRoomInfo = ChatRoomsApi.getChatRoom(chatId);

  return {
    messages: ChatMessagesApi.getMessages(chatId),
    chatRoomInfo,
    chatRoomMembers: UsersApi.getUsersByIds(chatRoomInfo.members),
    allUsers: UsersApi.getUsers()
  }
})(WithRootContext(Chat));
