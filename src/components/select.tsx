import React, { useMemo } from 'react';
import { FieldValues, useController, UseControllerProps } from 'react-hook-form';
import { Adapt, Label, Select as SelectPicker, Sheet, Text, useTheme, YStack } from 'tamagui';

import { CheckIcon, ChevronDownIcon } from '@/assets/icons';

type SelectType = {
  name: string;
  label?: string;
  items: { id: number; label: string }[];
  placeholder?: string;
  booleanValue?: boolean;
};

export type Props<T extends FieldValues> = SelectType & UseControllerProps<T>;

const Select = <T extends FieldValues>(props: Props<T>) => {
  const { control, name, label, items, placeholder } = props;
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController<T>({ name, control });

  const theme = useTheme();

  const extractValue = (value: string) =>
    items.find(item => item.label.toLowerCase() === value)?.id;

  return (
    <YStack>
      <Label>{label}</Label>
      <SelectPicker
        value={value}
        onValueChange={v => onChange(extractValue(v))}
        disablePreventBodyScroll
        {...props}>
        <SelectPicker.Trigger
          iconAfter={<ChevronDownIcon strokeColor={theme.color11.val} />}
          backgroundColor="$color2"
          borderColor="$color6">
          <SelectPicker.Value>{items.find(item => item.id === value)?.label}</SelectPicker.Value>
        </SelectPicker.Trigger>

        <Adapt when="sm" platform="touch">
          <Sheet
            modal
            dismissOnSnapToBottom
            animationConfig={{
              type: 'timing',
              duration: 200,
            }}>
            <Sheet.Frame>
              <Sheet.ScrollView>
                <Adapt.Contents />
              </Sheet.ScrollView>
            </Sheet.Frame>
            <Sheet.Overlay
              animation="lazy"
              enterStyle={{ opacity: 0 }}
              exitStyle={{ opacity: 0 }}
            />
          </Sheet>
        </Adapt>

        <SelectPicker.Content zIndex={200000}>
          <SelectPicker.Viewport>
            <SelectPicker.Group paddingBottom="$8">
              <SelectPicker.Label>{placeholder}</SelectPicker.Label>
              {useMemo(
                () =>
                  items.map((item, i) => (
                    <SelectPicker.Item index={i} key={item.label} value={item.label.toLowerCase()}>
                      <SelectPicker.ItemText>{item.label}</SelectPicker.ItemText>
                      <SelectPicker.ItemIndicator>
                        <CheckIcon />
                      </SelectPicker.ItemIndicator>
                    </SelectPicker.Item>
                  )),
                [items]
              )}
            </SelectPicker.Group>
          </SelectPicker.Viewport>
        </SelectPicker.Content>
      </SelectPicker>

      <Text padding="$2" color="$red10" fontSize={12}>
        {error?.message}
      </Text>
    </YStack>
  );
};

export default Select;
