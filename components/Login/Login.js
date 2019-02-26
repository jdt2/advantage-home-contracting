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

    submitForm = async () => {
        
    }

    render() {
        return (
            <Container>
                <Content>
                    <Text>Login</Text>
                    <Form>
                        <Item floatingLabel>
                            <Label>Email</Label>
                            <Input onChangeText={(text) => this.setState({email: text})} />
                        </Item>
                        <Item floatingLabel>
                            <Label>Password</Label>
                            <Input password onChangeText={(text) => this.setState({password: text})} />
                        </Item>
                        <Button
                            style={styles.saveButton}
                            rounded
                            full
                            onPress={() => {
                                this.submitActionSteps();
                            }}
                            >
                            <Text>Save</Text>
                        </Button>
                    </Form>
                </Content>
            </Container>
        );
    }

}