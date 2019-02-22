import React from 'react';
import { View } from 'react-native';
import styles from '../../Styles';
import {Container, Content, Text} from 'native-base';

export default class Home extends React.Component {

    static navigationOptions = ({navigation}) => {
        return {
            headerTitle: 'Place a Request',
        };
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    render() {
        return (
            <Container>
                <Content contentContainerStyle={styles.container}>
                    <Text>This tab will place a request</Text>
                </Content>
            </Container>
        );
    }

}