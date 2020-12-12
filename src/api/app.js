import get from 'lodash/get';

export const uniqueValues = arr => [...new Set(uniqueValues)];

export const capitalizeFirstLetter = (string) =>  string.charAt(0).toUpperCase() + string.slice(1)

export const lsGet = key => {
  const item = localStorage.getItem(key);

  try {
    return JSON.parse(item);
  } catch (error) {
    return null;
  }
};

export const lsSet = (key, value) => localStorage.setItem(key, JSON.stringify(value));

export const statuses = [
  { id: 'all', name: 'ALL' },
  { id: 'new', name: 'NEW' },
  { id: 'hold', name: 'HOLD' },
  { id: 'ok', name: 'OK' },
  { id: 'cancelled', name: 'CANCELLED' }
];

export const roles = [
  "visitor", 
  "exhibitor", 
  "presenter", 
  "contestant",
  "contestant_person", 
  "contestant_company",
  "representative",
  "juror",
  "party",
  "service_external",
  "service_internal",
  "asset",
  "flag"];

export const rolesObject = roles.map(role => ({id: role, name: role}))
  
export const setActiveEvent = data => lsSet('activeEvent', data);
export const setActiveGroup = data => lsSet('activeGroup', data);
export const getActiveEvent = () => lsGet('activeEvent') || {};
export const getActiveGroup = () => lsGet('activeGroup') || {};

export const getEventName = () => "--deprecated--"
