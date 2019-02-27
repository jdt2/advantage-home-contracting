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
                        <Item picker>
                            <Picker
                                mode="dropdown"
                                iosIcon={<Icon name="arrow-down" />}
                                style={{ width: undefined }}
                                placeholder="Select a Job Description"
                                placeholderStyle={{ color: "#bfc6ea" }}
                                placeholderIconColor="#007aff"
                                selectedValue={this.state.desc}
                                onValueChange={(value) => this.setState({desc: value})}
                            >
                                <Picker.Item label="Tile Masonry" value="Tile Masonry" />
                                <Picker.Item label="Roofing and Siding" />
                                <Picker.Item label="Kitchen and Bathrooms" />
                                <Picker.Item label="Decks and Porches" />
                                <Picker.Item label="Construction" />
                                <Picker.Item label="Remodeling (Interior)" />
                                <Picker.Item label="Handyman" />
                                <Picker.Item label="Painting" />
                            </Picker>
                        </Item>
                        <Item floatingLabel>
                            <Label>Timeline</Label>
                            <Input onChangeText={(text) => this.setState({timeline: text})} />
                        </Item>
                        <Textarea
                            style={styles.requestArea}
                            rowSpan={8}
                            placeholder="Other Information"
                            bordered
                            onChangeText={(text) => this.setState({other: text})}
                        />
                        <Item floatingLabel last>
                            <Label>How did you hear about us?</Label>
                            <Input
                                onChangeText={(text) => this.setState({refer: text})}
                            />
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