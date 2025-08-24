<script>
  import { createEventDispatcher } from 'svelte';
  
  export let bookingData = null;
  export let isLoggedIn = false;
  
  const dispatch = createEventDispatcher();
  
  let step = 1;
  let totalSteps = 3;
  let formData = {
    startDate: '',
    endDate: '',
    adults: 0,
    children: 0,
    specialRequests: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    paymentMethod: 'credit'
  };
  
  let calculatedDuration = 0;
  let calculatedBasePrice = 0;
  let calculatedTaxes = 0;
  let calculatedTotalPrice = 0;

  // Initialize default dates when bookingData changes
  let initializedBookingType = null;
  $: if (bookingData && initializedBookingType !== bookingData.type) {
    initializedBookingType = bookingData.type;

    if (bookingData.type === 'tour') {
      // For tours, set default dates (today + 1 week)
      const today = new Date();
      const nextWeek = new Date();
      nextWeek.setDate(today.getDate() + 7);

      formData.startDate = nextWeek.toISOString().split('T')[0];

      if (bookingData.item.duration) {
        const endDate = new Date(nextWeek);
        endDate.setDate(nextWeek.getDate() + bookingData.item.duration - 1);
        formData.endDate = endDate.toISOString().split('T')[0];
      }
    } else if (bookingData.type === 'accommodation') {
      // For accommodations, set default dates (today + 3 days, for 3 nights)
      const today = new Date();
      const checkIn = new Date();
      checkIn.setDate(today.getDate() + 3);

      const checkOut = new Date(checkIn);
      checkOut.setDate(checkIn.getDate() + 3);

      formData.startDate = checkIn.toISOString().split('T')[0];
      formData.endDate = checkOut.toISOString().split('T')[0];
    } else if (bookingData.type === 'transport') {
      // For transport, set default dates (today + 2 days, for 3 days)
      const today = new Date();
      const pickupDate = new Date();
      pickupDate.setDate(today.getDate() + 2);

      const returnDate = new Date(pickupDate);
      returnDate.setDate(pickupDate.getDate() + 3);

      formData.startDate = pickupDate.toISOString().split('T')[0];
      formData.endDate = returnDate.toISOString().split('T')[0];
    }
  }

  // Calculate booking details
  $: if (formData.startDate && formData.endDate) {
    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);
    calculatedDuration = Math.max(1, Math.ceil((end - start) / (1000 * 60 * 60 * 24)));
  }

  // Calculate total price with improved accuracy
  $: if (bookingData && bookingData.item && bookingData.item.price) {
    let basePrice = 0;
    const totalAdults = Math.max(0, parseInt(formData.adults) || 0);
    const totalChildren = Math.max(0, parseInt(formData.children) || 0);
    const totalPeople = totalAdults + totalChildren;

    if (bookingData.type === 'tour') {
      // Tours are per person - adults full price, children 60% discount
      const adultPrice = totalAdults * bookingData.item.price;
      const childPrice = totalChildren * bookingData.item.price * 0.6;
      basePrice = adultPrice + childPrice;

      // If no adults or children specified, show price for 1 person
      if (totalPeople === 0) {
        basePrice = bookingData.item.price;
      }
    } else if (bookingData.type === 'accommodation') {
      // Accommodations are per night, regardless of number of people (room-based pricing)
      // But add occupancy fees for additional guests beyond 2 adults
      basePrice = bookingData.item.price * Math.max(1, calculatedDuration);

      // Add occupancy fee for extra adults (beyond 2)
      if (totalAdults > 2) {
        const extraAdults = totalAdults - 2;
        basePrice += extraAdults * 25 * Math.max(1, calculatedDuration); // $25 per extra adult per night
      }

      // Add child fee if children present
      if (totalChildren > 0) {
        basePrice += totalChildren * 15 * Math.max(1, calculatedDuration); // $15 per child per night
      }
    } else if (bookingData.type === 'transport') {
      // Transport is per day, vehicle-based pricing
      basePrice = bookingData.item.price * Math.max(1, calculatedDuration);

      // Add group surcharge for larger groups (beyond 4 people)
      if (totalPeople > 4) {
        const extraPeople = totalPeople - 4;
        basePrice += extraPeople * 10 * Math.max(1, calculatedDuration); // $10 per extra person per day
      }
    }

    calculatedBasePrice = Math.round(basePrice * 100) / 100; // Round to 2 decimal places
    calculatedTaxes = Math.round(basePrice * 0.18 * 100) / 100; // 18% tax
    calculatedTotalPrice = Math.round((basePrice + calculatedTaxes) * 100) / 100;
  } else {
    calculatedBasePrice = 0;
    calculatedTaxes = 0;
    calculatedTotalPrice = 0;
  }
  
  function handleClose() {
    dispatch('close');
  }
  
  function nextStep() {
    if (!isLoggedIn && step === 1) {
      // If not logged in, show login modal
      dispatch('login-required');
      return;
    }
    
    if (step < totalSteps) {
      step++;
    } else {
      // Complete booking
      const bookingId = `BK${Date.now().toString().slice(-8)}`;
      const completeBookingData = {
        ...bookingData,
        bookingId: bookingId,
        duration: calculatedDuration,
        basePrice: calculatedBasePrice,
        taxes: calculatedTaxes,
        totalPrice: calculatedTotalPrice,
        bookingDate: new Date().toISOString(),
        status: 'confirmed'
      };

      // Simulate email confirmation
      const emailContent = `
        Dear ${formData.firstName} ${formData.lastName},

        Your booking has been confirmed!

        Booking ID: ${bookingId}
        Service: ${bookingData.item.name}
        Total: $${calculatedTotalPrice.toFixed(2)}

        We will contact you shortly with further details.

        Thank you for choosing The Shiloh Experience!
      `;

      console.log('Email sent to:', formData.email, emailContent);

      // Show success message
      alert(`🎉 Booking Confirmed!\n\nBooking ID: ${bookingId}\nTotal: $${calculatedTotalPrice.toFixed(2)}\n\nA confirmation email has been sent to ${formData.email}`);

      dispatch('booking-complete', {
        bookingData: completeBookingData,
        formData,
        bookingId
      });
    }
  }
  
  function prevStep() {
    if (step > 1) {
      step--;
    }
  }
  
  function getTitle() {
    if (!bookingData) return 'Booking';

    switch (bookingData.type) {
      case 'accommodation':
        return `Book ${bookingData.item.name}`;
      case 'tour':
        return `Book ${bookingData.item.name}`;
      case 'transport':
        return `Hire ${bookingData.item.name}`;
      default:
        return 'Booking';
    }
  }

  function getSpecialRequestsPlaceholder() {
    if (!bookingData) return 'Any special requirements or other requests...';

    switch (bookingData.type) {
      case 'accommodation':
        return 'Room preferences (e.g., non-smoking, high floor, twin beds), accessibility needs (wheelchair accessible, hearing assistance), special occasions (honeymoon, anniversary, birthday), dietary requirements, early/late check-in requests, or other specific accommodation needs...';
      case 'tour':
        return 'Mobility considerations (walking difficulties, wheelchair access), fitness level requirements, specific interests or focus areas, dietary restrictions, photography preferences, group size considerations, adventure level preferences, special assistance requirements, or other tour customizations...';
      case 'transport':
        return 'Specific pickup/drop-off locations, additional stops en route, vehicle type preferences (air conditioning, manual/automatic), child car seats needed, extra luggage space, driver language preferences, special driving requirements, or other transportation needs...';
      default:
        return 'Any special requirements or other requests...';
    }
  }
