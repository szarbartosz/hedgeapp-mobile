import { FC } from 'react';
import { Button, H4, Text, useTheme, XGroup, YGroup } from 'tamagui';

import { Application } from '@/types/data';
import { formattedDate } from '@/utils/helpers';

type Props = {
  application: Application;
};

const ApplicationCard: FC<Props> = ({ application }) => {
  const theme = useTheme();

  return (
    <XGroup
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      padding="$4"
      backgroundColor="$color1"
      borderWidth={1}
      borderColor="$color5"
      marginTop="$4">
      <XGroup.Item>
        <YGroup>
          <YGroup.Item>
            <H4 fontSize={14}>Sygnatura sprawy</H4>
            <Text color={theme.color11}>{application.signature || '-'}</Text>
          </YGroup.Item>
          <YGroup.Item>
            <H4 fontSize={14}>Wycinka komercyjna</H4>
            <Text color={theme.color11}>{application.isCommercial ? 'Tak' : 'Nie'}</Text>
          </YGroup.Item>
          <YGroup.Item>
            <H4 fontSize={14}>Przyczyna wycinki</H4>
            <Text color={theme.color11}>{application.deforestationCause || '-'}</Text>
          </YGroup.Item>
          <YGroup.Item>
            <H4 fontSize={14}>Termin przeprowadzenia wycinki</H4>
            <Text color={theme.color11}>
              {formattedDate(application.deforestationDate, 'D MMMM YYYY')}
            </Text>
          </YGroup.Item>
          <YGroup.Item>
            <H4 fontSize={14}>Termin wykonania nasadzeń zastępczych</H4>
            <Text color={theme.color11}>
              {formattedDate(application.plantingDate, 'D MMMM YYYY')}
            </Text>
          </YGroup.Item>
          <YGroup.Item>
            <H4 fontSize={14}>Miejsce nasadzeń</H4>
            <Text color={theme.color11}>{application.plantingSite || '-'}</Text>
          </YGroup.Item>
          <YGroup.Item>
            <H4 fontSize={14}>Gatunki</H4>
            <Text color={theme.color11}>{application.species || '-'}</Text>
          </YGroup.Item>
        </YGroup>
        {/* TODO: add edit button functionality */}
        <Button position="absolute" right={18} top={18} onPress={() => {}} borderRadius="$10">
          <Text>Edytuj</Text>
        </Button>
      </XGroup.Item>
    </XGroup>
  );
};

export default ApplicationCard;
