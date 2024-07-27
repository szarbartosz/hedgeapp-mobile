import React from 'react';
import { FieldValues, useController, UseControllerProps } from 'react-hook-form';
import { Button, Input as TextInput, Label, Text, XGroup, XStack, YStack } from 'tamagui';

import { ContentTypes } from '@/types/form';

type InputType = {
  name: string;
  label?: string;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  secureTextEntry?: boolean;
  placeholder?: string;
  suffixIcon?: JSX.Element | null;
  suffixIconCallback?: () => void;
  textContentType?: ContentTypes;
  multiline?: boolean;
};

export type Props<T extends FieldValues> = InputType & UseControllerProps<T>;

const Input = <T extends FieldValues>(props: Props<T>) => {
  const {
    control,
    name,
    label,
    placeholder,
    keyboardType,
    autoCapitalize,
    secureTextEntry,
    suffixIcon,
    suffixIconCallback,
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
    <YStack>
      <Label>{label}</Label>
      {suffixIcon ? (
        <XGroup>
          <XGroup.Item>
            <TextInput
              flex={1}
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
          </XGroup.Item>
          <XGroup.Item>
            <Button onPress={suffixIconCallback} backgroundColor="$color6" icon={suffixIcon} />
          </XGroup.Item>
        </XGroup>
      ) : (
        <XStack>
          <TextInput
            flex={1}
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
        </XStack>
      )}

      <Text padding="$2" color="$red10" fontSize={12}>
        {error?.message}
      </Text>
    </YStack>
  );
};

export default Input;
