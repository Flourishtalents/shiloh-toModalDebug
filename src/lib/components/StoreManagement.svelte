<script>
  export let user = null;
  
  let activeTab = 'products';
  let showModal = false;
  let modalType = '';
  let editingItem = null;
  
  // Store statistics
  let storeStats = {
    totalProducts: 12,
    totalOrders: 89,
    totalRevenue: 4567,
    averageOrderValue: 125,
    topSellingCategory: 'Traditional Crafts',
    lowStockItems: 3,
    pendingOrders: 5,
    monthlyGrowth: 15.3
  };

  // Sample orders data
  let orders = [
    {
      id: 'ORD-001',
      customerName: 'Sarah Johnson',
      email: 'sarah@example.com',
      items: [
        { name: 'Handwoven Banana Fiber Basket', quantity: 1, price: 45 },
        { name: 'Seed Bead Necklace', quantity: 2, price: 28 }
      ],
      total: 101,
      status: 'pending',
      paymentMethod: 'Credit Card',
      shippingAddress: '123 Main St, New York, NY',
      orderDate: '2024-11-28',
      trackingNumber: null
    },
    {
      id: 'ORD-002',
      customerName: 'Mike Chen',
      email: 'mike@example.com',
      items: [
        { name: 'Traditional Drum (Ngoma)', quantity: 1, price: 120 }
      ],
      total: 120,
      status: 'shipped',
      paymentMethod: 'PayPal',
      shippingAddress: '456 Oak Ave, London, UK',
      orderDate: '2024-11-26',
      trackingNumber: 'TRK123456789'
    },
    {
      id: 'ORD-003',
      customerName: 'Emma Wilson',
      email: 'emma@example.com',
      items: [
        { name: 'Premium Ugandan Coffee Beans', quantity: 3, price: 25 },
        { name: 'Uganda Souvenir Magnet Set', quantity: 1, price: 12 }
      ],
      total: 87,
      status: 'delivered',
      paymentMethod: 'Credit Card',
      shippingAddress: '789 Pine Rd, Sydney, Australia',
      orderDate: '2024-11-25',
      trackingNumber: 'TRK987654321'
    }
  ];

  // Sample products data for management
  let products = [
    {
      id: 1,
      name: 'Handwoven Banana Fiber Basket',
      category: 'traditional-crafts',
      price: 45,
      cost: 25,
      stock: 12,
      status: 'active',
      featured: true,
      sales: 23,
      revenue: 1035,
      lastUpdated: '2024-11-20'
    },
    {
      id: 2,
      name: 'Traditional Drum (Ngoma)',
      category: 'traditional-crafts',
      price: 120,
      cost: 70,
      stock: 8,
      status: 'active',
      featured: true,
      sales: 15,
      revenue: 1800,
      lastUpdated: '2024-11-18'
    },
    {
      id: 3,
      name: 'Handcrafted Seed Bead Necklace',
      category: 'jewelry',
      price: 28,
      cost: 15,
      stock: 25,
      status: 'active',
      featured: false,
      sales: 41,
      revenue: 1148,
      lastUpdated: '2024-11-22'
    },
    {
      id: 4,
      name: 'Premium Ugandan Coffee Beans',
      category: 'coffee-tea',
      price: 25,
      cost: 12,
      stock: 2,
      status: 'active',
      featured: true,
      sales: 67,
      revenue: 1675,
      lastUpdated: '2024-11-15'
    }
  ];

  // Artisans data
  let artisans = [
    {
      id: 1,
      name: 'Grace Nakato',
      location: 'Masaka District',
      speciality: 'Basket weaving',
      products: 3,
      totalEarnings: 890,
      joinDate: '2023-05-15',
      status: 'active',
      contact: '+256-700-123456',
      email: 'grace.nakato@example.com'
    },
    {
      id: 2,
      name: 'Moses Kigongo',
      location: 'Kampala',
      speciality: 'Drum making',
      products: 2,
      totalEarnings: 1200,
      joinDate: '2023-03-20',
      status: 'active',
      contact: '+256-700-234567',
      email: 'moses.kigongo@example.com'
    },
    {
      id: 3,
      name: 'Sarah Namutebi',
      location: 'Jinja District',
      speciality: 'Jewelry making',
      products: 4,
      totalEarnings: 650,
      joinDate: '2023-08-10',
      status: 'active',
      contact: '+256-700-345678',
      email: 'sarah.namutebi@example.com'
    }
  ];

  // Form data for new/editing items
  let formData = {
    name: '',
    category: '',
    price: 0,
    cost: 0,
    stock: 0,
    description: '',
    status: 'active',
    featured: false,
    artisanId: ''
  };

  function openModal(type, item = null) {
    modalType = type;
    editingItem = item;
    if (item) {
      formData = { ...item };
    } else {
      resetForm();
    }
    showModal = true;
  }

  function closeModal() {
    showModal = false;
    modalType = '';
    editingItem = null;
    resetForm();
  }

  function resetForm() {
    formData = {
      name: '',
      category: '',
      price: 0,
      cost: 0,
      stock: 0,
      description: '',
      status: 'active',
      featured: false,
      artisanId: ''
    };
  }

  function saveProduct() {
    if (editingItem) {
      // Update existing product
      const index = products.findIndex(p => p.id === editingItem.id);
      products[index] = { 
        ...formData, 
        id: editingItem.id, 
        sales: products[index].sales,
        revenue: products[index].revenue,
        lastUpdated: new Date().toISOString().split('T')[0] 
      };
    } else {
      // Add new product
      products = [...products, { 
        ...formData, 
        id: Date.now(), 
        sales: 0, 
        revenue: 0,
        lastUpdated: new Date().toISOString().split('T')[0] 
      }];
    }
    closeModal();
  }

  function deleteProduct(id) {
    if (confirm('Are you sure you want to delete this product?')) {
      products = products.filter(p => p.id !== id);
    }
  }

  function toggleProductStatus(id) {
    const product = products.find(p => p.id === id);
    product.status = product.status === 'active' ? 'inactive' : 'active';
    products = [...products];
  }

  function toggleFeatured(id) {
    const product = products.find(p => p.id === id);
    product.featured = !product.featured;
    products = [...products];
  }

  function updateOrderStatus(orderId, newStatus) {
    const order = orders.find(o => o.id === orderId);
    order.status = newStatus;
    if (newStatus === 'shipped' && !order.trackingNumber) {
      order.trackingNumber = `TRK${Date.now()}`;
    }
    orders = [...orders];
  }

  function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  }

  function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  function getStatusColor(status) {
    switch(status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'inactive': return 'text-red-600 bg-red-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'shipped': return 'text-blue-600 bg-blue-100';
      case 'delivered': return 'text-green-600 bg-green-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  }

  function calculateProfit(price, cost) {
    return ((price - cost) / price * 100).toFixed(1);
  }
</script>

<div class="space-y-8">
  <!-- Header -->
  <div class="flex justify-between items-center">
    <div>
      <h2 class="text-2xl font-bold text-gray-900">Store Management</h2>
      <p class="text-gray-600">Manage products, orders, and artisan partnerships</p>
    </div>
    <button 
      class="bg-primary hover:bg-primary-dark text-white py-2 px-4 rounded-md transition-colors"
      on:click={() => openModal('product')}
    >
      Add New Product
    </button>
  </div>

  <!-- Stats Cards -->
  <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
    <div class="bg-white rounded-lg shadow-md p-6">
      <div class="flex items-center">
        <div class="p-3 bg-blue-100 rounded-full">
          📦
        </div>
        <div class="ml-4">
          <h3 class="text-lg font-semibold text-gray-900">{storeStats.totalProducts}</h3>
          <p class="text-sm text-gray-600">Total Products</p>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-md p-6">
      <div class="flex items-center">
        <div class="p-3 bg-green-100 rounded-full">
          🛒
        </div>
        <div class="ml-4">
          <h3 class="text-lg font-semibold text-gray-900">{storeStats.totalOrders}</h3>
          <p class="text-sm text-gray-600">Total Orders</p>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-md p-6">
      <div class="flex items-center">
        <div class="p-3 bg-purple-100 rounded-full">
          💰
        </div>
        <div class="ml-4">
          <h3 class="text-lg font-semibold text-gray-900">{formatCurrency(storeStats.totalRevenue)}</h3>
          <p class="text-sm text-gray-600">Total Revenue</p>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-md p-6">
      <div class="flex items-center">
        <div class="p-3 bg-orange-100 rounded-full">
          📈
        </div>
        <div class="ml-4">
          <h3 class="text-lg font-semibold text-gray-900">+{storeStats.monthlyGrowth}%</h3>
          <p class="text-sm text-gray-600">Monthly Growth</p>
        </div>
      </div>
    </div>
  </div>

  <!-- Navigation Tabs -->
  <div class="bg-white shadow-md rounded-lg">
    <div class="flex border-b border-gray-200">
      <button 
        class="px-6 py-4 font-medium transition-colors {activeTab === 'products' ? 'border-b-2 border-primary text-primary' : 'text-gray-600 hover:text-primary'}"
        on:click={() => activeTab = 'products'}
      >
        Products
      </button>
      <button 
        class="px-6 py-4 font-medium transition-colors {activeTab === 'orders' ? 'border-b-2 border-primary text-primary' : 'text-gray-600 hover:text-primary'}"
        on:click={() => activeTab = 'orders'}
      >
        Orders
      </button>
      <button 
        class="px-6 py-4 font-medium transition-colors {activeTab === 'artisans' ? 'border-b-2 border-primary text-primary' : 'text-gray-600 hover:text-primary'}"
        on:click={() => activeTab = 'artisans'}
      >
        Artisans
      </button>
      <button 
        class="px-6 py-4 font-medium transition-colors {activeTab === 'analytics' ? 'border-b-2 border-primary text-primary' : 'text-gray-600 hover:text-primary'}"
        on:click={() => activeTab = 'analytics'}
      >
        Analytics
      </button>
    </div>
  </div>

  <!-- Tab Content -->
  {#if activeTab === 'products'}
    <!-- Products Tab -->
    <div class="bg-white rounded-lg shadow-md">
      <div class="p-6 border-b border-gray-200">
        <div class="flex justify-between items-center">
          <h3 class="text-lg font-semibold">Product Inventory</h3>
          <div class="flex space-x-2">
            <button class="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-3 rounded-md">
              📊 Export
            </button>
            <button class="text-sm bg-orange-100 hover:bg-orange-200 text-orange-700 py-2 px-3 rounded-md">
              ⚠️ Low Stock ({storeStats.lowStockItems})
            </button>
          </div>
        </div>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sales</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Profit</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            {#each products as product}
              <tr>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div class="text-sm font-medium text-gray-900">{product.name}</div>
                    <div class="text-sm text-gray-500">
                      {#if product.featured}
                        <span class="text-yellow-600">★ Featured</span>
                      {/if}
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize">
                  {product.category.replace('-', ' ')}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatCurrency(product.price)}
                  <div class="text-xs text-gray-500">Cost: {formatCurrency(product.cost)}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="text-sm font-medium {product.stock <= 5 ? 'text-red-600' : 'text-gray-900'}">
                    {product.stock}
                  </span>
                  {#if product.stock <= 5}
                    <span class="text-xs text-red-500 block">Low Stock</span>
                  {/if}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <button 
                    class="text-sm px-2 py-1 rounded-full {getStatusColor(product.status)}"
                    on:click={() => toggleProductStatus(product.id)}
                  >
                    {product.status}
                  </button>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {product.sales} sold
                  <div class="text-xs text-gray-500">{formatCurrency(product.revenue)}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {calculateProfit(product.price, product.cost)}%
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <button 
                    class="text-primary hover:text-primary-dark"
                    on:click={() => openModal('product', product)}
                  >
                    Edit
                  </button>
                  <button 
                    class="text-yellow-600 hover:text-yellow-700"
                    on:click={() => toggleFeatured(product.id)}
                  >
                    {product.featured ? 'Unfeature' : 'Feature'}
                  </button>
                  <button 
                    class="text-red-600 hover:text-red-800"
                    on:click={() => deleteProduct(product.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>

  {:else if activeTab === 'orders'}
    <!-- Orders Tab -->
    <div class="bg-white rounded-lg shadow-md">
      <div class="p-6 border-b border-gray-200">
        <div class="flex justify-between items-center">
          <h3 class="text-lg font-semibold">Order Management</h3>
          <span class="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
            {storeStats.pendingOrders} Pending Orders
          </span>
        </div>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Items</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            {#each orders as order}
              <tr>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-medium text-gray-900">{order.id}</div>
                  {#if order.trackingNumber}
                    <div class="text-xs text-gray-500">{order.trackingNumber}</div>
                  {/if}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-medium text-gray-900">{order.customerName}</div>
                  <div class="text-sm text-gray-500">{order.email}</div>
                </td>
                <td class="px-6 py-4">
                  <div class="text-sm text-gray-900">
                    {#each order.items as item}
                      <div>{item.quantity}x {item.name}</div>
                    {/each}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-medium text-gray-900">{formatCurrency(order.total)}</div>
                  <div class="text-xs text-gray-500">{order.paymentMethod}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <select 
                    class="text-sm border border-gray-300 rounded-md px-2 py-1 {getStatusColor(order.status)}"
                    value={order.status}
                    on:change={(e) => updateOrderStatus(order.id, e.target.value)}
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatDate(order.orderDate)}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <button class="text-primary hover:text-primary-dark">View Details</button>
                  <button class="text-green-600 hover:text-green-700">Print Label</button>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>

  {:else if activeTab === 'artisans'}
    <!-- Artisans Tab -->
    <div class="bg-white rounded-lg shadow-md">
      <div class="p-6 border-b border-gray-200">
        <h3 class="text-lg font-semibold">Artisan Partners</h3>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Artisan</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Speciality</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Products</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Earnings</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            {#each artisans as artisan}
              <tr>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div class="text-sm font-medium text-gray-900">{artisan.name}</div>
                    <div class="text-sm text-gray-500">{artisan.email}</div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{artisan.location}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{artisan.speciality}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{artisan.products}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {formatCurrency(artisan.totalEarnings)}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="text-sm px-2 py-1 rounded-full {getStatusColor(artisan.status)}">
                    {artisan.status}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <button class="text-primary hover:text-primary-dark">View Profile</button>
                  <button class="text-green-600 hover:text-green-700">Pay Now</button>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>

  {:else if activeTab === 'analytics'}
    <!-- Analytics Tab -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Top Selling Products -->
      <div class="bg-white rounded-lg shadow-md p-6">
        <h3 class="text-lg font-semibold mb-4">Top Selling Products</h3>
        <div class="space-y-3">
          {#each products.sort((a, b) => b.sales - a.sales).slice(0, 5) as product}
            <div class="flex justify-between items-center">
              <div>
                <p class="font-medium">{product.name}</p>
                <p class="text-sm text-gray-600">{product.sales} sales</p>
              </div>
              <div class="text-right">
                <p class="font-semibold">{formatCurrency(product.revenue)}</p>
                <p class="text-sm text-gray-600">{calculateProfit(product.price, product.cost)}% profit</p>
              </div>
            </div>
          {/each}
        </div>
      </div>

      <!-- Category Performance -->
      <div class="bg-white rounded-lg shadow-md p-6">
        <h3 class="text-lg font-semibold mb-4">Category Performance</h3>
        <div class="space-y-3">
          <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
            <span>Traditional Crafts</span>
            <span class="font-semibold">45% of sales</span>
          </div>
          <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
            <span>Coffee & Tea</span>
            <span class="font-semibold">25% of sales</span>
          </div>
          <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
            <span>Jewelry</span>
            <span class="font-semibold">20% of sales</span>
          </div>
          <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
            <span>Other</span>
            <span class="font-semibold">10% of sales</span>
          </div>
        </div>
      </div>
    </div>
  {/if}
</div>

<!-- Product Modal -->
{#if showModal && modalType === 'product'}
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
      <div class="p-6">
        <h3 class="text-lg font-semibold mb-4">
          {editingItem ? 'Edit Product' : 'Add New Product'}
        </h3>
        
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
            <input 
              type="text" 
              bind:value={formData.name}
              placeholder="Product name"
              class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select 
                bind:value={formData.category}
                class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">Select category</option>
                <option value="traditional-crafts">Traditional Crafts</option>
                <option value="jewelry">Jewelry & Accessories</option>
                <option value="textiles">Textiles & Clothing</option>
                <option value="art">Art & Paintings</option>
                <option value="woodwork">Woodwork & Carvings</option>
                <option value="pottery">Pottery & Ceramics</option>
                <option value="souvenirs">Souvenirs & Gifts</option>
                <option value="coffee-tea">Coffee & Tea</option>
              </select>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Artisan</label>
              <select 
                bind:value={formData.artisanId}
                class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">Select artisan</option>
                {#each artisans as artisan}
                  <option value={artisan.id}>{artisan.name}</option>
                {/each}
              </select>
            </div>
          </div>
          
          <div class="grid grid-cols-3 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Sale Price ($)</label>
              <input 
                type="number" 
                bind:value={formData.price}
                min="0"
                step="1"
                class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Cost ($)</label>
              <input 
                type="number" 
                bind:value={formData.cost}
                min="0"
                step="1"
                class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Stock</label>
              <input 
                type="number" 
                bind:value={formData.stock}
                min="0"
                class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea 
              bind:value={formData.description}
              rows="3"
              placeholder="Product description"
              class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
            ></textarea>
          </div>
          
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select 
                bind:value={formData.status}
                class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            
            <div class="flex items-center mt-6">
              <input 
                type="checkbox" 
                id="featured"
                bind:checked={formData.featured}
                class="mr-2"
              />
              <label for="featured" class="text-sm font-medium text-gray-700">Featured Product</label>
            </div>
          </div>
        </div>
        
        <div class="flex justify-end space-x-3 mt-6">
          <button 
            class="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            on:click={closeModal}
          >
            Cancel
          </button>
          <button 
            class="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-md transition-colors"
            on:click={saveProduct}
          >
            {editingItem ? 'Update' : 'Create'} Product
          </button>
        </div>
      </div>
    </div>
  </div>
{/if}
