<script>
  import { onMount, createEventDispatcher } from 'svelte';
  
  export let user = null;
  export let showCompact = false; // For smaller views
  export let category = 'all'; // 'accommodations', 'tours', 'transport', 'all'
  export let maxItems = 6;
  
  let recommendations = [];
  let loading = false;
  
  // Sample user data structure for recommendations engine
  const sampleUserPreferences = {
    preferredDestinations: ['Bwindi', 'Queen Elizabeth NP', 'Kampala'],
    budgetRange: { min: 500, max: 2000 },
    travelStyle: 'adventure', // 'luxury', 'budget', 'adventure', 'cultural'
    groupSize: 'small', // 'solo', 'small', 'large'
    interests: ['wildlife', 'gorillas', 'photography', 'culture'],
    previousBookings: [
      { type: 'accommodation', destination: 'Bwindi', priceRange: 800, rating: 5 },
      { type: 'tour', destination: 'Queen Elizabeth', priceRange: 1200, rating: 4 }
    ],
    favoriteActivities: ['gorilla trekking', 'safari', 'photography'],
    lastTripDate: '2024-09-15',
    membershipLevel: 'gold'
  };

  // All available recommendations data
  const allRecommendations = {
    accommodations: [
      {
        id: 'rec-acc-1',
        type: 'accommodation',
        title: 'Bwindi Guest Home - Gorilla View Suite',
        location: 'Bwindi Impenetrable Forest',
        price: 750,
        originalPrice: 900,
        rating: 4.9,
        image: 'https://images.pexels.com/photos/775690/pexels-photo-775690.jpeg',
        description: 'Luxury eco-guest home with direct gorilla tracking access',
        matchReason: 'Based on your previous stay in Bwindi and luxury preferences',
        relevanceScore: 95,
        features: ['Gorilla permit assistance', 'Eco-friendly', 'Photography workshops'],
        discount: 17,
        urgency: 'Limited availability - only 3 suites left this month'
      },
      {
        id: 'rec-acc-2',
        type: 'accommodation',
        title: 'Mweya Safari Lodge Premium',
        location: 'Queen Elizabeth National Park',
        price: 650,
        originalPrice: 800,
        rating: 4.7,
        image: 'https://images.pexels.com/photos/18611231/pexels-photo-18611231.jpeg',
        description: 'Premium safari lodge overlooking Kazinga Channel',
        matchReason: 'Perfect for your wildlife photography interests',
        relevanceScore: 88,
        features: ['Game drive packages', 'Photography guides', 'Boat safari included'],
        discount: 19,
        urgency: null
      },
      {
        id: 'rec-acc-3',
        type: 'accommodation',
        title: 'Lake Mburo Wilderness Camp',
        location: 'Lake Mburo National Park',
        price: 420,
        originalPrice: 520,
        rating: 4.5,
        image: 'https://images.pexels.com/photos/775690/pexels-photo-775690.jpeg',
        description: 'Adventure camp perfect for small groups',
        matchReason: 'Matches your adventure travel style and group size preference',
        relevanceScore: 82,
        features: ['Walking safaris', 'Horseback riding', 'Fishing activities'],
        discount: 19,
        urgency: 'Early bird special - book by Dec 15th'
      }
    ],
    tours: [
      {
        id: 'rec-tour-1',
        type: 'tour',
        title: 'Photography Gorilla Trekking Experience',
        location: 'Bwindi Impenetrable Forest',
        price: 1400,
        originalPrice: 1600,
        rating: 5.0,
        image: 'https://images.pexels.com/photos/1238272/pexels-photo-1238272.jpeg',
        description: '3-day intensive photography workshop with gorilla trekking',
        matchReason: 'Combines your love for gorillas and photography',
        relevanceScore: 97,
        features: ['Professional photo guide', 'Gorilla permits included', 'Equipment provided'],
        discount: 13,
        urgency: 'Only 2 spots available for September 2025'
      },
      {
        id: 'rec-tour-2',
        type: 'tour',
        title: 'Cultural Immersion Safari',
        location: 'Multiple locations',
        price: 1800,
        originalPrice: 2200,
        rating: 4.8,
        image: 'https://images.pexels.com/photos/28101464/pexels-photo-28101464.jpeg',
        description: '7-day cultural and wildlife combination tour',
        matchReason: 'Based on your interest in culture and wildlife',
        relevanceScore: 90,
        features: ['Village homestays', 'Traditional ceremonies', 'Wildlife safaris'],
        discount: 18,
        urgency: null
      },
      {
        id: 'rec-tour-3',
        type: 'tour',
        title: 'Small Group Adventure Safari',
        location: 'Queen Elizabeth & Bwindi',
        price: 1650,
        originalPrice: 1950,
        rating: 4.9,
        image: 'https://images.pexels.com/photos/2590535/pexels-photo-2590535.jpeg',
        description: '5-day adventure safari for groups up to 6 people',
        matchReason: 'Perfect for your small group travel preference',
        relevanceScore: 86,
        features: ['Max 6 people', 'Adventure activities', 'Flexible itinerary'],
        discount: 15,
        urgency: 'Gold member exclusive - additional 5% off'
      }
    ],
    transport: [
      {
        id: 'rec-trans-1',
        type: 'transport',
        title: 'Toyota Land Cruiser 4WD + Driver',
        location: 'Available nationwide',
        price: 180,
        originalPrice: 220,
        rating: 4.8,
        image: 'https://images.pexels.com/photos/18847999/pexels-photo-18847999.jpeg',
        description: 'Premium 4WD perfect for adventure safaris',
        matchReason: 'Ideal for your adventure-style trips to remote locations',
        relevanceScore: 85,
        features: ['Professional driver', '4WD capability', 'Safari equipment'],
        discount: 18,
        urgency: null
      },
      {
        id: 'rec-trans-2',
        type: 'transport',
        title: 'Photography Safari Vehicle',
        location: 'Specialized for wildlife parks',
        price: 250,
        originalPrice: 300,
        rating: 4.9,
        image: 'https://images.pexels.com/photos/18847999/pexels-photo-18847999.jpeg',
        description: 'Modified vehicle with photography equipment and pop-up roof',
        matchReason: 'Designed specifically for wildlife photography enthusiasts',
        relevanceScore: 92,
        features: ['Pop-up roof', 'Photography equipment', 'Professional guide'],
        discount: 17,
        urgency: 'Limited units - book early for best availability'
      }
    ]
  };

  function generateRecommendations() {
    try {
      loading = true;

      // Simulate API call delay with error handling
      setTimeout(() => {
        try {
          let filteredRecs = [];

          if (category === 'all') {
            filteredRecs = [
              ...(allRecommendations.accommodations || []),
              ...(allRecommendations.tours || []),
              ...(allRecommendations.transport || [])
            ];
          } else {
            filteredRecs = allRecommendations[category] || [];
          }

          // Sort by relevance score and apply user preferences
          filteredRecs = filteredRecs
            .filter(item => item && typeof item.relevanceScore === 'number')
            .sort((a, b) => b.relevanceScore - a.relevanceScore)
            .slice(0, maxItems);

          // Apply additional filtering based on user data
          if (user) {
            filteredRecs = applyUserFiltering(filteredRecs);
          }

          recommendations = filteredRecs;
        } catch (error) {
          console.warn('Error generating recommendations:', error);
          recommendations = [];
        } finally {
          loading = false;
        }
      }, 300);
    } catch (error) {
      console.warn('Error in generateRecommendations:', error);
      loading = false;
      recommendations = [];
    }
  }

  function applyUserFiltering(recs) {
    // Apply budget filtering if user has budget preferences
    if (sampleUserPreferences.budgetRange) {
      recs = recs.filter(rec => 
        rec.price >= sampleUserPreferences.budgetRange.min && 
        rec.price <= sampleUserPreferences.budgetRange.max
      );
    }
    
    // Boost recommendations that match user's travel style
    recs.forEach(rec => {
      if (rec.description.toLowerCase().includes(sampleUserPreferences.travelStyle)) {
        rec.relevanceScore += 5;
      }
    });
    
    // Re-sort after applying user filters
    return recs.sort((a, b) => b.relevanceScore - a.relevanceScore);
  }

  const dispatch = createEventDispatcher();

  function handleBooking(item) {
    try {
      // Use proper Svelte event dispatcher
      dispatch('book', {
        type: item.type,
        item: item
      });
    } catch (error) {
      console.warn('Failed to dispatch booking event:', error);
    }
  }

  function handleViewMore(item) {
    try {
      // Navigate to appropriate section with error handling
      const event = new CustomEvent('navigate', {
        detail: {
          route: item.type === 'accommodation' ? 'accommodations' :
                 item.type === 'tour' ? 'tours' : 'transport'
        }
      });

      if (typeof document !== 'undefined') {
        document.dispatchEvent(event);
      }
    } catch (error) {
      console.warn('Failed to dispatch navigation event:', error);
    }
  }

  onMount(() => {
    generateRecommendations();
  });

  // Regenerate when category or user changes
  $: if (category || user) {
    generateRecommendations();
  }
