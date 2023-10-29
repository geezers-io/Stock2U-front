import { FileClient } from '@/api/@types/File';
import { axiosInstance } from '@/api/client';

const ROUTE = 'images';

export const FileService: FileClient = {
  upload: async request => {
    const formData = new FormData();

    for (const file of request.files) {
      formData.append('images', file);
    }

    return await axiosInstance.post(`${ROUTE}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  remove: async request => {
    return await axiosInstance.delete(`${ROUTE}`, {
      params: request,
    });
  },
};
