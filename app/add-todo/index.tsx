// React
import React, { useState } from "react";
// Native
import { Alert, ScrollView, StyleSheet, View } from "react-native";
// Graphql
import { ApolloError, useMutation } from "@apollo/client";
import { AddTodoMutation, AddTodoMutationVariables } from "@/generated/graphql";
import { ADD_TODO, GET_TODOS } from "@/queries/todo";
// Types
import { Todo } from "@/types/Todo";
// Utils
import { validateErrors } from "@/utils/validate-errors";
// Expo
import { router } from "expo-router";
// Components
import {
  Button,
  MD3Theme,
  Text,
  TextInput,
  useTheme
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

type NewTodo = Omit<Todo, "id" | "completed">;

const AddTodoScreen = (): React.ReactElement => {
  const theme = useTheme();
  const styles = useStyles(theme);

  const [error, setError] = useState(false);
  const [todo, setTodo] = useState<NewTodo>({
    title: "",
    content: ""
  });

  const [addTodo, { loading }] = useMutation<
    AddTodoMutation,
    AddTodoMutationVariables
  >(ADD_TODO, {
    refetchQueries: [{ query: GET_TODOS }]
  });

  const handleTextChange = (key: keyof NewTodo, value: string): void => {
    if (error) {
      setError(false);
    }

    setTodo((prev) => ({
      ...prev,
      [key]: value
    }));
  };

  const handleButton = async (): Promise<void> => {
    try {
      await addTodo({
        variables: {
          title: todo.title,
          content: todo.content
        }
      });

      setTodo({
        title: "",
        content: ""
      });

      router.navigate("/");
    } catch (err) {
      if (err instanceof ApolloError) {
        Alert.alert(validateErrors(err));
      }

      setError(true);
    }
  };

  return (
    <ScrollView
      style={styles.root}
      contentContainerStyle={styles.contentContainer}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <Text style={styles.header} variant="displayMedium">
          Add
        </Text>
        <View style={styles.formItem}>
          <Text style={styles.label} variant="labelLarge">
            Title
          </Text>
          <TextInput
            error={!!error}
            value={todo.title}
            mode="outlined"
            outlineColor={theme.colors.elevation.level2}
            activeOutlineColor={theme.colors.elevation.level5}
            onChangeText={(e) => handleTextChange("title", e)}
            theme={{
              roundness: 10,
              colors: {
                background: theme.colors.surface
              }
            }}
          />
        </View>
        <View style={styles.formItem}>
          <Text style={styles.label} variant="labelLarge">
            Content
          </Text>
          <TextInput
            error={!!error}
            value={todo.content}
            mode="outlined"
            style={styles.textArea}
            outlineColor={theme.colors.elevation.level2}
            activeOutlineColor={theme.colors.elevation.level5}
            onChangeText={(e) => handleTextChange("content", e)}
            multiline
            theme={{
              roundness: 10,
              colors: {
                background: theme.colors.surface
              }
            }}
          />
        </View>
        <View style={styles.floatedButton}>
          <Button
            disabled={error || loading}
            mode="contained"
            onPress={handleButton}
            style={styles.button}
            loading={loading}
          >
            <Text variant="bodyLarge">Save</Text>
          </Button>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default AddTodoScreen;

const useStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    root: {
      backgroundColor: theme.colors.background
    },
    contentContainer: {
      paddingHorizontal: 20,
      flex: 1
    },
    container: {
      flex: 1,
      justifyContent: "space-between"
    },
    header: {
      marginVertical: 20,
      fontWeight: 700
    },
    label: {
      marginBottom: 4
    },
    textArea: {
      minHeight: 200
    },
    formItem: {
      marginBottom: 20
    },
    button: {
      padding: 10,
      borderRadius: 10
    },
    floatedButton: {
      position: "absolute",
      bottom: 40,
      left: 0,
      width: "100%"
    }
  });
