import agentService from '../services/agentService.js';

/**
 * Agent Controller - HTTP Request Handlers
 */
class AgentController {
    /**
     * POST /agents - Create a new agent
     */
    async createAgent(req, res, next) {
        try {
            const agent = await agentService.createAgent(req.body);

            res.status(201).json({
                success: true,
                data: agent,
                message: 'Agent created successfully'
            });
        } catch (error) {
            next(error);
        }
    }

    /**
     * GET /agents - Get all agents
     */
    async getAllAgents(req, res, next) {
        try {
            const agents = await agentService.getAllAgents();

            res.status(200).json({
                success: true,
                data: agents,
                count: agents.length
            });
        } catch (error) {
            next(error);
        }
    }

    /**
     * GET /agents/search - Search agents
     * Query parameters:
     *   - name (required): Agent name to search for
     *   - location_city (optional): Filter by city
     *   - specialization (optional): Filter by specialization
     */
    async searchAgents(req, res, next) {
        try {
            const searchParams = {
                name: req.query.name,
                location_city: req.query.location_city,
                specialization: req.query.specialization
            };

            Object.keys(searchParams).forEach(key =>
                searchParams[key] === undefined && delete searchParams[key]
            );

            const agents = await agentService.searchAgents(searchParams);

            res.status(200).json({
                success: true,
                data: agents,
                count: agents.length,
                filters: searchParams
            });
        } catch (error) {
            next(error);
        }
    }
}

export default new AgentController();
