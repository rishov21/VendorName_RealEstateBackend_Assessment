'use client';

import { useState, useEffect } from 'react';
import { API_URL, DEFAULT_AVATAR } from './constants';
import AgentCard from './components/AgentCard';
import AgentModal from './components/AgentModal';
import AddAgentModal from './components/AddAgentModal';
import SearchForm from './components/SearchForm';

export default function Home() {
    const [formData, setFormData] = useState({
        name: '',
        location_city: '',
        specialization: ''
    });

    const [agents, setAgents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searched, setSearched] = useState(false);
    const [selectedAgent, setSelectedAgent] = useState(null);

    const [showAddForm, setShowAddForm] = useState(false);
    const [addFormData, setAddFormData] = useState({
        name: '',
        photo_url: '',
        specialization: '',
        location_city: '',
        location_state: '',
        description: ''
    });
    const [addFormLoading, setAddFormLoading] = useState(false);
    const [addFormError, setAddFormError] = useState(null);
    const [addFormSuccess, setAddFormSuccess] = useState(false);

    // Fetch all agents on initial load
    useEffect(() => {
        fetchAllAgents();
    }, []);

    const fetchAllAgents = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`${API_URL}/agents`);

            if (!response.ok) {
                throw new Error('Failed to fetch agents');
            }

            const data = await response.json();
            setAgents(data.data || []);
        } catch (err) {
            setError(err.message || 'An error occurred while loading agents');
            setAgents([]);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleAddFormChange = (e) => {
        setAddFormData({
            ...addFormData,
            [e.target.name]: e.target.value
        });
    };

    const handleSearch = async (e) => {
        e.preventDefault();

        if (!formData.name.trim()) {
            setError('Name is required for search');
            return;
        }

        setLoading(true);
        setError(null);
        setSearched(true);

        try {
            const params = new URLSearchParams();
            params.append('name', formData.name);

            if (formData.location_city) {
                params.append('location_city', formData.location_city);
            }

            if (formData.specialization) {
                params.append('specialization', formData.specialization);
            }

            const response = await fetch(`${API_URL}/agents/search?${params}`);

            if (!response.ok) {
                throw new Error('Failed to fetch agents');
            }

            const data = await response.json();
            setAgents(data.data || []);
        } catch (err) {
            setError(err.message || 'An error occurred while searching');
            setAgents([]);
        } finally {
            setLoading(false);
        }
    };

    const handleAddAgent = async (e) => {
        e.preventDefault();

        setAddFormLoading(true);
        setAddFormError(null);
        setAddFormSuccess(false);

        try {
            const agentData = {
                ...addFormData,
                photo_url: addFormData.photo_url.trim() || DEFAULT_AVATAR
            };

            const response = await fetch(`${API_URL}/agents`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(agentData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to create agent');
            }

            setAddFormSuccess(true);

            setAddFormData({
                name: '',
                photo_url: '',
                specialization: '',
                location_city: '',
                location_state: '',
                description: ''
            });

            setTimeout(() => {
                setShowAddForm(false);
                setAddFormSuccess(false);
                fetchAllAgents();
            }, 1500);

        } catch (err) {
            setAddFormError(err.message || 'An error occurred while creating agent');
        } finally {
            setAddFormLoading(false);
        }
    };

    const handleShowAll = () => {
        setFormData({ name: '', location_city: '', specialization: '' });
        setSearched(false);
        fetchAllAgents();
    };

    const openAddForm = () => {
        setShowAddForm(true);
        setAddFormError(null);
        setAddFormSuccess(false);
    };

    const closeAddForm = () => {
        setShowAddForm(false);
        setAddFormError(null);
        setAddFormSuccess(false);
    };

    return (
        <main>
            <header className="header">
                <div className="container">
                    <h1>🏠 Real Estate Agent Directory</h1>
                    <p>Find the perfect agent for your real estate needs</p>
                </div>
            </header>

            <div className="container">
                <SearchForm
                    formData={formData}
                    onChange={handleInputChange}
                    onSubmit={handleSearch}
                    loading={loading}
                    searched={searched}
                    onShowAll={handleShowAll}
                    onAddAgent={openAddForm}
                    resultsCount={agents.length}
                />

                {loading && (
                    <div className="loading">
                        <div className="loading-spinner"></div>
                        <p style={{ marginTop: '1rem' }}>Loading agents...</p>
                    </div>
                )}

                {error && (
                    <div className="error">
                        <p>⚠️ {error}</p>
                    </div>
                )}

                {/* Results Grid */}
                {!loading && agents.length > 0 && (
                    <div className="agents-grid">
                        {agents.map((agent) => (
                            <AgentCard
                                key={agent.id}
                                agent={agent}
                                onViewDetails={setSelectedAgent}
                            />
                        ))}
                    </div>
                )}

                {/* No Results */}
                {!loading && agents.length === 0 && !error && (
                    <div className="no-results">
                        <p> {searched ? 'No agents found matching your criteria.' : 'No agents available.'}</p>
                        {searched && (
                            <p style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}>
                                Try adjusting your search parameters or <button onClick={handleShowAll} className="link-button">show all agents</button>.
                            </p>
                        )}
                    </div>
                )}
            </div>

            <AgentModal
                agent={selectedAgent}
                onClose={() => setSelectedAgent(null)}
            />

            <AddAgentModal
                isOpen={showAddForm}
                onClose={closeAddForm}
                formData={addFormData}
                onChange={handleAddFormChange}
                onSubmit={handleAddAgent}
                loading={addFormLoading}
                error={addFormError}
                success={addFormSuccess}
            />
        </main>
    );
}
