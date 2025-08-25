<script>
  import { createEventDispatcher, onMount } from 'svelte';
  import ChatbotAnalytics from './ChatbotAnalytics.svelte';
  import StoreManagement from './StoreManagement.svelte';
  import AgentManagement from './AgentManagement.svelte';

  const dispatch = createEventDispatcher();
  export let user = null;
  
  let activeTab = 'dashboard';
  let showModal = false;
  let modalType = '';
  let editingItem = null;
  
  // Admin statistics
  let stats = {
    totalBookings: 147,
    totalRevenue: 89420,
    activeUsers: 1234,
    newBookingsToday: 8,
    pendingReviews: 12,
    totalAccommodations: 45,
    totalTours: 23,
    totalTransport: 15
  };

  // Content management data
  let accommodations = [
    {
      id: 1,
      name: "Shiloh Guest House - Lake Victoria",
      location: "Entebbe",
      price: 85,
      status: "active",
      featured: true,
      rating: 4.9,
      bookings: 23,
      lastUpdated: "2024-11-28"
    },
    {
      id: 2,
      name: "Serena Hotel Kampala",
      location: "Kampala",
      price: 180,
      status: "active",
      featured: false,
      rating: 4.8,
      bookings: 45,
      lastUpdated: "2024-11-25"
    },
    {
      id: 3,
      name: "Murchison Falls Lodge",
      location: "Murchison Falls NP",
      price: 210,
      status: "active",
      featured: true,
      rating: 4.9,
      bookings: 31,
      lastUpdated: "2024-11-27"
    }
  ];

  let tours = [
    {
      id: 1,
      name: "Gorilla Trekking Adventure",
      location: "Bwindi Impenetrable Forest",
      price: 800,
      duration: "3 days",
      status: "active",
      featured: true,
      rating: 5.0,
      bookings: 18,
      lastUpdated: "2024-11-26"
    },
    {
      id: 2,
      name: "Queen Elizabeth Safari",
      location: "Queen Elizabeth NP",
      price: 650,
      duration: "4 days",
      status: "active",
      featured: false,
      rating: 4.7,
      bookings: 24,
      lastUpdated: "2024-11-24"
    }
  ];

  let promotionalOffers = [
    {
      id: 1,
      title: "Early Bird Safari",
      discount: 30,
      originalPrice: 800,
      salePrice: 560,
      status: "active",
      endDate: "2024-12-31",
      clicks: 245,
      conversions: 12
    },
    {
      id: 2,
      title: "Gorilla + Accommodation",
      discount: 17,
      originalPrice: 1200,
      salePrice: 999,
      status: "active",
      endDate: "2025-01-15",
      clicks: 189,
      conversions: 8
    }
  ];

  let recentBookings = [
    {
      id: 1,
      customerName: "Sarah Johnson",
      email: "sarah@example.com",
      itemType: "accommodation",
      itemName: "Shiloh Guest House",
      amount: 255,
      date: "2024-11-28",
      status: "confirmed"
    },
    {
      id: 2,
      customerName: "Mike Chen",
      email: "mike@example.com",
      itemType: "tour",
      itemName: "Gorilla Trekking",
      amount: 800,
      date: "2024-11-28",
      status: "pending"
    },
    {
      id: 3,
      customerName: "Emma Wilson",
      email: "emma@example.com",
      itemType: "transport",
      itemName: "Toyota Land Cruiser",
      amount: 180,
      date: "2024-11-27",
      status: "confirmed"
    }
  ];

  let users = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "customer",
      joinDate: "2024-10-15",
      totalBookings: 3,
      totalSpent: 1240,
      status: "active"
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      role: "customer",
      joinDate: "2024-11-01",
      totalBookings: 1,
      totalSpent: 560,
      status: "active"
    }
  ];

  let pendingReviews = [
    {
      id: 1,
      customerName: "Robert Taylor",
      itemName: "Gorilla Trekking Adventure",
      rating: 5,
      comment: "Amazing experience! The guides were incredibly knowledgeable and we saw a beautiful gorilla family. Highly recommend!",
      date: "2024-11-27",
      status: "pending"
    },
    {
      id: 2,
      customerName: "Lisa Garcia",
      itemName: "Shiloh Guest House",
      rating: 4,
      comment: "Beautiful location with great views of Lake Victoria. Staff was very friendly and helpful.",
      date: "2024-11-26",
      status: "pending"
    }
  ];

  // Form data for new/editing items
  let formData = {
    name: '',
    location: '',
    price: 0,
    description: '',
    status: 'active',
    featured: false,
    duration: '',
    discount: 0,
    endDate: ''
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
      location: '',
      price: 0,
      description: '',
      status: 'active',
      featured: false,
      duration: '',
      discount: 0,
      endDate: ''
    };
  }

  function saveItem() {
    if (modalType === 'accommodation') {
      if (editingItem) {
        // Update existing accommodation
        const index = accommodations.findIndex(a => a.id === editingItem.id);
        accommodations[index] = { ...formData, id: editingItem.id, lastUpdated: new Date().toISOString().split('T')[0] };
      } else {
        // Add new accommodation
        accommodations = [...accommodations, { ...formData, id: Date.now(), bookings: 0, rating: 0, lastUpdated: new Date().toISOString().split('T')[0] }];
      }
    } else if (modalType === 'tour') {
      if (editingItem) {
        const index = tours.findIndex(t => t.id === editingItem.id);
        tours[index] = { ...formData, id: editingItem.id, lastUpdated: new Date().toISOString().split('T')[0] };
      } else {
        tours = [...tours, { ...formData, id: Date.now(), bookings: 0, rating: 0, lastUpdated: new Date().toISOString().split('T')[0] }];
      }
    } else if (modalType === 'promotion') {
      const salePrice = formData.price - (formData.price * formData.discount / 100);
      if (editingItem) {
        const index = promotionalOffers.findIndex(p => p.id === editingItem.id);
        promotionalOffers[index] = { 
          ...formData, 
          id: editingItem.id, 
          originalPrice: formData.price,
          salePrice: salePrice,
          title: formData.name,
          clicks: promotionalOffers[index].clicks,
          conversions: promotionalOffers[index].conversions
        };
      } else {
        promotionalOffers = [...promotionalOffers, { 
          ...formData, 
          id: Date.now(), 
          originalPrice: formData.price,
          salePrice: salePrice,
          title: formData.name,
          clicks: 0,
          conversions: 0
        }];
      }
    }
    closeModal();
  }

  function deleteItem(type, id) {
    if (confirm('Are you sure you want to delete this item?')) {
      if (type === 'accommodation') {
        accommodations = accommodations.filter(a => a.id !== id);
      } else if (type === 'tour') {
        tours = tours.filter(t => t.id !== id);
      } else if (type === 'promotion') {
        promotionalOffers = promotionalOffers.filter(p => p.id !== id);
      }
    }
  }

  function toggleStatus(type, id) {
    if (type === 'accommodation') {
      const item = accommodations.find(a => a.id === id);
      item.status = item.status === 'active' ? 'inactive' : 'active';
      accommodations = [...accommodations];
    } else if (type === 'tour') {
      const item = tours.find(t => t.id === id);
      item.status = item.status === 'active' ? 'inactive' : 'active';
      tours = [...tours];
    } else if (type === 'promotion') {
      const item = promotionalOffers.find(p => p.id === id);
      item.status = item.status === 'active' ? 'inactive' : 'active';
      promotionalOffers = [...promotionalOffers];
    }
  }

  function toggleFeatured(type, id) {
    if (type === 'accommodation') {
      const item = accommodations.find(a => a.id === id);
      item.featured = !item.featured;
      accommodations = [...accommodations];
    } else if (type === 'tour') {
      const item = tours.find(t => t.id === id);
      item.featured = !item.featured;
      tours = [...tours];
    }
  }

  function approveReview(id) {
    const review = pendingReviews.find(r => r.id === id);
    review.status = 'approved';
    pendingReviews = [...pendingReviews];
  }

  function rejectReview(id) {
    const review = pendingReviews.find(r => r.id === id);
    review.status = 'rejected';
    pendingReviews = [...pendingReviews];
  }

  function updateBookingStatus(id, newStatus) {
    const booking = recentBookings.find(b => b.id === id);
    booking.status = newStatus;
    recentBookings = [...recentBookings];
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

  // Check if user is admin
  function isAdmin() {
    return user && user.role === 'admin';
  }

  onMount(() => {
    if (!isAdmin()) {
      dispatch('navigate', { route: '' });
    }
  });
</script>

{#if isAdmin()}
<div class="pt-16 pb-8 bg-gray-50 min-h-screen">
  <div class="container-custom">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-4xl font-bold mb-4">Admin Panel</h1>
      <p class="text-lg text-gray-600">
        Manage content, bookings, users, and monitor your Uganda travel platform.
      </p>
    </div>

    <!-- Navigation Tabs -->
    <div class="bg-white shadow-md rounded-lg mb-8">
      <div class="flex border-b border-gray-200 overflow-x-auto">
        <button 
          class="px-6 py-4 font-medium transition-colors whitespace-nowrap {activeTab === 'dashboard' ? 'border-b-2 border-primary text-primary' : 'text-gray-600 hover:text-primary'}"
          on:click={() => activeTab = 'dashboard'}
        >
          Dashboard
        </button>
        <button 
          class="px-6 py-4 font-medium transition-colors whitespace-nowrap {activeTab === 'accommodations' ? 'border-b-2 border-primary text-primary' : 'text-gray-600 hover:text-primary'}"
          on:click={() => activeTab = 'accommodations'}
        >
          Accommodations
        </button>
        <button 
          class="px-6 py-4 font-medium transition-colors whitespace-nowrap {activeTab === 'tours' ? 'border-b-2 border-primary text-primary' : 'text-gray-600 hover:text-primary'}"
          on:click={() => activeTab = 'tours'}
        >
          Tours & Safaris
        </button>
        <button 
          class="px-6 py-4 font-medium transition-colors whitespace-nowrap {activeTab === 'promotions' ? 'border-b-2 border-primary text-primary' : 'text-gray-600 hover:text-primary'}"
          on:click={() => activeTab = 'promotions'}
        >
          Promotions
        </button>
        <button 
          class="px-6 py-4 font-medium transition-colors whitespace-nowrap {activeTab === 'bookings' ? 'border-b-2 border-primary text-primary' : 'text-gray-600 hover:text-primary'}"
          on:click={() => activeTab = 'bookings'}
        >
          Bookings
        </button>
        <button 
          class="px-6 py-4 font-medium transition-colors whitespace-nowrap {activeTab === 'users' ? 'border-b-2 border-primary text-primary' : 'text-gray-600 hover:text-primary'}"
          on:click={() => activeTab = 'users'}
        >
          Users
        </button>
        <button
          class="px-6 py-4 font-medium transition-colors whitespace-nowrap {activeTab === 'reviews' ? 'border-b-2 border-primary text-primary' : 'text-gray-600 hover:text-primary'}"
          on:click={() => activeTab = 'reviews'}
        >
          Reviews
        </button>
        <button
          class="px-6 py-4 font-medium transition-colors whitespace-nowrap {activeTab === 'chatbot' ? 'border-b-2 border-primary text-primary' : 'text-gray-600 hover:text-primary'}"
          on:click={() => activeTab = 'chatbot'}
        >
          AI Chatbot
        </button>
        <button
          class="px-6 py-4 font-medium transition-colors whitespace-nowrap {activeTab === 'store' ? 'border-b-2 border-primary text-primary' : 'text-gray-600 hover:text-primary'}"
          on:click={() => activeTab = 'store'}
        >
          Store
        </button>
        <button
          class="px-6 py-4 font-medium transition-colors whitespace-nowrap {activeTab === 'permits-visa' ? 'border-b-2 border-primary text-primary' : 'text-gray-600 hover:text-primary'}"
          on:click={() => activeTab = 'permits-visa'}
        >
          Permits & Visa
        </button>
      </div>
    </div>

    <!-- Tab Content -->
    {#if activeTab === 'dashboard'}
      <!-- Dashboard Tab -->
      <div class="space-y-8">
        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="bg-white rounded-lg shadow-md p-6">
            <div class="flex items-center">
              <div class="p-3 bg-blue-100 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div class="ml-4">
                <h3 class="text-lg font-semibold text-gray-900">{stats.totalBookings}</h3>
                <p class="text-sm text-gray-600">Total Bookings</p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow-md p-6">
            <div class="flex items-center">
              <div class="p-3 bg-green-100 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <div class="ml-4">
                <h3 class="text-lg font-semibold text-gray-900">{formatCurrency(stats.totalRevenue)}</h3>
                <p class="text-sm text-gray-600">Total Revenue</p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow-md p-6">
            <div class="flex items-center">
              <div class="p-3 bg-purple-100 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
              <div class="ml-4">
                <h3 class="text-lg font-semibold text-gray-900">{stats.activeUsers}</h3>
                <p class="text-sm text-gray-600">Active Users</p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow-md p-6">
            <div class="flex items-center">
              <div class="p-3 bg-orange-100 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div class="ml-4">
                <h3 class="text-lg font-semibold text-gray-900">{stats.newBookingsToday}</h3>
                <p class="text-sm text-gray-600">Today's Bookings</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <h3 class="text-lg font-semibold mb-4">Quick Actions</h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button 
              class="bg-primary hover:bg-primary-dark text-white py-3 px-4 rounded-md transition-colors"
              on:click={() => openModal('accommodation')}
            >
              Add New Accommodation
            </button>
            <button 
              class="bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-md transition-colors"
              on:click={() => openModal('tour')}
            >
              Add New Tour
            </button>
            <button 
              class="bg-orange-500 hover:bg-orange-600 text-white py-3 px-4 rounded-md transition-colors"
              on:click={() => openModal('promotion')}
            >
              Create Promotion
            </button>
          </div>
        </div>

        <!-- Recent Activity -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div class="bg-white rounded-lg shadow-md p-6">
            <h3 class="text-lg font-semibold mb-4">Recent Bookings</h3>
            <div class="space-y-4">
              {#each recentBookings.slice(0, 5) as booking}
                <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p class="font-medium">{booking.customerName}</p>
                    <p class="text-sm text-gray-600">{booking.itemName}</p>
                    <p class="text-xs text-gray-500">{formatDate(booking.date)}</p>
                  </div>
                  <div class="text-right">
                    <p class="font-semibold">{formatCurrency(booking.amount)}</p>
                    <span class="text-xs px-2 py-1 rounded-full {booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}">
                      {booking.status}
                    </span>
                  </div>
                </div>
              {/each}
            </div>
          </div>

          <div class="bg-white rounded-lg shadow-md p-6">
            <h3 class="text-lg font-semibold mb-4">Content Overview</h3>
            <div class="space-y-3">
              <div class="flex justify-between items-center">
                <span class="text-gray-600">Accommodations</span>
                <span class="font-semibold">{stats.totalAccommodations}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-gray-600">Tours & Safaris</span>
                <span class="font-semibold">{stats.totalTours}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-gray-600">Transport Options</span>
                <span class="font-semibold">{stats.totalTransport}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-gray-600">Pending Reviews</span>
                <span class="font-semibold text-orange-600">{stats.pendingReviews}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

    {:else if activeTab === 'accommodations'}
      <!-- Accommodations Tab -->
      <div class="bg-white rounded-lg shadow-md">
        <div class="p-6 border-b border-gray-200">
          <div class="flex justify-between items-center">
            <h3 class="text-lg font-semibold">Manage Accommodations</h3>
            <button 
              class="bg-primary hover:bg-primary-dark text-white py-2 px-4 rounded-md transition-colors"
              on:click={() => openModal('accommodation')}
            >
              Add New Accommodation
            </button>
          </div>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Featured</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bookings</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              {#each accommodations as accommodation}
                <tr>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div class="text-sm font-medium text-gray-900">{accommodation.name}</div>
                      <div class="text-sm text-gray-500">Rating: {accommodation.rating}</div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{accommodation.location}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatCurrency(accommodation.price)}/night</td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <button 
                      class="text-sm px-2 py-1 rounded-full {accommodation.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}"
                      on:click={() => toggleStatus('accommodation', accommodation.id)}
                    >
                      {accommodation.status}
                    </button>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <button 
                      class="text-sm px-2 py-1 rounded-full {accommodation.featured ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'}"
                      on:click={() => toggleFeatured('accommodation', accommodation.id)}
                    >
                      {accommodation.featured ? 'Featured' : 'Standard'}
                    </button>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{accommodation.bookings}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button 
                      class="text-primary hover:text-primary-dark"
                      on:click={() => openModal('accommodation', accommodation)}
                    >
                      Edit
                    </button>
                    <button 
                      class="text-red-600 hover:text-red-800"
                      on:click={() => deleteItem('accommodation', accommodation.id)}
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

    {:else if activeTab === 'tours'}
      <!-- Tours Tab -->
      <div class="bg-white rounded-lg shadow-md">
        <div class="p-6 border-b border-gray-200">
          <div class="flex justify-between items-center">
            <h3 class="text-lg font-semibold">Manage Tours & Safaris</h3>
            <button 
              class="bg-primary hover:bg-primary-dark text-white py-2 px-4 rounded-md transition-colors"
              on:click={() => openModal('tour')}
            >
              Add New Tour
            </button>
          </div>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Featured</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bookings</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              {#each tours as tour}
                <tr>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div class="text-sm font-medium text-gray-900">{tour.name}</div>
                      <div class="text-sm text-gray-500">Rating: {tour.rating}</div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{tour.location}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{tour.duration}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatCurrency(tour.price)}</td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <button 
                      class="text-sm px-2 py-1 rounded-full {tour.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}"
                      on:click={() => toggleStatus('tour', tour.id)}
                    >
                      {tour.status}
                    </button>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <button 
                      class="text-sm px-2 py-1 rounded-full {tour.featured ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'}"
                      on:click={() => toggleFeatured('tour', tour.id)}
                    >
                      {tour.featured ? 'Featured' : 'Standard'}
                    </button>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{tour.bookings}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button 
                      class="text-primary hover:text-primary-dark"
                      on:click={() => openModal('tour', tour)}
                    >
                      Edit
                    </button>
                    <button 
                      class="text-red-600 hover:text-red-800"
                      on:click={() => deleteItem('tour', tour.id)}
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

    {:else if activeTab === 'promotions'}
      <!-- Promotions Tab -->
      <div class="bg-white rounded-lg shadow-md">
        <div class="p-6 border-b border-gray-200">
          <div class="flex justify-between items-center">
            <h3 class="text-lg font-semibold">Manage Promotional Offers</h3>
            <button 
              class="bg-primary hover:bg-primary-dark text-white py-2 px-4 rounded-md transition-colors"
              on:click={() => openModal('promotion')}
            >
              Create New Promotion
            </button>
          </div>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Discount</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End Date</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Performance</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              {#each promotionalOffers as offer}
                <tr>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{offer.title}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{offer.discount}% OFF</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <span class="line-through text-gray-500">{formatCurrency(offer.originalPrice)}</span>
                    <span class="ml-2 font-semibold text-green-600">{formatCurrency(offer.salePrice)}</span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatDate(offer.endDate)}</td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <button 
                      class="text-sm px-2 py-1 rounded-full {offer.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}"
                      on:click={() => toggleStatus('promotion', offer.id)}
                    >
                      {offer.status}
                    </button>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div>
                      <div>{offer.clicks} clicks</div>
                      <div>{offer.conversions} conversions</div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button 
                      class="text-primary hover:text-primary-dark"
                      on:click={() => openModal('promotion', offer)}
                    >
                      Edit
                    </button>
                    <button 
                      class="text-red-600 hover:text-red-800"
                      on:click={() => deleteItem('promotion', offer.id)}
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

    {:else if activeTab === 'bookings'}
      <!-- Bookings Tab -->
      <div class="bg-white rounded-lg shadow-md">
        <div class="p-6 border-b border-gray-200">
          <h3 class="text-lg font-semibold">Recent Bookings</h3>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              {#each recentBookings as booking}
                <tr>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div class="text-sm font-medium text-gray-900">{booking.customerName}</div>
                      <div class="text-sm text-gray-500">{booking.email}</div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{booking.itemName}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize">{booking.itemType}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">{formatCurrency(booking.amount)}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatDate(booking.date)}</td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <select 
                      class="text-sm border border-gray-300 rounded-md px-2 py-1 {booking.status === 'confirmed' ? 'text-green-800 bg-green-100' : booking.status === 'pending' ? 'text-yellow-800 bg-yellow-100' : 'text-red-800 bg-red-100'}"
                      value={booking.status}
                      on:change={(e) => updateBookingStatus(booking.id, e.target.value)}
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button class="text-primary hover:text-primary-dark">View Details</button>
                  </td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      </div>

    {:else if activeTab === 'users'}
      <!-- Users Tab -->
      <div class="bg-white rounded-lg shadow-md">
        <div class="p-6 border-b border-gray-200">
          <h3 class="text-lg font-semibold">User Management</h3>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Join Date</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bookings</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Spent</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              {#each users as user}
                <tr>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div class="text-sm font-medium text-gray-900">{user.name}</div>
                      <div class="text-sm text-gray-500">{user.email}</div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize">{user.role}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatDate(user.joinDate)}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.totalBookings}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">{formatCurrency(user.totalSpent)}</td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span class="text-sm px-2 py-1 rounded-full {user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}">
                      {user.status}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button class="text-primary hover:text-primary-dark">View Profile</button>
                    <button class="text-gray-600 hover:text-gray-800">Message</button>
                  </td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      </div>

    {:else if activeTab === 'reviews'}
      <!-- Reviews Tab -->
      <div class="bg-white rounded-lg shadow-md">
        <div class="p-6 border-b border-gray-200">
          <h3 class="text-lg font-semibold">Pending Reviews</h3>
        </div>
        <div class="p-6 space-y-6">
          {#each pendingReviews as review}
            <div class="border border-gray-200 rounded-lg p-4">
              <div class="flex justify-between items-start mb-3">
                <div>
                  <h4 class="font-medium text-gray-900">{review.customerName}</h4>
                  <p class="text-sm text-gray-600">{review.itemName}</p>
                  <p class="text-xs text-gray-500">{formatDate(review.date)}</p>
                </div>
                <div class="flex items-center">
                  {#each Array(5) as _, i}
                    <svg class="h-4 w-4 {i < review.rating ? 'text-yellow-400' : 'text-gray-300'}" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  {/each}
                </div>
              </div>
              <p class="text-gray-700 mb-4">{review.comment}</p>
              <div class="flex space-x-3">
                <button 
                  class="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md transition-colors"
                  on:click={() => approveReview(review.id)}
                >
                  Approve
                </button>
                <button 
                  class="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md transition-colors"
                  on:click={() => rejectReview(review.id)}
                >
                  Reject
                </button>
              </div>
            </div>
          {/each}
        </div>
      </div>

    {:else if activeTab === 'chatbot'}
      <!-- Chatbot Analytics Tab -->
      <ChatbotAnalytics {user} />

    {:else if activeTab === 'store'}
      <!-- Store Management Tab -->
      <StoreManagement {user} />

    {:else if activeTab === 'agents'}
      <!-- Agent Management Tab -->
      <AgentManagement {user} />

    {:else if activeTab === 'permits-visa'}
      <!-- Permits & Visa Management Tab -->
      <div class="space-y-6">
        <div class="flex justify-between items-center">
          <h2 class="text-2xl font-bold text-gray-800">Permits & Visa Management</h2>
        </div>

        <!-- Summary Cards -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div class="bg-white rounded-lg shadow-md p-6">
            <div class="flex items-center">
              <div class="p-3 bg-green-100 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div class="ml-4">
                <h3 class="text-lg font-semibold text-gray-900">24</h3>
                <p class="text-sm text-gray-600">Permit Applications</p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow-md p-6">
            <div class="flex items-center">
              <div class="p-3 bg-blue-100 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div class="ml-4">
                <h3 class="text-lg font-semibold text-gray-900">18</h3>
                <p class="text-sm text-gray-600">Visa Applications</p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow-md p-6">
            <div class="flex items-center">
              <div class="p-3 bg-yellow-100 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div class="ml-4">
                <h3 class="text-lg font-semibold text-gray-900">8</h3>
                <p class="text-sm text-gray-600">Pending Review</p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow-md p-6">
            <div class="flex items-center">
              <div class="p-3 bg-green-100 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <div class="ml-4">
                <h3 class="text-lg font-semibold text-gray-900">$21,400</h3>
                <p class="text-sm text-gray-600">Total Revenue</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Recent Applications -->
        <div class="bg-white rounded-lg shadow-md">
          <div class="p-6 border-b border-gray-200">
            <h3 class="text-lg font-semibold text-gray-800">Recent Applications</h3>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Application</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applicant</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200">
                <tr>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#GP2024001</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Gorilla Permit</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">John Smith</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2024-11-28</td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">Processing</span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">$700</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button class="text-primary hover:text-primary-dark mr-3">Review</button>
                    <button class="text-green-600 hover:text-green-800">Approve</button>
                  </td>
                </tr>
                <tr>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#VIS2024012</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Tourist Visa</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Sarah Johnson</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2024-11-27</td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">Approved</span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">$50</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button class="text-primary hover:text-primary-dark mr-3">View</button>
                    <button class="text-blue-600 hover:text-blue-800">Download</button>
                  </td>
                </tr>
                <tr>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#GP2024002</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Gorilla Permit</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Michael Chen</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2024-11-27</td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">Processing</span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">$1,400</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button class="text-primary hover:text-primary-dark mr-3">Review</button>
                    <button class="text-green-600 hover:text-green-800">Approve</button>
                  </td>
                </tr>
                <tr>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#VIS2024013</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Business Visa</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Emma Wilson</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2024-11-26</td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">Rejected</span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">$50</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button class="text-primary hover:text-primary-dark mr-3">View</button>
                    <button class="text-orange-600 hover:text-orange-800">Reprocess</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Application Filters and Search -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <h3 class="text-lg font-semibold text-gray-800 mb-4">Filter Applications</h3>
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Application Type</label>
              <select class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
                <option value="">All Types</option>
                <option value="gorilla-permit">Gorilla Permits</option>
                <option value="visa">Visa Applications</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
                <option value="">All Statuses</option>
                <option value="processing">Processing</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
              <input
                type="date"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Search Applicant</label>
              <input
                type="text"
                placeholder="Search by name or ID..."
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
            </div>
          </div>
          <div class="mt-4 flex justify-end space-x-3">
            <button class="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors">
              Clear Filters
            </button>
            <button class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    {/if}
  </div>
</div>

<!-- Modal -->
{#if showModal}
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
      <div class="p-6">
        <h3 class="text-lg font-semibold mb-4">
          {editingItem ? 'Edit' : 'Add New'} 
          {modalType === 'accommodation' ? 'Accommodation' : modalType === 'tour' ? 'Tour' : 'Promotion'}
        </h3>
        
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              {modalType === 'promotion' ? 'Title' : 'Name'}
            </label>
            <input 
              type="text" 
              bind:value={formData.name}
              placeholder={modalType === 'accommodation' ? 'Hotel/Lodge Name' : modalType === 'tour' ? 'Tour Name' : 'Promotion Title'}
              class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <input 
              type="text" 
              bind:value={formData.location}
              placeholder="Location"
              class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          
          {#if modalType === 'tour'}
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Duration</label>
              <input 
                type="text" 
                bind:value={formData.duration}
                placeholder="e.g., 3 days"
                class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          {/if}
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                {modalType === 'promotion' ? 'Original Price ($)' : 'Price ($)'}
              </label>
              <input 
                type="number" 
                bind:value={formData.price}
                min="0"
                step="10"
                class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            
            {#if modalType === 'promotion'}
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Discount (%)</label>
                <input 
                  type="number" 
                  bind:value={formData.discount}
                  min="0"
                  max="100"
                  class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            {/if}
          </div>
          
          {#if modalType === 'promotion'}
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">End Date</label>
              <input 
                type="date" 
                bind:value={formData.endDate}
                class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          {/if}
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea 
              bind:value={formData.description}
              rows="3"
              placeholder="Describe the item..."
              class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
            ></textarea>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            
            {#if modalType !== 'promotion'}
              <div class="flex items-center">
                <input 
                  type="checkbox" 
                  id="featured"
                  bind:checked={formData.featured}
                  class="mr-2"
                />
                <label for="featured" class="text-sm font-medium text-gray-700">Featured Item</label>
              </div>
            {/if}
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
            on:click={saveItem}
          >
            {editingItem ? 'Update' : 'Create'}
          </button>
        </div>
      </div>
    </div>
  </div>
{/if}

{:else}
  <div class="py-16 text-center">
    <h1 class="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
    <p class="text-gray-600">You need admin privileges to access this page.</p>
  </div>
{/if}
