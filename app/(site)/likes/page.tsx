import LikesView from "./likes-view";
import { Suspense } from "react";

export default async function Likes() {
    return (
        <div>
            <main className="mw-[10rem]">
                <h2 className="text-center font-extrabold text-lg whitespace-nowrap mb-3">
                    Likes
                </h2>

                <Suspense fallback={<p>loading</p>}>
                    <LikesView />
                </Suspense>
            </main>
        </div>
    );
}
