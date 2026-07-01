const fs = require('fs');

const content = `export const environment = {
  supabaseUrl: '${process.env.supabaseUrl}',
  supabaseKey: '${process.env.supabaseKey}',
  password: '${process.env.password}'
};
`;
fs.mkdirSync('./src/environments', { recursive: true });
fs.writeFileSync('./src/environments/environment.ts', content);
console.log('environment.ts generado correctamente');