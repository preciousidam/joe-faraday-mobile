import { Ionicons } from "@expo/vector-icons";
import { HeaderBackButton, HeaderButtonProps } from "@react-navigation/elements";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import React, { useEffect } from "react";
import { ScrollView, View } from "react-native";
import { ActionButton, SquareButton } from "../../components/button/floatingAction";
import { DeleteDialog } from "../../components/dialog/deleteDialog";
import { useUnitNavigation, Nav } from "../../navigation/units/hook";
import { useFetchUnitQuery } from "../../store/unit/api";
import { NAIRA } from "../../util/naira";
import { numberWithCommas } from "../../util/numberFormatter";
import { fontPixel, heightPixel, widthPixel } from "../../util/pxToDpConvert";
import { fileColors } from "../projects/detailsView";
import { SummaryChart } from "./chart";
import { Body, Detail, FileListView, FileName, Files, FullScreen, Item, SectionHeader, SummaryView, Card, InfoHeader, InstallmentItem, InnerSpace, RoundIndicator } from "./components";
import { useUnitLogic } from "./logic";
import { AddPayment } from "./addPayments";
import { FileUploader } from "./uploadDialog";

export const UnitDetail: React.FC = () => {
  const {setOptions, goBack} = useNavigation<Nav>();
  const {params, navigateToEditForm} = useUnitNavigation();
  const {detail: unit, delPayment, editingPayment} = useUnitLogic(params?.id);
  useEffect(() => {
    setOptions({
      headerLeft: () => <HeaderBackButton
        label="Back"
        labelVisible={true}
        onPress={goBack}
      />,
      title: unit?.name,
      headerRight: (props: HeaderButtonProps) => (
        <DeleteDialog submit={() => {}} />
      )
    })
  }, [unit]);

  const getColor = (value: "not paid" | "over due" | "paid") => {
    switch(value){
      case 'paid':
        return '#64D32C';
      case 'not paid':
        return '#FFC53F';
      case 'over due':
        return '#FF502D';
    }
  }

  return (
    <FullScreen>
      <ScrollView contentContainerStyle={{marginHorizontal: widthPixel(15)}}>
        <View>
          <SectionHeader>Basic information</SectionHeader>
          <Card>
            <Item>
              <Body>Project name</Body>
              <Detail>{unit?.property_name}</Detail>
            </Item>
            <Item>
              <Body>Unit type</Body>
              <Detail>{unit?.type}</Detail>
            </Item>
            <Item>
              <Body>Agreed sale price</Body>
              <Detail>{NAIRA} {numberWithCommas(unit?.amount)}</Detail>
            </Item>
            <Item>
              <Body>Initial deposit</Body>
              <Detail>{NAIRA}  {numberWithCommas(unit?.initial_payment)}</Detail>
            </Item>
            <Item>
              <Body>Purchase date</Body>
              <Detail>{unit?.purchase_date}</Detail>
            </Item>
            <Item>
              <Body>Payment plan</Body>
              <Detail>{unit?.payment_plan? 'Yes' : 'No'}</Detail>
            </Item>
            <Item>
              <Body>Installments</Body>
              <Detail>{unit?.installment ?? 'Upfront'}</Detail>
            </Item>
          </Card>
        </View>
        <View>
          <SectionHeader>Payment summary</SectionHeader>
          <Card>
            <SummaryChart unit_id={unit?.id} />
            <SummaryView>
              <InfoHeader>Breakdown</InfoHeader>
            </SummaryView>
            <SummaryView>
              <Body>Total amount deposited</Body>
              <Detail>{NAIRA}  {numberWithCommas(unit?.payment_summary?.total_deposit ?? 0)}</Detail>
            </SummaryView>
            <SummaryView>
              <Body>Total outstanding payment</Body>
              <Detail>{NAIRA}  {numberWithCommas(unit?.payment_summary?.total_unpaid ?? 0)}</Detail>
            </SummaryView>
            <SummaryView>
              <Body>Percentage paid</Body>
              <Detail>{unit?.payment_summary?.percentage_paid?.toFixed(2)}%</Detail>
            </SummaryView>
            <SummaryView>
              <Body>Percentage outstanding</Body>
              <Detail>{unit?.payment_summary?.percentage_unpaid?.toFixed(2)}%</Detail>
            </SummaryView>
          </Card>
        </View>
        <View>
          <SectionHeader>Installment breakdown</SectionHeader>
          <Card>
            <SummaryView>
              <InfoHeader>Installment payment of a total sum ₦ {numberWithCommas(unit?.payment_summary?.installment_amount ?? 0)}</InfoHeader>
            </SummaryView>
            {unit?.payments?.map(({id,due_date, deleted, amount, status_value, ...rest}, index) => (
              <InstallmentItem key={index}>
                <InnerSpace>
                  <InnerSpace>
                    <RoundIndicator color={getColor(status_value)} />
                    <View style={{marginLeft: widthPixel(15)}}>
                      <Body>{moment(due_date).format('Do MMM, YYYY')}</Body>
                      <Detail deleted={deleted}>{NAIRA} {numberWithCommas(amount ?? 0)}</Detail>
                    </View>
                  </InnerSpace>
                  <InnerSpace>
                    {status_value !== 'paid' && !deleted && <SquareButton
                      icon={<Ionicons name="checkmark" size={fontPixel(24)} color="#ffffff" />}
                      onPress={() => editingPayment({id, due_date, deleted, amount, status_value: 'paid', ...rest})}
                      color='#B4F17E'
                      position='relative'
                      style={{marginHorizontal: widthPixel(5)}}
                    />}
                    <SquareButton
                      icon={<Ionicons name='trash-bin-sharp' size={fontPixel(24)} color="#ffffff" />}
                      onPress={() => delPayment(id ?? 0, 'Please not down somewhere else')}
                      color='#FFA981'
                      position='relative'
                      style={{marginHorizontal: widthPixel(5)}}
                      disabled={deleted}
                    />
                  </InnerSpace>
                </InnerSpace>
              </InstallmentItem>
            ))}
            <AddPayment unit_id={unit?.id} />
          </Card>
        </View>
        <View>
          <SectionHeader>After sale</SectionHeader>
          <Card>
            <SummaryView>
              <Body>Handover date</Body>
              <Detail>{moment(unit?.handover_date).format("Do MMM YYYY")}</Detail>
            </SummaryView>
            {unit?.warranty?.isValid && <>
              <SummaryView>
                <Body>Warranty period</Body>
                <Detail>{unit?.warranty_period} Month(s)</Detail>
              </SummaryView>
              <SummaryView>
                <Body>Warranty expires</Body>
                <Detail>{moment(unit?.warranty?.expire_at).format("Do MMM YYYY")}</Detail>
              </SummaryView>
            </>}
          </Card>
        </View>
        <View>
          <SectionHeader>Client information</SectionHeader>
          <Card>
            <Item>
              <Body>Full name</Body>
              <Detail>{unit?.client?.fullname}</Detail>
            </Item>
            <Item>
              <Body>Email Address</Body>
              <Detail>{unit?.client?.email}</Detail>
            </Item>
            <Item>
              <Body>Phone number</Body>
              <Detail>{unit?.client?.phone}</Detail>
            </Item>
            <Item>
              <Body>Address</Body>
              <Detail>{unit?.client?.address}</Detail>
            </Item>
          </Card>
        </View>
        <View>
          <SectionHeader>Agent information</SectionHeader>
          <Card>
            <Item>
              <Body>Cortts rep name</Body>
              <Detail>{unit?.salesRep?.fullname}</Detail>
            </Item>
            <Item>
              <Body>Agent fullname</Body>
              <Detail>{unit?.agent?.fullname}</Detail>
            </Item>
            <Item>
              <Body>Agent email</Body>
              <Detail>{unit?.agent?.email}</Detail>
            </Item>
            <Item>
              <Body>Agent phone number</Body>
              <Detail>{unit?.agent?.phone}</Detail>
            </Item>
          </Card>
        </View>
        <View>
          <SectionHeader>Legal document</SectionHeader>
          <Card>
            {unit?.documents && unit?.documents?.length > 0 ? <FileListView>
             {unit?.documents?.map(({name, link}, index) => (
               <View key={index}>
                <Files backgroundColor={fileColors(link).bg}>
                  {fileColors(link).icon}
                </Files>
                <FileName>{name}</FileName>
               </View>
             ))}
            </FileListView>:
            (<Body style={{marginTop: heightPixel(15)}}>
                Upload all documents template for this project here.
              </Body>)}
            <FileUploader project_id={unit?.id ?? 0} />
          </Card>
        </View>
      </ScrollView>
      <ActionButton
        icon='edit'
        onPress={() => navigateToEditForm(params?.id ?? 0)}
      />
    </FullScreen>
  )
}