</script>

<div class="recommendations-container">
  {#if !showCompact}
    <div class="mb-6">
      <h2 class="text-2xl font-bold text-gray-900 mb-2">
        {#if user}
          Recommended for You
        {:else}
          Popular Recommendations
        {/if}
      </h2>
      <p class="text-gray-600">
        {#if user}
          Based on your preferences, booking history, and travel style
        {:else}
          Discover amazing experiences tailored to your interests
        {/if}
      </p>
    </div>
  {/if}

  {#if loading}
    <div class="grid grid-cols-1 {showCompact ? 'md:grid-cols-2 lg:grid-cols-3' : 'md:grid-cols-2 lg:grid-cols-3'} gap-6">
      {#each Array(showCompact ? 3 : 6) as _}
        <div class="bg-gray-100 rounded-lg h-64 animate-pulse"></div>
      {/each}
    </div>
  {:else}
    <div class="grid grid-cols-1 {showCompact ? 'md:grid-cols-2 lg:grid-cols-3' : 'md:grid-cols-2 lg:grid-cols-3'} gap-6">
      {#each recommendations as item (item.id)}
        <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow group">
          <!-- Image -->
          <div class="relative h-48 overflow-hidden">
            <img 
              src={item.image} 
              alt={item.title}
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            
            <!-- Discount Badge -->
            {#if item.discount}
              <div class="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-bold">
                -{item.discount}%
              </div>
            {/if}
            
            <!-- Type Badge -->
            <div class="absolute top-3 right-3 bg-black bg-opacity-60 text-white px-2 py-1 rounded-full text-xs font-medium capitalize">
              {item.type}
            </div>
            
            <!-- Urgency Banner -->
            {#if item.urgency}
              <div class="absolute bottom-0 left-0 right-0 bg-orange-500 text-white text-xs py-1 px-2 text-center">
                🔥 {item.urgency}
              </div>
            {/if}
          </div>

          <!-- Content -->
          <div class="p-4">
            <!-- Location -->
            <p class="text-sm text-gray-500 mb-1">{item.location}</p>
            
            <!-- Title -->
            <h3 class="font-semibold text-gray-900 mb-2 line-clamp-2">{item.title}</h3>
            
            <!-- Match Reason -->
            {#if user && item.matchReason}
              <div class="bg-blue-50 border border-blue-200 rounded-lg p-2 mb-3">
                <p class="text-xs text-blue-700">
                  <span class="font-medium">Why this matches:</span> {item.matchReason}
                </p>
              </div>
            {/if}
            
            <!-- Description -->
            <p class="text-sm text-gray-600 mb-3 line-clamp-2">{item.description}</p>
            
            <!-- Features -->
            {#if item.features && item.features.length > 0}
              <div class="mb-3">
                {#each item.features.slice(0, 2) as feature}
                  <span class="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full mr-1 mb-1">
                    {feature}
                  </span>
                {/each}
                {#if item.features.length > 2}
                  <span class="text-xs text-gray-500">+{item.features.length - 2} more</span>
                {/if}
              </div>
            {/if}
            
            <!-- Rating -->
            <div class="flex items-center mb-3">
              <div class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span class="text-sm font-medium">{item.rating}</span>
              </div>
              <span class="text-xs text-gray-500 ml-2">
                Relevance: {item.relevanceScore}%
              </span>
            </div>
            
            <!-- Price -->
            <div class="flex items-center justify-between mb-4">
              <div>
                {#if item.originalPrice && item.originalPrice > item.price}
                  <p class="text-sm text-gray-500 line-through">${item.originalPrice}</p>
                {/if}
                <p class="text-lg font-bold text-blue-600">${item.price}</p>
                <p class="text-xs text-gray-500">
                  {item.type === 'transport' ? 'per day' : 'per person'}
                </p>
              </div>
              
              <!-- Membership Badge -->
              {#if user && sampleUserPreferences.membershipLevel === 'gold'}
                <span class="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                  Gold Member
                </span>
              {/if}
            </div>
            
            <!-- Actions -->
            <div class="flex space-x-2">
              <button
                class="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-md text-sm font-medium transition-colors"
                on:click={() => handleBooking(item)}
              >
                Book Now
              </button>
              <button 
                class="bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-3 rounded-md text-sm font-medium transition-colors"
                on:click={() => handleViewMore(item)}
              >
                View More
              </button>
            </div>
          </div>
        </div>
      {/each}
    </div>
  {/if}

  {#if !showCompact && recommendations.length > 0}
    <div class="mt-8 text-center">
      <button class="text-blue-600 hover:text-blue-700 font-medium">
        See All Personalized Recommendations →
      </button>
    </div>
  {/if}
</div>

<style>
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  
  .recommendations-container {
    margin-bottom: 2rem;
  }
</style>
