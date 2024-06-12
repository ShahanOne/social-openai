import { appendRow } from '@/lib/googleSheets';

export default async function handler(req, res) {
  const { prompt, post } = req.body;

  if (!prompt || !post) {
    return res.status(400).json({ error: 'Prompt and post are required' });
  }

  const timestamp = new Date().toISOString();
  const values = [[timestamp, prompt, post]];

  try {
    const response = await appendRow(
      'your-spreadsheet-id',
      'Sheet1!A:C',
      values
    );
    res.status(200).json({ response });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
