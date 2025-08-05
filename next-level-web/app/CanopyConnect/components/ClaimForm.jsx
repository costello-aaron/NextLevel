'use client';

import React, { useState } from 'react';

const ClaimForm = ({ onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        claimType: '',
        description: '',
        dateOfIncident: '',
        estimatedAmount: '',
        policyNumber: '',
        contactPhone: '',
        contactEmail: '',
        documents: []
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        try {
            // Submit to Canopy Connect Servicings API
            const response = await fetch('/api/claims', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            
            if (response.ok) {
                onSubmit('Claim submitted successfully!');
            }
        } catch (error) {
            onSubmit('Error submitting claim');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleFileUpload = (e) => {
        const files = Array.from(e.target.files);
        setFormData(prev => ({
            ...prev,
            documents: [...prev.documents, ...files]
        }));
    };

    return (
        <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">File New Claim</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Claim Type *
                        </label>
                        <select
                            value={formData.claimType}
                            onChange={(e) => setFormData(prev => ({ ...prev, claimType: e.target.value }))}
                            required
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select claim type</option>
                            <option value="auto">Auto Insurance</option>
                            <option value="home">Home Insurance</option>
                            <option value="life">Life Insurance</option>
                            <option value="health">Health Insurance</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Policy Number *
                        </label>
                        <input
                            type="text"
                            value={formData.policyNumber}
                            onChange={(e) => setFormData(prev => ({ ...prev, policyNumber: e.target.value }))}
                            required
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter policy number"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description of Incident *
                    </label>
                    <textarea
                        value={formData.description}
                        onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                        required
                        rows="4"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Describe what happened..."
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Date of Incident *
                        </label>
                        <input
                            type="date"
                            value={formData.dateOfIncident}
                            onChange={(e) => setFormData(prev => ({ ...prev, dateOfIncident: e.target.value }))}
                            required
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Estimated Amount *
                        </label>
                        <input
                            type="number"
                            value={formData.estimatedAmount}
                            onChange={(e) => setFormData(prev => ({ ...prev, estimatedAmount: e.target.value }))}
                            required
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter estimated amount"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Contact Phone *
                        </label>
                        <input
                            type="tel"
                            value={formData.contactPhone}
                            onChange={(e) => setFormData(prev => ({ ...prev, contactPhone: e.target.value }))}
                            required
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="(555) 123-4567"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Contact Email *
                        </label>
                        <input
                            type="email"
                            value={formData.contactEmail}
                            onChange={(e) => setFormData(prev => ({ ...prev, contactEmail: e.target.value }))}
                            required
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="your@email.com"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Supporting Documents
                    </label>
                    <input
                        type="file"
                        multiple
                        onChange={handleFileUpload}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                        Upload photos, police reports, receipts, or other relevant documents
                    </p>
                </div>

                {formData.documents.length > 0 && (
                    <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Uploaded Documents:</h4>
                        <ul className="space-y-1">
                            {formData.documents.map((file, index) => (
                                <li key={index} className="text-sm text-gray-600">
                                    📎 {file.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                <div className="flex justify-end space-x-4">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 transition-colors"
                    >
                        {isSubmitting ? 'Submitting...' : 'Submit Claim'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ClaimForm; 