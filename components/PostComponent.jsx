import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Text, Container } from 'native-base';
import ImageBlurLoading from 'react-native-image-blur-loading';

const imageWidth = Dimensions.get('window').width;

export default function PostComponent({ content }) {
  return (
    <Container>
      <ImageBlurLoading
        withIndicator
        thumbnailSource={{ uri: content.image }}
        source={{ uri: content.image }}
        style={styles.image}
      />
      <View style={styles.post}>
        <Text numberOfLines={1} style={styles.title}>
          {content.title}
        </Text>
        <Text style={styles.desc}>{content.desc}</Text>
        <Text style={[styles.grey, styles.date]}>{content.date}</Text>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  image: { width: imageWidth, height: imageWidth },
  post: {
    marginLeft: 10,
  },
  title: {
    fontWeight: '700',
    fontSize: 15,
    marginVertical: 5,
  },
  desc: {
    fontSize: 13,
    marginVertical: 5,
  },
  date: {
    fontSize: 10,
    color: 'grey',
    marginVertical: 5,
  },
  grey: { color: 'grey' },
});