import { ReservationClient } from '../@types/Reservation';
import { axiosInstance } from '../client';

const ROUTE = 'reservation';

export const ReservationService: ReservationClient = {
  create: async ({ productId }) => {
    return await axiosInstance.post(`${ROUTE}/${productId}`);
  },
  cancel: async ({ reservationId }) => {
    return await axiosInstance.delete(`${ROUTE}/${reservationId}`);
  },
  approve: async request => {
    return await axiosInstance.patch(`${ROUTE}/approve`, {
      params: request,
    });
  },
  search: async request => {
    return await axiosInstance.get(`${ROUTE}/chats`, {
      params: request,
    });
  },
  declared: async request => {
    return await axiosInstance.post(`${ROUTE}/report`, request);
  },
  commonSearch: async request => {
    return await axiosInstance.get(`${ROUTE}/reservations`, {
      params: request,
    });
  },
  change: async request => {
    return await axiosInstance.patch(`${ROUTE}/status`, request);
  },
};
