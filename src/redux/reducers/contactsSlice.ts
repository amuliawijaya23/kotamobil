import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface ContactData {
  ownerId: string;
  firstName: string;
  lastName?: string;
  email?: string;
  mobile: string;
  address?: string;
  facebook?: string;
  instagram?: string;
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
    resetContacts: () => initialState,
  },
});

export const { setContactsData, resetContacts } = contactsSlice.actions;
export const getContactsData = (state: RootState) => state.contacts.data;
export default contactsSlice.reducer;
