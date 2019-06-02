import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import styles from '../../Styles';
import { Container, Content, Text } from 'native-base';
import * as firebase from 'firebase';

export default class Home extends React.Component {

    static navigationOptions = ({ navigation }) => {
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
            this.props.navigation.navigate(user ? 'Main' : 'Signup');
        })
    }

    render() {
        return (
            <Container>
                <Content contentContainerStyle={[styles.container, { backgroundColor: '#3A5872' }]}>
                    <Text style={[styles.header, { color: 'white' }]}>Loading</Text>
                    <ActivityIndicator color='white' size="large" />
                </Content>
            </Container>
        );
    }

}