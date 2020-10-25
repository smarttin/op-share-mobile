import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import constants from '../constants';

const Container = styled.View`
  margin-bottom: 10px;
`;

const TextInput = styled.TextInput`
  width: ${constants.width / 1.7}px;
  padding: 10px;
  background-color: ${(props) => props.theme.greyColor};
  border: 0.5px solid ${(props) => props.theme.darkGreyColor};
  border-radius: 4px;
`;

const AuthInput = ({
  placeholder,
  value,
  autoCorrect,
  keyboardType,
  autoCapitalize,
  returnKeyType,
  onChange,
  onSubmitEditing,
}) => (
  <Container>
    <TextInput
      placeholder={placeholder}
      autoCorrect={autoCorrect}
      value={value}
      keyboardType={keyboardType}
      autoCapitalize={autoCapitalize}
      returnKeyType={returnKeyType}
      onChangeText={onChange}
      onSubmitEditing={onSubmitEditing}
    />
  </Container>
);

AuthInput.propTypes = {
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  keyboardType: PropTypes.oneOf([
    'default',
    'number-pad',
    'decimal-pad',
    'numeric',
    'email-address',
    'phone-pad',
  ]),
  autoCapitalize: PropTypes.oneOf(['none', 'sentences', 'words', 'characters']),
  onChange: PropTypes.func.isRequired,
  returnKeyType: PropTypes.oneOf(['done', 'go', 'next', 'search', 'send']),
  onSubmitEditing: PropTypes.func,
  autoCorrect: PropTypes.bool,
};

AuthInput.defaultProps = {
  keyboardType: 'default',
  autoCapitalize: 'none',
  returnKeyType: 'done',
  onSubmitEditing: () => null,
  autoCorrect: true,
};

export default AuthInput;
