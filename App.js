import React from 'react';
import { Footer, FooterTab, Button, Text, Icon,  } from 'native-base';
import styles from './Styles';
import {createAppContainer, createBottomTabNavigator, createStackNavigator} from 'react-navigation';
import * as firebase from 'firebase';

import Home from './components/Home/Home';
import Request from './components/Request/Request';
import List from './components/List/List';

const navigationOptions = ({navigation}) => {
  return {
    headerStyle: {/*height: 40*/},
    headerTintColor: "black",
    headerTitleStyle: {color: "black"},
    headerBackTitle: null,
  };
}

const HomeNavigator = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: navigationOptions,
    },
  }
);

const RequestNavigator = createStackNavigator(
  {
    Request: {
      screen: Request,
      navigationOptions: navigationOptions,
    },
  }
);

const ListNavigator = createStackNavigator(
  {
    List: {
      screen: List,
      navigationOptions: navigationOptions,
    },
  }
);

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBE1mUsetgj9R3qidM5LCk7hvdl2zoo_G4",
    authDomain: "advantage-home.firebaseapp.com",
    databaseURL: "https://advantage-home.firebaseio.com",
    projectId: "advantage-home",
    storageBucket: "advantage-home.appspot.com",
    messagingSenderId: "694885915476"
};

firebase.initializeApp(firebaseConfig);

const TabNavigator = createBottomTabNavigator({
  Home: HomeNavigator,
  Request: RequestNavigator,
  List: ListNavigator,
},{
  tabBarPosition: "bottom",
  tabBarComponent: props => {
    return (
      <Footer>
        <FooterTab>
          <Button
            transparent
            onPress={() => props.navigation.navigate("Home")}>
            <Icon 
              name={props.navigation.state.index === 0 ? "home" : "home-outline"}
              type="MaterialCommunityIcons"
              style={{fontSize: 36, color: "black"}}
            />
            {/*<Text>Home</Text>*/}
          </Button>
          <Button
            vertical
            transparent
            onPress={() => props.navigation.navigate("Request")}>
            <Icon 
              name={props.navigation.state.index === 1 ? "add-circle" : "add-circle-outline"}
              type="MaterialIcons"
              style={{fontSize: 36, color: "black"}}
            />
            {/*<Text>Place a Request</Text>*/}
          </Button>
          <Button
            vertical
            transparent
            onPress={() => props.navigation.navigate("List")}>
            <Icon 
              name={props.navigation.state.index === 2 ? "person" : "person-outline"}
              type="MaterialIcons"
              style={{fontSize: 36, color: "black"}}
            />
            {/*<Text>About</Text>*/}
          </Button>
        </FooterTab>
      </Footer>
    );
  }
})

export default createAppContainer(TabNavigator);