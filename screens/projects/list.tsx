import React from 'react';
import { FlatList, ListRenderItem, View } from 'react-native';
import { useAppNavigation } from '../../navigation/app/hooks';
import { useFetchPropertiesQuery } from '../../store/property/api';
import { PropertyData } from '../../store/property/types';
import { heightPixel, widthPixel } from '../../util/pxToDpConvert';
import { Body, Card, Header, SpaceContainer } from './components';

export const ProjectList:React.FC = () => {
  const {data} = useFetchPropertiesQuery(undefined, {pollingInterval: 1000});
  const {navigateToProjectDetail} = useAppNavigation();
  const renderItem: ListRenderItem<PropertyData> = ({item}) => {
    return (
      <Card onPress={() => navigateToProjectDetail(item.id ?? 0)}>
        <SpaceContainer>
          <View style={{flex: 4}}>
            <Header>{item.name}</Header>
            <Body>{item.address}</Body>
          </View>
          <View style={{flex: 1, alignSelf: 'flex-start'}}>
            <Body>{item.num_units} unit(s)</Body>
          </View>
        </SpaceContainer>
      </Card>
    );
  }
  return (
    <FlatList<PropertyData>
      data={data ?? []}
      renderItem={renderItem}
      keyExtractor={prop => prop?.name}
      contentContainerStyle={{
        paddingHorizontal: widthPixel(10),
        paddingVertical: heightPixel(15)
      }}
    />
  );
}