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
                        <Text style={{fontSize: 36, color: '#5987a7', textAlign:'center'}}>Mission Statement</Text>
                    </CardItem>
                    <CardItem>
                        <Body style={styles.container}>
                            <Text style={styles.center}>Provide workmanship that EXCEEDS YOUR EXPECTATIONS in a timely and professional manner</Text>
                        </Body>
                    </CardItem>
                </Card>
                <Card style={styles.cardSpace}>
                    <CardItem header bordered style={styles.container}>
                        <Text style={{fontSize: 36, color: '#5987a7', textAlign: 'center'}}>The Advantage Difference</Text>
                    </CardItem>
                    <CardItem>
                        <Body style={styles.container}>
                            <Text style={styles.center}>
                                {/*Advantage Home Contracting is your premier home contractor. We are there for you whether the project is big or small. Our team of in-house design and building professionals are fully licensed with no sub-contractors or outsourcing. When you work with Advantage you work with Advantage! All our professionals have at least 10 years of experience and we provide a 100% guarantee on our work with no mark-up on material cost.*/}
                                -Employees (not subcontractors) do 99% of all our work. Our employees have a minimum of 15 years experience.{"\n\n"}
                                -8 Divisions to serve nearly every Home Improvement/Repair or Remodeling project.{"\n\n"}
                                -In house design team to provide basic architectural drawings to interior design and coordination of any project.{"\n\n"}
                                The areas most awarded contractor with a BBB A+ Rating
                            </Text>
                        </Body>
                    </CardItem>
                </Card>
                <Card style={styles.cardSpace}>
                    <CardItem header bordered style={styles.container}>
                        <Text style={{fontSize: 36, color: '#5987a7', textAlign: 'center'}}>Free Estimate</Text>
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
                        {/* <Image style={styles.serviceIcon} source={require('../../assets/serviceIcons/level-7.png')} /> */}
                        <Text style={styles.cardHeader}>Handyman</Text>
                    </CardItem>
                    <CardItem>
                        <Body style={styles.serviceIcon} style={styles.container}>
                            <Text>No job to big or too small from simple repairs, installations to everything you can imagine</Text>
                        </Body>
                    </CardItem>
                </Card>
                <Card>
                    <CardItem header bordered style={styles.container}>
                        {/* <Image style={styles.serviceIcon} source={require('../../assets/serviceIcons/level-8.png')} /> */}
                        <Text style={styles.cardHeader}>Painting</Text>
                    </CardItem>
                    <CardItem>
                        <Body style={styles.serviceIcon} style={styles.container}>
                            <Text>We offer custom interior to cabinet repaint/re-stain to exteriors as well as metal roofs.
                                {"\n"}We also have an on staff designer to assist with color selections if needed
                            </Text>
                        </Body>
                    </CardItem>
                </Card>
                <Card style={styles.cardSpace}>
                    <CardItem header bordered style={styles.container}>
                        {/* <Image style={styles.serviceIcon} source={require('../../assets/serviceIcons/level-5.png')} /> */}
                        <Text style={styles.cardHeader}>Design and{"\n"}Build</Text>
                    </CardItem>
                    <CardItem>
                        <Body style={styles.serviceIcon} style={styles.container}>
                            <Text>We can help design and build your addition, garage, sunroom, screen or front porch or whatever you have in mind. We assist from concept, to drawings, acquiring permits and HOA approval to the final building inspection. Our difference of using employees and not subcontractors allows us to deliver a project in half the time of our competition.</Text>
                        </Body>
                    </CardItem>
                </Card>
                <Card style={styles.cardSpace}>
                    <CardItem header bordered style={styles.container}>
                        {/* <Image style={styles.serviceIcon} source={require('../../assets/serviceIcons/level-6.png')} /> */}
                        <Text style={styles.cardHeader}>Interior Remodeling{/*  (Baths, Kitchen, Basements and more) */}</Text>
                    </CardItem>
                    <CardItem>
                        <Body style={styles.serviceIcon} style={styles.container}>
                            <Text>We can help you update your bathrooms, kitchen and finish that basement for much needed space. We can re-locate a laundry room or just expand and open up rooms for that more modern floor plan. We have an on staff designer to make your project feel effortless and stress free.
                            </Text>
                        </Body>
                    </CardItem>
                </Card>
                <Card style={styles.cardSpace}>
                    <CardItem header bordered style={styles.container}>
                        {/* <Image style={styles.serviceIcon} source={require('../../assets/serviceIcons/level-4.png')} /> */}
                        <Text style={styles.cardHeader}>Decks and Porches</Text>
                    </CardItem>
                    <CardItem>
                        <Body style={styles.serviceIcon} style={styles.container}>
                            <Text>We can build or expand your existing deck and porch as well as rebuild it with Trex and or composite material of your choice. We can re-stain, rebuild or repair any deck or porch. We also offer our Turtle Deck refinishing system with its industry leading 5 year warranty.</Text>
                        </Body>
                    </CardItem>
                </Card>
                <Card style={styles.cardSpace}>
                    <CardItem header bordered style={styles.container}>
                        {/* <Image style={styles.serviceIcon} source={require('../../assets/serviceIcons/level-2.png')} /> */}
                        <Text style={styles.cardHeader}>Roofing and Siding</Text>
                    </CardItem>
                    <CardItem>
                        <Body style={styles.container}>
                            <Text>GAF certifies as well a James Hardy approved installer. We are the areas premier residential roofing and siding contractor. We can provide traditional shingle installs to metal roofing.</Text>
                        </Body>
                    </CardItem>
                </Card>
                <Card style={styles.cardSpace}>
                    <CardItem header bordered style={styles.container}>
                        {/* <Image style={styles.serviceIcon} source={require('../../assets/serviceIcons/level-1.png')} /> */}
                        <Text style={styles.cardHeader}>Tile</Text>
                    </CardItem>
                    <CardItem>
                        <Body style={styles.container}>
                            <Text>We have the most talented tile installers on our employee team so whether you want a new backsplash for your kitchen an updated tile floor or shower, we are your local proven choice.</Text>
                        </Body>
                    </CardItem>
                </Card>
                <Card style={styles.cardSpace}>
                    <CardItem header bordered style={styles.container}>
                        {/* <Image style={styles.serviceIcon} source={require('../../assets/serviceIcons/level-1.png')} /> */}
                        <Text style={styles.cardHeader}>Masonry</Text>
                    </CardItem>
                    <CardItem>
                        <Body style={styles.container}>
                            <Text>We can provide all your basic masonry repairs to chimney and steps.</Text>
                        </Body>
                    </CardItem>
                </Card>
                {/*<Card style={styles.cardSpace}>
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
                        <Image style={styles.serviceIcon} source={require('../../assets/serviceIcons/level-5.png')} />
                        <Text style={{fontSize: 36, color: '#5987a7'}}>Construction</Text>
                    </CardItem>
                    <CardItem>
                        <Body style={styles.serviceIcon} style={styles.container}>
                            <Text>Advantage Home Contracting holds a VA Class A Contractors License with a Builders designation. Offering the areas most comprehensive design and build staff providing permit and drawings assistance to complete project oversight and execution.</Text>
                        </Body>
                    </CardItem>
                </Card>*/}
            </View>
        );
    }

    tab3() {
        return (
            <View>
                <Card style={styles.cardSpace}>
                    <CardItem header bordered style={styles.container}>
                        {/* <Text style={{fontSize: 36, color: '#5987a7'}}>Where Are We?</Text> */}
                        <Image style={{width: 320, height: 300}} source={require('../../assets/icons/AHCStaffPhoto.jpg')} />
                    </CardItem>
                    <CardItem>
                        <Body style={styles.container}>
                            {/* <MapView
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
                            </MapView> */}
                            <Text style={styles.center}>
                                Servicing Charlottesville and surrounding area since 2000{"\n"}
                            </Text>
                            <View style={{flex:1,height:100,justifyContent: 'center', alignItems: 'center',flexDirection: 'row'}}>
                                <Image style={{flex:1, resizeMode: 'contain', marginRight: 10}} source={require('../../assets/icons/ReadersChoice.jpg')} />
                                <Image style={{flex:1, resizeMode: 'contain', marginRight: 10}} source={require('../../assets/icons/BestinCVille.jpg')} />
                                <Image style={{flex:1, resizeMode: 'contain'}} source={require('../../assets/icons/CharlottesvilleFamilyAward.jpg')} />
                            </View>
                            <Text style={styles.center}>
                                {"\n"}BBB A+ Rating{"\n"}
                            </Text>                                

                            <Image style={{width: 127, height: 140}} source={require('../../assets/icons/BBBRating.jpg')} />

                            <Text style={styles.center}>
                            {"\n"}Locally owned and operated{"\n"}
                            </Text>

                            <Image style={{width: 320, height: 240}} source={require('../../assets/icons/AHCOffice.jpg')} />
                            <Text style={[styles.center, {marginTop: 20,}]}>
                            <Text style={{fontWeight: 'bold', textAlign: 'center'}}>Our address</Text>
{'\n'}516 Brookway Drive
{'\n'}Charlottesville, VA 22901
{'\n'}P: 434-817-7222
{'\n\n'}Website:
{'\n'}<Text style={{color: 'blue'}} onPress={() => Linking.openURL('www.advantagehandy.com')}>www.advantagehandy.com
</Text></Text>
                        </Body>
                    </CardItem>
                </Card>
                <Card>
                    <CardItem header bordered style={styles.container}>
                        <Text style={{fontSize: 36, color: '#5987a7', textAlign: 'center'}}>Credits</Text>
                    </CardItem>
                    <CardItem>
                        <Body style={styles.container}>
                            <Text style={{textAlign: 'center'}}>Developed By: {'\n'}Jesse Du{'\n'}Sean Castrina{'\n'}Collin Castrina{'\n\n'}Published By: {'\n'}Champion Publishing</Text>
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
                    <View
                        style={{backgroundColor:'#3A5872',alignItems:'center'}}
                    >
                        <Image
                            source={require('../../assets/logo.png')}
                            style={{height: 100,width: '50%'}}
                        />
                    </View>
                    <Tabs
                        locked
                        tabBarUnderlineStyle={{backgroundColor: '#3A5872'}}
                        renderTabBar={() => <ScrollableTab />}
                    >
                        <Tab heading="The Advantage Difference" style={styles.tab} activeTextStyle={{color: '#3A5872'}}>
                            <ScrollView>
                                {this.tab1()}
                            </ScrollView>
                        </Tab>
                        <Tab heading="Services" style={styles.tab} activeTextStyle={{color: '#3A5872'}}>
                            <ScrollView>
                                {this.tab2()}
                            </ScrollView>
                        </Tab>
                        <Tab heading="About Us" style={styles.tab} activeTextStyle={{color: '#3A5872'}}>
                            <ScrollView>
                                {this.tab3()}
                            </ScrollView>
                        </Tab>
                    </Tabs>

            </Container>
        );
    }

}