// Native
import { Alert, StyleSheet, View } from "react-native";
// Graphql
import { ApolloError, useMutation } from "@apollo/client";
import {
  DeleteTodoMutation,
  DeleteTodoMutationVariables
} from "@/generated/graphql";
import { DELETE_TODO, GET_TODOS } from "@/queries/todo";
// Components
import { Text, IconButton, useTheme } from "react-native-paper";
// Animations
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from "react-native-reanimated";
// Gestures
import { Gesture, GestureDetector } from "react-native-gesture-handler";
// Types
import { Todo } from "@/types/Todo";
// Utils
import { validateErrors } from "@/utils/validate-errors";

interface TodoItemProps {
  todo: Omit<Todo, "date">;
}

export const TodoItem = ({ todo }: TodoItemProps): React.ReactElement => {
  const theme = useTheme();

  const buttonOne = useSharedValue(0);
  const contentMargin = useSharedValue(0);

  const [deleteTodo] = useMutation<
    DeleteTodoMutation,
    DeleteTodoMutationVariables
  >(DELETE_TODO, {
    refetchQueries: [{ query: GET_TODOS }]
  });

  const handleDelete = async (id: string): Promise<void> => {
    try {
      await deleteTodo({ variables: { id } });
    } catch (err) {
      if (err instanceof ApolloError) {
        Alert.alert(validateErrors(err));
      }
    }
  };

  const buttonOneStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: withTiming(buttonOne.value)
      }
    ]
  }));

  const contentStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: withTiming(contentMargin.value)
      }
    ]
  }));

  const pan = Gesture.Pan()
    .requireExternalGestureToFail(Gesture.Native())
    .onUpdate((event) => {
      if (event.translationX < 0) {
        if (event.translationX > -100) {
          buttonOne.value = event.translationX;
        }
      }

      if (event.translationX > 0) {
        buttonOne.value = withTiming(0);
      }
    })
    .onEnd((event) => {
      if (event.translationX < 0) {
        buttonOne.value = withTiming(-100);
        contentMargin.value = withTiming(-100);
      } else {
        buttonOne.value = withTiming(0);
        contentMargin.value = withTiming(0);
      }
    });

  return (
    <>
      <GestureDetector gesture={pan}>
        <Animated.View style={[contentStyle, styles.content]}>
          <Text style={styles.title} variant="titleMedium">
            {todo.title}
          </Text>
          <Text numberOfLines={1} variant="bodySmall">
            {todo.content}
          </Text>
        </Animated.View>
      </GestureDetector>
      <Animated.View style={[buttonOneStyle, styles.menu]}>
        <View
          style={{
            ...styles.menuItem,
            backgroundColor: theme.colors.secondary
          }}
        >
          <IconButton
            icon="pencil-circle-outline"
            iconColor={theme.colors.surface}
          />
        </View>
        <View
          style={{ ...styles.menuItem, backgroundColor: theme.colors.error }}
        >
          <IconButton
            icon="delete-circle-outline"
            iconColor={theme.colors.surface}
            onPress={() => handleDelete(todo.id)}
          />
        </View>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  menu: {
    position: "absolute",
    top: 0,
    right: -100,
    bottom: 0,
    zIndex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row"
  },
  menuItem: {
    width: 50,
    height: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    marginBottom: 4
  },
  content: {
    padding: 12
  }
});
