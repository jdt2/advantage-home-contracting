import React from 'react';
import { View } from 'react-native';
import styles from '../../Styles';
import {Container, Content, Text} from 'native-base';

export default class List extends React.Component {

    static navigationOptions = ({navigation}) => {
        return {
            headerTitle: 'Your Orders',
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
                    <Text>This tab lists placed orders</Text>
                </Content>
            </Container>
        );
    }

}