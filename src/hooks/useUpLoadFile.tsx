import { useState } from 'react';
import { errorNotify } from '~/components/customs/Toast';
import { useUploadSingleFileMutation } from '~/features/Upload/uploadApi.service';

const MAX_FILE_SIZE_MB = 1;

export const useUploadFile = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [upLoadFile] = useUploadSingleFileMutation();
  const [urlImg, setUrlImg] = useState<string | null>(null);

  const upLoad = async (selectedFile: File) => {
    if (!selectedFile) {
      console.log('Chưa chọn ảnh');
      return null;
    }

    // Check if the file size exceeds the limit
    if (selectedFile.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      errorNotify(`File vượt quá 1MB`);
      setError(true);
      return null;
    }

    setLoading(true);

    const formDataFormat = new FormData();
    formDataFormat.append('file', selectedFile);

    try {
      const res = await upLoadFile(formDataFormat).unwrap();
      if (res?.statusCode === 201) {
        setLoading(false);
        setError(false);
        setUrlImg(res?.data?.url);
        return res?.data?._id;
      } else {
        setLoading(false);
        setError(true);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      setLoading(false);
      setError(true);
      return null;
    }
  };

  return { upLoad, loading, error, urlImg };
};
