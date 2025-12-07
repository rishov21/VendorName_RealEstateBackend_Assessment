export default function SearchForm({
    formData,
    onChange,
    onSubmit,
    loading,
    searched,
    onShowAll,
    onAddAgent,
    resultsCount
}) {
    return (
        <section className="search-section">
            <div
                style={{
                    marginBottom: '2rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <h2>Search Agents</h2>
                <button className="add-agent-button" onClick={onAddAgent}>
                    + Add New Agent
                </button>
            </div>

            <form onSubmit={onSubmit} className="search-form">
                <div className="form-group">
                    <label htmlFor="name">
                        Agent Name <span style={{ color: '#ef4444' }}>*</span>
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="e.g., Sarah, John"
                        value={formData.name}
                        onChange={onChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="location_city">City (Optional)</label>
                    <input
                        type="text"
                        id="location_city"
                        name="location_city"
                        placeholder="e.g., New York, Los Angeles"
                        value={formData.location_city}
                        onChange={onChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="specialization">Specialization (Optional)</label>
                    <input
                        type="text"
                        id="specialization"
                        name="specialization"
                        placeholder="e.g., Residential, Commercial"
                        value={formData.specialization}
                        onChange={onChange}
                    />
                </div>

                <button
                    type="submit"
                    className="search-button"
                    disabled={loading}
                >
                    {loading ? 'Searching...' : 'Search Agents'}
                </button>
            </form>

            {/* Show All Button */}
            {searched && (
                <div style={{ marginTop: '1rem', textAlign: 'center' }}>
                    <button
                        onClick={onShowAll}
                        className="show-all-button"
                        disabled={loading}
                    >
                        Show All Agents
                    </button>
                </div>
            )}

            {/* Results Info */}
            {!loading && (
                <div className="results-section">
                    <h3>
                        {resultsCount === 0
                            ? searched ? 'No agents found' : 'No agents available'
                            : searched
                                ? `Found ${resultsCount} agent${resultsCount !== 1 ? 's' : ''}`
                                : `Showing all ${resultsCount} agent${resultsCount !== 1 ? 's' : ''}`
                        }
                    </h3>
                </div>
            )}
        </section>
    );
}
