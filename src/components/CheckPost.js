import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import Swiper from 'react-native-swiper';
import constants from '../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginBottom: 40,
  },
  header: {
    padding: 8,
    // width: constants.width,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerUserContainer: {
    marginLeft: 10,
  },
  bold: { fontWeight: '600' },
  location: { fontSize: 12 },
});

const CheckPost = (props) => {
  const { id, user, location, files, likeCount, caption, comments } = props;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Image
            style={{ height: 40, width: 40, borderRadius: 20 }}
            source={{ uri: user.avatar }}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.headerUserContainer}>
            <Text style={styles.bold}>{user.username}</Text>
            <Text style={styles.location}>{location}</Text>
          </View>
        </TouchableOpacity>
      </View>
      <Swiper
        showsPagination={false}
        style={{ height: constants.height / 2.5 }}
      >
        {files.map((file) => (
          <Image
            style={{
              width: constants.width,
              height: constants.height / 2.5,
            }}
            key={file.id}
            source={{ uri: file.url }}
          />
        ))}
      </Swiper>
    </View>
  );
};

export default CheckPost;
