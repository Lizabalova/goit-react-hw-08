import { createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import axios from "axios";
import { selectFilter } from "./selectors";

axios.defaults.baseURL = "https://666491c8932baf9032ab7d14.mockapi.io/";

export const fetchContacts = createAsyncThunk(
  "contacts/fetchAll",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/contacts");
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const addContact = createAsyncThunk(
  "contacts/addContact",
  async (newContact, thunkAPI) => {
    try {
      const response = await axios.post("/contacts", newContact);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  "contacts/deleteContact",
  async (contactId, thunkAPI) => {
    try {
      const response = await axios.delete(`/contacts/${contactId}`);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

const filterContacts = (contacts, filter) => {
  return contacts.items.filter((contact) =>
    contact.name.toLowerCase().includes(filter.name.toLowerCase())
  );
};

export const selectContact = (state) => state.contacts;
export const filteredContacts = createSelector(
  [selectContact, selectFilter],
  (contacts, filter) => filterContacts(contacts, filter)
);