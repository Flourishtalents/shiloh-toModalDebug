<script>
  import Tours from '../../lib/components/Tours.svelte';

  // Get user data
  let user = null;
  import { onMount } from 'svelte';
  onMount(() => {
    const storedUser = localStorage.getItem('shiloh_user');
    if (storedUser) {
      try {
        user = JSON.parse(storedUser);
      } catch (e) {
        console.error('Failed to parse user data', e);
      }
    }
  });

  function handleBook(event) {
    // Dispatch booking event to layout
    window.dispatchEvent(new CustomEvent('openBooking', { detail: event.detail }));
  }
</script>

<Tours {user} on:book={handleBook} />
