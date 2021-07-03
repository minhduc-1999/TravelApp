import {StyleSheet} from 'react-native';
import {windowWidth, windowHeight} from '../../Utils/Dimention';

const styles = StyleSheet.create({
  title: {
    height: 80,
    textAlignVertical: 'center',
    fontWeight: '700',
    fontSize: 30,
  },
  foreWord: {
    fontStyle: 'italic',
    color: 'grey',
    fontSize: 20,
    textAlign: 'justify',
  },
  image: {
    width: windowWidth,
    height: 400,
  },
});

export default styles;
