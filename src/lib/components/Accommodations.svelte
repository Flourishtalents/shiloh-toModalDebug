<script>
  import { createEventDispatcher } from 'svelte';
  import PersonalizedRecommendations from './PersonalizedRecommendations.svelte';
  import { addToWishlist, removeFromWishlist, isInWishlist } from '../utils/wishlist.js';

  const dispatch = createEventDispatcher();
  export let user = null;
  let selectedRegion = 'all';
  let searchQuery = '';
  let priceRange = [0, 1000];
  let ratings = [];
  let amenities = [];

  // Accommodation data (would come from an API in a real app)
  const accommodations = [
    // Shiloh Accommodations - Featured at the top
    {
      id: 'shiloh-muyenga',
      name: "Shiloh Guest Home - Muyenga",
      type: "Guest Home",
      region: "Central",
      location: "Kutta Road, Muyenga, Kampala",
      price: 150,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      amenities: ["Secure Parking", "Free WiFi", "Garden", "24/7 Security", "Breakfast Available", "Airport Transfer"],
      description: "Comfortable and secure guest home in the upscale Muyenga neighborhood. Modern amenities and authentic Ugandan hospitality since 2013.",
      isShilohProperty: true,
      featured: true
    },
    {
      id: 1,
      name: "Kampala Serena Hotel",
      type: "Hotel",
      region: "Central",
      location: "Kampala Hill, Kampala",
      price: 350,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      amenities: ["Pool", "Spa", "WiFi", "Restaurant", "Bar", "Gym", "Air Conditioning"],
      description: "Experience luxury in the heart of Kampala with stunning city views. Official Serena Hotels property with premium accommodations and excellent service."
    },
    {
      id: 2,
      name: "Murchison River Lodge",
      type: "Safari Lodge",
      region: "North",
      location: "Murchison Falls National Park",
      price: 400,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      amenities: ["Nature Walks", "Safari Tours", "WiFi", "Restaurant", "Bar"],
      description: "Safari lodge on the southern bank of the River Nile, overlooking Murchison Falls National Park with comfortable thatched cottages and safari tents."
    },
    {
      id: 3,
      name: "Lake Victoria Serena Resort & Spa",
      type: "Resort",
      region: "Central",
      location: "Kigo, Entebbe",
      price: 280,
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      amenities: ["Beach", "Golf Course", "Infinity Pool", "Spa", "WiFi", "Restaurant", "Bar", "Water Sports"],
      description: "Immersive lakefront experience featuring breathtaking sunsets, championship golf adventures, infinity pool relaxation, and exclusive access to Lake Victoria's pristine waters for unforgettable aquatic adventures."
    },
    {
      id: 4,
      name: "Buhoma Lodge",
      type: "Eco Lodge",
      region: "Southwest",
      location: "Buhoma, Bwindi Impenetrable Forest",
      price: 230,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      amenities: ["Nature Walks", "Gorilla Trekking", "Restaurant", "Eco-friendly", "Private Verandas"],
      description: "Comfortable cottages with private verandas overlooking the forest canopy. Situated in the northern sector with proximity to park entrance for gorilla trekking."
    },
    {
      id: 5,
      name: "Queen Elizabeth Safari Camp",
      type: "Safari Camp",
      region: "West",
      location: "Queen Elizabeth National Park",
      price: 190,
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      amenities: ["Safari Tours", "Nature Walks", "Restaurant", "Viewing Deck"],
      description: "Luxury tented camp in the heart of Queen Elizabeth National Park. Fall asleep to the sounds of the African wilderness."
    },
    {
      id: 6,
      name: "Jinja River Camp",
      type: "Adventure Camp",
      region: "East",
      location: "Jinja",
      price: 110,
      rating: 4.5,
      image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      amenities: ["Rafting", "Kayaking", "Restaurant", "Bar", "Adventure Sports"],
      description: "Adventure-focused accommodations near the source of the Nile. Perfect for thrill-seekers and water sports enthusiasts."
    },
    {
      id: 7,
      name: "Kampala Luxury Apartments",
      type: "Serviced Apartment",
      region: "Central",
      location: "Kampala",
      price: 140,
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      amenities: ["Kitchen", "WiFi", "Laundry", "Security", "Parking", "Air Conditioning"],
      description: "Fully serviced apartments in central Kampala with all the comforts of home. Ideal for longer stays and business travelers."
    },
    {
      id: 8,
      name: "Kibale Forest Cottages",
      type: "Cottages",
      region: "West",
      location: "Kibale Forest",
      price: 160,
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      amenities: ["Chimp Trekking", "Nature Walks", "Restaurant", "Bird Watching"],
      description: "Charming cottages nestled in Kibale Forest, home to 13 primate species including chimpanzees."
    },
    {
      id: 9,
      name: "Ssese Islands Beach Resort",
      type: "Beach Resort",
      region: "Central",
      location: "Ssese Islands, Lake Victoria",
      price: 170,
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      amenities: ["Beach", "Pool", "Restaurant", "Bar", "Boat Tours", "Water Sports"],
      description: "Island paradise on Lake Victoria's Ssese Islands. White sandy beaches and crystal clear waters await."
    }
  ];

  // Available regions
  const regions = ['Central', 'North', 'East', 'West', 'Southwest'];
  
  // Available amenities for filtering
  const availableAmenities = [
    "Pool", "Spa", "WiFi", "Restaurant", "Bar", "Gym", 
    "Beach", "Safari Tours", "Nature Walks", "Air Conditioning",
    "Water Sports", "Gorilla Trekking", "Chimp Trekking"
  ];
  
  // Filter accommodations based on selections
  $: filteredAccommodations = accommodations.filter(acc => {
    const matchesRegion = selectedRegion === 'all' || acc.region === selectedRegion;
    const matchesSearch = searchQuery === '' || 
                          acc.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          acc.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          acc.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = acc.price >= priceRange[0] && acc.price <= priceRange[1];
    const matchesRating = ratings.length === 0 || ratings.some(r => Math.floor(acc.rating) >= r);
    const matchesAmenities = amenities.length === 0 || 
                             amenities.every(a => acc.amenities.includes(a));
    
    return matchesRegion && matchesSearch && matchesPrice && matchesRating && matchesAmenities;
  });

  function bookAccommodation(accommodation) {
    dispatch('book', { type: 'accommodation', item: accommodation });
  }

  // Wishlist functionality
  function toggleWishlist(accommodation) {
    if (!user) {
      showNotification('Please sign in to add items to your wishlist', 'error');
      return;
    }

    const wishlistItem = {
      id: accommodation.id,
      name: accommodation.name,
      price: `$${accommodation.price}`,
      image: accommodation.image,
      type: 'accommodation',
      location: accommodation.location,
      rating: accommodation.rating
    };

    if (isInWishlist(accommodation.id, 'accommodation', user.id)) {
      const result = removeFromWishlist(accommodation.id, 'accommodation', user.id);
      if (result.success) {
        showNotification('Removed from wishlist', 'success');
      }
    } else {
      const result = addToWishlist(wishlistItem, user.id);
      if (result.success) {
        showNotification('Added to wishlist!', 'success');
      } else {
        showNotification(result.message, 'error');
      }
    }
  }

  // Simple notification system
  let notification = null;
  function showNotification(message, type = 'success') {
    notification = { message, type };
    setTimeout(() => {
      notification = null;
    }, 3000);
  }

  function toggleRatingFilter(rating) {
    if (ratings.includes(rating)) {
      ratings = ratings.filter(r => r !== rating);
    } else {
      ratings = [...ratings, rating].sort((a, b) => a - b);
    }
  }
  
  function toggleAmenityFilter(amenity) {
    if (amenities.includes(amenity)) {
      amenities = amenities.filter(a => a !== amenity);
    } else {
      amenities = [...amenities, amenity];
    }
  }
  
  function clearFilters() {
    selectedRegion = 'all';
    searchQuery = '';
    priceRange = [0, 1000];
    ratings = [];
    amenities = [];
  }
