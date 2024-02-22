import { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";

const QuantityInput = () => {
  const [quantity, setQuantity] = useState<number>(1);
  return (
    <div className="flex items-center">
      <div
        className="size-10 border rounded-md flex items-center justify-center"
        onClick={() => setQuantity((quantity) => quantity - 1)}
      >
        <FaMinus className="text-[#e86a12] text-lg" />
      </div>

      <input
        type="number"
        onChange={(e) => setQuantity(Number(e.target.value))}
        className="w-[60px] text-center font-semibold text-lg max-w-[100px]"
        value={quantity}
      />
      <div
        onClick={() => setQuantity((quantity) => quantity + 1)}
        className="size-10 border rounded-md flex items-center justify-center"
      >
        <FaPlus className="text-[#e86a12] text-lg" />
      </div>
    </div>
  );
};

export default QuantityInput;
