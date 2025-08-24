<script>
  import { createEventDispatcher } from 'svelte';
  
  const dispatch = createEventDispatcher();
  let selectedType = 'all';
  let searchQuery = '';
  let priceRange = [0, 500];
  let selectedFeatures = [];

  // Transport/Car hire data
  const vehicles = [
    {
      id: 1,
      name: "Toyota Land Cruiser",
      type: "4x4 SUV",
      price: 120,
      passengers: 7,
      features: ["Air Conditioning", "Roof Rack", "GPS", "Safari Customized", "4WD"],
      rating: 4.8,
      image: "images/land-cruiser.jpg",
      description: "Rugged and reliable 4x4 vehicle, perfect for safari adventures and rough terrain. Comes with an experienced driver/guide."
    },
    {
      id: 2,
      name: "Toyota Hiace Van",
      type: "Minivan",
      price: 100,
      passengers: 10,
      features: ["Air Conditioning", "Sliding Door", "Spacious Luggage Area"],
      rating: 4.6,
      image: "images/hiace-van.jpg",
      description: "Spacious minivan ideal for group travel. Comfortable seating for up to 10 passengers with ample luggage space."
    },
    {
      id: 3,
      name: "Isuzu Coaster Bus",
      type: "Bus",
      price: 250,
      passengers: 28,
      features: ["Air Conditioning", "PA System", "Comfortable Seats", "Large Windows"],
      rating: 4.5,
      image: "images/coaster-bus.jpg",
      description: "Large tour bus perfect for bigger groups. Features comfortable seating and large windows for sightseeing."
    },
    {
      id: 4,
      name: "Toyota Corolla",
      type: "Sedan",
      price: 60,
      passengers: 4,
      features: ["Air Conditioning", "Fuel Efficient", "GPS"],
      rating: 4.7,
      image: "images/corolla.jpg",
      description: "Reliable and fuel-efficient sedan, ideal for urban travel and paved roads. Perfect for 1-4 travelers."
    },
    {
      id: 5,
      name: "Toyota RAV4",
      type: "Compact SUV",
      price: 85,
      passengers: 5,
      features: ["Air Conditioning", "Bluetooth", "GPS", "USB Ports"],
      rating: 4.7,
      image: "images/rav4.jpg",
      description: "Versatile compact SUV with good ground clearance for light off-road conditions. Comfortable for city and countryside driving."
    },
    {
      id: 6,
      name: "Land Rover Defender",
      type: "4x4 SUV",
      price: 150,
      passengers: 6,
      features: ["Air Conditioning", "Roof Rack", "GPS", "Safari Customized", "4WD", "Premium Sound"],
      rating: 4.9,
      image: "images/defender.jpg",
      description: "Premium 4x4 vehicle with excellent off-road capabilities. Top choice for safari enthusiasts seeking comfort and performance."
    },
    {
      id: 7,
      name: "Toyota Alphard",
      type: "Luxury Van",
      price: 180,
      passengers: 7,
      features: ["Air Conditioning", "Leather Seats", "Entertainment System", "Power Doors", "Luxury Interior"],
      rating: 4.8,
      image: "images/alphard.jpg",
      description: "Luxury van with premium features and elegant interior. Perfect for VIP transfers and comfortable group travel."
    },
    {
      id: 8,
      name: "Motorcycle",
      type: "Two-Wheeler",
      price: 40,
      passengers: 2,
      features: ["Helmet Included", "Fuel Efficient", "Agile"],
      rating: 4.3,
      image: "images/motorcycle.jpg",
      description: "Agile and fuel-efficient motorcycle for adventurous travelers. Great for navigating through traffic and visiting off-beat locations."
    }
  ];

  // Available vehicle types
  const vehicleTypes = ['Sedan', '4x4 SUV', 'Compact SUV', 'Minivan', 'Bus', 'Luxury Van', 'Two-Wheeler'];
  
  // Available features for filtering
  const availableFeatures = [
    "Air Conditioning", "GPS", "4WD", "Roof Rack", "Safari Customized", 
    "Bluetooth", "Leather Seats", "Entertainment System", "Fuel Efficient"
  ];
  
  // Filter vehicles based on selections
  $: filteredVehicles = vehicles.filter(vehicle => {
    const matchesType = selectedType === 'all' || vehicle.type === selectedType;
    const matchesSearch = searchQuery === '' || 
                         vehicle.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         vehicle.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = vehicle.price >= priceRange[0] && vehicle.price <= priceRange[1];
    const matchesFeatures = selectedFeatures.length === 0 || 
                           selectedFeatures.every(f => vehicle.features.includes(f));
    
    return matchesType && matchesSearch && matchesPrice && matchesFeatures;
  });

  function bookTransport(vehicle) {
    dispatch('book', { type: 'transport', item: vehicle });
  }

  function toggleFeatureFilter(feature) {
    if (selectedFeatures.includes(feature)) {
      selectedFeatures = selectedFeatures.filter(f => f !== feature);
    } else {
      selectedFeatures = [...selectedFeatures, feature];
    }
  }
  
  function clearFilters() {
    selectedType = 'all';
    searchQuery = '';
    priceRange = [0, 500];
    selectedFeatures = [];
  }
