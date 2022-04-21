import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  headerButtonContainer: {
    padding: 10
  },
  headerButtonImage: {
    justifyContent: 'center',
    width: 25,
    height: 25,
    margin: 6
  },
  badge: {
    position: 'absolute',
    right: 10,
    top: 10,
    backgroundColor: 'red',
    borderRadius: 8,
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default styles;
