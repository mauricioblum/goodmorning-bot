import axios from 'axios';

interface GoodMorningResponse {
  id: string;
  phrase: string;
  description: string;
  flag: string;
}

export async function getGoodMorning(): Promise<GoodMorningResponse | null> {
  try {
    const response = await axios.get(`${process.env.API_URL}/getGoodMorning`);
    return response.data.goodMorning as GoodMorningResponse;
  } catch (err) {
    console.error(err);
    return null;
  }
}
