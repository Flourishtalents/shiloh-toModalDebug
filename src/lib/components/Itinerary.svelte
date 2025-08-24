<script>
  import { createEventDispatcher } from 'svelte';
  
  export let isLoggedIn = false;
  
  const dispatch = createEventDispatcher();
  
  // Itinerary form data
  let travelDates = { start: '', end: '' };
  let numberOfTravelers = 2;
  let budget = 'medium';
  let interests = [];
  let accommodationPreference = '';
  let transportPreference = '';
  let specialRequests = '';
  let name = '';
  let email = '';
  let phone = '';
  
  // Available options
  const interestOptions = [
    { id: 'wildlife', label: 'Wildlife & Safaris' },
    { id: 'gorillas', label: 'Gorilla Trekking' },
    { id: 'culture', label: 'Cultural Experiences' },
    { id: 'adventure', label: 'Adventure Activities' },
    { id: 'nature', label: 'Nature & Landscapes' },
    { id: 'relaxation', label: 'Relaxation & Leisure' },
    { id: 'photography', label: 'Photography' },
    { id: 'birding', label: 'Bird Watching' }
  ];
  
  const accommodationOptions = [
    { id: 'luxury', label: 'Luxury (5-star)' },
    { id: 'midrange', label: 'Mid-range (3-4 star)' },
    { id: 'budget', label: 'Budget-friendly' },
    { id: 'mixed', label: 'Mixed (different levels)' }
  ];
  
  const transportOptions = [
    { id: 'private', label: 'Private Vehicle with Driver' },
    { id: 'selfdrive', label: 'Self-drive Rental' },
    { id: 'public', label: 'Public Transportation' },
    { id: 'mixed', label: 'Mixed (different modes)' }
  ];
  
  const budgetOptions = [
    { id: 'budget', label: 'Budget ($100-200/day per person)' },
    { id: 'medium', label: 'Medium ($200-350/day per person)' },
    { id: 'luxury', label: 'Luxury ($350+/day per person)' }
  ];
  
  // Toggle interest selection
  function toggleInterest(interestId) {
    if (interests.includes(interestId)) {
      interests = interests.filter(id => id !== interestId);
    } else {
      interests = [...interests, interestId];
    }
  }
  
  // Handle form submission
  function handleSubmit() {
    if (!isLoggedIn) {
      dispatch('login');
      return;
    }
    
    // Here you would typically send the data to your backend
    // For now, we'll just log it
    console.log({
      travelDates,
      numberOfTravelers,
      budget,
      interests,
      accommodationPreference,
      transportPreference,
      specialRequests,
      name,
      email,
      phone
    });
    
    // Reset form
    travelDates = { start: '', end: '' };
    numberOfTravelers = 2;
    budget = 'medium';
    interests = [];
    accommodationPreference = '';
    transportPreference = '';
    specialRequests = '';
    name = '';
    email = '';
    phone = '';
    
    // Show success message
    alert('Thank you! Your itinerary request has been submitted. Our team will contact you within 24 hours with a personalized travel plan.');
  }
  
  // Sample itineraries
  const sampleItineraries = [
    {
      title: "Classic Uganda Safari",
      duration: "7 days",
      highlights: ["Murchison Falls", "Queen Elizabeth National Park", "Lake Mburo"],
      description: "A perfect introduction to Uganda's wildlife and landscapes, covering the major national parks."
    },
    {
      title: "Gorilla & Wildlife Adventure",
      duration: "10 days",
      highlights: ["Bwindi Impenetrable Forest", "Queen Elizabeth National Park", "Kibale Forest"],
      description: "Combine gorilla trekking with classic safari experiences for the ultimate wildlife adventure."
    },
    {
      title: "Adventure Uganda",
      duration: "8 days",
      highlights: ["White Water Rafting in Jinja", "Sipi Falls Abseiling", "Hiking in Rwenzori Mountains"],
      description: "For thrill-seekers looking to experience Uganda's most exciting adventure activities."
    },
    {
      title: "Cultural Discovery",
      duration: "6 days",
      highlights: ["Kampala Cultural Sites", "Batwa Experience", "Karamoja Cultural Visit"],
      description: "Immerse yourself in Uganda's rich cultural heritage and meet diverse local communities."
    }
  ];
</script>

