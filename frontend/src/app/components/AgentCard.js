import { getAgentPhoto, DEFAULT_AVATAR } from '../constants';

export default function AgentCard({ agent, onViewDetails }) {
    return (
        <div className="agent-card">
            <img
                src={getAgentPhoto(agent.photo_url)}
                alt={agent.name}
                className="agent-photo"
                onError={(e) => { e.target.src = DEFAULT_AVATAR; }}
            />
            <div className="agent-info">
                <h3 className="agent-name">{agent.name}</h3>

                <div className="agent-meta">
                    {agent.specialization && (
                        <span className="badge badge-specialization">
                            {agent.specialization}
                        </span>
                    )}
                    {agent.location_city && (
                        <span className="badge badge-location">
                            📍 {agent.location_city}, {agent.location_state}
                        </span>
                    )}
                </div>

                {agent.description && (
                    <p className="agent-description">{agent.description}</p>
                )}

                <button
                    className="view-button"
                    onClick={() => onViewDetails(agent)}
                >
                    View Details
                </button>
            </div>
        </div>
    );
}
