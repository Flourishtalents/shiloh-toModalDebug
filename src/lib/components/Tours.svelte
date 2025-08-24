<script>
  import { createEventDispatcher } from 'svelte';
  import PersonalizedRecommendations from './PersonalizedRecommendations.svelte';
  import { addToWishlist, removeFromWishlist, isInWishlist } from '../utils/wishlist.js';

  const dispatch = createEventDispatcher();
  export let user = null;
  let selectedCategory = 'all';
  let searchQuery = '';
  let durationRange = [1, 14]; // Days
  let priceRange = [0, 2000];
  let selectedActivities = [];

  // Tours data
  const tours = [
    {
      id: 1,
      name: "Gorilla Trekking Adventure",
      category: "Wildlife",
      location: "Bwindi Impenetrable Forest",
      duration: 3,
      price: 1200,
      rating: 5.0,
      activities: ["Gorilla Trekking", "Bird Watching", "Forest Walks", "Cultural Visits"],
      image: "https://images.pexels.com/photos/1238272/pexels-photo-1238272.jpeg",
      description: "Get up close with mountain gorillas in their natural habitat. This life-changing experience includes guided treks through Bwindi Impenetrable Forest and encounters with gorilla families. Includes $800 permit for foreign non-residents (effective July 2024)."
    },
    {
      id: 2,
      name: "Big Five Safari",
      category: "Wildlife",
      location: "Queen Elizabeth National Park",
      duration: 4,
      price: 650,
      rating: 4.8,
      activities: ["Game Drives", "Boat Cruises", "Bird Watching", "Nature Walks"],
      image: "https://images.pexels.com/photos/5767214/pexels-photo-5767214.jpeg",
      description: "Spot lions, elephants, buffalos, leopards, and rhinos on this safari adventure in Queen Elizabeth National Park, one of Uganda's premier wildlife destinations."
    },
    {
      id: 3,
      name: "Nile River Expedition",
      category: "Adventure",
      location: "Jinja",
      duration: 2,
      price: 300,
      rating: 4.7,
      activities: ["White Water Rafting", "Kayaking", "Bungee Jumping", "Zip Lining"],
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      description: "Experience the thrill of white-water rafting and adventure activities at the source of the Nile. This adrenaline-packed tour is perfect for adventure seekers."
    },
    {
      id: 4,
      name: "Murchison Falls Discovery",
      category: "Nature",
      location: "Murchison Falls National Park",
      duration: 3,
      price: 550,
      rating: 4.8,
      activities: ["Game Drives", "Boat Safaris", "Waterfall Visits", "Bird Watching"],
      image: "https://images.pexels.com/photos/1236906/pexels-photo-1236906.jpeg",
      description: "Discover the spectacular Murchison Falls where the Nile squeezes through a narrow gorge. Enjoy game drives and boat safaris in Uganda's largest national park."
    },
    {
      id: 5,
      name: "Kampala City Tour",
      category: "Cultural",
      location: "Kampala",
      duration: 1,
      price: 80,
      rating: 4.6,
      activities: ["Market Visits", "Museum Tours", "Cultural Sites", "Local Cuisine"],
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      description: "Explore Uganda's vibrant capital with visits to historical sites, bustling markets, and cultural attractions. Experience the city's rich heritage and local cuisine."
    },
    {
      id: 6,
      name: "Rwenzori Mountains Trek",
      category: "Adventure",
      location: "Rwenzori Mountains",
      duration: 7,
      price: 1200,
      rating: 4.9,
      activities: ["Trekking", "Camping", "Bird Watching", "Photography"],
      image: "https://images.pexels.com/photos/33421742/pexels-photo-33421742.jpeg",
      description: "Trek the legendary Mountains of the Moon with expert guides. This challenging expedition takes you through diverse ecosystems and stunning alpine landscapes."
    },
    {
      id: 7,
      name: "Lake Mburo Wildlife Safari",
      category: "Wildlife",
      location: "Lake Mburo National Park",
      duration: 2,
      price: 400,
      rating: 4.7,
      activities: ["Game Drives", "Boat Trips", "Walking Safaris", "Night Drives"],
      image: "https://images.pexels.com/photos/30705105/pexels-photo-30705105.jpeg",
      description: "Experience the only park in Uganda where you can take guided walking safaris. Spot zebras, impalas, and various bird species in this scenic national park."
    },
    {
      id: 8,
      name: "Batwa Cultural Experience",
      category: "Cultural",
      location: "Bwindi Impenetrable Forest",
      duration: 1,
      price: 120,
      rating: 4.8,
      activities: ["Cultural Visits", "Traditional Dance", "Craft Demonstrations", "Story Telling"],
      image: "https://images.pexels.com/photos/20110724/pexels-photo-20110724.jpeg",
      description: "Learn about the Batwa pygmies' traditional forest life and their rich cultural heritage. This immersive experience includes traditional dance, crafts, and storytelling."
    },
    {
      id: 9,
      name: "Kidepo Valley Wilderness",
      category: "Wildlife",
      location: "Kidepo Valley National Park",
      duration: 5,
      price: 950,
      rating: 4.9,
      activities: ["Game Drives", "Cultural Visits", "Bird Watching", "Photography"],
      image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      description: "Explore one of Africa's most remote and pristine national parks. Experience incredible wildlife viewing in this unspoiled wilderness with stunning landscapes."
    },
    {
      id: 10,
      name: "Sipi Falls Adventure",
      category: "Adventure",
      location: "Sipi, Mount Elgon",
      duration: 2,
      price: 280,
      rating: 4.7,
      activities: ["Waterfall Abseiling", "Coffee Tours", "Hiking", "Village Walks"],
      image: "/images/Waterfall.jpg",
      description: "Combine waterfall abseiling with coffee tours and hikes around the stunning Sipi Falls region on the slopes of Mount Elgon in eastern Uganda."
    },
    {
      id: 11,
      name: "Uganda Highlights Tour",
      category: "Mixed",
      location: "Multiple Locations",
      duration: 10,
      price: 1800,
      rating: 4.9,
      activities: ["Gorilla Trekking", "Game Drives", "Boat Safaris", "Cultural Visits", "Nature Walks"],
      image: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      description: "Experience the best of Uganda in one comprehensive tour. Visit multiple national parks, encounter mountain gorillas, enjoy safaris, and discover cultural highlights."
    },
    {
      id: 12,
      name: "Ssese Islands Getaway",
      category: "Leisure",
      location: "Ssese Islands, Lake Victoria",
      duration: 3,
      price: 450,
      rating: 4.6,
      activities: ["Beach Relaxation", "Boat Tours", "Fishing", "Island Hopping"],
      image: "https://images.pexels.com/photos/18080802/pexels-photo-18080802.jpeg",
      description: "Escape to the tranquil Ssese Islands in Lake Victoria for a relaxing beach getaway. Enjoy pristine beaches, boat tours, and the laid-back island atmosphere."
    }
  ];

  // Available categories
  const categories = ['Wildlife', 'Adventure', 'Cultural', 'Nature', 'Leisure', 'Mixed'];
  
  // Available activities for filtering
  const availableActivities = [
    "Gorilla Trekking", "Game Drives", "Bird Watching", "White Water Rafting",
    "Cultural Visits", "Hiking", "Boat Safaris", "Photography", "Camping"
  ];
  
  // Filter tours based on selections
  $: filteredTours = tours.filter(tour => {
    const matchesCategory = selectedCategory === 'all' || tour.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
                         tour.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         tour.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDuration = tour.duration >= durationRange[0] && tour.duration <= durationRange[1];
    const matchesPrice = tour.price >= priceRange[0] && tour.price <= priceRange[1];
    const matchesActivities = selectedActivities.length === 0 || 
                             selectedActivities.some(a => tour.activities.includes(a));
    
    return matchesCategory && matchesSearch && matchesDuration && matchesPrice && matchesActivities;
  });

  function bookTour(tour) {
    dispatch('book', { type: 'tour', item: tour });
  }

  // Wishlist functionality
  function toggleWishlist(tour) {
    if (!user) {
      showNotification('Please sign in to add items to your wishlist', 'error');
      return;
    }

    const wishlistItem = {
      id: tour.id,
      name: tour.name,
      price: `$${tour.price}`,
      image: tour.image,
      type: 'tour',
      location: tour.location,
      duration: `${tour.duration} ${tour.duration === 1 ? 'day' : 'days'}`,
      rating: tour.rating
    };

    if (isInWishlist(tour.id, 'tour', user.id)) {
      const result = removeFromWishlist(tour.id, 'tour', user.id);
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

  function toggleActivityFilter(activity) {
    if (selectedActivities.includes(activity)) {
      selectedActivities = selectedActivities.filter(a => a !== activity);
    } else {
      selectedActivities = [...selectedActivities, activity];
    }
  }
  
  function clearFilters() {
    selectedCategory = 'all';
    searchQuery = '';
    durationRange = [1, 14];
    priceRange = [0, 2000];
    selectedActivities = [];
  }
</script>

<div class="pt-16 pb-12">
  <div class="container-custom">
    <!-- Header -->
    <div class="mb-12">
      <h1 class="text-5xl font-bold mb-6 tracking-tight">Tour Packages</h1>
      <p class="text-xl text-gray-600 leading-relaxed tracking-wide max-w-4xl">
        Experience Uganda's incredible wildlife, landscapes, and culture with our carefully crafted tour packages and guided tour experiences.
      </p>
    </div>

    <!-- Personalized Recommendations -->
    {#if user}
      <div class="mb-8">
        <PersonalizedRecommendations {user} showCompact={true} category="tours" maxItems={3} on:book />
      </div>
    {/if}

    <!-- Filters Section -->
    <div class="bg-white shadow-md rounded-lg p-6 mb-8">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
        <h2 class="text-xl font-semibold mb-4 md:mb-0">Filters</h2>
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
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <!-- Search -->
        <div>
          <label for="search" class="block text-sm font-medium text-gray-700 mb-1">
            Search
          </label>
          <div class="relative">
            <input 
              type="text" 
              id="search" 
              placeholder="Search tours..."
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
        
        <!-- Category -->
        <div>
          <label for="category" class="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select 
            id="category" 
            bind:value={selectedCategory}
            class="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="all">All Categories</option>
            {#each categories as category}
              <option value={category}>{category}</option>
            {/each}
          </select>
        </div>
        
        <!-- Duration Range -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Duration (days)
          </label>
          <div class="flex items-center space-x-2">
            <input 
              type="number" 
              bind:value={durationRange[0]} 
              min="1" 
              max={durationRange[1]}
              class="w-16 py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
            <span>to</span>
            <input 
              type="number" 
              bind:value={durationRange[1]} 
              min={durationRange[0]} 
              class="w-16 py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
          </div>
        </div>
        
        <!-- Price Range -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Price Range ($)
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
      </div>
      
      <!-- Activities -->
      <div class="mt-4">
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Activities
        </label>
        <div class="flex flex-wrap gap-2">
          {#each availableActivities as activity}
            <button 
              class="px-3 py-1 text-sm rounded-full {selectedActivities.includes(activity) ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'} hover:bg-primary-light hover:text-white transition-colors"
              on:click={() => toggleActivityFilter(activity)}
            >
              {activity}
            </button>
          {/each}
        </div>
      </div>
    </div>

    <!-- Results Count -->
    <p class="mb-4 text-gray-600">
      Showing {filteredTours.length} of {tours.length} tours
    </p>

    <!-- Tours Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {#each filteredTours as tour (tour.id)}
        <div class="card overflow-hidden group">
          <div class="h-56 overflow-hidden relative">
            <img
              src={tour.image}
              alt={tour.name}
              class="w-full h-full object-cover"
            />
            <!-- Wishlist button -->
            <div class="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                class="bg-white p-2 rounded-full shadow-md hover:bg-gray-50 transition-colors"
                on:click|stopPropagation={() => toggleWishlist(tour)}
                title={isInWishlist(tour.id, 'tour', user?.id) ? 'Remove from wishlist' : 'Add to wishlist'}
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 {isInWishlist(tour.id, 'tour', user?.id) ? 'text-red-500 fill-current' : 'text-gray-600 hover:text-red-500'}" fill={isInWishlist(tour.id, 'tour', user?.id) ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
              </button>
            </div>
          </div>
          <div class="p-6">
            <div class="mb-2">
              <span class="inline-block bg-primary-light/10 text-primary px-2 py-1 rounded-md text-xs font-medium mb-2">
                {tour.category}
              </span>
            </div>
            <h3 class="text-xl font-semibold mb-1">{tour.name}</h3>
            <div class="flex items-center justify-between mb-3">
              <div class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-accent" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                </svg>
                <span class="ml-1 text-gray-600">{tour.location}</span>
              </div>
            </div>
            <div class="flex justify-between items-center mb-3">
              <div class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-accent" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd" />
                </svg>
                <span class="ml-1 text-gray-600">{tour.duration} {tour.duration === 1 ? 'day' : 'days'}</span>
              </div>
              <span class="font-semibold text-primary">${tour.price}</span>
            </div>
            <div class="flex items-center mb-3">
              <div class="flex">
                {#each Array(5) as _, i}
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 {i < Math.floor(tour.rating) ? 'text-yellow-400' : 'text-gray-300'}" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                {/each}
              </div>
              <span class="ml-1 text-gray-600">{tour.rating} ({Math.floor(Math.random() * 40) + 10} reviews)</span>
            </div>
            <div class="mb-3">
              <div class="flex flex-wrap gap-2 mb-3">
                {#each tour.activities.slice(0, 3) as activity}
                  <span class="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-xs">
                    {activity}
                  </span>
                {/each}
                {#if tour.activities.length > 3}
                  <span class="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-xs">
                    +{tour.activities.length - 3} more
                  </span>
                {/if}
              </div>
            </div>
            <p class="text-gray-600 mb-4 line-clamp-2">{tour.description}</p>
            <button 
              class="w-full btn-primary py-2"
              on:click={() => bookTour(tour)}
            >
              Book Now
            </button>
          </div>
        </div>
      {/each}
      
      {#if filteredTours.length === 0}
        <div class="col-span-full flex flex-col items-center justify-center py-12">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 class="text-xl font-semibold text-gray-700 mb-2">No tours found</h3>
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
</style>
