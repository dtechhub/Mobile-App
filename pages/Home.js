import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
  Button,
  Linking,
  Alert,
} from 'react-native';
import { SearchBar, Icon } from 'react-native-elements';

function validURL(str) {
  var pattern = new RegExp('^(https?:\\/\\/)?'+
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+
    '((\\d{1,3}\\.){3}\\d{1,3}))'+
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+
    '(\\?[;&a-z\\d%_.~+=-]*)?'+
    '(\\#[-a-z\\d_]*)?$','i');
  return !!pattern.test(str);
}

const ITEMS = [
  {
    key: 'default:1',
    image: require('./../assets/canvas.png'),
    title: 'Canvas',
    url: '//dtechhs.instructure.com/login/saml',
    keywords: 'canvas instructure assignments homework',
  },
  {
    key: 'default:2',
    image: require('./../assets/fl.png'),
    title: 'Formation\nLearning',
    url: '//dtech.formationlearning.com',
    keywords: 'formation learning wyn time dragon time schedule iwt clubs Math Center Referral',
  },
  {
    key: 'default:3',
    image: require('./../assets/schoolsite.png'),
    title: 'School\nWebsite',
    url: '//dtechhs.org',
    keywords: 'dtech school website design tech high school community about information enroll schedule',
  },
  {
    key: 'default:4',
    image: require('./../assets/news.png'),
    title: 'News\nPage',
    url: 'https://docs.google.com/document/d/1qa89KUFIa8fdKPSns4WNmF76-Kb1yrSV3zBPyz4m1TI/edit',
    keywords: 'announcements page google docs documents news updates',
  },
  {
    key: 'default:5',
    image: require('./../assets/gmail.png'),
    title: 'Google\nMail',
    url: '//gmail.com',
    keywords: 'google mail gmail email messages google chat schedule send',
  },
  {
    key: 'default:6',
    image: require('./../assets/gcalendar.png'),
    title: 'Google\nCalendar',
    url: '//calendar.google.com',
    keywords: 'schedule google calendar meeting event',
  },
  {
    key: 'default:7',
    image: require('./../assets/gdrive.png'),
    title: 'Google\nDrive',
    url: '//drive.google.com/drive',
    keywords: 'files google drive storage sharing',
  },
  {
    key: 'default:8',
    image: require('./../assets/gdocs.png'),
    title: 'Google\nDocs',
    url: '//docs.google.com',
    keywords: 'google docs new documents text writing essay',
  },
  {
    key: 'default:9',
    image: require('./../assets/gslides.png'),
    title: 'Google\nSlides',
    url: '//slides.google.com',
    keywords: 'google slides presentation slideshow drawing',
  },
  {
    key: 'default:10',
    image: require('./../assets/gsheets.png'),
    title: 'Google\nSheets',
    url: '//sheets.google.com',
    keywords: 'google sheets spreadsheets document row column math formula graphs tables data charts',
  },
  {
    key: 'default:11',
    image: require('./../assets/gforms.png'),
    title: 'Google\nForms',
    url: '//forms.google.com',
    keywords: 'google forms survey quiz feedback test',
  },
  {
    key: 'default:12',
    image: require('./../assets/gkeep.png'),
    title: 'Google\nKeep',
    url: '//keep.google.com',
    keywords: 'google keep notes tasks lists image to text',
  },
];

const Item = ({ itemKey, image, title, url, deletable, deleteCallback }) => (
  <View>
    <TouchableOpacity
      style={styles.item}
      onPress={() => {
        window.open((url.startsWith('https://') ? '' : 'https://') + url);
      }}>
      <Image style={styles.image} source={image} />
      <View style={styles.textWrapper}>
        <Text style={styles.text}>{title}</Text>
      </View>
    </TouchableOpacity>
    {deletable && (
      <TouchableOpacity
        style={styles.deleteItem}
        onPress={() => deleteCallback(itemKey)}
      >
        <Icon name='delete' color='white' size={30} />
      </TouchableOpacity>
    )}
  </View>
);

