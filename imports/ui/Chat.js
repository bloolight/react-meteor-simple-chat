import { PropTypes } from 'prop-types';
import React, { Component } from 'react';
import {
  Button,
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
      chatId: null,
      message: null,
      user: null
    }

    this.addMessage = this.addMessage.bind(this);
    this.addUser = this.addUser.bind(this);
    this.deleteMessage = this.deleteMessage.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleMessageClick = this.handleMessageClick.bind(this);
    this.renderDeleteChatButton = this.renderDeleteChatButton.bind(this);
  }

  componentWillMount() {
    const { id } = this.props.match.params;
    const { user } = this.props.context.state;

    this.setState({
      chatId: id,
      user
    })
  }

  addMessage(message) {
    const { user } = this.state;

    if (this.state.message) {
      ChatMessagesApi.editMessage(
        this.state.message._id,
        message,
        (err) => {
          if (err) {
            return toast.error('There was an error');
          }
        }
      );
      return this.setState({ message: null });
    }

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
    this.setState({ message: null });
  }

  deleteMessage(messageId) {
    ChatMessagesApi.deleteMessage(
      messageId,
      err => {
        if (err) {
          return toast.error('Error while deleting message');
        }

        this.setState({ message: null });
      }
    );
  }

  handleMessageClick(message) {
    const { user } = this.state;
    if (user._id !== message.userId) {
      return;
    }

    this.setState({ message });
  }

  handleDelete() {
    this.props.history.push('/');

    ChatRoomsApi.deleteChat(
      this.state.chatId,
      err => {
        if (err) {
          return toast.error('Error deleting chat room');
        }
      }
    )
  }

  addUser(userId) {
    ChatRoomsApi.addChatMember(this.state.chatId, userId);
  }

  renderDeleteChatButton() {
    const { chatRoomInfo } = this.props;
    const { user } = this.state;

    if (chatRoomInfo.owner !== user._id) {
      return null;
    }

    return (
      <React.Fragment>
        <br/><br/>
        <Button
          className="pull-right"
          type="button"
          bsStyle="danger"
          onClick={this.handleDelete}>
          Delete
        </Button>
      </React.Fragment>
    )
  }

  render() {
    const { allUsers, chatRoomInfo, chatRoomMembers, messages } = this.props;
    const membersIds = chatRoomMembers.map(c => c._id);

    return (
      <div className="main-chat-screen">
        <BackToChatsButton className="pull-right" />
        { this.renderDeleteChatButton() }

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
              <MessageList messages={messages} onMsgClick={this.handleMessageClick} />
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
        <ChatMessage
          addMessage={this.addMessage}
          deleteMessage={this.deleteMessage}
          message={this.state.message}
        />
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
  chatRoomMembers: PropTypes.array,
  history: PropTypes.object.isRequired
}

export default withTracker((props) => {
  const chatId = props.match.params.id;
  const chatRoomInfo = ChatRoomsApi.getChatRoom(chatId);
  let chatRoomMembers = [];

  if (chatRoomInfo) {
    chatRoomMembers = UsersApi.getUsersByIds(chatRoomInfo.members)
  }

  return {
    messages: ChatMessagesApi.getMessages(chatId),
    chatRoomInfo,
    chatRoomMembers,
    allUsers: UsersApi.getUsers()
  }
})(WithRootContext(Chat));
