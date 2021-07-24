import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import * as React from 'react';

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          'space-mono': require('../assets/fonts/SpaceMono-Regular.ttf'),
          'hn-bold': require('../assets/fonts/Bold.otf'),
          'hn-extrabold': require('../assets/fonts/ExtraBold.otf'),
          'hn-hairline': require('../assets/fonts/Hairline.otf'),
          'hn-hairlineitalic': require('../assets/fonts/HairlineItalic.otf'),
          'hn-light': require('../assets/fonts/Light.otf'),
          'hn-medium': require('../assets/fonts/Medium.otf'),
          'hn-regular': require('../assets/fonts/Regular.otf'),
          'hn-semibolditalic': require('../assets/fonts/SemiBoldItalic.otf'),
          'hn-super': require('../assets/fonts/Super.otf'),
          'hn-thin': require('../assets/fonts/Thin.otf'),
          'hn-ultralight': require('../assets/fonts/UltraLight.otf'),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
