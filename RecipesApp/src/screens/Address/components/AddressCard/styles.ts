import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 20
  },
  titleWrapper: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  titleIcon: {
    height: 20,
    width: 20,
    marginRight: 10,
    tintColor: 'gray'
  },
  addressText: {
    color: 'gray',
    paddingVertical: 10
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
});

export default styles;
