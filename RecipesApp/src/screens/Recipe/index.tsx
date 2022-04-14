import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Button from 'components/Button';
import Screens from 'constants/Screens';
import React, { useCallback, useRef, useState } from 'react';
import { Animated, Image, Text, View } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { TimeIcon, width } from 'theme';
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
  const [activeSlide, setActiveSlide] = useState(0);
  const offset = useRef(new Animated.Value(0)).current;
  const { item } = route.params;
  const { category, ingredients } = item;
  const categoryName = category.name;

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

  const renderImage = ({ item }: { item: string }) => (
    <TouchableOpacity>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: item }} />
      </View>
    </TouchableOpacity>
  );

  return (
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
          />
        </View>
        <Text style={styles.infoDescriptionRecipe}>{item.description}</Text>
      </View>
    </ScrollView>
  );
};

export default RecipeScreen;
