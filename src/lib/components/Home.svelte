<script>
  import { createEventDispatcher, onMount } from 'svelte';
  const dispatch = createEventDispatcher();

  // Safely import PersonalizedRecommendations with error handling
  let PersonalizedRecommendations = null;
  let componentLoadError = false;

  // Import PersonalizedRecommendations directly to avoid dynamic loading issues
  import PersonalizedRecommendationsComponent from './PersonalizedRecommendations.svelte';

  onMount(() => {
    // Set the component directly
    PersonalizedRecommendations = PersonalizedRecommendationsComponent;
  });

  export let user = null;

  // Shiloh featured accommodations (prominently displayed)
  const shilohAccommodations = [
    {
      id: 'shiloh-1',
      name: "Shiloh Guest Home - Muyenga",
      location: "Kutta Road, Muyenga, Kampala",
      price: "$150",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      description: "Comfortable and secure guest home in the upscale Muyenga neighborhood. Modern amenities and authentic Ugandan hospitality since 2013.",
      amenities: ["Secure Parking", "Free WiFi", "Garden", "24/7 Security", "Breakfast Available"],
      featured: true
    },
    {
      id: 'shiloh-2',
      name: "Shiloh Car Hire Services",
      location: "Kutta Road, Muyenga, Kampala",
      price: "$40",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      description: "Professional car hire services with well-maintained vehicles and experienced drivers for all your transportation needs.",
      amenities: ["Self-Drive Options", "With Driver", "Airport Transfers", "Safari Vehicles", "Insurance Included"],
      featured: true
    }
  ];

  // Featured accommodations
  const featuredAccommodations = [
    {
      id: 1,
      name: "Kampala Serena Hotel",
      location: "Kampala Hill, Kampala",
      price: "$350",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      description: "Experience luxury in the heart of Kampala with stunning city views. Official Serena Hotels property.",
    },
    {
      id: 2,
      name: "Murchison River Lodge",
      location: "Murchison Falls National Park",
      price: "$400",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      description: "Safari lodge on the southern bank of the River Nile, overlooking Murchison Falls National Park with thatched cottages.",
    },
    {
      id: 3,
      name: "Lake Victoria Serena Resort & Spa",
      location: "Kigo, Entebbe",
      price: "$280",
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      description: "Lakefront resort experience with stunning panoramic views, championship golf, infinity pool adventures, and exclusive water sports on Africa's largest lake.",
    }
  ];

  // Featured tours
  const featuredTours = [
    {
      id: 1,
      name: "Gorilla Trekking Adventure",
      location: "Bwindi Impenetrable Forest",
      duration: "3 days",
      price: "$1,200",
      rating: 5.0,
      image: "https://images.pexels.com/photos/1238272/pexels-photo-1238272.jpeg",
      description: "Get up close with mountain gorillas in their natural habitat. Includes $800 permit for foreign non-residents.",
    },
    {
      id: 2,
      name: "Big Five Safari",
      location: "Queen Elizabeth National Park",
      duration: "4 days",
      price: "$650",
      rating: 4.8,
      image: "https://images.pexels.com/photos/2590535/pexels-photo-2590535.jpeg",
      description: "Spot lions, elephants, buffalos, leopards, and rhinos on this safari adventure.",
    },
    {
      id: 3,
      name: "Nile River Expedition",
      location: "Jinja",
      duration: "2 days",
      price: "$300",
      rating: 4.7,
      image: "https://images.pexels.com/photos/31740855/pexels-photo-31740855.jpeg",
      description: "White-water rafting and adventure activities at the source of the Nile.",
    }
  ];

  function navigate(route) {
    dispatch('navigate', { route });
  }

  function book(type, item) {
    console.log('Book function called:', { type, item });
    console.log('About to dispatch book event...');
    try {
      dispatch('book', { type, item });
      console.log('Book event dispatched successfully');
    } catch (error) {
      console.error('Error dispatching book event:', error);
    }
  }

  function handleLogin() {
    // Dispatch login event to trigger auth modal
    window.dispatchEvent(new CustomEvent('showAuth'));
  }

  function testModal() {
    console.log('TEST: Directly dispatching openBooking event');
    window.dispatchEvent(new CustomEvent('openBooking', {
      detail: {
        type: 'accommodation',
        item: {
          id: 'test',
          name: 'Test Accommodation',
          price: '$100',
          description: 'Test modal functionality'
        }
      }
    }));
  }

  function testComponentConnection() {
    console.log('🧪 Testing component event dispatch...');
    try {
      dispatch('book', {
        type: 'test',
        item: { id: 'component-test', name: 'Component Test' }
      });
      console.log('🧪 Component event dispatched successfully');
    } catch (error) {
      console.error('🚨 Component event dispatch failed:', error);
    }
  }
