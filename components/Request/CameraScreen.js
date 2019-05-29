import React from 'react';
import { TouchableHighlight, View, Image, TouchableOpacity, ActivityIndicator, StatusBar } from 'react-native';
import styles from '../../Styles';
import {Button, Container, Content, Text, Form, Item, Input, Textarea, Label, Picker, Icon, Left, Right, Body, Footer, Header} from 'native-base';
import { ImagePicker, Permissions, ImagePickerManager } from 'expo';
import Modal from 'react-native-modalbox';
import * as firebase from 'firebase';
import 'firebase/firestore';
import uuid from 'uuid';
import { Status } from 'expo-background-fetch';
import { NativeModulesProxy } from 'expo-core';

export default class Request extends React.Component {

    static navigationOptions = ({navigation}) => {
        const {params = {}} = navigation.state

        return {
            /* headerTitle: 'Free Estimate Request', */
            /* headerRight: (
                <TouchableOpacity
                    style={styles.headerRight}
                    onPress={() => params.handleDone()}
                >
                    <Text>Next</Text>
                </TouchableOpacity>
            ) */
        };
    };

    constructor(props) {
        super(props);

        //this.props.navigation.setParams({handleDone: this.submitForm});

        this.pickerItems = [
            "Handyman",
            "Painting",
            "Design and Build",
            "Interior Remodeling",
            "Decks and Porches",
            "Roofing and Siding",
            "Tile",
            "Masonry",
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
    }

    checkUploaded() {
        // TODO: Finish resetting everything
        this.setState({image: null, desc: '', refer: ''});
        this.refs.modal.open();
    }

    selectPicture = async () => {
        await Permissions.askAsync(Permissions.CAMERA_ROLL);
        const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
            //aspect: 1,
            allowsEditing: true,
        });
        if (!cancelled) this.setState({ image: uri });
    };

    takePicture = async () => {
        await Permissions.askAsync(Permissions.CAMERA);
        const { cancelled, uri } = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
        });
        if (!cancelled) this.setState({ image: uri });
    };

    uploadPhoto(uri, uploadUri) {
        return new Promise(async (res, rej) => {
            const response = await fetch(uri);
            const blob = await response.blob();
        
            const ref = firebase.storage().ref(uploadUri);
            const unsubscribe = ref.put(blob).on(
              'state_changed',
              state => {},
              err => {
                unsubscribe();
                rej(err);
              },
              async () => {
                unsubscribe();
                const url = await ref.getDownloadURL();
                res(url);
              },
            );
        });
    }

    uploadPhotoAsync = async uri => {
        const collectionName = "requests";
        const path = `${collectionName}/${firebase.auth().currentUser.uid}/${uuid.v4()}.jpg`;
        return this.uploadPhoto(uri, path);
    }

    submitForm = async () => {

        // upload image
        // uri stored in this.state.image
        try {
            this.setState({uploading: true});
            const userId = firebase.auth().currentUser.uid;
            
            const uploadUri = this.state.image;
            console.log(this.state.image);

            // upload using xmlhttprequest
            const formData = new FormData();
            const name = uploadUri.substring(uploadUri.lastIndexOf("/")+1);
            const type = "image/" + (name.split('.').pop() || "jpg")
            console.log(type);
            console.log(name);
            formData.append("file", {uri: uploadUri, name: name, type: type});
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
                console.log("here");
                xhr.send(formData);
            })
            const collectionName = "requests";
            const path = `${collectionName}/${firebase.auth().currentUser.uid}/${uuid.v4()}.jpg`;
            //const ref = firebase.storage().ref().child(uuid.v4());
            const ref = firebase.storage().ref().child(path);
            const snapshot = await ref.put(blob);
            blob.close();

            const downloadURL = await snapshot.ref.getDownloadURL();
            //const downloadURL = await this.uploadPhotoAsync(uploadUri);
            // Using download URL, we can store into firestore
            console.log(downloadURL);

            

            const doc_ref = await this.requestRef.add({
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                jobDesc: this.state.desc,
                //category: this.state.category,
                //timeline: this.state.timeline,
                refer: this.state.refer,
                //other: this.state.other,
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
            this.checkUploaded();
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
                    <Modal
                        style={styles.modal}
                        ref={"modal"}
                        position={"center"}
                    >
                        
                            <Text style={{fontSize: 24, marginTop: 70,}}>Request Sent!</Text>
                            <Text style={{fontSize: 18, marginTop: 20, textAlign: 'center', marginHorizontal: 10}}>Expect an email soon and you can view your request in 
                                {"\n"}
                                <Icon 
                                    name={"person-outline"}
                                    type={"MaterialIcons"}
                                    style={{fontSize: 48}}
                                />
                            </Text>
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
                <Content>

                    <Image style={{marginTop: 20, alignSelf: 'center', width: 346, height: '25%', resizeMode: 'contain'}} source={require('../../assets/logo.png')} />

                    <Text style={[styles.header, {alignSelf: 'center', marginBottom: 20, textAlign: 'center'}]}>Free Estimate Request</Text>

                    <Form>
                        <Textarea
                            style={[styles.requestArea, {marginTop: 0,marginBottom: 20}]}
                            value={this.state.desc}
                            rowSpan={3}
                            bordered
                            placeholder="Give a brief description of work/project needed"
                            onChangeText={(text) => this.setState({desc: text})}
                            editable={!this.state.uploading}
                        />
                        {/* <Item fixedLabel>
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
                                enabled={!this.state.uploading}
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
                                enabled={!this.state.uploading}
                            >
                                {timelineStuff}
                            </Picker>
                        </Item> */}
                        <Item fixedLabel last>
                            <Label>How did you hear about us?</Label>
                            <Picker
                                mode="dropdown"
                                iosIcon={<Icon name="arrow-down" />}
                                style={{ width: undefined }}
                                placeholder="Select an Option"
                                placeholderStyle={{ color: "#bfc6ea" }}
                                placeholderIconColor="#007aff"
                                selectedValue={this.state.refer}
                                onValueChange={(value) => {
                                    this.setState({refer: value})
                                }}
                                enabled={!this.state.uploading}
                            >
                                {referStuff}
                            </Picker>
                        </Item>
                        {/* <Textarea
                            style={[styles.requestArea, {marginHorizontal: 20}]}
                            rowSpan={5}
                            placeholder="Other Information"
                            bordered
                            onChangeText={(text) => this.setState({other: text})}
                            enabled={!this.state.uploading}
                        /> */}
                        
                        {/* Image preview */}
                        <View style={{alignItems: 'center', justifyContent: 'center', marginTop: 20}}>
                            {this.state.image ?
                                <Image style={styles.previewImage} source={{uri: this.state.image}}/> : 
                                <View style={styles.previewImage}>
                                    <Text style={{textAlign: 'center', fontSize: 24, color:'white'}}>Include Pictures if Helpful</Text>
                                </View>
                            }
                            <View style={styles.row}>
                                <Button
                                    rounded
                                    style={{marginRight: 10,backgroundColor:'#3A5872'}}
                                    onPress={this.selectPicture}
                                >
                                    <Text>Choose a Photo</Text>
                                </Button>
                                <Button
                                    rounded
                                    style={{backgroundColor:'#3A5872'}}
                                    onPress={this.takePicture}
                                >
                                    <Text>Take a Photo</Text>
                                </Button>
                            </View>
                        </View>

                        {/* Submit buttons */}
                        {this.state.uploading ? 
                            <Button
                                style={styles.saveButton}
                                disabled
                                full
                                rounded
                                >
                                <Text>Uploading Request...</Text>
                                <ActivityIndicator size="large" />
                            </Button>
                            : <Button
                                style={styles.saveButton}
                                full
                                rounded
                                onPress={() => {
                                    this.submitForm();
                                }}
                                >
                                <Text>Submit a Request</Text>
                            </Button>
                        }
                    </Form>
                    <View style={{height: 260}} />
                </Content>
                <Footer contentContainerStyle={[styles.container, {backgroundColor: 'white'}]}>
                    <View style={{flex: 1,flexDirection: 'row', height: 60, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white'}}>
                        
                        <Image style={{flex: 1, height: 40, resizeMode: 'contain', marginLeft: 10,}} source={require('../../assets/icons/BBBRating.jpg')} />
                        <Image style={{flex: 1, height: 40, resizeMode: 'contain', marginRight: 10}} source={require('../../assets/icons/ReadersChoice.jpg')} />
                        <Image style={{flex: 1, height: 40,  resizeMode: 'contain', marginRight: 10}} source={require('../../assets/icons/BestinCVille.jpg')} />
                        <Image style={{flex: 1, height: 40,  resizeMode: 'contain', marginRight: 10,}} source={require('../../assets/icons/CharlottesvilleFamilyAward.jpg')} />
                    </View>
                </Footer>
            </Container>
        );
    }

}