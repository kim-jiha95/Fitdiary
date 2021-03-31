import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { Header, Left, Body, Right, Button } from 'native-base';
import { Ionicons } from '@expo/vector-icons';

const logo = require('../assets/logo.png');

export default function HeaderComponentWithBack() {
  return (
    <Header style={styles.header} transparent>
      <Left>
        <Button transparent>
          <Ionicons name={'chevron-back'} color="grey" size={26} />
        </Button>
      </Left>
      <Body>
        <Button transparent>
          <Image source={logo} style={styles.logoImage} />
        </Button>
      </Body>
      <Right>
        <Button transparent></Button>
      </Right>
    </Header>
  );
}

const styles = StyleSheet.create({
  header: {
    marginVertical: 5,
    borderBottomWidth: 1.5,
    borderBottomColor: '#EEE',
    justifyContent: 'center',
  },
  logoImage: {
    width: 100,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
});