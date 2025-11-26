import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import type { Product } from "@shared/schema";

export default function Admin() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Product>>({});

  const { data: products = [] } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const updateMutation = useMutation({
    mutationFn: async (data: { id: string; updates: Partial<Product> }) => {
      const res = await fetch(`/api/products/${data.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data.updates),
      });
      if (!res.ok) throw new Error(await res.text());
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/products"] });
      setEditingId(null);
      setFormData({});
      toast({ title: "✅ Product updated successfully!" });
    },
    onError: () => {
      toast({ title: "❌ Error updating product", variant: "destructive" });
    },
  });

  const handleEdit = (product: Product) => {
    setEditingId(product.id);
    setFormData(product);
  };

  const handleSave = () => {
    if (!editingId) return;
    updateMutation.mutate({ id: editingId, updates: formData });
  };

  const editProduct = editingId ? products.find(p => p.id === editingId) : null;

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="font-serif text-4xl font-bold mb-8">Admin Portal</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Products List */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="font-serif text-2xl font-bold mb-4">Products</h2>
            {products.map(product => (
              <Card
                key={product.id}
                className={editingId === product.id ? "border-orange-500 border-2" : ""}
              >
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <h3 className="font-bold text-lg">{product.name}</h3>
                      <p className="text-sm text-muted-foreground">Price: ₹{product.price}</p>
                      <p className="text-sm text-muted-foreground">Stock: {product.inStock}</p>
                    </div>
                    <Button
                      onClick={() => handleEdit(product)}
                      variant={editingId === product.id ? "default" : "outline"}
                      size="sm"
                    >
                      {editingId === product.id ? "Editing..." : "Edit"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Edit Form */}
          {editingId && editProduct && (
            <Card className="lg:col-span-1 sticky top-8 h-fit border-orange-500 border-2">
              <CardHeader>
                <CardTitle>Edit Product</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-semibold">Product Name</label>
                  <Input
                    value={formData.name || ""}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold">Price (₹)</label>
                  <Input
                    type="number"
                    step="0.01"
                    value={formData.price || ""}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold">Image Path</label>
                  <Input
                    value={formData.image || ""}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="/generated_images/..."
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold">Weight/Size</label>
                  <Input
                    value={formData.weight || ""}
                    onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold">Stock</label>
                  <Input
                    type="number"
                    value={formData.inStock || ""}
                    onChange={(e) => setFormData({ ...formData, inStock: parseInt(e.target.value) })}
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold">Tagline</label>
                  <Input
                    value={formData.tagline || ""}
                    onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold">Description</label>
                  <Textarea
                    value={formData.description || ""}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={4}
                  />
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={handleSave}
                    className="flex-1 bg-orange-700 hover:bg-orange-800"
                    disabled={updateMutation.isPending}
                  >
                    {updateMutation.isPending ? "Saving..." : "Save Changes"}
                  </Button>
                  <Button
                    onClick={() => {
                      setEditingId(null);
                      setFormData({});
                    }}
                    variant="outline"
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Info Box */}
        {!editingId && (
          <div className="mt-8 p-6 bg-orange-50 rounded-lg">
            <h3 className="font-bold text-lg mb-2">How to Use This Admin Portal:</h3>
            <ul className="space-y-2 text-sm">
              <li>✅ Click "Edit" on any product to modify it</li>
              <li>✅ Change price, name, image path, stock, weight, description, or tagline</li>
              <li>✅ Click "Save Changes" to update your store instantly</li>
              <li>✅ Image paths: Use "/generated_images/..." or "/attached_assets/..."</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
