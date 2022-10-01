import { supabase } from './supabaseClient';

const saveOffer = async (offer) => {
  try {
    const { data, error } = await supabase
      .from('offers')
      .insert([offer], { upsert: true });
    if (error) throw error;
    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
  }
};

export { saveOffer };
