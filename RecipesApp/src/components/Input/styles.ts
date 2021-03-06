import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EDEDED',
    borderRadius: 10,
    width: 250,
    justifyContent: 'space-around'
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: 'grey'
  },
  searchInput: {
    backgroundColor: '#EDEDED',
    color: 'black',
    width: 180,
    paddingVertical: 10
  }
});

export default styles;
