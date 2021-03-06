import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import WishlistItem from '../../components/WishlistItem';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {DbContext} from '../../Services/DbProvider';
import styles from './styles';

const WishlistScreen = ({navigation}) => {
  const {loadWishlists, registerEvent} = useContext(DbContext);
  const [wishlistsData, setWishlistsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    const unsubscribe = registerEvent('onWishlistChange', () => {
      setLoading(true);
      loadWishlists()
        .then(data => {
          setWishlistsData(data);
          setLoading(false);
        })
        .catch(err => console.error(err));
    });
    return unsubscribe;
  });

  useEffect(async () => {
    const unsubscribe = registerEvent('wishlistDesChange', () => {
      setLoading(true);
      loadWishlists()
        .then(data => {
          setWishlistsData(data);
          setLoading(false);
        })
        .catch(err => console.error(err));
    });
    return unsubscribe;
  });

  useEffect(async () => {
    const unsubscribe = registerEvent('wishlistNameChange', () => {
      setLoading(true);
      loadWishlists()
        .then(data => {
          setWishlistsData(data);
          setLoading(false);
        })
        .catch(err => console.error(err));
    });
    return unsubscribe;
  });

  useEffect(async () => {
    console.log('load wl data');
    let mounted = true;
    loadWishlists()
      .then(data => {
        if (mounted) {
          setWishlistsData(data);
          setLoading(false);
        }
      })
      .catch(err => console.error(err));
    return function () {
      mounted = false;
    };
  }, []);

  return (
    <SafeAreaView style={{height: '100%'}}>
      <StatusBar backgroundColor={'transparent'} barStyle="dark-content" />
      {loading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator color={'#f15454'} />
        </View>
      ) : (
        <View>
          <FlatList
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            data={wishlistsData}
            renderItem={({item}) => <WishlistItem item={item} />}
            keyExtractor={item => item.createDate}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default WishlistScreen;