<div class="pt-16 pb-8">
  <div class="container-custom">
    <!-- Header -->
    <div class="mb-8 text-center">
      <h1 class="text-4xl font-bold mb-4">Plan Your Ugandan Adventure</h1>
      <p class="text-lg text-gray-600 max-w-3xl mx-auto">
        Let our travel experts create a personalized itinerary for your trip to Uganda. Tell us your preferences, and we'll design the perfect experience for you.
      </p>
    </div>
    
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-10">
      <!-- Left Column - Itinerary Form -->
      <div class="lg:col-span-2">
        <div class="bg-white shadow-md rounded-lg p-6 md:p-8">
          <h2 class="text-2xl font-semibold mb-6">Your Travel Preferences</h2>
          
          <form on:submit|preventDefault={handleSubmit} class="space-y-6">
            <!-- Travel Dates -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label for="start-date" class="block text-sm font-medium text-gray-700 mb-1">
                  Start Date
                </label>
                <input 
                  type="date" 
                  id="start-date" 
                  bind:value={travelDates.start}
                  required
                  class="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div>
                <label for="end-date" class="block text-sm font-medium text-gray-700 mb-1">
                  End Date
                </label>
                <input 
                  type="date" 
                  id="end-date" 
                  bind:value={travelDates.end}
                  required
                  class="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>
            
            <!-- Number of Travelers -->
            <div>
              <label for="travelers" class="block text-sm font-medium text-gray-700 mb-1">
                Number of Travelers
              </label>
              <input 
                type="number" 
                id="travelers" 
                bind:value={numberOfTravelers}
                min="1" 
                max="50"
                required
                class="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            
            <!-- Budget -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Budget Range
              </label>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
                {#each budgetOptions as option}
                  <label class="flex items-center p-3 border rounded-md {budget === option.id ? 'border-primary bg-primary-light/10' : 'border-gray-300'}">
                    <input 
                      type="radio" 
                      name="budget" 
                      value={option.id} 
                      bind:group={budget}
                      class="mr-2"
                    />
                    <span>{option.label}</span>
                  </label>
                {/each}
              </div>
            </div>
            
            <!-- Interests -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Travel Interests (select all that apply)
              </label>
              <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                {#each interestOptions as option}
                  <button 
                    type="button"
                    class="p-3 border rounded-md text-center text-sm {interests.includes(option.id) ? 'border-primary bg-primary-light/10 text-primary' : 'border-gray-300 hover:bg-gray-50'}"
                    on:click={() => toggleInterest(option.id)}
                  >
                    {option.label}
                  </button>
                {/each}
              </div>
            </div>
            
            <!-- Accommodation Preference -->
            <div>
              <label for="accommodation" class="block text-sm font-medium text-gray-700 mb-1">
                Accommodation Preference
              </label>
              <select 
                id="accommodation" 
                bind:value={accommodationPreference}
                required
                class="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="" disabled selected>Select your preference</option>
                {#each accommodationOptions as option}
                  <option value={option.id}>{option.label}</option>
                {/each}
              </select>
            </div>
            
            <!-- Transport Preference -->
            <div>
              <label for="transport" class="block text-sm font-medium text-gray-700 mb-1">
                Transportation Preference
              </label>
              <select 
                id="transport" 
                bind:value={transportPreference}
                required
                class="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="" disabled selected>Select your preference</option>
                {#each transportOptions as option}
                  <option value={option.id}>{option.label}</option>
                {/each}
              </select>
            </div>
            
            <!-- Special Requests -->
            <div>
              <label for="special-requests" class="block text-sm font-medium text-gray-700 mb-1">
                Special Requests or Additional Information
              </label>
              <textarea 
                id="special-requests" 
                bind:value={specialRequests}
                rows="4"
                class="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Any special requirements, mobility considerations, adventure custom needs, special occasions, or specific activities you're interested in..."
              ></textarea>
            </div>
            
            <!-- Contact Information -->
            <div class="pt-4 border-t border-gray-200">
              <h3 class="text-lg font-semibold mb-4">Your Contact Information</h3>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label for="name" class="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input 
                    type="text" 
                    id="name" 
                    bind:value={name}
                    required
                    class="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div>
                  <label for="email" class="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input 
                    type="email" 
                    id="email" 
                    bind:value={email}
                    required
                    class="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>
              
              <div class="mt-4">
                <label for="phone" class="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number (optional)
                </label>
                <input 
                  type="tel" 
                  id="phone" 
                  bind:value={phone}
                  class="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>
            
            <!-- Submit Button -->
            <div>
              <button 
                type="submit"
                class="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-4 rounded-md transition-colors shadow-md"
              >
                {isLoggedIn ? 'Submit Itinerary Request' : 'Sign In to Submit Request'}
              </button>
              {#if !isLoggedIn}
                <p class="text-center text-sm text-gray-500 mt-2">
                  You'll need to sign in to save and submit your itinerary request.
                </p>
              {/if}
            </div>
          </form>
        </div>
      </div>
      
      <!-- Right Column - Sample Itineraries -->
      <div>
        <div class="sticky top-24">
          <div class="bg-white shadow-md rounded-lg p-6 mb-6">
            <h3 class="text-xl font-semibold mb-4">How It Works</h3>
            <ol class="space-y-4">
              <li class="flex">
                <span class="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white font-semibold mr-3">1</span>
                <p>Fill out the travel preferences form with your desired dates, interests, and requirements.</p>
              </li>
              <li class="flex">
                <span class="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white font-semibold mr-3">2</span>
                <p>Our travel experts will review your preferences and create a personalized itinerary.</p>
              </li>
              <li class="flex">
                <span class="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white font-semibold mr-3">3</span>
                <p>We'll contact you within 24 hours with your custom travel plan and price quote.</p>
              </li>
              <li class="flex">
                <span class="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white font-semibold mr-3">4</span>
                <p>Make any needed adjustments, confirm your booking, and prepare for your adventure!</p>
              </li>
            </ol>
          </div>
          
          <div class="bg-gray-50 rounded-lg p-6">
            <h3 class="text-xl font-semibold mb-4">Sample Itineraries</h3>
            <div class="space-y-4">
              {#each sampleItineraries as itinerary}
                <div class="p-4 bg-white rounded-md border border-gray-200 shadow-sm">
                  <h4 class="font-semibold text-primary mb-1">{itinerary.title}</h4>
                  <p class="text-sm text-gray-500 mb-2">{itinerary.duration}</p>
                  <p class="text-sm mb-2">Highlights:</p>
                  <ul class="list-disc list-inside text-sm text-gray-600 mb-2">
                    {#each itinerary.highlights as highlight}
                      <li>{highlight}</li>
                    {/each}
                  </ul>
                  <p class="text-sm text-gray-600">{itinerary.description}</p>
                </div>
              {/each}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
