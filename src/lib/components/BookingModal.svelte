<script>
  import { createEventDispatcher } from 'svelte';
  import Booking from './Booking.svelte';
  
  export let bookingType = '';
  export let bookingItem = null;
  export let isLoggedIn = false;
  export let user = null;
  
  const dispatch = createEventDispatcher();
  
  // Prepare booking data
  $: bookingData = bookingItem ? {
    type: bookingType,
    item: bookingItem,
    duration: null,
    basePrice: null,
    taxes: null,
    totalPrice: null
  } : null;
  
  function handleClose() {
    dispatch('close');
  }
  
  function handleLoginRequired() {
    dispatch('login');
  }
  
  function handleBookingComplete(event) {
    // Could save the booking to localStorage or a server
    if (isLoggedIn && user) {
      const bookingHistory = JSON.parse(localStorage.getItem(`shiloh_bookings_${user.id}`) || '[]');
      
      const newBooking = {
        id: `booking-${Date.now()}`,
        date: new Date().toISOString(),
        ...event.detail.bookingData,
        formData: event.detail.formData
      };
      
      bookingHistory.push(newBooking);
      localStorage.setItem(`shiloh_bookings_${user.id}`, JSON.stringify(bookingHistory));
    }
    
    dispatch('complete', event.detail);
  }
</script>

<Booking
  {bookingData}
  {isLoggedIn}
  on:close={handleClose}
  on:login-required={handleLoginRequired}
  on:booking-complete={handleBookingComplete}
/>