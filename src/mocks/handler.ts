import { http, HttpResponse, RequestHandler } from 'msw';
import { setupWorker } from 'msw/browser';
import { createMockChatRoom } from '@/mocks/creator';

export const handlers: RequestHandler[] = [
  http.get('/reservation/chats', () => {
    const mock = {
      content: [...Array(50)].map(createMockChatRoom),
    };
    return HttpResponse.json(mock);
  }),
];

export const mswWorker = setupWorker(...handlers);
