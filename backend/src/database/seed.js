import pool from '../config/database.js';

const sampleAgents = [
    {
        name: 'Sarah Johnson',
        photo_url: 'https://i.pravatar.cc/300?img=1',
        specialization: 'Residential',
        location_city: 'New York',
        location_state: 'NY',
        description: 'Experienced residential real estate agent with over 10 years in the NYC market. Specializes in luxury apartments and family homes.'
    },
    {
        name: 'Michael Chen',
        photo_url: 'https://i.pravatar.cc/300?img=12',
        specialization: 'Commercial',
        location_city: 'San Francisco',
        location_state: 'CA',
        description: 'Commercial real estate expert focusing on office spaces and retail properties in the Bay Area.'
    },
    {
        name: 'Emily Rodriguez',
        photo_url: 'https://i.pravatar.cc/300?img=5',
        specialization: 'Luxury',
        location_city: 'Los Angeles',
        location_state: 'CA',
        description: 'Luxury property specialist with a portfolio of high-end estates and celebrity homes in Southern California.'
    },
    {
        name: 'David Thompson',
        photo_url: 'https://i.pravatar.cc/300?img=13',
        specialization: 'Residential',
        location_city: 'Chicago',
        location_state: 'IL',
        description: 'Dedicated to helping first-time homebuyers find their dream homes in Chicago neighborhoods.'
    },
    {
        name: 'Jennifer Lee',
        photo_url: 'https://i.pravatar.cc/300?img=9',
        specialization: 'Investment',
        location_city: 'Miami',
        location_state: 'FL',
        description: 'Investment property specialist helping clients build wealth through real estate in South Florida.'
    },
    {
        name: 'Robert Martinez',
        photo_url: 'https://i.pravatar.cc/300?img=14',
        specialization: 'Commercial',
        location_city: 'Austin',
        location_state: 'TX',
        description: 'Commercial real estate broker specializing in tech office spaces and startup-friendly locations.'
    },
    {
        name: 'Amanda White',
        photo_url: 'https://i.pravatar.cc/300?img=10',
        specialization: 'Residential',
        location_city: 'Seattle',
        location_state: 'WA',
        description: 'Pacific Northwest real estate expert with a passion for eco-friendly and sustainable homes.'
    },
    {
        name: 'James Wilson',
        photo_url: 'https://i.pravatar.cc/300?img=15',
        specialization: 'Luxury',
        location_city: 'New York',
        location_state: 'NY',
        description: 'Elite luxury real estate agent with exclusive access to Manhattan penthouses and waterfront properties.'
    },
    {
        name: 'Lisa Anderson',
        photo_url: 'https://i.pravatar.cc/300?img=20',
        specialization: 'Residential',
        location_city: 'Boston',
        location_state: 'MA',
        description: 'Boston real estate professional specializing in historic homes and waterfront properties.'
    },
    {
        name: 'Christopher Brown',
        photo_url: 'https://i.pravatar.cc/300?img=33',
        specialization: 'Investment',
        location_city: 'San Francisco',
        location_state: 'CA',
        description: 'Real estate investment strategist helping clients maximize ROI in the competitive Bay Area market.'
    },
    {
        name: 'Michelle Davis',
        photo_url: 'https://i.pravatar.cc/300?img=23',
        specialization: 'Commercial',
        location_city: 'Los Angeles',
        location_state: 'CA',
        description: 'Expert in commercial leasing and sales with a focus on entertainment industry properties.'
    },
    {
        name: 'Daniel Garcia',
        photo_url: 'https://i.pravatar.cc/300?img=51',
        specialization: 'Residential',
        location_city: 'Denver',
        location_state: 'CO',
        description: 'Mountain living specialist helping clients find homes near ski resorts and outdoor recreation.'
    }
];

async function seedDatabase() {
    const client = await pool.connect();

    try {
        console.log('Starting database seed...');

        await client.query('BEGIN');

        // Clear existing data
        await client.query('TRUNCATE TABLE agents RESTART IDENTITY CASCADE');
        console.log('Cleared existing data');

        // Insert sample agents
        for (const agent of sampleAgents) {
            await client.query(
                `INSERT INTO agents (name, photo_url, specialization, location_city, location_state, description)
         VALUES ($1, $2, $3, $4, $5, $6)`,
                [agent.name, agent.photo_url, agent.specialization, agent.location_city, agent.location_state, agent.description]
            );
        }

        await client.query('COMMIT');

        console.log(`Successfully seed ${sampleAgents.length} agents`);

    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Error seeding database:', error);
        throw error;
    } finally {
        client.release();
        await pool.end();
    }
}

seedDatabase().then(() => process.exit(0)).catch(() => process.exit(1));
