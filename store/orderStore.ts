import { orderApi } from "@/api/order.api";
import { tableApi } from "@/api/table.api";
import { Order, OrderDetail } from "@/types/order";
import { Table } from "@/types/table";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IOrderStore {
  order: Partial<Order>;
  orders: Order[];
  tables: Table[];
  loadingOrders: boolean;
  visibleOrderDetailModal: boolean;
  visibleScan: boolean;
  selectedOrder: Order | undefined;
  fetchOrders: (query?: any) => void;
  fetchTables: () => void;
  updateOrder: (newOrder: Order) => void;
  addToCard: (newOrderDetail: OrderDetail) => void;
  updateTableId: (tabledId: string, sessionKey: string) => void;
  deleteItem: (foodId: string) => void;
  updateItemQuantity: (itemId: string, quantity: number) => void;
  setSelectedOrder: (order?: Order) => void;
  setVisibleOrderDetail: (visible: boolean) => void;
  setVisibleScan: (visible: boolean) => void;
  resetCart: () => void;
}

const useOrderStore = create<IOrderStore>()(
  persist(
    (set, get) => ({
      orders: [],
      tables: [],
      order: { orderDetails: [] },
      selectedOrder: undefined,
      loadingOrders: false,
      visibleScan: false,
      visibleOrderDetailModal: false,
      fetchOrders: async (query?: any) => {
        try {
          set(() => ({ loadingOrders: true }));
          const { data } = await orderApi.findAll(query);
          set(() => ({ orders: data }));
        } finally {
          set(() => ({ loadingOrders: false }));
        }
      },
      fetchTables: async () => {
        try {
          const { data } = await tableApi.findAll();
          set(() => ({ tables: data }));
        } finally {
        }
      },
      updateOrder: (newOrder: Order) => {
        set({ order: newOrder });
      },
      setVisibleOrderDetail: (isVisible: boolean) => {
        set({ visibleOrderDetailModal: isVisible });
      },
      setVisibleScan: (isVisible: boolean) => {
        set({ visibleScan: isVisible });
      },
      setSelectedOrder: (newOrder?: Order) => {
        set({ selectedOrder: newOrder });
      },
      updateTableId: (tableId: string, sessionKey: string) => {
        set((state) => ({ order: { ...state.order, tableId, sessionKey } }));
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

      resetCart: () => {
        set((state) => ({
          order: {
            orderDetails: [],
            tableId: state.order.tableId,
            sessionKey: state.order.sessionKey,
          },
        }));
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
            sessionKey: order.sessionKey,
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
