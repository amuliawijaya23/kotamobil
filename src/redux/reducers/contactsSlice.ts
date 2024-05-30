import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

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
  tiktok?: string;
}

interface ContactsState {
  data: [ContactData] | null;
}

const initialState: ContactsState = {
  data: null,
};

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    setContactsData: (state, action: PayloadAction<[ContactData]>) => {
      state.data = action.payload;
    },
    addContact: (state, action: PayloadAction<ContactData>) => {
      state.data?.unshift(action.payload);
    },
    resetContacts: () => initialState,
  },
});

export const { setContactsData, addContact, resetContacts } =
  contactsSlice.actions;
export const getContactsData = (state: RootState) => state.contacts.data;
export default contactsSlice.reducer;
