import React from 'react';

const ContactUs = () => {
    return (
        <div className="contact-us-page bg-gray-100 min-h-screen py-10">
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Contact Us</h1>
                <p className="text-gray-600 mb-8">
                    We are here to assist you with your insurance needs. Feel free to reach out to us!
                </p>
                
                <div className="contact-info mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Information</h2>
                    <p className="text-gray-600"><strong>Phone:</strong> (123) 456-7890</p>
                    <p className="text-gray-600"><strong>Email:</strong> support@insurancewebsite.com</p>
                    <p className="text-gray-600"><strong>Address:</strong> 123 Insurance Lane, Suite 100, Cityville, ST 12345</p>
                </div>

                <div className="contact-form">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Send Us a Message</h2>
                    <form className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Name:</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                required
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                required
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Message:</label>
                            <textarea
                                id="message"
                                name="message"
                                rows="5"
                                required
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;