import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import BackButton from 'components/BackButton';
import Button from 'components/Button';
import Screens from 'constants/Screens';
import { useStore } from 'context';
import React, { useCallback, useLayoutEffect, useRef } from 'react';
import { Animated, Image, Text, View } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { BasketIcon, TimeIcon, width } from 'theme';
import styles from './styles';

type RecipeNavigationProp = NativeStackNavigationProp<RootStackParamList>;
interface Props {
  navigation: RecipeNavigationProp;
  route: {
    params: {
      item: Recipe;
    };
  };
}

const RecipeScreen = ({ navigation, route }: Props) => {
  const sliderRef = useRef<any>();
  const [activeSlide, setActiveSlide] = React.useState(0);
  const [quantity, setQuantity] = React.useState(1);
  const offset = useRef(new Animated.Value(0)).current;
  const { cart } = useStore();
  const badgeCount = cart.inCartCount;
  const { item } = route.params;
  const { category, ingredients } = item;
  const categoryName = category.name;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <BackButton
          source={BasketIcon}
          onPress={handlePressCart}
          badge={!!badgeCount}
          badgeCount={badgeCount}
        />
      )
    });
  }, [badgeCount]);

  const handlePressCart = () => {
    navigation.navigate(Screens.Cart.name as 'Cart');
  };

  const handlePressCategory = useCallback(() => {
    navigation.navigate(Screens.RecipesList.name as 'RecipesList', { category });
  }, []);

  const handleViewIngredients = useCallback(() => {
    const title = `Ingredients for ${item.title}`;
    navigation.navigate(Screens.IngredientsDetails.name as 'IngredientsDetails', {
      title,
      ingredients
    });
  }, [item]);

  const handleIncrease = useCallback(() => {
    setQuantity((prevState) => ++prevState);
  }, []);

  const handleDecrease = useCallback(() => {
    setQuantity((prevState) => (prevState > 1 ? --prevState : prevState));
  }, []);

  const handleAddToCart = useCallback(() => {
    cart.addToCart(item, quantity);
  }, [item, quantity]);

  const renderImage = ({ item }: { item: string }) => (
    <TouchableOpacity>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: item }} />
      </View>
    </TouchableOpacity>
  );

  return (
    <>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: offset } } }], {
          useNativeDriver: false
        })}
      >
        <View style={styles.carouselContainer}>
          <Carousel
            ref={sliderRef}
            data={item.photosArray}
            renderItem={renderImage}
            sliderWidth={width}
            itemWidth={width}
            inactiveSlideScale={1}
            inactiveSlideOpacity={1}
            firstItem={0}
            loop={false}
            autoplay={true}
            autoplayDelay={500}
            autoplayInterval={3000}
            onSnapToItem={(index) => setActiveSlide(index)}
          />
          <Pagination
            dotsLength={item.photosArray.length}
            activeDotIndex={activeSlide}
            containerStyle={styles.paginationContainer}
            dotColor="rgba(255, 255, 255, 0.92)"
            dotStyle={styles.paginationDot}
            inactiveDotColor="white"
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
            carouselRef={sliderRef.current}
            tappableDots={!!sliderRef.current}
          />
        </View>
        <View style={styles.infoRecipeContainer}>
          <Text style={styles.infoRecipeName}>{item.title}</Text>
          <Button
            testID="categoryBtn"
            title={categoryName.toUpperCase()}
            onPress={handlePressCategory}
            bold
            style={{
              margin: 10
            }}
          />
          <View style={styles.infoContainer}>
            <Image style={styles.infoPhoto} source={TimeIcon} />
            <Text style={styles.infoRecipe}>{item.time} minutes </Text>
          </View>
          <View style={styles.infoContainer}>
            <Button
              testID="viewIngredientsBtn"
              title="View Ingredients"
              onPress={handleViewIngredients}
              type="outlined"
              style={{
                marginTop: 20
              }}
            />
          </View>
          <Text style={styles.infoDescriptionRecipe}>{item.description}</Text>
        </View>
      </ScrollView>
      <View style={styles.cartControl}>
        <View style={styles.quantityContainer}>
          <Button
            testID="decreaseBtn"
            disabled={quantity === 1}
            title="-"
            onPress={handleDecrease}
            fontSize={30}
          />
          <Text>{quantity}</Text>
          <Button testID="increaseBtn" title="+" onPress={handleIncrease} fontSize={30} />
        </View>
        <Button
          testID="addToCartBtn"
          title="Add to cart"
          onPress={handleAddToCart}
          type="contained"
        />
      </View>
    </>
  );
};

export default RecipeScreen;
