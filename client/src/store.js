import { configureStore } from '@reduxjs/toolkit';
import bicycleReducer, { fetchAllBicycles } from './features/bicycleSlice';

const store = configureStore({
  reducer: {
    bicycles: bicycleReducer,
  },
});

store.dispatch(fetchAllBicycles());

export default store;
