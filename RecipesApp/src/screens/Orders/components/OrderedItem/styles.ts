import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  info: {
    maxWidth: 200
  },
  time: {
    fontSize: 12,
    marginTop: 5
  },
  customBtn: {
    width: 130,
    borderRadius: 5,
    marginTop: 10,
    marginLeft: 20
  }
});

export default styles;
