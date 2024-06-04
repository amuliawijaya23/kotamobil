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
  linkedIn?: string;
  tiktok?: string;
}

interface ContactsState {
  data: ContactData[] | null;
  selectedContacts: string[];
}

const initialState: ContactsState = {
  data: null,
  selectedContacts: [],
};

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    setContactsData: (state, action: PayloadAction<ContactData[]>) => {
      state.data = action.payload;
    },
    addContact: (state, action: PayloadAction<ContactData>) => {
      state.data?.unshift(action.payload);
    },
    updateContact: (state, action: PayloadAction<ContactData>) => {
      if (state.data) {
        const index = state.data?.findIndex(
          (contact) => contact._id === action.payload._id,
        );

        if (index !== -1) {
          state.data[index] = action.payload;
        }
      }
    },
    removeContacts: (state, action: PayloadAction<string[]>) => {
      if (state.data) {
        state.data = state.data.filter(
          (contact) => !action.payload.includes(contact._id),
        );
        state.selectedContacts = state.selectedContacts.filter(
          (id) => !action.payload.includes(id),
        );
      }
    },
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
    resetContacts: () => initialState,
  },
});

export const {
  setContactsData,
  setSelectedContacts,
  setSelectAllContacts,
  updateContact,
  addContact,
  removeContacts,
  resetContacts,
} = contactsSlice.actions;
export const getContactsData = (state: RootState) => state.contacts.data;
export const getSelectedContacts = (state: RootState) =>
  state.contacts.selectedContacts;
export default contactsSlice.reducer;
