import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: '100%'
  },
  title: {
    fontWeight: 'bold'
  },
  subTitle: {
    fontSize: 12,
    color: 'gray'
  },
  quantityWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 150
  },
  quantityText: {
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 5,
    color: 'red',
    paddingVertical: 5,
    paddingHorizontal: 30
  }
});

export default styles;
