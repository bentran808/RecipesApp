import { StyleSheet } from 'react-native';
import { width } from 'theme';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: width
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
