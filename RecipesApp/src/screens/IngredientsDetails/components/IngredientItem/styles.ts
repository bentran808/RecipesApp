import { StyleSheet } from 'react-native';
import { width } from 'theme';

const numColumns = 3;
// item size
const RECIPE_ITEM_HEIGHT = 100;
const RECIPE_ITEM_OFFSET = 10;
const RECIPE_ITEM_MARGIN = RECIPE_ITEM_OFFSET * 2;
const RECIPE_ITEM_WIDTH = (width - RECIPE_ITEM_MARGIN) / numColumns - RECIPE_ITEM_OFFSET;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginLeft: RECIPE_ITEM_OFFSET,
    marginBottom: RECIPE_ITEM_OFFSET,
    marginTop: 30,
    width: RECIPE_ITEM_WIDTH,
    height: RECIPE_ITEM_HEIGHT + 60
  },
  title: {
    margin: 10,
    marginBottom: 5,
    color: 'black',
    fontSize: 13,
    textAlign: 'center'
  },
  photo: {
    width: RECIPE_ITEM_WIDTH,
    height: RECIPE_ITEM_HEIGHT,
    borderRadius: 60
  },
  quantity: {
    color: 'grey'
  }
});

export default styles;
