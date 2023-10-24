import { FileClient } from '@/api/@types/File';
import { axiosInstance } from '@/api/client';

const ROUTE = 'file';

export const FileService: FileClient = {
  uploadFile: async request => {
    const formData = new FormData();

    for (const file of request.files) {
      formData.append('images', file);
    }

    return await axiosInstance.post(`${ROUTE}/images`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  removeFile: async request => {
    return await axiosInstance.delete(`${ROUTE}`, {
      params: request,
    });
  },
};
