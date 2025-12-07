import { z } from 'zod';
import agentRepository from '../repositories/agentRepository.js';

const createAgentSchema = z.object({
    name: z.string().min(1, 'Name is required').max(255),
    photo_url: z.string().url('Invalid photo URL').optional().or(z.literal('')),
    specialization: z.string().max(255).optional(),
    location_city: z.string().max(100).optional(),
    location_state: z.string().max(100).optional(),
    description: z.string().optional()
});

const searchAgentSchema = z.object({
    name: z.string().min(1, 'Name is required for search'),
    location_city: z.string().optional(),
    specialization: z.string().optional()
});

/**
 * Agent Service - Business Logic Layer
 * Handles validation and business rules
 */
class AgentService {
    /**
     * Create a new agent
     * @param {Object} agentData - Agent data to create
     * @returns {Promise<Object>} Created agent
     */
    async createAgent(agentData) {
        const validatedData = createAgentSchema.parse(agentData);
        const agent = await agentRepository.createAgent(validatedData);

        return agent;
    }

    /**
     * Get all agents
     * @returns {Promise<Array>} All agents
     */
    async getAllAgents() {
        const agents = await agentRepository.getAllAgents();
        return agents;
    }

    /**
     * Search agents with filters
     * @param {Object} searchParams - Search parameters
     * @returns {Promise<Array>} Matching agents
     */
    async searchAgents(searchParams) {
        const validatedParams = searchAgentSchema.parse(searchParams);
        const agents = await agentRepository.searchAgents(validatedParams);
        return agents;
    }

    /**
     * Get agent by ID
     * @param {number} id - Agent ID
     * @returns {Promise<Object>} Agent
     */
    async getAgentById(id) {
        const agent = await agentRepository.getAgentById(id);

        if (!agent) {
            throw new Error('Agent not found');
        }

        return agent;
    }
}

export default new AgentService();
