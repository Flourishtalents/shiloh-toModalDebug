<script>
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  export let user = null;

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
        </div>
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
