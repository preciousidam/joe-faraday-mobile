import React, { useEffect, useState } from "react";
import { showMessage } from "react-native-flash-message";
import { baseUrl } from "../../baseUrl";
import { useProjectNavigation } from "../../navigation/projects/hook";
import { useAuth } from "../../store/hook";
import { useAddPropertyMutation, useDeletePropertyMutation, useEditPropertyMutation, useFetchPropertyQuery } from "../../store/property/api";
import { PropertyData, UnitInfo } from "../../store/property/types";
import { Error, ErrorResponse } from "../../store/type";

type State = PropertyData & {
  city?: string;
  state?: string;
}

export const fetchBlob = async (uri: string) => {
  const blob = await new Promise<any>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      reject(new TypeError('Network request failed'));
    };
    xhr.responseType = 'blob';
    xhr.open('GET', uri, true);
    xhr.send(null);
  });
  console.log(blob);
  return blob;
}

export const useProjectLogic = (id?: number) => {
  const [detail, setDetail] = useState<State>({} as State);
  const [addProperty, {isLoading}] = useAddPropertyMutation();
  const [editProperty, {isLoading: editing}] = useEditPropertyMutation();
  const [deleteProperty, {isLoading: deleting}] = useDeletePropertyMutation();
  const {data: project} = useFetchPropertyQuery(id ?? 0);
  const [errors, setErrors] = useState<ErrorResponse>();
  const {pop} = useProjectNavigation();
  const {authentication_token, csrf_token} = useAuth();
  const [uploading, setUploading] = useState<boolean>(false);

  const onDetailChange = (key: keyof State, value: string) => {
    setDetail(prev => ({...prev, [key]: value}));
  }

  useEffect(() => {
    if (project){
      let addr = project.address.split(',');
      setDetail({
        ...project,
        num_units: String(project.num_units),
        address: addr.slice(0, addr.length - 2).join(','),
        city: addr[addr.length - 1],
        state: addr[addr.length - 2]
      });
    }
  }, [project]);

  const canSubmit = () => {
    if (isLoading || editing){
      return false;
    }
    if (Object.values(detail).length <= 0){
      return false;
    }

    if (!detail?.address || !detail?.num_units || !detail?.name){
      return false;
    }

    return true;
  }

  const delProperty = (reason: string) => {
    deleteProperty(id ?? -1).unwrap()
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
    const {city, state, ...rest} = detail;

		let form: PropertyData = {
			...rest,
      num_units: Number(detail.num_units),
			address: `${detail.address}, ${detail.city ?? ''}, ${detail.state ?? ''}`,
		}
		try{
			const data = await addProperty(form).unwrap();
      showMessage({
        message: 'Success',
        description: "Project added successfully",
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

  const updateInfo = async (info: UnitInfo[]) => {
    const {city, state, ...rest} = detail;
    const toSend = info.filter(({amount}) => amount !== 0);

		let form: PropertyData = {
			...rest,
      id,
      num_units: Number(detail.num_units),
			address: `${detail.address}, ${detail.city ?? ''}, ${detail.state ?? ''}`,
      unit_info_submit: toSend
		}
		try{
			const data = await editProperty(form).unwrap();
      showMessage({
        message: 'Success',
        description: "Project updated successfully",
        hideOnPress: true,
        hideStatusBar: true,
        duration: 3000,
        type: 'success'
      });
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

		let form: PropertyData = {
			...rest,
      id,
      num_units: Number(detail.num_units),
			address: `${detail.address}, ${detail.city ?? ''}, ${detail.state ?? ''}`,
		}
		try{
			const data = await editProperty(form).unwrap();
      showMessage({
        message: 'Success',
        description: "Project updated successfully",
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

  return {
    detail,
    onDetailChange,
    submit,
    loading: isLoading,
    canSubmit,
    errors,
    edit,
    editing,
    uploading,
    delProperty,
    updateInfo,
    uploadFile
  }
}