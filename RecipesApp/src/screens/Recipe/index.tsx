import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import BackButton from 'components/BackButton';
import Button from 'components/Button';
import Screens from 'constants/Screens';
import React, { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { Animated, Image, Text, View } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { TimeIcon, width } from 'theme';
import styles from './styles';

type RecipeNavigationProp = NativeStackNavigationProp<RootStackParamList>;
type Props = {
  navigation: RecipeNavigationProp;
  route: {
    params: {
      item: Recipe;
    };
  };
};

const RecipeScreen = ({ navigation, route }: Props) => {
  const sliderRef = useRef<any>();
  const [activeSlide, setActiveSlide] = useState(0);
  const offset = useRef(new Animated.Value(0)).current;
  const { item } = route.params;
  const category = item.category;
  const categoryName = category.name;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTransparent: true,
      headerLeft: () => (
        <BackButton
          onPress={() => {
            navigation.goBack();
          }}
        />
      )
    });
  }, []);

  const handlePressCategory = useCallback(() => {
    navigation.navigate(Screens.RecipesList.name as 'RecipesList', { category });
  }, []);

  const handleViewIngredients = useCallback(() => {
    navigation.navigate(Screens.IngredientsDetails.name as 'IngredientsDetails');
  }, []);

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
        <TouchableOpacity onPress={handlePressCategory}>
          <Text style={styles.category}>{categoryName.toUpperCase()}</Text>
        </TouchableOpacity>
        <View style={styles.infoContainer}>
          <Image style={styles.infoPhoto} source={TimeIcon} />
          <Text style={styles.infoRecipe}>{item.time} minutes </Text>
        </View>
        <View style={styles.infoContainer}>
          <Button title="View Ingredients" onPress={handleViewIngredients} />
        </View>
        <Text style={styles.infoDescriptionRecipe}>{item.description}</Text>
      </View>
    </ScrollView>
  );
};

export default RecipeScreen;
