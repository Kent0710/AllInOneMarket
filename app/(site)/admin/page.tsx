import { Suspense } from "react";
import AdminView from "./admin-view";

export default async function AdminPage() {
    return (
        <div className="h-screen">
            <Suspense fallback={<>loading</>}>
                <AdminView />
            </Suspense>
        </div>
    );
}
