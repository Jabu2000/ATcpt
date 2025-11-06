import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
  return (
    <section className="min-h-screen bg-gray-50 text-gray-800 py-6 px-20">
      <Link to="/" className="text-black text-[20px] mb-4 w-fit">
        <FaArrowLeft />
      </Link>
      <div className="max-w-4xl mx-auto py-10">
        {/* Header */}
        <h1 className="text-4xl font-bold text-black mb-6 text-center">
          Privacy Policy
        </h1>
        <p className="text-center text-gray-600 mb-10">
          Last Updated: November 2025
        </p>

        <div className="space-y-10">
          {/* Section 1 */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              1. Information We Collect
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We collect personal details like your name, email, and account
              info when you sign up. We also gather usage and location data to
              improve your Adventure Time experience.
            </p>
          </div>

          {/* Section 2 */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              2. How We Use Your Information
            </h2>
            <ul className="list-disc pl-6 text-gray-700 leading-relaxed">
              <li>Personalize your experience and recommendations</li>
              <li>Connect small businesses with student users</li>
              <li>Improve our website and features</li>
              <li>Send updates or important announcements</li>
            </ul>
          </div>

          {/* Section 3 */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              3. Data Sharing
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We only share necessary data with trusted service providers or
              verified businesses when required. We never sell your information.
            </p>
          </div>

          {/* Section 4 */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              4. Cookies & Tracking
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We use cookies to improve your browsing experience, save
              preferences, and analyze website performance. You can disable
              cookies anytime.
            </p>
          </div>

          {/* Section 5 */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              5. Your Rights
            </h2>
            <p className="text-gray-700 leading-relaxed">
              You may access, update, or delete your data anytime. For questions
              or privacy concerns, email us at{" "}
              <span className="font-medium text-blue-600">
                privacy@adventuretime.co.za
              </span>
              .
            </p>
          </div>

          {/* Section 6 */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              6. Data Security
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We use HTTPS, encryption, and secure servers to protect your data.
              Your personal information is never shared publicly.
            </p>
          </div>

          {/* Footer */}
          <div className="pt-10 border-t border-gray-300 text-center">
            <p className="text-gray-600">
              For more information, contact us at{" "}
              <span className="text-blue-600 font-medium">
                privacy@adventuretime.co.za
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
