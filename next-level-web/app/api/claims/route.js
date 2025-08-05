import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const claimData = await request.json();
        
        // Validate required fields
        const requiredFields = ['claimType', 'description', 'dateOfIncident', 'estimatedAmount', 'policyNumber'];
        for (const field of requiredFields) {
            if (!claimData[field]) {
                return NextResponse.json(
                    { error: `Missing required field: ${field}` },
                    { status: 400 }
                );
            }
        }

        // Integrate with Canopy Connect Servicings API
        const CANOPY_API_BASE = process.env.NEXT_PUBLIC_CANOPY_API_BASE || 'https://api.usecanopy.com/v1';
        const CANOPY_CLIENT_ID = process.env.NEXT_PUBLIC_CANOPY_CLIENT_ID;
        const CANOPY_CLIENT_SECRET = process.env.NEXT_PUBLIC_CANOPY_CLIENT_SECRET;

        if (!CANOPY_CLIENT_ID || !CANOPY_CLIENT_SECRET) {
            return NextResponse.json(
                { error: 'Canopy Connect API credentials not configured' },
                { status: 500 }
            );
        }

        // Submit claim to Canopy Connect Servicings API
        const response = await fetch(`${CANOPY_API_BASE}/servicings`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${CANOPY_CLIENT_ID}`
            },
            body: JSON.stringify({
                type: 'claim',
                claimType: claimData.claimType,
                description: claimData.description,
                dateOfIncident: claimData.dateOfIncident,
                estimatedAmount: parseFloat(claimData.estimatedAmount),
                policyNumber: claimData.policyNumber,
                contactPhone: claimData.contactPhone,
                contactEmail: claimData.contactEmail,
                documents: claimData.documents || []
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            return NextResponse.json(
                { error: 'Failed to submit claim to Canopy Connect', details: errorData },
                { status: response.status }
            );
        }

        const result = await response.json();

        return NextResponse.json({
            success: true,
            message: 'Claim submitted successfully',
            claimId: result.id,
            data: result
        });

    } catch (error) {
        console.error('Claim submission error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

export async function GET(request) {
    try {
        // Get claims from Canopy Connect API
        const CANOPY_API_BASE = process.env.NEXT_PUBLIC_CANOPY_API_BASE || 'https://api.usecanopy.com/v1';
        const CANOPY_CLIENT_ID = process.env.NEXT_PUBLIC_CANOPY_CLIENT_ID;

        if (!CANOPY_CLIENT_ID) {
            return NextResponse.json(
                { error: 'Canopy Connect API credentials not configured' },
                { status: 500 }
            );
        }

        const response = await fetch(`${CANOPY_API_BASE}/servicings`, {
            headers: {
                'Authorization': `Bearer ${CANOPY_CLIENT_ID}`
            }
        });

        if (!response.ok) {
            return NextResponse.json(
                { error: 'Failed to fetch claims' },
                { status: response.status }
            );
        }

        const claims = await response.json();

        return NextResponse.json({
            success: true,
            claims: claims
        });

    } catch (error) {
        console.error('Claims fetch error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
} 