</script>

<div>
  <!-- Hero Section -->
  <section class="home-hero-section relative min-h-screen h-[120vh] bg-gray-900">
    <div class="absolute inset-0 bg-black opacity-40 z-10"></div>
    <div class="absolute inset-0 bg-[url('https://images.pexels.com/photos/29897219/pexels-photo-29897219.jpeg')] bg-cover bg-center"></div>

    <div class="relative z-20 container-custom h-full flex flex-col justify-center pt-12 md:pt-8 pb-8 md:pb-12">
      <div class="transform -translate-y-8 md:-translate-y-12">
        <h1 class="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
          Discover the <span class="text-accent">Pearl of Africa</span> with The Shiloh Experience
        </h1>
        <p class="text-xl md:text-2xl text-white max-w-4xl mb-10 leading-relaxed font-medium">
          Exceptional accommodations, seamless transportation, unforgettable tours, and personalized itineraries for your Ugandan adventure.
        </p>
        <div class="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <button
            class="btn-primary text-lg py-3 px-8"
            on:click={() => navigate('itinerary')}
          >
            Plan Your Trip
          </button>
          <button
            class="bg-white text-primary hover:bg-gray-100 transition-colors text-lg font-semibold py-3 px-8 rounded-md"
            on:click={() => navigate('tours')}
          >
            Explore Tours
          </button>
          <!-- Temporary test buttons -->
          <button
            class="bg-red-500 hover:bg-red-600 text-white text-lg font-semibold py-3 px-4 rounded-md"
            on:click={testModal}
          >
            TEST MODAL
          </button>
          <button
            class="bg-orange-500 hover:bg-orange-600 text-white text-lg font-semibold py-3 px-4 rounded-md"
            on:click={testComponentConnection}
          >
            TEST COMPONENT
          </button>
        </div>
      </div>
    </div>
  </section>

  <!-- Promotional Offers Section -->
  <section class="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
    <div class="absolute inset-0">
      <div class="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5"></div>
    </div>
    <div class="relative z-10 container-custom">
      <div class="text-center mb-16">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-full mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.847a4.5 4.5 0 003.09 3.09L15.75 12l-2.847.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
          </svg>
        </div>
        <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
          Special Offers & Seasonal Promotions
        </h2>
        <p class="text-gray-600 max-w-4xl mx-auto text-xl leading-relaxed">
          Don't miss our exclusive deals! Limited-time offers on Uganda's best travel experiences.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- Early Bird Safari Special -->
        <div class="card group hover:shadow-xl transition-all duration-300">
          <div class="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-3 text-center font-semibold relative">
            <div class="flex items-center justify-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
              </svg>
              <span>LIMITED TIME - 30% OFF</span>
            </div>
          </div>
          <div class="p-6">
            <div class="flex items-start justify-between mb-4">
              <h3 class="text-xl font-bold text-gray-900">Early Bird Safari</h3>
              <span class="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-medium border border-green-200">
                Save $240
              </span>
            </div>
            <p class="text-gray-600 mb-6 leading-relaxed">
              Book your 5-day safari adventure 60 days in advance and save big on accommodation and transport!
            </p>
            <div class="flex items-center justify-between mb-6">
              <div>
                <span class="text-gray-400 line-through text-lg">$800</span>
                <span class="text-2xl font-bold text-green-600 ml-2">$560</span>
              </div>
              <div class="text-xs text-gray-500">
                Valid until Dec 31, 2025
              </div>
            </div>
            <button
              type="button"
              class="w-full btn-primary py-3 group-hover:scale-[1.02] transition-transform"
              on:click={() => book('accommodation', {
                id: 'early-bird-special',
                name: 'Early Bird Safari Package',
                location: 'Multiple Locations',
                price: '$450',
                rating: 4.8,
                description: 'Book your 5-day safari adventure 60 days in advance and save big on accommodation and transport!',
                type: 'accommodation'
              })}
            >
              Book Now & Save
            </button>
          </div>
        </div>

        <!-- Gorilla Trekking Package -->
        <div class="card group hover:shadow-xl transition-all duration-300">
          <div class="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-4 py-3 text-center font-semibold">
            <div class="flex items-center justify-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span>GORILLA SPECIAL</span>
            </div>
          </div>
          <div class="p-6">
            <div class="flex items-start justify-between mb-4">
              <h3 class="text-xl font-bold text-gray-900">Gorilla + Accommodation</h3>
              <span class="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium border border-blue-200">
                Best Value
              </span>
            </div>
            <p class="text-gray-600 mb-6 leading-relaxed">
              Complete 3-day gorilla trekking package with luxury accommodation and all permits included.
            </p>
            <div class="flex items-center justify-between mb-6">
              <div>
                <span class="text-gray-400 line-through text-lg">$1400</span>
                <span class="text-2xl font-bold text-purple-600 ml-2">$1199</span>
              </div>
              <div class="text-xs text-gray-500">
                Book by Jan 15, 2026
              </div>
            </div>
            <button
              type="button"
              class="w-full btn-primary bg-purple-600 hover:bg-purple-700 py-3 group-hover:scale-[1.02] transition-transform"
              on:click={() => book('tour', {
                id: 'gorilla-special',
                name: 'Gorilla + Accommodation Package',
                location: 'Bwindi Impenetrable Forest',
                price: '$1199',
                originalPrice: '$1400',
                rating: 5.0,
                description: 'Complete 3-day gorilla trekking package with luxury accommodation and all permits included.',
                type: 'tour'
              })}
            >
              Reserve Your Spot
            </button>
          </div>
        </div>

        <!-- Group Travel Discount -->
        <div class="card group hover:shadow-xl transition-all duration-300">
          <div class="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-3 text-center font-semibold">
            <div class="flex items-center justify-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
              </svg>
              <span>GROUP DISCOUNT</span>
            </div>
          </div>
          <div class="p-6">
            <div class="flex items-start justify-between mb-4">
              <h3 class="text-xl font-bold text-gray-900">Groups of 6+</h3>
              <span class="bg-orange-50 text-orange-700 px-3 py-1 rounded-full text-sm font-medium border border-orange-200">
                Up to 25% OFF
              </span>
            </div>
            <p class="text-gray-600 mb-6 leading-relaxed">
              Travel with friends and family! The more you are, the more you save on all our tour packages.
            </p>
            <div class="flex items-center justify-between mb-6">
              <div class="text-xl font-bold text-blue-600">
                From $450/person
              </div>
              <div class="text-xs text-gray-500">
                Year-round offer
              </div>
            </div>
            <button
              type="button"
              class="w-full btn-primary bg-blue-600 hover:bg-blue-700 py-3 group-hover:scale-[1.02] transition-transform"
              on:click={() => navigate('community')}
            >
              Get Group Quote
            </button>
          </div>
        </div>
      </div>

      <!-- Countdown Timer for Flash Sale -->
      <div class="mt-16 text-center bg-white border border-gray-200 rounded-2xl p-8 shadow-lg">
        <div class="flex items-center justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-accent mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <h3 class="text-2xl font-bold text-gray-900">Flash Sale Ends Soon!</h3>
        </div>
        <div class="flex justify-center space-x-4 mb-6">
          <div class="bg-gradient-to-br from-primary to-primary-dark text-white rounded-xl p-4 min-w-[80px] shadow-lg">
            <div class="text-2xl font-bold">23</div>
            <div class="text-primary-light text-sm font-medium">Days</div>
          </div>
          <div class="bg-gradient-to-br from-primary to-primary-dark text-white rounded-xl p-4 min-w-[80px] shadow-lg">
            <div class="text-2xl font-bold">14</div>
            <div class="text-primary-light text-sm font-medium">Hours</div>
          </div>
          <div class="bg-gradient-to-br from-primary to-primary-dark text-white rounded-xl p-4 min-w-[80px] shadow-lg">
            <div class="text-2xl font-bold">35</div>
            <div class="text-primary-light text-sm font-medium">Minutes</div>
          </div>
        </div>
        <p class="text-gray-700 text-lg font-medium">Next flash sale: 40% off selected accommodations!</p>
      </div>
    </div>
  </section>

  <!-- Services Section -->
  <section class="py-20 bg-gray-50">
    <div class="container-custom">
      <h2 class="text-4xl md:text-5xl font-bold text-center mb-6 tracking-tight">Our Services</h2>
      <p class="text-center text-gray-600 max-w-4xl mx-auto mb-16 text-xl leading-relaxed tracking-wide">
        The Shiloh Experience offers comprehensive travel services to make your Ugandan experience exceptional from start to finish.
      </p>

      <div class="grid grid-cols-1 md:grid-cols-4 gap-10">
        <!-- Accommodation -->
        <button type="button" class="card p-6 text-center hover:bg-gray-50 cursor-pointer text-left" on:click={() => navigate('accommodations')} on:keydown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); navigate('accommodations'); }}}>
          <div class="bg-primary-light/10 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M3 21h18"/>
              <path d="M4 21V7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v14"/>
              <path d="M9 9h1v1H9V9z"/>
              <path d="M14 9h1v1h-1V9z"/>
              <path d="M9 13h1v1H9v-1z"/>
              <path d="M14 13h1v1h-1v-1z"/>
              <path d="M9 17h1v1H9v-1z"/>
              <path d="M14 17h1v1h-1v-1z"/>
              <path d="M5 3h14v2H5V3z"/>
              <circle cx="16" cy="3" r="1" fill="currentColor"/>
            </svg>
          </div>
          <h3 class="text-xl font-semibold mb-3">Premium Accommodations</h3>
          <p class="text-gray-600">
            From luxury hotels in Kampala to safari guest homes in national parks, we offer the best accommodations across Uganda.
          </p>
        </button>

        <!-- Transportation -->
        <button type="button" class="card p-6 text-center hover:bg-gray-50 cursor-pointer text-left" on:click={() => navigate('transport')} on:keydown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); navigate('transport'); }}}>
          <div class="bg-primary-light/10 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <!-- Car body -->
              <path d="M3 16h18v2a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-2z" fill="currentColor" stroke="none" opacity="0.1"/>
              <rect x="4" y="10" width="16" height="6" rx="1" ry="1"/>
              <!-- Windshield -->
              <path d="M6 10V8a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2"/>
              <!-- Headlights -->
              <circle cx="7" cy="13" r="1.5" fill="currentColor" stroke="none" opacity="0.3"/>
              <circle cx="17" cy="13" r="1.5" fill="currentColor" stroke="none" opacity="0.3"/>
              <!-- Grille -->
              <path d="M9 13h6" stroke-width="0.5"/>
              <path d="M9 14h6" stroke-width="0.5"/>
              <!-- License plate area -->
              <rect x="10" y="15" width="4" height="1" rx="0.2" stroke="none" fill="currentColor" opacity="0.2"/>
              <!-- Wheels -->
              <circle cx="7" cy="18" r="2"/>
              <circle cx="17" cy="18" r="2"/>
              <circle cx="7" cy="18" r="1" fill="none" stroke-width="0.5"/>
              <circle cx="17" cy="18" r="1" fill="none" stroke-width="0.5"/>
            </svg>
          </div>
          <h3 class="text-xl font-semibold mb-3">Car & Transport Hire</h3>
          <p class="text-gray-600">
            Choose from our fleet of vehicles with professional drivers to take you safely around Uganda's stunning landscapes.
          </p>
        </button>

        <!-- Tours -->
        <button type="button" class="card p-6 text-center hover:bg-gray-50 cursor-pointer text-left" on:click={() => navigate('tours')} on:keydown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); navigate('tours'); }}}>
          <div class="bg-primary-light/10 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-primary" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold mb-3">Tours & Safaris</h3>
          <p class="text-gray-600">
            Guided tours to Uganda's national parks, cultural sites, and natural wonders with expert local guides.
          </p>
        </button>

        <!-- Itinerary Planning -->
        <button type="button" class="card p-6 text-center hover:bg-gray-50 cursor-pointer text-left" on:click={() => navigate('itinerary')} on:keydown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); navigate('itinerary'); }}}>
          <div class="bg-primary-light/10 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-primary" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
              <path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clip-rule="evenodd" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold mb-3">Custom Itineraries</h3>
          <p class="text-gray-600">
            Personalized trip planning to create the perfect Ugandan adventure tailored to your preferences.
          </p>
        </button>
      </div>
    </div>
  </section>

  <!-- Shiloh Featured Accommodations -->
  <section class="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
    <div class="container-custom">
      <div class="text-center mb-16">
        <div class="flex items-center justify-center mb-6">
          <div class="bg-primary/10 p-3 rounded-full mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M3 21h18"/>
              <path d="M4 21V7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v14"/>
              <path d="M9 9h1v1H9V9z"/>
              <path d="M14 9h1v1h-1V9z"/>
              <path d="M9 13h1v1H9v-1z"/>
              <path d="M14 13h1v1h-1v-1z"/>
              <path d="M9 17h1v1H9v-1z"/>
              <path d="M14 17h1v1h-1v-1z"/>
              <path d="M5 3h14v2H5V3z"/>
              <circle cx="16" cy="3" r="1" fill="currentColor"/>
            </svg>
          </div>
          <h2 class="text-4xl md:text-5xl font-bold tracking-tight text-gray-800">
            Shiloh Hospitality
          </h2>
        </div>
        <p class="text-gray-600 max-w-4xl mx-auto text-xl leading-relaxed tracking-wide">
          Discover our flagship accommodations and car hire services - where Ugandan hospitality meets world-class comfort and convenience.
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {#each shilohAccommodations as property}
          <div class="bg-white/80 backdrop-blur-sm rounded-xl overflow-hidden shadow-2xl hover:bg-white/90 transition-all duration-300 border border-gray-200">
            <div class="h-64 overflow-hidden">
              <img
                src={property.image}
                alt={property.name}
                class="w-full h-full object-cover"
              />
            </div>
            <div class="p-6">
              <div class="flex justify-between items-start mb-3">
                <h3 class="text-xl font-bold text-gray-800">{property.name}</h3>
                <div class="flex items-center">
                  <span class="bg-accent text-white px-3 py-1 rounded-full text-sm font-bold mr-2">
                    FEATURED
                  </span>
                  <span class="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                    {property.price}/night
                  </span>
                </div>
              </div>
              <div class="flex items-center mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-accent" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                </svg>
                <span class="ml-1 text-gray-600">{property.location}</span>
              </div>
              <div class="flex items-center mb-4">
                <div class="flex mr-2">
                  {#each Array(5) as _, i}
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 {i < Math.floor(property.rating) ? 'text-yellow-400' : 'text-gray-300'}" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  {/each}
                </div>
                <span class="text-gray-600">{property.rating} • Top Rated</span>
              </div>
              <p class="text-gray-600 mb-4">{property.description}</p>
              <div class="flex flex-wrap gap-2 mb-4">
                {#each property.amenities as amenity}
                  <span class="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs">
                    {amenity}
                  </span>
                {/each}
              </div>
              <button
                class="w-full bg-gradient-to-r from-primary to-accent hover:from-primary-dark hover:to-accent-dark text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                on:click={() => book('accommodation', property)}
              >
                Book with Shiloh Hospitality
              </button>
            </div>
          </div>
        {/each}
      </div>

      <!-- Shiloh Car Hire Feature -->
      <div class="bg-white/90 backdrop-blur-sm rounded-xl p-8 border border-gray-200 shadow-lg">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <div class="flex items-center mb-4">
              <div class="bg-primary/10 p-2 rounded-lg mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <!-- Car body -->
                  <path d="M3 16h18v2a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-2z" fill="currentColor" stroke="none" opacity="0.1"/>
                  <rect x="4" y="10" width="16" height="6" rx="1" ry="1"/>
                  <!-- Windshield -->
                  <path d="M6 10V8a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2"/>
                  <!-- Headlights -->
                  <circle cx="7" cy="13" r="1.5" fill="currentColor" stroke="none" opacity="0.3"/>
                  <circle cx="17" cy="13" r="1.5" fill="currentColor" stroke="none" opacity="0.3"/>
                  <!-- Grille -->
                  <path d="M9 13h6" stroke-width="0.5"/>
                  <path d="M9 14h6" stroke-width="0.5"/>
                  <!-- License plate area -->
                  <rect x="10" y="15" width="4" height="1" rx="0.2" stroke="none" fill="currentColor" opacity="0.2"/>
                  <!-- Wheels -->
                  <circle cx="7" cy="18" r="2"/>
                  <circle cx="17" cy="18" r="2"/>
                  <circle cx="7" cy="18" r="1" fill="none" stroke-width="0.5"/>
                  <circle cx="17" cy="18" r="1" fill="none" stroke-width="0.5"/>
                </svg>
              </div>
              <h3 class="text-2xl font-bold text-gray-800">
                Shiloh Car Hire & Transport
              </h3>
            </div>
            <p class="text-gray-600 mb-6">
              Experience Uganda with our premium vehicle fleet. From airport transfers to safari adventures, our professional drivers and well-maintained vehicles ensure safe, comfortable journeys across the Pearl of Africa.
            </p>
            <ul class="space-y-2 mb-6">
              <li class="flex items-center text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-accent mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
                Professional, licensed drivers
              </li>
              <li class="flex items-center text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-accent mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
                Modern, well-maintained fleet
              </li>
              <li class="flex items-center text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-accent mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
                24/7 support & roadside assistance
              </li>
              <li class="flex items-center text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-accent mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
                Competitive rates with no hidden fees
              </li>
            </ul>
            <button
              class="bg-gradient-to-r from-primary to-accent hover:from-primary-dark hover:to-accent-dark text-white py-3 px-8 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
              on:click={() => book('transport', {
                id: 'shiloh-car-hire',
                name: 'Shiloh Car Hire Services',
                location: 'Kutta Road, Muyenga, Kampala',
                price: '$40',
                rating: 4.8,
                description: 'Professional car hire services with well-maintained vehicles and experienced drivers for all your transportation needs.',
                type: 'transport'
              })}
            >
              Book Your Ride
            </button>
          </div>
          <div class="h-64 lg:h-80 overflow-hidden rounded-lg">
            <img
              src="https://images.pexels.com/photos/18847999/pexels-photo-18847999.jpeg"
              alt="Shiloh Car Hire Fleet"
              class="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Featured Accommodations -->
  <section class="py-16">
    <div class="container-custom">
      <div class="flex flex-col md:flex-row justify-between items-center mb-8">
        <div>
          <h2 class="text-3xl md:text-4xl font-bold mb-2">Featured Accommodations</h2>
          <p class="text-gray-600 max-w-2xl">
            Experience the best of Ugandan hospitality with our handpicked accommodations.
          </p>
        </div>
        <button 
          class="mt-4 md:mt-0 text-primary font-semibold flex items-center hover:text-primary-dark transition-colors"
          on:click={() => navigate('accommodations')}
        >
          View All
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        {#each featuredAccommodations as accommodation}
          <div class="card overflow-hidden">
            <div class="h-56 overflow-hidden">
              <img 
                src={accommodation.image} 
                alt={accommodation.name}
                class="w-full h-full object-cover"
              />
            </div>
            <div class="p-6">
              <div class="flex justify-between items-start mb-2">
                <h3 class="text-xl font-semibold">{accommodation.name}</h3>
                <span class="bg-primary-light/10 text-primary px-2 py-1 rounded-md text-sm font-medium">
                  {accommodation.price}/night
                </span>
              </div>
              <div class="flex items-center mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-accent" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                </svg>
                <span class="ml-1 text-gray-600">{accommodation.location}</span>
              </div>
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
              <p class="text-gray-600 mb-4">{accommodation.description}</p>
              <button 
                class="w-full btn-primary py-2"
                on:click={() => book('accommodation', accommodation)}
              >
                Book Now
              </button>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- Featured Tours -->
  <section class="py-16 bg-gray-50">
    <div class="container-custom">
      <div class="flex flex-col md:flex-row justify-between items-center mb-8">
        <div>
          <h2 class="text-3xl md:text-4xl font-bold mb-2">Featured Tours & Safaris</h2>
          <p class="text-gray-600 max-w-2xl">
            Experience Uganda's natural wonders and vibrant culture with our guided tours.
          </p>
        </div>
        <button 
          class="mt-4 md:mt-0 text-primary font-semibold flex items-center hover:text-primary-dark transition-colors"
          on:click={() => navigate('tours')}
        >
          View All
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        {#each featuredTours as tour}
          <div class="card overflow-hidden">
            <div class="h-56 overflow-hidden">
              <img 
                src={tour.image} 
                alt={tour.name}
                class="w-full h-full object-cover"
              />
            </div>
            <div class="p-6">
              <div class="flex justify-between items-start mb-2">
                <h3 class="text-xl font-semibold">{tour.name}</h3>
                <span class="bg-primary-light/10 text-primary px-2 py-1 rounded-md text-sm font-medium">
                  {tour.price}
                </span>
              </div>
              <div class="flex items-center justify-between mb-3">
                <div class="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-accent" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                  </svg>
                  <span class="ml-1 text-gray-600">{tour.location}</span>
                </div>
                <div class="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-accent" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd" />
                  </svg>
                  <span class="ml-1 text-gray-600">{tour.duration}</span>
                </div>
              </div>
              <div class="flex items-center mb-3">
                <div class="flex">
                  {#each Array(5) as _, i}
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 {i < Math.floor(tour.rating) ? 'text-yellow-400' : 'text-gray-300'}" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  {/each}
                </div>
                <span class="ml-1 text-gray-600">{tour.rating} ({Math.floor(Math.random() * 50) + 10} reviews)</span>
              </div>
              <p class="text-gray-600 mb-4">{tour.description}</p>
              <button 
                class="w-full btn-primary py-2"
                on:click={() => book('tour', tour)}
              >
                Book Now
              </button>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- Personalized Recommendations -->
  <section class="py-16">
    <div class="container-custom">
      {#if PersonalizedRecommendations}
        <svelte:component this={PersonalizedRecommendations} {user} category="all" maxItems={6} on:book />
      {:else if componentLoadError}
        <!-- Fallback content when PersonalizedRecommendations fails to load -->
        <div class="bg-white rounded-lg p-6 border border-gray-200">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">Featured Experiences</h2>
          <p class="text-gray-600 mb-4">Discover amazing travel experiences with The Shiloh Experience</p>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="bg-gray-50 p-4 rounded-lg">
              <h3 class="font-semibold mb-2">Gorilla Trekking</h3>
              <p class="text-sm text-gray-600">Experience Uganda's magnificent mountain gorillas</p>
            </div>
            <div class="bg-gray-50 p-4 rounded-lg">
              <h3 class="font-semibold mb-2">Safari Adventures</h3>
              <p class="text-sm text-gray-600">Wildlife safaris across Uganda's national parks</p>
            </div>
            <div class="bg-gray-50 p-4 rounded-lg">
              <h3 class="font-semibold mb-2">Cultural Tours</h3>
              <p class="text-sm text-gray-600">Immerse yourself in Uganda's rich cultural heritage</p>
            </div>
          </div>
        </div>
      {:else}
        <!-- Loading state -->
        <div class="bg-white rounded-lg p-6 border border-gray-200">
          <div class="animate-pulse">
            <div class="h-8 bg-gray-200 rounded mb-4 w-1/3"></div>
            <div class="h-4 bg-gray-200 rounded mb-4 w-2/3"></div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              {#each Array(3) as _}
                <div class="bg-gray-100 h-32 rounded-lg"></div>
              {/each}
            </div>
          </div>
        </div>
      {/if}
    </div>
  </section>

  <!-- Testimonials -->
  <section class="py-16 bg-gradient-to-br from-blue-50 to-sky-100">
    <div class="container-custom">
      <div class="flex flex-col md:flex-row justify-between items-center mb-12">
        <div class="text-center md:text-left">
          <h2 class="text-3xl md:text-4xl font-bold mb-2 text-gray-800">What Our Clients Say</h2>
          <p class="text-gray-600 max-w-2xl">
            Discover why travelers choose The Shiloh Experience for their Ugandan adventures.
          </p>
        </div>
        <button
          class="mt-4 md:mt-0 bg-gradient-to-r from-primary to-accent hover:from-primary-dark hover:to-accent-dark text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] flex items-center"
          on:click={() => navigate('reviews')}
        >
          View All Reviews
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Testimonial 1 -->
        <div class="bg-white/80 backdrop-blur-sm p-6 rounded-xl border border-gray-200 shadow-lg">
          <div class="flex mb-4">
            {#each Array(5) as _}
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            {/each}
          </div>
          <p class="mb-4 italic">
            "Our safari tour with The Shiloh Experience was the highlight of our trip to Africa. The guides were knowledgeable, accommodations were fantastic, and we saw all the Big Five! Can't recommend them enough."
          </p>
          <div class="flex items-center">
            <div class="rounded-full bg-gray-200 h-12 w-12 flex items-center justify-center text-primary font-bold mr-3">
              JD
            </div>
            <div>
              <h4 class="font-semibold">John Davis</h4>
              <p class="text-sm text-gray-500">New York, USA</p>
            </div>
          </div>
        </div>
        
        <!-- Testimonial 2 -->
        <div class="bg-white/80 backdrop-blur-sm p-6 rounded-xl border border-gray-200 shadow-lg">
          <div class="flex mb-4">
            {#each Array(5) as _}
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            {/each}
          </div>
          <p class="mb-4 italic">
            "The custom itinerary Shiloh put together for our family was perfect. They balanced wildlife experiences with cultural activities that kept our teenagers engaged throughout the trip. Our driver was exceptional!"
          </p>
          <div class="flex items-center">
            <div class="rounded-full bg-gray-200 h-12 w-12 flex items-center justify-center text-primary font-bold mr-3">
              SM
            </div>
            <div>
              <h4 class="font-semibold">Sarah Miller</h4>
              <p class="text-sm text-gray-500">London, UK</p>
            </div>
          </div>
        </div>
        
        <!-- Testimonial 3 -->
        <div class="bg-white/80 backdrop-blur-sm p-6 rounded-xl border border-gray-200 shadow-lg">
          <div class="flex mb-4">
            {#each Array(5) as _}
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            {/each}
          </div>
          <p class="mb-4 italic">
            "Gorilla trekking in Bwindi was a dream come true. Shiloh handled all the permits, logistics, and accommodations perfectly. The experience of seeing gorillas in their natural habitat was life-changing."
          </p>
          <div class="flex items-center">
            <div class="rounded-full bg-gray-200 h-12 w-12 flex items-center justify-center text-primary font-bold mr-3">
              AK
            </div>
            <div>
              <h4 class="font-semibold">Akiko Tanaka</h4>
              <p class="text-sm text-gray-500">Tokyo, Japan</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA -->
  <section class="py-16">
    <div class="container-custom">
      <div class="bg-gradient-to-r from-primary to-accent rounded-xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between shadow-2xl">
        <div class="mb-6 md:mb-0 md:mr-8">
          <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Explore Uganda?</h2>
          <p class="text-white/90 text-lg mb-0 max-w-xl">
            Let us help you plan your perfect Ugandan adventure. From accommodations to tours, we'll handle everything so you can focus on making memories.
          </p>
        </div>
        <button
          class="bg-white text-primary hover:bg-gray-50 hover:text-primary-dark transition-all duration-300 text-lg font-semibold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] flex-shrink-0"
          on:click={() => navigate('contact')}
        >
          Contact Us Now
        </button>
      </div>
    </div>
  </section>
</div>
