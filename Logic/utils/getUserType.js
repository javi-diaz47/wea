import { USER_TYPES } from './constants';

export const getUserType = (user_type_id) => {
  if (user_type_id == USER_TYPES.PERSON) return 'Persona';
  return 'Empresa';
};
