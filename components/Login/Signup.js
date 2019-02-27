import React from 'react';
import { View } from 'react-native';
import styles from '../../Styles';
import {Button, Container, Content, Text, Form, Item, Input, Textarea, Label} from 'native-base';
import * as firebase from 'firebase';
import 'firebase/firestore';

export default class Signup extends React.Component {

    static navigationOptions = ({navigation}) => {
        return {
            headerTitle: 'Place a Request',
        };
    };

    constructor(props) {
        super(props);

        this.ref = firebase.firestore().collection('users');

        this.state = {
            name: '',
            email: '',
            password: '',
            errorMessage: null,
        };
    }

    componentDidMount() {

    }

    login() {
        this.props.navigation.navigate("Login");
    }

    signup() {
        // Firebase
        firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then((result) => {
            console.log(result);
            result.user.updateProfile({displayName: this.state.name}).then(() => {
                this.ref.doc(result.user.uid).set({
                    name: this.state.name,
                    email: this.state.email,
                    requests: [],
                })
                this.props.navigation.navigate("Home")
            });
        })
        .catch(error => this.setState({errorMessage: error.message}));
    }

    render() {
        return (
            <Container style={styles.font}>
                <Content contentContainerStyle={styles.container}>
                    <Text style={styles.header}>Sign Up</Text>
                    {/* Error Message */
                    this.state.errorMessage && <Text style={{color: 'red'}}>
                        {this.state.errorMessage}
                    </Text>
                    }
                        <Item regular style={styles.loginInput}>
                            <Input 
                                placeholder="Name"
                                value={this.state.name}
                                onChangeText={(text) => this.setState({name: text})}
                            />
                        </Item>
                        <Item regular style={styles.loginInput}>
                            <Input 
                                keyboardType="email-address"
                                placeholder="Email"
                                value={this.state.email}
                                onChangeText={(text) => this.setState({email: text})}
                            />
                        </Item>
                        <Item regular style={styles.loginInput}>
                            <Input 
                                secureTextEntry={true}
                                placeholder="Password"
                                value={this.state.password}
                                onChangeText={(text) => this.setState({password: text})}
                            />
                        </Item>
                        <Button
                            style={styles.saveButton}
                            full
                            rounded
                            onPress={() => {
                                this.signup();
                            }}
                            >
                            <Text>Sign Up</Text>
                        </Button>
                        <Button
                            full
                            transparent
                            onPress={() => {
                                this.login();
                            }}
                            >
                            <Text>Already have an account?</Text>
                        </Button>
                    
                </Content>
            </Container>
        );
    }

}