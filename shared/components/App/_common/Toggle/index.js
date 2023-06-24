import React from 'react';
import Toggle from 'material-ui/Toggle';

const styles = {
  main: {
    marginLeft: 19,
  },
  thumbStart: {
    backgroundColor: '#d7d7d7',
    top: 6,
    left: 5,
    boxShadow: 'none',
  },
  thumbEnd: {
    top: 6,
    right: -5,
  },
  track: {
    backgroundColor: '#ffffff',
    padding: '11px 20px',
    border: '1px solid #cccccc',
  },
  icon: {
    width: 41,
  },
  label: {
    fontSize: 16,
    fontWeight: 'normal',
    color: '#adadad',
    paddingTop: 2,
  },
};

const ToggleSwitcher = props => (
  <Toggle
    thumbStyle={styles.thumbStart}
    thumbSwitchedStyle={styles.thumbEnd}
    trackStyle={styles.track}
    trackSwitchedStyle={styles.track}
    iconStyle={styles.icon}
    labelStyle={styles.label}
    label={props.label}
    labelPosition="right"
    style={props.style || styles.main}
    onToggle={props.onToggle}
    data-id={props.id}
    toggled={props.toggled}
  />
);

export default ToggleSwitcher;
