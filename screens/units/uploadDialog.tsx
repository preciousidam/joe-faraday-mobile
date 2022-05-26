import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import {getDocumentAsync} from 'expo-document-picker';
import { Button } from '../../components/button';
import Dialog from '../../components/dialog';
import { heightPixel } from '../../util/pxToDpConvert';
import { Body, Detail, ImagePreview, LabelView, LargeHeader, SummaryLabel, SummaryView, UnitTextInput } from './components';
import { useUnitLogic } from './logic';
import { TextInput } from '../../components/input';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { ImagePickerResult, launchImageLibraryAsync, MediaTypeOptions, ImageInfo } from 'expo-image-picker';
import { fetchBlob } from '../projects/logic';

type IProp = {
  project_id: number;
}

type Success = {
  type: 'success';
  name: string;
  size?: number | undefined;
  uri: string;
  mimeType?: string | undefined;
  lastModified?: number | undefined;
  file?: File | undefined;
  output?: FileList | null | undefined;
}

const isImage = (file?: Success | ImagePickerResult) : file is Success => {
  if (!file){
    return false;
  }
  return 'mimeType' in file;
}

export const FileUploader: React.FC<IProp> = ({project_id}) => {
  const [visible, setVisible] = useState<boolean>(false);
  const hide = () => setVisible(false);
  const show = () => setVisible(true);
  const {uploadFile, uploading } = useUnitLogic(project_id);
  const [selectedFile, setSelectedFile] = useState<Success | ImageInfo>();
  const [filename, setFilename] = useState<string>('');
  const {showActionSheetWithOptions} = useActionSheet();
  const options = ['Pictures', 'Documents', 'Cancel'];

  const openDocumentPicker = async () => {
    const result = await getDocumentAsync({copyToCacheDirectory: true});
    if(result.type === 'cancel'){
      return;
    }
    setSelectedFile(result);
  }

  const openImagePicker = async () => {
    const result = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
      aspect: [4,3]
    });

    if (!result.cancelled){
      setSelectedFile(result);
    }
  }

  const onSelect = (option?: number) => {
    if (option === 0){
      openImagePicker();
    }
    else if (option === 1){
      openDocumentPicker();
    }
  }

  const onClick = () => {
    showActionSheetWithOptions({
      options,
      cancelButtonIndex: 2,
      title: 'Select file',
      message: 'Select an option beblow to upload a file or select cancel to close this panel'
    }, (buttonIndex?: number) => {
      onSelect(buttonIndex);
    })
  }

  const onSubmit = async () => {
    const blob = await fetchBlob(selectedFile?.uri ?? '');
    uploadFile(blob, filename)
    .then(() => {
      hide();
    });
  }

  useEffect(() => {
    if(selectedFile){
      show();
    }
  }, [selectedFile]);

  return (
    <>
      <Button
        text="Upload a document"
        onPress={onClick}
        style={{marginTop: heightPixel(10)}}
      />
      <Dialog
        visible={visible}
        onRequestClose={hide}
      >
        <View>
          <>
            <ImagePreview
              source={!isImage(selectedFile) ? {uri: selectedFile?.uri} : require('../../assets/file_upload.png')}
              resizeMethod='resize'
            />
            <Body>Please enter a name to use in saving the selected file on the backend for easy identification</Body>
          </>
          <TextInput
            placeholder='File name'
            value={filename}
            onChangeText={text => setFilename(text)}
            style={{marginVertical: heightPixel(30)}}
          />
        </View>
        <Button
          isLoading={uploading}
          text='Save'
          onPress={onSubmit}
          style={{marginTop: heightPixel(10)}}
        />
      </Dialog>
    </>
  )
}