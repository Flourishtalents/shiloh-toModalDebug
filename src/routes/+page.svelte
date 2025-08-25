<script>
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import Home from '$lib/components/Home.svelte';

  let user = null;

  onMount(() => {
    // Get user data
    const storedUser = localStorage.getItem('shiloh_user');
    if (storedUser) {
      try {
        user = JSON.parse(storedUser);
      } catch (e) {
        console.error('Failed to parse user data', e);
      }
    }
  });

  function handleNavigate(event) {
    const route = event.detail.route;
    if (route === 'home') {
      goto('/');
    } else {
      goto(`/${route}`);
    }
  }

  function handleBook(event) {
    console.log('🎯 Route handleBook called:', event);
    console.log('🎯 Event detail:', event.detail);
    // Dispatch booking event to layout
    const windowEvent = new CustomEvent('openBooking', { detail: event.detail });
    window.dispatchEvent(windowEvent);
    console.log('🎯 Window event dispatched: openBooking', windowEvent);
  }
</script>

<svelte:head>
  <title>The Shiloh Experience - Uganda Travel & Tours</title>
</svelte:head>

<Home {user} on:navigate={handleNavigate} on:book={handleBook} />
