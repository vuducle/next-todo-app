import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import todoReducer from './features/todoSlice';
import themeReducer from './features/themeSlice';

/**
 * Configuration for redux-persist to use local storage.
 */
const persistConfig = {
  key: 'root',
  storage,
};
/**
 * Combine multiple reducers into a root reducer.
 */
const rootReducer = combineReducers({
  todos: todoReducer,
  theme: themeReducer,
});
/**
 * Create a persisted reducer using redux-persist.
 */
const persistedReducer = persistReducer(persistConfig, rootReducer);

/**
 * Create and configure the Redux store with persisted reducer and middleware.
 */
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);