</script>

<div class="pt-16 pb-12">
  <div class="container-custom">
    <!-- Header -->
    <div class="mb-12">
      <h1 class="text-5xl font-bold mb-6 tracking-tight accommodations-heading-mobile">Accommodations</h1>
      <p class="text-xl text-gray-600 leading-relaxed tracking-wide max-w-4xl">
        Discover the finest places to stay across Uganda, from luxury hotels in Kampala to safari guest homes in national parks.
      </p>
    </div>

    <!-- Personalized Recommendations -->
    {#if user}
      <div class="mb-8">
        <PersonalizedRecommendations {user} showCompact={true} category="accommodations" maxItems={3} on:book />
      </div>
    {/if}

    <!-- Filters Section -->
    <div class="bg-white shadow-md rounded-lg p-8 mb-12">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h2 class="text-2xl font-semibold mb-4 md:mb-0 tracking-wide">Filters</h2>
        <button 
          class="text-primary hover:text-primary-dark font-medium flex items-center"
          on:click={clearFilters}
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd" />
          </svg>
          Clear Filters
        </button>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <!-- Search -->
        <div>
          <label for="search" class="block text-sm font-medium text-gray-700 mb-1">
            Search
          </label>
          <div class="relative">
            <input 
              type="text" 
              id="search" 
              placeholder="Search accommodations..."
              bind:value={searchQuery}
              class="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
        
        <!-- Region -->
        <div>
          <label for="region" class="block text-sm font-medium text-gray-700 mb-1">
            Region
          </label>
          <select 
            id="region" 
            bind:value={selectedRegion}
            class="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="all">All Regions</option>
            {#each regions as region}
              <option value={region}>{region}</option>
            {/each}
          </select>
        </div>
        
        <!-- Price Range -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Price Range ($ per night)
          </label>
          <div class="flex items-center space-x-2">
            <input 
              type="number" 
              bind:value={priceRange[0]} 
              min="0" 
              max={priceRange[1]}
              class="w-24 py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
            <span>to</span>
            <input 
              type="number" 
              bind:value={priceRange[1]} 
              min={priceRange[0]} 
              class="w-24 py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
          </div>
        </div>
        
        <!-- Star Rating -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Star Rating
          </label>
          <div class="flex space-x-3">
            {#each [5, 4, 3, 2, 1] as rating}
              <button 
                class="flex items-center justify-center w-10 h-10 rounded-full {ratings.includes(rating) ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'} hover:bg-primary-light hover:text-white transition-colors"
                on:click={() => toggleRatingFilter(rating)}
              >
                {rating}+
              </button>
            {/each}
          </div>
        </div>
      </div>
      
      <!-- Amenities -->
      <div class="mt-4">
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Amenities
        </label>
        <div class="flex flex-wrap gap-2">
          {#each availableAmenities as amenity}
            <button 
              class="px-3 py-1 text-sm rounded-full {amenities.includes(amenity) ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'} hover:bg-primary-light hover:text-white transition-colors"
              on:click={() => toggleAmenityFilter(amenity)}
            >
              {amenity}
            </button>
          {/each}
        </div>
      </div>
    </div>

    <!-- Results Count -->
    <p class="mb-6 text-gray-600 text-lg">
      Showing {filteredAccommodations.length} of {accommodations.length} accommodations
    </p>

    <!-- Accommodations Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      {#each filteredAccommodations as accommodation (accommodation.id)}
        <div class="card overflow-hidden {accommodation.isShilohProperty ? 'ring-2 ring-accent shadow-xl' : ''}">
          {#if accommodation.isShilohProperty}
            <div class="bg-gradient-to-r from-primary to-primary-dark text-white px-4 py-2 text-center font-semibold flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              THE SHILOH EXPERIENCE - FEATURED PROPERTY
            </div>
          {/if}
          <div class="h-56 overflow-hidden relative group">
            <img
              src={accommodation.image}
              alt={accommodation.name}
              class="w-full h-full object-cover"
            />
            <!-- Wishlist button -->
            <div class="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                class="bg-white p-2 rounded-full shadow-md hover:bg-gray-50 transition-colors"
                on:click|stopPropagation={() => toggleWishlist(accommodation)}
                title={isInWishlist(accommodation.id, 'accommodation', user?.id) ? 'Remove from wishlist' : 'Add to wishlist'}
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 {isInWishlist(accommodation.id, 'accommodation', user?.id) ? 'text-red-500 fill-current' : 'text-gray-600 hover:text-red-500'}" fill={isInWishlist(accommodation.id, 'accommodation', user?.id) ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
              </button>
            </div>
          </div>
          <div class="p-8">
            <div class="flex justify-between items-start mb-4">
              <div>
                <h3 class="text-2xl font-semibold tracking-wide {accommodation.isShilohProperty ? 'text-primary' : ''}">{accommodation.name}</h3>
                {#if accommodation.isShilohProperty}
                  <span class="text-accent text-base font-medium">🏆 Our Premier Property</span>
                {/if}
              </div>
              <span class="bg-primary-light/10 text-primary px-2 py-1 rounded-md text-sm font-medium">
                ${accommodation.price}/night
              </span>
            </div>
            <div class="flex items-center mb-1">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-accent" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
              </svg>
              <span class="ml-1 text-gray-600">{accommodation.location}</span>
            </div>
            <div class="text-gray-500 mb-3 text-sm">{accommodation.type}</div>
            <div class="flex items-center mb-3">
              <div class="flex">
                {#each Array(5) as _, i}
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 {i < Math.floor(accommodation.rating) ? 'text-yellow-400' : 'text-gray-300'}" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                {/each}
              </div>
              <span class="ml-1 text-gray-600">{accommodation.rating} ({Math.floor(Math.random() * 50) + 10} reviews)</span>
            </div>
            <div class="mb-3">
              <div class="flex flex-wrap gap-2">
                {#each accommodation.amenities.slice(0, 3) as amenity}
                  <span class="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-xs">
                    {amenity}
                  </span>
                {/each}
                {#if accommodation.amenities.length > 3}
                  <span class="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-xs">
                    +{accommodation.amenities.length - 3} more
                  </span>
                {/if}
              </div>
            </div>
            <p class="text-gray-600 mb-4 line-clamp-2">{accommodation.description}</p>
            <button
              class="w-full py-2 font-semibold transition-colors {accommodation.isShilohProperty ? 'bg-accent hover:bg-accent-dark text-white shadow-lg' : 'btn-primary'}"
              on:click={() => bookAccommodation(accommodation)}
            >
              {accommodation.isShilohProperty ? 'Book The Shiloh Experience' : 'Book Now'}
            </button>
          </div>
        </div>
      {/each}
      
      {#if filteredAccommodations.length === 0}
        <div class="col-span-full flex flex-col items-center justify-center py-12">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 class="text-xl font-semibold text-gray-700 mb-2">No accommodations found</h3>
          <p class="text-gray-500">Try adjusting your filters or search terms</p>
          <button 
            class="mt-4 btn-secondary py-2 px-4"
            on:click={clearFilters}
          >
            Clear Filters
          </button>
        </div>
      {/if}
    </div>
  </div>
</div>

<!-- Notification Toast -->
{#if notification}
  <div class="fixed top-4 right-4 z-50 animate-fade-in">
    <div class="bg-white border border-gray-200 rounded-lg shadow-lg p-4 max-w-sm">
      <div class="flex items-center space-x-3">
        {#if notification.type === 'success'}
          <div class="bg-green-100 rounded-full p-1">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        {:else}
          <div class="bg-red-100 rounded-full p-1">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        {/if}
        <p class="text-gray-900 font-medium">{notification.message}</p>
      </div>
    </div>
  </div>
{/if}

<style>
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  /* Mobile responsive accommodations heading */
  @media (max-width: 768px) {
    :global(.accommodations-heading-mobile) {
      font-size: 2.5rem !important; /* Smaller than desktop 5xl */
      line-height: 1.1 !important;
      letter-spacing: -0.025em !important;
      word-break: break-word;
      max-width: 100%;
    }
  }

  @media (max-width: 480px) {
    :global(.accommodations-heading-mobile) {
      font-size: 2rem !important; /* Even smaller for very small screens */
      line-height: 1.2 !important;
    }
  }
</style>