let styles = StyleSheet.create({
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    margin: 10,
    padding: 40,
    backgroundColor: 'lightblue',
    borderRadius: 30,
    alignItems: 'center',
  },
  image: {
    width: 120,
    height: 120,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  textWrapper: {
    minWidth: 180,
    minHeight: 100,
    padding: 20,
    borderRadius: 20,
    backgroundColor: 'gray',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    fontSize: 25,
    color: 'white',
  },
  content: {
    height: '100%',
  },
  search: {
    margin: 20,
    padding: 8,
    borderColor: 'black',
    borderRadius: 10,
    borderWidth: 2,
  },
  results: {
    marginBottom: 10,
    padding: 10,
    fontSize: 20,
    textAlign: 'center',
  },
  add: {
    width: 60,
    height: 60,
    borderWidth: 5,
    borderColor: 'white',
    borderRadius: 30,
    position: 'absolute',
    alignSelf: 'center',
    bottom: 10,
    backgroundColor: 'lightseagreen',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addText: {
    fontSize: 40,
    fontWeight: 600,
    alignItems: 'center',
    color: 'white',
  },
  formBackground: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, .4)',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    height: '70%',
    padding: 20,
    borderRadius: 10,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  formHeader: {
    fontSize: 20,
    paddingBottom: 10,
  },
  textInput: {
    textAlign: 'center',
    padding: 10,
    borderRadius: 10,
    outlineStyle: 'solid',
    outlineWidth: 2,
  },
  formControls: {
    width: '100%',
    paddingTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  deleteItem: {
    position: 'absolute',
    top: 3,
    right: 3,
    backgroundColor: 'red',
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: 'white',
  },
});

export const HomePage = () => {
  const formatResults = (resultCount) => {
    return resultCount ? resultCount + ' results found' : 'No results found';
  };

  const [query, setQuery] = useState('');
  const [items, setItems] = useState(ITEMS);
  const [searchedItems, setSearchedItems] = useState(ITEMS);
  const [resultView, setResultView] = useState(formatResults(ITEMS.length));
  const [promptDisplay, setPromptDisplay] = useState(false);
  const [tempTitle, setTempTitle] = useState('');
  const [tempURL, setTempURL] = useState('');
  const [tempImage, setTempImage] = useState('');
  const [tempKeywords, setTempKeywords] = useState('');

  const resetForm = () => {
    setPromptDisplay(false);
    setTempTitle('');
    setTempURL('');
    setTempImage('');
    setTempKeywords('');
  }

  const searchFilter = useCallback((itemSet) => {
    if (query === '') {
      return itemSet;
    }
    return itemSet.filter((item) => {
      let searchTerms = query
        .toLowerCase()
        .trim()
        .split(' ');
      return searchTerms.every((term) => item.keywords.includes(term));
    });
  }, [query]);

  const deleteItem = (key) => {
    setItems(items.filter(item => item.key != key));
  }

  useEffect(() => {
    setSearchedItems(searchFilter(items));
  }, [query, items, searchedItems, searchFilter]);

  useEffect(() => {
    setResultView(formatResults(searchedItems.length));
  }, [searchedItems]);

  return (
    <View style={styles.content}>
      <TextInput
        style={styles.search}
        text={query}
        onChangeText={(currentQuery) => {
          setQuery(currentQuery);
        }}
        placeholder="Search for a website..."
      />
      <Text style={styles.results}>{resultView}</Text>
      <FlatList
        contentContainerStyle={styles.list}
        data={searchedItems}
        renderItem={({ item }) => (
          <Item
            itemKey={item.key}
            image={item.image}
            title={item.title}
            url={item.url}
            deletable={!item.key.startsWith('default:')}
            deleteCallback={deleteItem}
          />
        )}
      />
      <TouchableOpacity
        style={styles.add}
        onPress={() => setPromptDisplay(true)}>
        <Text style={styles.addText}>+</Text>
      </TouchableOpacity>
      {promptDisplay && (
        <View style={styles.formBackground}>
          <View style={styles.form}>
            <Text style={styles.formHeader}>New website</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Title"
              onChangeText={(text) => setTempTitle(text)}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Website URL"
              onChangeText={(text) => setTempURL(text)}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Image URL"
              onChangeText={(text) => setTempImage(text)}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Keywords"
              onChangeText={(text) => setTempKeywords(text)}
            />
            <View style={styles.formControls}>
              <Button
                style={styles.formButton}
                title="Confirm"
                onPress={() => {
                  let newItem = {
                    key: 'custom:' + Date.now().toString(),
                    image: tempImage,
                    title: tempTitle,
                    url: tempURL,
                    keywords: tempKeywords,
                  };
                  let currentItems = items.concat(newItem);
                  setItems(currentItems);
                  resetForm();
                }}
              />
              <Button
                style={styles.formButton}
                title="Cancel"
                onPress={resetForm}
              />
            </View>
          </View>
        </View>
      )}
    </View>
  );
};
