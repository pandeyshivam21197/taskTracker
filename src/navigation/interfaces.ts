import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export type NavigationScreenProps<S extends Record<string, object | undefined>, T extends keyof S> = {
    navigation: StackNavigationProp<S, T>;
    route: RouteProp<S, T>;
  };

  export enum ScreensKeys {
    Home = "Home",
    Task = "Task"
  }