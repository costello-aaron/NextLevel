'use client';

import React, { useState, useEffect } from 'react';

const CanopyConnect = () => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [apiData, setApiData] = useState(null);
    const [error, setError] = useState(null);
    
    const [user, setUser] = useState({
        name: 'John Doe',
        policyNumber: 'CP-2024-001',
        email: 'john.doe@email.com'
    });

    // Canopy Connect API Configuration
    const CANOPY_API_BASE = 'https://api.usecanopy.com/v1';
    const CANOPY_CLIENT_ID = process.env.NEXT_PUBLIC_CANOPY_CLIENT_ID || 'your_client_id';
    const CANOPY_CLIENT_SECRET = process.env.NEXT_PUBLIC_CANOPY_CLIENT_SECRET || 'your_client_secret';

    // API Functions based on Canopy Connect documentation
    const canopyApi = {
        // Authentication
        async authenticate() {
            try {
                setIsLoading(true);
                // This would integrate with Canopy Connect Auth API
                // POST /consentAndConnect
                const response = await fetch(`${CANOPY_API_BASE}/auth/consentAndConnect`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${CANOPY_CLIENT_ID}`
                    },
                    body: JSON.stringify({
                        client_id: CANOPY_CLIENT_ID,
                        client_secret: CANOPY_CLIENT_SECRET
                    })
                });
                
                if (response.ok) {
                    setIsAuthenticated(true);
                    return await response.json();
                }
            } catch (err) {
                setError('Authentication failed');
                console.error('Auth error:', err);
            } finally {
                setIsLoading(false);
            }
        },

        // Get policy data
        async getPolicies() {
            try {
                setIsLoading(true);
                // This would integrate with Canopy Connect Pulls API
                // GET /pulls
                const response = await fetch(`${CANOPY_API_BASE}/pulls`, {
                    headers: {
                        'Authorization': `Bearer ${CANOPY_CLIENT_ID}`
                    }
                });
                
                if (response.ok) {
                    const data = await response.json();
                    setApiData(data);
                    return data;
                }
            } catch (err) {
                setError('Failed to fetch policies');
                console.error('Policies error:', err);
            } finally {
                setIsLoading(false);
            }
        },

        // Get carriers
        async getCarriers() {
            try {
                // GET /carriers
                const response = await fetch(`${CANOPY_API_BASE}/auth/carriers`, {
                    headers: {
                        'Authorization': `Bearer ${CANOPY_CLIENT_ID}`
                    }
                });
                
                if (response.ok) {
                    return await response.json();
                }
            } catch (err) {
                console.error('Carriers error:', err);
            }
        },

        // File a claim
        async fileClaim(claimData) {
            try {
                setIsLoading(true);
                // This would integrate with Canopy Connect Servicings API
                // POST /servicings
                const response = await fetch(`${CANOPY_API_BASE}/servicings`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${CANOPY_CLIENT_ID}`
                    },
                    body: JSON.stringify(claimData)
                });
                
                if (response.ok) {
                    return await response.json();
                }
            } catch (err) {
                setError('Failed to file claim');
                console.error('Claim error:', err);
            } finally {
                setIsLoading(false);
            }
        }
    };

    // Initialize Canopy Connect integration
    useEffect(() => {
        const initializeCanopy = async () => {
            try {
                await canopyApi.authenticate();
                await canopyApi.getPolicies();
            } catch (err) {
                console.error('Initialization error:', err);
            }
        };

        // Only initialize if we have API credentials
        if (CANOPY_CLIENT_ID !== 'your_client_id') {
            initializeCanopy();
        }
    }, []);

    const [policies] = useState([
        {
            id: 1,
            type: 'Auto Insurance',
            policyNumber: 'AUTO-2024-001',
            status: 'Active',
            premium: '$1,200/year',
            nextPayment: '2024-02-15',
            coverage: 'Comprehensive',
            carrier: 'State Farm'
        },
        {
            id: 2,
            type: 'Home Insurance',
            policyNumber: 'HOME-2024-001',
            status: 'Active',
            premium: '$800/year',
            nextPayment: '2024-03-01',
            coverage: 'Standard',
            carrier: 'Allstate'
        },
        {
            id: 3,
            type: 'Life Insurance',
            policyNumber: 'LIFE-2024-001',
            status: 'Active',
            premium: '$600/year',
            nextPayment: '2024-02-20',
            coverage: 'Term Life',
            carrier: 'MetLife'
        }
    ]);

    const [claims] = useState([
        {
            id: 1,
            type: 'Auto Claim',
            status: 'In Progress',
            date: '2024-01-15',
            amount: '$2,500',
            description: 'Rear-end collision'
        },
        {
            id: 2,
            type: 'Home Claim',
            status: 'Approved',
            date: '2024-01-10',
            amount: '$1,800',
            description: 'Water damage repair'
        }
    ]);

    const renderDashboard = () => (
        <div className="space-y-6">
            {/* Canopy Connect API Status */}
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-semibold text-blue-800">Canopy Connect API Status</h3>
                        <p className="text-sm text-blue-600">
                            {isAuthenticated ? '✅ Connected to Canopy Connect API' : '❌ Not connected'}
                        </p>
                    </div>
                    <button 
                        onClick={() => canopyApi.authenticate()}
                        disabled={isLoading}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
                    >
                        {isLoading ? 'Connecting...' : 'Connect API'}
                    </button>
                </div>
                {error && (
                    <p className="text-red-600 text-sm mt-2">{error}</p>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                    <h3 className="text-lg font-semibold text-blue-800 mb-2">Active Policies</h3>
                    <p className="text-3xl font-bold text-blue-600">{policies.length}</p>
                    <p className="text-sm text-blue-600 mt-1">All policies current</p>
                </div>
                <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                    <h3 className="text-lg font-semibold text-green-800 mb-2">Total Premium</h3>
                    <p className="text-3xl font-bold text-green-600">$2,600</p>
                    <p className="text-sm text-green-600 mt-1">Annual coverage</p>
                </div>
                <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
                    <h3 className="text-lg font-semibold text-purple-800 mb-2">Open Claims</h3>
                    <p className="text-3xl font-bold text-purple-600">{claims.filter(c => c.status === 'In Progress').length}</p>
                    <p className="text-sm text-purple-600 mt-1">Being processed</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Claims</h3>
                    <div className="space-y-3">
                        {claims.slice(0, 3).map(claim => (
                            <div key={claim.id} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                                <div>
                                    <p className="font-medium text-gray-800">{claim.type}</p>
                                    <p className="text-sm text-gray-600">{claim.description}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-medium text-gray-800">{claim.amount}</p>
                                    <span className={`text-xs px-2 py-1 rounded ${
                                        claim.status === 'Approved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                    }`}>
                                        {claim.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg border border-gray-200">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h3>
                    <div className="space-y-3">
                        <button 
                            onClick={() => canopyApi.fileClaim({ type: 'auto', description: 'New claim' })}
                            disabled={isLoading}
                            className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
                        >
                            {isLoading ? 'Processing...' : 'File New Claim'}
                        </button>
                        <button className="w-full bg-green-500 text-white py-3 px-4 rounded-lg hover:bg-green-600 transition-colors">
                            Make Payment
                        </button>
                        <button className="w-full bg-purple-500 text-white py-3 px-4 rounded-lg hover:bg-purple-600 transition-colors">
                            Update Policy
                        </button>
                        <button className="w-full bg-orange-500 text-white py-3 px-4 rounded-lg hover:bg-orange-600 transition-colors">
                            Contact Support
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderPolicies = () => (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">My Policies</h2>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                    Add New Policy
                </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {policies.map(policy => (
                    <div key={policy.id} className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-lg font-semibold text-gray-800">{policy.type}</h3>
                            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                                {policy.status}
                            </span>
                        </div>
                        <div className="space-y-2 text-sm text-gray-600">
                            <p><strong>Policy #:</strong> {policy.policyNumber}</p>
                            <p><strong>Carrier:</strong> {policy.carrier}</p>
                            <p><strong>Premium:</strong> {policy.premium}</p>
                            <p><strong>Coverage:</strong> {policy.coverage}</p>
                            <p><strong>Next Payment:</strong> {policy.nextPayment}</p>
                        </div>
                        <div className="mt-4 flex space-x-2">
                            <button className="flex-1 bg-blue-500 text-white py-2 px-3 rounded text-sm hover:bg-blue-600 transition-colors">
                                View Details
                            </button>
                            <button className="flex-1 bg-gray-500 text-white py-2 px-3 rounded text-sm hover:bg-gray-600 transition-colors">
                                Make Payment
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderClaims = () => (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">Claims Center</h2>
                <button 
                    onClick={() => canopyApi.fileClaim({ type: 'auto', description: 'New claim' })}
                    disabled={isLoading}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
                >
                    {isLoading ? 'Processing...' : 'File New Claim'}
                </button>
            </div>
            
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Claim Type</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {claims.map(claim => (
                                <tr key={claim.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div>
                                            <div className="text-sm font-medium text-gray-900">{claim.type}</div>
                                            <div className="text-sm text-gray-500">{claim.description}</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{claim.date}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{claim.amount}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                            claim.status === 'Approved' ? 'bg-green-100 text-green-800' : 
                                            claim.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' : 
                                            'bg-red-100 text-red-800'
                                        }`}>
                                            {claim.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                                        <button className="text-green-600 hover:text-green-900">Update</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );

    const renderPayments = () => (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">Payment Center</h2>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                    Make Payment
                </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Payment Methods</h3>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 border border-gray-200 rounded">
                            <div className="flex items-center">
                                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">
                                    V
                                </div>
                                <span className="text-gray-800">Visa ending in 1234</span>
                            </div>
                            <button className="text-blue-600 hover:text-blue-800">Edit</button>
                        </div>
                        <div className="flex items-center justify-between p-3 border border-gray-200 rounded">
                            <div className="flex items-center">
                                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">
                                    B
                                </div>
                                <span className="text-gray-800">Bank Account ending in 5678</span>
                            </div>
                            <button className="text-blue-600 hover:text-blue-800">Edit</button>
                        </div>
                        <button className="w-full border-2 border-dashed border-gray-300 rounded-lg py-3 text-gray-600 hover:border-gray-400 hover:text-gray-800 transition-colors">
                            + Add Payment Method
                        </button>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg border border-gray-200">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Upcoming Payments</h3>
                    <div className="space-y-3">
                        {policies.map(policy => (
                            <div key={policy.id} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                                <div>
                                    <p className="font-medium text-gray-800">{policy.type}</p>
                                    <p className="text-sm text-gray-600">Due: {policy.nextPayment}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-medium text-gray-800">{policy.premium}</p>
                                    <button className="text-blue-600 hover:text-blue-800 text-sm">Pay Now</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );

    const renderSupport = () => (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Support Center</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg border border-gray-200 text-center">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-white text-xl">📞</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Phone Support</h3>
                    <p className="text-gray-600 mb-4">24/7 customer service</p>
                    <p className="text-blue-600 font-medium">1-800-CANOPY-1</p>
                </div>

                <div className="bg-white p-6 rounded-lg border border-gray-200 text-center">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-white text-xl">💬</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Live Chat</h3>
                    <p className="text-gray-600 mb-4">Instant messaging support</p>
                    <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors">
                        Start Chat
                    </button>
                </div>

                <div className="bg-white p-6 rounded-lg border border-gray-200 text-center">
                    <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-white text-xl">📧</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Email Support</h3>
                    <p className="text-gray-600 mb-4">Response within 24 hours</p>
                    <p className="text-purple-600 font-medium">support@canopyconnect.com</p>
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Frequently Asked Questions</h3>
                <div className="space-y-4">
                    <div className="border-b border-gray-200 pb-4">
                        <h4 className="font-medium text-gray-800 mb-2">How do I file a claim?</h4>
                        <p className="text-gray-600">You can file a claim online through our portal, by phone, or by contacting your agent directly.</p>
                    </div>
                    <div className="border-b border-gray-200 pb-4">
                        <h4 className="font-medium text-gray-800 mb-2">What documents do I need for a claim?</h4>
                        <p className="text-gray-600">Typically you'll need photos, police reports (if applicable), and any relevant receipts or estimates.</p>
                    </div>
                    <div className="border-b border-gray-200 pb-4">
                        <h4 className="font-medium text-gray-800 mb-2">How can I update my policy?</h4>
                        <p className="text-gray-600">You can update your policy online, call our customer service, or contact your insurance agent.</p>
                    </div>
                </div>
            </div>
        </div>
    );

    const tabs = [
        { id: 'dashboard', name: 'Dashboard', icon: '📊' },
        { id: 'policies', name: 'My Policies', icon: '📋' },
        { id: 'claims', name: 'Claims', icon: '📝' },
        { id: 'payments', name: 'Payments', icon: '💳' },
        { id: 'support', name: 'Support', icon: '🆘' }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Canopy Connect</h1>
                            <p className="text-gray-600 mt-1">Your Insurance Portal - Powered by Canopy Connect API</p>
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-gray-600">Welcome back,</p>
                            <p className="font-semibold text-gray-900">{user.name}</p>
                            <p className="text-xs text-gray-500">Policy: {user.policyNumber}</p>
                        </div>
                    </div>
                </div>

                {/* Navigation Tabs */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
                    <div className="border-b border-gray-200">
                        <nav className="flex space-x-8 px-6">
                            {tabs.map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                                        activeTab === tab.id
                                            ? 'border-blue-500 text-blue-600'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                                >
                                    <span>{tab.icon}</span>
                                    <span>{tab.name}</span>
                                </button>
                            ))}
                        </nav>
                    </div>
                </div>

                {/* Content Area */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    {activeTab === 'dashboard' && renderDashboard()}
                    {activeTab === 'policies' && renderPolicies()}
                    {activeTab === 'claims' && renderClaims()}
                    {activeTab === 'payments' && renderPayments()}
                    {activeTab === 'support' && renderSupport()}
                </div>
            </div>
        </div>
    );
};

export default CanopyConnect;