import { useState } from 'react';
import { useUploadSingleFileMutation } from '~/features/Upload/uploadApi.service';

export const useUploadFile = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [upLoadFile] = useUploadSingleFileMutation();
  const upLoad = async (selectedFile: File) => {
    if (selectedFile) {
      setLoading(true);
      const formDataFormat = new FormData();
      formDataFormat.append('file', selectedFile);
      const res = await upLoadFile(formDataFormat).unwrap();
      if (res?.statusCode === 201) {
        setLoading(false);
        return res?.data?._id;
      } else {
        setLoading(false);
      }
    } else {
      console.log('Chưa chọn ảnh');
      return null;
    }
  };

  return { upLoad, loading };
};
