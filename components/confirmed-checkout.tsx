import { DialogClose } from "./ui/dialog";
import { Button } from "./ui/button";

interface ConfirmedCheckoutProps {
    orderCode: string;
    orderQuantity : number;
    onClose: () => void;
    shopName: string;
}

export const ConfirmedCheckout: React.FC<ConfirmedCheckoutProps> = ({
    orderCode,
    orderQuantity,
    onClose,
    shopName,
}) => {
    return (
        <div className="flex flex-col justify-center items-center">
            <iframe src="https://lottie.host/embed/22e47dc9-b392-42fe-bc19-52fc1f553875/xSYbX5Kr6G.lottie"></iframe>
            <h4 className="font-semibold text-2xl"> Congratulations! </h4>
            <p className="text-neutral-500">
                You have successfully made your order.
            </p>

            <h5 className="font-extrabold text-5xl mt-6 mb-3 text-blue-600">
                {orderCode}
            </h5>
            <p className="text-neutral-500 w-[20rem] text-center">
                Please present this to{" "}
                <span className="text-blue-600 font-bold">{shopName}</span>{" "}
                <br />
                at the{" "}
                <span className="font-bold text-blue-600">Ground Floor.</span>
            </p>

            <section className="mt-6 flex justify-center gap-6 flex-wrap text-center border-t pt-6">
                <p className="text-xs">
                    Quantity:{" "}
                    <span className="font-semibold underline cursor-not-allowed">
                        {orderQuantity}
                    </span>
                </p>
            </section>

            <DialogClose asChild>
                <Button variant="outline" className="mt-6" onClick={onClose}>
                    Close
                </Button>
            </DialogClose>
        </div>
    );
};

export default ConfirmedCheckout