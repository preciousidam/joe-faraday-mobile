import { useTheme } from "@react-navigation/native";
import React from "react";
import { Switch } from "react-native";
import { CurrencyInput } from "../../components/currentInput";
import DatePicker from "../../components/datepicker";
import { TextInput } from "../../components/input";
import { Body, FormInputView, SpaceContainer } from "./components";
import { useUnitLogic } from "./logic";

export const PlanDetail: React.FC = () => {
  const {
    detail,
    onDetailChange
  } = useUnitLogic();
  const {colors} = useTheme();

  return (
    <>
      <SpaceContainer>
        <Body>Use payment plan?</Body>
        <Switch
          value={detail?.payment_plan}
          ios_backgroundColor="#3e3e3e"
          onValueChange={value => onDetailChange('payment_plan', value)}
          trackColor={{ false: colors.border, true: "#99D8FF" }}
          thumbColor={detail?.payment_plan ? colors.primary : "#f4f3f4"}
        />
      </SpaceContainer>
      {detail?.payment_plan && (<>
        <FormInputView>
          <DatePicker
            label="Initial payment date"
            value={detail?.purchase_date ?? new Date()}
            onChange={(e, date) => onDetailChange('purchase_date', date)}
          />
        </FormInputView>
        <FormInputView>
          <CurrencyInput
            label="Initial payment"
            value={detail?.initial_payment?.toString()}
            onChange={text => onDetailChange('initial_payment', text)}
          />
        </FormInputView>
        <FormInputView>
          <TextInput
            label="Number of installments"
            value={detail?.installment?.toString()}
            onChangeText={text => onDetailChange('installment', text)}
          />
        </FormInputView>
      </>)}
    </>
  )
}