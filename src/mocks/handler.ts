import { http, HttpResponse, RequestHandler } from 'msw';
import { setupWorker } from 'msw/browser';
import { createMockChatRoom } from '@/mocks/creator';

export const handlers: RequestHandler[] = [
  http.get('/reservation/chats', ({ request }) => {
    const url = new URL(request.url);
    const size = url.searchParams.get('size');
    const title = url.searchParams.get('title') || undefined;
    const mock = {
      content: [...Array(Number(size))].map(() => createMockChatRoom(title)),
      totalPages: 999,
      totalElements: 999,
      isFirstPage: false,
      isLastPage: false,
      currentPage: 0,
      empty: false,
    };
    return HttpResponse.json(mock);
  }),
];

export const mswWorker = setupWorker(...handlers);
