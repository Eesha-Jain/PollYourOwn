import { StyleSheet, Dimensions } from 'react-native';
const win = Dimensions.get('window');
import { blue1, blue2, blue3, blue4, green, red, gray, white } from '../util/colors.ts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    height: win.height * 0.95,
    fontFamily: 'hn-light'
  },
  topImage: {
    marginTop: 30,
    width: win.width,
    height: win.width * (128 / 750)
  },
  poll: {
    borderRadius: 10,
    backgroundColor: gray,
    width: win.width - 40,
    padding: 10,
    marginBottom: 10
  }
});

export default styles;
