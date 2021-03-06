import React from 'react';
import {Text, Image, Pressable, View, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
class Post extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {navigation} = this.props;
    return (
      <Pressable
        key={this.props.key}
        onPress={() => {
          navigation.navigate('Detailed Post', {post: this.props.post});
        }}
        style={[styles.container, this.props.style]}>
        <Image style={styles.image} source={{uri: this.props.post.images[0]}} />
        <Text style={[styles.rate]} numberOfLines={2}>
          <Icon name="star" size={22} color={'#f15454'} />{' '}
          {this.props.post.rate.avg}
        </Text>
        <Text style={[styles.name, this.props.titleStyle]} numberOfLines={2}>
          {this.props.post.name}
        </Text>
        {typeof this.props.showTags === 'boolean' &&
        this.props.showTags === false ? null : (
          <View style={styles.tagContainer}>
            {this.props.post.tags
              ? this.props.post.tags.map((tag, index) => (
                  <Text key={index} style={styles.tag}>
                    {tag}
                  </Text>
                ))
              : null}
          </View>
        )}
      </Pressable>
    );
  }
}

const PostWrapper = props => {
  const navigation = useNavigation();
  return <Post {...props} navigation={navigation} />;
};
// const Post = props => {
//   const post = props.post;
//   const navigation = useNavigation();
//   return (
//     <Pressable
//       // onPress={() => navigation.navigate('Detailed Post', {postId: post.id})}
//       style={styles.container}>
//       <Image style={styles.image} source={{uri: post.images[0]}} />

//       <Text style={styles.name} numberOfLines={2}>
//         {post.name} - 5 <Icon name="star" size={25} color={'#ebe707'} />
//       </Text>
//       <View style={styles.tagContainer}>
//         {post.tags
//           ? post.tags.map(tag => <Text style={styles.tag}>{tag}</Text>)
//           : null}
//       </View>
//     </Pressable>
//   );
// };

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
  image: {
    width: '100%',
    height: undefined,
    aspectRatio: 3 / 2,
    resizeMode: 'cover',
    borderRadius: 15,
  },
  rate: {
    fontSize: 20,
    lineHeight: 25,
    marginTop: 8,
    fontWeight: '700',
  },
  name: {
    fontSize: 25,
    lineHeight: 26,
    fontWeight: '700',
    marginTop: 5,
  },
  tagContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  tag: {
    marginRight: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(0,0,0, 0.7)',
    color: '#fff',
    borderRadius: 10,
    fontSize: 16,
  },
});

export default PostWrapper;
