import React from 'react';
import { View } from 'react-native';
import styles from '../../Styles';
import {Container, Content, Text} from 'native-base';

export default class Home extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    render() {
        return (
            <Container>
                <Content>
                    <Text>Something cool</Text>
                </Content>
            </Container>
        );
    }

}