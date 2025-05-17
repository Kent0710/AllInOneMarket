import { getShopOrders } from "@/actions/getShopOrders";
import AdminTable from "./admin-table";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const AdminView = async () => {
    const res = await getShopOrders();

    if (res.success === false) {
        return (
            <div className="flex flex-col  items-center justify-center space-y-3">
                <p>You do not have a shop for admin panel.</p>
                <Link href={"/home"}>
                    <Button variant={"special"}>Return to home</Button>
                </Link>
            </div>
        );
    }

    return (
        <div>
            <AdminTable orders={res} />
        </div>
    );
};

export default AdminView;
