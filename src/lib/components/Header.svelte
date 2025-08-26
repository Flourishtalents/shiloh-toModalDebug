<script>
  import { createEventDispatcher } from 'svelte';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';

  export let isLoggedIn = false;
  export let user = null;

  // Determine current route from page path
  $: currentPath = $page.url.pathname;
  $: currentRoute = getCurrentRoute(currentPath);

  function getCurrentRoute(path) {
    if (path === '/') return 'home';
    return path.substring(1);
  }

  // Cart and Wishlist state management
  let cartItemCount = 0;
  let wishlistItemCount = 0;

  // Load cart count from localStorage
  function updateCartCount() {
    const savedCart = localStorage.getItem('shiloh_cart');
    if (savedCart) {
      try {
        const cart = JSON.parse(savedCart);
        cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);
      } catch (e) {
        cartItemCount = 0;
      }
    } else {
      cartItemCount = 0;
    }
  }

  // Load wishlist count from localStorage
  function updateWishlistCount() {
    if (user?.id) {
      const savedWishlist = localStorage.getItem(`shiloh_wishlist_${user.id}`);
      if (savedWishlist) {
        try {
          const wishlist = JSON.parse(savedWishlist);
          wishlistItemCount = wishlist.length;
        } catch (e) {
          wishlistItemCount = 0;
        }
      } else {
        wishlistItemCount = 0;
      }
    } else {
      wishlistItemCount = 0;
    }
  }

  // Update cart and wishlist count on mount and when localStorage changes
  import { onMount } from 'svelte';
  onMount(() => {
    updateCartCount();
    updateWishlistCount();

    // Listen for storage changes to update counts
    window.addEventListener('storage', () => {
      updateCartCount();
      updateWishlistCount();
    });

    // Listen for custom update events for instant sync
    window.addEventListener('cartUpdated', updateCartCount);
    window.addEventListener('wishlistUpdated', updateWishlistCount);

    // Add click outside listener for mobile menu
    document.addEventListener('click', handleOutsideClick);

    // Also check for changes periodically for immediate sync
    const interval = setInterval(() => {
      updateCartCount();
      updateWishlistCount();
    }, 1000);

    return () => {
      window.removeEventListener('storage', updateCartCount);
      window.removeEventListener('cartUpdated', updateCartCount);
      window.removeEventListener('wishlistUpdated', updateWishlistCount);
      document.removeEventListener('click', handleOutsideClick);
      clearInterval(interval);
    };
  });
  
  const dispatch = createEventDispatcher();
  let isMobileMenuOpen = false;

  function navigate(route) {
    if (route === 'home') {
      goto('/');
    } else {
      goto(`/${route}`);
    }
    isMobileMenuOpen = false;
  }

  function handleLogin() {
    // Dispatch global window event to trigger auth modal
    window.dispatchEvent(new CustomEvent('showAuth'));
  }

  function handleLogout() {
    dispatch('logout');
  }

  // Watch for user changes to update wishlist count
  $: if (user) {
    updateWishlistCount();
  } else {
    wishlistItemCount = 0;
  }
  
  function toggleMobileMenu() {
    isMobileMenuOpen = !isMobileMenuOpen;
  }

  function handleOutsideClick(event) {
    if (isMobileMenuOpen && !event.target.closest('.mobile-menu-container') && !event.target.closest('.mobile-menu-button')) {
      isMobileMenuOpen = false;
    }
  }
</script>

