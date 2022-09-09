import { supabase } from './supabaseClient';

export const updateProfileBio = async (id, { bio }) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .update({ bio })
      .eq('id', id);

    if (error) throw error;

    console.log(data);
  } catch (err) {
    console.error(err);
  }
};
