import React, {useState, useEffect} from 'react';
import {
  View,
  ImageBackground,
  Text,
  Pressable,
  FlatList,
  SafeAreaView,
  StatusBar,
  Image,
} from 'react-native';
import styles from './styles';
import Fonawesome from 'react-native-vector-icons/FontAwesome';
import Tile from '../../components/Tile';
import {DbContext} from '../../Services/DbProvider';
import {windowWidth, windowHeight} from '../../Utils/Dimention';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  useAnimatedScrollHandler,
  interpolate,
  interpolateColor,
  withSpring,
} from 'react-native-reanimated';
import CustomHeader from '../../components/CustomHeader';
import ContentLoader, {Rect} from 'react-content-loader/native';
import {Divider} from 'react-native-elements';

const HomeScreen = ({navigation}) => {
  const [loading, setLoading] = useState(true);
  const [tags, setTags] = useState([]);
  const [covidData, setCovidData] = useState(null);
  const [covidLoading, setCovidLoading] = useState(true);
  const {loadTags} = React.useContext(DbContext);

  const scrollY = useSharedValue(0);

  const scrollHander = useAnimatedScrollHandler(event => {
    const {y} = event.contentOffset;
    scrollY.value = y;
  });

  useEffect(() => {
    let mounted = true;
    loadTags()
      .then(res => {
        if (mounted) {
          setTags(res);
          setLoading(false);
        }
      })
      .catch(console.error);
    return function clean() {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    let mounted = true;
    fetch(
      'https://api.apify.com/v2/key-value-stores/ZsOpZgeg7dFS1rgfM/records/LATEST?fbclid=IwAR3XYaigGNLpMr5frJXNo2XX05DZ_jjxX5e6QyDQu_I1LQn030HeOYfmv64',
    )
      .then(response => response.json())
      .then(data => {
        setCovidData(data);
        setCovidLoading(false);
      });
    return function clean() {
      mounted = false;
    };
  }, []);

  const headerStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollY.value,
        [0, (windowHeight * 20) / 100],
        [0, 1],
      ),
    };
  });

  const headerShadowAnim = useAnimatedStyle(() => {
    return {
      shadowOpacity: interpolate(
        scrollY.value,
        [0, (windowHeight * 20) / 100],
        [0, 1],
      ),
    };
  });

  const btnAnimated = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        scrollY.value,
        [0, (windowHeight * 20) / 100],
        ['rgb(255, 255, 255)', 'rgb(240,240,240)'],
        'RGB',
      ),
      shadowOpacity: interpolate(
        scrollY.value,
        [0, (windowHeight * 20) / 100],
        [1, 0],
      ),
      elevation: interpolate(
        scrollY.value,
        [0, (windowHeight * 20) / 100],
        [10, 0],
      ),
    };
  });

  console.log('Home screen render');
  return (
    <SafeAreaView>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={'dark-content'}
      />
      <CustomHeader
        height={windowHeight * 0.16}
        style={{borderBottomWidth: 2, borderBottomColor: '#e6e6e6'}}
        shadowAnim={headerShadowAnim}
        bgAnimated={headerStyle}>
        <Animated.View style={[styles.searchButton, btnAnimated]}>
          <Pressable
            style={{
              flex: 1,
              height: '100%',
              backgroundColor: 'transparent',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => navigation.navigate('Destination Search', {})}>
            <Fonawesome name={'search'} color={'#f15454'} size={16} />
            <Text style={styles.searchButtonText}>B???n s???p ??i ????u?</Text>
          </Pressable>
        </Animated.View>
      </CustomHeader>

      <Animated.ScrollView
        onScroll={scrollHander}
        showsVerticalScrollIndicator={false}>
        <ImageBackground
          source={{
            uri:
              'https://firebasestorage.googleapis.com/v0/b/travelad-8b432.appspot.com/o/app%2Fbackground%2Fhhrhrbb.png?alt=media&token=cbebeb95-a25e-4d16-971d-73feb9ad55ba',
          }}
          style={styles.image}>
          <Text style={styles.title}>Go Near</Text>
          <Pressable
            style={styles.button}
            onPress={() => navigation.navigate('Comment')}>
            <Text style={styles.buttonText}>L??n k??? ho???ch</Text>
          </Pressable>
        </ImageBackground>
        <View>
          <Text style={styles.proposedTitle}>Ph??? bi???n nh???t</Text>
          <View style={{marginVertical: 10}}>
            {loading ? (
              <FlatList
                scrollEnabled={false}
                data={[1, 2]}
                renderItem={({item, index}) => (
                  <View
                    style={{
                      padding: 10,
                      width: windowWidth * 0.7,
                      height: windowWidth * 0.7,
                    }}>
                    <ContentLoader
                      backgroundColor="#dcdcdc"
                      foregroundColor="#f5f5f5"
                      speed={1}
                      viewBox={`0 0 ${windowWidth * 0.7} ${windowWidth * 0.7}`}>
                      <Rect
                        x="0"
                        y="0"
                        rx="10"
                        ry="10"
                        width={windowWidth * 0.7}
                        height={windowWidth * 0.7}
                      />
                    </ContentLoader>
                  </View>
                )}
                keyExtractor={(item, index) => index.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
              />
            ) : (
              <FlatList
                data={tags}
                renderItem={({item, index}) => (
                  <Tile
                    key={item.refId}
                    width={(windowWidth * 70) / 100}
                    height={(windowWidth * 70) / 100}
                    containerStyle={{
                      marginHorizontal: 15,
                      borderRadius: 10,
                      overflow: 'hidden',
                    }}
                    opacity={1}
                    // activeOpacity={0.5}
                    // featured
                    imageSrc={item.coverUrl}
                    title={item.name}
                    titleStyle={{
                      fontSize: 36,
                      fontWeight: 'bold',
                      color: '#fff',
                    }}
                    onPress={() =>
                      navigation.navigate('List by Tag', {
                        tags: tags,
                        selectedTagIndex: index,
                      })
                    }
                  />
                )}
                keyExtractor={item => item.refId.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
              />
            )}
          </View>
        </View>
        {covidLoading ? null : (
          <View>
            <Text style={styles.proposedTitle}>C???p nh???t th?????ng xuy??n</Text>
            <View style={styles.covidContainer}>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Image
                  style={styles.imageTitle}
                  source={require('../../../assets/images/vietnam.png')}
                />
                <Text style={styles.covidTitle}>
                  Th??ng tin v??? ?????i d???ch COVID19 t???i Vi???t Nam
                </Text>
              </View>
              <Divider height={1} />
              <Text style={styles.covidContent}>
                <FontAwesome name="virus" size={20} />
                {'  '}T???ng s??? ca nhi???m:{' '}
                <Text style={{fontWeight: 'bold'}}>
                  {covidData.infected ? covidData.infected : '...'}
                </Text>
              </Text>
              <Text style={styles.covidContent}>
                <FontAwesome name="head-side-mask" color="#34bced" size={20} />
                {'  '}S??? ca ??ang ??i???u tr???:{' '}
                <Text style={{fontWeight: 'bold'}}>
                  {covidData.treated ? covidData.treated : '...'}
                </Text>
              </Text>
              <Text style={styles.covidContent}>
                <FontAwesome name="virus-slash" color="#24f27a" size={20} /> S???
                ca kh???i b???nh:{' '}
                <Text style={{fontWeight: 'bold'}}>
                  {covidData.recovered ? covidData.recovered : '...'}
                </Text>
              </Text>
              <Text style={styles.covidContent}>
                <FontAwesome name="skull" color="#fa3939" size={20} />
                {'  '}S??? ca t??? vong:{' '}
                <Text style={{fontWeight: 'bold'}}>
                  {covidData.deceased ? covidData.deceased : '...'}
                </Text>
              </Text>
              <Text style={[styles.covidContent, {color: 'grey'}]}>
                C???p nh???t l???n cu???i:{' '}
                {covidData.lastUpdatedAtSource
                  ? new Date(covidData.lastUpdatedAtSource).toLocaleDateString(
                      'vi-VI',
                    )
                  : '...'}
              </Text>
              <View style={styles.sourceContainer}>
                <Text style={styles.sourceCovidTitle}>Ngu???n: </Text>
                <Text style={styles.sourceCovid}>
                  {covidData.sourceUrl ? covidData.sourceUrl : '...'}
                </Text>
              </View>
            </View>
          </View>
        )}
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
