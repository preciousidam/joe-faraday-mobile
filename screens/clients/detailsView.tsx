import { HeaderBackButton, HeaderButtonProps } from "@react-navigation/elements";
import { useNavigation, useTheme } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Modal, ScrollView, View } from "react-native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { ActionButton } from "../../components/button/floatingAction";
import { useClientNavigation, Nav } from "../../navigation/clients/hook";
import { useFetchClientQuery } from "../../store/client/api";
import {
  FullScreen,
  ContactCard,
  Name,
  Body,
  ActionView,
  FloatingAction,
  PhoneViewCont,
  PhoneViewLeft,
  PhoneViewRight,
  PhoneHeader,
  Divider,
  Item,
  AlertView,
  AlertText
} from "./components";
import { fontPixel } from "../../util/pxToDpConvert";
import { SectionHeader } from "../dashboard/components";
import { DeleteDialog } from "../../components/dialog/deleteDialog";
import { useClientLogic } from "./logic";
import moment from "moment";

export const ClientDetail: React.FC = () => {
  const {setOptions, goBack} = useNavigation<Nav>();
  const {params, navigateToEditForm} = useClientNavigation();
  const {detail: client, delClient} = useClientLogic(params?.id);
  useEffect(() => {
    setOptions({
      headerLeft: (props: HeaderButtonProps) => <HeaderBackButton
        {...props}
        label="Back"
        labelVisible={true}
        onPress={goBack}
      />,
      headerRight: (props: HeaderButtonProps) => (
        <DeleteDialog submit={delClient} />
      ),
      title: ''
    })
  }, [client]);

  return (
    <FullScreen color='card'>
      <ScrollView>
        <ContactCard>
          <View>
            <Name>{client?.title} {client?.fullname}</Name>
            <Body>{client?.email}</Body>
          </View>
          <PhoneViewCont>
            <PhoneViewLeft>
              <Body>Phone</Body>
              <PhoneHeader>{client?.phone}</PhoneHeader>
            </PhoneViewLeft>
            <Divider></Divider>
            <PhoneViewRight>
              <Body>Status</Body>
              <PhoneHeader>{client?.deleted ? 'Blocked' : 'Active'}</PhoneHeader>
            </PhoneViewRight>
          </PhoneViewCont>
          <ActionView>
            <FloatingAction
              position='relative'
              color="#FFCF47"
              icon={<Ionicons name="mail"  color={'#ffffff'} size={fontPixel(20)} />}
            />
            <FloatingAction
              position='relative'
              color="#6BDCFF"
              icon={<Ionicons name="chatbubble-ellipses-sharp"  color={'#ffffff'} size={fontPixel(20)} />}
            />
            <FloatingAction
              position='relative'
              color="#6FD260"
              icon={<FontAwesome name="phone"  color={'#ffffff'} size={fontPixel(20)} />}
            />
          </ActionView>
        </ContactCard>
        {client?.deleted && <AlertView>
          <AlertText>{client?.reason_for_delete}</AlertText>
        </AlertView>}
        <View>
          <Item>
            <Body>Address</Body>
            <PhoneHeader>{client?.address}</PhoneHeader>
          </Item>
          <Item>
            <Body>Employment status</Body>
            <PhoneHeader>{client?.status}</PhoneHeader>
          </Item>
          <Item>
            <Body>Date of birth</Body>
            <PhoneHeader>{moment(client?.date_of_birth).format('MMMM Do YYYY')}</PhoneHeader>
          </Item>
          <Item>
            <Body>Job title</Body>
            <PhoneHeader>{client?.job_title}</PhoneHeader>
          </Item>
          <Item>
            <Body>Business / Company name</Body>
            <PhoneHeader>{client?.company_name}</PhoneHeader>
          </Item>
          <Item>
            <Body>Business / Company address</Body>
            <PhoneHeader>{client?.work_address}</PhoneHeader>
          </Item>
        </View>
      </ScrollView>
      <ActionButton
        icon='edit'
        onPress={() => navigateToEditForm(params?.id ?? 0)}
      />
    </FullScreen>
  )
}