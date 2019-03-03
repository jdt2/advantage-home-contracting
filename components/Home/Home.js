import React from 'react';
import { View, Image, Linking, ScrollView } from 'react-native';
import styles from '../../Styles';
import {Container, Content, Text, Button, Tab, Tabs, CardItem, Card, Body,Left, Right,ScrollableTab, Header} from 'native-base';
import * as firebase from 'firebase';
import MapView from 'react-native-maps';
import {Marker} from 'react-native-maps';
import { Status } from 'expo-background-fetch';

export default class Home extends React.Component {

    static navigationOptions = ({navigation}) => {
        return {
            headerTitle: 'Advantage Home',
        };
    };

    constructor(props) {
        super(props);

        this.state = {
            currentUser: null,
        }
    }

    componentDidMount() {
        const {currentUser} = firebase.auth();
        //console.log(currentUser);
        this.setState({currentUser: currentUser});
    }

    tab1() {
        return (
            <View>
                <Card style={styles.cardSpace}>
                    <CardItem header bordered style={styles.container}>
                        <Text style={{fontSize: 36, color: '#5987a7'}}>Our Mission</Text>
                    </CardItem>
                    <CardItem>
                        <Body style={styles.container}>
                            <Text style={styles.center}>Provide workmanship that EXCEEDS YOUR EXPECTATIONS in a timely and professional manner</Text>
                        </Body>
                    </CardItem>
                </Card>
                <Card style={styles.cardSpace}>
                    <CardItem header bordered style={styles.container}>
                        <Text style={{fontSize: 36, color: '#5987a7'}}>What We Can Do</Text>
                    </CardItem>
                    <CardItem>
                        <Body style={styles.container}>
                            <Text style={styles.center}>Advantage Home Contracting is your premier home contractor. We are there for you whether the project is big or small. Our team of in-house design and building professionals are fully licensed with no sub-contractors or outsourcing. When you work with Advantage you work with Advantage! All our professionals have at least 10 years of experience and we provide a 100% guarantee on our work with no mark-up on material cost. </Text>
                        </Body>
                    </CardItem>
                </Card>
                <Card style={styles.cardSpace}>
                    <CardItem header bordered style={styles.container}>
                        <Text style={{fontSize: 36, color: '#5987a7'}}>Free Estimate</Text>
                    </CardItem>
                    <CardItem>
                        <Body style={styles.container}>
                            <Text style={styles.center}>Call us at 434.817.7222 for a Free Estimate or submit a <Text style={{color: 'blue'}} onPress={() => Linking.openURL('https://www.advantagehandy.com/get-a-free-estimate/')}>request for a free estimate.</Text></Text>
                        </Body>
                    </CardItem>
                </Card>
            </View>
        );
    }

    tab2() {
        return (
            <View>
                <Card style={styles.cardSpace}>
                    <CardItem header bordered style={styles.container}>
                        <Image style={styles.serviceIcon} source={require('../../assets/serviceIcons/level-1.png')} />
                        <Text style={{fontSize: 36, color: '#5987a7'}}>Tile Masonry</Text>
                    </CardItem>
                    <CardItem>
                        <Body style={styles.container}>
                            <Text>The areas most experienced and talented tile and masonry company able to repair and install brick and or tile making your desired look perfect</Text>
                        </Body>
                    </CardItem>
                </Card>
                <Card style={styles.cardSpace}>
                    <CardItem header bordered style={styles.container}>
                        <Image style={styles.serviceIcon} source={require('../../assets/serviceIcons/level-2.png')} />
                        <Text style={{fontSize: 36, color: '#5987a7'}}>Roofing and Siding</Text>
                    </CardItem>
                    <CardItem>
                        <Body style={styles.container}>
                            <Text>We offer superior roofing systems with enhanced warranties. Advantage Home Contracting is your GAF Certified Weather Stopper Roofing Contractor.</Text>
                        </Body>
                    </CardItem>
                </Card>
                <Card style={styles.cardSpace}>
                    <CardItem header bordered style={styles.container}>
                        <Image style={styles.serviceIcon} source={require('../../assets/serviceIcons/level-3.png')} />
                        <Text style={{fontSize: 36, color: '#5987a7'}}>Kitchen and Bathrooms</Text>
                    </CardItem>
                    <CardItem>
                        <Body style={styles.serviceIcon} style={styles.container}>
                            <Text>The areas most complete Kitchen and Bathroom Remodeling team from design and installation to final completion.</Text>
                        </Body>
                    </CardItem>
                </Card>
                <Card style={styles.cardSpace}>
                    <CardItem header bordered style={styles.container}>
                        <Image style={styles.serviceIcon} source={require('../../assets/serviceIcons/level-4.png')} />
                        <Text style={{fontSize: 36, color: '#5987a7'}}>Decks and Porches</Text>
                    </CardItem>
                    <CardItem>
                        <Body style={styles.serviceIcon} style={styles.container}>
                            <Text>Make your outdoor living space a reality. Enjoy the outdoors regardless of the season or the weather with a screened in porch or a deck to experience the best views from your house.</Text>
                        </Body>
                    </CardItem>
                </Card>
                <Card style={styles.cardSpace}>
                    <CardItem header bordered style={styles.container}>
                        <Image style={styles.serviceIcon} source={require('../../assets/serviceIcons/level-5.png')} />
                        <Text style={{fontSize: 36, color: '#5987a7'}}>Construction</Text>
                    </CardItem>
                    <CardItem>
                        <Body style={styles.serviceIcon} style={styles.container}>
                            <Text>Advantage Home Contracting holds a VA Class A Contractors License with a Builders designation. Offering the areas most comprehensive design and build staff providing permit and drawings assistance to complete project oversight and execution.</Text>
                        </Body>
                    </CardItem>
                </Card>
                <Card style={styles.cardSpace}>
                    <CardItem header bordered style={styles.container}>
                        <Image style={styles.serviceIcon} source={require('../../assets/serviceIcons/level-6.png')} />
                        <Text style={{fontSize: 36, color: '#5987a7'}}>Remodeling (Interior)</Text>
                    </CardItem>
                    <CardItem>
                        <Body style={styles.serviceIcon} style={styles.container}>
                            <Text>Do you want to change the overall look of your home and make it more functional as well as breathtaking?</Text>
                        </Body>
                    </CardItem>
                </Card>
                <Card style={styles.cardSpace}>
                    <CardItem header bordered style={styles.container}>
                        <Image style={styles.serviceIcon} source={require('../../assets/serviceIcons/level-7.png')} />
                        <Text style={{fontSize: 36, color: '#5987a7'}}>Handyman</Text>
                    </CardItem>
                    <CardItem>
                        <Body style={styles.serviceIcon} style={styles.container}>
                            <Text>Advantage Home Contracting can do any job from large to very small. Whatever your needs, we are the contracting service for you.</Text>
                        </Body>
                    </CardItem>
                </Card>
                <Card>
                    <CardItem header bordered style={styles.container}>
                        <Image style={styles.serviceIcon} source={require('../../assets/serviceIcons/level-8.png')} />
                        <Text style={{fontSize: 36, color: '#5987a7'}}>Painting</Text>
                    </CardItem>
                    <CardItem>
                        <Body style={styles.serviceIcon} style={styles.container}>
                            <Text>Why completely renovate, when a fresh coat of paint will do?</Text>
                        </Body>
                    </CardItem>
                </Card>
            </View>
        );
    }

