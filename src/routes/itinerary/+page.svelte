<script>
  import Itinerary from '$lib/components/Itinerary.svelte';
  import { page } from '$app/stores';
  
  // Get user data from layout if needed
  let isLoggedIn = false;
  let user = null;
  
  // Check localStorage for user
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
  });
  
  function handleLogin() {
    // Dispatch login event to layout
    window.dispatchEvent(new CustomEvent('showAuth'));
  }
</script>

<Itinerary {isLoggedIn} on:login={handleLogin} />
