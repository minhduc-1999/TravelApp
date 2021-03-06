import {StyleSheet} from 'react-native';
import {windowHeight} from '../../Utils/Dimention';

const styles = StyleSheet.create({
  scroll: {
    backgroundColor: 'white',
    padding: 20,
  },
  userRow: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingBottom: 8,
    paddingRight: 15,
    paddingTop: 6,
    height: windowHeight * 0.12,
    zIndex: 10,
    // borderWidth: 1,
    // borderColor: '#454545',
  },
  userImage: {
    marginRight: 12,
  },
  listItemContainer: {
    height: 55,
    borderWidth: 0.5,
    borderColor: '#ECECEC',
  },
  groupText: {
    fontSize: 18,
    marginVertical: 10,
    color: '#998988',
    fontWeight: 'bold',
  },
});

export default styles;
