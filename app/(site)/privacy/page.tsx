// app/privacy/page.tsx (or pages/privacy.tsx for older Next.js versions)
export default function PrivacyPolicyPage() {
    return (
        <main className="max-w-3xl mx-auto px-4  text-neutral-800">
            <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>

            <p className="mb-4 text-sm text-neutral-500">
                Last updated: May 10, 2025
            </p>

            <section className="space-y-6">
                <p>
                    Thank you for trusting us with your information. Your
                    privacy matters, and we're committed to protecting it. This
                    Privacy Policy explains how we collect, use, and protect
                    your data when you use our services.
                </p>

                <h2 className="text-2xl font-semibold">
                    1. Information We Collect
                </h2>
                <ul className="list-disc list-inside space-y-1">
                    <li>
                        <strong>Account Info:</strong> Like your name, email,
                        and preferences.
                    </li>
                    <li>
                        <strong>Usage Data:</strong> Pages visited, actions
                        taken, device info, etc.
                    </li>
                    <li>
                        <strong>Optional Data:</strong> Any details you choose
                        to share with us voluntarily.
                    </li>
                </ul>

                <h2 className="text-2xl font-semibold">
                    2. How We Use Your Data
                </h2>
                <p>We use your data to:</p>
                <ul className="list-disc list-inside space-y-1">
                    <li>Provide and improve our services</li>
                    <li>Personalize your experience</li>
                    <li>Ensure security and prevent abuse</li>
                    <li>Send updates or service notifications</li>
                </ul>

                <h2 className="text-2xl font-semibold">3. Data Sharing</h2>
                <p>We never sell your data. We only share it when:</p>
                <ul className="list-disc list-inside space-y-1">
                    <li>Required by law</li>
                    <li>
                        Using trusted third-party services to operate our
                        platform
                    </li>
                </ul>

                <h2 className="text-2xl font-semibold">4. Your Rights</h2>
                <p>
                    You have the right to access, update, or delete your data.
                    You can also request to opt out of certain communications.
                </p>

                <h2 className="text-2xl font-semibold">5. Data Security</h2>
                <p>
                    We use encryption, secure servers, and modern safeguards to
                    protect your data from unauthorized access.
                </p>

                <h2 className="text-2xl font-semibold">6. Cookies</h2>
                <p>
                    Our site may use cookies to improve your experience. You can
                    manage cookie preferences through your browser settings.
                </p>

                <h2 className="text-2xl font-semibold">
                    7. Changes to This Policy
                </h2>
                <p>
                    We may update this policy to reflect new practices or
                    regulations. We’ll notify you of significant changes by
                    updating the date above.
                </p>

                <h2 className="text-2xl font-semibold">8. Contact Us</h2>
                <p>
                    If you have any questions or concerns, feel free to reach us
                    at{" "}
                    <a
                        href="mailto:support@example.com"
                        className="text-blue-600 underline"
                    >
                        support@example.com
                    </a>
                    .
                </p>
            </section>
        </main>
    );
}
