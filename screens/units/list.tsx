import React from 'react';
import { FlatList, ListRenderItem, View } from 'react-native';
import { Bar } from 'react-native-progress';
import { useAppNavigation } from '../../navigation/app/hooks';
import { useFetchUnitsQuery } from '../../store/unit/api';
import { UnitData } from '../../store/unit/types';
import { NAIRA } from '../../util/naira';
import { heightPixel, widthPixel } from '../../util/pxToDpConvert';
import { BoldNote, ProgressView, UnitCard, UnitPrice, UnitPriceView } from '../dashboard/components';
import { Body, Header } from './components';

export const UnitList:React.FC = () => {
  const {data} = useFetchUnitsQuery(undefined, {pollingInterval: 1000});
  const {navigateToUnitDetail} = useAppNavigation();
  const renderItem: ListRenderItem<UnitData> = ({item, index}) => {
    return (
      <UnitCard key={index} onPress={() => navigateToUnitDetail(item?.id ?? 0)}>
        <Header>{item.name}</Header>
        <Body>{item.property_name}</Body>
        <UnitPriceView>
          <UnitPrice>{NAIRA} {item.amount/1000000}M</UnitPrice>
        </UnitPriceView>
        <ProgressView>
          <BoldNote>
            PAID ({item.payment_summary?.percentage_paid.toFixed(1)}%)
          </BoldNote>
          <Bar
            animated={false}
            progress={item.payment_summary ? item.payment_summary?.percentage_paid / 100 : 0}
            height={heightPixel(4)}
            width={null}
          />
        </ProgressView>
      </UnitCard>
    );
  }
  return (
    <FlatList<UnitData>
      data={data ?? []}
      renderItem={renderItem}
      numColumns={2}
      keyExtractor={(item) => item?.name}
      contentContainerStyle={{
        paddingHorizontal: widthPixel(10),
        paddingVertical: heightPixel(15)
      }}
    />
  );
}