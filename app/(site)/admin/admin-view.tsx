import { getShopOrders } from "@/actions/getShopOrders";
import AdminTable from "./admin-table";
import { getUser } from "@/actions/user/getUser";

const AdminView = async () => {
    const res = await getShopOrders();
        return (
            <div>
                <AdminTable orders={res} />
            </div>
        );
};

export default AdminView;
