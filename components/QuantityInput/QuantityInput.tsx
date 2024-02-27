import { FaMinus, FaPlus } from "react-icons/fa6";

const QuantityInput = ({
  quantity,
  onQuantityChange,
}: {
  quantity: number;
  onQuantityChange: (value: number) => void;
}) => {
  return (
    <div className="flex items-center">
      <div
        className="size-10 border rounded-md flex items-center justify-center"
        onClick={() => {
          const newQuantity = quantity - 1;
          onQuantityChange(newQuantity);
        }}
      >
        <FaMinus className="text-[#e86a12] text-lg" />
      </div>

      <input
        type="number"
        onChange={(e) => {
          const quantity = Number(e.target.value);
          onQuantityChange(quantity);
        }}
        className="w-[45px] text-center font-semibold text-lg max-w-[100px]"
        value={quantity}
      />
      <div
        onClick={() => {
          const newQuantity = quantity + 1;
          onQuantityChange(newQuantity);
        }}
        className="size-10 border rounded-md flex items-center justify-center"
      >
        <FaPlus className="text-[#e86a12] text-lg" />
      </div>
    </div>
  );
};

export default QuantityInput;
