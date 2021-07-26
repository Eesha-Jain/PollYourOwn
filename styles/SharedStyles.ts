import { StyleSheet, Dimensions } from 'react-native';
const win = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  topImage: {
    width: win.width,
    height: win.width * (128 / 750)
  }
});

export default styles;
