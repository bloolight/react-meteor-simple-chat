# react-meteor-simple-chat
A simple, demo chat app, created with Meteor v1.6 + React v16.3 + MongoDB.
-
Used new (v16.3) Context API, instead of Redux.

## Features
- Login (Choose screen name; will create new one, if does not exist)
- Chat list (List all chat room where user is participant)
- Create Chat Room (Set title, description, and pick participants)
- Chat Room Details (Open chat room, display details, messages, and participants)
- Create message, edit and delete own messages, add additional participants
- Delete Chat Room
- Update User Details (Initially, only username is created. On this screen user is able to update additional details)

## 3rd party packages used
- react-bootstrap (npm - bootstrap components built with React)
- react-toastify (npm - simple, styled toast messages)
- react-meteor-data (atmospherejs - an integration between React and Tracker)

## Running
- Install Meteor
- Clone repo `git clone git@github.com:nermand/react-meteor-simple-chat.git` and `cd react-meteor-simple-chat`
- Install NPM modules `meteor npm install`
- Run Meteor `meteor`
