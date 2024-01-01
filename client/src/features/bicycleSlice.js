import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchAllBicycles = createAsyncThunk('bicycles/fetchAll', async () => {
  const response = await fetch('http://localhost:4000/api/bicycles');
  const data = await response.json();
  return data;
});

export const createBicycleAsync = createAsyncThunk('bicycles/createBicycle', async (newBicycle) => {
  const response = await fetch('http://localhost:4000/api/bicycles', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newBicycle),
  });
  const data = await response.json();
  return data;
});


export const deleteBicycleAsync = createAsyncThunk('bicycles/deleteBicycle', async (id) => {
  await fetch(`http://localhost:4000/api/bicycles/${id}`, {
    method: 'DELETE',
  });
  return id;
});

export const updateBicycleAsync = createAsyncThunk('bicycles/updateBicycle', async (dto) => {
  await fetch(`http://localhost:4000/api/bicycles/status/${dto.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status: dto.status }),
  });
  return dto;
});

const bicycleSlice = createSlice({
  name: 'bicycles',
  initialState: { bicycles: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllBicycles.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllBicycles.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.bicycles = action.payload;
      })
      .addCase(fetchAllBicycles.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createBicycleAsync.fulfilled, (state, action) => {
        action.payload.id && state.bicycles.push(action.payload);
      })
      .addCase(deleteBicycleAsync.fulfilled, (state, action) => {
        state.bicycles = state.bicycles.filter((bike) => bike.id !== action.payload);
      })
      .addCase(updateBicycleAsync.fulfilled, (state, action) => {
        state.bicycles = state.bicycles.map((bike) =>
          bike.id === action.payload.id ? { ...bike, status:action.payload.status } : bike
        );
      });
  },
});

export default bicycleSlice.reducer;