</script>

{#if bookingData}
<div class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" on:click={handleClose}>
  <div class="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[85vh] overflow-hidden flex flex-col" on:click|stopPropagation>
    <!-- Header -->
    <div class="flex justify-between items-center p-6 border-b">
      <h2 class="text-2xl font-semibold text-gray-800">{getTitle()}</h2>
      <button class="text-gray-500 hover:text-gray-800" on:click={handleClose}>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
    
    <!-- Progress Bar -->
    <div class="px-6 pt-4">
      <div class="flex items-center justify-between mb-2">
        <span class="text-sm font-medium text-gray-600">Step {step} of {totalSteps}</span>
        <span class="text-sm text-gray-500">{Math.round((step / totalSteps) * 100)}% Complete</span>
      </div>
      <div class="w-full bg-gray-200 rounded-full h-2.5">
        <div class="h-2.5 rounded-full" style="width: {(step / totalSteps) * 100}%; background-color: var(--color-primary-light);"></div>
      </div>
    </div>
    
    <!-- Scrollable Body -->
    <div class="flex-1 overflow-y-auto p-6">
      <!-- Step 1: Booking Details -->
      {#if step === 1}
      <div class="mb-6">
        <h3 class="text-lg font-semibold mb-4">Booking Details</h3>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              {bookingData.type === 'accommodation' ? 'Check-in Date' : 
               bookingData.type === 'transport' ? 'Pick-up Date' : 'Start Date'}
            </label>
            <input 
              type="date" 
              bind:value={formData.startDate}
              class="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              {bookingData.type === 'accommodation' ? 'Check-out Date' : 
               bookingData.type === 'transport' ? 'Return Date' : 'End Date'}
            </label>
            <input 
              type="date" 
              bind:value={formData.endDate}
              class="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Adults</label>
            <input 
              type="number" 
              bind:value={formData.adults}
              min="0" max="20" required
              class="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Children</label>
            <input 
              type="number" 
              bind:value={formData.children}
              min="0" max="10"
              class="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
        
        <div class="mt-4">
          <label class="block text-sm font-medium text-gray-700 mb-1">Special Requests (optional)</label>
          <textarea 
            bind:value={formData.specialRequests}
            rows="3"
            class="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder={getSpecialRequestsPlaceholder()}
          ></textarea>
        </div>
      </div>
      
      <!-- Booking Summary -->
      <div class="bg-gray-50 p-4 rounded-lg mb-4">
        <h4 class="font-semibold mb-2">Booking Summary</h4>
        <div class="flex justify-between mb-1">
          <span>{bookingData.item.name}</span>
          <span>${bookingData.item.price}
            {bookingData.type === 'accommodation' ? '/night' :
             bookingData.type === 'tour' ? '/person' : '/day'}
          </span>
        </div>

        {#if bookingData.type === 'tour'}
          {#if (formData.adults || 0) > 0}
          <div class="flex justify-between mb-1 text-sm text-gray-600">
            <span>Adults ({formData.adults || 0})</span>
            <span>${((formData.adults || 0) * bookingData.item.price).toFixed(2)}</span>
          </div>
          {/if}
          {#if (formData.children || 0) > 0}
          <div class="flex justify-between mb-1 text-sm text-gray-600">
            <span>Children ({formData.children || 0}) - 40% off</span>
            <span>${((formData.children || 0) * bookingData.item.price * 0.6).toFixed(2)}</span>
          </div>
          {/if}
          {#if (formData.adults || 0) === 0 && (formData.children || 0) === 0}
          <div class="flex justify-between mb-1 text-sm text-orange-600">
            <span>Price shown for 1 person</span>
            <span>Please select number of guests</span>
          </div>
          {/if}
        {:else}
          {#if calculatedDuration}
          <div class="flex justify-between mb-1 text-sm text-gray-600">
            <span>Duration: {calculatedDuration} {calculatedDuration === 1 ? 'day' : 'days'}</span>
            <span>${(bookingData.item.price * calculatedDuration).toFixed(2)}</span>
          </div>
          {/if}

          {#if bookingData.type === 'accommodation'}
            {#if (formData.adults || 0) > 2}
            <div class="flex justify-between mb-1 text-sm text-gray-600">
              <span>Extra adults ({(formData.adults || 0) - 2}) @ $25/night</span>
              <span>${(((formData.adults || 0) - 2) * 25 * calculatedDuration).toFixed(2)}</span>
            </div>
            {/if}
            {#if (formData.children || 0) > 0}
            <div class="flex justify-between mb-1 text-sm text-gray-600">
              <span>Children ({formData.children || 0}) @ $15/night</span>
              <span>${((formData.children || 0) * 15 * calculatedDuration).toFixed(2)}</span>
            </div>
            {/if}
          {/if}

          {#if bookingData.type === 'transport' && ((formData.adults || 0) + (formData.children || 0)) > 4}
          <div class="flex justify-between mb-1 text-sm text-gray-600">
            <span>Group surcharge ({((formData.adults || 0) + (formData.children || 0)) - 4} extra) @ $10/day</span>
            <span>${((((formData.adults || 0) + (formData.children || 0)) - 4) * 10 * calculatedDuration).toFixed(2)}</span>
          </div>
          {/if}

          {#if ((formData.adults || 0) + (formData.children || 0)) > 0}
          <div class="flex justify-between mb-1 text-sm text-gray-600">
            <span>Guests: {(formData.adults || 0) + (formData.children || 0)} {((formData.adults || 0) + (formData.children || 0)) === 1 ? 'person' : 'people'}</span>
            <span>({formData.adults || 0} adults, {formData.children || 0} children)</span>
          </div>
          {/if}
        {/if}

        <div class="flex justify-between mb-1 text-sm text-gray-600 mt-2 pt-2 border-t">
          <span>Subtotal</span>
          <span>${calculatedBasePrice ? calculatedBasePrice.toFixed(2) : '0.00'}</span>
        </div>
        <div class="flex justify-between mb-1 text-sm text-gray-600">
          <span>Taxes & Fees (18%)</span>
          <span>${calculatedTaxes ? calculatedTaxes.toFixed(2) : '0.00'}</span>
        </div>
        <div class="flex justify-between font-semibold mt-2 pt-2 border-t">
          <span>Total</span>
          <span class="text-primary">${calculatedTotalPrice ? calculatedTotalPrice.toFixed(2) : '0.00'}</span>
        </div>
      </div>
      {/if}
      
      <!-- Step 2: Personal Information -->
      {#if step === 2}
      <div class="mb-6">
        <h3 class="text-lg font-semibold mb-4">Personal Information</h3>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">First Name</label>
            <input 
              type="text" 
              bind:value={formData.firstName}
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
            <input 
              type="text" 
              bind:value={formData.lastName}
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input 
              type="email" 
              bind:value={formData.email}
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input 
              type="tel" 
              bind:value={formData.phone}
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
      </div>
      {/if}
      
      <!-- Step 3: Payment Information -->
      {#if step === 3}
      <div class="mb-6">
        <h3 class="text-lg font-semibold mb-4">Payment Information</h3>
        
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
            <label class="flex items-center p-3 border rounded-md transition-colors cursor-pointer {formData.paymentMethod === 'credit' ? 'border-primary-light' : 'border-gray-300'}" style="{formData.paymentMethod === 'credit' ? 'background-color: rgba(34, 197, 94, 0.1); border-color: var(--color-primary-light);' : ''}">
              <input type="radio" name="paymentMethod" value="credit" bind:group={formData.paymentMethod} class="mr-2" />
              <span>Credit Card</span>
            </label>
            <label class="flex items-center p-3 border rounded-md transition-colors cursor-pointer {formData.paymentMethod === 'paypal' ? 'border-primary-light' : 'border-gray-300'}" style="{formData.paymentMethod === 'paypal' ? 'background-color: rgba(34, 197, 94, 0.1); border-color: var(--color-primary-light);' : ''}">
              <input type="radio" name="paymentMethod" value="paypal" bind:group={formData.paymentMethod} class="mr-2" />
              <span>PayPal</span>
            </label>
            <label class="flex items-center p-3 border rounded-md transition-colors cursor-pointer {formData.paymentMethod === 'bank' ? 'border-primary-light' : 'border-gray-300'}" style="{formData.paymentMethod === 'bank' ? 'background-color: rgba(34, 197, 94, 0.1); border-color: var(--color-primary-light);' : ''}">
              <input type="radio" name="paymentMethod" value="bank" bind:group={formData.paymentMethod} class="mr-2" />
              <span>Bank Transfer</span>
            </label>
          </div>
        </div>
        
        {#if formData.paymentMethod === 'credit'}
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
            <input type="text" placeholder="1234 5678 9012 3456" class="w-full px-3 py-2 border border-gray-300 rounded-md" />
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Expiration Date</label>
              <input type="text" placeholder="MM/YY" class="w-full px-3 py-2 border border-gray-300 rounded-md" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">CVC</label>
              <input type="text" placeholder="123" class="w-full px-3 py-2 border border-gray-300 rounded-md" />
            </div>
          </div>
        </div>
        {:else if formData.paymentMethod === 'paypal'}
        <div class="p-6 text-center border rounded-md bg-gray-50">
          <p class="mb-2 text-gray-600">You will be redirected to PayPal to complete your payment.</p>
        </div>
        {:else}
        <div class="p-6 text-center border rounded-md bg-gray-50">
          <p class="mb-4 text-gray-600">Please make a bank transfer to the following account:</p>
          <div class="text-left max-w-sm mx-auto space-y-2">
            <p><span class="font-semibold">Bank Name:</span> ABC Bank Uganda</p>
            <p><span class="font-semibold">Account Name:</span> Shiloh U Ltd</p>
            <p><span class="font-semibold">Account Number:</span> 1234567890</p>
            <p><span class="font-semibold">Reference:</span> Your Name + Booking ID</p>
          </div>
        </div>
        {/if}
      </div>
      {/if}
    </div>
    
    <!-- Fixed Footer -->
    <div class="flex-shrink-0 px-6 py-4 border-t bg-white flex justify-between">
      {#if step > 1}
        <button 
          class="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors" 
          on:click={prevStep}
        >
          Previous
        </button>
      {:else}
        <div></div>
      {/if}
      
      <button
        class="px-6 py-2 text-white rounded-md transition-colors"
        style="background-color: var(--color-primary-light);"
        on:mouseover={(e) => e.target.style.backgroundColor='var(--color-primary)'}
        on:mouseout={(e) => e.target.style.backgroundColor='var(--color-primary-light)'}
        on:click={nextStep}
      >
        {step === totalSteps ? 'Complete Booking' : 'Next'}
      </button>
    </div>
  </div>
</div>
{/if}

<style>
  /* Add any additional styles here */
</style>
