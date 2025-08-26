<script>
  import { onMount } from 'svelte';
  import Header from '../lib/components/Header.svelte';
  import Footer from '../lib/components/Footer.svelte';
  import Auth from '../lib/components/Auth.svelte';
  import BookingModal from '../lib/components/BookingModal.svelte';
  import AIChatbot from '../lib/components/AIChatbot.svelte';
  import '../app.css';

  // App state
  let showAuth = false;
  let showBookingModal = false;
  let bookingType = '';
  let bookingItem = null;
  let isLoggedIn = false;
  let user = null;

  // Check if user is logged in from localStorage
  onMount(() => {
    const storedUser = localStorage.getItem('shiloh_user');
    if (storedUser) {
      try {
        user = JSON.parse(storedUser);
        isLoggedIn = true;
      } catch (e) {
        console.error('Failed to parse user data', e);
      }
    }

    // Listen for custom events from child components
    const handleShowAuth = () => {
      showAuth = true;
    };

    const handleOpenBooking = (event) => {
      bookingType = event.detail.type;
      bookingItem = event.detail.item;
      showBookingModal = true;
    };

    window.addEventListener('showAuth', handleShowAuth);
    window.addEventListener('openBooking', handleOpenBooking);

    // Cleanup
    return () => {
      window.removeEventListener('showAuth', handleShowAuth);
      window.removeEventListener('openBooking', handleOpenBooking);
    };
  });

  // Auth handlers
  function showAuthModal() {
    showAuth = true;
  }

  function hideAuthModal() {
    showAuth = false;
  }

  function handleLogin(event) {
    user = event.detail.user;
    isLoggedIn = true;
    localStorage.setItem('shiloh_user', JSON.stringify(user));
    showAuth = false;
  }

  function handleLogout() {
    user = null;
    isLoggedIn = false;
    localStorage.removeItem('shiloh_user');
  }

  // Booking handlers
  function closeBookingModal() {
    showBookingModal = false;
    bookingItem = null;
  }

  function handleBookingComplete() {
    showBookingModal = false;
    bookingItem = null;
  }
</script>

<svelte:head>
  <title>The Shiloh Experience - Uganda Travel & Tours</title>
</svelte:head>

<div class="app">
  <Header
    {isLoggedIn}
    {user}
    on:login={showAuthModal}
    on:logout={handleLogout}
  />

  <main>
    <slot />
  </main>

  <Footer />

  {#if showAuth}
    <Auth
      on:close={hideAuthModal}
      on:login={handleLogin}
    />
  {/if}

  {#if showBookingModal}
    <BookingModal
      {bookingType}
      {bookingItem}
      {isLoggedIn}
      {user}
      on:close={closeBookingModal}
      on:login={showAuthModal}
      on:complete={handleBookingComplete}
    />
  {/if}

  <AIChatbot {user} />
</div>

<style>
  .app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  main {
    flex: 1;
  }

  :global(html, body) {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
  }

  :global(body) {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
  }

  :global(*) {
    font-family: 'Plus Jakarta Sans', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif !important;
  }

  :global(h1), :global(h2), :global(h3), :global(h4), :global(h5), :global(h6) {
    font-family: 'Plus Jakarta Sans', 'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif !important;
    font-weight: 650 !important;
    line-height: 1.25 !important;
    letter-spacing: -0.025em !important;
  }

  :global(*, *::before, *::after) {
    box-sizing: border-box;
  }

  :global(img) {
    max-width: 100%;
    height: auto;
  }

  :global(button, input, select, textarea) {
    font-family: inherit;
  }

  /* Mobile responsiveness safeguards */
  :global(.container, .max-w-7xl, .max-w-6xl, .max-w-5xl, .max-w-4xl) {
    width: 100%;
    padding-left: 1rem;
    padding-right: 1rem;
  }

  @media (max-width: 640px) {
    :global(.container, .max-w-7xl, .max-w-6xl, .max-w-5xl, .max-w-4xl) {
      padding-left: 0.75rem;
      padding-right: 0.75rem;
    }

    :global(.text-4xl, .text-5xl, .text-6xl) {
      word-break: break-word;
    }

    :global(table) {
      min-width: 100%;
    }
  }
</style>
