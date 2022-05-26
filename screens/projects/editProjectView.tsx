import { HeaderBackButton } from "@react-navigation/elements";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import { ScrollView } from "react-native";
import { TextInput } from "../../components/input";
import CustomKeyboardAvoidingView from "../../components/keyboardAvoidingView";
import { useProjectNavigation } from "../../navigation/projects/hook";
import { ProjectNavigationScreen } from "../../navigation/projects/type";
import { heightPixel, widthPixel } from "../../util/pxToDpConvert";
import { Body, BottomView, FilledView, FormInputView, SubmitButton } from "./components";
import { useProjectLogic } from "./logic";

type Nav = NativeStackNavigationProp<ProjectNavigationScreen>;

export const EditProject: React.FC = () => {
  const {setOptions, goBack} = useNavigation<Nav>();
  const {params} = useProjectNavigation();
  const {
    detail,
    onDetailChange,
    editing,
    edit,
    canSubmit,
    errors,
  } = useProjectLogic(params?.id);

  useEffect(() => {
    setOptions({
      headerLeft: () => <HeaderBackButton
        label="Back"
        labelVisible={true}
        onPress={goBack}
      />,
      title: 'Edit Project'
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
        <Body style={{marginBottom: heightPixel(20)}}>Enter project information</Body>
        <CustomKeyboardAvoidingView>
          <FormInputView>
            <TextInput
              label="Project name"
              value={detail.name}
              onChangeText={value => onDetailChange('name', value)}
              error={getError('name')}
            />
          </FormInputView>
          <FormInputView>
            <TextInput
              label="Purpose / Use"
              value={detail.purpose}
              onChangeText={value => onDetailChange('purpose', value)}
              error={getError('purpose')}
            />
          </FormInputView>
          <FormInputView>
            <TextInput
              label="Total number of units on the development"
              value={detail.num_units as string}
              onChangeText={value => onDetailChange('num_units', value)}
              keyboardType='numeric'
              error={getError('num_units')}
            />
          </FormInputView>
          <FormInputView>
            <TextInput
              label="Project location"
              value={detail.address}
              onChangeText={value => onDetailChange('address', value)}
              error={getError('address')}
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
              label="Project description"
              multiline
              numberOfLines={4}
              value={detail.description}
              onChangeText={value => onDetailChange('description', value)}
              error={getError('description')}
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