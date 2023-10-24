import { useState } from 'react';
import { useUploadSingleFileMutation } from '~/features/Upload/uploadApi.service';

export const useUploadFile = () => {
  const [url, setUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [upLoadFile, resultUpload] = useUploadSingleFileMutation();
  const upLoad = async (selectedFile: File) => {
    if (selectedFile) {
      setLoading(true);
      const formDataFormat = new FormData();
      formDataFormat.append('file', selectedFile);
      const res = await upLoadFile(formDataFormat).unwrap();
      if (res?.statusCode === 201) {
        setUrl(res?.data?.url);
        setLoading(false);
      } else {
        setUrl(null);
        setLoading(false);
      }
    } else {
      console.log('Chưa chọn ảnh');
      return null;
    }
  };

  return { upLoad, url, loading };
};
