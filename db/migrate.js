require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const fs = require('fs');
const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.PG_HOST,
  port: parseInt(process.env.PG_PORT || '5432'),
  database: 'postgres', // 先连默认库
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
});

async function migrate() {
  const client = await pool.connect();

  try {
    // 创建数据库（如果不存在）
    const dbName = process.env.PG_DATABASE || 'daixiangyin';
    const dbCheck = await client.query(
      `SELECT 1 FROM pg_database WHERE datname = $1`, [dbName]
    );
    if (dbCheck.rows.length === 0) {
      await client.query(`CREATE DATABASE ${dbName}`);
      console.log(`✓ 数据库 ${dbName} 创建成功`);
    } else {
      console.log(`ℹ 数据库 ${dbName} 已存在`);
    }

    // 切换到目标数据库执行 schema
    client.release();
    const targetPool = new Pool({
      ...pool.options,
      database: dbName,
    });
    const targetClient = await targetPool.connect();

    const schema = fs.readFileSync(__dirname + '/schema.sql', 'utf8');
    await targetClient.query(schema);
    console.log('✓ Schema 迁移完成');
    console.log('  表: users, addresses, designs, orders, coupons, payment_logs');

    targetClient.release();
    await targetPool.end();
  } catch (err) {
    console.error('迁移失败:', err.message);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

migrate();
