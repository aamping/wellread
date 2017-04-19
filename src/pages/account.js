'use strict';

import React, {
  Component
} from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  AsyncStorage
} from 'react-native';

import Button from '../components/button';
import Header from '../components/header';

import Login from './login';

import styles from '../styles/common-styles.js';

const firebaseApp = require('firebase');


export default class account extends Component {

  constructor(props){

    super(props);
    this.state = {
      loaded: false,
    }

  }

  componentWillMount(){

      this.setState({
        user: firebaseApp.auth().currentUser,
        loaded: true
      });

  }

  render(){

    return (
      <View style={styles.container}>
        <Header text="Account" loaded={this.state.loaded} />
        <View style={styles.body}>
        {
          this.state.user &&
            <View style={styles.body}>
              <View style={page_styles.email_container}>
                <Text style={page_styles.email_text}>{this.state.user.email}</Text>
              </View>
              <Button
                  text="Logout"
                  onpress={this.logout.bind(this)}
                  button_styles={styles.primary_button}
                  button_text_styles={styles.primary_button_text} />
            </View>
        }
        </View>
      </View>
    );
  }

  async logout(){
    try{
      await firebaseApp.auth().signOut();
        // Sign-out successful.
        setTimeout(() => {
            this.props.navigator.push({
                name: "Login"
            })
         }, 1500);
    }
    catch(error) {
      // An error happened.
      alert ('signed out error', error);

    }
  }

}

const page_styles = StyleSheet.create({
  email_container: {
    padding: 20
  },
  email_text: {
    fontSize: 18
  }
});

AppRegistry.registerComponent('account', () => account);
