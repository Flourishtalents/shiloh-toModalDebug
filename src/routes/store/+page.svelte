<script>
  import EStore from '../../../lib/components/EStore.svelte';
  import { goto } from '$app/navigation';
  
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
  
  function handleNavigate(event) {
    const route = event.detail.route;
    if (route === 'home') {
      goto('/');
    } else {
      goto(`/${route}`);
    }
  }
</script>

<EStore {user} on:navigate={handleNavigate} />
