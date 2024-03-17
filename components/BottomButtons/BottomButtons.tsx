import Link from "next/link";
import { FaReceipt } from "react-icons/fa6";
import { CartBottomSheet } from "../CartBottomSheet/CartBottomSheet";
import useOrderStore from "@/store/orderStore";

const BottomButtons = () => {
  const tableId = useOrderStore((state) => state.order.tableId);

  if (!tableId) return <></>;
  return (
    <div className="fixed bottom-0 h-fit bg-white border-t w-full flex p-3 gap-3 pb-10 max-w-[500px]">
      <Link href={"/order-detail"}>
        <div className="py-4 px-5 bg-orange-100 rounded-lg flex items-center h-full max-h-[56px]">
          <FaReceipt className="text-orange-500" />
        </div>
      </Link>

      <CartBottomSheet />
    </div>
  );
};

export default BottomButtons;
