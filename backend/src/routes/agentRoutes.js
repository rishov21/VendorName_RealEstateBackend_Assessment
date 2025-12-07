import express from 'express';
import agentController from '../controllers/agentController.js';

const router = express.Router();

/**
 * @route   POST /agents
 * @desc    Create a new agent
 * @access  Public
 */
router.post('/', (req, res, next) => agentController.createAgent(req, res, next));

/**
 * @route   GET /agents/search
 * @desc    Search agents by name, location, and specialization
 * @access  Public
 */
router.get('/search', (req, res, next) => agentController.searchAgents(req, res, next));

/**
 * @route   GET /agents
 * @desc    Get all agents
 * @access  Public
 */
router.get('/', (req, res, next) => agentController.getAllAgents(req, res, next));

export default router;
