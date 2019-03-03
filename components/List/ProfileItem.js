import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import styles from '../../Styles';
import {Header, Container, Content, Text, List, ListItem, Thumbnail, Left, Body, Right, Button, Card, CardItem} from 'native-base';
import * as firebase from 'firebase';
import moment from 'moment';

export default class ProfileItem extends React.Component {

    static navigationOptions = ({navigation}) => {
        const {params = {}} = navigation.state

        return {
            headerTitle: 'Order Page',
        };
    };

    constructor(props) {
        super(props);

        this.state = {
            currentUser: null,
            item: null,
        }
    }

    componentDidMount() {
        const item = this.props.navigation.getParam('item', null);
        this.setState({item: item});
    }

    getDate() {
        if(this.state.item) {
            const timestamp = this.state.item.timestamp;
            console.log(timestamp.seconds);
            return moment.unix(timestamp.seconds).format("MM/DD/YYYY - hh:mm a");
        }
    }

    render() {
        const item = this.state.item;

        return (
            <Container>
                <Content>
                    <View style={[styles.container, {marginTop: 20,}]}>
                        <Image style={styles.previewImage} source={item ? {uri: item.imageURL} : require('../../assets/loading.gif')} />
                    </View>
                    <Card transparent>
                        <CardItem>
                            <Left>
                                <Text>Job Description:</Text>
                            </Left>
                            <Right>
                                <Text style={{textAlign: 'right'}}>{item ? item.jobDesc : ""}</Text>
                            </Right>
                        </CardItem>
                        <CardItem>
                            <Left>
                                <Text>Submitted:</Text>
                            </Left>
                            <Right>
                                <Text style={{textAlign: 'right'}}>{this.getDate()}</Text>
                            </Right>
                        </CardItem>
                        <CardItem>
                            <Left>
                                <Text>Category:</Text>
                            </Left>
                            <Right>
                                <Text style={{textAlign: 'right'}}>{item ? item.category : ""}</Text>
                            </Right>
                        </CardItem>
                        <CardItem>
                            <Left>
                                <Text>Timeline:</Text>
                            </Left>
                            <Right>
                                <Text style={{textAlign: 'right'}}>{item ? item.timeline : ""}</Text>
                            </Right>
                        </CardItem>
                        <CardItem>
                            <Left>
                                <Text>Reference:</Text>
                            </Left>
                            <Right>
                                <Text style={{textAlign: 'right'}}>{item ? item.refer : ""}</Text>
                            </Right>
                        </CardItem>
                        <CardItem>
                            <Left>
                                <Text>Other Info:</Text>
                            </Left>
                            <Right>
                                <Text style={{textAlign: 'right'}}>{item ? item.other : ""}</Text>
                            </Right>
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        );
    }

}