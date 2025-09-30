import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import {QueryClient, QueryClientProvider}  from '@tanstack/react-query';
import { App } from './App';
import { ThemeProvider } from './components/theme-provider';
import { TasksDataContextProvider } from './contexts/tasks-context';

const queryClient = new QueryClient();


('');
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <QueryClientProvider client={queryClient}>
        <TasksDataContextProvider>
          <App />
        </TasksDataContextProvider>
       </QueryClientProvider>
     </ThemeProvider>
  </StrictMode>,
);
