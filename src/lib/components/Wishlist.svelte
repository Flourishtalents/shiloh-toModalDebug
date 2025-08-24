<script>
  import { createEventDispatcher, onMount } from 'svelte';
  
  const dispatch = createEventDispatcher();
  export let user = null;
  
  let wishlistItems = [];
  let isLoading = false;
  
  // Load wishlist from localStorage
  function loadWishlist() {
    if (user) {
      const savedWishlist = localStorage.getItem(`shiloh_wishlist_${user.id}`);
      if (savedWishlist) {
        try {
          wishlistItems = JSON.parse(savedWishlist);
        } catch (e) {
          wishlistItems = [];
        }
      }
    }
  }
  
  // Save wishlist to localStorage
  function saveWishlist() {
    if (user) {
      localStorage.setItem(`shiloh_wishlist_${user.id}`, JSON.stringify(wishlistItems));
      updateWishlistCount();
    }
  }
  
  // Update wishlist count in header
  function updateWishlistCount() {
    const countElement = document.getElementById('wishlist-count');
    if (countElement) {
      const count = wishlistItems.length;
      countElement.textContent = count;
      if (count > 0) {
        countElement.classList.remove('hidden');
      } else {
        countElement.classList.add('hidden');
      }
    }
  }
  
  // Remove item from wishlist
  function removeFromWishlist(itemId) {
    wishlistItems = wishlistItems.filter(item => item.id !== itemId);
    saveWishlist();
  }
  
  // Book item from wishlist
  function bookItem(item) {
    dispatch('book', { type: item.type, item: item });
  }
  
  // Navigate to item details
  function viewItem(item) {
    dispatch('navigate', { route: item.type === 'accommodation' ? 'accommodations' : item.type === 'tour' ? 'tours' : 'store' });
  }
  
  // Clear entire wishlist
  function clearWishlist() {
    if (confirm('Are you sure you want to clear your entire wishlist?')) {
      wishlistItems = [];
      saveWishlist();
    }
  }
  
  // Add to cart functionality
  function addToCart(item, quantity = 1) {
    const savedCart = localStorage.getItem('shiloh_cart');
    let cart = savedCart ? JSON.parse(savedCart) : [];

    // Check if item already exists in cart
    const existingItemIndex = cart.findIndex(cartItem => cartItem.id === item.id && cartItem.type === item.type);

    if (existingItemIndex > -1) {
      cart[existingItemIndex].quantity += quantity;
    } else {
      cart.push({
        ...item,
        quantity: quantity,
        addedToCartDate: new Date().toISOString()
      });
    }

    localStorage.setItem('shiloh_cart', JSON.stringify(cart));

    // Update cart count in header
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
      const totalItems = cart.reduce((sum, cartItem) => sum + cartItem.quantity, 0);
      cartCountElement.textContent = totalItems;
      if (totalItems > 0) {
        cartCountElement.classList.remove('hidden');
      }
    }

    // Show success message
    alert(`${item.name} has been added to your cart!`);
  }

  // Checkout all items
  function checkoutAll() {
    // Add all wishlist items to cart
    wishlistItems.forEach(item => addToCart(item, 1));

    // Navigate to store for checkout
    dispatch('navigate', { route: 'store' });
  }

  // Calculate total value
  $: totalValue = wishlistItems.reduce((sum, item) => sum + parseFloat(item.price.replace('$', '')), 0);

  onMount(() => {
    loadWishlist();
    updateWishlistCount();
  });
</script>

