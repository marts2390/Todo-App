// Native
import { Alert, StyleSheet } from "react-native";
// Graphql
import { ApolloError, useMutation } from "@apollo/client";
import {
  DeleteTodoMutation,
  DeleteTodoMutationVariables
} from "@/generated/graphql";
import { DELETE_TODO, GET_TODOS } from "@/queries/todo";
// Components
import { Card, Text, IconButton, useTheme, MD3Theme } from "react-native-paper";
// Animations
import Animated, {
  FadeIn,
  FadeOut,
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

const AnimatedCard = Animated.createAnimatedComponent(Card);

interface TodoItemProps {
  todo: Todo;
}

export const TodoItem = ({ todo }: TodoItemProps): React.ReactElement => {
  const theme = useTheme();
  const styles = useStyles(theme);

  const buttonOne = useSharedValue(0);
  const buttonTwo = useSharedValue(0);

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

  const buttonTwoStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: withTiming(buttonTwo.value)
      }
    ]
  }));

  const pan = Gesture.Pan()
    .onUpdate((event) => {
      if (event.translationX < 0) {
        if (event.translationX > -100) {
          buttonOne.value = event.translationX;
        }

        if (event.translationX > -50) {
          buttonTwo.value = event.translationX;
        }
      }

      if (event.translationX > 0) {
        buttonOne.value = withTiming(0);
        buttonTwo.value = withTiming(0);
      }
    })
    .onEnd((event) => {
      if (event.translationX < 0) {
        buttonOne.value = withTiming(-100);
        buttonTwo.value = withTiming(-50);
      } else {
        buttonOne.value = withTiming(0);
        buttonTwo.value = withTiming(0);
      }
    });

  return (
    <AnimatedCard
      mode="contained"
      style={styles.card}
      entering={FadeIn}
      exiting={FadeOut}
    >
      <GestureDetector gesture={pan}>
        <Text style={styles.content} variant="titleMedium">
          {todo.title}
        </Text>
      </GestureDetector>
      <Animated.View
        style={[
          buttonOneStyle,
          styles.menu,
          { backgroundColor: theme.colors.secondary }
        ]}
      >
        <IconButton
          icon="pencil-circle-outline"
          iconColor={theme.colors.surface}
        />
      </Animated.View>
      <Animated.View
        style={[
          buttonTwoStyle,
          styles.menu,
          { backgroundColor: theme.colors.error }
        ]}
      >
        <IconButton
          icon="delete-circle-outline"
          iconColor={theme.colors.surface}
          onPress={() => handleDelete(todo.id)}
        />
      </Animated.View>
    </AnimatedCard>
  );
};

const useStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    menu: {
      position: "absolute",
      top: 0,
      right: -50,
      bottom: 0,
      width: 50,
      zIndex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 20
    },
    content: {
      padding: 16
    },
    card: {
      marginBottom: 12,
      backgroundColor: theme.colors.surface,
      borderColor: theme.colors.elevation.level5,
      borderWidth: 1,
      overflow: "hidden"
    }
  });
