import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import styles from '../../Styles';
import {Container, Content, Text, List, ListItem, Thumbnail, Left, Body, Right, Button} from 'native-base';
import * as firebase from 'firebase';

export default class Profile extends React.Component {

    static navigationOptions = ({navigation}) => {
        const {params = {}} = navigation.state

        return {
            headerTitle: 'Your Orders',
            headerRight: (
                <TouchableOpacity
                    style={styles.headerRight}
                    onPress={() => params.handleLogout()}
                >
                    <Text>Logout</Text>
                </TouchableOpacity>
            )
        };
    };

    constructor(props) {
        super(props);

        this.props.navigation.setParams({handleLogout: this.logout});

        this.userRef = firebase.firestore().collection('users');
        this.requestRef = firebase.firestore().collection('requests');

        this.state = {
            currentUser: null,
            requests: [],
        }
    }

    logout = async () => {
        try {
            await firebase.auth().signOut();
            this.props.navigation.navigate("Login");
        } catch (e) {
            console.error(e);
        }
    }

    componentDidMount() {
        const {currentUser} = firebase.auth();
        this.setState({currentUser: currentUser});

        this.getData();
    }

    getData = async () => {
        // get uid
        const uid = firebase.auth().currentUser.uid;

        let itemIds = [];
        let allItems = [];
        const data_ref = await this.requestRef.orderBy('timestamp', 'desc').where("userId", "==", uid).get().then((doc) => {
            doc.forEach((result) => {
                const data = result.data();
                data["id"] = result.id;
                allItems.push(data);
            });
        })
        console.log(allItems);
        this.setState({requests: allItems});
    }

    render() {

        let listItems = [];
        for(let i = 0; i < this.state.requests.length; i++) {
            let item = this.state.requests[i];
            listItems.push(
                <ListItem key={i} thumbnail>
                    <Left>
                        <Thumbnail square source={{uri: item.imageURL}}  />
                    </Left>
                    <Body>
                        <Text>
                            {item.category}
                        </Text>
                        <Text note numberOfLines={1}>
                            {item.jobDesc}
                        </Text>
                    </Body>
                    <Right>
                        <Button
                            transparent
                            onPress={() => {
                                this.props.navigation.navigate("ProfileItem", {item: this.state.requests[i]});
                            }}
                        >
                            <Text>View</Text>
                        </Button>
                    </Right>
                </ListItem>
            );
        }

        return (
            <Container>
                <Content>
                    <List>
                        {listItems}
                    </List>
                </Content>
            </Container>
        );
    }

}