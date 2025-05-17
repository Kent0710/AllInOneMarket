import { Button } from "@/components/ui/button";

const Header = () => {
    return (
        <header className="border-b text-white bg-gradient-to-tl from-amber-500 to-yellow-400  justify-between flex items-center py-6 rounded-b-xl px-8">
            <section className="flex space-x-9">
                <h1 className="font-extrabold"> AllInOneMarket </h1>
                <nav>
                    <ul className="flex space-x-6">
                        <li> Home </li>
                        <li> Shops </li>
                        <li> Products </li>
                        <li> Order </li>
                        <li> Cart </li>
                        <li> About </li>
                        <li> Privacy </li>
                        <li> Contact </li>
                    </ul>
                </nav>
            </section>

            <section className="flex space-x-3">
                <Button variant={'outline'}> Sign up </Button>
                <Button> Sign in </Button>
            </section>
        </header>
    );
};

export default Header;
