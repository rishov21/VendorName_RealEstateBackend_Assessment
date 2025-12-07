export default function AddAgentModal({
    isOpen,
    onClose,
    formData,
    onChange,
    onSubmit,
    loading,
    error,
    success
}) {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content modal-form" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>×</button>

                <div className="modal-body">
                    <h2 className="modal-name">Add New Agent</h2>

                    {success && (
                        <div className="success-message">
                            ✅ Agent created successfully! Refreshing list...
                        </div>
                    )}

                    {error && (
                        <div className="error-message">
                            ⚠️ {error}
                        </div>
                    )}

                    <form onSubmit={onSubmit} className="add-agent-form">
                        <div className="form-group">
                            <label htmlFor="add-name">
                                Name <span style={{ color: '#ef4444' }}>*</span>
                            </label>
                            <input
                                type="text"
                                id="add-name"
                                name="name"
                                placeholder="Agent's full name"
                                value={formData.name}
                                onChange={onChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="add-photo">Photo URL (Optional)</label>
                            <input
                                type="url"
                                id="add-photo"
                                name="photo_url"
                                placeholder="Image url (optional)"
                                value={formData.photo_url}
                                onChange={onChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="add-specialization">Specialization</label>
                            <input
                                type="text"
                                id="add-specialization"
                                name="specialization"
                                placeholder="e.g., Residential, Commercial, Luxury"
                                value={formData.specialization}
                                onChange={onChange}
                            />
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="add-city">City</label>
                                <input
                                    type="text"
                                    id="add-city"
                                    name="location_city"
                                    placeholder="e.g., New York"
                                    value={formData.location_city}
                                    onChange={onChange}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="add-state">State</label>
                                <input
                                    type="text"
                                    id="add-state"
                                    name="location_state"
                                    placeholder="e.g., NY"
                                    value={formData.location_state}
                                    onChange={onChange}
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="add-description">Description</label>
                            <textarea
                                id="add-description"
                                name="description"
                                placeholder="Tell us about this agent..."
                                value={formData.description}
                                onChange={onChange}
                                rows="4"
                            ></textarea>
                        </div>

                        <div className="form-actions">
                            <button
                                type="button"
                                className="cancel-button"
                                onClick={onClose}
                                disabled={loading}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="submit-button"
                                disabled={loading}
                            >
                                {loading ? 'Creating...' : 'Create Agent'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
