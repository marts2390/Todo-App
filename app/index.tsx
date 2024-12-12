// Native
import { StyleSheet, View } from "react-native";
// Graphql
import { useQuery } from "@apollo/client";
import { GetTodosQuery } from "@/generated/graphql";
import { GET_TODOS } from "@/queries/todo";
// Safe Area
import { EdgeInsets, useSafeAreaInsets } from "react-native-safe-area-context";
// Components
import { Text, useTheme, MD3Theme, IconButton } from "react-native-paper";
import { TodoCard } from "@/components/TodoCard";
// Expo
import { router } from "expo-router";
// Animated
import Animated, { LinearTransition } from "react-native-reanimated";

const App = (): React.ReactElement => {
  const { data, loading } = useQuery<GetTodosQuery>(GET_TODOS);
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const styles = useStyles(theme, insets);

  console.log(data?.todos);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <Animated.FlatList
      itemLayoutAnimation={LinearTransition}
      style={styles.root}
      contentContainerStyle={styles.container}
      data={data?.todos}
      ListHeaderComponent={() => (
        <View style={styles.header}>
          <Text variant="displayMedium" style={styles.title}>
            Todo's
          </Text>
          <IconButton
            icon="plus-circle-outline"
            size={40}
            onPress={() => router.navigate("/add-todo")}
          />
        </View>
      )}
      renderItem={({ item }) => <TodoCard data={item} />}
    />
  );
};

export default App;

const useStyles = (theme: MD3Theme, insets: EdgeInsets) =>
  StyleSheet.create({
    root: {
      backgroundColor: theme.colors.background
    },
    container: {
      paddingTop: insets.top,
      paddingHorizontal: 20
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginVertical: 20
    },
    title: {
      fontWeight: 700
    }
  });