    tab3() {
        return (
            <View>
                <Card style={styles.cardSpace}>
                    <CardItem header bordered style={styles.container}>
                        <Text style={{fontSize: 36, color: '#5987a7'}}>Where Are We?</Text>
                    </CardItem>
                    <CardItem>
                        <Body style={styles.container}>
                            <MapView
                                initialRegion={{
                                    latitude: 38.049172,
                                    longitude: -78.467938,
                                    latitudeDelta: 0.0922,
                                    longitudeDelta: 0.0421,
                                }}
                                style={{width: 250, height: 250, marginBottom: 10,}}
                            >
                                <Marker
                                    coordinate={{
                                        latitude: 38.049172,
                                        longitude: -78.467938,
                                    latitudeDelta: 0.0922,
                                    longitudeDelta: 0.0421,
                                    }}
                                    title="Advantage Home Contracting"
                                    description="516 Brookway Drive"
                                />
                            </MapView>
                            <Text style={styles.center}><Text style={{fontWeight: 'bold'}}>Our address</Text>
{'\n'}516 Brookway Drive
{'\n'}Charlottesville, VA 22901
{'\n'}P: 434-817-7222
{'\n'}F: 434-817-7220
{'\n\n'}Contact us at:
{'\n'}<Text style={{color: 'blue'}} onPress={() => Linking.openURL('mailto:advantagehandy@yahoo.com')}>advantagehandy@yahoo.com</Text>
</Text>
                        </Body>
                    </CardItem>
                </Card>
                <Card>
                    <CardItem header bordered style={styles.container}>
                        <Text style={{fontSize: 36, color: '#5987a7'}}>Credits</Text>
                    </CardItem>
                    <CardItem>
                        <Body style={styles.container}>
                            <Text>Developed By: {'\n'}Jesse Du{'\n'}Sean Castrina{'\n'}Collin Castrina{'\n\n'}Published By: {'\n'}Champion Publishing</Text>
                        </Body>
                    </CardItem>
                </Card>
            </View>
        );
    }

    render() {
        // background color of logo: #3A5872 

        return (
            <Container>
                    <View style={{backgroundColor: "white", height: 20}} />
                    <Image
                        source={require('../../assets/logoCrop.png')}
                        style={{height: 170,width: '100%'}}
                    />
                    <Tabs
                        locked
                        renderTabBar={() => <ScrollableTab />}
                    >
                        <Tab heading="What We Do" style={styles.tab}>
                            <ScrollView>
                                {this.tab1()}
                            </ScrollView>
                        </Tab>
                        <Tab heading="Services" style={styles.tab}>
                            <ScrollView>
                                {this.tab2()}
                            </ScrollView>
                        </Tab>
                        <Tab heading="About Us" style={styles.tab}>
                            <ScrollView>
                                {this.tab3()}
                            </ScrollView>
                        </Tab>
                    </Tabs>

            </Container>
        );
    }

}