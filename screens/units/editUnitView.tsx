import { HeaderBackButton } from "@react-navigation/elements";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import { ScrollView } from "react-native";
import { CurrencyInput } from "../../components/currentInput";
import { TextInput } from "../../components/input";
import CustomKeyboardAvoidingView from "../../components/keyboardAvoidingView";
import { ProjectNavigationScreen } from "../../navigation/projects/type";
import { useUnitNavigation } from "../../navigation/units/hook";
import { heightPixel, widthPixel } from "../../util/pxToDpConvert";
import { Body, BottomView, FilledView, FormInputView, SubmitButton } from "./components";
import ClientSelect from "./dropdown/client";
import PropertySelect from "./dropdown/property";
import SalesRepSelect from "./dropdown/saleRep";
import UnitTypeSelect from "./dropdown/unit";
import { useUnitLogic } from "./logic";
import { PlanDetail } from "./planDetail";

type Nav = NativeStackNavigationProp<ProjectNavigationScreen>;

export const EditUnit: React.FC = () => {
  const {setOptions, goBack} = useNavigation<Nav>();
  const {params} = useUnitNavigation();
  const {
    detail,
    onDetailChange,
    loading,
    edit,
    canSubmit,
    errors,
    onAgentInfoChange
  } = useUnitLogic(params?.id);

  useEffect(() => {
    setOptions({
      headerLeft: () => <HeaderBackButton
        label="Back"
        labelVisible={true}
        onPress={goBack}
      />,
      title: `Edit ${detail?.name}`
    })
  }, [detail?.name]);

  const getError = (key:string) => {
		if (errors?.errors && errors.errors[key]){
			return errors.errors[key][0];
		}
	}

  return (
    <FilledView>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: widthPixel(15),
          paddingVertical: heightPixel(20)
        }}
      >
        <Body style={{marginBottom: heightPixel(20)}}>Enter unit information</Body>
        <CustomKeyboardAvoidingView>
          <FormInputView>
            <ClientSelect
              label="Client name"
              selectedValue={detail?.client_id}
              onValueChange={(item, index) => onDetailChange('client_id', item)}
            />
          </FormInputView>
          <FormInputView>
            <PropertySelect
              label={'Project name'}
              selectedValue={detail?.property_id}
              onValueChange={(item, index) => onDetailChange('property_id', item)}
            />
          </FormInputView>
          <FormInputView>
            <TextInput
              label="Unit name / Flat number"
              value={detail?.name}
              onChangeText={text => onDetailChange('name', text)}
            />
          </FormInputView>
          <FormInputView>
            <UnitTypeSelect
              label="Unit type"
              selectedValue={detail?.type}
              onValueChange={(item, index) => onDetailChange('type', item)}
            />
          </FormInputView>
          <FormInputView>
            <CurrencyInput
              label="Agreed sale price"
              value={detail?.amount?.toString()}
              onChange={text => onDetailChange('amount', text)}
            />
          </FormInputView>
          <PlanDetail />
          <FormInputView>
            <SalesRepSelect
              label="Cortt's sale rep"
              selectedValue={detail?.sales_rep}
              onValueChange={(item, index) => onDetailChange('sales_rep', item)}
            />
          </FormInputView>
          <FormInputView>
            <TextInput
              label="Agent name"
              value={detail?.agent?.fullname}
              onChangeText={text => onAgentInfoChange('fullname', text)}
            />
          </FormInputView>
          <FormInputView>
            <TextInput
              label="Agent email address"
              value={detail?.agent?.email}
              onChangeText={text => onAgentInfoChange('email', text)}
            />
          </FormInputView>
          <FormInputView>
            <TextInput
              label="Agent phone number"
              value={detail?.agent?.phone}
              onChangeText={text => onAgentInfoChange('phone', text)}
            />
          </FormInputView>
          <FormInputView>
            <TextInput
              label="Project description"
              multiline
              numberOfLines={4}
              error={getError('description')}
              value={detail?.comments}
              onChangeText={text => onDetailChange('comments', text)}
            />
          </FormInputView>
        </CustomKeyboardAvoidingView>
      </ScrollView>
      <BottomView>
        <SubmitButton
          text="Update"
          isLoading={loading}
          disabled={!canSubmit()}
          onPress={edit}
        />
      </BottomView>
    </FilledView>
  )
}