<header class="bg-white shadow-md fixed w-full top-0 z-50">
  <div class="container-custom py-5 flex justify-between items-center">
    <!-- Logo -->
    <div class="flex items-center flex-shrink-0">
      <button type="button" on:click={() => navigate('home')} class="flex items-center">
        <div class="h-10 w-10 mr-2 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <span class="text-2xl font-bold tracking-wide {isLoggedIn ? 'hidden md:flex md:flex-col md:leading-tight' : ''}" style="color: var(--color-primary-light);">
          {#if isLoggedIn}
            <span class="hidden md:block">The Shiloh</span>
            <span class="hidden md:block">Experience</span>
            <span class="md:hidden">The Shiloh Experience</span>
          {:else}
            The Shiloh Experience
          {/if}
        </span>
      </button>
    </div>

    <!-- Desktop Navigation -->
    <nav class="hidden md:flex space-x-6 ml-8">
      <button
        type="button"
        class="nav-link {currentRoute === 'itinerary' ? 'active' : ''}"
        on:click={() => navigate('itinerary')}
      >
        Plan A Trip
      </button>
      <button
        type="button"
        class="nav-link {currentRoute === 'tours' ? 'active' : ''}"
        on:click={() => navigate('tours')}
      >
        Tour Packages
      </button>
      <button
        type="button"
        class="nav-link {currentRoute === 'accommodations' ? 'active' : ''}"
        on:click={() => navigate('accommodations')}
      >
        Accommodation
      </button>
      <button
        type="button"
        class="nav-link {currentRoute === 'transport' ? 'active' : ''}"
        on:click={() => navigate('transport')}
      >
        Travel Services
      </button>
      <button
        type="button"
        class="nav-link {currentRoute === 'reviews' ? 'active' : ''}"
        on:click={() => navigate('reviews')}
      >
        Reviews
      </button>
      <button
        type="button"
        class="nav-link {currentRoute === 'community' ? 'active' : ''}"
        on:click={() => navigate('community')}
      >
        Community
      </button>
    </nav>
    
    <!-- Right Navigation Icons -->
    <div class="hidden md:flex items-center space-x-3">
      <!-- Shopping Bag Icon -->
      <button
        type="button"
        class="nav-icon relative {currentRoute === 'store' ? 'active' : ''}"
        on:click={() => { navigate('store'); updateCartCount(); }}
        title="Shopping Bag"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119.993zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
        </svg>
        {#if cartItemCount > 0}
          <span class="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
            {cartItemCount}
          </span>
        {/if}
      </button>

      <!-- Wishlist Icon (only shown when logged in) -->
      {#if isLoggedIn}
        <button
          type="button"
          class="nav-icon relative {currentRoute === 'wishlist' ? 'active' : ''}"
          on:click={() => navigate('wishlist')}
          title="Wishlist"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
          </svg>
          <!-- Wishlist Count Badge -->
          {#if wishlistItemCount > 0}
            <span class="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
              {wishlistItemCount}
            </span>
          {/if}
        </button>
      {/if}

      <!-- Contact Icon -->
      <button
        type="button"
        class="nav-icon {currentRoute === 'contact' ? 'active' : ''}"
        on:click={() => navigate('contact')}
        title="Contact"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
        </svg>
      </button>

      <!-- Auth Button -->
      {#if isLoggedIn}
        {#if user?.role === 'admin' || user?.email === 'admin@shilohexperience.com'}
          <button
            class="text-sm font-medium text-primary mr-2 hover:text-primary-dark transition-colors"
            on:click={() => navigate('admin')}
            title="Admin Panel"
          >
            Admin
          </button>
        {/if}
        <button
          class="nav-icon"
          on:click|preventDefault={() => navigate('dashboard')}
          title="My Account"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
          </svg>
        </button>
        <button
          class="text-sm font-medium text-gray-600 hover:text-red-500 transition-colors px-3 py-2 rounded-md hover:bg-gray-50"
          on:click={handleLogout}
          title="Log out"
        >
          Log out
        </button>
      {:else}
        <button
          class="nav-icon"
          on:click={handleLogin}
          title="Sign In"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
          </svg>
        </button>
      {/if}
    </div>
    
    <!-- Mobile Menu Button -->
    <button
      class="mobile-menu-button md:hidden focus:outline-none"
      style="color: var(--color-primary);"
      on:click={toggleMobileMenu}
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        {#if isMobileMenuOpen}
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        {:else}
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        {/if}
      </svg>
    </button>
  </div>
  
  <!-- Mobile Menu -->
  {#if isMobileMenuOpen}
    <!-- Overlay for click-outside-to-close -->
    <div class="fixed inset-0 bg-black bg-opacity-20 z-40 md:hidden" on:click={handleOutsideClick}></div>

    <div class="mobile-menu-container md:hidden bg-white pb-4 animate-fade-in relative z-50">
      <nav class="flex flex-col space-y-3 px-4">
        <button
          type="button"
          class="nav-link-mobile {currentRoute === 'itinerary' ? 'active' : ''}"
          on:click={() => navigate('itinerary')}
        >
          Plan A Trip
        </button>
        <button
          type="button"
          class="nav-link-mobile {currentRoute === 'tours' ? 'active' : ''}"
          on:click={() => navigate('tours')}
        >
          Tour Packages
        </button>
        <button
          type="button"
          class="nav-link-mobile {currentRoute === 'accommodations' ? 'active' : ''}"
          on:click={() => navigate('accommodations')}
        >
          Accommodation
        </button>
        <button
          type="button"
          class="nav-link-mobile {currentRoute === 'transport' ? 'active' : ''}"
          on:click={() => navigate('transport')}
        >
          Travel Services
        </button>
        <button
          type="button"
          class="nav-link-mobile {currentRoute === 'reviews' ? 'active' : ''}"
          on:click={() => navigate('reviews')}
        >
          Reviews
        </button>
        <button
          type="button"
          class="nav-link-mobile {currentRoute === 'community' ? 'active' : ''}"
          on:click={() => navigate('community')}
        >
          Community
        </button>
        <!-- Store -->
        <button
          type="button"
          class="nav-link-mobile {currentRoute === 'store' ? 'active' : ''} flex items-center justify-center space-x-2"
          on:click={() => { navigate('store'); updateCartCount(); }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119.993zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
          </svg>
          <span>Gifts & Souvenirs</span>
          {#if cartItemCount > 0}
            <span class="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold ml-auto">
              {cartItemCount}
            </span>
          {/if}
        </button>
        <!-- Contact -->
        <button
          type="button"
          class="nav-link-mobile {currentRoute === 'contact' ? 'active' : ''} flex items-center justify-center space-x-2"
          on:click={() => navigate('contact')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
          </svg>
          <span>Contact</span>
        </button>

        <div class="pt-2 border-t border-gray-200">
          {#if isLoggedIn}
            <!-- Wishlist (only for logged in users) -->
            <button
              type="button"
              class="nav-link-mobile {currentRoute === 'wishlist' ? 'active' : ''} flex items-center justify-center space-x-2"
              on:click={() => navigate('wishlist')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>
              <span>Wishlist</span>
            </button>

            <!-- My Account -->
            <button
              type="button"
              class="nav-link-mobile flex items-center justify-center space-x-2 {currentRoute === 'dashboard' ? 'active' : ''}"
              on:click={() => navigate('dashboard')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
              </svg>
              <span>My Account</span>
            </button>

            <!-- Log out -->
            <button
              class="nav-link-mobile flex items-center justify-center py-3 text-gray-600 hover:text-red-500 transition-colors"
              on:click={handleLogout}
            >
              <span>Log out</span>
            </button>
          {:else}
            <!-- My Account Button -->
            <div class="px-4 py-2">
              <button
                type="button"
                class="w-full text-white py-3 px-6 rounded-md font-medium transition-colors"
                style="background-color: var(--color-primary-light);"
                on:mouseover={(e) => e.target.style.backgroundColor='var(--color-primary)'}
                on:mouseout={(e) => e.target.style.backgroundColor='var(--color-primary-light)'}
                on:click={handleLogin}
              >
                My Account
              </button>
            </div>
          {/if}
        </div>
      </nav>
    </div>
  {/if}
</header>

<!-- Spacer for fixed header -->
<div class="h-[76px]"></div>

<style>
  .nav-link {
    position: relative;
    color: var(--color-primary); /* Dark tourism green */
    font-weight: 500;
    font-size: 1.05rem;
    padding: 0.375rem 0;
    letter-spacing: 0.01em;
    transition: color 200ms ease;
    background: transparent;
    border: none;
    outline: none;
    cursor: pointer;
    font-family: inherit;
    text-decoration: none;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
  }

  .nav-link:hover {
    color: var(--color-primary-dark); /* Darker green on hover */
    background: transparent;
  }

  .nav-link:focus {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
    background: transparent;
  }

  .nav-link.active {
    color: var(--color-primary-dark); /* Darker green for active */
    font-weight: 600;
  }

  .nav-link.active::after {
    content: "";
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: var(--color-primary-light); /* Bright green underline */
  }

  .nav-link-mobile {
    padding: 1rem 0.5rem;
    font-weight: 500;
    font-size: 1rem;
    color: var(--color-primary); /* Dark tourism green */
    border-bottom: 1px solid var(--color-gray-100);
    background: transparent;
    border-top: none;
    border-left: none;
    border-right: none;
    outline: none;
    cursor: pointer;
    font-family: inherit;
    text-align: center;
    width: 100%;
    letter-spacing: 0.01em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
  }

  .nav-link-mobile:hover {
    background: transparent;
    color: var(--color-primary-dark); /* Darker green on hover */
  }

  .nav-link-mobile:focus {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
    background: transparent;
  }

  .nav-link-mobile.active {
    color: var(--color-primary-dark); /* Darker green for active */
    font-weight: 600;
  }

  .nav-icon {
    position: relative;
    color: var(--color-primary); /* Dark tourism green */
    padding: 0.5rem;
    border-radius: 0.5rem;
    transition: all 200ms ease;
    background: transparent;
    border: none;
    outline: none;
    cursor: pointer;
    font-family: inherit;
    text-decoration: none;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
  }

  .nav-icon:hover {
    color: var(--color-primary-dark); /* Darker green on hover */
    background-color: var(--color-gray-50);
  }

  .nav-icon:focus {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
  }

  .nav-icon.active {
    color: var(--color-primary-light); /* Bright green for active icons */
    background-color: rgba(34, 197, 94, 0.1); /* Light green background */
  }
</style>
