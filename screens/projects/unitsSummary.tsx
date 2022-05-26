import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Button } from '../../components/button';
import Dialog from '../../components/dialog';
import { UnitInfo } from '../../store/property/types';
import { heightPixel } from '../../util/pxToDpConvert';
import { Detail, LabelView, LargeHeader, SummaryLabel, SummaryView, UnitTextInput } from './components';
import { useProjectLogic } from './logic';

type IProp = {
  isNew: boolean;
  project_id: number;
}

const InitialValue: Array<UnitInfo> = [
  {prop_type: 'Detached house', amount: 0},
  {prop_type: 'Semi-detached house', amount: 0},
  {prop_type: 'Apartments', amount: 0},
  {prop_type: 'Maisonette', amount: 0},
  {prop_type: 'Others', amount: 0},
  {prop_type: 'Pent house', amount: 0},
  {prop_type: 'Terrace house', amount: 0}
]

export const UnitSummary: React.FC<IProp> = ({isNew, project_id}) => {
  const [visible, setVisible] = useState<boolean>(false);
  const hide = () => setVisible(false);
  const show = () => setVisible(true);
  const {detail: project, updateInfo, editing} = useProjectLogic(project_id);
  const [unitInfo, setUnitInfo] = useState<UnitInfo[]>(InitialValue);
  useEffect(() => {
    if(project?.unit_info){
      const present = project.unit_info.map(({prop_type}) => prop_type);
      const inits = InitialValue.filter(({prop_type}) => !present.includes(prop_type));
      const final: UnitInfo[] = [...project.unit_info, ...inits];
      setUnitInfo(final);
    }
  }, [project?.unit_info]);

  const handleChange = (key: typeof InitialValue[number]['prop_type'], value?: number) => {
    const others = unitInfo?.filter(({prop_type}) => prop_type !== key);
    setUnitInfo([...others, {prop_type: key, amount: value ?? 0}]);
  }

  const getValue = (key: typeof InitialValue[number]['prop_type']) => {
    const item = unitInfo?.find(({prop_type}) => prop_type === key);
    return String(item?.amount);
  }

  return (
    <>
      <Button text={isNew ? 'Add unit summary' : 'Edit unit summary'} onPress={show} style={{marginTop: heightPixel(10)}} />
      <Dialog
        visible={visible}
        onRequestClose={hide}
      >
        <ScrollView>
          <View>
            <SummaryView>
              <LargeHeader>Unit Type</LargeHeader>
              <LargeHeader>No. unit</LargeHeader>
            </SummaryView>
            <SummaryView grid={true}>
              <LabelView>
                <SummaryLabel>Detach house</SummaryLabel>
              </LabelView>
              <UnitTextInput
                keyboardType='number-pad'
                value={getValue('Detached house')}
                onChangeText={text => handleChange('Detached house', Number(text ?? '0'))}
              />
            </SummaryView>
            <SummaryView grid={true}>
              <LabelView>
                <SummaryLabel>Semi-Detach house</SummaryLabel>
              </LabelView>
              <UnitTextInput
                keyboardType='number-pad'
                value={getValue('Semi-detached house')}
                onChangeText={text => handleChange('Semi-detached house', Number(text ?? '0'))}
              />
            </SummaryView>
            <SummaryView grid={true}>
              <LabelView>
                <SummaryLabel>Apartment</SummaryLabel>
              </LabelView>
              <UnitTextInput
                keyboardType='number-pad'
                value={getValue('Apartments')}
                onChangeText={text => handleChange('Apartments', Number(text ?? '0'))}
              />
            </SummaryView>
            <SummaryView grid={true}>
              <LabelView>
                <SummaryLabel>Terrace house</SummaryLabel>
              </LabelView>
              <UnitTextInput
                keyboardType='number-pad'
                value={getValue('Terrace house')}
                onChangeText={text => handleChange('Terrace house', Number(text ?? '0'))}
              />
            </SummaryView>
            <SummaryView grid={true}>
              <LabelView>
                <SummaryLabel>Maisonette</SummaryLabel>
              </LabelView>
              <UnitTextInput
                keyboardType='number-pad'
                value={getValue('Maisonette')}
                onChangeText={text => handleChange('Maisonette', Number(text ?? '0'))}
              />
            </SummaryView>
            <SummaryView grid={true}>
              <LabelView>
                <SummaryLabel>Penthouse house</SummaryLabel>
              </LabelView>
              <UnitTextInput
                keyboardType='number-pad'
                value={getValue('Pent house')}
                onChangeText={text => handleChange('Pent house', Number(text ?? '0'))}
              />
            </SummaryView>
            <SummaryView grid={true}>
              <LabelView>
                <SummaryLabel>Others</SummaryLabel>
              </LabelView>
              <UnitTextInput
                keyboardType='number-pad'
                value={getValue('Others')}
                onChangeText={text => handleChange('Others', Number(text ?? '0'))}
              />
            </SummaryView>
          </View>
        </ScrollView>
        <Button
          isLoading={editing}
          text='Submit'
          onPress={() => updateInfo(unitInfo)}
          style={{marginTop: heightPixel(10)}}
        />
      </Dialog>
    </>
  )
}