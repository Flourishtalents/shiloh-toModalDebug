<script>
  import { createEventDispatcher } from 'svelte';
  import DownloadableResources from './DownloadableResources.svelte';

  const dispatch = createEventDispatcher();
  let activeTab = 'guides';
  let selectedRegion = 'central';
  let selectedGuide = null;
  let showEmergencyModal = false;
  
  // Travel Guides Data
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
          image: 'images/kampala-guide.jpg',
          duration: '15 min read',
          topics: ['Shopping', 'Restaurants', 'Nightlife', 'Transport', 'Accommodation'],
          content: {
            overview: 'Kampala, the capital and largest city of Uganda, is a bustling metropolis built across seven hills. With over 1.5 million people, it serves as the country\'s political, commercial, and cultural center.',
            attractions: [
              {
                name: 'Kasubi Tombs',
                description: 'UNESCO World Heritage site and burial grounds of Buganda kings',
                tips: 'Dress modestly, guided tours available, photography restrictions apply'
              },
              {
                name: 'Uganda Museum',
                description: 'Learn about Uganda\'s rich cultural heritage and history',
                tips: 'Open 9AM-6PM, small entry fee, great for rainy days'
              },
              {
                name: 'Nakasero Market',
                description: 'Vibrant local market for fresh produce and local crafts',
                tips: 'Best in the morning, bargaining expected, watch belongings'
              }
            ],
            transport: 'Boda bodas (motorcycle taxis) and matatus (shared taxis) are common. Use ride-hailing apps like Uber or SafeBoda for convenience.',
            safety: 'Generally safe during day, avoid walking alone at night, keep valuables secure, use registered transport services.'
          }
        },
        {
          id: 2,
          title: 'Entebbe & Lake Victoria',
          description: 'Gateway to Uganda with beautiful lakeside attractions',
          image: 'images/entebbe-guide.jpg',
          duration: '12 min read',
          topics: ['Botanical Gardens', 'Wildlife', 'Lake Activities', 'Airport'],
          content: {
            overview: 'Entebbe, located on the shores of Lake Victoria, serves as Uganda\'s main airport town and offers beautiful botanical gardens, wildlife sanctuaries, and water activities.',
            attractions: [
              {
                name: 'Entebbe Botanical Gardens',
                description: '40-hectare gardens with diverse plant species and primates',
                tips: 'Entry fee required, great for bird watching, monkeys present'
              },
              {
                name: 'Uganda Wildlife Education Centre',
                description: 'Zoo and conservation center with native Ugandan animals',
                tips: 'Half-day visit, educational programs available, good for families'
              }
            ]
          }
        }
      ]
    },
    western: {
      name: 'Western Uganda',
      description: 'Home to mountain gorillas, chimpanzees, and stunning national parks',
      highlights: ['Bwindi Impenetrable Forest', 'Queen Elizabeth National Park', 'Kibale Forest', 'Rwenzori Mountains'],
      guides: [
        {
          id: 3,
          title: 'Gorilla Trekking Guide',
          description: 'Everything you need to know about gorilla trekking in Bwindi',
          image: 'images/gorilla-guide.jpg',
          duration: '20 min read',
          topics: ['Permits', 'Preparation', 'What to Expect', 'Packing List'],
          content: {
            overview: 'Bwindi Impenetrable Forest is home to nearly half of the world\'s remaining mountain gorillas. This ancient rainforest offers one of the most profound wildlife experiences on Earth.',
            preparation: 'Book permits 3-6 months in advance. Fitness level should be moderate as treks can last 2-8 hours through challenging terrain.',
            packing: 'Waterproof jacket, hiking boots, long pants, gloves, hat, insect repellent, camera, water, snacks'
          }
        },
        {
          id: 4,
          title: 'Queen Elizabeth National Park',
          description: 'Uganda\'s most popular safari destination',
          image: 'images/queen-elizabeth-guide.jpg',
          duration: '18 min read',
          topics: ['Game Drives', 'Boat Safaris', 'Tree-climbing Lions', 'Accommodation'],
          content: {
            overview: 'Queen Elizabeth National Park is Uganda\'s most visited national park, famous for its diverse ecosystems including savannah, forests, wetlands, and lakes.',
            highlights: 'Tree-climbing lions in Ishasha, boat safari on Kazinga Channel, over 600 bird species'
          }
        }
      ]
    },
    northern: {
      name: 'Northern Uganda',
      description: 'Remote wilderness and unique cultural experiences',
      highlights: ['Kidepo Valley National Park', 'Murchison Falls', 'Cultural Communities'],
      guides: [
        {
          id: 5,
          title: 'Kidepo Valley Adventure',
          description: 'Uganda\'s most remote and spectacular national park',
          image: 'images/kidepo-guide.jpg',
          duration: '16 min read',
          topics: ['Wildlife', 'Landscapes', 'Cultural Visits', 'Logistics'],
          content: {
            overview: 'Kidepo Valley National Park offers some of Africa\'s most spectacular wilderness experiences with unique wildlife and stunning landscapes.',
            wildlife: 'Cheetahs, ostriches, and other species not found elsewhere in Uganda'
          }
        }
      ]
    },
    eastern: {
      name: 'Eastern Uganda',
      description: 'Adventure sports, mountains, and cultural heritage',
      highlights: ['Mount Elgon', 'Sipi Falls', 'White Water Rafting', 'Source of the Nile'],
      guides: [
        {
          id: 6,
          title: 'Mount Elgon & Sipi Falls',
          description: 'Hiking, waterfalls, and coffee culture in Eastern Uganda',
          image: 'images/sipi-falls-guide.jpg',
          duration: '14 min read',
          topics: ['Hiking Trails', 'Waterfalls', 'Coffee Tours', 'Accommodation'],
          content: {
            overview: 'Mount Elgon offers excellent hiking opportunities and the famous Sipi Falls, while the region is renowned for its high-quality coffee.'
          }
        }
      ]
    }
  };

  // Interactive Map Data
  const mapMarkers = [
    { id: 1, name: 'Kampala', lat: 0.3476, lng: 32.5825, type: 'city', description: 'Capital city' },
    { id: 2, name: 'Entebbe', lat: 0.0514, lng: 32.4635, type: 'city', description: 'Airport town' },
    { id: 3, name: 'Bwindi Impenetrable Forest', lat: -1.0652, lng: 29.6856, type: 'park', description: 'Gorilla trekking' },
    { id: 4, name: 'Queen Elizabeth NP', lat: -0.1765, lng: 29.9267, type: 'park', description: 'Safari park' },
    { id: 5, name: 'Murchison Falls NP', lat: 2.2490, lng: 31.7890, type: 'park', description: 'Waterfalls & safari' },
    { id: 6, name: 'Kidepo Valley NP', lat: 3.8333, lng: 33.8500, type: 'park', description: 'Remote wilderness' },
    { id: 7, name: 'Sipi Falls', lat: 1.3500, lng: 34.3667, type: 'attraction', description: 'Waterfalls & hiking' }
  ];

  // Emergency Contacts
  const emergencyContacts = {
    general: [
      { name: 'Police Emergency', number: '999', type: 'emergency', available: '24/7' },
      { name: 'Police Emergency (Alt)', number: '112', type: 'emergency', available: '24/7' },
      { name: 'Fire & Rescue', number: '112', type: 'emergency', available: '24/7' },
      { name: 'Tourist Police', number: '0800-300-117', type: 'police', available: '24/7' }
    ],
    medical: [
      { name: 'Uganda Red Cross Ambulance', number: '0800-211-088', location: 'National', type: 'ambulance' },
      { name: 'International Hospital Kampala', number: '+256-312-200-400', location: 'Kampala', type: 'hospital' },
      { name: 'Nakasero Hospital', number: '+256-414-346-150', location: 'Kampala', type: 'hospital' },
      { name: 'Mulago Hospital', number: '+256-414-554-001', location: 'Kampala', type: 'hospital' }
    ],
    embassies: [
      { name: 'US Embassy', number: '+256-414-259-791', location: 'Kampala', country: 'United States' },
      { name: 'UK Embassy', number: '+256-414-312-000', location: 'Kampala', country: 'United Kingdom' },
      { name: 'German Embassy', number: '+256-414-501-111', location: 'Kampala', country: 'Germany' },
      { name: 'French Embassy', number: '+256-414-303-400', location: 'Kampala', country: 'France' }
    ],
    travel: [
      { name: 'Shiloh Experience 24/7', number: '+256-700-SHILOH', type: 'support', available: '24/7' },
      { name: 'Uganda Tourism Board', number: '+256-414-342-196', type: 'tourism', available: 'Business hours' },
      { name: 'Airport Information', number: '+256-414-353-000', location: 'Entebbe', type: 'airport' }
    ]
  };

  // Essential Information
  const essentialInfo = {
    currency: {
      name: 'Ugandan Shilling (UGX)',
      exchange: '1 USD ≈ 3,700 UGX (rates vary)',
      cards: 'Major credit cards accepted in cities, cash needed in rural areas',
      atms: 'Available in major towns and cities'
    },
    communication: {
      mobile: 'Good coverage in most areas, buy local SIM card',
      internet: 'WiFi available in hotels and restaurants in major towns',
      calling: 'International roaming available, local SIM cards recommended'
    },
    transport: {
      domestic: 'Domestic flights, buses, taxis, boda bodas (motorcycle taxis)',
      international: 'Entebbe International Airport (EBB)',
      roads: 'Some paved roads, 4WD recommended for parks and rural areas'
    },
    climate: {
      temperature: '20-30°C year-round, cooler in mountains',
      seasons: 'Two dry seasons (Dec-Feb, Jun-Aug), two wet seasons (Mar-May, Sep-Nov)',
      altitude: 'Varies from 620m (Lake Victoria) to 5,109m (Rwenzori peaks)'
    }
  };

  function openGuide(guide) {
    selectedGuide = guide;
  }

  function closeGuide() {
    selectedGuide = null;
  }

  function callEmergency(number) {
    if (number.startsWith('+')) {
      window.open(`tel:${number}`, '_self');
    } else {
      window.open(`tel:${number}`, '_self');
    }
  }

  function downloadMap() {
    // In real app, would download offline map
    alert('Offline map download would start here. This feature requires integration with mapping services.');
  }

  function shareLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        const message = `My current location: https://maps.google.com/?q=${lat},${lng}`;
        
        if (navigator.share) {
          navigator.share({
            title: 'My Location',
            text: message
          });
        } else {
          navigator.clipboard.writeText(message).then(() => {
            alert('Location copied to clipboard!');
          });
        }
      }, () => {
        alert('Unable to get your location. Please enable location services.');
      });
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }
</script>

