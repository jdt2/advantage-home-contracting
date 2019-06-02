import React from 'react';
import { View } from 'react-native';
import styles from '../../Styles';
import { Button, Container, Content, Text, Form, Item, Input, Textarea, Label } from 'native-base';
import * as firebase from 'firebase';

export default class Login extends React.Component {

    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: 'Place a Request',
        };
    };

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            errorMessage: null,
        };
    }

    componentDidMount() {

    }

    login() {
        // Firebase
        firebase
            .auth()
            .signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => this.props.navigation.navigate("Request"))
            .catch(error => this.setState({ errorMessage: error.message }));
    }

    signup() {
        this.props.navigation.navigate("Signup");
    }

    render() {
        return (
            <Container style={styles.font}>
                <Content contentContainerStyle={styles.container}>
                    <Text style={[styles.header, styles.center]}>Login to Advantage Home</Text>
                    {/* Error Message */
                        this.state.errorMessage && <Text style={styles.errorText}>
                            {this.state.errorMessage}
                        </Text>
                    }
                    <Item regular style={styles.loginInput}>
                        <Input
                            keyboardType="email-address"
                            placeholder="Email"
                            value={this.state.email}
                            onChangeText={(text) => this.setState({ email: text })}
                        />
                    </Item>
                    <Item regular style={styles.loginInput}>
                        <Input
                            secureTextEntry={true}
                            placeholder="Password"
                            value={this.state.password}
                            onChangeText={(text) => this.setState({ password: text })}
                        />
                    </Item>
                    <Button
                        style={styles.saveButton}
                        full
                        rounded
                        onPress={() => {
                            this.login();
                        }}
                    >
                        <Text>Login</Text>
                    </Button>
                    <Button
                        full
                        transparent
                        onPress={() => {
                            this.signup();
                        }}
                    >
                        <Text>Don't have an account? Sign Up</Text>
                    </Button>

                </Content>
            </Container>
        );
    }

}