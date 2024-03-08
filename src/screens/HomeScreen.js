// HomeScreen.js
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import axios from 'axios';

const HomeScreen = ({navigation}) => {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchRandomMovies();
  }, []);
  useEffect(() => {
    if (searchQuery.length > 2) {
      searchMovies();
    }
  },[searchQuery]);

  const fetchRandomMovies = async () => {
    try {
      const response = await axios.get(
        'https://search.imdbot.workers.dev/?q=Niram',
      );
      setMovies(response.data);
    } catch (error) {
      console.error('Error fetching random movies:', error);
    }
  };

  const searchMovies = async () => {
    try {
      const response = await axios.get(
        `https://search.imdbot.workers.dev/search?q=${searchQuery}`,
      );
      console.log('response.data.results *** ', response.data.description);
      setMovies(response.data);
    } catch (error) {
      console.error('Error searching movies:', error);
    }
  };

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('MovieDetail', {movieId: item['#IMDB_ID']})
        }>
        <View style={styles.card}>
          <Image
            source={{uri: item['#IMG_POSTER']}}
            style={styles.image}
            resizeMode="contain"
          />
          <View style={styles.box}>
            <Text>{item['#TITLE']} </Text>
            <Text>Year : {item['#YEAR']} </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View>
      <TextInput
        placeholder="Search for movies..."
        value={searchQuery}
        onChangeText={text => setSearchQuery(text)}
        onSubmitEditing={searchMovies}
        style={styles.input}
      />
      <FlatList data={movies.description} renderItem={renderItem} />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  card: {
    borderWidth: 0.2,
    borderRadius: 10,
    flexDirection: 'row',
  },
  box: {
    paddingVertical: 10,
  },
  image: {
    width: 100,
    height: 100,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
