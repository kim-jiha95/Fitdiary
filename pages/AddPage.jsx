import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, Platform, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Grid } from 'react-native-easy-grid';
import {
  Container,
  Content,
  Text,
  Button,
  Item,
  Input,
  Form,
  Textarea,
} from 'native-base';
import HeaderComponent from '../components/HeaderComponent';

import 'firebase/firestore';

import { addDiary, imageUpload } from '../config/firebaseFunctions';

const tempImage =
  'https://firebasestorage.googleapis.com/v0/b/sparta-study-plus.appspot.com/o/lecture%2F6-min.png?alt=media&token=bbc87679-4084-40ad-b6cd-01e808983fa4';

const loading = require('../assets/loading.gif');

export default function AddPage({ navigation }) {
  const [title, setTitle] = useState('');
  // const [titleError, setTitleError] = useState('');

  const [content, setContent] = useState('');
  // const [contentError, setContentError] = useState('');

  const [image, setImage] = useState(tempImage);
  const [imageURI, setImageURI] = useState('');

  const [progress, setProgress] = useState(false);

  useEffect(() => {
    const unsubscrbie = navigation.addListener('focus', (e) => {
      console.log('작성페이지 접속중');
    });
    getPermission();
    return unsubscrbie;
  }, [navigation]);

  const getPermission = async () => {
    if (Platform.OS !== 'web') {
      const {
        status,
      } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('게시글을 업로드하려면 사진첩 권한이 필요합니다.');
      }
    }
  };

  const upload = async () => {
    console.log('업로드 준비중!');
    setProgress(true);

    const days = ['일', '월', '화', '수', '목', '금', '토'];
    let date = new Date();

    let year = date.getFullYear() + '년 ';
    let month = date.getMonth() + 1 + '월 ';
    let date1 = date.getDate() + '일 ';
    let day = days[date.getDay()] + '요일 ';
    let hour = date.getHours() + '시 ';
    let min = date.getMinutes() + '분';
    let time = date.getTime();

    let data = {
      key: time,
      title: title,
      desc: content,
      image: image,
      date: year + month + date1 + day + hour + min,
    };
    const response = await fetch(imageURI);
    const blob = await response.blob();
    const imageURL = await imageUpload(blob, time);

    data.image = imageURL;
    console.log(data);

    let result = await addDiary(data);
    // await addDiary(data);

    if (result) {
      await Alert.alert('글이 성공적으로 등록되었습니다!');
      setTitle('');
      setContent('');
      setImage(tempImage);
      setImageURI('');
      setProgress(false);
      navigation.push('TabNavigator');
    } else {
      await Alert.alert('문제가 생겼습니다. 다시 작성해주세요!');
      setProgress(false);
    }
  };

  const pickImage = async () => {
    console.log('이미지 선택중');
    let imageData = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    getImageURI(imageData);
  };

  const getImageURI = async (imageData) => {
    setImageURI(imageData.uri);
  };

  return (
    <Container>
      {progress == false ? null : (
        <Image source={loading} style={styles.progress} />
      )}
      <HeaderComponent />
      <Content>
        {imageURI == '' ? (
          <Grid style={styles.imageUpload} onPress={() => pickImage()}>
            <Text style={styles.imageUploadPlus}>+</Text>
          </Grid>
        ) : (
          <Grid
            style={styles.imagePreviewContainer}
            onPress={() => pickImage()}
          >
            <Image source={{ uri: imageURI }} style={styles.imagePreview} />
          </Grid>
        )}

        <Item regular style={styles.title}>
          <Input
            placeholder="오늘의 건강 만족%를 입력하세요!"
            style={{ fontSize: 13 }}
            value={title}
            onChangeText={(text) => setTitle(text)}
          />
        </Item>
        <Form style={styles.contentLayout}>
          <Textarea
            rowSpan={8}
            bordered
            placeholder="근손실 없으셨나요?"
            style={styles.content}
            value={content}
            onChangeText={(text) => setContent(text)}
          />
        </Form>
        <Button full style={styles.uploadButton} onPress={() => upload()}>
          <Text>건강 일지 작성</Text>
        </Button>
      </Content>
    </Container>
  );
}

const styles = StyleSheet.create({
  progress: {
    width: 100,
    height: 100,
    borderRadius: 100,
    position: 'absolute',
    top: '50%',
    alignSelf: 'center',
    zIndex: 2,
  },
  imageUpload: {
    borderWidth: 2,
    borderRadius: 10,
    borderColor: 'grey',
    borderStyle: 'dashed',
    width: '90%',
    height: 200,
    marginTop: 20,
    alignSelf: 'center',
    alignItems: 'center',
  },
  imageUploadPlus: {
    textAlign: 'center',
    width: '100%',
    fontSize: 90,
    fontWeight: '300',
    color: 'grey',
  },
  imagePreviewContainer: {
    width: '90%',
    marginTop: 20,
    alignSelf: 'center',
  },
  imagePreview: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  title: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 10,
    borderRadius: 10,
  },
  contentLayout: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 10,
  },
  content: {
    paddingVertical: 10,
    borderRadius: 10,
    fontSize: 13,
  },
  uploadButton: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 10,
    backgroundColor: '#00498c',
  },
});