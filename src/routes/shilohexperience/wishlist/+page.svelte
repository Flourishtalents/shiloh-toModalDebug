<script>
  import Wishlist from '../../../lib/components/Wishlist.svelte';
  import { goto } from '$app/navigation';
  
  // Get user data and check if logged in
  let user = null;
  let isLoggedIn = false;
  
  import { onMount } from 'svelte';
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
    
    // Redirect to login if not logged in
    if (!isLoggedIn) {
      goto('/shilohexperience');
    }
  });
  
  function handleNavigate(event) {
    const route = event.detail.route;
    if (route === 'home') {
      goto('/shilohexperience');
    } else if (route === 'proempo') {
      goto('/');
    } else {
      goto(`/shilohexperience/${route}`);
    }
  }
  
  function handleBook(event) {
    // Dispatch booking event to layout
    window.dispatchEvent(new CustomEvent('openBooking', { detail: event.detail }));
  }
</script>

{#if isLoggedIn}
  <Wishlist {user} on:navigate={handleNavigate} on:book={handleBook} />
{:else}
  <div class="flex items-center justify-center min-h-screen">
    <div class="text-center">
      <h2 class="text-2xl font-bold mb-4">Please log in to view your wishlist</h2>
      <button 
        class="btn-primary" 
        on:click={() => goto('/shilohexperience')}
      >
        Go to Home
      </button>
    </div>
  </div>
{/if}
