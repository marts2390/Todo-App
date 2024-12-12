import { GetTodosQuery } from "@/generated/graphql";
import dayjs from "dayjs";
import { StyleSheet, View } from "react-native";
import { Card, MD3Theme, Text, useTheme } from "react-native-paper";
import { TodoItem } from "./TodoItem";
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition
} from "react-native-reanimated";

interface TodoStackProps {
  data: GetTodosQuery["todos"][0];
}

const AnimatedCard = Animated.createAnimatedComponent(Card);

export const TodoCard = ({ data }: TodoStackProps): React.ReactElement => {
  const theme = useTheme();
  const styles = useStyles(theme);

  return (
    <Animated.View entering={FadeIn} exiting={FadeOut}>
      <Text variant="labelLarge" style={styles.date}>
        {dayjs(data?.date).format("MMM DD YYYY")}
      </Text>
      <AnimatedCard layout={LinearTransition} style={styles.card}>
        {data?.items.map((todo, i) => (
          <View
            key={todo.id}
            style={{
              borderBottomWidth: i === data.items.length - 1 ? 0 : 1,
              borderBottomColor: theme.colors.elevation.level5
            }}
          >
            <TodoItem todo={todo} />
          </View>
        ))}
      </AnimatedCard>
    </Animated.View>
  );
};

const useStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    card: {
      marginTop: 8,
      marginBottom: 20,
      backgroundColor: theme.colors.surface,
      borderColor: theme.colors.elevation.level5,
      borderWidth: 1,
      overflow: "hidden"
    },
    date: {
      fontWeight: 700
    }
  });
