import React from 'react';
import {View, Text, Image} from 'react-native';
import styles from './styles.js'
const Post = (props) => {
    const post = props.post;
    return (
        <View style={styles.container}>
            <Image style={styles.image}
                source={{uri: post.image}}
            />
            <Text style={styles.bedrooms}>{post.bed} bedroome - {post.bedroom} bathroom</Text>
            <Text style={styles.description} numberOfLines={2}>{post.type}. {post.title}</Text>
            <Text style={styles.prices}>
                <Text style={styles.oldPrice}>${post.oldPrice} </Text>
                <Text style={styles.newPrice}> ${post.newPrice} </Text>
                 / night
            </Text>
            <Text style={styles.totalPrice}>${post.totalPrice} total</Text>
            <Text style={styles.longDescription}>{post.longDescription}</Text>
        </View>
    )
}

export default Post;