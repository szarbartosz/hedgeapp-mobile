import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { forwardRef, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button, H4, ScrollView, Text, useTheme, View, XGroup, YGroup, YStack } from 'tamagui';

import { useCreateNoteMutation, useDeleteNoteMutation } from '@/api/notes.service';
import { TrashIcon } from '@/assets/icons';
import Input from '@/components/input';
import { AddNoteRequest } from '@/models/investment copy';
import { Note } from '@/types/data';
import { noteValidationSchema } from '@/utils/schemas';

type Props = { investmentId: number; notes: Note[] };

const NotesSheet = forwardRef<BottomSheetModal, Props>(({ investmentId, notes }, ref) => {
  const insets = useSafeAreaInsets();
  const theme = useTheme();

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} />,
    []
  );

  const [createNote] = useCreateNoteMutation();
  const [deleteNote] = useDeleteNoteMutation();

  const { control, handleSubmit, reset } = useForm<AddNoteRequest>({
    mode: 'onChange',
    defaultValues: {
      content: '',
    },
    resolver: zodResolver(noteValidationSchema),
  });

  const onSubmit = async (data: AddNoteRequest) => {
    await createNote({ investmentId, data });
    reset();
    (ref as React.RefObject<BottomSheetModal>).current?.dismiss();
  };

  const onDelete = async (id: number) => {
    await deleteNote({ id, investmentId });
    (ref as React.RefObject<BottomSheetModal>).current?.dismiss();
  };

  return (
    <BottomSheetModal
      ref={ref}
      snapPoints={['70%']}
      handleIndicatorStyle={{ display: 'none' }}
      backdropComponent={renderBackdrop}
      enableDynamicSizing={false}
      backgroundStyle={{
        backgroundColor: theme.color1.val,
      }}
      containerStyle={{ zIndex: 2 }}>
      <BottomSheetView
        style={{
          flexDirection: 'column',
          paddingHorizontal: 24,
          paddingBottom: Platform.OS === 'ios' ? (insets.bottom ? 60 : 40) : 40,
        }}>
        <H4 marginTop="$4">Notatki</H4>
        <ScrollView showsVerticalScrollIndicator={false}>
          <YStack gap="$4" paddingBottom="$10">
            <YGroup>
              {notes.map((note, index) => (
                <XGroup
                  key={index}
                  padding="$4"
                  borderBottomWidth={1}
                  borderBottomColor={theme.color8.val}
                  justifyContent="space-between">
                  <Text maxWidth="85%">{note.content}</Text>
                  <TrashIcon
                    width={24}
                    height={24}
                    strokeColor={theme.color11.val}
                    onPress={() => onDelete(note.id)}
                  />
                </XGroup>
              ))}
            </YGroup>
            <Input
              name="content"
              placeholder="Podaj treść notatki"
              control={control}
              autoCapitalize="sentences"
              multiline
            />
            <View gap="$4" marginVertical="$4">
              <Button
                backgroundColor={theme.$color12}
                borderColor={theme.$color12}
                color={theme.$color1}
                onPress={handleSubmit(onSubmit)}>
                Zapisz
              </Button>
              <Button
                backgroundColor={theme.$color4}
                color={theme.$color12}
                borderColor={theme.$color12}
                onPress={() => (ref as React.RefObject<BottomSheetModal>).current?.dismiss()}>
                Anuluj
              </Button>
            </View>
          </YStack>
        </ScrollView>
      </BottomSheetView>
    </BottomSheetModal>
  );
});

export default NotesSheet;
