import pool from '../config/database.js';

/**
 * Agent Repository - Data Access Layer
 * Handles all database operations for agents
 */
class AgentRepository {
    /**
     * Create a new agent
     * @param {Object} agent - Agent data
     * @returns {Promise<Object>} Created agent with ID
     */
    async createAgent(agent) {
        const query = `
      INSERT INTO agents (name, photo_url, specialization, location_city, location_state, description)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `;

        const values = [
            agent.name,
            agent.photo_url || null,
            agent.specialization || null,
            agent.location_city || null,
            agent.location_state || null,
            agent.description || null
        ];

        const result = await pool.query(query, values);
        return result.rows[0];
    }

    /**
     * Get all agents
     * @returns {Promise<Array>} List of all agents
     */
    async getAllAgents() {
        const query = `
      SELECT * FROM agents
      ORDER BY created_at DESC
    `;

        const result = await pool.query(query);
        return result.rows;
    }

    /**
     * Search agents by criteria
     * @param {Object} params - Search parameters
     * @param {string} params.name - Agent name (required)
     * @param {string} params.location_city - City filter (optional)
     * @param {string} params.specialization - Specialization filter (optional)
     * @returns {Promise<Array>} Matching agents
     */
    async searchAgents(params) {
        let query = `SELECT * FROM agents WHERE 1=1`;
        const values = [];
        let paramIndex = 1;

        // Name search (case-insensitive partial match)
        if (params.name) {
            query += ` AND LOWER(name) LIKE LOWER($${paramIndex})`;
            values.push(`%${params.name}%`);
            paramIndex++;
        }

        // Location city filter (case-insensitive exact match)
        if (params.location_city) {
            query += ` AND LOWER(location_city) = LOWER($${paramIndex})`;
            values.push(params.location_city);
            paramIndex++;
        }

        // Specialization filter (case-insensitive exact match)
        if (params.specialization) {
            query += ` AND LOWER(specialization) = LOWER($${paramIndex})`;
            values.push(params.specialization);
            paramIndex++;
        }

        query += ` ORDER BY created_at DESC`;

        const result = await pool.query(query, values);
        return result.rows;
    }

    /**
     * Get agent by ID
     * @param {number} id - Agent ID
     * @returns {Promise<Object|null>} Agent or null if not found
     */
    async getAgentById(id) {
        const query = `SELECT * FROM agents WHERE id = $1`;
        const result = await pool.query(query, [id]);
        return result.rows[0] || null;
    }
}

export default new AgentRepository();