<div class="pt-16 pb-8">
  <div class="container-custom">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-4xl font-bold mb-4">Travel Resources</h1>
      <p class="text-lg text-gray-600 max-w-3xl">
        Comprehensive guides, maps, and essential information to help you navigate Uganda safely and make the most of your journey.
      </p>
    </div>

    <!-- Quick Emergency Access -->
    <div class="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <div class="p-2 bg-red-100 rounded-full mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <div>
            <h3 class="font-semibold text-red-800">Emergency Assistance</h3>
            <p class="text-sm text-red-600">Quick access to emergency contacts and assistance</p>
          </div>
        </div>
        <div class="flex space-x-2">
          <button 
            class="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md transition-colors font-medium"
            on:click={() => callEmergency('999')}
          >
            📞 Call Police (999)
          </button>
          <button 
            class="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md transition-colors font-medium"
            on:click={() => showEmergencyModal = true}
          >
            🆘 All Emergency Contacts
          </button>
        </div>
      </div>
    </div>

    <!-- Navigation Tabs -->
    <div class="bg-white shadow-md rounded-lg mb-8">
      <div class="flex border-b border-gray-200 overflow-x-auto">
        <button 
          class="px-6 py-4 font-medium transition-colors whitespace-nowrap {activeTab === 'guides' ? 'border-b-2 border-primary text-primary' : 'text-gray-600 hover:text-primary'}"
          on:click={() => activeTab = 'guides'}
        >
          📚 Travel Guides
        </button>
        <button 
          class="px-6 py-4 font-medium transition-colors whitespace-nowrap {activeTab === 'maps' ? 'border-b-2 border-primary text-primary' : 'text-gray-600 hover:text-primary'}"
          on:click={() => activeTab = 'maps'}
        >
          🗺️ Maps & Navigation
        </button>
        <button 
          class="px-6 py-4 font-medium transition-colors whitespace-nowrap {activeTab === 'emergency' ? 'border-b-2 border-primary text-primary' : 'text-gray-600 hover:text-primary'}"
          on:click={() => activeTab = 'emergency'}
        >
          🚨 Emergency Contacts
        </button>
        <button
          class="px-6 py-4 font-medium transition-colors whitespace-nowrap {activeTab === 'essential' ? 'border-b-2 border-primary text-primary' : 'text-gray-600 hover:text-primary'}"
          on:click={() => activeTab = 'essential'}
        >
          ℹ️ Essential Info
        </button>
        <button
          class="px-6 py-4 font-medium transition-colors whitespace-nowrap {activeTab === 'downloads' ? 'border-b-2 border-primary text-primary' : 'text-gray-600 hover:text-primary'}"
          on:click={() => activeTab = 'downloads'}
        >
          📥 Downloads
        </button>
      </div>
    </div>

    <!-- Tab Content -->
    {#if activeTab === 'guides'}
      <!-- Travel Guides Tab -->
      <div class="space-y-8">
        <!-- Region Selector -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <h3 class="text-xl font-semibold mb-4">Select Region</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {#each Object.entries(travelGuides) as [regionId, region]}
              <button 
                class="p-4 border-2 rounded-lg transition-all {selectedRegion === regionId ? 'border-primary bg-primary-light/10' : 'border-gray-200 hover:border-primary/50'}"
                on:click={() => selectedRegion = regionId}
              >
                <h4 class="font-semibold text-lg mb-2">{region.name}</h4>
                <p class="text-sm text-gray-600 mb-3">{region.description}</p>
                <div class="flex flex-wrap gap-1">
                  {#each region.highlights.slice(0, 2) as highlight}
                    <span class="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                      {highlight}
                    </span>
                  {/each}
                  {#if region.highlights.length > 2}
                    <span class="text-xs text-gray-500">+{region.highlights.length - 2} more</span>
                  {/if}
                </div>
              </button>
            {/each}
          </div>
        </div>

        <!-- Available Guides -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <h3 class="text-xl font-semibold mb-4">
            {travelGuides[selectedRegion].name} Travel Guides
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {#each travelGuides[selectedRegion].guides as guide}
              <div class="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                <img src={guide.image} alt={guide.title} class="w-full h-48 object-cover" />
                <div class="p-4">
                  <h4 class="font-semibold text-lg mb-2">{guide.title}</h4>
                  <p class="text-gray-600 text-sm mb-3">{guide.description}</p>
                  <div class="flex items-center justify-between mb-3">
                    <span class="text-xs text-gray-500">⏱️ {guide.duration}</span>
                    <span class="text-xs text-gray-500">{guide.topics.length} topics</span>
                  </div>
                  <div class="flex flex-wrap gap-1 mb-4">
                    {#each guide.topics.slice(0, 3) as topic}
                      <span class="text-xs bg-primary-light/10 text-primary px-2 py-1 rounded-full">
                        {topic}
                      </span>
                    {/each}
                  </div>
                  <button 
                    class="w-full bg-primary hover:bg-primary-dark text-white py-2 px-4 rounded-md transition-colors"
                    on:click={() => openGuide(guide)}
                  >
                    Read Guide
                  </button>
                </div>
              </div>
            {/each}
          </div>
        </div>
      </div>

    {:else if activeTab === 'maps'}
      <!-- Maps & Navigation Tab -->
      <div class="space-y-8">
        <!-- Interactive Map Placeholder -->
        <div class="bg-white rounded-lg shadow-md overflow-hidden">
          <div class="p-6 border-b border-gray-200">
            <div class="flex justify-between items-center">
              <h3 class="text-xl font-semibold">Uganda Interactive Map</h3>
              <div class="flex space-x-2">
                <button 
                  class="bg-primary hover:bg-primary-dark text-white py-2 px-4 rounded-md transition-colors text-sm"
                  on:click={downloadMap}
                >
                  📱 Download Offline
                </button>
                <button 
                  class="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md transition-colors text-sm"
                  on:click={shareLocation}
                >
                  📍 Share My Location
                </button>
              </div>
            </div>
          </div>
          
          <!-- Map Container -->
          <div class="h-96 bg-gradient-to-br from-green-100 to-blue-100 relative flex items-center justify-center">
            <div class="text-center">
              <div class="text-6xl mb-4">🗺️</div>
              <h4 class="text-lg font-semibold text-gray-700 mb-2">Interactive Map</h4>
              <p class="text-gray-600 mb-4">Click on markers below to see locations</p>
              <p class="text-sm text-gray-500">* In production, this would show a real interactive map with Google Maps or OpenStreetMap</p>
            </div>
          </div>
          
          <!-- Map Markers/Locations -->
          <div class="p-6">
            <h4 class="font-semibold mb-4">Key Locations</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {#each mapMarkers as marker}
                <div class="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <div class="p-2 bg-primary-light/10 rounded-full mr-3">
                    {#if marker.type === 'city'}
                      🏙️
                    {:else if marker.type === 'park'}
                      ��
                    {:else}
                      📍
                    {/if}
                  </div>
                  <div>
                    <p class="font-medium">{marker.name}</p>
                    <p class="text-sm text-gray-600">{marker.description}</p>
                    <p class="text-xs text-gray-500">
                      {marker.lat.toFixed(4)}, {marker.lng.toFixed(4)}
                    </p>
                  </div>
                </div>
              {/each}
            </div>
          </div>
        </div>

        <!-- Navigation Tools -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- GPS & Navigation -->
          <div class="bg-white rounded-lg shadow-md p-6">
            <h3 class="text-xl font-semibold mb-4">🧭 Navigation Tools</h3>
            <div class="space-y-4">
              <div class="p-4 border border-gray-200 rounded-lg">
                <h4 class="font-medium mb-2">GPS Coordinates</h4>
                <p class="text-sm text-gray-600 mb-3">Essential coordinates for major destinations</p>
                <ul class="text-sm space-y-1">
                  <li><strong>Kampala:</strong> 0.3476°N, 32.5825°E</li>
                  <li><strong>Bwindi Forest:</strong> 1.0652°S, 29.6856°E</li>
                  <li><strong>Queen Elizabeth NP:</strong> 0.1765°S, 29.9267°E</li>
                </ul>
              </div>
              
              <div class="p-4 border border-gray-200 rounded-lg">
                <h4 class="font-medium mb-2">Recommended Apps</h4>
                <ul class="text-sm space-y-2">
                  <li>📱 <strong>Maps.me:</strong> Offline maps for Uganda</li>
                  <li>📱 <strong>Google Maps:</strong> Real-time navigation</li>
                  <li>📱 <strong>What3Words:</strong> Precise location sharing</li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Distances & Travel Times -->
          <div class="bg-white rounded-lg shadow-md p-6">
            <h3 class="text-xl font-semibold mb-4">Distances & Travel Times</h3>
            <div class="space-y-3">
              <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span class="text-sm">Kampala → Entebbe</span>
                <span class="text-sm font-medium">40km • 1hr</span>
              </div>
              <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span class="text-sm">Kampala → Bwindi</span>
                <span class="text-sm font-medium">530km • 8-10hrs</span>
              </div>
              <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span class="text-sm">Kampala → Queen Elizabeth</span>
                <span class="text-sm font-medium">420km • 6-7hrs</span>
              </div>
              <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span class="text-sm">Kampala → Murchison Falls</span>
                <span class="text-sm font-medium">305km • 5-6hrs</span>
              </div>
              <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span class="text-sm">Kampala → Kidepo Valley</span>
                <span class="text-sm font-medium">571km • 10-12hrs</span>
              </div>
            </div>
            <p class="text-xs text-gray-500 mt-3">
              * Times vary based on road conditions and weather
            </p>
          </div>
        </div>
      </div>

    {:else if activeTab === 'emergency'}
      <!-- Emergency Contacts Tab -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- General Emergency -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <h3 class="text-xl font-semibold mb-4 text-red-600">🚨 Emergency Services</h3>
          <div class="space-y-3">
            {#each emergencyContacts.general as contact}
              <div class="flex justify-between items-center p-3 border border-red-200 rounded-lg bg-red-50">
                <div>
                  <p class="font-medium text-red-800">{contact.name}</p>
                  <p class="text-sm text-red-600">{contact.available}</p>
                </div>
                <button 
                  class="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md transition-colors font-bold"
                  on:click={() => callEmergency(contact.number)}
                >
                  {contact.number}
                </button>
              </div>
            {/each}
          </div>
        </div>

        <!-- Medical -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <h3 class="text-xl font-semibold mb-4 text-blue-600">🏥 Medical Services</h3>
          <div class="space-y-3">
            {#each emergencyContacts.medical as contact}
              <div class="flex justify-between items-center p-3 border border-blue-200 rounded-lg bg-blue-50">
                <div>
                  <p class="font-medium text-blue-800">{contact.name}</p>
                  <p class="text-sm text-blue-600">{contact.location}</p>
                </div>
                <button 
                  class="bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-md transition-colors text-sm"
                  on:click={() => callEmergency(contact.number)}
                >
                  Call
                </button>
              </div>
            {/each}
          </div>
        </div>

        <!-- Embassies -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <h3 class="text-xl font-semibold mb-4 text-green-600">🏛️ Embassy Services</h3>
          <div class="space-y-3">
            {#each emergencyContacts.embassies as contact}
              <div class="flex justify-between items-center p-3 border border-green-200 rounded-lg bg-green-50">
                <div>
                  <p class="font-medium text-green-800">{contact.name}</p>
                  <p class="text-sm text-green-600">{contact.country}</p>
                </div>
                <button 
                  class="bg-green-600 hover:bg-green-700 text-white py-2 px-3 rounded-md transition-colors text-sm"
                  on:click={() => callEmergency(contact.number)}
                >
                  Call
                </button>
              </div>
            {/each}
          </div>
        </div>

        <!-- Travel Support -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <h3 class="text-xl font-semibold mb-4 text-purple-600">✈️ Travel Support</h3>
          <div class="space-y-3">
            {#each emergencyContacts.travel as contact}
              <div class="flex justify-between items-center p-3 border border-purple-200 rounded-lg bg-purple-50">
                <div>
                  <p class="font-medium text-purple-800">{contact.name}</p>
                  <p class="text-sm text-purple-600">{contact.available || contact.location}</p>
                </div>
                <button 
                  class="bg-purple-600 hover:bg-purple-700 text-white py-2 px-3 rounded-md transition-colors text-sm"
                  on:click={() => callEmergency(contact.number)}
                >
                  Call
                </button>
              </div>
            {/each}
          </div>
        </div>
      </div>

    {:else if activeTab === 'essential'}
      <!-- Essential Information Tab -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Currency -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <h3 class="text-xl font-semibold mb-4">💰 Currency & Money</h3>
          <div class="space-y-4">
            <div>
              <h4 class="font-medium text-gray-800 mb-2">Currency</h4>
              <p class="text-gray-600">{essentialInfo.currency.name}</p>
            </div>
            <div>
              <h4 class="font-medium text-gray-800 mb-2">Exchange Rate</h4>
              <p class="text-gray-600">{essentialInfo.currency.exchange}</p>
            </div>
            <div>
              <h4 class="font-medium text-gray-800 mb-2">Payment Methods</h4>
              <p class="text-gray-600">{essentialInfo.currency.cards}</p>
            </div>
            <div>
              <h4 class="font-medium text-gray-800 mb-2">ATMs</h4>
              <p class="text-gray-600">{essentialInfo.currency.atms}</p>
            </div>
          </div>
        </div>

        <!-- Communication -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <h3 class="text-xl font-semibold mb-4">📱 Communication</h3>
          <div class="space-y-4">
            <div>
              <h4 class="font-medium text-gray-800 mb-2">Mobile Networks</h4>
              <p class="text-gray-600">{essentialInfo.communication.mobile}</p>
            </div>
            <div>
              <h4 class="font-medium text-gray-800 mb-2">Internet Access</h4>
              <p class="text-gray-600">{essentialInfo.communication.internet}</p>
            </div>
            <div>
              <h4 class="font-medium text-gray-800 mb-2">International Calling</h4>
              <p class="text-gray-600">{essentialInfo.communication.calling}</p>
            </div>
          </div>
        </div>

        <!-- Transportation -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <h3 class="text-xl font-semibold mb-4">Transportation</h3>
          <div class="space-y-4">
            <div>
              <h4 class="font-medium text-gray-800 mb-2">Getting Around</h4>
              <p class="text-gray-600">{essentialInfo.transport.domestic}</p>
            </div>
            <div>
              <h4 class="font-medium text-gray-800 mb-2">International Airport</h4>
              <p class="text-gray-600">{essentialInfo.transport.international}</p>
            </div>
            <div>
              <h4 class="font-medium text-gray-800 mb-2">Road Conditions</h4>
              <p class="text-gray-600">{essentialInfo.transport.roads}</p>
            </div>
          </div>
        </div>

        <!-- Climate -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <h3 class="text-xl font-semibold mb-4">🌤️ Climate & Weather</h3>
          <div class="space-y-4">
            <div>
              <h4 class="font-medium text-gray-800 mb-2">Temperature</h4>
              <p class="text-gray-600">{essentialInfo.climate.temperature}</p>
            </div>
            <div>
              <h4 class="font-medium text-gray-800 mb-2">Seasons</h4>
              <p class="text-gray-600">{essentialInfo.climate.seasons}</p>
            </div>
            <div>
              <h4 class="font-medium text-gray-800 mb-2">Altitude</h4>
              <p class="text-gray-600">{essentialInfo.climate.altitude}</p>
            </div>
          </div>
        </div>
      </div>

    {:else if activeTab === 'downloads'}
      <!-- Downloads Tab -->
      <DownloadableResources />
    {/if}
  </div>
</div>

<!-- Guide Detail Modal -->
{#if selectedGuide}
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
      <div class="p-6">
        <!-- Header -->
        <div class="flex justify-between items-start mb-6">
          <div>
            <h2 class="text-2xl font-bold mb-2">{selectedGuide.title}</h2>
            <p class="text-gray-600">{selectedGuide.description}</p>
          </div>
          <button 
            class="text-gray-500 hover:text-gray-700 p-2"
            on:click={closeGuide}
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Content -->
        <div class="prose max-w-none">
          <img src={selectedGuide.image} alt={selectedGuide.title} class="w-full h-64 object-cover rounded-lg mb-6" />
          
          <h3>Overview</h3>
          <p>{selectedGuide.content.overview}</p>
          
          {#if selectedGuide.content.attractions}
            <h3>Key Attractions</h3>
            {#each selectedGuide.content.attractions as attraction}
              <div class="bg-gray-50 p-4 rounded-lg mb-4">
                <h4 class="font-semibold">{attraction.name}</h4>
                <p class="text-gray-700 mb-2">{attraction.description}</p>
                <p class="text-sm text-blue-600"><strong>Tips:</strong> {attraction.tips}</p>
              </div>
            {/each}
          {/if}
          
          {#if selectedGuide.content.transport}
            <h3>Transportation</h3>
            <p>{selectedGuide.content.transport}</p>
          {/if}
          
          {#if selectedGuide.content.safety}
            <h3>Safety Tips</h3>
            <p>{selectedGuide.content.safety}</p>
          {/if}
          
          {#if selectedGuide.content.packing}
            <h3>What to Pack</h3>
            <p>{selectedGuide.content.packing}</p>
          {/if}
        </div>
      </div>
    </div>
  </div>
{/if}

<!-- Emergency Quick Access Modal -->
{#if showEmergencyModal}
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-lg w-full max-w-2xl">
      <div class="p-6">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold text-red-600">🚨 Emergency Contacts</h2>
          <button 
            class="text-gray-500 hover:text-gray-700 p-2"
            on:click={() => showEmergencyModal = false}
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div class="space-y-4">
          {#each emergencyContacts.general as contact}
            <button 
              class="w-full flex justify-between items-center p-4 border-2 border-red-200 rounded-lg hover:bg-red-50 transition-colors"
              on:click={() => callEmergency(contact.number)}
            >
              <div class="text-left">
                <p class="font-medium text-red-800">{contact.name}</p>
                <p class="text-sm text-red-600">{contact.available}</p>
              </div>
              <div class="bg-red-600 text-white py-2 px-4 rounded-md font-bold">
                {contact.number}
              </div>
            </button>
          {/each}
          
          <div class="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p class="text-sm text-yellow-800">
              <strong>Note:</strong> These are emergency numbers for Uganda. If you're calling from outside Uganda, 
              add the country code +256 before the number.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}
