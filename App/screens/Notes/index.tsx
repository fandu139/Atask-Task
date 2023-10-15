import React from 'react';
import {Keyboard, StyleSheet, View} from 'react-native';
import {KeyboardAwareScrollView} from '@mtourj/react-native-keyboard-aware-scroll-view';
import * as yup from 'yup';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import Button from '../../uikit/Button';
import Text from '../../uikit/Text';
import TextInput from '../../uikit/TextInput';
import Colors from '../../theme/colors';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {setNotesData} from '../../storage/notesData';
import uuid from 'react-native-uuid';
import { replace } from '../../helper/navigation';

type RouteParams = {
  typeActionNotes: string;
  id: string;
  title: string;
  notes: string;
};

type RootStackParamList = {
  NotesScreen: RouteParams;
};

type Props = NativeStackScreenProps<RootStackParamList, 'NotesScreen'>;

const NotesScreen: React.FC<Props> = ({route}: Props) => {
  const [errorMessageAfterSubmit, setErrorMessageAfterSubmit] =
    React.useState('');

  const schema = yup.object().shape({
    title: yup.string().required('Title harus diisi'),
    notes: yup.string().required('Notes harus diisi'),
  });

  const {
    control,
    handleSubmit,
    formState: {errors},
    watch,
  } = useForm({
    defaultValues: {
      title: route?.params?.title || '',
      notes: route?.params?.notes || '',
    },
    resolver: yupResolver(schema),
  });

  const formValues = watch();
  const isAllFieldFilled = Object.values(formValues).every(val => val);

  const doResetErrorSubmit = () => {
    if (errorMessageAfterSubmit) {
      setErrorMessageAfterSubmit(' ');
    }
  };

  const onSubmitData = async ({
    title,
    notes,
  }: {
    title: string;
    notes: string;
  }) => {
    if (route?.params?.typeActionNotes === 'add') {
      await setNotesData({
        id: uuid.v4(),
        title,
        notes,
      });
    } else if (route?.params?.typeActionNotes === 'edit') {
      await setNotesData({
        id: route?.params?.id,
        title,
        notes,
      });
    }
    doResetErrorSubmit();
    Keyboard.dismiss();
    replace('MainNavigator', {screen: 'MainScreen'});
  };

  return (
    <KeyboardAwareScrollView
      enableOnAndroid
      extraScrollHeight={150}
      style={styles.container}
      keyboardShouldPersistTaps="handled">
      <View style={styles.inputContainer}>
        <Text
          testID="error-message-login"
          accessibilityLabel="error-message-login"
          style={styles.errorLabelForm}>
          {errorMessageAfterSubmit}
        </Text>

        <Controller
          control={control}
          key="title"
          name="title"
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              inverted
              label={'Title Notes'}
              isError={!!errors?.title?.message}
              errorText={errors?.title?.message}
              onChangeText={onChange}
              onBlur={onBlur}
              text={value}
              contentInset={{
                label: 10,
                input: 10,
              }}
              testID="text-input-email-login"
              testIDHelper="text-input-email-login-error"
              accessibilityLabel="login-email-field"
              accessibilityLabelHelper="login-email-field-textview"
              keyboardType="email-address"
            />
          )}
        />
        <Controller
          control={control}
          key="notes"
          name="notes"
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              inverted
              containerStyle={styles.textInputContainer}
              isError={!!errors?.notes?.message}
              errorText={errors?.notes?.message}
              label={'Content Notes'}
              onChangeText={onChange}
              onBlur={onBlur}
              text={value}
              contentInset={{
                label: 10,
                input: 10,
              }}
              testID="text-input-notes-login"
              testIDHelper="text-input-notes-login-error"
              accessibilityLabel="login-notes-field"
              accessibilityLabelHelper="login-notes-field-textview"
            />
          )}
        />

        <Button
          disabled={!isAllFieldFilled}
          style={styles.buttonContainer}
          title={'Save'}
          onPress={handleSubmit(onSubmitData)}
          testID="button-save"
          accessibilityLabel="save-button"
          mode="contained-inverted"
        />
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.GREEN_47,
  },
  inputContainer: {
    paddingHorizontal: 20,
  },
  logoContainer: {
    marginTop: 15,
    width: 200,
    height: 200,
    alignSelf: 'center',
  },
  buttonContainer: {
    marginTop: 15,
    marginBottom: 5,
  },
  textInputContainer: {
    marginTop: 5,
    marginBottom: 15,
  },
  errorLabelForm: {
    color: Colors.RED,
    textAlign: 'right',
    marginBottom: 0,
  },
  labelForgotPassword: {
    color: Colors.WHITE,
    textAlign: 'right',
    marginBottom: 0,
  },
});

export default NotesScreen;
