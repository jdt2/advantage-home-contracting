import React from 'react';
import { View } from 'react-native';
import styles from '../../Styles';
import {Container, Content, Text} from 'native-base';

export default class Home extends React.Component {

    static navigationOptions = ({navigation}) => {
        return {
            headerTitle: 'Advantage Home',
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
                    <Text>This tab is the home, possibly a description of services, etc.</Text>
                </Content>
            </Container>
        );
    }

}