import { getShopOrders } from "@/actions/getShopOrders";
import AdminTable from "./admin-table";

const AdminView = async () => {
    const res = await getShopOrders();
        return (
            <div>
                <AdminTable orders={res} />
            </div>
        );
};

export default AdminView;
