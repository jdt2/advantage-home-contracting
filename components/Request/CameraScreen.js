import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import styles from '../../Styles';
import {Button, Container, Content, Text, Form, Item, Input, Textarea, Label, Picker, Icon, Left, Right, Body} from 'native-base';
import {ImagePicker, Permissions} from 'expo';

export default class Request extends React.Component {

    static navigationOptions = ({navigation}) => {
        const {params = {}} = navigation.state

        return {
            headerTitle: 'Place a Request',
            headerRight: (
                <TouchableOpacity
                    style={styles.headerRight}
                    onPress={() => params.handleDone()}
                >
                    <Text>Done</Text>
                </TouchableOpacity>
            )
        };
    };

    constructor(props) {
        super(props);

        this.props.navigation.setParams({handleDone: this.submitForm});

        this.state = {
            image: null,
        };
    }

    componentDidMount() {

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
        this.props.navigation.navigate("Request", {image: this.state.image});
    }

    render() {

        return (
            <Container>
                <Content contentContainerStyle={styles.container}>
                    {this.state.image ?
                        <Image style={styles.previewImage} source={{uri: this.state.image}}/> : 
                        <View style={styles.previewImage}>
                            <Text style={{textAlign: 'center', fontSize: 24}}>Take a Picture of your Home Improvement Problem</Text>
                        </View>
                    }
                    <View style={styles.row}>
                        <Button
                            rounded
                            style={{marginRight: 10,}}
                            onPress={this.selectPicture}
                        >
                            <Text>Choose a Photo</Text>
                        </Button>
                        <Button
                            rounded
                            onPress={this.takePicture}
                        >
                            <Text>Take a Photo</Text>
                        </Button>
                    </View>
                    
                </Content>
            </Container>
        );
    }

}