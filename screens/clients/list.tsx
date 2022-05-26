import React from 'react';
import { FlatList, ListRenderItem, View } from 'react-native';
import { useAppNavigation } from '../../navigation/app/hooks';
import { useFetchClientsQuery } from '../../store/client/api';
import { ClientData } from '../../store/client/types';
import { heightPixel, widthPixel } from '../../util/pxToDpConvert';
import { Body, Header, Card, Profile, ProfileView, ItemContainer } from './components';

const getInitials = (name: string) => {
  const nameArr = name.split(' ');
  return `${nameArr[0][0]}${nameArr.length > 1 ? nameArr[1][0] : ''}`
}

export const ClientList:React.FC = () => {
  const {data} = useFetchClientsQuery(undefined, {pollingInterval: 1000});
  const {navigateToClientDetail} = useAppNavigation();
  const renderItem: ListRenderItem<ClientData> = ({item, index}) => {
    return (
      <Card key={index} onPress={() => navigateToClientDetail(item?.id ?? 0)}>
        <ItemContainer>
          <ProfileView index={index}>
            <Profile>{getInitials(item.fullname)}</Profile>
          </ProfileView>
        </ItemContainer>
        <View>
          <Header>{item.fullname}</Header>
          <Body>{item.email}</Body>
          <Body>{item.phone}</Body>
        </View>
      </Card>
    );
  }
  return (
    <FlatList<ClientData>
      data={data ?? []}
      renderItem={renderItem}
      keyExtractor={(item) => item?.fullname}
      contentContainerStyle={{
        paddingHorizontal: widthPixel(10),
        paddingVertical: heightPixel(15)
      }}
    />
  );
}