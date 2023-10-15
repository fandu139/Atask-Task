import React, { useRef, useState } from 'react';
import { Keyboard, StyleSheet, TouchableOpacity, View, KeyboardTypeOptions, Alert } from 'react-native';
import { TextField } from 'rn-material-ui-textfield';
import { KeyboardAwareScrollView } from '@mtourj/react-native-keyboard-aware-scroll-view';
import { useForm, Controller, FieldError } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Button from '../../../uikit/Button';
import Text from '../../../uikit/Text';
import TextInput from '../../../uikit/TextInput';
import Pattern from '../../../helper/pattern';
import { setNewUserRegisted, getNewUserRegisted } from '../../../storage/auth';
import AppStyles from '../../../theme/appStyles';
import Colors from '../../../theme/colors';
import Fonts from '../../../theme/fonts';
import { ICON_HIDE_PASSWORD, ICON_SHOW_PASSWORD } from '../../../assets/icon';

interface SubmitRegisterData {
  email: string;
  name: string;
  password: string;
  passwordConfirmation: string;
}

type FieldList = 'name' | 'email' | 'password' | 'passwordConfirmation';

const RegistrationScreen: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const inputUsernameElementRef = React.useRef<TextField>();
  const inputEmailElementRef = React.useRef<TextField>();
  const inputPasswordElementRef = useRef<TextField>(null);
  const inputPasswordConfirmElementRef = useRef<TextField>(null);
  
  const schema = yup.object().shape({
        name: yup
          .string()
          .required("Perlu diisi")
          .trim("Tidak boleh ada spasi di awal / akhir")
          .strict(true),
        email: yup
          .string()
          .required("Perlu diisi")
          .email("Format email harus sesuai"),
        password: yup
              .string()
              .required("Perlu diisi")
              .matches(Pattern.passwordPolicy, "Kata sandi minimal 8 karakter, harus menggunakan kombinasi huruf kapital, huruf kecil, angka, dan karakter khusus (!@#$%^&*_+=,.<>?/), dan tidak boleh mengandung spasi."),
        passwordConfirmation: yup
          .string()
          .required("Perlu diisi")
          .oneOf([yup.ref('password')], "Kata sandi tidak sama")
          .min(8, "Minimal 8 karakter"),
      });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      passwordConfirmation: '',
    },
    resolver: yupResolver(schema),
  });
  
  const registrationFormField = [
    {
      key: 'name',
      fieldLabel: "Nama Lengkap",
      fieldPlaceholder: "Masukkan nama lengkap Anda",
      ref: inputUsernameElementRef,
    },
    {
      key: 'email',
      fieldLabel: "Email",
      fieldPlaceholder: "Masukkan email Anda",
      type: 'email-address',
      ref: inputEmailElementRef,
    },
    {
      key: 'password',
      fieldLabel: "Password",
      fieldPlaceholder: "Buat kata sandi",
      secureTextEntry: !showPassword,
      ref: inputPasswordElementRef,
      rightIcon: {
        name: showPassword ? ICON_SHOW_PASSWORD : ICON_HIDE_PASSWORD,
        size: 12,
        testID: 'show-password-reveal-btn',
        color: Colors.BLACK,
        onPress: () => {
          setShowPassword(!showPassword);
        },
      },
    },
    {
      key: 'passwordConfirmation',
      fieldLabel: "Konfirmasi Kata Sandi",
      fieldPlaceholder: "Ketik ulang kata sandi Anda",
      secureTextEntry: !showConfirmPassword,
      ref: inputPasswordConfirmElementRef,
      rightIcon: {
        name: showConfirmPassword ? ICON_SHOW_PASSWORD : ICON_HIDE_PASSWORD,
        size: 12,
        testID: 'show-password-confirm-reveal-btn',
        color: Colors.BLACK,
        onPress: () => {
          setShowConfirmPassword(!showConfirmPassword);
        },
      },
    },
  ];

  const onSubmitRegisterData = async (data: SubmitRegisterData) => {
    Keyboard.dismiss();
    const getNewAccount: Array<{
      email: string;
      name: string;
      password: string;
      passwordConfirmation: string;
    }> = await getNewUserRegisted();
    if (getNewAccount === null) {
      await setNewUserRegisted([data]);
    } else {
      const isCheckData = getNewAccount.some(value => value?.email === data?.email);
      if (isCheckData) {
        Alert.alert("Error", "Email sudah terdaftar, silahkan input dengan email yang berbeda");
      } else {
        getNewAccount.push(data)
        await setNewUserRegisted(getNewAccount);
        Alert.alert("Sukses", "Email telah terdaftar, silahkan login");
        reset();
      }
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        nestedScrollEnabled
      >
        <Text.Black style={styles.title}>{"Data Diri"}</Text.Black>
        <View style={styles.inputContainer}>
          {registrationFormField.map((item) => {
            const key = item?.key as FieldList;

            return (
              <Controller
                control={control}
                name={key}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    inverted
                    key={item.key}
                    containerStyle={styles.textInputContainer}
                    secureTextEntry={item.secureTextEntry || false}
                    isError={!!errors[key]?.message}
                    errorText={errors[key]?.message}
                    label={item.fieldLabel}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    text={value}
                    contentInset={{
                      label: 10,
                      input: 10,
                    }}
                    rightIcon={item.rightIcon}
                  />
                )}
              />
            );
          })}
          <Button
            style={styles.buttonContainer}
            title={"Daftar Sekarang"}
            onPress={handleSubmit(onSubmitRegisterData)}
            testID="button-submit-register"
            mode='outlined-bw'
          />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...AppStyles.container,
    backgroundColor: Colors.GREEN_47,
  },
  title: {
    marginTop: 20,
    marginHorizontal: 20,
    marginBottom: 10,
    fontSize: Fonts.size.superLarge,
    color: Colors.WHITE,
  },
  inputContainer: {
    marginTop: 30,
  },
  textInputContainer: {
    paddingBottom: 20,
    marginHorizontal: 20,
  },
  buttonContainer: {
    marginHorizontal: 20,
    marginVertical: 15,
  },
  label: {
    flex: 1,
    color: Colors.GRAY80,
    fontSize: Fonts.size.extraSmall,
    lineHeight: 10,
    marginBottom: 3,
  },
});

export default RegistrationScreen;
