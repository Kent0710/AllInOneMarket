import AuthForm from "@/components/auth-form";

export default async function LoginPage() {
    return (
        <div className="flex justify-center py-[2rem] flex-col items-center ">
            <div className="bg-card mx-[2rem] text-card-foreground flex flex-col rounded-xl border p-10 shadow-sm ">
                <AuthForm
                    className="w-[20rem] md:w-[30rem] "
                    alternative={{
                        href: "/signUp",
                        linkText: "Create an account instead",
                    }}
                />
            </div>
        </div>
    );
}
