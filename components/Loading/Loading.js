import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import styles from '../../Styles';
import {Container, Content, Text} from 'native-base';
import * as firebase from 'firebase';

export default class Home extends React.Component {

    static navigationOptions = ({navigation}) => {
        return {
            headerTitle: 'Advantage Home',
        };
    };

    constructor(props) {
        super(props);

        this.state = {
            currentUser: null,
        }
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            this.props.navigation.navigate(user ? 'Main' : 'Login');
        })
    }

    render() {
        return (
            <Container>
                <Content contentContainerStyle={styles.container}>
                    <Text style={styles.header}>Loading</Text>
                    <ActivityIndicator size="large" />
                </Content>
            </Container>
        );
    }

}