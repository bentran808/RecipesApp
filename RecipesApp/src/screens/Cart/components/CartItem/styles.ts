import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    margin: 10,
    flex: 1
  },
  photoContainer: { padding: 5 },
  photo: {
    width: 75,
    height: 75,
    borderRadius: 5
  },
  infoContainer: {
    flex: 1,
    padding: 10
  },
  infoTitle: { fontSize: 18 },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  priceText: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 5
  },
  quantityText: { color: 'red' },
  actionText: {
    color: 'white',
    paddingHorizontal: 10,
    fontWeight: '600'
  },
  rightAction: {
    backgroundColor: 'red',
    justifyContent: 'center'
  }
});

export default styles;
