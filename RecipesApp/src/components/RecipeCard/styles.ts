import { StyleSheet } from 'react-native';
import { width } from 'theme';

const recipeColumns = 2;
// item size
const RECIPE_ITEM_HEIGHT = 150;
const RECIPE_ITEM_MARGIN = 20;
const RECIPE_ITEM_WIDTH = (width - (recipeColumns + 1) * RECIPE_ITEM_MARGIN) / recipeColumns;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: RECIPE_ITEM_MARGIN,
    marginTop: 20,
    width: RECIPE_ITEM_WIDTH,
    height: RECIPE_ITEM_HEIGHT + 110,
    borderColor: '#ccc',
    borderWidth: 0.5,
    borderRadius: 15
  },
  photo: {
    width: RECIPE_ITEM_WIDTH,
    height: RECIPE_ITEM_HEIGHT,
    borderRadius: 15,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0
  },
  title: {
    flex: 1,
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#444',
    marginTop: 3,
    marginHorizontal: 5
  },
  category: {
    marginVertical: 5
  },
  priceWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 10,
    marginBottom: 10
  },
  price: {
    fontSize: 15,
    fontWeight: 'bold'
  },
  cart: {
    width: 25,
    height: 25
  }
});

export default styles;
