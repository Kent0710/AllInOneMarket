export default function ContactPage() {
    return (
        <main className="max-w-3xl mx-auto px-4 text-neutral-800">
            <h1 className="text-4xl font-bold mb-6">Contact Us</h1>

            <p className="mb-4 text-sm text-neutral-500">
                We&apos;re here to help! Whether you have questions about your reservation,
                issues at the venue, or just general feedback, feel free to reach out.
            </p>

            <section className="space-y-6">
                <h2 className="text-2xl font-semibold">Customer Support</h2>
                <p>
                    For any questions or problems with your reservation, code, or experience
                    with one of our six shops, our support team is ready to assist you.
                </p>
                <p>
                    📩 Email us at{" "}
                    <a
                        href="mailto:chls.softwaredev@gmail.com"
                        className="text-blue-600 underline"
                    >
                        chls.softwaredev@gmail.com
                    </a>
                </p>

                <h2 className="text-2xl font-semibold">Business or Vendor Inquiries</h2>
                <p>
                    Are you a shop owner or school event organizer looking to collaborate
                    with AllInOneMarket? Reach out — we&apos;d love to hear from you.
                </p>
                <p>
                    📩 Email us at{" "}
                    <a
                        href="mailto:chls.softwaredev@gmail.com"
                        className="text-blue-600 underline"
                    >
                        chls.softwaredev@gmail.com
                    </a>
                </p>

                <h2 className="text-2xl font-semibold">Feedback & Suggestions</h2>
                <p>
                    Help us improve! If you have any feedback, ideas, or suggestions to make
                    the AllInOneMarket experience better, drop us a message anytime.
                </p>

                <p className="mt-8 text-sm text-neutral-500">
                    We aim to respond within 24 - 48 hours. Thank you for supporting
                    AllInOneMarket!
                </p>
            </section>
        </main>
    );
}
