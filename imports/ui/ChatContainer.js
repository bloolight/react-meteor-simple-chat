import { PropTypes } from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, ButtonGroup, Col, Glyphicon, Grid, Row } from 'react-bootstrap';

import { WithRootContext } from '../context/WithContext';
import ChatList from './ChatList';

class ChatContainer extends Component {
  constructor(props) {
    super(props);

    this.handleChatClick = this.handleChatClick.bind(this);
    this.handleCreateChat = this.handleCreateChat.bind(this);
  }

  handleChatClick(chat) {
    this.props.history.push(`/chats/${chat._id}`);
  }

  handleCreateChat() {
    this.props.history.push(`/create`);
  }

  render() {
    const {
      state: { user },
      actions: {handleLogout }
    } = this.props.context;

    return (
      <div className="chat-container">
        <Grid>
          <h2>
            Hello, {user.username}
            <Link to={`users/${user._id}`}>
              <Button bsStyle="link">
                Edit user details <Glyphicon glyph="edit" />
              </Button>
            </Link>
          </h2>
          <Row className="show-grid">
            <Col xs={12} md={8}>
              <ChatList user={user} handleChatClick={this.handleChatClick}></ChatList>
            </Col>
            <Col xs={12} md={4}>
              <ButtonGroup vertical>
                <Button bsStyle="primary" onClick={this.handleCreateChat}>Create new chat</Button>
                <Button bsStyle="link" onClick={handleLogout}>Logout</Button>
              </ButtonGroup>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

ChatContainer.propTypes = {
  context: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
}

export default WithRootContext(ChatContainer);
