export default async function TermsPage() {
    return (
        <main className="max-w-3xl mx-auto px-4 text-neutral-800">
            <h1 className="text-4xl font-bold mb-6">Terms of Service</h1>

            <p className="mb-4 text-sm text-neutral-500">
                Last updated: May 31, 2025
            </p>

            <section className="space-y-6">
                <p>
                    Welcome to AllInOneMarket! By using our platform, you agree to
                    the following terms and conditions. Please read them carefully
                    before making any reservations or using our services.
                </p>

                <h2 className="text-2xl font-semibold">1. Overview</h2>
                <p>
                    AllInOneMarket is a platform that allows users to browse and reserve
                    items from six different shops. Once a reservation is made, a unique
                    code is generated which can be presented at the venue to claim the order.
                </p>

                <h2 className="text-2xl font-semibold">2. Platform Role</h2>
                <p>
                    AllInOneMarket acts solely as a digital facilitator between users and
                    shop vendors. Each shop is independently responsible for its own products,
                    services, pricing, availability, order fulfillment, and any interactions
                    with customers at the venue. We do not control or guarantee the quality,
                    accuracy, or delivery of any goods or services offered by the shops.
                </p>

                <h2 className="text-2xl font-semibold">3. User Responsibilities</h2>
                <ul className="list-disc list-inside space-y-1">
                    <li>Provide accurate and up-to-date information when making a reservation.</li>
                    <li>Respect all venue rules and shop-specific guidelines.</li>
                    <li>Do not misuse or duplicate reservation codes.</li>
                    <li>You are responsible for safeguarding your reservation code.</li>
                </ul>

                <h2 className="text-2xl font-semibold">4. Reservation Policy</h2>
                <ul className="list-disc list-inside space-y-1">
                    <li>
                        Reservations are subject to availability and may be limited based
                        on shop inventory or event capacity.
                    </li>
                    <li>
                        Your reservation is only valid if confirmed through the platform
                        and accompanied by a valid reservation code.
                    </li>
                    <li>
                        Shops may cancel unclaimed reservations after a certain time window.
                    </li>
                </ul>

                <h2 className="text-2xl font-semibold">5. Code Usage</h2>
                <p>
                    Each reservation code is unique and can only be used once.
                    Sharing or attempting to reuse codes may result in restrictions
                    or account suspension.
                </p>

                <h2 className="text-2xl font-semibold">6. Platform Access</h2>
                <p>
                    We strive to keep AllInOneMarket available and functional at all times,
                    but we do not guarantee uninterrupted access. We may suspend the
                    platform temporarily for maintenance or updates.
                </p>

                <h2 className="text-2xl font-semibold">7. Prohibited Activities</h2>
                <p>By using our services, you agree not to:</p>
                <ul className="list-disc list-inside space-y-1">
                    <li>Use false information or impersonate another person</li>
                    <li>Exploit or tamper with the system or code verification</li>
                    <li>Harass or interfere with other users or vendors</li>
                    <li>Violate any local laws or venue rules</li>
                </ul>

                <h2 className="text-2xl font-semibold">8. Changes to Terms</h2>
                <p>
                    These terms may be updated as the platform evolves. We&apos;ll notify
                    users of significant changes via the app or website.
                </p>

                <h2 className="text-2xl font-semibold">9. Disclaimer</h2>
                <p>
                    AllInOneMarket does not manufacture, store, or deliver any products sold
                    through the platform. All responsibility for order accuracy, quality,
                    safety, and fulfillment lies with the individual shops. Users are encouraged
                    to communicate directly with the shops regarding any product-related issues.
                </p>

                <h2 className="text-2xl font-semibold">10. Contact Us</h2>
                <p>
                    For support or questions about these terms, contact us at{" "}
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
