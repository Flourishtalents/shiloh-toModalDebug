<script>
  import { createEventDispatcher } from 'svelte';
  import DownloadableResources from './DownloadableResources.svelte';
  import { addToWishlist, removeFromWishlist, isInWishlist } from '../utils/wishlist.js';

  const dispatch = createEventDispatcher();
  export let user = null;
  
  let activeMainTab = 'car-hire'; // car-hire, air-tickets, visa-processing, gorilla-permits, resources
  let activeSubTab = 'car-hire'; // For transport section
  let activeResourceTab = 'guides'; // For resources section
  let activePermitTab = 'gorilla-permits'; // For permits section
  
  // Transport/Car Hire data
  let selectedType = 'all';
  let searchQuery = '';
  let priceRange = [0, 500];
  let selectedFeatures = [];
  let selectedTransmission = 'all';
  let selectedFuelType = 'all';
  let sortBy = 'price-low';

  // Air tickets data
  let selectedAirline = 'all';
  let selectedRoute = 'all';
  let flightClass = 'economy';
  let departureDate = '';
  let returnDate = '';
  let passengers = 1;
  let tripType = 'round-trip';

  const vehicles = [
    {
      id: 1,
      name: "Toyota Land Cruiser Prado",
      type: "4x4 SUV",
      price: 120,
      passengers: 7,
      features: ["Air Conditioning", "Roof Rack", "GPS", "Safari Customized", "4WD", "Pop-up Roof"],
      rating: 4.8,
      image: "https://images.pexels.com/photos/11114270/pexels-photo-11114270.jpeg",
      description: "Rugged and reliable 4x4 vehicle, perfect for safari adventures and rough terrain. Comes with an experienced driver/guide.",
      transmission: 'automatic',
      fuelType: 'diesel',
      category: '4x4-safari'
    },
    {
      id: 2,
      name: "Toyota Hiace Van",
      type: "Minivan",
      price: 100,
      passengers: 10,
      features: ["Air Conditioning", "Sliding Door", "Spacious Luggage Area", "USB Charging"],
      rating: 4.6,
      image: "https://images.pexels.com/photos/19548262/pexels-photo-19548262.jpeg",
      description: "Spacious minivan ideal for group travel. Comfortable seating for up to 10 passengers with ample luggage space.",
      transmission: 'manual',
      fuelType: 'petrol',
      category: 'group-transport'
    },
    {
      id: 3,
      name: "Isuzu Coaster Bus",
      type: "Bus",
      price: 250,
      passengers: 28,
      features: ["Air Conditioning", "PA System", "Comfortable Seats", "Large Windows", "WiFi"],
      rating: 4.5,
      image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      description: "Large tour bus perfect for bigger groups. Features comfortable seating and large windows for sightseeing.",
      transmission: 'manual',
      fuelType: 'diesel',
      category: 'large-group'
    },
    {
      id: 4,
      name: "Land Rover Defender",
      type: "4x4 SUV",
      price: 140,
      passengers: 5,
      features: ["Air Conditioning", "Off-Road Tires", "GPS", "Safari Customized", "4WD", "Snorkel"],
      rating: 4.9,
      image: "https://images.pexels.com/photos/5913415/pexels-photo-5913415.jpeg",
      description: "Ultimate off-road vehicle for extreme safari adventures and challenging terrain exploration.",
      transmission: 'manual',
      fuelType: 'diesel',
      category: '4x4-safari'
    },
    {
      id: 5,
      name: "Toyota RAV4",
      type: "SUV",
      price: 80,
      passengers: 5,
      features: ["Air Conditioning", "GPS", "Bluetooth", "AWD", "Backup Camera"],
      rating: 4.4,
      image: "https://images.unsplash.com/photo-1609521263047-f8f205293f24?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      description: "Comfortable city and light off-road SUV, perfect for urban exploration and short trips.",
      transmission: 'automatic',
      fuelType: 'petrol',
      category: 'city-suv'
    },
    {
      id: 6,
      name: "Nissan Safari",
      type: "4x4 SUV",
      price: 110,
      passengers: 8,
      features: ["Air Conditioning", "Roof Rack", "GPS", "4WD", "Extra Storage"],
      rating: 4.3,
      image: "https://images.pexels.com/photos/4257670/pexels-photo-4257670.jpeg",
      description: "Reliable 4x4 with excellent value for money, suitable for medium group safaris.",
      transmission: 'manual',
      fuelType: 'diesel',
      category: '4x4-safari'
    }
  ];

  // Air tickets data
  const airlines = [
    { id: 'all', name: 'All Airlines' },
    { id: 'uganda-airlines', name: 'Uganda Airlines' },
    { id: 'kenya-airways', name: 'Kenya Airways' },
    { id: 'ethiopian', name: 'Ethiopian Airlines' },
    { id: 'rwandair', name: 'RwandAir' },
    { id: 'emirates', name: 'Emirates' },
    { id: 'qatar', name: 'Qatar Airways' },
    { id: 'turkish', name: 'Turkish Airlines' }
  ];

  const routes = [
    { id: 'all', name: 'All Routes' },
    { id: 'kampala-nairobi', name: 'Kampala → Nairobi', price: 250 },
    { id: 'kampala-kigali', name: 'Kampala → Kigali', price: 180 },
    { id: 'kampala-addis', name: 'Kampala → Addis Ababa', price: 320 },
    { id: 'kampala-dubai', name: 'Kampala → Dubai', price: 580 },
    { id: 'kampala-doha', name: 'Kampala → Doha', price: 620 },
    { id: 'kampala-istanbul', name: 'Kampala → Istanbul', price: 650 },
    { id: 'domestic-arua', name: 'Kampala → Arua (Domestic)', price: 120 },
    { id: 'domestic-gulu', name: 'Kampala → Gulu (Domestic)', price: 100 }
  ];

  // Filter vehicles based on current selections
  $: filteredVehicles = vehicles.filter(vehicle => {
    if (selectedType !== 'all' && vehicle.category !== selectedType) return false;
    if (selectedTransmission !== 'all' && vehicle.transmission !== selectedTransmission) return false;
    if (selectedFuelType !== 'all' && vehicle.fuelType !== selectedFuelType) return false;
    if (vehicle.price < priceRange[0] || vehicle.price > priceRange[1]) return false;
    if (selectedFeatures.length > 0 && !selectedFeatures.every(feature => vehicle.features.includes(feature))) return false;
    if (searchQuery && !vehicle.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !vehicle.description.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'price-low': return a.price - b.price;
      case 'price-high': return b.price - a.price;
      case 'rating': return b.rating - a.rating;
      case 'passengers': return b.passengers - a.passengers;
      default: return 0;
    }
  });

  // Get available route price
  function getRoutePrice(routeId) {
    const route = routes.find(r => r.id === routeId);
    return route ? route.price : 0;
  }

  // Vehicle booking function
  function bookVehicle(vehicle) {
    dispatch('book', { type: 'transport', item: vehicle });
  }

  // Wishlist functionality for vehicles
  function toggleVehicleWishlist(vehicle) {
    if (!user) {
      showNotification('Please sign in to add items to your wishlist', 'error');
      return;
    }

    const wishlistItem = {
      id: vehicle.id,
      name: vehicle.name,
      price: `$${vehicle.price}/day`,
      image: vehicle.image,
      type: 'vehicle',
      description: vehicle.description,
      rating: vehicle.rating
    };

    if (isInWishlist(vehicle.id, 'vehicle', user.id)) {
      const result = removeFromWishlist(vehicle.id, 'vehicle', user.id);
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

  // Air ticket booking function
  function bookAirTicket(route) {
    const ticketData = {
      route: route,
      airline: selectedAirline,
      class: flightClass,
      departure: departureDate,
      return: returnDate,
      passengers: passengers,
      tripType: tripType
    };
    dispatch('book', { type: 'air-ticket', item: ticketData });
  }

  // Wishlist functionality for flights
  function toggleFlightWishlist(route) {
    if (!user) {
      showNotification('Please sign in to add items to your wishlist', 'error');
      return;
    }

    const wishlistItem = {
      id: route.id,
      name: route.name,
      price: `$${route.price}`,
      image: 'https://images.pexels.com/photos/912050/pexels-photo-912050.jpeg', // Default flight image
      type: 'flight',
      description: `Flight route ${route.name}`,
      rating: 4.5
    };

    if (isInWishlist(route.id, 'flight', user.id)) {
      const result = removeFromWishlist(route.id, 'flight', user.id);
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

  // Resources data
  let selectedRegion = 'central';
  let selectedGuide = null;
  let showEmergencyModal = false;
  
  const travelGuides = {
    central: {
      name: 'Central Uganda',
      description: 'The heart of Uganda including Kampala, Entebbe, and surrounding areas',
      highlights: ['Capital City Kampala', 'Entebbe Airport & Botanical Gardens', 'Lake Victoria', 'Kasubi Tombs'],
      guides: [
        {
          id: 1,
          title: 'Kampala City Guide',
          description: 'Complete guide to Uganda\'s vibrant capital city',
          duration: '15 min read',
          topics: ['Shopping', 'Restaurants', 'Nightlife', 'Transport', 'Accommodation']
        }
      ]
    },
    western: {
      name: 'Western Uganda',
      description: 'Home to mountain gorillas, chimpanzees, and stunning landscapes',
      highlights: ['Bwindi Impenetrable Forest', 'Queen Elizabeth National Park', 'Rwenzori Mountains', 'Lake Bunyonyi'],
      guides: [
        {
          id: 2,
          title: 'Gorilla Trekking Guide',
          description: 'Everything you need to know about gorilla trekking in Bwindi',
          duration: '20 min read',
          topics: ['Permits', 'What to Pack', 'Fitness Requirements', 'Best Time to Visit']
        }
      ]
    }
  };

  // Permits & Visa data
  let selectedTrekkingDate = ''
  let numberOfPermits = 1
  let selectedPark = 'bwindi'
  let permitApplications = JSON.parse(localStorage.getItem('permitApplications') || '[]')
  let visaApplications = JSON.parse(localStorage.getItem('visaApplications') || '[]')
  let selectedVisaType = 'tourist'
  let visaArrivalDate = ''
  let visaDepartureDate = ''

  const parks = [
    { id: 'bwindi', name: 'Bwindi Impenetrable National Park', price: 700 },
    { id: 'mgahinga', name: 'Mgahinga Gorilla National Park', price: 700 }
  ]
  
  const visaTypes = [
    { id: 'tourist', name: 'Tourist Visa (90 days)', price: 50 },
    { id: 'business', name: 'Business Visa (90 days)', price: 50 },
    { id: 'transit', name: 'Transit Visa (7 days)', price: 30 },
    { id: 'east-africa', name: 'East Africa Tourist Visa (90 days)', price: 100 }
  ]

  // Form data for permit application
  let permitFormData = {
    fullName: user?.name || '',
    passportNumber: '',
    nationality: '',
    dateOfBirth: '',
    email: user?.email || '',
    phone: '',
    emergencyContact: '',
    emergencyPhone: '',
    dietaryRequirements: '',
    medicalConditions: '',
    fitnessLevel: 'moderate'
  }

  function switchMainTab(tab) {
    activeMainTab = tab;
  }

  // Sharing functionality
  function shareResource(resourceName, resourceType) {
    const url = window.location.href;
    const text = `Check out this amazing ${resourceType} from The Shiloh Experience: ${resourceName}`;

    if (navigator.share) {
      navigator.share({
        title: `${resourceName} - The Shiloh Experience`,
        text: text,
        url: url
      });
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(`${text} ${url}`).then(() => {
        alert('Link copied to clipboard!');
      });
    }
  }

  function shareToSocial(platform, resourceName, resourceType) {
    const url = window.location.href;
    const text = `Check out this amazing ${resourceType} from The Shiloh Experience: ${resourceName}`;

    let shareUrl;
    switch(platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      case 'email':
        shareUrl = `mailto:?subject=${encodeURIComponent(resourceName + ' - The Shiloh Experience')}&body=${encodeURIComponent(text + ' ' + url)}`;
        break;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  }

  function bookTransport(vehicle) {
    dispatch('book', { type: 'transport', item: vehicle });
  }

  function calculatePermitTotal() {
    const park = parks.find(p => p.id === selectedPark)
    return park ? park.price * numberOfPermits : 0
  }

  function calculateVisaTotal() {
    const visa = visaTypes.find(v => v.id === selectedVisaType)
    return visa ? visa.price : 0
  }

  function submitPermitApplication() {
    if (!permitFormData.fullName || !permitFormData.passportNumber || !selectedTrekkingDate) {
      alert('Please fill in all required fields')
      return
    }
    
    const application = {
      id: Date.now(),
      type: 'gorilla-permit',
      park: parks.find(p => p.id === selectedPark).name,
      date: selectedTrekkingDate,
      permits: numberOfPermits,
      total: calculatePermitTotal(),
      applicant: { ...permitFormData },
      status: 'processing',
      submittedAt: new Date().toISOString(),
      processingTime: '3-5 business days'
    }
    
    permitApplications = [...permitApplications, application]
    localStorage.setItem('permitApplications', JSON.stringify(permitApplications))
    
    alert('Gorilla permit application submitted successfully! You will receive a confirmation email shortly.')
  }
</script>

<div class="pt-16 pb-12">
  <div class="container-custom">
    <!-- Header -->
    <div class="mb-12">
      <h1 class="text-5xl font-bold mb-6 tracking-tight">Travel Services</h1>
      <p class="text-xl text-gray-600 leading-relaxed tracking-wide max-w-4xl">
        Complete travel support including transportation, travel resources, permits processing, and essential travel information for your Uganda experience.
      </p>
    </div>

    <!-- Main Tab Navigation -->
    <div class="flex justify-center mb-8">
      <div class="bg-white rounded-lg shadow-md p-1 flex flex-wrap gap-1">
        <button
          class="px-6 py-3 rounded-md font-medium transition-all duration-200 flex items-center {activeMainTab === 'car-hire' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:text-blue-600'}"
          on:click={() => switchMainTab('car-hire')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
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
          Car Hire
        </button>
        <button
          class="px-6 py-3 rounded-md font-medium transition-all duration-200 flex items-center {activeMainTab === 'air-tickets' ? 'bg-sky-600 text-white' : 'text-gray-600 hover:text-sky-600'}"
          on:click={() => switchMainTab('air-tickets')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
          </svg>
          Air Tickets
        </button>
        <button
          class="px-6 py-3 rounded-md font-medium transition-all duration-200 flex items-center {activeMainTab === 'visa-processing' ? 'bg-purple-600 text-white' : 'text-gray-600 hover:text-purple-600'}"
          on:click={() => switchMainTab('visa-processing')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
          </svg>
          Visa Processing
        </button>
        <button
          class="px-6 py-3 rounded-md font-medium transition-all duration-200 flex items-center {activeMainTab === 'gorilla-permits' ? 'bg-green-600 text-white' : 'text-gray-600 hover:text-green-600'}"
          on:click={() => switchMainTab('gorilla-permits')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          Gorilla Permits
        </button>
        <button
          class="px-6 py-3 rounded-md font-medium transition-all duration-200 flex items-center {activeMainTab === 'resources' ? 'bg-orange-600 text-white' : 'text-gray-600 hover:text-orange-600'}"
          on:click={() => switchMainTab('resources')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
          </svg>
          Travel Resources
        </button>
      </div>
    </div>

    <!-- Car Hire Section -->
    {#if activeMainTab === 'car-hire'}
      <div class="space-y-8">
        <!-- Vehicle Search & Booking -->
        <div class="bg-white shadow-md rounded-lg p-6 mb-8">
          <h3 class="text-xl font-semibold mb-4">Vehicle Search & Booking</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <!-- Rental Type -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Rental Type</label>
              <select bind:value={selectedType} class="w-full px-3 py-2 border border-gray-300 rounded-md">
                <option value="self-drive">Self Drive</option>
                <option value="with-driver">With Driver</option>
                <option value="airport-transfer">Airport Transfer</option>
              </select>
            </div>

            <!-- Vehicle Category -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Vehicle Category</label>
              <select bind:value={selectedTransmission} class="w-full px-3 py-2 border border-gray-300 rounded-md">
                <option value="economy">Economy</option>
                <option value="suv">4x4 SUV</option>
                <option value="minivan">Minivan</option>
                <option value="luxury">Luxury</option>
              </select>
            </div>

            <!-- Passengers -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Passengers</label>
              <select bind:value={passengers} class="w-full px-3 py-2 border border-gray-300 rounded-md">
                <option value="1-4">1-4 Passengers</option>
                <option value="5-7">5-7 Passengers</option>
                <option value="8-14">8-14 Passengers</option>
                <option value="15+">15+ Passengers</option>
              </select>
            </div>

            <!-- Duration -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Rental Duration</label>
              <select bind:value={selectedFuelType} class="w-full px-3 py-2 border border-gray-300 rounded-md">
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="custom">Custom Period</option>
              </select>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <!-- Pickup Location -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Pickup Location</label>
              <select bind:value={selectedRoute} class="w-full px-3 py-2 border border-gray-300 rounded-md">
                <option value="all">Popular Locations</option>
                <option value="entebbe-airport">Entebbe Airport</option>
                <option value="kampala-city">Kampala City Center</option>
                <option value="hotel-pickup">Hotel Pickup</option>
                <option value="bwindi">Bwindi National Park</option>
                <option value="murchison">Murchison Falls</option>
                <option value="queen-elizabeth">Queen Elizabeth NP</option>
              </select>
            </div>

            <!-- Pickup Date -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Pickup Date</label>
              <input type="date" bind:value={departureDate} class="w-full px-3 py-2 border border-gray-300 rounded-md">
            </div>

            <!-- Return Date -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Return Date</label>
              <input type="date" bind:value={returnDate} class="w-full px-3 py-2 border border-gray-300 rounded-md">
            </div>
          </div>
        </div>

        <!-- Vehicle Gallery -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {#each filteredVehicles as vehicle (vehicle.id)}
            <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow group">
              <!-- Vehicle Image -->
              <div class="h-56 overflow-hidden relative">
                <img
                  src={vehicle.image}
                  alt={vehicle.name}
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />

                <!-- Wishlist button -->
                <div class="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    class="bg-white p-2 rounded-full shadow-md hover:bg-gray-50 transition-colors"
                    on:click|stopPropagation={() => toggleVehicleWishlist(vehicle)}
                    title={isInWishlist(vehicle.id, 'vehicle', user?.id) ? 'Remove from wishlist' : 'Add to wishlist'}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 {isInWishlist(vehicle.id, 'vehicle', user?.id) ? 'text-red-500 fill-current' : 'text-gray-600 hover:text-red-500'}" fill={isInWishlist(vehicle.id, 'vehicle', user?.id) ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                    </svg>
                  </button>
                </div>

                <!-- Vehicle Type Badge -->
                <div class="absolute top-3 left-3 bg-primary text-white rounded px-2 py-1 text-xs font-medium uppercase">
                  {vehicle.type}
                </div>
              </div>

              <!-- Vehicle Details -->
              <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-2">{vehicle.name}</h3>
                <p class="text-gray-600 mb-3 line-clamp-2">{vehicle.description}</p>

                <!-- Vehicle Specs -->
                <div class="flex items-center justify-between text-sm text-gray-500 mb-3">
                  <div class="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857M9 13c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" />
                    </svg>
                    {vehicle.passengers} passengers
                  </div>
                  <div class="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    {vehicle.fuelType}
                  </div>
                  <div class="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {vehicle.transmission}
                  </div>
                </div>

                <!-- Rating -->
                <div class="flex items-center mb-3">
                  <div class="flex">
                    {#each Array(5) as _, i}
                      <svg
                        class="h-4 w-4 {i < Math.floor(vehicle.rating) ? 'text-yellow-400' : 'text-gray-300'}"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    {/each}
                  </div>
                  <span class="text-sm text-gray-500 ml-1">({vehicle.rating})</span>
                </div>

                <!-- Features -->
                <div class="flex flex-wrap gap-1 mb-4">
                  {#each vehicle.features.slice(0, 3) as feature}
                    <span class="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                      {feature}
                    </span>
                  {/each}
                  {#if vehicle.features.length > 3}
                    <span class="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                      +{vehicle.features.length - 3} more
                    </span>
                  {/if}
                </div>

                <!-- Price and Actions -->
                <div class="flex items-center justify-between">
                  <div class="text-2xl font-bold text-primary">${vehicle.price}<span class="text-sm font-normal text-gray-500">/day</span></div>
                  <button
                    class="btn-primary px-4 py-2 text-sm"
                    on:click={() => bookVehicle(vehicle)}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          {/each}
        </div>

        {#if filteredVehicles.length === 0}
          <div class="text-center py-12">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-gray-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 class="text-xl font-semibold text-gray-700 mb-2">No vehicles found</h3>
            <p class="text-gray-500">Try adjusting your filters to see more options</p>
          </div>
        {/if}

        <!-- Vehicle Services Section -->
        <div class="mt-12">
          <h3 class="text-2xl font-semibold mb-6">Additional Services</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <!-- Airport Transfer Service -->
            <div class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div class="flex items-center mb-4">
                <div class="bg-blue-100 p-3 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7l4-4m0 0l4 4m-4-4v18" />
                  </svg>
                </div>
                <h4 class="text-lg font-semibold ml-3">Airport Transfer</h4>
              </div>
              <p class="text-gray-600 mb-4">Professional airport pickup and drop-off service with comfortable vehicles</p>
              <ul class="text-sm text-gray-500 mb-4 space-y-1">
                <li>✓ Meet & greet service</li>
                <li>✓ Flight tracking</li>
                <li>✓ Professional drivers</li>
                <li>✓ Air-conditioned vehicles</li>
              </ul>
              <div class="text-xl font-bold text-primary mb-2">From $45</div>
              <button class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition-colors">
                Book Transfer
              </button>
            </div>

            <!-- Driver Service -->
            <div class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div class="flex items-center mb-4">
                <div class="bg-green-100 p-3 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m8.35-2.143A5.002 5.002 0 0016 13c0-2.76-2.24-5-5-5s-5 2.24-5 5a5.002 5.002 0 004.65 5" />
                  </svg>
                </div>
                <h4 class="text-lg font-semibold ml-3">Professional Driver</h4>
              </div>
              <p class="text-gray-600 mb-4">Experienced local drivers who know Uganda's roads and attractions</p>
              <ul class="text-sm text-gray-500 mb-4 space-y-1">
                <li>✓ Local knowledge</li>
                <li>✓ English speaking</li>
                <li>✓ Licensed & insured</li>
                <li>✓ Safari expertise</li>
              </ul>
              <div class="text-xl font-bold text-primary mb-2">$30/day</div>
              <button class="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md transition-colors">
                Add Driver
              </button>
            </div>

            <!-- GPS & Equipment -->
            <div class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div class="flex items-center mb-4">
                <div class="bg-purple-100 p-3 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h4 class="text-lg font-semibold ml-3">GPS & Equipment</h4>
              </div>
              <p class="text-gray-600 mb-4">GPS navigation and additional equipment for self-drive adventures</p>
              <ul class="text-sm text-gray-500 mb-4 space-y-1">
                <li>✓ GPS navigation</li>
                <li>✓ Emergency kit</li>
                <li>✓ Camping equipment</li>
                <li>✓ Communication devices</li>
              </ul>
              <div class="text-xl font-bold text-primary mb-2">$15/day</div>
              <button class="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-md transition-colors">
                Add Equipment
              </button>
            </div>
          </div>
        </div>

          <!-- Special Packages -->
          <div class="bg-white rounded-lg shadow-md p-6">
            <h4 class="text-lg font-semibold mb-4">Special Packages & Tours</h4>
            <div class="space-y-4">
              <div class="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div class="flex justify-between items-center">
                  <div>
                    <h5 class="font-medium">Gorilla Trekking Package</h5>
                    <p class="text-sm text-gray-600">4x4 + Driver + Permits �� 3 Days</p>
                  </div>
                  <div class="text-right">
                    <div class="text-lg font-bold text-primary">$850/trip</div>
                    <button class="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm transition-colors">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>

              <div class="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div class="flex justify-between items-center">
                  <div>
                    <h5 class="font-medium">Safari Circuit Tour</h5>
                    <p class="text-sm text-gray-600">Land Cruiser + Guide • 7 Days</p>
                  </div>
                  <div class="text-right">
                    <div class="text-lg font-bold text-primary">$1,200/trip</div>
                    <button class="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm transition-colors">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>

              <div class="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div class="flex justify-between items-center">
                  <div>
                    <h5 class="font-medium">Airport Transfer</h5>
                    <p class="text-sm text-gray-600">Sedan/SUV • One Way • Professional Driver</p>
                  </div>
                  <div class="text-right">
                    <div class="text-lg font-bold text-primary">$45/trip</div>
                    <button class="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm transition-colors">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Services Info -->
        <div class="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
          <h4 class="text-lg font-semibold mb-4">Our Car Hire Services</h4>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="text-center">
              <div class="bg-blue-100 p-3 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h5 class="font-medium mb-2">Quality Guaranteed</h5>
              <p class="text-sm text-gray-600">Well-maintained vehicles with comprehensive insurance coverage</p>
            </div>
            <div class="text-center">
              <div class="bg-blue-100 p-3 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h5 class="font-medium mb-2">Flexible Pickup</h5>
              <p class="text-sm text-gray-600">Hotel, airport, or any location pickup and drop-off service</p>
            </div>
            <div class="text-center">
              <div class="bg-blue-100 p-3 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h5 class="font-medium mb-2">Professional Drivers</h5>
              <p class="text-sm text-gray-600">Licensed, experienced drivers who know Uganda's roads and attractions</p>
            </div>
          </div>
        </div>
    {/if}

    <!-- Air Tickets Section -->
    {#if activeMainTab === 'air-tickets'}
      <div class="space-y-8">
        <!-- Flight Search -->
        <div class="bg-white shadow-md rounded-lg p-6 mb-8">
          <h3 class="text-xl font-semibold mb-4">Flight Search & Booking</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <!-- Trip Type -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Trip Type</label>
              <select bind:value={tripType} class="w-full px-3 py-2 border border-gray-300 rounded-md">
                <option value="round-trip">Round Trip</option>
                <option value="one-way">One Way</option>
                <option value="multi-city">Multi City</option>
              </select>
            </div>

            <!-- Flight Class -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Class</label>
              <select bind:value={flightClass} class="w-full px-3 py-2 border border-gray-300 rounded-md">
                <option value="economy">Economy</option>
                <option value="premium-economy">Premium Economy</option>
                <option value="business">Business</option>
                <option value="first">First Class</option>
              </select>
            </div>

            <!-- Passengers -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Passengers</label>
              <select bind:value={passengers} class="w-full px-3 py-2 border border-gray-300 rounded-md">
                <option value="1">1 Passenger</option>
                <option value="2">2 Passengers</option>
                <option value="3">3 Passengers</option>
                <option value="4">4 Passengers</option>
                <option value="5">5+ Passengers</option>
              </select>
            </div>

            <!-- Airlines -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Preferred Airline</label>
              <select bind:value={selectedAirline} class="w-full px-3 py-2 border border-gray-300 rounded-md">
                <option value="all">All Airlines</option>
                <option value="ethiopian">Ethiopian Airlines</option>
                <option value="kenya-airways">Kenya Airways</option>
                <option value="rwandair">RwandAir</option>
                <option value="emirates">Emirates</option>
                <option value="qatar">Qatar Airways</option>
              </select>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <!-- Route -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Route</label>
              <select bind:value={selectedRoute} class="w-full px-3 py-2 border border-gray-300 rounded-md">
                <option value="all">Popular Routes</option>
                <option value="entebbe-nairobi">Entebbe - Nairobi</option>
                <option value="entebbe-dubai">Entebbe - Dubai</option>
                <option value="entebbe-addis">Entebbe - Addis Ababa</option>
                <option value="entebbe-kigali">Entebbe - Kigali</option>
                <option value="entebbe-london">Entebbe - London</option>
                <option value="entebbe-amsterdam">Entebbe - Amsterdam</option>
              </select>
            </div>

            <!-- Departure Date -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Departure Date</label>
              <input type="date" bind:value={departureDate} class="w-full px-3 py-2 border border-gray-300 rounded-md">
            </div>

            <!-- Return Date -->
            {#if tripType === 'round-trip'}
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Return Date</label>
                <input type="date" bind:value={returnDate} class="w-full px-3 py-2 border border-gray-300 rounded-md">
              </div>
            {/if}
          </div>
        </div>

        <!-- Flight Listings -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <!-- Popular Routes -->
          <div class="bg-white rounded-lg shadow-md p-6">
            <h4 class="text-lg font-semibold mb-4">Popular Routes from Uganda</h4>
            <div class="space-y-4">
              <div class="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div class="flex justify-between items-center">
                  <div>
                    <h5 class="font-medium">Entebbe → Nairobi</h5>
                    <p class="text-sm text-gray-600">Kenya Airways • 1h 30m</p>
                  </div>
                  <div class="text-right">
                    <div class="text-lg font-bold text-primary">$180</div>
                    <button
                      class="mt-2 bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-md text-sm transition-colors"
                      on:click={() => bookAirTicket({route: 'Entebbe → Nairobi', airline: 'Kenya Airways', price: 180, duration: '1h 30m'})}
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>

              <div class="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div class="flex justify-between items-center">
                  <div>
                    <h5 class="font-medium">Entebbe → Dubai</h5>
                    <p class="text-sm text-gray-600">Emirates • 4h 45m</p>
                  </div>
                  <div class="text-right">
                    <div class="text-lg font-bold text-primary">$520</div>
                    <button
                      class="mt-2 bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-md text-sm transition-colors"
                      on:click={() => bookAirTicket({route: 'Entebbe → Dubai', airline: 'Emirates', price: 520, duration: '4h 45m'})}
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>

              <div class="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div class="flex justify-between items-center">
                  <div>
                    <h5 class="font-medium">Entebbe → London</h5>
                    <p class="text-sm text-gray-600">British Airways • 8h 30m</p>
                  </div>
                  <div class="text-right">
                    <div class="text-lg font-bold text-primary">$780</div>
                    <button class="mt-2 bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-md text-sm transition-colors">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Domestic Flights -->
          <div class="bg-white rounded-lg shadow-md p-6">
            <h4 class="text-lg font-semibold mb-4">Domestic & Regional Flights</h4>
            <div class="space-y-4">
              <div class="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div class="flex justify-between items-center">
                  <div>
                    <h5 class="font-medium">Entebbe → Kidepo</h5>
                    <p class="text-sm text-gray-600">Charter Flight • 2h 15m</p>
                  </div>
                  <div class="text-right">
                    <div class="text-lg font-bold text-primary">$420</div>
                    <button class="mt-2 bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-md text-sm transition-colors">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>

              <div class="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div class="flex justify-between items-center">
                  <div>
                    <h5 class="font-medium">Entebbe → Murchison Falls</h5>
                    <p class="text-sm text-gray-600">Charter Flight • 1h 45m</p>
                  </div>
                  <div class="text-right">
                    <div class="text-lg font-bold text-primary">$380</div>
                    <button class="mt-2 bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-md text-sm transition-colors">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>

              <div class="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div class="flex justify-between items-center">
                  <div>
                    <h5 class="font-medium">Entebbe → Bwindi</h5>
                    <p class="text-sm text-gray-600">Charter Flight • 1h 30m</p>
                  </div>
                  <div class="text-right">
                    <div class="text-lg font-bold text-primary">$350</div>
                    <button class="mt-2 bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-md text-sm transition-colors">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Services Info -->
        <div class="bg-gradient-to-r from-sky-50 to-blue-50 rounded-lg p-6">
          <h4 class="text-lg font-semibold mb-4">Our Flight Booking Services</h4>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="text-center">
              <div class="bg-sky-100 p-3 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6V4m-2 14h4m-2 0a7 7 0 01-7-7V9a7 7 0 0114 0v2a7 7 0 01-7 7z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 10h6v2H9v-2z"/>
                  <circle cx="12" cy="10" r="1" fill="currentColor"/>
                </svg>
              </div>
              <h5 class="font-medium mb-2">Best Price Guarantee</h5>
              <p class="text-sm text-gray-600">We ensure competitive pricing on all flight bookings</p>
            </div>
            <div class="text-center">
              <div class="bg-sky-100 p-3 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"/>
                  <circle cx="18" cy="6" r="3" stroke="currentColor" fill="none"/>
                  <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 6h3M18 4.5v3"/>
                </svg>
              </div>
              <h5 class="font-medium mb-2">24/7 Support</h5>
              <p class="text-sm text-gray-600">Round-the-clock assistance for your travel needs</p>
            </div>
            <div class="text-center">
              <div class="bg-sky-100 p-3 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h5 class="font-medium mb-2">Instant Confirmation</h5>
              <p class="text-sm text-gray-600">Immediate booking confirmation and e-tickets</p>
            </div>
          </div>
        </div>
      </div>
    {/if}

    <!-- Travel Resources Section -->
    {#if activeMainTab === 'resources'}
      <div class="space-y-8">
        <!-- Resource Categories -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="bg-blue-50 p-6 rounded-lg text-center hover:bg-blue-100 transition-colors relative group">
            <div class="bg-blue-600 rounded-full p-3 w-16 h-16 mx-auto mb-3 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3-4.5V15M18 15v3.75M21 21l-3-3 3-3M9 18l-3-3 3-3M21 9l-3-3 3-3M9 6h10.5M9 3h13.5" />
              </svg>
            </div>
            <h3 class="font-semibold mb-2 text-blue-800">Travel Guides</h3>
            <p class="text-sm text-blue-600">Regional guides and attractions</p>

            <!-- Share Button -->
            <div class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <div class="relative">
                <button
                  class="bg-white p-2 rounded-full shadow-md hover:shadow-lg transition-all text-blue-600 hover:text-blue-700"
                  on:click={() => shareResource('Travel Guides', 'travel guides and attractions')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-5.368m0 5.368l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div class="bg-green-50 p-6 rounded-lg text-center hover:bg-green-100 transition-colors relative group">
            <div class="bg-green-600 rounded-full p-3 w-16 h-16 mx-auto mb-3 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
            </div>
            <h3 class="font-semibold mb-2 text-green-800">Interactive Maps</h3>
            <p class="text-sm text-green-600">GPS coordinates and navigation</p>

            <!-- Share Button -->
            <div class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <div class="relative">
                <button
                  class="bg-white p-2 rounded-full shadow-md hover:shadow-lg transition-all text-green-600 hover:text-green-700"
                  on:click={() => shareResource('Interactive Maps', 'GPS coordinates and navigation tools')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-5.368m0 5.368l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div class="bg-red-50 p-6 rounded-lg text-center hover:bg-red-100 transition-colors relative group">
            <div class="bg-red-600 rounded-full p-3 w-16 h-16 mx-auto mb-3 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
            </div>
            <h3 class="font-semibold mb-2 text-red-800">Emergency Contacts</h3>
            <p class="text-sm text-red-600">24/7 support and assistance</p>

            <!-- Share Button -->
            <div class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <div class="relative">
                <button
                  class="bg-white p-2 rounded-full shadow-md hover:shadow-lg transition-all text-red-600 hover:text-red-700"
                  on:click={() => shareResource('Emergency Contacts', '24/7 support and assistance')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-5.368m0 5.368l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div class="bg-purple-50 p-6 rounded-lg text-center hover:bg-purple-100 transition-colors relative group">
            <div class="bg-purple-600 rounded-full p-3 w-16 h-16 mx-auto mb-3 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
            </div>
            <h3 class="font-semibold mb-2 text-purple-800">Downloads</h3>
            <p class="text-sm text-purple-600">Offline maps and guides</p>

            <!-- Share Button -->
            <div class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <div class="relative">
                <button
                  class="bg-white p-2 rounded-full shadow-md hover:shadow-lg transition-all text-purple-600 hover:text-purple-700"
                  on:click={() => shareResource('Downloads', 'offline maps and guides')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-5.368m0 5.368l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Travel Guides by Region -->
        <div class="bg-white shadow-md rounded-lg p-8">
          <h3 class="text-2xl font-semibold mb-6">Travel Guides by Region</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            {#each Object.entries(travelGuides) as [region, data]}
              <div class="border rounded-lg p-6">
                <h4 class="text-xl font-semibold mb-3">{data.name}</h4>
                <p class="text-gray-600 mb-4">{data.description}</p>
                <div class="mb-4">
                  <strong class="text-sm">Highlights:</strong>
                  <ul class="text-sm text-gray-600 mt-1">
                    {#each data.highlights as highlight}
                      <li>• {highlight}</li>
                    {/each}
                  </ul>
                </div>
                <button class="btn-primary">
                  View Guides ({data.guides.length})
                </button>
              </div>
            {/each}
          </div>
        </div>

        <!-- Emergency Contacts -->
        <div class="bg-red-50 border border-red-200 rounded-lg p-8">
          <h3 class="text-2xl font-semibold mb-6 text-red-800">Emergency Contacts</h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold text-red-800">Police Emergency</h4>
              <p class="text-2xl font-bold text-red-600">999 / 112</p>
              <p class="text-sm text-gray-600">24/7 toll-free</p>
            </div>
            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold text-red-800">Ambulance</h4>
              <p class="text-2xl font-bold text-red-600">0800-211-088</p>
              <p class="text-sm text-gray-600">Uganda Red Cross</p>
            </div>
            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold text-red-800">Tourist Police</h4>
              <p class="text-2xl font-bold text-red-600">0800-300-117</p>
              <p class="text-sm text-gray-600">24/7 assistance</p>
            </div>
          </div>
        </div>

        <!-- Downloadable Resources -->
        <DownloadableResources {user} />
      </div>
    {/if}

    <!-- Gorilla Permits Section -->
    {#if activeMainTab === 'gorilla-permits'}
      <div class="space-y-8">
        <!-- Gorilla Permits Service Overview -->
        <div class="bg-green-50 border border-green-200 rounded-lg p-8">
          <div class="flex items-center mb-4">
            <div class="bg-green-600 rounded-lg p-2 mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 class="text-3xl font-semibold text-green-800">Gorilla Trekking Permits</h3>
          </div>
          <p class="text-green-700 mb-6 text-lg">Secure your gorilla trekking permits for Bwindi and Mgahinga National Parks. Limited permits available daily.</p>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold text-green-800">Permit Cost</h4>
              <p class="text-2xl font-bold text-green-600">$700</p>
              <p class="text-sm text-green-600">per permit</p>
            </div>
            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold text-green-800">Processing Time</h4>
              <p class="text-2xl font-bold text-green-600">3-5</p>
              <p class="text-sm text-green-600">business days</p>
            </div>
            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold text-green-800">Minimum Age</h4>
              <p class="text-2xl font-bold text-green-600">15</p>
              <p class="text-sm text-green-600">years old</p>
            </div>
            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold text-green-800">Group Size</h4>
              <p class="text-2xl font-bold text-green-600">8</p>
              <p class="text-sm text-green-600">max per group</p>
            </div>
          </div>
        </div>

        <!-- Gorilla Permit Application Form -->
        <div class="bg-white shadow-md rounded-lg p-8">
          <h3 class="text-2xl font-semibold mb-6">Gorilla Permit Application</h3>
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <!-- Application Form -->
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">National Park</label>
                <select bind:value={selectedPark} class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
                  {#each parks as park}
                    <option value={park.id}>{park.name} - ${park.price}</option>
                  {/each}
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Trekking Date</label>
                <input
                  type="date"
                  bind:value={selectedTrekkingDate}
                  min={new Date().toISOString().split('T')[0]}
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                >
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Number of Permits</label>
                <select bind:value={numberOfPermits} class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
                  {#each Array(8) as _, i}
                    <option value={i + 1}>{i + 1} {i === 0 ? 'permit' : 'permits'}</option>
                  {/each}
                </select>
              </div>
              <div class="bg-green-50 p-4 rounded-lg border border-green-200">
                <div class="text-lg font-bold text-green-800">
                  Total Cost: <span class="text-green-600">${calculatePermitTotal()} USD</span>
                </div>
                <p class="text-sm text-green-600 mt-1">Processing fee included</p>
              </div>
              <button class="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors" on:click={submitPermitApplication}>
                Apply for Gorilla Permit
              </button>
            </div>

            <!-- Information Panel -->
            <div class="bg-gray-50 p-6 rounded-lg">
              <h4 class="text-lg font-semibold mb-4">Important Information</h4>
              <ul class="space-y-3 text-sm text-gray-700">
                <li class="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-green-600 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Valid passport required for permit application
                </li>
                <li class="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-green-600 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Moderate fitness level required for trekking
                </li>
                <li class="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-green-600 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Trekking can take 2-8 hours depending on gorilla location
                </li>
                <li class="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-green-600 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  One hour maximum with gorilla family
                </li>
                <li class="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-green-600 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Advance booking highly recommended
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Application Status -->
        {#if permitApplications.length > 0}
          <div class="bg-white shadow-md rounded-lg p-8">
            <h3 class="text-2xl font-semibold mb-6">Your Permit Applications</h3>
            <div class="grid gap-4">
              {#each permitApplications as application}
                <div class="border rounded-lg p-4">
                  <div class="flex justify-between items-start">
                    <div>
                      <p class="font-medium">Application #{application.id}</p>
                      <p class="text-sm text-gray-600">{application.park}</p>
                      <p class="text-sm text-gray-600">Date: {application.date}</p>
                    </div>
                    <span class="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm rounded-full">
                      {application.status}
                    </span>
                  </div>
                </div>
              {/each}
            </div>
          </div>
        {/if}
      </div>
    {/if}

    <!-- Visa Processing Section -->
    {#if activeMainTab === 'visa-processing'}
      <div class="space-y-8">
        <!-- Visa Processing Service Overview -->
        <div class="bg-purple-50 border border-purple-200 rounded-lg p-8">
          <div class="flex items-center mb-4">
            <div class="bg-purple-600 rounded-lg p-2 mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
            </div>
            <h3 class="text-3xl font-semibold text-purple-800">Uganda Visa Processing</h3>
          </div>
          <p class="text-purple-700 mb-6 text-lg">Process your Uganda visa applications with our streamlined service. Multiple visa types available for different travel needs.</p>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold text-purple-800">Tourist Visa</h4>
              <p class="text-2xl font-bold text-purple-600">$50</p>
              <p class="text-sm text-purple-600">90 days validity</p>
            </div>
            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold text-purple-800">East Africa Visa</h4>
              <p class="text-2xl font-bold text-purple-600">$100</p>
              <p class="text-sm text-purple-600">Multiple countries</p>
            </div>
            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold text-purple-800">Processing Time</h4>
              <p class="text-2xl font-bold text-purple-600">5-10</p>
              <p class="text-sm text-purple-600">business days</p>
            </div>
            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold text-purple-800">Support</h4>
              <p class="text-2xl font-bold text-purple-600">24/7</p>
              <p class="text-sm text-purple-600">application help</p>
            </div>
          </div>
        </div>

        <!-- Visa Application Form -->
        <div class="bg-white shadow-md rounded-lg p-8">
          <h3 class="text-2xl font-semibold mb-6">Visa Application</h3>
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <!-- Application Form -->
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Visa Type</label>
                <select bind:value={selectedVisaType} class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500">
                  {#each visaTypes as visa}
                    <option value={visa.id}>{visa.name} - ${visa.price}</option>
                  {/each}
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Arrival Date</label>
                <input
                  type="date"
                  bind:value={visaArrivalDate}
                  min={new Date().toISOString().split('T')[0]}
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Departure Date</label>
                <input
                  type="date"
                  bind:value={visaDepartureDate}
                  min={visaArrivalDate}
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
              </div>
              <div class="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <div class="text-lg font-bold text-purple-800">
                  Total Cost: <span class="text-purple-600">${calculateVisaTotal()} USD</span>
                </div>
                <p class="text-sm text-purple-600 mt-1">Processing fee included</p>
              </div>
              <button class="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors">
                Apply for Visa
              </button>
            </div>

            <!-- Information Panel -->
            <div class="bg-gray-50 p-6 rounded-lg">
              <h4 class="text-lg font-semibold mb-4">Required Documents</h4>
              <ul class="space-y-3 text-sm text-gray-700">
                <li class="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-purple-600 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Valid passport (6+ months remaining)
                </li>
                <li class="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-purple-600 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Yellow fever vaccination certificate
                </li>
                <li class="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-purple-600 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Return flight ticket or itinerary
                </li>
                <li class="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-purple-600 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Proof of accommodation
                </li>
                <li class="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-purple-600 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Passport-size photographs
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Application Status -->
        {#if visaApplications.length > 0}
          <div class="bg-white shadow-md rounded-lg p-8">
            <h3 class="text-2xl font-semibold mb-6">Your Visa Applications</h3>
            <div class="grid gap-4">
              {#each visaApplications as application}
                <div class="border rounded-lg p-4">
                  <div class="flex justify-between items-start">
                    <div>
                      <p class="font-medium">Application #{application.id}</p>
                      <p class="text-sm text-gray-600">{application.visaType}</p>
                      <p class="text-sm text-gray-600">Arrival: {application.arrivalDate}</p>
                    </div>
                    <span class="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm rounded-full">
                      {application.status}
                    </span>
                  </div>
                </div>
              {/each}
            </div>
          </div>
        {/if}
      </div>
    {/if}
  </div>
</div>
