import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pool from '../config/database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function initializeDatabase() {
    try {
        console.log('Initializing database (fresh setup)...');

        // Drop existing tables first for fresh setup
        console.log('Dropping existing tables...');
        await pool.query('DROP TABLE IF EXISTS agents CASCADE');
        console.log('Existing tables dropped');

        const schemaPath = path.join(__dirname, 'schema.sql');
        const schema = fs.readFileSync(schemaPath, 'utf8');

        console.log('Creating new tables and indexes...');
        const queries = schema.split(';').filter(q => q.trim() !== '');
        for (const query of queries) {
            await pool.query(query);
        }

        console.log('Database schema created successfully!');
        console.log(`Executed ${queries.length} queries`);
        console.log('Database is now fresh and ready!');

        process.exit(0);
    } catch (error) {
        console.error('Error initializing database:', error);
        process.exit(1);
    }
}

initializeDatabase();
