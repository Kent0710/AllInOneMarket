export default function PrivacyPolicyPage() {
    return (
        <main className="max-w-3xl mx-auto px-4 text-neutral-800">
            <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>

            <p className="mb-4 text-sm text-neutral-500">
                Last updated: May 31, 2025
            </p>

            <section className="space-y-6">
                <p>
                    Thank you for trusting AllInOneMarket. Your privacy is important to us,
                    and we are committed to protecting your personal information. This Privacy Policy
                    explains how we collect, use, and safeguard your data when using our platform
                    to explore, reserve, and redeem items from our six shop vendors.
                </p>

                <h2 className="text-2xl font-semibold">
                    1. Information We Collect
                </h2>
                <ul className="list-disc list-inside space-y-1">
                    <li>
                        <strong>Account Info:</strong> Such as your name, email address, and other
                        necessary details when reserving an order.
                    </li>
                    <li>
                        <strong>Reservation Data:</strong> Information about the orders you reserve,
                        including selected shop, items, and generated reservation codes.
                    </li>
                    <li>
                        <strong>Usage Data:</strong> Device information, pages visited, and actions
                        taken on the platform.
                    </li>
                    <li>
                        <strong>Optional Data:</strong> Any additional information you voluntarily provide.
                    </li>
                </ul>

                <h2 className="text-2xl font-semibold">
                    2. How We Use Your Data
                </h2>
                <p>We use your data to:</p>
                <ul className="list-disc list-inside space-y-1">
                    <li>Process your shop reservations and generate verification codes</li>
                    <li>Improve the user experience and platform performance</li>
                    <li>Prevent misuse and enhance security</li>
                    <li>Notify you about your reservation status or platform updates</li>
                </ul>

                <h2 className="text-2xl font-semibold">3. Data Sharing</h2>
                <p>We do not sell your data. We only share information:</p>
                <ul className="list-disc list-inside space-y-1">
                    <li>With the shop vendors involved in your reservation</li>
                    <li>As required by law or legal requests</li>
                    <li>With trusted service providers that help us operate the platform securely</li>
                </ul>

                <h2 className="text-2xl font-semibold">4. Your Rights</h2>
                <p>
                    You have the right to access, correct, or delete your personal data.
                    You may also opt out of receiving notifications that are not essential
                    to your reservation.
                </p>

                <h2 className="text-2xl font-semibold">5. Data Security</h2>
                <p>
                    We implement security measures such as encryption and secure servers
                    to protect your data from unauthorized access or misuse.
                </p>

                <h2 className="text-2xl font-semibold">6. Cookies</h2>
                <p>
                    We use cookies to enhance your browsing experience. You can control
                    or disable cookies through your browser settings.
                </p>

                <h2 className="text-2xl font-semibold">
                    7. Changes to This Policy
                </h2>
                <p>
                    We may update this Privacy Policy as our services evolve or as laws change.
                    Any major updates will be reflected by updating the &quot;Last updated&quot; date above.
                </p>

                <h2 className="text-2xl font-semibold">8. Contact Us</h2>
                <p>
                    If you have any questions or concerns regarding this Privacy Policy,
                    feel free to contact us at{" "}
                    <a
                        href="mailto:chls.softwaredev@gmail.com"
                        className="text-blue-600 underline"
                    >
                        chls.softwaredev@gmail.com
                    </a>
                    .
                </p>
            </section>
        </main>
    );
}
