import { useState } from "react";

const orders = [
  { id: 101, customer: "Ava Thompson", date: "2026-06-28", status: "shipped", total: 84.5 },
  { id: 102, customer: "Liam Chen", date: "2026-06-29", status: "pending", total: 32.0 },
  { id: 103, customer: "Sofia Martinez", date: "2026-06-29", status: "shipped", total: 129.99 },
  { id: 104, customer: "Noah Patel", date: "2026-06-30", status: "cancelled", total: 45.25 },
  { id: 105, customer: "Emma Rodriguez", date: "2026-07-01", status: "pending", total: 18.75 },
  { id: 106, customer: "Oliver Kim", date: "2026-07-01", status: "shipped", total: 76.4 },
  { id: 107, customer: "Isabella Nguyen", date: "2026-07-01", status: "delivered", total: 210.0 },
  { id: 108, customer: "Ethan Johnson", date: "2026-07-02", status: "pending", total: 9.99 },
  { id: 109, customer: "Mia Lopez", date: "2026-07-02", status: "cancelled", total: 60.0 },
  { id: 110, customer: "Lucas Brown", date: "2026-07-02", status: "delivered", total: 143.2 },
  { id: 111, customer: "Amelia Davis", date: "2026-07-03", status: "shipped", total: 52.3 },
  { id: 112, customer: "James Wilson", date: "2026-07-03", status: "pending", total: 27.15 },
];

const statusStyles = {
  shipped: "bg-blue-100 text-blue-700",
  pending: "bg-amber-100 text-amber-700",
  cancelled: "bg-red-100 text-red-700",
  delivered: "bg-green-100 text-green-700",
};

const filters = [
  { id: "all", label: "All" },
  { id: "shipped", label: "Shipped" },
  { id: "pending", label: "Pending" },
  { id: "delivered", label: "Delivered" },
  { id: "cancelled", label: "Cancelled" },
];

export default function OrderList() {
  const [selectedState, setSelectedState] = useState("all");

  const visibleOrders = orders.filter(
    (order) => selectedState === "all" || order.status === selectedState
  );

  const getFilterClasses = (filterId) =>
    `px-4 py-2 rounded-md text-sm font-medium transition-colors ${
      selectedState === filterId
        ? "bg-blue-600 text-white"
        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
    }`;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => (
          <button
            key={filter.id}
            className={getFilterClasses(filter.id)}
            onClick={() => setSelectedState(filter.id)}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div className="text-sm text-gray-500">
        Showing {visibleOrders.length} of {orders.length} orders
      </div>

      {visibleOrders.length > 0 ? (
        <ul className="flex flex-col gap-2">
          {visibleOrders.map((order) => (
            <li
              key={order.id}
              className="flex items-center justify-between gap-4 rounded-md border border-gray-200 bg-gray-50 p-4"
            >
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-gray-800">
                  Order #{order.id} — {order.customer}
                </span>
                <span className="text-xs text-gray-500">{order.date}</span>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${statusStyles[order.status]}`}
                >
                  {order.status}
                </span>
                <span className="w-16 text-right text-sm font-semibold text-gray-800">
                  ${order.total.toFixed(2)}
                </span>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="rounded-md border border-gray-200 bg-gray-50 p-4 text-sm text-gray-500">
          No orders match this filter.
        </p>
      )}
    </div>
  );
}
