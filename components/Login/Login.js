import React from 'react';
import { View } from 'react-native';
import styles from '../../Styles';
import {Button, Container, Content, Text, Form, Item, Input, Textarea, Label} from 'native-base';

export default class Home extends React.Component {

    static navigationOptions = ({navigation}) => {
        return {
            headerTitle: 'Place a Request',
        };
    };

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
        };
    }

    componentDidMount() {

    }

    login() {

    }

    render() {
        return (
            <Container>
                <Content contentContainerStyle={styles.container}>
                    <Text style={styles.header}>Login</Text>
                    
                        <Item regular>
                            <Input 
                                keyboardType="email-address"
                                placeholder="Your Email"
                                value={this.state.email}
                                onChangeText={(text) => this.setState({email: text})}
                            />
                        </Item>
                        <Item regular>
                            <Input 
                                secureTextEntry={true}
                                placeholder="Password"
                                value={this.state.password}
                                onChangeText={(text) => this.setState({password: text})}
                            />
                        </Item>
                        <Button
                            style={styles.saveButton}
                            rounded
                            full
                            onPress={() => {
                                this.login();
                            }}
                            >
                            <Text>Login</Text>
                        </Button>
                    
                </Content>
            </Container>
        );
    }

}