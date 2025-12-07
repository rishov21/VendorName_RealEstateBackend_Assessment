import { getAgentPhoto, DEFAULT_AVATAR } from '../constants';

export default function AgentModal({ agent, onClose }) {
    if (!agent) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>×</button>

                <div className="modal-body">
                    <img
                        src={getAgentPhoto(agent.photo_url)}
                        alt={agent.name}
                        className="modal-photo"
                        onError={(e) => { e.target.src = DEFAULT_AVATAR; }}
                    />

                    <div className="modal-info">
                        <h2 className="modal-name">{agent.name}</h2>

                        <div className="modal-meta">
                            {agent.specialization && (
                                <div className="modal-field">
                                    <strong>Specialization:</strong>
                                    <span className="badge badge-specialization">
                                        {agent.specialization}
                                    </span>
                                </div>
                            )}

                            {agent.location_city && (
                                <div className="modal-field">
                                    <strong>Location:</strong>
                                    <span className="badge badge-location">
                                        📍 {agent.location_city}, {agent.location_state}
                                    </span>
                                </div>
                            )}

                            {agent.created_at && (
                                <div className="modal-field">
                                    <strong>Member Since:</strong>
                                    <span>{new Date(agent.created_at).toLocaleDateString()}</span>
                                </div>
                            )}
                        </div>

                        {agent.description && (
                            <div className="modal-description">
                                <strong>About:</strong>
                                <p>{agent.description}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
