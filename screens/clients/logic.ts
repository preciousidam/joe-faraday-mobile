import React, { useEffect, useState } from "react";
import { showMessage } from "react-native-flash-message";
import { useAddClientMutation, useEditClientMutation, useFetchClientQuery, useDeleteClientMutation } from "../../store/client/api";
import { Error, ErrorResponse } from "../../store/type";
import { useClientNavigation } from "../../navigation/clients/hook";
import { ClientData } from "../../store/client/types";

type State = ClientData & {
  city?: string;
  state?: string;
  work_city?: string;
  work_state?: string;
}


export const useClientLogic = (id?: number) => {
  const [detail, setDetail] = useState<State>({} as State);
  const [addClient, {isLoading}] = useAddClientMutation();
  const [editClient, {isLoading: editing}] = useEditClientMutation();
  const [deleteClient, {isLoading: deleting}] = useDeleteClientMutation();
  const {data: client} = useFetchClientQuery(id ?? 0);
  const [errors, setErrors] = useState<ErrorResponse>();
  const {pop} = useClientNavigation();

  const onDetailChange = (key: keyof State, value?: string | number | boolean | Date) => {
    setDetail(prev => ({...prev, [key]: value}));
  }

  useEffect(() => {
    if (client){
      let addr = client.address.split(',');
      let wAddr = client.work_address.split(',');
      setDetail({
        ...client,
        address: addr.slice(0, addr.length - 2).join(','),
        city: addr[addr.length - 1],
        state: addr[addr.length - 2],
        work_address: wAddr.slice(0, addr.length - 2).join(','),
        work_city: wAddr[addr.length - 1],
        work_state: wAddr[addr.length - 2]
      });
    }
  }, [client]);

  const canSubmit = () => {
    if (isLoading || editing){
      return false;
    }
    if (Object.values(detail).length <= 0){
      return false;
    }

    if (!detail?.fullname || !detail?.email  || !detail?.phone
      || !detail?.address || !detail?.status
    ){
      return false;
    }

    return true;
  }

  const delClient = (reason: string) => {
    deleteClient({id, reason}).unwrap()
    .then(() => {
      showMessage({
        message: 'Success',
        description: "unit added successfully",
        hideOnPress: true,
        hideStatusBar: true,
        duration: 3000,
        type: 'success'
      });
    })
    .catch((err) => {
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
    })
  }

  const submit = async () => {
    const {city, state, work_city, work_state, ...rest} = detail;

		let form: ClientData = {
			...rest,
      address: `${detail.address}, ${city ?? ''}, ${state ?? ''}`,
      work_address: `${detail.address}, ${work_city}, ${work_state}`
		}
		try{
			const data = await addClient(form).unwrap();
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
    const {city, state, work_city, work_state, ...rest} = detail;

		let form: ClientData = {
			...rest,
      id,
      address: `${detail.address}, ${city ?? ''}, ${state ?? ''}`,
      work_address: `${detail.address}, ${work_city}, ${work_state}`
		}
		try{
			const data = await editClient(form).unwrap();
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

  return {
    detail,
    onDetailChange,
    submit,
    loading: isLoading,
    canSubmit,
    errors,
    edit,
    editing,
    delClient
  }
}