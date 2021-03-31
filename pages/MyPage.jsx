import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Container, Content } from 'native-base';

import HeaderComponent from '../components/HeaderComponent';
import ImageComponent from '../components/ImageComponent';
import Loading from './Loading';
import { getData } from '../config/firebaseFunctions';

export default function MyPage({ navigation }) {
  const [state, setState] = useState([]);
  const [ready, setReady] = useState(true);

  useEffect(() => {
    const unsubscrbie = navigation.addListener('focus', (e) => {
      console.log('마이페이지 접속중');
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
        <View style={styles.feed}>
          {state.map((content, i) => {
            return (
              <ImageComponent
                content={content}
                key={i}
                navigation={navigation}
              />
            );
          })}
        </View>
      </Content>
    </Container>
  );
}

const styles = StyleSheet.create({
  feed: {
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
});