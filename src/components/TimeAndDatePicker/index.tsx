import React from 'react';
import { Modal, TextStyle, TouchableOpacity, View, ViewStyle, StyleSheet, StyleProp, Text, Button, Pressable, Dimensions } from 'react-native';
import moment from 'moment';
import { FormikProps, FormikValues } from 'formik';
import DateTimePicker from '@react-native-community/datetimepicker';
import { PlatformUtils } from 'utils/PlatformUtil';

export enum ModeType {
  DateTime = 'datetime',
  Date = 'date',
  Time = 'time',
}

interface ITimePickerProps {
  onChange: (date: string) => void;
  formProps: FormikProps<FormikValues>;
  placeholder: string;
  inputName: string;
  labelText?: string;
  minDate?: Date;
  maxDate?: Date;
  mode: ModeType;
  customStyles?: Record<string, unknown>;
  inputTextStyle?: StyleProp<TextStyle>;
}

interface ITimePickerState {
  showPicker: boolean;
  date: Date;
}

export class TimeAndDatePicker extends React.PureComponent<ITimePickerProps, ITimePickerState> {
  constructor(props: ITimePickerProps) {
    super(props);

    this.state = {
      showPicker: false,
      date: new Date(),
    };
  }

  public render(): React.ReactElement {
    const {
      placeholder,
      labelText,
      formProps,
      inputName,
    } = this.props;
    const { showPicker } = this.state;

    const {values} = formProps;
    const styles = getStyle();

    return (
      <>
        {/* <FormTextInput
          labelText={labelText}
          inputName={inputName}
          formProps={formProps}
          placeholder={placeholder}
          showLabel={showLabel}
          showDivider
          testId={`${testId}-select-time`}
          editable={false}
          textStyle={inputTextStyle}
        /> */}
        <Text>{labelText}</Text>
        <Pressable onPress={this.onClick} style={styles.buttonContainer}>
        <Text>{values[inputName] || placeholder}</Text>
        </Pressable>
        {showPicker && this.renderPicker()}
      </>
    );
  }

  private renderPicker = (): React.ReactElement => {
    const { showPicker } = this.state;
    const styles = getStyle();

    return (
      <>
        {PlatformUtils.isIOS() ? (
          <Modal animationType="slide" transparent visible={showPicker}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={this.onCloseModel}
              accessible={false}
              style={styles.modalContainer}
            >
              {/* <View accessible style={styles.modalSubContainer}> */}
              <TouchableOpacity activeOpacity={1} accessible={false} onPress={() => console.log('coming here@@@')}>
                <View style={styles.modalContentContainer}>
                  <Button
                    onPress={this.onCloseModel}
                    title={"Cancel"}
                    containerStyles={styles.button}
                    textStyle={styles.text}
                  />
                  <Button
                    onPress={this.onDone}
                    title={'Done'}
                    containerStyles={styles.button}
                    textStyle={styles.text}
                  />
                </View>
                {this.renderTimePicker()}
              </TouchableOpacity>
              {/* </View> */}
            </TouchableOpacity>
          </Modal>
        ) : (
          this.renderTimePicker()
        )}
      </>
    );
  };

  private renderTimePicker = (): React.ReactFragment => {
    const { date } = this.state;
    const { minDate, maxDate, customStyles, mode } = this.props;
    const minimumDate = mode === ModeType.Date ? minDate || new Date() : minDate;
    const styles = getStyle();

    return (
      <DateTimePicker
        value={date}
        mode={mode}
        display="spinner"
        onChange={this.onChangeTime}
        maximumDate={maxDate}
        minimumDate={minimumDate}
        style={[customStyles, styles.picker]}
      />
    );
  };

  private onClick = (): void => {
    this.setState({
      showPicker: true,
      date: new Date(),
    });
  };

  private onCloseModel = (): void => {
    this.setState({ showPicker: false });
  };

  private onDone = (): void => {
    const { onChange, mode } = this.props;
    const { date } = this.state;

    if (mode === ModeType.Date) {
      onChange(moment(date).format('MM-DD-YYYY') || '');
      this.onCloseModel();
      return;
    }

    onChange(moment(date).format('HH:mm A') || '');
    this.onCloseModel();
  };

  private onChangeTime = (event: Event, date?: string): void => {
    const { onChange, mode } = this.props;

    if (!date) {
      this.setState({ showPicker: false });
      return;
    }

    const selectedDate = new Date(date);

    if (PlatformUtils.isAndroid()) {
      if (mode === ModeType.Date) {
        this.setState({ showPicker: false, date: new Date(date) }, () =>
          onChange(moment(date).format('MM-DD-YYYY') || '')
        );
        return;
      }
      this.setState({ showPicker: false, date: selectedDate }, () =>
        onChange(moment(selectedDate).format('HH:mm A') || '')
      );
      return;
    }

    this.setState({ date: selectedDate });
  };
}

interface IScreenStyle {
  modalContainer: ViewStyle;
  modalSubContainer: ViewStyle;
  modalContentContainer: ViewStyle;
  buttonContainer: ViewStyle;
  button: ViewStyle;
  text: TextStyle;
  picker: TextStyle;
}

const getStyle = (): IScreenStyle => {

  return StyleSheet.create({
    button: {
      borderWidth: 0,
    },
    buttonContainer: {
      backgroundColor: 'red',
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'flex-end',
    },
    modalContentContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    modalSubContainer: {
      height: Dimensions.get('window').height / 3,
    },
    picker: {
    },
    text: {
    }
  });
};
