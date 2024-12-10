import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:3000/graphql",
  cache: new InMemoryCache()
});

export default function RootLayout(): React.ReactElement {
  return (
    <ApolloProvider client={client}>
      <SafeAreaProvider>
        <Stack
          screenOptions={{
            headerShown: false
          }}
        >
          {/* <Stack.Screen name="index" /> */}
        </Stack>
      </SafeAreaProvider>
    </ApolloProvider>
  );
}
