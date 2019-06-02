import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Footer, FooterTab, Button, Text, Icon, } from 'native-base';
import styles from './Styles';
import { createSwitchNavigator, createAppContainer, createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import * as firebase from 'firebase';
import GlobalFont from 'react-native-global-font';

import Home from './components/Home/Home';
import Request from './components/Request/Request';
import CameraScreen from './components/Request/CameraScreen';
import Profile from './components/List/Profile';
import Login from './components/Login/Login';
import Signup from './components/Login/Signup';
import Loading from './components/Loading/Loading';
import ProfileItem from './components/List/ProfileItem';
import { GoogleSignIn } from 'expo';

const navigationOptions = ({ navigation }) => {
    return {
        headerStyle: {/*height: 40*/ },
        headerTintColor: "black",
        headerTitleStyle: { color: "black" },
        headerBackTitle: null,
    };
}

const HomeNavigator = createSwitchNavigator(
    {
        Home: {
            screen: Home,
        },
    }
);

const RequestNavigator = createStackNavigator(
    {
        CameraScreen: {
            screen: CameraScreen,
        },
        /* Request: {
          screen: Request,
          navigationOptions: navigationOptions,
        }, */
    }, {
        headerMode: 'none',
        navigationOptions: {
            headerVisible: false,
            header: null
        }
    }
);

const ListNavigator = createStackNavigator(
    {
        Profile: {
            screen: Profile,
            navigationOptions: navigationOptions,
        },
        ProfileItem: {
            screen: ProfileItem,
            navigationOptions: navigationOptions,
        }
    }
);

const LoginNavigator = createSwitchNavigator(
    {
        Login: {
            screen: Login,
            navigationOptions: navigationOptions,
        },
        Signup: {
            screen: Signup,
            navigationOptions: navigationOptions,
        }
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
}, {
        initialRouteName: 'Request',
        tabBarPosition: "bottom",
        tabBarComponent: props => {
            return (
                <Footer>
                    <FooterTab>
                        <Button
                            activeOpacity={1.0}
                            vertical
                            transparent
                            onPress={() => props.navigation.navigate("Home")}>
                            <Icon
                                name={props.navigation.state.index === 0 ? "home" : "home-outline"}
                                type="MaterialCommunityIcons"
                                style={{ fontSize: 36, color: "black" }}
                            />
                            {/*<Text>Home</Text>*/}
                        </Button>
                        <Button
                            activeOpacity={1.0}
                            vertical
                            transparent
                            onPress={() => props.navigation.navigate("CameraScreen")}>
                            <Icon
                                name={props.navigation.state.index === 1 ? "add-circle" : "add-circle-outline"}
                                type="MaterialIcons"
                                style={{ fontSize: 36, color: "black" }}
                            />
                            {/*<Text>Place a Request</Text>*/}
                        </Button>
                        <Button
                            activeOpacity={1.0}
                            vertical
                            transparent
                            onPress={() => props.navigation.navigate("List")}>
                            <Icon
                                name={props.navigation.state.index === 2 ? "person" : "person-outline"}
                                type="MaterialIcons"
                                style={{ fontSize: 36, color: "black" }}
                            />
                            {/*<Text>About</Text>*/}
                        </Button>
                    </FooterTab>
                </Footer>
            );
        }
    })

const SwitchNavigator = createSwitchNavigator({
    Loading: Loading,
    Main: TabNavigator,
    Login: LoginNavigator,
}, {
        initialRouteName: 'Loading'
    });

const Container = createAppContainer(SwitchNavigator);

export default class App extends React.Component {
    async componentDidMount() {
        GlobalFont.applyGlobal("Arial");

        // Setup Google Signin
        /* await GoogleSignIn.initAsync({
            clientId: '694885915476-9oqmlpj23bf3db8c7sg8hmiiqubbbcnr.apps.googleusercontent.com'
        }) */
    }

    render() {
        return (
            <Container />
        );
    }
}