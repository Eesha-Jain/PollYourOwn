import { StyleSheet, Dimensions } from 'react-native';
const win = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    height: win.height * 0.95,
    fontFamily: 'hn-light'
  },
  topImage: {
    marginTop: 30,
    width: win.width,
    height: win.width * (128 / 750)
  }
});

export default styles;
