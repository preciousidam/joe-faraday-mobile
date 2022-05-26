import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Button } from '../../components/button';
import { CurrencyInput } from '../../components/currentInput';
import DatePicker from '../../components/datepicker';
import Dialog from '../../components/dialog';
import { TextInput } from '../../components/input';
import { UnitInfo } from '../../store/property/types';
import { heightPixel } from '../../util/pxToDpConvert';
import { Detail, FormInputView, LabelView, LargeHeader, SpaceContainer, SummaryLabel, SummaryView, UnitTextInput } from './components';
import { useUnitLogic } from './logic';

type IProp = {
  unit_id?: number;
  payment_id?: number;
}

type IState = {
  due_date: Date;
  amount: number
}

const InitialValue: IState = {
  due_date: new Date(),
  amount: 0
};

export const AddPayment: React.FC<IProp> = ({unit_id = -1}) => {
  const [visible, setVisible] = useState<boolean>(false);
  const hide = () => {
    setPaymentInfo(InitialValue);
    setVisible(false);
  }
  const show = () => setVisible(true);
  const {detail: unit, addingPay, editingPay, editingPayment, addingPayment} = useUnitLogic(unit_id);
  const [paymentInfo, setPaymentInfo] = useState<IState>(InitialValue);


  const handleChange = (key: keyof IState, value?: number | Date) => {
    setPaymentInfo(prev => ({...prev, [key]: value}));
  }

  const create = () => {
    addingPayment({unit_id, ...paymentInfo});
    hide();
  }


  return (
    <>
      {!visible && <Button text='Add payment' onPress={show} style={{marginTop: heightPixel(10)}} />}
      {visible && (
        <View style={{marginVertical: heightPixel(15)}}>
          <FormInputView>
            <DatePicker
              label='Due date'
              value={paymentInfo?.due_date}
              onChange={(e, date) => handleChange('due_date', date)}
            />
          </FormInputView>
          <FormInputView>
            <CurrencyInput
              label='Amount'
              value={paymentInfo?.amount?.toString()}
              onChange={text => handleChange('amount', Number(text))}
            />
          </FormInputView>
          <SpaceContainer>
            <Button text='Cancel' onPress={hide} style={{marginTop: heightPixel(10)}} variant='outlined' />
            <Button text='Submit' isLoading={addingPay} onPress={create} style={{marginTop: heightPixel(10)}} />
          </SpaceContainer>
        </View>
      )}
    </>
  )
}