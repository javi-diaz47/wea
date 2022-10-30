export const getDateFormat = (date) => {
  const d = new Date(date);
  return ` 
    ${d.toLocaleDateString('es', { month: 'short' })} ${d.toLocaleDateString(
    'es',
    { day: 'numeric' }
  )}`;
};
