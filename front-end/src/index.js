import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react';
import authReducer from './state';
import LoadingFallback from './components/LoadingFallback';
import ErrorBoundary from './components/ErrorBoundary';

// Lazy load App component
const App = lazy(() => import('./App'));

// Redux store configuration
const persistConfig = {
  key: 'root',
  storage,
  version: 1,
  whitelist: ['auth'], // Only persist auth state
  blacklist: ['posts'], // Don't persist posts state
};

const persistedReducer = persistReducer(persistConfig, authReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
      immutableCheck: { warnAfter: 128 }, // Optimize immutable checks
    }),
  devTools: process.env.NODE_ENV !== 'production', // Only enable in development
});

const persistor = persistStore(store);

// Root component with error boundary and suspense
const Root = () => (
  <ErrorBoundary>
    <Provider store={store}>
      <PersistGate loading={<LoadingFallback />} persistor={persistor}>
        <Suspense fallback={<LoadingFallback />}>
          <App />
        </Suspense>
      </PersistGate>
    </Provider>
  </ErrorBoundary>
);

// Render with React 18 concurrent features
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
