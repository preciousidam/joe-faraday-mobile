import React from "react";
import { ScrollView, View } from "react-native";
import { useFetchDataQuery } from "../../store/dashboard/api";
import { NAIRA } from "../../util/naira";
import { SummaryChart } from "./chart";
import moment from 'moment';
import { Bar } from "react-native-progress";
import { Body, BoldNote, Card, FootNote, FullScreen, Header, InnerCard, Money, Point, PointCont, ProgressView, SectionHeader, SpaceContainer, UnitCard, UnitPrice, UnitPriceView, WrapView } from "./components";
import { LinkButton } from "../../components/button";
import { useAppNavigation } from "../../navigation/app/hooks";
import { heightPixel } from "../../util/pxToDpConvert";

export const Dashboard: React.FC = () => {
  const {data} = useFetchDataQuery(undefined, {pollingInterval: 1000});
  const {navigateToProjects, navigateToUnits, navigateToProjectDetail, navigateToUnitDetail} = useAppNavigation();

  return (
    <FullScreen>
      <ScrollView>
        <SummaryChart info={data?.stats} />
        <Card>
          <SectionHeader>Upcoming payments</SectionHeader>
          {data?.payments?.over_due?.map((payment, index) => (
            <InnerCard key={index} onPress={() => navigateToUnitDetail(payment.unit_id)}>
              <SpaceContainer>
                <SectionHeader>{payment.unit_info.name}</SectionHeader>
                <PointCont>
                  <Point variant='red' />
                  <Body>Missed</Body>
                </PointCont>
              </SpaceContainer>
              <SpaceContainer style={{marginBottom: 0}}>
                <View>
                  <Body>{moment(payment.due_date).fromNow()}</Body>
                  <FootNote>Due date</FootNote>
                </View>
                <View>
                  <Money>{NAIRA} {payment.amount / 1000000}M</Money>
                  <FootNote>Amount</FootNote>
                </View>
              </SpaceContainer>
            </InnerCard>
          ))}

          {data?.payments?.next_payments?.map((payment, index) => (
            <InnerCard key={index} onPress={() => navigateToUnitDetail(payment.unit_id)}>
              <SpaceContainer>
                <SectionHeader>{payment.unit_info.name}</SectionHeader>
                <PointCont>
                  <Point variant='yellow' />
                  <Body>Pending</Body>
                </PointCont>
              </SpaceContainer>
              <SpaceContainer style={{marginBottom: 0}}>
                <View>
                  <Body>{moment(payment.due_date).fromNow()}</Body>
                  <FootNote>Due date</FootNote>
                </View>
                <View>
                  <Money>{NAIRA} {payment.amount / 1000000}M</Money>
                  <FootNote>Amount</FootNote>
                </View>
              </SpaceContainer>
            </InnerCard>
          ))}
        </Card>
        <Card>
          <SpaceContainer>
            <SectionHeader>Sold Units</SectionHeader>
            <LinkButton
              text="See more"
              size="small"
              onPress={navigateToUnits}
            />
          </SpaceContainer>
          <WrapView>
            {data?.units?.map((unit, index) => (
              <UnitCard key={index} onPress={() => navigateToUnitDetail(unit.id ?? 0)}>
                <Header>{unit.name}</Header>
                <Body>{unit.property_name}</Body>
                <UnitPriceView>
                  <UnitPrice>{NAIRA} {unit.amount/1000000}M</UnitPrice>
                </UnitPriceView>
                <ProgressView>
                  <BoldNote>
                    PAID ({unit.payment_summary?.percentage_paid.toFixed(1)}%)
                  </BoldNote>
                  <Bar
                    animated={false}
                    progress={unit.payment_summary ? unit.payment_summary?.percentage_paid / 100 : 0}
                    height={heightPixel(4)}
                    width={null}
                  />
                </ProgressView>
              </UnitCard>
            ))}
          </WrapView>
        </Card>
        <Card>
          <SpaceContainer>
            <SectionHeader>Current Projects</SectionHeader>
            <LinkButton
              onPress={navigateToProjects}
              text="See more"
              size="small"
            />
          </SpaceContainer>
          {data?.properties.map((property, index) => (
            <InnerCard key={index} onPress={() => navigateToProjectDetail(property.id ?? 0)}>
              <SpaceContainer>
                <View style={{flex: 4}}>
                  <Header>{property.name}</Header>
                  <Body>{property.address}</Body>
                </View>
                <Body style={{flex: 1}}>{property.num_units} unit(s)</Body>
              </SpaceContainer>
            </InnerCard>
          ))}
        </Card>
      </ScrollView>
    </FullScreen>
  )
}