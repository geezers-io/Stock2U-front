import { FileClient } from '@/api/@types/File';
import { axiosInstance } from '@/api/client';

const ROUTE = 'file';

export const FileService: FileClient = {
  uploadFile: async request => {
    return await axiosInstance.post(
      `${ROUTE}`,
      {
        FormData: request,
      },
      { headers: { 'Content-Type': 'multipart/form-data' } },
    ); // FIXME: formdata 로 보내야 함
  },
  removeFile: async request => {
    return await axiosInstance.delete(`${ROUTE}`, {
      params: request,
    });
  },
};