<div class="pt-16 pb-12">
  <div class="container-custom">
    <!-- Header -->
    <div class="mb-12">
      <h1 class="text-5xl font-bold mb-6 tracking-tight">My Wishlist</h1>
      <p class="text-xl text-gray-600 leading-relaxed tracking-wide max-w-4xl">
        Save your favorite accommodations, tours, and store items for easy booking later.
      </p>
    </div>

    {#if wishlistItems.length === 0}
      <!-- Empty Wishlist -->
      <div class="text-center py-16">
        <div class="bg-gray-100 rounded-full p-6 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
          </svg>
        </div>
        <h2 class="text-2xl font-semibold text-gray-900 mb-4">Your wishlist is empty</h2>
        <p class="text-gray-600 mb-8">Start adding your favorite items to keep track of things you love!</p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            class="btn-primary px-8 py-3"
            on:click={() => dispatch('navigate', { route: 'accommodations' })}
          >
            Browse Accommodations
          </button>
          <button 
            class="btn-secondary px-8 py-3"
            on:click={() => dispatch('navigate', { route: 'tours' })}
          >
            Explore Tours
          </button>
          <button 
            class="btn-secondary px-8 py-3"
            on:click={() => dispatch('navigate', { route: 'store' })}
          >
            Visit Store
          </button>
        </div>
      </div>
    {:else}
      <!-- Wishlist Summary -->
      <div class="bg-white rounded-lg shadow-md p-6 mb-8">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h2 class="text-2xl font-semibold text-gray-900 mb-2">
              {wishlistItems.length} item{wishlistItems.length !== 1 ? 's' : ''} in your wishlist
            </h2>
            <p class="text-gray-600 mb-1">Total estimated value: <span class="font-semibold text-primary">${totalValue.toFixed(2)}</span></p>
            <p class="text-sm text-gray-500">Add items to cart for a complete checkout experience</p>
          </div>
          <div class="flex space-x-3 mt-4 md:mt-0">
            <button 
              class="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-md transition-colors"
              on:click={clearWishlist}
            >
              Clear All
            </button>
            <button
              class="btn-primary px-6 py-2"
              on:click={checkoutAll}
            >
              Checkout All
            </button>
          </div>
        </div>
      </div>

      <!-- Wishlist Items -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {#each wishlistItems as item (item.id)}
          <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <!-- Item Image -->
            <div class="h-48 bg-gray-200 relative">
              <img
                src={item.image}
                alt={item.name}
                class="w-full h-full object-cover"
              />
              <div class="absolute top-2 right-2">
                <button
                  class="bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-shadow"
                  on:click={() => removeFromWishlist(item.id)}
                  title="Remove from wishlist"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                  </svg>
                </button>
              </div>
              
              <!-- Item Type Badge -->
              <div class="absolute top-2 left-2 bg-primary text-white rounded px-2 py-1 text-xs font-medium uppercase">
                {item.type}
              </div>
            </div>

            <!-- Item Details -->
            <div class="p-6">
              <h3 class="text-xl font-semibold text-gray-900 mb-2">{item.name}</h3>
              <p class="text-gray-600 mb-3">{item.location || item.description}</p>
              
              <!-- Item Specific Info -->
              {#if item.type === 'tour'}
                <div class="flex items-center text-sm text-gray-500 mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {item.duration}
                </div>
              {:else if item.type === 'accommodation'}
                <div class="flex items-center text-sm text-gray-500 mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {item.location}
                </div>
              {/if}

              <!-- Rating -->
              {#if item.rating}
                <div class="flex items-center mb-3">
                  <div class="flex">
                    {#each Array(5) as _, i}
                      <svg 
                        class="h-4 w-4 {i < Math.floor(item.rating) ? 'text-yellow-400' : 'text-gray-300'}" 
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    {/each}
                  </div>
                  <span class="text-sm text-gray-500 ml-1">({item.rating})</span>
                </div>
              {/if}

              <!-- Price and Actions -->
              <div class="flex items-center justify-between mb-3">
                <div class="text-2xl font-bold text-primary">{item.price}</div>
              </div>

              <!-- Action Buttons -->
              <div class="grid grid-cols-1 gap-2">
                <div class="flex space-x-2">
                  <button
                    class="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-md text-sm transition-colors flex-1"
                    on:click={() => viewItem(item)}
                  >
                    View Details
                  </button>
                  <button
                    class="bg-orange-500 hover:bg-orange-600 text-white px-3 py-2 rounded-md text-sm transition-colors flex-1"
                    on:click={() => addToCart(item)}
                  >
                    Add to Cart
                  </button>
                </div>
                <button
                  class="btn-primary px-4 py-2 text-sm w-full"
                  on:click={() => bookItem(item)}
                >
                  Book Now
                </button>
              </div>
              
              <!-- Added Date -->
              {#if item.addedDate}
                <div class="text-xs text-gray-400 mt-2">
                  Added {new Date(item.addedDate).toLocaleDateString()}
                </div>
              {/if}
            </div>
          </div>
        {/each}
      </div>

      <!-- Reminder Settings -->
      <div class="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
        <h3 class="text-lg font-semibold text-blue-900 mb-3">Wishlist Reminders</h3>
        <p class="text-blue-700 mb-4">Get notified about special offers on your wishlist items and reminders to complete your bookings.</p>
        <div class="flex flex-col sm:flex-row gap-4">
          <label class="flex items-center">
            <input type="checkbox" class="rounded border-blue-300 text-blue-600 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
            <span class="ml-2 text-blue-700">Email reminders (weekly)</span>
          </label>
          <label class="flex items-center">
            <input type="checkbox" class="rounded border-blue-300 text-blue-600 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
            <span class="ml-2 text-blue-700">Special offer notifications</span>
          </label>
          <label class="flex items-center">
            <input type="checkbox" class="rounded border-blue-300 text-blue-600 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
            <span class="ml-2 text-blue-700">Price drop alerts</span>
          </label>
        </div>
      </div>
    {/if}
  </div>
</div>

<!-- Global Wishlist Functions -->
<script context="module">
  // Global function to add items to wishlist
  export function addToWishlist(item, userId) {
    if (!userId) return false;
    
    const savedWishlist = localStorage.getItem(`shiloh_wishlist_${userId}`);
    let wishlist = savedWishlist ? JSON.parse(savedWishlist) : [];
    
    // Check if item already exists
    if (wishlist.find(w => w.id === item.id && w.type === item.type)) {
      return false; // Already in wishlist
    }
    
    // Add timestamp
    const wishlistItem = {
      ...item,
      addedDate: new Date().toISOString()
    };
    
    wishlist.push(wishlistItem);
    localStorage.setItem(`shiloh_wishlist_${userId}`, JSON.stringify(wishlist));
    
    // Update count in header
    const countElement = document.getElementById('wishlist-count');
    if (countElement) {
      countElement.textContent = wishlist.length;
      countElement.classList.remove('hidden');
    }
    
    return true; // Successfully added
  }
  
  // Global function to check if item is in wishlist
  export function isInWishlist(itemId, itemType, userId) {
    if (!userId) return false;
    
    const savedWishlist = localStorage.getItem(`shiloh_wishlist_${userId}`);
    if (!savedWishlist) return false;
    
    const wishlist = JSON.parse(savedWishlist);
    return wishlist.some(item => item.id === itemId && item.type === itemType);
  }
</script>
