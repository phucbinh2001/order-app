import { Order, OrderDetail } from "@/types/order";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IOrderStore {
  order: Partial<Order>;
  updateOrder: (newOrder: Order) => void;
  addToCard: (newOrderDetail: OrderDetail) => void;
  updateTableId: (tabledId: string) => void;
  deleteItem: (foodId: string) => void;
}

const useOrderStore = create<IOrderStore>()(
  persist(
    (set, get) => ({
      order: { orderDetails: [] },
      updateOrder: (newOrder: Order) => set({ order: newOrder }),
      updateTableId: (tableId: string) =>
        set((state) => ({ order: { ...state, tableId } })),
      deleteItem: (foodId: string) => {
        const order = get().order;
        if (order.orderDetails?.length) {
          // update orderDetails
          const findIndex = order.orderDetails?.findIndex(
            (item) => item.foodId == foodId
          );
          if (findIndex >= 0) {
            order.orderDetails.splice(findIndex, 1);
          }
          set({ order: { ...order } });
        }
      },

      addToCard: (newOrderDetail: OrderDetail) => {
        const order = { ...get().order };
        if (order.orderDetails?.length) {
          // update orderDetails
          const find = order.orderDetails?.find(
            (item) => item.foodId == newOrderDetail.foodId
          );
          if (find) {
            find.quantity += newOrderDetail.quantity;
          } else {
            order.orderDetails?.push({ ...newOrderDetail });
          }
          set({ order: { ...order } });
        } else {
          const newOrder = {
            tableId: order.tableId,
            orderDetails: [{ ...newOrderDetail }],
          };
          set({ order: newOrder });
        }
      },
    }),
    {
      name: "order-storage",
    }
  )
);

export default useOrderStore;
