import { FC } from 'react';
import { Button, Text, useTheme, XGroup, YGroup } from 'tamagui';

import { Note } from '@/types/data';

type Props = {
  notes: Note[];
};

const NotesCard: FC<Props> = ({ notes }) => {
  const theme = useTheme();

  return (
    <XGroup
      display="flex"
      padding="$4"
      backgroundColor="$color1"
      borderWidth={1}
      borderColor="$color5"
      marginTop="$4"
      minHeight="$8">
      <XGroup.Item>
        <YGroup gap={8}>
          {notes.length ? (
            notes.map((note, index) => (
              <YGroup.Item key={index}>
                <Text color={theme.color11}>{note.content}</Text>
              </YGroup.Item>
            ))
          ) : (
            <YGroup.Item>
              <Text color={theme.color11}>Brak notatek</Text>
            </YGroup.Item>
          )}
        </YGroup>
        {/* TODO: Add edit button functionality */}
        <Button position="absolute" right={18} top={18} onPress={() => {}} borderRadius="$10">
          <Text>Edytuj</Text>
        </Button>
      </XGroup.Item>
    </XGroup>
  );
};

export default NotesCard;