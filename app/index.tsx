import { useQuery } from "@apollo/client";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { GetTodosQuery } from "@/generated/graphql";
import { GET_TODOS } from "@/queries/todo";

const App = (): React.ReactElement => {
  const { data, loading } = useQuery<GetTodosQuery>(GET_TODOS);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <SafeAreaView style={styles.root}>
      {data?.todos.map((item) => (
        <View key={item.id}>
          <Text>{item.title}</Text>
        </View>
      ))}
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  root: {
    backgroundColor: "white",
    flex: 1,
    paddingHorizontal: 20
  },
  todoItem: {
    backgroundColor: "#FFEEDD",
    borderRadius: 20,
    marginBottom: 12,
    padding: 20
  }
});
