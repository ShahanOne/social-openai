import { google } from 'googleapis';
import { promisify } from 'util';
import fs from 'fs';

const readFile = promisify(fs.readFile);

async function authorize() {
  const credentials = JSON.parse(
    await readFile('path/to/credentials.json', 'utf8')
  );

  const { client_email, private_key } = credentials;
  const auth = new google.auth.JWT(client_email, null, private_key, [
    'https://www.googleapis.com/auth/spreadsheets',
  ]);

  await auth.authorize();
  return auth;
}

export async function appendRow(spreadsheetId, range, values) {
  const auth = await authorize();
  const sheets = google.sheets({ version: 'v4', auth });
  const request = {
    spreadsheetId,
    range,
    valueInputOption: 'USER_ENTERED',
    insertDataOption: 'INSERT_ROWS',
    resource: {
      values,
    },
  };

  const response = await sheets.spreadsheets.values.append(request);
  return response;
}
