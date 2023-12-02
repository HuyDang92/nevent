import { useState } from 'react';
import { errorNotify } from '~/components/customs/Toast';
import { useUploadSingleFileMutation } from '~/features/Upload/uploadApi.service';

const MAX_FILE_SIZE_MB = 1;

export const useUploadDesc = () => {
  const [loadingDesc, setLoadingDesc] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [upLoadFile] = useUploadSingleFileMutation();

  const upLoadDesc = async (selectedFile: File) => {
    if (!selectedFile) {
      console.log('Chưa chọn ảnh');
      return null;
    }

    // Check if the file size exceeds the limit

    setLoadingDesc(true);

    const formDataFormat = new FormData();
    formDataFormat.append('file', selectedFile);

    try {
      const res = await upLoadFile(formDataFormat).unwrap();
      if (res?.statusCode === 201) {
        setLoadingDesc(false);
        setError(false);
        return res?.data?.url;
      } else {
        setLoadingDesc(false);
        setError(true);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      setLoadingDesc(false);
      setError(true);
      return null;
    }
  };

  return { upLoadDesc, loadingDesc, error };
};
