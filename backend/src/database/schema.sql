-- Real Estate Agents Database Schema

-- Create agents table
CREATE TABLE IF NOT EXISTS agents (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    photo_url VARCHAR(500),
    specialization VARCHAR(255),
    location_city VARCHAR(100),
    location_state VARCHAR(100),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for optimized search queries
CREATE INDEX IF NOT EXISTS idx_agents_name ON agents(name);
CREATE INDEX IF NOT EXISTS idx_agents_location_city ON agents(location_city);
CREATE INDEX IF NOT EXISTS idx_agents_specialization ON agents(specialization);
CREATE INDEX IF NOT EXISTS idx_agents_created_at ON agents(created_at DESC);

-- Create composite index for common search patterns
CREATE INDEX IF NOT EXISTS idx_agents_search ON agents(name, location_city, specialization);
