export default async function AboutPage() {
    return (
        <main className="max-w-3xl mx-auto px-4 text-neutral-800">
            <h1 className="text-4xl font-bold mb-6">About AllInOneMarket</h1>

            <section className="space-y-6">
                <p>
                    AllInOneMarket is a reservation-based ordering platform designed to
                    simplify how students and customers interact with multiple on-site shops.
                    With just a few taps, users can browse menus, reserve items, and pick up
                    their orders in person using a unique reservation code.
                </p>

                <p>
                    Our goal is to eliminate long queues and streamline the ordering experience
                    for both customers and vendors. Each shop manages its own inventory and
                    handles orders independently, while AllInOneMarket serves as the digital
                    bridge between them.
                </p>

                <p>
                    This project was built with a focus on practicality, speed, and ease of use
                    — giving vendors control while giving users a fast, contactless way to reserve.
                </p>

                <h2 className="text-2xl font-semibold">Meet the Developer</h2>
                <p>
                    Hi! I&apos;m Kent — a passionate full-stack developer focused on
                    building meaningful, efficient, and user-friendly software solutions.
                </p>

                <ul className="list-disc list-inside space-y-1">
                    <li>
                        GitHub:{" "}
                        <a
                            href="https://github.com/Kent0710"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline"
                        >
                            github.com/Kent0710
                        </a>
                    </li>
                    <li>
                        LinkedIn:{" "}
                        <a
                            href="https://www.linkedin.com/in/christian-kent-bayani-4232a6304/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline"
                        >
                            linkedin.com/in/christian-kent-bayani
                        </a>
                    </li>
                    <li>
                        Email:{" "}
                        <a
                            href="mailto:chls.softwaredev@gmail.com"
                            className="text-blue-600 underline"
                        >
                            chls.softwaredev@gmail.com
                        </a>
                    </li>
                </ul>

                <p>
                    Thank you for using AllInOneMarket! If you have questions, ideas, or
                    opportunities for collaboration, feel free to reach out.
                </p>
            </section>
        </main>
    );
}
