import React from 'react';
import { View, Image, ActivityIndicator } from 'react-native';
import styles from '../../Styles';
import {Button, Container, Content, Text, Form, Item, Input, Textarea, Label, Picker, Icon, Left, Right, Body} from 'native-base';
import {ImagePicker, Permissions} from 'expo';
import * as firebase from 'firebase';
import 'firebase/firestore';
import uuid from 'uuid';

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

        this.requestRef = firebase.firestore().collection("requests");
        this.userRef = firebase.firestore().collection("users");

        this.state = {
            category: '',
            desc: '',
            timeline: '',
            other: '',
            refer: '',
            image: null,
            uploading: false,
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

        // upload image
        // uri stored in this.state.image
        try {
            this.setState({uploading: true});
            
            const uploadUri = this.state.image;

            // upload using xmlhttprequest
            const blob = await new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.onload = function() {
                    resolve(xhr.response);
                }
                xhr.onerror = function(e) {
                    console.log(e);
                    reject(new TypeError("Network Request Failed"));
                }
                xhr.responseType = 'blob';
                xhr.open('GET', uploadUri, true);
                xhr.send(null);
            })

            const ref = firebase.storage().ref().child(uuid.v4());
            const snapshot = await ref.put(blob);
            blob.close();
            const downloadURL = await snapshot.ref.getDownloadURL();
            console.log(downloadURL);

            userId = firebase.auth().currentUser.uid;

            const doc_ref = await this.requestRef.add({
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                jobDesc: this.state.desc,
                category: this.state.category,
                timeline: this.state.timeline,
                refer: this.state.refer,
                other: this.state.other,
                userId: userId,
                imageURL: downloadURL,
            })

            const doc_id = doc_ref.id;
            await this.userRef.doc(userId).update({
                requests: firebase.firestore.FieldValue.arrayUnion(doc_id),
            })

        } catch (e) {
            console.error(e);
            alert("Upload failed...");
        } finally {
            this.setState({uploading: false});

            // navigate back to camera screen
            this.props.navigation.navigate("CameraScreen", {uploaded: true});
        }
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
                    
                </Content>
            </Container>
        );
    }

}