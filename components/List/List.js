import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import styles from '../../Styles';
import {Container, Content, Text} from 'native-base';
import * as firebase from 'firebase';

export default class List extends React.Component {

    static navigationOptions = ({navigation}) => {
        const {params = {}} = navigation.state

        return {
            headerTitle: 'Your Orders',
            headerRight: (
                <TouchableOpacity
                    style={styles.headerRight}
                    onPress={() => params.handleLogout()}
                >
                    <Text>Logout</Text>
                </TouchableOpacity>
            )
        };
    };

    constructor(props) {
        super(props);

        this.props.navigation.setParams({handleLogout: this.logout});

        this.state = {
            currentUser: null,
        }
    }

    logout = async () => {
        try {
            await firebase.auth().signOut();
            this.props.navigation.navigate("Login");
        } catch (e) {
            console.error(e);
        }
    }

    componentDidMount() {
        const {currentUser} = firebase.auth();
        this.setState({currentUser: currentUser});
    }

    render() {
        return (
            <Container>
                <Content contentContainerStyle={styles.container}>
                    <Text>This tab lists placed orders</Text>
                </Content>
            </Container>
        );
    }

}