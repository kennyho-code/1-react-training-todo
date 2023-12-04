import { readFileSync } from 'fs';

export function getBackGroundColorFromDB() {
  const file = readFileSync('./db.json', 'utf-8');
  console.log('file', file);
}
