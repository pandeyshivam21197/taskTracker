import Screen from 'components/HOC/screen';
import { NavigationScreenProps, ScreensKeys } from 'navigation/interfaces';
import { RootStackParamList } from 'navigation/RootNavigator';
import * as React from 'react';
import {
  Text,
  Button,
  FlatList,
  StyleSheet,
} from 'react-native';

type Props = NavigationScreenProps<RootStackParamList, ScreensKeys.Home>

export class HomeScreen extends React.PureComponent<Props> {

  public render(): React.ReactNode {
    const {navigation: {navigate}} = this.props;
    return (
      <Screen
        containerStyles={styles.safeArea}>
        <Button
          title="create Task"
          onPress={(): void => navigate(ScreensKeys.Task)}
        />
        <Button title="create Tags" onPress={() => {}} />
        <Text>All Tags</Text>
        <FlatList data={[]} renderItem={this.renderTags} />
        <Text>All Tasks</Text>
        <FlatList data={[]} renderItem={this.renderTasks} />
      </Screen>
    );
  }
  public renderTags = ({item, index}: {item: any; index: number}) => {
    return <Text>Tag</Text>;
  };
  public renderTasks = ({item, index}: {item: any; index: number}) => {
    return <Text>Task</Text>;
  }
}

const styles = StyleSheet.create({
  safeArea: {
    alignItems: 'center',
    flex: 1, 
    justifyContent: 'center',
  }
})
