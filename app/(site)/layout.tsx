import AppFooter from "@/components/app-footer";
import AppHeader from "@/components/app-header";
import BottomBar from "@/components/bottom-bar";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <AppHeader />
            <BottomBar />
            <div className="mt-6">{children}</div>
            <AppFooter />
        </div>
    );
};

export default AppLayout;
