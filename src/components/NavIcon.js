import React from 'react';
import {Ionicons} from '@expo/vector-icons';
import PropTypes from 'prop-types';
import styles from '../styles';

const NavIcon = ({focused, name, color, size}) => (
  <Ionicons name={name} color={focused ? color : styles.darkGreyColor} size={size} />
);

NavIcon.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string,
  size: PropTypes.number,
  focused: PropTypes.bool,
};

NavIcon.defaultProps = {
  focused: true,
  color: styles.blackColor,
  size: 30,
};

export default NavIcon;