</script>

<div class="pt-16 pb-12">
  <div class="container-custom">
    <!-- Header -->
    <div class="mb-12">
      <h1 class="text-5xl font-bold mb-6 tracking-tight">Travel Services</h1>
      <p class="text-xl text-gray-600 leading-relaxed tracking-wide max-w-4xl">
        Complete travel solutions including car hire with professional drivers and air ticket bookings to make your Uganda experience seamless and comfortable.
      </p>
    </div>

    <!-- Service Categories -->
    <div class="mb-12">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Car Hire Section -->
        <div class="bg-primary text-white rounded-lg p-8">
          <div class="flex items-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 mr-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
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
              <!-- Wheels -->
              <circle cx="7" cy="18" r="2"/>
              <circle cx="17" cy="18" r="2"/>
              <circle cx="7" cy="18" r="1" fill="none" stroke-width="0.5"/>
              <circle cx="17" cy="18" r="1" fill="none" stroke-width="0.5"/>
            </svg>
            <h2 class="text-2xl font-bold">Car Hire</h2>
          </div>
          <p class="text-primary-light mb-4">Professional drivers, well-maintained vehicles, and comprehensive insurance for safe travels across Uganda.</p>
          <ul class="text-primary-light space-y-2">
            <li>• 4WD Safari Vehicles</li>
            <li>• City Transport</li>
            <li>• Long Distance Travel</li>
            <li>��� Airport Transfers</li>
          </ul>
        </div>

        <!-- Air Tickets Section -->
        <div class="bg-accent text-white rounded-lg p-8">
          <div class="flex items-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
            <h2 class="text-2xl font-bold">Air Tickets</h2>
          </div>
          <p class="text-accent-light mb-4">Domestic and international flight bookings with competitive rates and flexible travel options.</p>
          <ul class="text-accent-light space-y-2">
            <li>• International Flights</li>
            <li>• Domestic Connections</li>
            <li>• Group Bookings</li>
            <li>• Travel Insurance</li>
          </ul>
          <div class="mt-6">
            <button class="bg-white text-accent px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors">
              Book Flight Tickets
            </button>
          </div>
        </div>
      </div>
    </div>

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
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Search -->
        <div>
          <label for="search" class="block text-sm font-medium text-gray-700 mb-1">
            Search
          </label>
          <div class="relative">
            <input 
              type="text" 
              id="search" 
              placeholder="Search vehicles..."
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
        
        <!-- Vehicle Type -->
        <div>
          <label for="vehicleType" class="block text-sm font-medium text-gray-700 mb-1">
            Vehicle Type
          </label>
          <select 
            id="vehicleType" 
            bind:value={selectedType}
            class="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="all">All Types</option>
            {#each vehicleTypes as type}
              <option value={type}>{type}</option>
            {/each}
          </select>
        </div>
        
        <!-- Price Range -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Price Range ($ per day)
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
      
      <!-- Features -->
      <div class="mt-4">
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Features
        </label>
        <div class="flex flex-wrap gap-2">
          {#each availableFeatures as feature}
            <button 
              class="px-3 py-1 text-sm rounded-full {selectedFeatures.includes(feature) ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'} hover:bg-primary-light hover:text-white transition-colors"
              on:click={() => toggleFeatureFilter(feature)}
            >
              {feature}
            </button>
          {/each}
        </div>
      </div>
    </div>

    <!-- Results Count -->
    <p class="mb-4 text-gray-600">
      Showing {filteredVehicles.length} of {vehicles.length} vehicles
    </p>

    <!-- Vehicles Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {#each filteredVehicles as vehicle (vehicle.id)}
        <div class="card overflow-hidden">
          <div class="h-56 overflow-hidden">
            <img
              src={vehicle.image}
              alt={vehicle.name}
              class="w-full h-full object-cover"
            />
          </div>
          <div class="p-6">
            <div class="flex justify-between items-start mb-2">
              <h3 class="text-xl font-semibold">{vehicle.name}</h3>
              <span class="bg-primary-light/10 text-primary px-2 py-1 rounded-md text-sm font-medium">
                ${vehicle.price}/day
              </span>
            </div>
            <div class="flex items-center mb-1">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-accent" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
              </svg>
              <span class="ml-1 text-gray-600">{vehicle.passengers} Passengers</span>
            </div>
            <div class="text-gray-500 mb-3 text-sm">{vehicle.type}</div>
            <div class="flex items-center mb-3">
              <div class="flex">
                {#each Array(5) as _, i}
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 {i < Math.floor(vehicle.rating) ? 'text-yellow-400' : 'text-gray-300'}" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                {/each}
              </div>
              <span class="ml-1 text-gray-600">{vehicle.rating} ({Math.floor(Math.random() * 30) + 10} reviews)</span>
            </div>
            <div class="mb-3">
              <div class="flex flex-wrap gap-2">
                {#each vehicle.features.slice(0, 3) as feature}
                  <span class="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-xs">
                    {feature}
                  </span>
                {/each}
                {#if vehicle.features.length > 3}
                  <span class="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-xs">
                    +{vehicle.features.length - 3} more
                  </span>
                {/if}
              </div>
            </div>
            <p class="text-gray-600 mb-4 line-clamp-2">{vehicle.description}</p>
            <button 
              class="w-full btn-primary py-2"
              on:click={() => bookTransport(vehicle)}
            >
              Book Now
            </button>
          </div>
        </div>
      {/each}
      
      {#if filteredVehicles.length === 0}
        <div class="col-span-full flex flex-col items-center justify-center py-12">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 class="text-xl font-semibold text-gray-700 mb-2">No vehicles found</h3>
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

    <!-- Additional Info -->
    <div class="mt-12 bg-gray-50 rounded-lg p-6">
      <h2 class="text-2xl font-semibold mb-4">Our Transport Services</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 class="text-xl font-medium mb-3">What's Included</h3>
          <ul class="space-y-2">
            <li class="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-500 mt-0.5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              <span>Professional, English-speaking driver/guide</span>
            </li>
            <li class="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-500 mt-0.5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              <span>Fuel for the entire journey</span>
            </li>
            <li class="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-500 mt-0.5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              <span>Vehicle maintenance and insurance</span>
            </li>
            <li class="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-500 mt-0.5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              <span>Bottled water during your journey</span>
            </li>
            <li class="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-500 mt-0.5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              <span>24/7 customer support</span>
            </li>
          </ul>
        </div>
        <div>
          <h3 class="text-xl font-medium mb-3">Good to Know</h3>
          <ul class="space-y-2">
            <li class="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-accent mt-0.5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
              </svg>
              <span>Safari vehicles have pop-up roof hatches for wildlife viewing</span>
            </li>
            <li class="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-accent mt-0.5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
              </svg>
              <span>All vehicles undergo regular maintenance checks</span>
            </li>
            <li class="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-accent mt-0.5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
              </svg>
              <span>For self-driving options, a valid international driving permit is required</span>
            </li>
            <li class="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-accent mt-0.5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
              </svg>
              <span>Rental period is calculated on a 24-hour basis</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>
