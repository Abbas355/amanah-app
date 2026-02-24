import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, StyleSheet, TextInput, type TextInputProps, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { FONT_DEFAULT } from '@/constants/fonts';

const LABEL_COLOR = '#6B7280';
const INPUT_BG = '#EFEFEF';
const PLACEHOLDER_COLOR = '#B2B2B2';

export type FormInputProps = TextInputProps & {
  label: string;
  placeholder: string;
  secureTextEntry?: boolean;
  showPasswordToggle?: boolean;
  isPasswordVisible?: boolean;
  onPasswordToggle?: () => void;
  rightIcon?: 'calendar' | 'password';
  onCalendarPress?: () => void;
  editable?: boolean;
  helperText?: string;
  helperColor?: string;
};

export function FormInput({
  label,
  placeholder,
  secureTextEntry = false,
  showPasswordToggle,
  isPasswordVisible,
  onPasswordToggle,
  rightIcon,
  onCalendarPress,
  editable = true,
  helperText,
  helperColor,
  style,
  ...rest
}: FormInputProps) {
  const showEyeToggle = secureTextEntry && showPasswordToggle;
  const isSecure = secureTextEntry && !isPasswordVisible;
  const showRightIcon = showEyeToggle || rightIcon === 'calendar';
  const isCalendar = rightIcon === 'calendar';

  return (
    <View style={styles.container}>
      <AppText style={styles.label}>{label}</AppText>
      <View style={styles.inputWrap}>
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={PLACEHOLDER_COLOR}
          secureTextEntry={isSecure}
          editable={!isCalendar && editable}
          style={[
            styles.input,
            showRightIcon && styles.inputWithIcon,
            isCalendar && styles.inputCalendar,
            style,
          ]}
          {...rest}
        />
        {showEyeToggle && (
          <Pressable
            onPress={onPasswordToggle}
            style={styles.iconWrapper}
            hitSlop={12}
          >
            <Ionicons
              name={isPasswordVisible ? 'eye-off' : 'eye'}
              size={22}
              color="#111827"
            />
          </Pressable>
        )}
        {rightIcon === 'calendar' && !showEyeToggle && (
          <Pressable
            onPress={onCalendarPress}
            style={styles.iconWrapper}
            hitSlop={12}
          >
            <Ionicons name="calendar-outline" size={22} color="#111827" />
          </Pressable>
        )}
      </View>
      {helperText && (
        <AppText style={[styles.helperText, helperColor ? { color: helperColor } : null]}>
          {helperText}
        </AppText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 6,
  },
  label: {
    fontFamily: FONT_DEFAULT,
    fontSize: 10,
    fontWeight: '500',
    color: LABEL_COLOR,
    paddingLeft: 12,
  },
  inputWrap: {
    position: 'relative',
    height: 52,
  },
  input: {
    fontFamily: FONT_DEFAULT,
    width: '100%',
    height: 52,
    backgroundColor: INPUT_BG,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 0,
    fontSize: 16,
    color: '#111827',
    borderWidth: 0,
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
  inputWithIcon: {
    paddingRight: 52,
  },
  inputCalendar: {
    paddingRight: 52,
  },
  iconWrapper: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: 52,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 4,
  },
  helperText: {
    fontFamily: FONT_DEFAULT,
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
    paddingHorizontal: 4,
    marginTop: 4,
  },
});
