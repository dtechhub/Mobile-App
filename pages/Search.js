import * as React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

let styles = StyleSheet.create({
  text: {
    fontSize: 30,
    textAlign: 'center',
    color: 'white',
  },
  container: {
    margin: 10,
    padding: 30,
    flex: 1,
    borderRadius: 30,
    backgroundColor: 'lightblue',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    margin: 10,
    flexDirection: 'column',
  },
});

export const SearchPage = () => {
  const baseUrl = 'https://cse.google.com/cse?cx='
  const localURL = baseUrl + '48914c92749d7fc41';
  const globalURL = baseUrl + '2f541d1a0c2da69d4';

  return (
    <View style={styles.content}>
      <TouchableOpacity style={styles.container} onPress={() => window.open(localURL)}>
        <Text style={styles.text}>Search the School</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.container} onPress={() => window.open(globalURL)}>
        <Text style={styles.text}>Search Google</Text>
      </TouchableOpacity>
    </View>
  );
};
