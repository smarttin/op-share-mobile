import React, {useState} from 'react';
import {ScrollView, RefreshControl, Text} from 'react-native';
import {useQuery, gql} from '@apollo/client';
import Loader from '../../components/Loader';
import Post from '../../components/Post';

const FEED_QUERY = gql`
  {
    seeFeed {
      id
      location
      caption
      user {
        id
        avatar
        username
      }
      files {
        id
        url
      }
      likeCount
      isLiked
      comments {
        id
        text
        user {
          id
          username
        }
      }
      createdAt
    }
  }
`;

const Home = () => {
  const [refreshing, setRefreshing] = useState(false);
  const {loading, data, error, refetch} = useQuery(FEED_QUERY);
  const refresh = async () => {
    try {
      setRefreshing(true);
      await refetch();
    } catch (e) {
      console.log(e);
    } finally {
      setRefreshing(false);
    }
  };
  if (!loading && error) {
    console.log(error.message);
    return <Text>Ooops! an error just occured, try again.</Text>;
  }
  return (
    <ScrollView
      contentContainerStyle={{backgroundColor: 'white', flex: 1}}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refresh} />}
    >
      {loading ? (
        <Loader />
      ) : (
        data && data.seeFeed && data.seeFeed.map((post) => <Post key={post.id} {...post} />)
      )}
    </ScrollView>
  );
};

export default Home;
