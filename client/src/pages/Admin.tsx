import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Upload, BarChart3, Package, TrendingUp } from "lucide-react";
import type { Product } from "@shared/schema";

export default function Admin() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Product>>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("dashboard");

  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
    queryFn: async () => {
      const res = await fetch("/api/products");
      if (!res.ok) throw new Error("Failed to fetch products");
      return res.json();
    },
  });

  const { data: analytics } = useQuery({
    queryKey: ["/api/analytics"],
    queryFn: async () => {
      const res = await fetch("/api/analytics");
      if (!res.ok) throw new Error("Failed to fetch analytics");
      return res.json();
    },
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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result as string;
        setFormData({ ...formData, image: base64 });
        toast({ title: "✅ Image uploaded successfully!" });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = (product: Product) => {
    setEditingId(product.id);
    setFormData(product);
    setActiveTab("products");
  };

  const handleSave = () => {
    if (!editingId) return;
    updateMutation.mutate({ id: editingId, updates: formData });
  };

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalStock = products.reduce((sum, p) => sum + p.inStock, 0);
  const pnl = analytics ? (analytics.totalRevenue - analytics.totalCost) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-sage-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="font-serif text-4xl font-bold text-gray-900">The पहाड़ी Company</h1>
          <p className="text-gray-600">Admin Dashboard</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="products" className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              Products
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Analytics
            </TabsTrigger>
          </TabsList>

          {/* DASHBOARD TAB */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-600">Total Revenue</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-orange-700">
                    ₹{analytics?.totalRevenue?.toLocaleString("en-IN") || "0"}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-600">Total Orders</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-sage-700">
                    {analytics?.totalOrders || "0"}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-600">Profit & Loss</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className={`text-3xl font-bold ${pnl >= 0 ? "text-green-700" : "text-red-700"}`}>
                    ₹{pnl?.toLocaleString("en-IN") || "0"}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-600">Total Stock</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-700">
                    {totalStock}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  onClick={() => setActiveTab("products")}
                  className="w-full bg-orange-700 hover:bg-orange-800"
                >
                  Manage Products
                </Button>
                <Button 
                  onClick={() => setActiveTab("analytics")}
                  variant="outline"
                  className="w-full"
                >
                  View Full Analytics
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* PRODUCTS TAB */}
          <TabsContent value="products" className="space-y-6">
            <div className="flex gap-3 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search products by name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {isLoading && <p className="text-center text-lg text-gray-600">Loading products...</p>}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Products List */}
              <div className="lg:col-span-2 space-y-4">
                <h2 className="font-serif text-2xl font-bold">Products ({filteredProducts.length})</h2>
                {filteredProducts.map(product => (
                  <Card
                    key={product.id}
                    className={`cursor-pointer transition ${editingId === product.id ? "border-orange-500 border-2" : ""}`}
                  >
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start gap-4">
                        <div className="flex-1">
                          <h3 className="font-bold text-lg">{product.name}</h3>
                          <p className="text-sm text-muted-foreground">Price: ₹{product.price}</p>
                          <p className="text-sm text-muted-foreground">Stock: {product.inStock}</p>
                          <p className="text-sm text-muted-foreground">Category: {product.category}</p>
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
              {editingId && (
                <Card className="lg:col-span-1 sticky top-8 h-fit border-orange-500 border-2">
                  <CardHeader>
                    <CardTitle>Edit Product</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 max-h-96 overflow-y-auto">
                    <div>
                      <label className="text-sm font-semibold">Product Image</label>
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageUpload}
                        accept="image/*"
                        className="hidden"
                      />
                      <Button
                        onClick={() => fileInputRef.current?.click()}
                        variant="outline"
                        size="sm"
                        className="w-full mb-2 mt-1"
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Image
                      </Button>
                      {formData.image && (
                        <div className="text-xs text-green-600 mb-2">✓ Image uploaded</div>
                      )}
                    </div>

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
                      <label className="text-sm font-semibold">Category</label>
                      <Input
                        value={formData.category || ""}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
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
                        rows={3}
                      />
                    </div>

                    <div className="flex gap-2">
                      <Button
                        onClick={handleSave}
                        className="flex-1 bg-orange-700 hover:bg-orange-800"
                        disabled={updateMutation.isPending}
                      >
                        {updateMutation.isPending ? "Saving..." : "Save"}
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
          </TabsContent>

          {/* ANALYTICS TAB */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Overview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600">Total Revenue</p>
                    <p className="text-3xl font-bold text-orange-700">
                      ₹{analytics?.totalRevenue?.toLocaleString("en-IN") || "0"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Cost of Goods</p>
                    <p className="text-2xl font-bold text-red-600">
                      ₹{analytics?.totalCost?.toLocaleString("en-IN") || "0"}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Profitability</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600">Net Profit</p>
                    <p className={`text-3xl font-bold ${pnl >= 0 ? "text-green-700" : "text-red-700"}`}>
                      ₹{pnl?.toLocaleString("en-IN") || "0"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Profit Margin</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {analytics?.totalRevenue ? ((pnl / analytics.totalRevenue) * 100).toFixed(1) : "0"}%
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Product Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm"><span className="font-semibold">Total Products:</span> {products.length}</p>
                    <p className="text-sm"><span className="font-semibold">Total Stock:</span> {totalStock} units</p>
                    <p className="text-sm"><span className="font-semibold">Total Orders:</span> {analytics?.totalOrders || "0"}</p>
                    <p className="text-sm"><span className="font-semibold">Avg Order Value:</span> ₹{analytics?.totalOrders ? (analytics.totalRevenue / analytics.totalOrders).toFixed(0) : "0"}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
