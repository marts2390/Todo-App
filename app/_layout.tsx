// Expo
import { Stack } from "expo-router";
// Components
import { SafeAreaProvider } from "react-native-safe-area-context";
// Graphql
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
// Paper
import { PaperProvider, MD3LightTheme } from "react-native-paper";
// Gestures
import { GestureHandlerRootView } from "react-native-gesture-handler";

const client = new ApolloClient({
  uri: "http://localhost:3000/graphql",
  cache: new InMemoryCache()
});

const theme = {
  ...MD3LightTheme, // or MD3DarkTheme
  colors: {
    ...MD3LightTheme.colors,
    primary: "#FFD449",
    secondary: "#548C2F",
    tertiary: "#104911",
    background: "#F5F5F5",
    surface: "#FFFFFF"
  }
};

export default function RootLayout(): React.ReactElement {
  return (
    <ApolloProvider client={client}>
      <GestureHandlerRootView>
        <SafeAreaProvider>
          <PaperProvider theme={theme}>
            <Stack
              screenOptions={{
                headerShown: false
              }}
            />
          </PaperProvider>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </ApolloProvider>
  );
}
