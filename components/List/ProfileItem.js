import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import styles from '../../Styles';
import { Header, Container, Content, Text, List, ListItem, Thumbnail, Left, Body, Right, Button, Card, CardItem } from 'native-base';
import * as firebase from 'firebase';
import moment from 'moment';
import * as Progress from 'react-native-progress';
//import { SegmentedProgress } from 'react-native-segmented-progress';

export default class ProfileItem extends React.Component {

    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state

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
        this.setState({ item: item });
        console.log(item);
    }

    getDate() {
        if (this.state.item) {
            const timestamp = this.state.item.timestamp;
            //console.log(timestamp.seconds);
            return moment.unix(timestamp.seconds).format("MM/DD/YYYY - hh:mm a");
        }
    }

    render() {
        const item = this.state.item;

        // get progress
        let progress = 0;
        if (item) {

            if (item.status === "Submitted") {
                progress = 0;
            } else if (item.status === "Reviewed") {
                progress = 0.25;
            } else if (item.status === "Estimate") {
                progress = 0.5;
            } else if (item.status === "Worked On") {
                progress = 0.75;
            } else if (item.status === "Finished") {
                progress = 1.0;
            }
        }

        return (
            <Container>
                <Content>
                    <View style={[styles.container, { marginTop: 20, }]}>
                        <Image style={styles.previewImage} source={item ? { uri: item.imageURL } : require('../../assets/loading.gif')} />
                    </View>
                    <Card transparent>
                        <CardItem>
                            <Left>
                                <Text>Job Description:</Text>
                            </Left>
                            <Right>
                                <Text style={{ textAlign: 'right' }}>{item ? item.jobDesc : ""}</Text>
                            </Right>
                        </CardItem>
                        <CardItem>
                            <Left>
                                <Text>Submitted:</Text>
                            </Left>
                            <Right>
                                <Text style={{ textAlign: 'right' }}>{this.getDate()}</Text>
                            </Right>
                        </CardItem>
                        {/* <CardItem>
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
                        </CardItem> */}
                        <CardItem>
                            <Left>
                                <Text>Reference:</Text>
                            </Left>
                            <Right>
                                <Text style={{ textAlign: 'right' }}>{item ? item.refer : ""}</Text>
                            </Right>
                        </CardItem>
                        {/* <CardItem>
                            <Left>
                                <Text>Other Info:</Text>
                            </Left>
                            <Right>
                                <Text style={{textAlign: 'right'}}>{item ? item.other : ""}</Text>
                            </Right>
                        </CardItem> */}
                    </Card>
                    <View style={[styles.container, { textAlign: 'center' }]}>
                        <Text>Status: {item ? item.status : ""}</Text>
                        {/* <Progress.Bar
                            animated
                            progress={progress}
                            width={300}
                            height={25}
                        /> */}
                        <View style={styles.progressBar}>
                            <View
                                style={[styles.startProgress, progress >= 0 ? styles.filledProgress : null]}
                            >
                            </View>
                            <View
                                style={[styles.middleProgress, progress >= 0.25 ? styles.filledProgress : null]}
                            />
                            <View
                                style={[styles.middleProgress, progress >= 0.5 ? styles.filledProgress : null]}
                            />
                            <View
                                style={[styles.middleProgress, progress >= 0.75 ? styles.filledProgress : null]}
                            />
                            <View
                                style={[styles.endProgress, progress >= 1 ? styles.filledProgress : null]}
                            />
                        </View>
                        {/* <SegmentedProgress
                            numberOfSteps={5}
                            activeStep={2}
                        /> */}
                    </View>
                </Content>
            </Container>
        );
    }

}