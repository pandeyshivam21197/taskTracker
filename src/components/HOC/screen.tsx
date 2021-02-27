import * as React from 'react';
import {SafeAreaView, StyleProp, ViewStyle} from 'react-native';

interface IProps {
    children: React.ReactNode;
    containerStyles?: StyleProp<ViewStyle>;
}
const Screen = (props: IProps): React.ReactElement => {
    const {children, containerStyles = {}} = props;
    return (
        <SafeAreaView style={containerStyles}>
            {children}
        </SafeAreaView>
    );
}

export default Screen;