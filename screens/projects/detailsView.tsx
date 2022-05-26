import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { HeaderBackButton, HeaderButtonProps } from "@react-navigation/elements";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { ScrollView, View } from "react-native";
import { ActionButton } from "../../components/button/floatingAction";
import { DeleteDialog } from "../../components/dialog/deleteDialog";
import { Nav as ProjectNav, useProjectNavigation } from "../../navigation/projects/hook";
import { useFetchPropertyQuery } from "../../store/property/api";
import { fontPixel, heightPixel, widthPixel } from "../../util/pxToDpConvert";
import { Body, FullScreen, Item, Detail, SectionHeader, Card, FileListView, Files, FileName, SummaryView } from "./components";
import { useProjectLogic } from "./logic";
import { UnitSummary } from "./unitsSummary";
import { FileUploader } from "./uploadDialog";

export const fileColors = (link: string): {icon: JSX.Element, bg: string} => {
  const ext = link.split('.').pop();
  const Excel = <MaterialCommunityIcons name='microsoft-excel' size={fontPixel(24)} color="#64D32C" />;
  const Word = <MaterialCommunityIcons name="microsoft-word" size={fontPixel(24)} color="#007AFF" />;
  const Pdf = <MaterialCommunityIcons name='file-pdf-box' size={fontPixel(24)} color="#FF502D" />;
  const Img = <Ionicons name='image-sharp' size={fontPixel(24)} color="#FFC53F" />;
  const Txt = <Ionicons name='document' color="#343434" size={fontPixel(24)} />;
  switch (ext){
    case 'pdf':
      return ({icon: Pdf, bg: '#FFCCAB'});
    case 'png':
    case 'jpeg':
    case 'jpg':
    case 'gif':
      return ({icon: Img, bg: '#FFEEB2'});
    case 'docx':
    case 'dot':
    case 'dotm':
    case 'doc':
    case 'docm':
    case 'rtf':
    case 'wps':
      return ({icon: Word, bg: '#99D8FF'});
    case 'csv':
    case 'slk':
    case 'xls':
    case 'xla':
    case 'xlsb':
    case 'xlsm':
    case 'xlsx':
    case 'xsp':
      return ({icon: Excel, bg: '#D5FAAB'})
  }
  return ({icon: Txt, bg: '#FFEEB2'});
}

export const ProjectDetail: React.FC = () => {
  const {setOptions, goBack} = useNavigation<ProjectNav>();
  const {params, navigateToEditForm} = useProjectNavigation();
  const {detail: property, delProperty} = useProjectLogic(params?.id);
  useEffect(() => {
    setOptions({
      headerLeft: () => <HeaderBackButton
        label="Back"
        labelVisible={true}
        onPress={goBack}
      />,
      title: property?.name,
      headerRight: (props: HeaderButtonProps) => (
        <DeleteDialog submit={delProperty} />
      )
    })
  }, [property]);
  return (
    <FullScreen>
      <ScrollView contentContainerStyle={{paddingHorizontal: widthPixel(15)}}>
        <View>
          <SectionHeader>Basic information</SectionHeader>
          <Card>
            <Item>
              <Body>Project name</Body>
              <Detail>{property?.name}</Detail>
            </Item>
            <Item>
              <Body>Project address</Body>
              <Detail>{property?.address}</Detail>
            </Item>
            <Item>
              <Body>Purpose</Body>
              <Detail>{property?.purpose}</Detail>
            </Item>
            <Item>
              <Body>Total number of units</Body>
              <Detail>{property?.num_units}</Detail>
            </Item>
            <Item>
              <Body>Project description</Body>
              <Detail>{property?.description}</Detail>
            </Item>
          </Card>
        </View>
        <View>
          <SectionHeader>Unit summary</SectionHeader>
          <Card>
            {!property?.unit_info || property?.unit_info?.length == 0 ?
              (<Body style={{marginTop: heightPixel(15)}}>
                  Please enter units information
              </Body>):
              (<SummaryView>
                <Detail>Type</Detail>
                <Detail>No. unit</Detail>
              </SummaryView>)}
            {property?.unit_info?.map(({prop_type, amount}) => (
              <SummaryView key={prop_type}>
                <Body>{prop_type}</Body>
                <Detail>{amount}</Detail>
              </SummaryView>
            ))}
            <UnitSummary
              isNew={property?.unit_info?.length == 0}
              project_id={property?.id ?? 0}
            />
          </Card>
        </View>
        <View>
          <SectionHeader>Legal document</SectionHeader>
          <Card>
            {property?.documents && property?.documents?.length > 0 ? <FileListView>
             {property?.documents?.map(({name, link}, index) => (
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
            <FileUploader project_id={property?.id ?? 0} />
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