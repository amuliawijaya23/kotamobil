import { isAxiosError, CancelToken } from 'axios';
import { PayloadAction, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';
import {
  addContactService,
  deleteContactsservice,
  getContactsService,
  searchContactsService,
  updateContactService,
} from '~/services/contactServices';

export interface ContactData {
  _id: string;
  ownerId: string;
  firstName: string;
  lastName?: string;
  email?: string;
  mobile: string;
  address?: string;
  facebook?: string;
  instagram?: string;
  twitter?: string;
  linkedIn?: string;
  tiktok?: string;
}

interface ContactsState {
  data: ContactData[] | null;
  selectedContacts: string[];
  search: string;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  associatedBuyerIds: string[] | null;
  associatedVehicleIds: string[] | null;
}

interface DeleteRejectionPayload {
  message: string;
  associatedBuyerIds?: string[];
  associatedVehicleIds?: string[];
}

const initialState: ContactsState = {
  data: null,
  selectedContacts: [],
  search: '',
  status: 'idle',
  error: null,
  associatedBuyerIds: null,
  associatedVehicleIds: null,
};

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (formData: Partial<ContactData>, thunkAPI) => {
    try {
      const contact = await addContactService(formData);
      return contact;
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
      return thunkAPI.rejectWithValue({ message: 'An unknown error occured' });
    }
  },
);

export const updateContact = createAsyncThunk(
  'contacts/updateContact',
  async (
    { id, formData }: { id: string; formData: Partial<ContactData> },
    thunkAPI,
  ) => {
    try {
      const contact = await updateContactService(id, formData);
      return contact;
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
      return thunkAPI.rejectWithValue({ message: 'An unknown error occured' });
    }
  },
);

export const deleteContacts = createAsyncThunk<
  string[],
  string[],
  { rejectValue: DeleteRejectionPayload }
>('contacts/deleteContacts', async (contactIds: string[], thunkAPI) => {
  try {
    await deleteContactsservice(contactIds);
    return contactIds;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
    return thunkAPI.rejectWithValue({ message: 'An unknown error occured' });
  }
});

export const getContacts = createAsyncThunk(
  'contacts/getContacts',
  async (_, thunkAPI) => {
    try {
      const contacts = await getContactsService();
      return contacts;
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        return thunkAPI.rejectWithValue(error.response.data.message);
      }
      return thunkAPI.rejectWithValue('An unknown error occured');
    }
  },
);

export const searchContacts = createAsyncThunk(
  'contacts/searchContacts',
  async (
    { search, cancelToken }: { search: string; cancelToken: CancelToken },
    thunkAPI,
  ) => {
    try {
      const contacts = await searchContactsService(search, cancelToken);
      return contacts;
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        return thunkAPI.rejectWithValue(error.response.data.message);
      }
      return thunkAPI.rejectWithValue('An unknown error occured');
    }
  },
);

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    setSelectedContacts: (state, action: PayloadAction<string>) => {
      const selectedIndex = state.selectedContacts?.indexOf(action.payload);
      let newSelected: string[] = [];

      if (selectedIndex === -1) {
        newSelected = newSelected.concat(
          state.selectedContacts,
          action.payload,
        );
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(state.selectedContacts.slice(1));
      } else if (selectedIndex === state.selectedContacts.length - 1) {
        newSelected = newSelected.concat(state.selectedContacts.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          state.selectedContacts.slice(0, selectedIndex),
          state.selectedContacts.slice(selectedIndex + 1),
        );
      }
      state.selectedContacts = newSelected;
    },
    setSelectAllContacts: (state, action: PayloadAction<string[]>) => {
      state.selectedContacts = action.payload;
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    resetError: (state) => {
      state.status = 'succeeded';
      state.error = null;
      state.associatedBuyerIds = null;
      state.associatedVehicleIds = null;
    },
    resetContacts: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(addContact.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(
        addContact.fulfilled,
        (state, action: PayloadAction<ContactData>) => {
          state.status = 'succeeded';
          state.data?.unshift(action.payload);
        },
      )
      .addCase(addContact.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(updateContact.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(
        updateContact.fulfilled,
        (state, action: PayloadAction<ContactData | undefined>) => {
          state.status = 'succeeded';
          if (state.data && action.payload) {
            const index = state.data.findIndex(
              (contact) => contact._id === action.payload?._id,
            );
            if (index !== -1) {
              state.data[index] = action.payload;
              state.selectedContacts = [];
            }
          }
        },
      )
      .addCase(updateContact.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(deleteContacts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(
        deleteContacts.fulfilled,
        (state, action: PayloadAction<string[] | undefined>) => {
          state.status = 'succeeded';
          if (action.payload && state.data) {
            state.data = state.data.filter(
              (contact) => !action.payload?.includes(contact._id),
            );
            state.selectedContacts = state.selectedContacts.filter(
              (id) => !action.payload?.includes(id),
            );
          }
        },
      )
      .addCase(
        deleteContacts.rejected,
        (
          state,
          action: PayloadAction<
            | {
                message: string;
                associatedBuyerIds?: string[];
                associatedVehicleIds?: string[];
              }
            | undefined
          >,
        ) => {
          state.status = 'failed';
          if (action.payload) {
            state.error = action.payload.message as string;
            if (
              action.payload.associatedBuyerIds &&
              action.payload.associatedVehicleIds
            ) {
              state.associatedBuyerIds = action.payload.associatedBuyerIds;
              state.associatedVehicleIds = action.payload.associatedVehicleIds;
            }
          }
        },
      )
      .addCase(getContacts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(
        getContacts.fulfilled,
        (state, action: PayloadAction<ContactData[] | undefined>) => {
          state.status = 'succeeded';
          if (action.payload) {
            state.data = action.payload;
          }
        },
      )
      .addCase(getContacts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(searchContacts.pending, (state) => {
        state.status === 'loading';
      })
      .addCase(
        searchContacts.fulfilled,
        (state, action: PayloadAction<ContactData[] | undefined>) => {
          console.log('Hello', action.payload);
          state.status = 'succeeded';
          if (action.payload) {
            state.data = action.payload;
          }
        },
      );
  },
});

export const {
  setSelectedContacts,
  setSelectAllContacts,
  setSearch,
  resetError,
  resetContacts,
} = contactsSlice.actions;
export const getContactsData = (state: RootState) => state.contacts.data;
export const getSelectedContacts = (state: RootState) =>
  state.contacts.selectedContacts;
export const getContactsSearch = (state: RootState) => state.contacts.search;
export const getContactsStatus = (state: RootState) => state.contacts.status;
export const getContactsError = (state: RootState) => state.contacts.error;
export const getAssociatedBuyerIds = (state: RootState) =>
  state.contacts.associatedBuyerIds;
export const getAssociatedVehicleIds = (state: RootState) =>
  state.contacts.associatedVehicleIds;
export default contactsSlice.reducer;
