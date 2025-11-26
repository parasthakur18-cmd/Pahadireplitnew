import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search, Upload, BarChart3, Package, TrendingUp, AlertCircle,
  Users, ShoppingCart, Eye, Edit2, Trash2, Plus, Settings, Home, X
} from "lucide-react";
import type { Product } from "@shared/schema";

export default function Admin() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [activeTab, setActiveTab] = useState("dashboard");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Product>>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProductData, setNewProductData] = useState<Partial<Product>>({
    name: "",
    price: "0",
    category: "featured",
    tagline: "",
    weight: "500g",
    inStock: 0,
    description: "",
    image: "/generated_images/placeholder.png"
  });
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Fetch Products
  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
    queryFn: async () => {
      const res = await fetch("/api/products");
      if (!res.ok) throw new Error("Failed to fetch products");
      return res.json();
    },
  });

  // Fetch Analytics
  const { data: analytics } = useQuery({
    queryKey: ["/api/analytics"],
    queryFn: async () => {
      const res = await fetch("/api/analytics");
      if (!res.ok) throw new Error("Failed to fetch analytics");
      return res.json();
    },
  });

  // Update Product Mutation
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
      toast({ title: "✅ Product updated!" });
    },
    onError: () => {
      toast({ title: "❌ Error updating product", variant: "destructive" });
    },
  });

  // Create Product Mutation
  const createMutation = useMutation({
    mutationFn: async (data: Partial<Product>) => {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(await res.text());
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/products"] });
      setShowAddModal(false);
      setNewProductData({
        name: "",
        price: "0",
        category: "featured",
        tagline: "",
        weight: "500g",
        inStock: 0,
        description: "",
        image: "/generated_images/placeholder.png"
      });
      toast({ title: "✅ Product created successfully!" });
    },
    onError: () => {
      toast({ title: "❌ Error creating product", variant: "destructive" });
    },
  });

  // Delete Product Mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error(await res.text());
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/products"] });
      setDeleteConfirmId(null);
      toast({ title: "✅ Product deleted!" });
    },
    onError: () => {
      toast({ title: "❌ Error deleting product", variant: "destructive" });
    },
  });

  // Image Upload Handler
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, isNew = false) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result as string;
        if (isNew) {
          setNewProductData({ ...newProductData, image: base64 });
        } else {
          setFormData({ ...formData, image: base64 });
        }
        toast({ title: "✅ Image uploaded!" });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = (product: Product) => {
    setEditingId(product.id);
    setFormData(product);
  };

  const handleSave = () => {
    if (!editingId) return;
    updateMutation.mutate({ id: editingId, updates: formData });
  };

  const handleCreateProduct = () => {
    if (!newProductData.name) {
      toast({ title: "⚠️ Please enter product name", variant: "destructive" });
      return;
    }
    createMutation.mutate(newProductData);
  };

  // Calculate Metrics
  const totalRevenue = analytics?.totalRevenue || 0;
  const totalOrders = analytics?.totalOrders || 0;
  const totalCost = analytics?.totalCost || 0;
  const profit = totalRevenue - totalCost;
  const profitMargin = totalRevenue ? ((profit / totalRevenue) * 100).toFixed(1) : "0";
  const totalStock = products.reduce((sum, p) => sum + p.inStock, 0);
  const lowStockProducts = products.filter(p => p.inStock <= 10);
  const totalCategories = new Set(products.map(p => p.category)).size;

  // Filter Products
  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.slug.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "all" || p.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedByStock = [...products].sort((a, b) => a.inStock - b.inStock);
  const topProducts = [...products].sort((a, b) => parseFloat(b.price) - parseFloat(a.price)).slice(0, 5);
  const categories = Array.from(new Set(products.map(p => p.category)));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="font-serif text-2xl font-bold text-gray-900">पहाड़ी Admin</h1>
            <p className="text-sm text-gray-600">E-Commerce Management System</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">Welcome, Admin</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          {/* Navigation Tabs */}
          <TabsList className="grid w-full grid-cols-5 mb-8 bg-white border border-gray-200">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="products" className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              <span className="hidden sm:inline">Products</span>
            </TabsTrigger>
            <TabsTrigger value="inventory" className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Inventory</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              <span className="hidden sm:inline">Analytics</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Settings</span>
            </TabsTrigger>
          </TabsList>

          {/* DASHBOARD TAB */}
          <TabsContent value="dashboard" className="space-y-6">
            {/* Top Metrics Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="bg-white">
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Total Revenue</p>
                      <p className="text-2xl font-bold text-gray-900 mt-2">₹{totalRevenue.toLocaleString("en-IN")}</p>
                      <p className="text-xs text-green-600 mt-1">+12% from last month</p>
                    </div>
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <TrendingUp className="w-5 h-5 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white">
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Total Orders</p>
                      <p className="text-2xl font-bold text-gray-900 mt-2">{totalOrders}</p>
                      <p className="text-xs text-gray-500 mt-1">This period</p>
                    </div>
                    <div className="bg-green-100 p-3 rounded-lg">
                      <ShoppingCart className="w-5 h-5 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white">
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Net Profit</p>
                      <p className={`text-2xl font-bold mt-2 ${profit >= 0 ? "text-green-600" : "text-red-600"}`}>
                        ₹{profit.toLocaleString("en-IN")}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">{profitMargin}% margin</p>
                    </div>
                    <div className={`p-3 rounded-lg ${profit >= 0 ? "bg-green-100" : "bg-red-100"}`}>
                      <TrendingUp className={`w-5 h-5 ${profit >= 0 ? "text-green-600" : "text-red-600"}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white">
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Total Products</p>
                      <p className="text-2xl font-bold text-gray-900 mt-2">{products.length}</p>
                      <p className="text-xs text-gray-500 mt-1">{totalCategories} categories</p>
                    </div>
                    <div className="bg-purple-100 p-3 rounded-lg">
                      <Package className="w-5 h-5 text-purple-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Dashboard Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Top Products */}
              <Card className="lg:col-span-2 bg-white">
                <CardHeader className="border-b">
                  <CardTitle className="text-lg">Top Products by Price</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-3">
                    {topProducts.map((product, idx) => (
                      <div key={product.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-bold text-gray-400 w-6">{idx + 1}</span>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{product.name}</p>
                            <p className="text-xs text-gray-500">{product.category}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-gray-900">₹{product.price}</p>
                          <p className="text-xs text-gray-500">{product.inStock} in stock</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card className="bg-white">
                <CardHeader className="border-b">
                  <CardTitle className="text-lg">Quick Stats</CardTitle>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-xs text-blue-600 font-medium">Total Stock</p>
                    <p className="text-2xl font-bold text-blue-900 mt-1">{totalStock}</p>
                  </div>
                  <div className="p-3 bg-orange-50 rounded-lg">
                    <p className="text-xs text-orange-600 font-medium">Low Stock Items</p>
                    <p className="text-2xl font-bold text-orange-900 mt-1">{lowStockProducts.length}</p>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <p className="text-xs text-purple-600 font-medium">Avg Order Value</p>
                    <p className="text-2xl font-bold text-purple-900 mt-1">
                      ₹{totalOrders ? (totalRevenue / totalOrders).toFixed(0) : "0"}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Low Stock Alert */}
            {lowStockProducts.length > 0 && (
              <Card className="bg-yellow-50 border-yellow-200">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2 text-yellow-900">
                    <AlertCircle className="w-5 h-5" />
                    Low Stock Alert
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-yellow-800 mb-3">
                    {lowStockProducts.length} products have 10 or fewer items in stock.
                  </p>
                  <div className="space-y-2">
                    {lowStockProducts.map(p => (
                      <div key={p.id} className="text-sm text-yellow-700 flex items-center justify-between">
                        <span>{p.name}</span>
                        <span className="font-semibold">{p.inStock} left</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* PRODUCTS TAB */}
          <TabsContent value="products" className="space-y-6">
            {/* Search, Filter & Add Button */}
            <div className="flex gap-3 flex-col sm:flex-row">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search by product name or ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md bg-white text-sm"
              >
                <option value="all">All Categories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <Button
                onClick={() => setShowAddModal(true)}
                className="bg-green-700 hover:bg-green-800 flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Product
              </Button>
            </div>

            {isLoading && <p className="text-center text-gray-600">Loading products...</p>}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Products List */}
              <div className="lg:col-span-2 space-y-3">
                <h2 className="font-serif text-xl font-bold mb-4">
                  Products ({filteredProducts.length})
                </h2>
                {filteredProducts.length === 0 ? (
                  <Card className="bg-gray-50">
                    <CardContent className="pt-6 text-center text-gray-500">
                      No products found
                    </CardContent>
                  </Card>
                ) : (
                  filteredProducts.map(product => (
                    <Card
                      key={product.id}
                      className={`bg-white transition cursor-pointer hover:shadow-md ${
                        editingId === product.id ? "border-2 border-orange-500" : ""
                      }`}
                    >
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between gap-4">
                          {product.image && (
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-16 h-16 object-cover rounded-lg"
                              onError={(e) => {
                                e.currentTarget.style.display = "none";
                              }}
                            />
                          )}
                          <div className="flex-1">
                            <h3 className="font-bold text-gray-900">{product.name}</h3>
                            <p className="text-sm text-gray-600 mb-2">{product.tagline}</p>
                            <div className="grid grid-cols-3 gap-3 text-sm">
                              <div>
                                <p className="text-gray-500">Price</p>
                                <p className="font-semibold text-gray-900">₹{product.price}</p>
                              </div>
                              <div>
                                <p className="text-gray-500">Stock</p>
                                <p className={`font-semibold ${
                                  product.inStock > 20 ? "text-green-600" :
                                  product.inStock > 10 ? "text-orange-600" :
                                  "text-red-600"
                                }`}>
                                  {product.inStock}
                                </p>
                              </div>
                              <div>
                                <p className="text-gray-500">Category</p>
                                <p className="font-semibold text-gray-900">{product.category}</p>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col gap-2 shrink-0">
                            <Button
                              onClick={() => handleEdit(product)}
                              variant={editingId === product.id ? "default" : "outline"}
                              size="sm"
                            >
                              <Edit2 className="w-4 h-4" />
                            </Button>
                            {deleteConfirmId === product.id ? (
                              <div className="flex gap-1">
                                <Button
                                  onClick={() => deleteMutation.mutate(product.id)}
                                  size="sm"
                                  className="bg-red-600 hover:bg-red-700 h-8"
                                  disabled={deleteMutation.isPending}
                                >
                                  Confirm
                                </Button>
                                <Button
                                  onClick={() => setDeleteConfirmId(null)}
                                  variant="outline"
                                  size="sm"
                                  className="h-8"
                                >
                                  Cancel
                                </Button>
                              </div>
                            ) : (
                              <Button
                                onClick={() => setDeleteConfirmId(product.id)}
                                variant="outline"
                                size="sm"
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>

              {/* Edit Form */}
              {editingId && (
                <Card className="lg:col-span-1 sticky top-24 h-fit border-2 border-orange-500 bg-white">
                  <CardHeader className="bg-orange-50 border-b">
                    <CardTitle className="text-base">Edit Product</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6 space-y-4 max-h-96 overflow-y-auto">
                    {/* Image Upload */}
                    <div>
                      <label className="text-sm font-semibold text-gray-700 block mb-2">Product Image</label>
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={(e) => handleImageUpload(e, false)}
                        accept="image/*"
                        className="hidden"
                      />
                      <Button
                        onClick={() => fileInputRef.current?.click()}
                        variant="outline"
                        size="sm"
                        className="w-full mb-2"
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Image
                      </Button>
                      {formData.image && !formData.image.startsWith("/") && (
                        <p className="text-xs text-green-600 font-medium">✓ Image ready</p>
                      )}
                    </div>

                    <div>
                      <label className="text-sm font-semibold text-gray-700">Product Name</label>
                      <Input
                        value={formData.name || ""}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-semibold text-gray-700">Price (₹)</label>
                      <Input
                        type="number"
                        step="0.01"
                        value={formData.price || ""}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-semibold text-gray-700">Stock</label>
                      <Input
                        type="number"
                        value={formData.inStock || ""}
                        onChange={(e) => setFormData({ ...formData, inStock: parseInt(e.target.value) })}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-semibold text-gray-700">Weight/Size</label>
                      <Input
                        value={formData.weight || ""}
                        onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-semibold text-gray-700">Category</label>
                      <Input
                        value={formData.category || ""}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-semibold text-gray-700">Tagline</label>
                      <Input
                        value={formData.tagline || ""}
                        onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-semibold text-gray-700">Description</label>
                      <Textarea
                        value={formData.description || ""}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        rows={2}
                        className="mt-1"
                      />
                    </div>

                    <div className="flex gap-2 pt-2">
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

          {/* ADD PRODUCT MODAL */}
          {showAddModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <Card className="w-full max-w-2xl max-h-96 overflow-y-auto">
                <CardHeader className="flex flex-row items-center justify-between bg-green-50 border-b">
                  <CardTitle>Add New Product</CardTitle>
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                  <div>
                    <label className="text-sm font-semibold text-gray-700 block mb-2">Product Image</label>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={(e) => handleImageUpload(e, true)}
                      accept="image/*"
                      className="hidden"
                      id="new-product-image"
                    />
                    <Button
                      onClick={() => document.getElementById("new-product-image")?.click()}
                      variant="outline"
                      size="sm"
                      className="w-full mb-2"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Image
                    </Button>
                    {newProductData.image && !newProductData.image.includes("placeholder") && (
                      <p className="text-xs text-green-600 font-medium">✓ Image ready</p>
                    )}
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-gray-700">Product Name *</label>
                    <Input
                      value={newProductData.name || ""}
                      onChange={(e) => setNewProductData({ ...newProductData, name: e.target.value })}
                      placeholder="e.g., Organic Tea Blend"
                      className="mt-1"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-sm font-semibold text-gray-700">Price (₹)</label>
                      <Input
                        type="number"
                        step="0.01"
                        value={newProductData.price || ""}
                        onChange={(e) => setNewProductData({ ...newProductData, price: e.target.value })}
                        placeholder="299.00"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-gray-700">Stock</label>
                      <Input
                        type="number"
                        value={newProductData.inStock || ""}
                        onChange={(e) => setNewProductData({ ...newProductData, inStock: parseInt(e.target.value) || 0 })}
                        placeholder="50"
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-sm font-semibold text-gray-700">Category</label>
                      <Input
                        value={newProductData.category || ""}
                        onChange={(e) => setNewProductData({ ...newProductData, category: e.target.value })}
                        placeholder="tea"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-gray-700">Weight/Size</label>
                      <Input
                        value={newProductData.weight || ""}
                        onChange={(e) => setNewProductData({ ...newProductData, weight: e.target.value })}
                        placeholder="500g"
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-gray-700">Tagline</label>
                    <Input
                      value={newProductData.tagline || ""}
                      onChange={(e) => setNewProductData({ ...newProductData, tagline: e.target.value })}
                      placeholder="Short catchy description"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-gray-700">Description</label>
                    <Textarea
                      value={newProductData.description || ""}
                      onChange={(e) => setNewProductData({ ...newProductData, description: e.target.value })}
                      placeholder="Detailed product description..."
                      rows={2}
                      className="mt-1"
                    />
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button
                      onClick={handleCreateProduct}
                      className="flex-1 bg-green-700 hover:bg-green-800"
                      disabled={createMutation.isPending}
                    >
                      {createMutation.isPending ? "Creating..." : "Create Product"}
                    </Button>
                    <Button
                      onClick={() => setShowAddModal(false)}
                      variant="outline"
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* INVENTORY TAB */}
          <TabsContent value="inventory" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Card>
                <CardContent className="pt-6">
                  <p className="text-sm text-gray-500">Total Stock</p>
                  <p className="text-3xl font-bold text-gray-900">{totalStock}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <p className="text-sm text-gray-500">Low Stock Items</p>
                  <p className="text-3xl font-bold text-red-600">{lowStockProducts.length}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <p className="text-sm text-gray-500">Avg Stock per Product</p>
                  <p className="text-3xl font-bold text-blue-600">
                    {products.length ? (totalStock / products.length).toFixed(0) : "0"}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Stock Level Table */}
            <Card className="bg-white">
              <CardHeader className="border-b">
                <CardTitle>Stock Levels</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="border-b">
                      <tr>
                        <th className="text-left py-2 px-2 font-semibold text-gray-700">Product</th>
                        <th className="text-right py-2 px-2 font-semibold text-gray-700">Stock</th>
                        <th className="text-center py-2 px-2 font-semibold text-gray-700">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sortedByStock.map(product => (
                        <tr key={product.id} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-2 text-gray-900 font-medium">{product.name}</td>
                          <td className="py-3 px-2 text-right font-semibold text-gray-900">
                            {product.inStock}
                          </td>
                          <td className="py-3 px-2">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              product.inStock > 20 ? "bg-green-100 text-green-700" :
                              product.inStock > 10 ? "bg-orange-100 text-orange-700" :
                              "bg-red-100 text-red-700"
                            }`}>
                              {product.inStock > 20 ? "Adequate" : product.inStock > 10 ? "Low" : "Critical"}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ANALYTICS TAB */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-white">
                <CardHeader className="border-b">
                  <CardTitle>Revenue Metrics</CardTitle>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-600 font-medium">Total Revenue</p>
                    <p className="text-3xl font-bold text-blue-900 mt-2">
                      ₹{totalRevenue.toLocaleString("en-IN")}
                    </p>
                  </div>
                  <div className="p-4 bg-gray-100 rounded-lg">
                    <p className="text-sm text-gray-600 font-medium">Cost of Goods</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">
                      ₹{totalCost.toLocaleString("en-IN")}
                    </p>
                  </div>
                  <div className={`p-4 rounded-lg ${profit >= 0 ? "bg-green-50" : "bg-red-50"}`}>
                    <p className={`text-sm font-medium ${profit >= 0 ? "text-green-600" : "text-red-600"}`}>
                      Net Profit
                    </p>
                    <p className={`text-3xl font-bold mt-2 ${profit >= 0 ? "text-green-900" : "text-red-900"}`}>
                      ₹{profit.toLocaleString("en-IN")}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white">
                <CardHeader className="border-b">
                  <CardTitle>Performance</CardTitle>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <p className="text-sm text-purple-600 font-medium">Profit Margin</p>
                    <p className="text-3xl font-bold text-purple-900 mt-2">{profitMargin}%</p>
                  </div>
                  <div className="p-4 bg-indigo-50 rounded-lg">
                    <p className="text-sm text-indigo-600 font-medium">Total Orders</p>
                    <p className="text-3xl font-bold text-indigo-900 mt-2">{totalOrders}</p>
                  </div>
                  <div className="p-4 bg-cyan-50 rounded-lg">
                    <p className="text-sm text-cyan-600 font-medium">Avg Order Value</p>
                    <p className="text-3xl font-bold text-cyan-900 mt-2">
                      ₹{totalOrders ? (totalRevenue / totalOrders).toFixed(0) : "0"}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Product Breakdown */}
            <Card className="bg-white">
              <CardHeader className="border-b">
                <CardTitle>Product Performance</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  {products.map(product => (
                    <div key={product.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                      <div>
                        <p className="font-medium text-gray-900">{product.name}</p>
                        <p className="text-xs text-gray-500">{product.category}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">₹{product.price}</p>
                        <p className="text-xs text-gray-500">{product.inStock} units</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* SETTINGS TAB */}
          <TabsContent value="settings" className="space-y-6">
            <Card className="bg-white">
              <CardHeader className="border-b">
                <CardTitle>Store Settings</CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div>
                  <label className="text-sm font-semibold text-gray-700">Store Name</label>
                  <Input defaultValue="The पहाड़ी Company" className="mt-1" />
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700">WhatsApp Contact</label>
                  <Input defaultValue="+91 90019 49260" className="mt-1" />
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700">Email</label>
                  <Input defaultValue="contact@pahadi.com" type="email" className="mt-1" />
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700">Currency</label>
                  <Input defaultValue="INR (₹)" className="mt-1" />
                </div>
                <Button className="w-full bg-orange-700 hover:bg-orange-800">Save Settings</Button>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardHeader className="border-b">
                <CardTitle>Business Information</CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-600 font-medium mb-2">Total Products</p>
                  <p className="text-2xl font-bold text-blue-900">{products.length}</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-green-600 font-medium mb-2">Total Inventory Value</p>
                  <p className="text-2xl font-bold text-green-900">
                    ₹{products.reduce((sum, p) => sum + (parseFloat(p.price) * p.inStock), 0).toLocaleString("en-IN")}
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
