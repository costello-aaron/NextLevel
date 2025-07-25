import React from 'react';

const AboutUs = () => {
    return (
        <div className="about-us-page bg-gray-100 min-h-screen py-10">
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">About Us</h1>
                <p className="text-gray-600 mb-8">
                    Welcome to our insurance company! We are dedicated to providing exceptional service and personalized solutions to meet your insurance needs.
                </p>
                
                <div className="owner-info flex items-center mb-8">
                    <img
                        src="/path-to-owner-headshot.jpg"
                        alt="Owner Headshot"
                        className="w-32 h-32 rounded-full shadow-lg mr-6"
                    />
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-800">John Doe</h2>
                        <p className="text-gray-600">
                            Founder & CEO
                        </p>
                        <p className="text-gray-600 mt-2">
                            John has over 20 years of experience in the insurance industry and is passionate about helping clients protect what matters most.
                        </p>
                    </div>
                </div>

                <div className="company-mission">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h2>
                    <p className="text-gray-600">
                        Our mission is to provide reliable and affordable insurance solutions while building lasting relationships with our clients. We strive to make the process simple and stress-free.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
