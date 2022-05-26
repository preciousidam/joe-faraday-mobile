import { HeaderBackButton } from "@react-navigation/elements";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import { ScrollView } from "react-native";
import { CurrencyInput } from "../../components/currentInput";
import DatePicker from "../../components/datepicker";
import { TextInput } from "../../components/input";
import CustomKeyboardAvoidingView from "../../components/keyboardAvoidingView";
import { useClientNavigation } from "../../navigation/clients/hook";
import { ClientNavigationScreen } from "../../navigation/clients/type";
import { heightPixel, widthPixel } from "../../util/pxToDpConvert";
import { Body, BottomView, FilledView, FormInputView, SubmitButton } from "./components";
import { useClientLogic } from "./logic";

type Nav = NativeStackNavigationProp<ClientNavigationScreen>;

export const EditClient: React.FC = () => {
  const {setOptions, goBack} = useNavigation<Nav>();
  const {params} = useClientNavigation();
  const {
    detail,
    onDetailChange,
    editing,
    edit,
    canSubmit,
    errors,
  } = useClientLogic(params?.id);

  useEffect(() => {
    setOptions({
      headerLeft: () => <HeaderBackButton
        label="Back"
        labelVisible={true}
        onPress={goBack}
      />,
      title: 'Edit client information'
    })
  }, []);

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
            <TextInput
              label="Full name"
              value={detail?.fullname}
              onChangeText={text => onDetailChange('fullname', text)}
            />
          </FormInputView>
          <FormInputView>
            <TextInput
              label="Email"
              value={detail?.email}
              onChangeText={text => onDetailChange('email', text)}
            />
          </FormInputView>
          <FormInputView>
            <TextInput
              label="Phone number"
              value={detail?.phone}
              onChangeText={text => onDetailChange('phone', text)}
            />
          </FormInputView>
          <FormInputView>
            <DatePicker
              label="Date of birth"
              value={detail?.date_of_birth ? new Date(detail?.date_of_birth) : new Date()}
              onChange={(e, date) => onDetailChange('date_of_birth', date?.toLocaleDateString())}
            />
          </FormInputView>
          <FormInputView>
            <TextInput
              label="Address"
              value={detail?.address}
              onChangeText={text => onDetailChange('address', text)}
            />
          </FormInputView>
          <FormInputView>
            <TextInput
              label="City"
              value={detail.city}
              onChangeText={value => onDetailChange('city', value)}
            />
          </FormInputView>
          <FormInputView>
            <TextInput
              label="State"
              value={detail.state}
              onChangeText={value => onDetailChange('state', value)}
            />
          </FormInputView>
          <FormInputView>
            <TextInput
              label="Employment status"
              value={detail?.status}
              onChangeText={text => onDetailChange('status', text)}
            />
          </FormInputView>
          <FormInputView>
            <TextInput
              label="Job title"
              value={detail?.job_title}
              onChangeText={text => onDetailChange('job_title', text)}
            />
          </FormInputView>
          <FormInputView>
            <TextInput
              label="Business / Company name"
              value={detail?.company_name}
              onChangeText={text => onDetailChange('company_name', text)}
            />
          </FormInputView>
          <FormInputView>
            <TextInput
              label="Business / Company address"
              value={detail?.work_address}
              onChangeText={text => onDetailChange('work_address', text)}
            />
          </FormInputView>
          <FormInputView>
            <TextInput
              label="City"
              value={detail.work_city}
              onChangeText={value => onDetailChange('work_city', value)}
            />
          </FormInputView>
          <FormInputView>
            <TextInput
              label="State"
              value={detail.work_state}
              onChangeText={value => onDetailChange('work_state', value)}
            />
          </FormInputView>
        </CustomKeyboardAvoidingView>
      </ScrollView>
      <BottomView>
        <SubmitButton
          text="Submit"
          isLoading={editing}
          disabled={!canSubmit()}
          onPress={edit}
        />
      </BottomView>
    </FilledView>
  )
}