import React, {useState, useEffect} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import axios from 'axios';

const MovieDetailScreen = ({route}) => {
  const {movieId} = route.params;
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    fetchMovieDetails();
  }, []);

  const fetchMovieDetails = async () => {
    try {
      const response = await axios.get(
        `https://search.imdbot.workers.dev/?tt=${movieId}`,
      );
      setMovieDetails(response.data);
    } catch (error) {
      console.error('Error fetching movie details:', error);
    }
  };
  if (!movieDetails) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View>
      <Image source={{uri: movieDetails.short.image}} style={styles.image} />
      <View style={styles.container}>
        <Text style={styles.title}>Title: {movieDetails.short.name}</Text>
        <Text style={styles.description}>
          Description: {movieDetails.short.description}
        </Text>
      </View>
    </View>
  );
};

export default MovieDetailScreen;
const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 300,
  },
  container: {
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: '400',
    marginVertical: 20,
  },
  description: {
    fontSize: 15,
    fontWeight: '400',
    marginVertical: 20,
  },
});
