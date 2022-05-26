import React from "react";
import { NavigationContainer, DefaultTheme, DarkTheme, Theme } from "@react-navigation/native";
import { Provider } from "react-redux";
import { Provider as PaperProvider } from 'react-native-paper';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { store } from "./store";
import { ThemeProvider } from "@emotion/react";
import { useFonts } from "expo-font";
import {
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
  Montserrat_900Black,
} from "@expo-google-fonts/montserrat";
import {
	OpenSans_400Regular,
	OpenSans_500Medium,
	OpenSans_600SemiBold,
	OpenSans_700Bold
} from "@expo-google-fonts/open-sans";
import { useColorScheme } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import MainNavigator from "./navigation";
import FlashMessage from "react-native-flash-message";

const App = () => {
	const scheme = useColorScheme();
	const whichTheme = scheme === 'dark' ? DarkTheme : DefaultTheme;
	const theme: Theme = {
		...whichTheme
	};

	const [fontloaded] = useFonts({
		Montserrat_400Regular,
		Montserrat_500Medium,
		Montserrat_600SemiBold,
		Montserrat_700Bold,
		Montserrat_900Black,
		OpenSans_400Regular,
		OpenSans_500Medium,
		OpenSans_600SemiBold,
		OpenSans_700Bold
	});

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <SafeAreaProvider>
          <ActionSheetProvider>
            <PaperProvider>
              <NavigationContainer theme={theme}>
                {fontloaded && <MainNavigator />}
              </NavigationContainer>
            </PaperProvider>
          </ActionSheetProvider>
        </SafeAreaProvider>
      </ThemeProvider>
      <FlashMessage position='top' />
    </Provider>
  );
};

export default App;
