import React from 'react';
import { TouchableHighlight, View, Image, TouchableOpacity } from 'react-native';
import styles from '../../Styles';
import {Button, Container, Content, Text, Form, Item, Input, Textarea, Label, Picker, Icon, Left, Right, Body} from 'native-base';
import { ImagePicker, Permissions} from 'expo';
import Modal from 'react-native-modalbox';

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
                    <Text>Next</Text>
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
        this.props.navigation.addListener('didFocus', payload => {this.checkUploaded()});
    }

    checkUploaded() {
        const uploaded = this.props.navigation.getParam('uploaded', false);
        console.log(uploaded);
        if(uploaded) {
             this.setState({image: null});
             this.refs.modal.open();
        }
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

                    <Modal
                        style={styles.modal}
                        ref={"modal"}
                        position={"center"}
                    >
                        
                            <Text style={{fontSize: 24, marginTop: 70,}}>Request Sent!</Text>
                            <Text style={{fontSize: 24, marginTop: 20,}}>Expect an email soon!</Text>
                            <Button
                                onPress={() => {
                                    this.refs.modal.close();
                                }}
                                full
                                transparent
                                style={{marginTop: 50}}
                            >
                                <Text style={{textAlign: 'left'}}>Ok</Text>
                            </Button>
                        
                    </Modal>
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