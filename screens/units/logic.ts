import React, { useEffect, useState } from "react";
import { showMessage } from "react-native-flash-message";
import { useUnitNavigation } from "../../navigation/units/hook";
import { useAddUnitMutation, useEditUnitMutation, useFetchUnitQuery } from "../../store/unit/api";
import { UnitData, AgentData, Payment } from "../../store/Unit/types";
import { Error, ErrorResponse } from "../../store/type";
import { useAuth } from "../../store/hook";
import { baseUrl } from "../../baseUrl";
import { useAddPaymentMutation, useDeletePaymentMutation, useEditPaymentMutation } from "../../store/payment/api";

type State = UnitData & {
  city?: string;
  state?: string;
}

export const useUnitLogic = (id?: number) => {
  const [detail, setDetail] = useState<State>({} as State);
  const [addUnit, {isLoading}] = useAddUnitMutation();
  const [editUnit, {isLoading: editing}] = useEditUnitMutation();
  const [addPayment, {isLoading: addingPay}] = useAddPaymentMutation();
  const [editPayment, {isLoading: editingPay}] = useEditPaymentMutation();
  const [deletePayment, {}] = useDeletePaymentMutation();
  const {data: unit} = useFetchUnitQuery(id ?? 0, {pollingInterval: 1000});
  const [errors, setErrors] = useState<ErrorResponse>();
  const {pop} = useUnitNavigation();
  const {authentication_token, csrf_token} = useAuth();
  const [uploading, setUploading] = useState<boolean>(false);

  const onDetailChange = (key: keyof State, value?: string | number | boolean | Date) => {
    setDetail(prev => ({...prev, [key]: value}));
  }

  const onAgentInfoChange = (key: keyof AgentData, value: string | number) => {
    setDetail(prev => ({...prev, agent: {...prev?.agent, [key]: value}}))
  }

  useEffect(() => {
    if (unit){
      setDetail({
        ...unit,
      });
    }
  }, [unit]);

  const canSubmit = () => {
    if (isLoading || editing){
      return false;
    }
    if (Object.values(detail).length <= 0){
      return false;
    }

    if (!detail?.name || !detail?.amount  || Boolean(detail?.payment_plan)
      || !detail?.client_id || !detail?.property_id
    ){
      return false;
    }

    return true;
  }

  const submit = async () => {
    const {city, state, ...rest} = detail;

		let form: UnitData = {
			...rest,
		}
		try{
			const data = await addUnit(form).unwrap();
      showMessage({
        message: 'Success',
        description: "unit added successfully",
        hideOnPress: true,
        hideStatusBar: true,
        duration: 3000,
        type: 'success'
      });
      pop();
		}
		catch(err){
			const error = err as Error;
			setErrors(error?.data);
      showMessage({
        message: 'Error',
        description: error?.data?.message,
        hideOnPress: true,
        hideStatusBar: true,
        duration: 3000,
        type: 'danger'
      });
		}
	}

  const edit = async () => {
    const {city, state, ...rest} = detail;

		let form: UnitData = {
			...rest,
      id,
		}
		try{
			const data = await editUnit(form).unwrap();
      showMessage({
        message: 'Success',
        description: "unit updated successfully",
        hideOnPress: true,
        hideStatusBar: true,
        duration: 3000,
        type: 'success'
      });
      pop();
		}
		catch(err){
			const error = err as Error;
			setErrors(error?.data);
      showMessage({
        message: 'Error',
        description: error?.data?.message,
        hideOnPress: true,
        hideStatusBar: true,
        duration: 3000,
        type: 'danger'
      });
		}
	}

  const uploadFile = async (file: any, filename: string) => {
		setUploading(true);
		let body = new FormData();
		body.append('template', file, filename);
		body.append('fileName', filename);
		body.append('property_id', `${id}`);
		const headers = new Headers();
		headers.set('AUTHENTICATION-TOKEN', authentication_token ?? '');
        headers.set('XSRF-TOKEN', csrf_token??'');

		fetch(`${baseUrl}/templates/`, {
			body,
			method: 'POST',
			headers
		})
		.then((payload) => {
      setUploading(false);
			showMessage({
        message: 'Success',
        description: "File uploaded",
        hideOnPress: true,
        hideStatusBar: true,
        duration: 3000,
        type: 'success'
      });
      return true;
		})
		.catch((err) => {
      setUploading(false);
			console.log(err);
      showMessage({
        message: 'Error',
        description: 'Something happened',
        hideOnPress: true,
        hideStatusBar: true,
        duration: 3000,
        type: 'danger'
      });
      return false;
		});
	}

  const addingPayment = ({unit_id, amount, due_date}: {amount: number; due_date: Date, unit_id: number}) => {
    addPayment({unit_id, amount, due_date}).unwrap()
    .then((data) => {
      showMessage({
        message: 'Success',
        description: "Payment added!",
        hideOnPress: true,
        hideStatusBar: true,
        duration: 3000,
        type: 'success'
      });
    })
    .catch((err) => {
      console.log(err);
      showMessage({
        message: 'Error',
        description: err?.data?.message,
        hideOnPress: true,
        hideStatusBar: true,
        duration: 3000,
        type: 'danger'
      });
    });
  }
  const editingPayment = ({id, unit_id, amount, due_date, status_value, ...rest}: Payment) => {
    editPayment({id, unit_id, amount: amount, due_date, status_value, ...rest}).unwrap()
    .then((data) => {
      showMessage({
        message: 'Success',
        description: "Payment updated!",
        hideOnPress: true,
        hideStatusBar: true,
        duration: 3000,
        type: 'success'
      });
    })
    .catch((err) => {
      console.log(err);
      showMessage({
        message: 'Error',
        description: 'Something happened',
        hideOnPress: true,
        hideStatusBar: true,
        duration: 3000,
        type: 'danger'
      });
    })
  }

  const delPayment = async (id: number, reason: string) => {
    try {
      const data = await deletePayment({id, reason}).unwrap();
      showMessage({
        message: 'Success',
        description: "Payment deleted!",
        hideOnPress: true,
        hideStatusBar: true,
        duration: 3000,
        type: 'success'
      });
    }
    catch(err){
      console.log(err);
      showMessage({
        message: 'Error',
        description: 'Something happened',
        hideOnPress: true,
        hideStatusBar: true,
        duration: 3000,
        type: 'danger'
      });
    }
  }

  return {
    detail,
    onDetailChange,
    submit,
    loading: isLoading,
    canSubmit,
    errors,
    edit,
    editing,
    onAgentInfoChange,
    uploadFile,
    uploading,
    editingPayment,
    addingPayment,
    addingPay,
    editingPay,
    delPayment
  }
}