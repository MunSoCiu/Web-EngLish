const { Client } = require('pg');

const client = new Client({
  connectionString:
    'postgresql://postgres.yfswqwfjjuaicexwjrfk:supabase1231@aws-1-ap-southeast-1.pooler.supabase.com:6543/postgres',
  ssl: { rejectUnauthorized: false },
});

client
  .connect()
  .then(() => {
    console.log('✅ Connected via Supabase Session Pooler');
    return client.end();
  })
  .catch((err) => {
    console.error('❌ Connection failed');
    console.error(err);
  });
