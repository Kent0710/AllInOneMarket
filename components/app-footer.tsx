const AppFooter = () => {
    return (
        <footer className="bg-gray-100 text-gray-700 text-sm mt-10 border-t border-gray-200">
                <div className="max-w-6xl mx-auto px-4 py-8">
                    <ul className="flex flex-wrap justify-center gap-4 md:gap-6 text-xs md:text-sm mb-4">
                        <li>
                            <a href="#" className="hover:underline">
                                Home
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline">
                                Shops
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline">
                                Products
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline">
                                Order
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline">
                                Cart
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline">
                                About
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline">
                                Privacy
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline">
                                Contact
                            </a>
                        </li>
                    </ul>

                    <div className="text-center text-xs md:text-sm text-gray-500 mb-2">
                        &copy; {new Date().getFullYear()}{" "}
                        <strong>AllInOneMarket</strong>. All rights reserved.
                    </div>

                    <div className="text-center text-xs text-gray-400 max-w-xl mx-auto leading-relaxed">
                        All product images, logos, and trademarks belong to
                        their respective shops and owners. AllInOneMarket only
                        serves as a marketplace platform and does not claim
                        ownership of third-party content.
                    </div>
                </div>
            </footer>
    )
};

export default AppFooter;