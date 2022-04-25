import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';

let styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    padding: 10,
    borderRadius: 10,
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center'
  },
});

export const AboutPage = () => {
  const aboutText =
    'The d.hub is an interactive and easy way for d.tech students to easily access many essential websites like Canvas, Formation Learning, Google Calendar and Drive, etc. Thank you for supporting and using the d.hub.';
  const titleText = 'About this application'

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{titleText}</Text>
      <Text style={styles.text}>{aboutText}</Text>
    </View>
  );
};
