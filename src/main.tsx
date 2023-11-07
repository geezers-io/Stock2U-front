import ReactDOM from 'react-dom/client';
import App from './App';
import ErrorBoundary from '@/components/ErrorBoundary';
import { mswWorker } from '@/mocks/handler';

// 개발용
mswWorker.start();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>,
);
