import React from 'react';

const FAQ = () => {
    const faqs = [
        {
            question: "What is the best way to choose an insurance plan?",
            answer: "Consider your needs, budget, and coverage options. Compare plans and consult with an insurance agent if necessary."
        },
        {
            question: "How can I file a claim?",
            answer: "Contact your insurance provider, provide necessary documentation, and follow their claim process."
        },
        {
            question: "What does liability insurance cover?",
            answer: "Liability insurance covers damages or injuries you may cause to others or their property."
        }
    ];

    const tips = [
        "Review your insurance policy annually to ensure it meets your current needs.",
        "Bundle your insurance policies to save money.",
        "Maintain a good credit score to potentially lower your insurance premiums."
    ];

    return (
        <div className="faq-page bg-gray-100 min-h-screen py-10">
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">FAQ & Tips</h1>
                <p className="text-gray-600 mb-8">
                    Find answers to common questions and helpful tips about insurance.
                </p>

                <div className="faq-section mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Frequently Asked Questions</h2>
                    <ul className="space-y-4">
                        {faqs.map((faq, index) => (
                            <li key={index} className="border-b border-gray-300 pb-4">
                                <h3 className="text-xl font-medium text-gray-800">{faq.question}</h3>
                                <p className="text-gray-600">{faq.answer}</p>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="tips-section">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Insurance Tips</h2>
                    <ul className="list-disc pl-5 space-y-2">
                        {tips.map((tip, index) => (
                            <li key={index} className="text-gray-600">{tip}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default FAQ;
