export const getContacts = state => state.phonebook.contacts;
export const getFilter = state => state.phonebook.filter;
export const getFilteredContacts = state => {
    const contacts = getContacts(state);
    const normalizeFilter = getFilter(state).toLowerCase();
    return contacts.filter(contact => contact.name.toLowerCase().includes(normalizeFilter))

}