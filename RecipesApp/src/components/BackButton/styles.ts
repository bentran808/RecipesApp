import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  btnContainer: {
    alignItems: 'center',
    borderRadius: 180,
    padding: 8,
    margin: 10,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3
  },
  btnIcon: {
    height: 17,
    width: 17
  }
});

export default styles;
