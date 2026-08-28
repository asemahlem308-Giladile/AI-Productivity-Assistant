import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle, ArrowDownCircle, ArrowUpCircle } from "lucide-react";
import { useState } from "react";

import { PageHeader } from "@/components/PageHeader";
import { KpiCard } from "@/components/KpiCard";
import { AiTool } from "@/components/AiTool";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { inventoryItems, type InventoryItem } from "@/lib/sample-data";

export const Route = createFileRoute("/_app/inventory")({
  head: () => ({
    meta: [
      { title: "Inventory Management | InduTech Solutions" },
      {
        name: "description",
        content:
          "Track stock levels, receipts, issues, minimum levels and low-stock alerts with AI recommendations for inventory problems.",
      },
      { property: "og:title", content: "Inventory Management | InduTech Solutions" },
      {
        property: "og:description",
        content: "Digital stock visibility with low-stock alerts and AI inventory recommendations.",
      },
    ],
  }),
  component: Inventory,
});

function Inventory() {
  const [items, setItems] = useState<InventoryItem[]>(inventoryItems);
  const [movement, setMovement] = useState({ id: inventoryItems[0]!.id, qty: "", type: "received" });
  const [newItem, setNewItem] = useState({ name: "", category: "Raw Material", unit: "units", stock: "", minimum: "" });

  const low = items.filter((i) => i.stock < i.minimum);

  const applyMovement = (e: React.FormEvent) => {
    e.preventDefault();
    const qty = Number(movement.qty);
    if (!qty) return;
    setItems((prev) =>
      prev.map((i) =>
        i.id === movement.id
          ? movement.type === "received"
            ? { ...i, stock: i.stock + qty, received: i.received + qty }
            : { ...i, stock: Math.max(i.stock - qty, 0), issued: i.issued + qty }
          : i,
      ),
    );
    setMovement({ ...movement, qty: "" });
  };

  const addItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.name) return;
    setItems((prev) => [
      ...prev,
      {
        id: `INV-${String(prev.length + 1).padStart(2, "0")}`,
        name: newItem.name,
        category: newItem.category,
        unit: newItem.unit,
        stock: Number(newItem.stock) || 0,
        minimum: Number(newItem.minimum) || 0,
        received: Number(newItem.stock) || 0,
        issued: 0,
      },
    ]);
    setNewItem({ name: "", category: "Raw Material", unit: "units", stock: "", minimum: "" });
  };

  return (
    <>
      <PageHeader
        eyebrow="Operations"
        title="Inventory Management"
        description="Record receipts and issues, monitor minimum stock levels and act on low-stock alerts before they stop production."
      />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard label="Tracked items" value={items.length} />
        <KpiCard label="Low stock items" value={low.length} delta={low.length} goodDirection="down" />
        <KpiCard label="Total receipts" value={items.reduce((s, i) => s + i.received, 0).toLocaleString()} />
        <KpiCard label="Total issues" value={items.reduce((s, i) => s + i.issued, 0).toLocaleString()} />
      </div>

      {low.length > 0 && (
        <div className="space-y-2">
          {low.map((i) => (
            <div
              key={i.id}
              className="flex items-start gap-3 rounded-lg border border-destructive/40 bg-destructive/10 p-3"
            >
              <AlertTriangle className="mt-0.5 size-4 shrink-0 text-destructive" />
              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-destructive">Low stock</p>
                <p className="text-sm">
                  {i.name} has reached its minimum stock level ({i.stock} / {i.minimum} {i.unit}).
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,320px)]">
        <section className="rounded-xl border border-border bg-card p-5 shadow-panel">
          <h2 className="font-display text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            Current stock
          </h2>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-xs">
              <thead className="text-muted-foreground">
                <tr className="border-b border-border">
                  {["Code", "Item", "Category", "Stock", "Min", "Received", "Issued", "Status"].map((h) => (
                    <th key={h} className="pb-2 font-medium">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {items.map((i) => (
                  <tr key={i.id} className="border-b border-border/50">
                    <td className="py-2 font-mono text-[11px] text-muted-foreground">{i.id}</td>
                    <td className="py-2">{i.name}</td>
                    <td className="py-2 text-muted-foreground">{i.category}</td>
                    <td className="py-2 tabular-nums">
                      {i.stock} {i.unit}
                    </td>
                    <td className="py-2 tabular-nums">{i.minimum}</td>
                    <td className="py-2 tabular-nums">{i.received}</td>
                    <td className="py-2 tabular-nums">{i.issued}</td>
                    <td className="py-2">
                      <span
                        className={
                          i.stock < i.minimum
                            ? "rounded-full bg-destructive/15 px-2 py-0.5 text-[10px] text-destructive"
                            : i.stock < i.minimum * 1.3
                              ? "rounded-full bg-warning/15 px-2 py-0.5 text-[10px] text-warning"
                              : "rounded-full bg-success/15 px-2 py-0.5 text-[10px] text-success"
                        }
                      >
                        {i.stock < i.minimum ? "Low" : i.stock < i.minimum * 1.3 ? "Watch" : "OK"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <div className="space-y-4">
          <form onSubmit={applyMovement} className="rounded-xl border border-border bg-card p-5 shadow-panel">
            <h2 className="font-display text-base font-semibold">Record stock movement</h2>
            <div className="mt-3 grid gap-3">
              <select
                value={movement.id}
                onChange={(e) => setMovement({ ...movement, id: e.target.value })}
                className="h-9 rounded-md border border-input bg-secondary/40 px-3 text-sm"
              >
                {items.map((i) => (
                  <option key={i.id} value={i.id}>
                    {i.name}
                  </option>
                ))}
              </select>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant={movement.type === "received" ? "default" : "outline"}
                  className="flex-1"
                  onClick={() => setMovement({ ...movement, type: "received" })}
                >
                  <ArrowDownCircle /> Received
                </Button>
                <Button
                  type="button"
                  variant={movement.type === "issued" ? "default" : "outline"}
                  className="flex-1"
                  onClick={() => setMovement({ ...movement, type: "issued" })}
                >
                  <ArrowUpCircle /> Issued
                </Button>
              </div>
              <Input
                type="number"
                placeholder="Quantity"
                value={movement.qty}
                onChange={(e) => setMovement({ ...movement, qty: e.target.value })}
                className="bg-secondary/40"
              />
              <Button type="submit">Apply movement</Button>
            </div>
          </form>

          <form onSubmit={addItem} className="rounded-xl border border-border bg-card p-5 shadow-panel">
            <h2 className="font-display text-base font-semibold">Add inventory item</h2>
            <div className="mt-3 grid gap-2.5">
              {(
                [
                  ["name", "Item name", "text"],
                  ["category", "Category", "text"],
                  ["unit", "Unit", "text"],
                  ["stock", "Opening stock", "number"],
                  ["minimum", "Minimum level", "number"],
                ] as const
              ).map(([key, label, type]) => (
                <div key={key} className="grid gap-1">
                  <Label className="text-xs text-muted-foreground">{label}</Label>
                  <Input
                    type={type}
                    value={newItem[key]}
                    onChange={(e) => setNewItem({ ...newItem, [key]: e.target.value })}
                    className="bg-secondary/40"
                  />
                </div>
              ))}
              <Button type="submit" variant="outline">
                Add item
              </Button>
            </div>
          </form>
        </div>
      </div>

      <AiTool
        mode="inventory"
        title="AI inventory recommendations"
        description="Ask InduTech AI about stock risks, reorder priorities and the operational impact of current inventory levels."
        placeholder="e.g. Which inventory items put production at risk this week and what should we do first?"
        examples={[
          "Which items put production at risk this week?",
          "How should we prioritise reordering?",
          "What could be causing repeated low stock on Raw Material A?",
        ]}
        context={JSON.stringify(items, null, 1)}
      />
    </>
  );
}
