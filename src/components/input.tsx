import React, { ReactNode } from 'react';
import { FieldValues, useController, UseControllerProps } from 'react-hook-form';
import { Text, TextInput, View } from 'react-native';

import { ContentTypes } from '@/types/form';

type InputType = {
  name: string;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  secureTextEntry?: boolean;
  placeholder?: string;
  prefixIcon?: ReactNode;
  suffixIcon?: ReactNode;
  textContentType?: ContentTypes;
  multiline?: boolean;
};

export type Props<T extends FieldValues> = InputType & UseControllerProps<T>;

const Input = <T extends FieldValues>(props: Props<T>) => {
  const {
    control,
    name,
    placeholder,
    keyboardType,
    autoCapitalize,
    secureTextEntry,
    prefixIcon,
    suffixIcon,
    textContentType,
    multiline,
  } = props;
  const {
    field: { onChange, ...rest },
    fieldState: { error },
  } = useController<T>({ name, control });

  const handleTextChange = (text: string) => {
    if (name === 'phoneNumber') {
      if (text.startsWith('+')) {
        onChange(text);
      } else {
        onChange('+' + text);
      }
    } else {
      onChange(text);
    }
  };

  const handleLength = () => {
    switch (name) {
      case 'phoneNumber':
        return 12;
      case 'about':
        return 100;
      default:
        return 34;
    }
  };

  return (
    <View>
      <View>
        {prefixIcon}
        <TextInput
          maxLength={handleLength()}
          onChangeText={handleTextChange}
          placeholder={placeholder}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          secureTextEntry={secureTextEntry}
          textContentType={textContentType}
          blurOnSubmit={false}
          multiline={multiline}
          {...rest}
        />
        {suffixIcon}
      </View>
      <Text>{error?.message}</Text>
    </View>
  );
};

export default Input;
