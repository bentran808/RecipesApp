import CategoryCard from 'components/CategoryCard';
import { category } from 'mocks';
import { TouchableOpacity } from 'react-native';
import renderer from 'react-test-renderer';

describe('Category Card Component', () => {
  const onPressCategory = jest.fn();
  test('should render correctly', () => {
    const tree = renderer
      .create(<CategoryCard item={category} onPressCategory={onPressCategory} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('should call function handlePress', () => {
    const component = renderer.create(
      <CategoryCard item={category} onPressCategory={onPressCategory} />
    );
    const button = component.root.findAllByType(TouchableOpacity)[0];

    button.props.onPress();

    expect(onPressCategory).toHaveBeenCalled();
  });
});
