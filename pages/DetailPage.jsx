import React, { useEffect } from 'react';
import { StyleSheet, Text } from 'react-native';
import { Container, Content } from 'native-base';
import ImageBlurLoading from 'react-native-image-blur-loading';

import 'firebase/firestore';
import PostComponent from '../components/PostComponent';
import HeaderComponent from '../components/HeaderComponent';
import HeaderComponentWithBack from '../components/HeaderComponentWithBack';
export default function DetailPage({ navigation, route }) {
  const content = route.params.content;

  useEffect(() => {
    console.log('디테일페이지 접속중');

    navigation.setOptions({
      title: '디테일페이지',
      headerStyle: {
        backgroundColor: '#fff',
        shadowColor: '#fff',
      },
      headerTintColor: 'grey',
      headerShown: true,
      headerBackTitleVisible: false,
    });
  }, []);

  return (
    <Container>
      <HeaderComponentWithBack />
      <Content
        contentContainerStyle={{
          alignItems: 'center',
          marginTop: 20,
        }}
      >
        <PostComponent content={content} navigation={navigation} />
      </Content>
    </Container>
  );
}

const styles = StyleSheet.create({});