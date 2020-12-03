import { gql, useQuery } from '@apollo/client';
import React, { useLayoutEffect, useState } from 'react';
import { RefreshControl, ScrollView } from 'react-native';
import SearchBar from '../../components/Searchbar';
import Loader from '../../components/Loader';
import SquarePhoto from '../../components/SquarePhoto';

export const SEARCH = gql`
  query search($term: String!) {
    searchPost(term: $term) {
      id
      files {
        id
        url
      }
      likeCount
      commentCount
    }
  }
`;

const Search = ({ navigation }) => {
  const [term, setTerm] = useState('');
  const [shouldFetch, setShouldFetch] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const onSubmit = () => {
    setShouldFetch(true);
  };

  const onChange = (text) => {
    setShouldFetch(false);
    setTerm(text);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <SearchBar value={term} onSubmit={onSubmit} onChange={onChange} />
      ),
    });
  }, [navigation, term]);

  const { data, loading, refetch } = useQuery(SEARCH, {
    variables: {
      term,
    },
    skip: !shouldFetch,
    fetchPolicy: 'network-only',
  });
  // console.log(data, loading);
  const onRefresh = async () => {
    try {
      setRefreshing(true);
      await refetch({ variables: { term } });
    } catch (e) {
      console.log(e);
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
      }
    >
      {loading ? (
        <Loader />
      ) : (
        data &&
        data.searchPost &&
        data.searchPost.map((post) => <SquarePhoto key={post.id} {...post} />)
      )}
    </ScrollView>
  );
};

export default Search;
