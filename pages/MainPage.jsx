import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Content } from 'native-base';

import HeaderComponent from '../components/HeaderComponent';
import CardComponent from '../components/CardComponent';
import Loading from './Loading';
import { getData } from '../config/firebaseFunctions';

export default function MainPage({ navigation }) {
  const [state, setState] = useState([]);
  const [ready, setReady] = useState(true);

  useEffect(() => {
    const unsubscrbie = navigation.addListener('focus', (e) => {
      console.log('메인페이지 접속중');
    });
    download();
    return unsubscrbie;
  }, [navigation]);

  const download = async () => {
    console.log('업로드 준비중!');

    const result = await getData();

    // console.log(result);

    setState(result);
    setReady(false);
  };

  return ready ? (
    <Loading />
  ) : (
    <Container>
      <HeaderComponent />
      <Content>
        {state.map((content, i) => {
          return (
            <CardComponent content={content} key={i} navigation={navigation} />
          );
        })}
      </Content>
    </Container>
  );
}

const styles = StyleSheet.create({});