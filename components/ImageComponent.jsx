import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import ImageBlurLoading from 'react-native-image-blur-loading';

const imageWidth = Dimensions.get('window').width / 3;

export default function ImageComponent({ navigation, content }) {
  return (
    <ImageBlurLoading
      withIndicator
      thumbnailSource={{ uri: content.image }}
      source={{ uri: content.image }}
      style={styles.image}
    />
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', alignSelf: 'center' },
  card: {
    width: '100%',
    alignSelf: 'center',
  },
  image: {
    width: imageWidth,
    height: imageWidth,
  },
});