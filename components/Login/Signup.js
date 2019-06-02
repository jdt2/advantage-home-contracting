import React from 'react';
import { View } from 'react-native';
import styles from '../../Styles';
import { Button, Container, Content, Text, Form, Item, Input, Textarea, Label, Icon } from 'native-base';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { GoogleSignIn } from 'expo';

export default class Signup extends React.Component {

    static navigationOptions = ({ navigation }) => {
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
            isSigninInProgress: false,
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
                //console.log(result);
                result.user.updateProfile({ displayName: this.state.name }).then(() => {
                    this.ref.doc(result.user.uid).set({
                        name: this.state.name,
                        email: this.state.email,
                        requests: [],
                    })
                    this.props.navigation.navigate("Request")
                });
            })
            .catch(error => this.setState({ errorMessage: error.message }));
    }

    signupWithGoogle() {
        this.setState({ isSigninInProgress: true });
        /* GoogleSignIn.signIn().then((data) => {
            const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken);
            return firebase.auth().signInWithCredential(credential);
        }).then((result) => {
            this.setState({ isSigninInProgress: true });
            this.ref.doc(result.user.uid).set({
                name: result.user.displayName,
                email: result.user.email,
                requests: []
            })
            this.props.navigation.navigate("Request");
        }).catch((error) => {
            this.setState({ isSigninInProgress: false })
            const { code, message } = error;
            console.error(message);
        }) */
    }

    render() {
        return (
            <Container style={styles.font}>
                <Content contentContainerStyle={styles.container}>
                    <Text style={[styles.header, styles.center]}>Sign Up for{"\n"}Advantage Home</Text>
                    {/* Error Message */
                        this.state.errorMessage && <Text style={{ color: 'red' }}>
                            {this.state.errorMessage}
                        </Text>
                    }
                    <Item regular style={styles.loginInput}>
                        <Input
                            placeholder="Name"
                            value={this.state.name}
                            onChangeText={(text) => this.setState({ name: text })}
                        />
                    </Item>
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
                            this.signup();
                        }}
                    >
                        <Text>Sign Up</Text>
                    </Button>
                    {/* <Button
                        style={styles.saveButton}
                        full
                        rounded
                        danger
                        onPress={() => {
                            this.signupWithGoogle();
                        }}
                    >
                        <Text><Icon
                            name="google"
                            type="MaterialCommunityIcons"
                        /> Signup with Google</Text>
                    </Button> */}
                    <Button
                        full
                        transparent
                        onPress={() => {
                            this.login();
                        }}
                    >
                        <Text>Already have an account? Log In</Text>
                    </Button>

                </Content>
            </Container>
        );
    }

}