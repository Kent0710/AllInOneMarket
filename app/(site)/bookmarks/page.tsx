import { Suspense } from "react";
import BookmarksView from "./bookmarks-view";

export default async function Bookmarks() {
    return (
        <div>
            <main className="mx-[2rem] md:mx-[10rem]">
                <h2 className="text-center font-extrabold text-lg whitespace-nowrap mb-3">
                    Bookmarks
                </h2>

                <Suspense fallback={<>loading</>}>
                    <BookmarksView />
                </Suspense>
            </main>
        </div>
    );
}
