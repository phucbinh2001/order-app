import { orderApi } from "@/api/order.api";
import { Order, OrderDetail } from "@/types/order";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IOrderStore {
  order: Partial<Order>;
  orders: Order[];
  selectedOrder: Order | undefined;
  fetchOrders: () => void;
  updateOrder: (newOrder: Order) => void;
  addToCard: (newOrderDetail: OrderDetail) => void;
  updateTableId: (tabledId: string) => void;
  deleteItem: (foodId: string) => void;
  updateItemQuantity: (itemId: string, quantity: number) => void;
  setSelectedOrder: (order: Order) => void;
  resetCard: () => void;
}

const useOrderStore = create<IOrderStore>()(
  persist(
    (set, get) => ({
      orders: [],
      order: { orderDetails: [] },
      selectedOrder: undefined,
      fetchOrders: async () => {
        const { data } = await orderApi.findAll();
        set(() => ({ orders: data }));
      },
      updateOrder: (newOrder: Order) => {
        set({ order: newOrder });
      },
      setSelectedOrder: (newOrder: Order) => {
        set({ selectedOrder: newOrder });
      },
      updateTableId: (tableId: string) => {
        set((state) => ({ order: { ...state.order, tableId } }));
      },
      updateItemQuantity: (itemId: string, newQuantity: number) => {
        const order = get().order;
        const find = order.orderDetails?.find((item) => item.foodId == itemId);
        if (find) {
          find.quantity = newQuantity;
        }
        set({ order: { ...order } });
      },
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

      resetCard: () => {
        set({ order: { orderDetails: [] } });
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
