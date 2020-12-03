import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { ScrollView } from 'react-native';
import Loader from '../components/Loader';
import Post from '../components/Post';
import { POST_FRAGMENT } from '../fragments';

const POST_DETAIL = gql`
  query seeFullPost($id: String!) {
    seeFullPost(id: $id) {
      ...PostParts
    }
  }
  ${POST_FRAGMENT}
`;

const Detail = ({ route }) => {
  const { loading, data } = useQuery(POST_DETAIL, {
    variables: { id: route.params?.id ?? '' },
  });

  return (
    <ScrollView>
      {loading ? (
        <Loader />
      ) : (
        data && data.seeFullPost && <Post {...data.seeFullPost} />
      )}
    </ScrollView>
  );
};

export default Detail;
