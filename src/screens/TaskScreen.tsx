import Screen from 'components/HOC/screen';
import { ModeType, TimeAndDatePicker } from 'components/TimeAndDatePicker';
import { IPostTask } from 'domain/graphQueries';
import { TaskRepository } from 'domain/TaskRepository';
import { Formik, FormikProps, FormikValues, FormikHelpers } from 'formik';
import { NavigationScreenProps, ScreensKeys } from 'navigation/interfaces';
import { RootStackParamList } from 'navigation/RootNavigator';
import * as React from 'react';
import {
  Button,
  TextInput,
  Alert,
} from 'react-native';

type Props = NavigationScreenProps<RootStackParamList, ScreensKeys.Task>

interface IScreenState {
  form: IPostTask;
}

export class TaskScreen extends React.PureComponent<Props, IScreenState> {
  constructor(props: Props) {
    super(props);

    this.state = {
      form: {
        startDate: '',
        endDate: '',
        title: ''
      }
    }
  }

  public render(): React.ReactNode {
    const { navigation: { goBack } } = this.props;
    return (
      <Screen>
        <Button title="back" onPress={goBack} />
        <Formik initialValues={this.state.form} onSubmit={this.onFormSubmit}>
          {(formProps: FormikProps<FormikValues>) => {
            const { setFieldValue, values, handleSubmit } = formProps;
            return (
              <>
                <TimeAndDatePicker onChange={(date) => setFieldValue('startDate', date)} placeholder="enter start date" formProps={formProps} inputName={'startDate'} mode={ModeType.Date} />
                <TimeAndDatePicker onChange={(date) => setFieldValue('endDate', date)} placeholder="enter end date" formProps={formProps} inputName={'endDate'} mode={ModeType.Date} />
                <TextInput value={values['title']} onChangeText={(value: string) => setFieldValue('title', value)} placeholder="enter title"/>
                <Button onPress={handleSubmit} title="Submit Task"/>
              </>
            )
          }}
        </Formik>
      </Screen>
    );
  }

  private onFormSubmit = async (values: FormikProps<FormikValues>,
    action: FormikHelpers<FormikProps<FormikValues>>) => {
      try{
        console.log(values, 'values###');
      const response = await TaskRepository.postTask(values as IPostTask);
      if(response) {
        Alert.alert('task created successfully');
        action.resetForm({});
      }
      } catch(e) {
        Alert.alert(e.message)
      }
  }
}

// const styles = StyleSheet.create({
//   modalContainer: {
//     flex: 1,
//     flexDirection: 'column',
//     justifyContent: 'flex-end',
//     backgroundColor: 'blue',
//   },
//   modalSubContainer: {
//     backgroundColor: 'red',
//     height: 500,
//     zIndex: 10,
//   },
//   safeArea: {
//     alignItems: 'center',
//     flex: 1, 
//     justifyContent: 'center',
//   }
// })
