import React from 'react';
import { View, Image } from 'react-native';
import styles from '../../Styles';
import {Button, Container, Content, Text, Form, Item, Input, Textarea, Label, Picker, Icon, Left, Right, Body} from 'native-base';
import {ImagePicker, Permissions} from 'expo';

export default class Request extends React.Component {

    static navigationOptions = ({navigation}) => {
        return {
            headerTitle: 'Place a Request',
        };
    };

    constructor(props) {
        super(props);

        this.pickerItems = [
            "Tile Masonry",
            "Roofing and Siding",
            "Kitchen and Bathrooms",
            "Decks and Porches",
            "Construction",
            "Remodeling (Interior)",
            "Handyman",
            "Painting"
        ];

        this.timelineItems = [
            "Within a week",
            "Within 2 weeks",
            "Within 3 weeks",
            "Within a month",
        ];

        this.referItems = [
            "Radio",
            "TV",
            "Online",
            "Friend",
            "Other",
        ];

        this.state = {
            category: '',
            desc: '',
            timeline: '',
            other: '',
            refer: '',
            image: null,
        };
    }

    componentDidMount() {
        const image = this.props.navigation.getParam('image', null);
        //console.log(image);
        this.setState({image: image});
    }

    selectPicture = async () => {
        await Permissions.askAsync(Permissions.CAMERA_ROLL);
        const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
            aspect: 1,
            allowsEditing: true,
        });
        if (!cancelled) this.setState({ image: uri });
    };

    takePicture = async () => {
        await Permissions.askAsync(Permissions.CAMERA);
        const { cancelled, uri } = await ImagePicker.launchCameraAsync({
            allowsEditing: false,
        });
        this.setState({ image: uri });
    };

    submitForm = async () => {
        
    }

    render() {
        pickerStuff = [];
        for(let i = 0; i < this.pickerItems.length; i++) {
            pickerStuff.push(
                <Picker.Item key={i} label={this.pickerItems[i]} value={this.pickerItems[i]} />
            );            
        }

        timelineStuff = [];
        for(let i = 0; i < this.timelineItems.length; i++) {
            timelineStuff.push(
                <Picker.Item key={i+this.pickerItems.length} label={this.timelineItems[i]} value={this.timelineItems[i]} />
            );            
        }

        referStuff = [];
        for(let i = 0; i < this.referItems.length; i++) {
            referStuff.push(
                <Picker.Item key={i+this.pickerItems.length+this.timelineItems.length} label={this.referItems[i]} value={this.referItems[i]} />
            );            
        }

        return (
            <Container>
                <Content>
                    <Form>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            {this.state.image ? <Image source={{uri: this.state.image}} style={styles.smallImage} /> : null}
                            <Textarea
                                style={[styles.requestArea, {marginLeft: 10,}]}
                                rowSpan={3}
                                placeholder="Job Description"
                                onChangeText={(text) => this.setState({desc: text})}
                            />
                        </View>
                        <Item fixedLabel>
                            <Label>Category</Label>
                            <Picker
                                mode="dropdown"
                                iosIcon={<Icon name="arrow-down" />}
                                style={{ width: undefined }}
                                placeholder="Select an Option"
                                placeholderStyle={{ color: "#bfc6ea" }}
                                placeholderIconColor="#007aff"
                                selectedValue={this.state.category}
                                onValueChange={(value) => {
                                    this.setState({category: value})
                                }}
                            >
                                {pickerStuff}
                            </Picker>
                        </Item>
                        <Item fixedLabel>
                            <Label>Timeline</Label>
                            <Picker
                                mode="dropdown"
                                iosIcon={<Icon name="arrow-down" />}
                                style={{ width: undefined }}
                                placeholder="Select an Option"
                                placeholderStyle={{ color: "#bfc6ea" }}
                                placeholderIconColor="#007aff"
                                selectedValue={this.state.timeline}
                                onValueChange={(value) => {
                                    this.setState({timeline: value})
                                }}
                            >
                                {timelineStuff}
                            </Picker>
                        </Item>
                        <Item fixedLabel last>
                            <Label>How did you hear about us?</Label>
                            <Picker
                                mode="dropdown"
                                iosIcon={<Icon name="arrow-down" />}
                                style={{ width: undefined }}
                                placeholder="Select an Option"
                                placeholderStyle={{ color: "#bfc6ea" }}
                                placeholderIconColor="#007aff"
                                selectedValue={this.state.timeline}
                                onValueChange={(value) => {
                                    this.setState({refer: value})
                                }}
                            >
                                {referStuff}
                            </Picker>
                        </Item>
                        <Textarea
                            style={styles.requestArea}
                            rowSpan={5}
                            placeholder="Other Information"
                            bordered
                            onChangeText={(text) => this.setState({other: text})}
                        />
                        <Button
                            style={styles.saveButton}
                            full
                            rounded
                            onPress={() => {
                                this.submitForm();
                            }}
                            >
                            <Text>Submit a Request</Text>
                        </Button>
                    </Form>
                </Content>
            </Container>
        );
    }

}