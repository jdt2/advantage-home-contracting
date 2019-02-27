import React from 'react';
import { View } from 'react-native';
import styles from '../../Styles';
import {Button, Container, Content, Text, Form, Item, Input, Textarea, Label} from 'native-base';

export default class Request extends React.Component {

    static navigationOptions = ({navigation}) => {
        return {
            headerTitle: 'Place a Request',
        };
    };

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            desc: '',
            timeline: '',
            other: '',
            refer: '',
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
                    <Form>
                        <Item floatingLabel>
                            <Label>Your Email</Label>
                            <Input onChangeText={(text) => this.setState({email: text})} />
                            <Button
                                transparent
                                onPress={() => {
                                    this.saveEmail();
                                }}
                                >
                                <Text>Save Email</Text>
                            </Button>
                        </Item>
                        <Item floatingLabel>
                            <Label>Job Description</Label>
                            <Input onChangeText={(text) => this.setState({desc: text})} />
                        </Item>
                        <Item floatingLabel>
                            <Label>Timeline</Label>
                            <Input onChangeText={(text) => this.setState({timeline: text})} />
                        </Item>
                        <Textarea style={styles.requestArea} rowSpan={8} placeholder="Other Information" bordered onChangeText={(text) => this.setState({other: text})} />
                        <Item floatingLabel last>
                            <Label>How did you hear about us?</Label>
                            <Input onChangeText={(text) => this.setState({refer: text})} />
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