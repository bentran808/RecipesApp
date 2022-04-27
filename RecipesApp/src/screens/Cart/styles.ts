import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 60
  },
  checkoutContainer: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 0,
    borderRadius: 20,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    width: '100%',
    paddingLeft: 20,
    paddingVertical: 10
  },
  infoContainer: { flexDirection: 'row' },
  infoText: {
    fontWeight: 'bold',
    paddingRight: 10,
    borderRightWidth: 2
  },
  priceText: {
    fontWeight: 'bold',
    paddingLeft: 10
  },
  subTitle: {
    fontSize: 12,
    color: 'gray'
  }
});

export default styles;
