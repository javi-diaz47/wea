const handleSupabaseError = ({ error, ...rest }) => {
  if (error) {
    throw error;
  }
  return rest;
};

export { handleSupabaseError };
