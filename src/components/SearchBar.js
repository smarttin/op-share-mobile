import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, TextInput } from 'react-native';
import constants from '../constants';
import styles from '../styles';

const styleSheetStyles = StyleSheet.create({
  searchTextInput: {
    width: constants.width - 40,
    height: 35,
    backgroundColor: styles.lightGreyColor,
    padding: 10,
    borderRadius: 5,
    textAlign: 'center',
  },
});

const SearchBar = ({ value, onChange, onSubmit }) => {
  return (
    <TextInput
      style={styleSheetStyles.searchTextInput}
      returnKeyType="search"
      onChangeText={onChange}
      onEndEditing={onSubmit}
      value={value}
      placeholder="Search"
      placeholderTextColor={styles.darkGreyColor}
    />
  );
};

SearchBar.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default SearchBar;
