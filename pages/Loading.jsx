import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import bg from '../assets/loading.gif';

export default function Loading() {
  return (
    <View style={styles.container}>
      <Image source={bg} style={styles.background} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    //앱의 배경 색
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    width: '100%',
    height: '100%',
    resizeMode: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
  },
});