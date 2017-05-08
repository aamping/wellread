'use strict';

import React, {
  Component
} from 'react';

import {
  AppRegistry,
  View,
  ToolbarAndroid,
  ActivityIndicator,
    StyleSheet
} from 'react-native';

import { Header,Container,Title, Content, List, ListItem, InputGroup, Input, Icon, Text, Picker, Button } from 'native-base';
//comit

import DismissKeyboard from 'react-native-dismiss-keyboard';

import FBLoginView from '../components/FBLoginView'

//import Button from '../components/button';
//import Header from '../components/header';

import Signup from './signup';
import Account from './account';

//import firebaseApp from '../firebase';
import FireAuth from 'react-native-firebase-auth'; //https://github.com/SolidStateGroup/react-native-firebase-auth
import {FBLogin, FBLoginManager} from 'react-native-facebook-login';

import styles from '../styles/common-styles.js';

export default class login extends Component {

  constructor(props){
    super(props);

    this.state = {
      email: '',
      password: '',
      response: "",
      loading: false
    }
  }
  async login() {

        this.setState({
            loading: true
        });

        DismissKeyboard();

        try {
            await this.props.firebaseApp.auth().signInWithEmailAndPassword(this.state.email, this.state.password);



            setTimeout(() => {
                this.props.navigator.push({
                    component: Account
                })
            }, 1500);
            this.setState({
                response: "Logged In!"
            });

        } catch (error) {
            this.setState({
                response: error.toString(),
                loading: false
            })
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode === 'auth/wrong-password') {
              alert('Wrong password.');
            } else {
              alert(errorMessage);
            }
        }

    }
  async fblogin(){

      this.setState({
          loading: true
      });

      DismissKeyboard();
      await FireAuth.facebookLogin();
      this.setState({
          response: "Logged In!"
      });

      setTimeout(() => {
          this.props.navigator.push({
              component: Account
          })
      }, 1500);
  }
  async Glogin(){

    this.setState({
        loading: true
    });

    DismissKeyboard();

    await FireAuth.googleLogin();
    this.setState({
        response: "Logged In!"
    });

    setTimeout(() => {
        this.props.navigator.push({
            component: Account
        })
    }, 1500);
  }


  goToSignup(){
    this.props.navigator.push({
        component: Signup
    })
  }

  render() {
      // The content of the screen should be inputs for a username, password and submit button.
      // If we are loading then we display an ActivityIndicator.
      const content = this.state.loading ?
      <View style={styles.body}>
      <ActivityIndicator size="large"/>
      </View> :

      <Content>
                     <List>
                       <ListItem>
                           <InputGroup>
                           <Icon name="ios-person" style={{ color: '#0A69FE' }} />
                           <Input
                            onChangeText={(text) => this.setState({email: text})}
                            value={this.state.email}
                            placeholder={"Email Address"} />
                            </InputGroup>
                      </ListItem>
                      <ListItem>
                          <InputGroup>
                            <Icon name="ios-unlock" style={{ color: '#0A69FE' }} />
                          <Input
                            onChangeText={(text) => this.setState({password: text})}
                            value={this.state.password}
                            secureTextEntry={true}
                            placeholder={"Password"} />
                          </InputGroup>
                     </ListItem>
                    </List>
                    <Button style={styles_primaryButton} onPress={this.login.bind(this)}>
                      <Text> Login </Text>
                    </Button>
                    <Button onPress={this.goToSignup.bind(this)} style={styles_primaryButton}>
                      <Text> New Here? </Text>
                    </Button>
                    <Button onPress={this.Glogin.bind(this)} style={styles_primaryButton}>
                      <Text> Google Login </Text>
                    </Button>

                    <FBLogin

                        ref={(fbLogin) => { this.fbLogin = fbLogin }}
                        loginBehavior={FBLoginManager.LoginBehaviors.Native}
                        permissions={["email","user_friends"]}
                       
                      />

            </Content>
          ;

      // A simple UI with a toolbar, and content below it.
          return (
                    <Container>
                              <Header>
                                <Title> Login </Title>
                             </Header>

                    {content}
                  </Container>
                  );
    }
}

const styles_primaryButton = StyleSheet.flatten(styles.primaryButton);

AppRegistry.registerComponent('login', () => login);
