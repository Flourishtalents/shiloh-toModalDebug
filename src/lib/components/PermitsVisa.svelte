<script>
  import { createEventDispatcher } from 'svelte'
  
  const dispatch = createEventDispatcher()
  
  let activeTab = 'gorilla-permits'
  let user = JSON.parse(localStorage.getItem('user') || '{}')
  
  // Gorilla permit data
  let selectedTrekkingDate = ''
  let numberOfPermits = 1
  let selectedPark = 'bwindi'
  let selectedNationality = ''
  let permitApplications = JSON.parse(localStorage.getItem('permitApplications') || '[]')
  
  // Visa data
  let visaApplications = JSON.parse(localStorage.getItem('visaApplications') || '[]')
  let selectedVisaType = 'tourist'
  let arrivalDate = ''
  let departureDate = ''
  let purposeOfVisit = ''
  let accommodationDetails = ''
  
  // Form data for permit application
  let permitFormData = {
    fullName: user.name || '',
    passportNumber: '',
    nationality: '',
    dateOfBirth: '',
    email: user.email || '',
    phone: '',
    emergencyContact: '',
    emergencyPhone: '',
    dietaryRequirements: '',
    medicalConditions: '',
    fitnessLevel: 'moderate'
  }
  
  // Form data for visa application
  let visaFormData = {
    fullName: user.name || '',
    passportNumber: '',
    nationality: '',
    dateOfBirth: '',
    placeOfBirth: '',
    passportIssueDate: '',
    passportExpiryDate: '',
    email: user.email || '',
    phone: '',
    occupation: '',
    employerName: '',
    employerAddress: '',
    purposeOfVisit: '',
    accommodationName: '',
    accommodationAddress: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
    previousVisaHistory: 'no'
  }
  
  const parks = [
    { id: 'bwindi', name: 'Bwindi Impenetrable National Park', price: 800 },
    { id: 'mgahinga', name: 'Mgahinga Gorilla National Park', price: 800 }
  ]
  
  const visaTypes = [
    { id: 'tourist', name: 'Tourist Visa (90 days)', price: 50 },
    { id: 'business', name: 'Business Visa (90 days)', price: 50 },
    { id: 'transit', name: 'Transit Visa (7 days)', price: 30 },
    { id: 'east-africa', name: 'East Africa Tourist Visa (90 days)', price: 100 }
  ]
  
  const fitnessLevels = [
    { id: 'high', name: 'High - I exercise regularly and am in excellent shape' },
    { id: 'moderate', name: 'Moderate - I exercise occasionally and am reasonably fit' },
    { id: 'low', name: 'Low - I rarely exercise but can walk for several hours' }
  ]
  
  const countries = [
    'Afghanistan', 'Albania', 'Algeria', 'Argentina', 'Australia', 'Austria', 'Bangladesh', 'Belgium', 'Brazil', 'Canada', 'China', 'Denmark', 'Egypt', 'France', 'Germany', 'Ghana', 'India', 'Indonesia', 'Italy', 'Japan', 'Kenya', 'Mexico', 'Netherlands', 'Nigeria', 'Norway', 'Pakistan', 'Philippines', 'Poland', 'Russia', 'Rwanda', 'Saudi Arabia', 'South Africa', 'South Korea', 'Spain', 'Sweden', 'Switzerland', 'Tanzania', 'Thailand', 'Turkey', 'Uganda', 'United Kingdom', 'United States', 'Vietnam'
  ]
  
  function switchTab(tab) {
    activeTab = tab
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
    
    // Reset form
    permitFormData = {
      fullName: user.name || '',
      passportNumber: '',
      nationality: '',
      dateOfBirth: '',
      email: user.email || '',
      phone: '',
      emergencyContact: '',
      emergencyPhone: '',
      dietaryRequirements: '',
      medicalConditions: '',
      fitnessLevel: 'moderate'
    }
    selectedTrekkingDate = ''
    numberOfPermits = 1
  }
  
  function submitVisaApplication() {
    if (!visaFormData.fullName || !visaFormData.passportNumber || !arrivalDate) {
      alert('Please fill in all required fields')
      return
    }
    
    const application = {
      id: Date.now(),
      type: 'visa',
      visaType: visaTypes.find(v => v.id === selectedVisaType).name,
      arrivalDate,
      departureDate,
      total: calculateVisaTotal(),
      applicant: { ...visaFormData },
      status: 'processing',
      submittedAt: new Date().toISOString(),
      processingTime: '5-10 business days'
    }
    
    visaApplications = [...visaApplications, application]
    localStorage.setItem('visaApplications', JSON.stringify(visaApplications))
    
    alert('Visa application submitted successfully! You will receive updates via email.')
    
    // Reset form
    visaFormData = {
      fullName: user.name || '',
      passportNumber: '',
      nationality: '',
      dateOfBirth: '',
      placeOfBirth: '',
      passportIssueDate: '',
      passportExpiryDate: '',
      email: user.email || '',
      phone: '',
      occupation: '',
      employerName: '',
      employerAddress: '',
      purposeOfVisit: '',
      accommodationName: '',
      accommodationAddress: '',
      emergencyContactName: '',
      emergencyContactPhone: '',
      previousVisaHistory: 'no'
    }
    arrivalDate = ''
    departureDate = ''
  }
  
  function getStatusColor(status) {
    switch(status) {
      case 'processing': return 'text-yellow-600 bg-yellow-100'
      case 'approved': return 'text-green-600 bg-green-100'
      case 'rejected': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }
</script>

<div class="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
  <div class="container mx-auto px-4 pt-16 pb-8">
    <div class="text-center mb-12">
      <h1 class="text-4xl font-bold text-gray-800 mb-4">Permits & Visa Processing</h1>
      <p class="text-xl text-gray-600 max-w-3xl mx-auto">
        Secure your gorilla trekking permits and Uganda visa with our streamlined processing service. 
        We handle all the paperwork so you can focus on planning your adventure.
      </p>
    </div>

    <!-- Tab Navigation -->
    <div class="flex justify-center mb-8">
      <div class="bg-white rounded-lg shadow-md p-1 flex">
        <button 
          class="px-6 py-3 rounded-md font-medium transition-all duration-200 {activeTab === 'gorilla-permits' ? 'bg-green-600 text-white' : 'text-gray-600 hover:text-green-600'}"
          on:click={() => switchTab('gorilla-permits')}
        >
          🦍 Gorilla Permits
        </button>
        <button 
          class="px-6 py-3 rounded-md font-medium transition-all duration-200 {activeTab === 'visa-processing' ? 'bg-green-600 text-white' : 'text-gray-600 hover:text-green-600'}"
          on:click={() => switchTab('visa-processing')}
        >
          📋 Visa Processing
        </button>
        <button 
          class="px-6 py-3 rounded-md font-medium transition-all duration-200 {activeTab === 'applications' ? 'bg-green-600 text-white' : 'text-gray-600 hover:text-green-600'}"
          on:click={() => switchTab('applications')}
        >
          📄 My Applications
        </button>
      </div>
    </div>

    <!-- Gorilla Permits Tab -->
    {#if activeTab === 'gorilla-permits'}
      <div class="max-w-4xl mx-auto">
        <div class="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 class="text-3xl font-bold text-gray-800 mb-6">🦍 Gorilla Trekking Permits</h2>
          
          <!-- Important Information -->
          <div class="bg-orange-50 border-l-4 border-orange-400 p-6 mb-8">
            <h3 class="text-lg font-semibold text-orange-800 mb-2">📋 Important Information</h3>
            <ul class="text-orange-700 space-y-2">
              <li>• Permits are limited and must be booked in advance</li>
              <li>• Minimum age requirement: 15 years old</li>
              <li>• Maximum group size: 8 people per gorilla family</li>
              <li>• Trekking can take 2-8 hours depending on gorilla location</li>
              <li>• Moderate to high fitness level recommended</li>
              <li>• Permits are non-refundable but can be rescheduled (subject to availability)</li>
            </ul>
          </div>

          <!-- Permit Selection -->
          <div class="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 class="text-xl font-semibold mb-4">Select Park & Date</h3>
              
              <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700 mb-2">National Park</label>
                <select bind:value={selectedPark} class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
                  {#each parks as park}
                    <option value={park.id}>{park.name} - ${park.price} USD</option>
                  {/each}
                </select>
              </div>

              <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700 mb-2">Trekking Date</label>
                <input 
                  type="date" 
                  bind:value={selectedTrekkingDate}
                  min={new Date().toISOString().split('T')[0]}
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                >
              </div>

              <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700 mb-2">Number of Permits</label>
                <select bind:value={numberOfPermits} class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
                  {#each Array(8) as _, i}
                    <option value={i + 1}>{i + 1} {i === 0 ? 'permit' : 'permits'}</option>
                  {/each}
                </select>
              </div>
            </div>

            <div>
              <h3 class="text-xl font-semibold mb-4">Pricing Summary</h3>
              <div class="bg-gray-50 p-6 rounded-lg">
                <div class="flex justify-between items-center mb-2">
                  <span>Park:</span>
                  <span class="font-medium">{parks.find(p => p.id === selectedPark)?.name || 'Select park'}</span>
                </div>
                <div class="flex justify-between items-center mb-2">
                  <span>Permits:</span>
                  <span class="font-medium">{numberOfPermits} × ${parks.find(p => p.id === selectedPark)?.price || 0}</span>
                </div>
                <hr class="my-3">
                <div class="flex justify-between items-center text-lg font-bold">
                  <span>Total:</span>
                  <span class="text-green-600">${calculatePermitTotal()} USD</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Application Form -->
          <div class="border-t pt-8">
            <h3 class="text-xl font-semibold mb-6">Applicant Information</h3>
            
            <div class="grid md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                <input 
                  type="text" 
                  bind:value={permitFormData.fullName}
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                >
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Passport Number *</label>
                <input 
                  type="text" 
                  bind:value={permitFormData.passportNumber}
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                >
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Nationality *</label>
                <select bind:value={permitFormData.nationality} class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
                  <option value="">Select nationality</option>
                  {#each countries as country}
                    <option value={country}>{country}</option>
                  {/each}
                </select>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Date of Birth *</label>
                <input 
                  type="date" 
                  bind:value={permitFormData.dateOfBirth}
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                >
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                <input 
                  type="email" 
                  bind:value={permitFormData.email}
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                >
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                <input 
                  type="tel" 
                  bind:value={permitFormData.phone}
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                >
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Emergency Contact Name</label>
                <input 
                  type="text" 
                  bind:value={permitFormData.emergencyContact}
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                >
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Emergency Contact Phone</label>
                <input 
                  type="tel" 
                  bind:value={permitFormData.emergencyPhone}
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                >
              </div>
            </div>

            <div class="mt-6">
              <label class="block text-sm font-medium text-gray-700 mb-2">Fitness Level</label>
              <select bind:value={permitFormData.fitnessLevel} class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
                {#each fitnessLevels as level}
                  <option value={level.id}>{level.name}</option>
                {/each}
              </select>
            </div>

            <div class="mt-6">
              <label class="block text-sm font-medium text-gray-700 mb-2">Special Requirements</label>
              <textarea
                bind:value={permitFormData.dietaryRequirements}
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                rows="3"
                placeholder="Any special needs, mobility considerations, or adventure custom requirements..."
              ></textarea>
            </div>

            <div class="mt-6">
              <label class="block text-sm font-medium text-gray-700 mb-2">Medical Conditions</label>
              <textarea 
                bind:value={permitFormData.medicalConditions}
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                rows="3"
                placeholder="Any medical conditions we should know about..."
              ></textarea>
            </div>

            <button 
              on:click={submitPermitApplication}
              class="w-full mt-8 bg-green-600 text-white py-3 px-6 rounded-md hover:bg-green-700 transition-colors duration-200 font-semibold"
            >
              Submit Permit Application - ${calculatePermitTotal()} USD
            </button>
          </div>
        </div>
      </div>
    {/if}

    <!-- Visa Processing Tab -->
    {#if activeTab === 'visa-processing'}
      <div class="max-w-4xl mx-auto">
        <div class="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 class="text-3xl font-bold text-gray-800 mb-6">📋 Uganda Visa Processing</h2>
          
          <!-- Visa Information -->
          <div class="bg-blue-50 border-l-4 border-blue-400 p-6 mb-8">
            <h3 class="text-lg font-semibold text-blue-800 mb-2">📋 Visa Requirements</h3>
            <ul class="text-blue-700 space-y-2">
              <li>• Passport valid for at least 6 months from entry date</li>
              <li>• Yellow fever vaccination certificate required</li>
              <li>• Proof of accommodation and return flight</li>
              <li>• Processing time: 5-10 business days</li>
              <li>• East Africa Tourist Visa allows entry to Uganda, Kenya, and Rwanda</li>
            </ul>
          </div>

          <!-- Visa Type Selection -->
          <div class="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 class="text-xl font-semibold mb-4">Select Visa Type</h3>
              
              <div class="space-y-4">
                {#each visaTypes as visa}
                  <label class="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50 {selectedVisaType === visa.id ? 'border-green-500 bg-green-50' : 'border-gray-300'}">
                    <input 
                      type="radio" 
                      bind:group={selectedVisaType} 
                      value={visa.id}
                      class="mr-3"
                    >
                    <div class="flex-1">
                      <div class="font-medium">{visa.name}</div>
                      <div class="text-green-600 font-semibold">${visa.price} USD</div>
                    </div>
                  </label>
                {/each}
              </div>
            </div>

            <div>
              <h3 class="text-xl font-semibold mb-4">Travel Dates</h3>
              
              <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700 mb-2">Arrival Date *</label>
                <input 
                  type="date" 
                  bind:value={arrivalDate}
                  min={new Date().toISOString().split('T')[0]}
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                >
              </div>

              <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700 mb-2">Departure Date</label>
                <input 
                  type="date" 
                  bind:value={departureDate}
                  min={arrivalDate}
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                >
              </div>

              <div class="bg-gray-50 p-4 rounded-lg">
                <div class="text-lg font-bold text-center">
                  Total: <span class="text-green-600">${calculateVisaTotal()} USD</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Visa Application Form -->
          <div class="border-t pt-8">
            <h3 class="text-xl font-semibold mb-6">Visa Application Form</h3>
            
            <div class="grid md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                <input 
                  type="text" 
                  bind:value={visaFormData.fullName}
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                >
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Passport Number *</label>
                <input 
                  type="text" 
                  bind:value={visaFormData.passportNumber}
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                >
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Nationality *</label>
                <select bind:value={visaFormData.nationality} class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
                  <option value="">Select nationality</option>
                  {#each countries as country}
                    <option value={country}>{country}</option>
                  {/each}
                </select>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Date of Birth *</label>
                <input 
                  type="date" 
                  bind:value={visaFormData.dateOfBirth}
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                >
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Place of Birth</label>
                <input 
                  type="text" 
                  bind:value={visaFormData.placeOfBirth}
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                >
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Passport Issue Date</label>
                <input 
                  type="date" 
                  bind:value={visaFormData.passportIssueDate}
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                >
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Passport Expiry Date</label>
                <input 
                  type="date" 
                  bind:value={visaFormData.passportExpiryDate}
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                >
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                <input 
                  type="email" 
                  bind:value={visaFormData.email}
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                >
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input 
                  type="tel" 
                  bind:value={visaFormData.phone}
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                >
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Occupation</label>
                <input 
                  type="text" 
                  bind:value={visaFormData.occupation}
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                >
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Employer Name</label>
                <input 
                  type="text" 
                  bind:value={visaFormData.employerName}
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                >
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Accommodation Name</label>
                <input 
                  type="text" 
                  bind:value={visaFormData.accommodationName}
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Hotel, guest home, or guesthouse name"
                >
              </div>
            </div>

            <div class="mt-6">
              <label class="block text-sm font-medium text-gray-700 mb-2">Purpose of Visit</label>
              <textarea 
                bind:value={visaFormData.purposeOfVisit}
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                rows="3"
                placeholder="Tourism, business, conference, etc."
              ></textarea>
            </div>

            <div class="mt-6">
              <label class="block text-sm font-medium text-gray-700 mb-2">Accommodation Address</label>
              <textarea 
                bind:value={visaFormData.accommodationAddress}
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                rows="3"
                placeholder="Full address of where you'll be staying"
              ></textarea>
            </div>

            <div class="grid md:grid-cols-2 gap-6 mt-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Emergency Contact Name</label>
                <input 
                  type="text" 
                  bind:value={visaFormData.emergencyContactName}
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                >
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Emergency Contact Phone</label>
                <input 
                  type="tel" 
                  bind:value={visaFormData.emergencyContactPhone}
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                >
              </div>
            </div>

            <button 
              on:click={submitVisaApplication}
              class="w-full mt-8 bg-green-600 text-white py-3 px-6 rounded-md hover:bg-green-700 transition-colors duration-200 font-semibold"
            >
              Submit Visa Application - ${calculateVisaTotal()} USD
            </button>
          </div>
        </div>
      </div>
    {/if}

    <!-- My Applications Tab -->
    {#if activeTab === 'applications'}
      <div class="max-w-6xl mx-auto">
        <div class="bg-white rounded-lg shadow-lg p-8">
          <h2 class="text-3xl font-bold text-gray-800 mb-6">📄 My Applications</h2>
          
          <!-- Permit Applications -->
          {#if permitApplications.length > 0}
            <div class="mb-8">
              <h3 class="text-xl font-semibold mb-4">🦍 Gorilla Permit Applications</h3>
              <div class="space-y-4">
                {#each permitApplications as application}
                  <div class="border rounded-lg p-6">
                    <div class="flex justify-between items-start mb-4">
                      <div>
                        <h4 class="font-semibold text-lg">Application #{application.id}</h4>
                        <p class="text-gray-600">{application.park}</p>
                      </div>
                      <span class="px-3 py-1 rounded-full text-sm font-medium {getStatusColor(application.status)}">
                        {application.status.toUpperCase()}
                      </span>
                    </div>
                    
                    <div class="grid md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <span class="text-sm text-gray-500">Trekking Date</span>
                        <p class="font-medium">{new Date(application.date).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <span class="text-sm text-gray-500">Permits</span>
                        <p class="font-medium">{application.permits}</p>
                      </div>
                      <div>
                        <span class="text-sm text-gray-500">Total Amount</span>
                        <p class="font-medium text-green-600">${application.total} USD</p>
                      </div>
                    </div>
                    
                    <div class="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                      <div>
                        <span class="text-gray-500">Submitted:</span> {new Date(application.submittedAt).toLocaleDateString()}
                      </div>
                      <div>
                        <span class="text-gray-500">Processing Time:</span> {application.processingTime}
                      </div>
                    </div>
                  </div>
                {/each}
              </div>
            </div>
          {/if}

          <!-- Visa Applications -->
          {#if visaApplications.length > 0}
            <div class="mb-8">
              <h3 class="text-xl font-semibold mb-4">📋 Visa Applications</h3>
              <div class="space-y-4">
                {#each visaApplications as application}
                  <div class="border rounded-lg p-6">
                    <div class="flex justify-between items-start mb-4">
                      <div>
                        <h4 class="font-semibold text-lg">Application #{application.id}</h4>
                        <p class="text-gray-600">{application.visaType}</p>
                      </div>
                      <span class="px-3 py-1 rounded-full text-sm font-medium {getStatusColor(application.status)}">
                        {application.status.toUpperCase()}
                      </span>
                    </div>
                    
                    <div class="grid md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <span class="text-sm text-gray-500">Arrival Date</span>
                        <p class="font-medium">{new Date(application.arrivalDate).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <span class="text-sm text-gray-500">Departure Date</span>
                        <p class="font-medium">{application.departureDate ? new Date(application.departureDate).toLocaleDateString() : 'Not specified'}</p>
                      </div>
                      <div>
                        <span class="text-sm text-gray-500">Total Amount</span>
                        <p class="font-medium text-green-600">${application.total} USD</p>
                      </div>
                    </div>
                    
                    <div class="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                      <div>
                        <span class="text-gray-500">Submitted:</span> {new Date(application.submittedAt).toLocaleDateString()}
                      </div>
                      <div>
                        <span class="text-gray-500">Processing Time:</span> {application.processingTime}
                      </div>
                    </div>
                  </div>
                {/each}
              </div>
            </div>
          {/if}

          {#if permitApplications.length === 0 && visaApplications.length === 0}
            <div class="text-center py-12">
              <div class="text-6xl mb-4">📄</div>
              <h3 class="text-xl font-semibold text-gray-600 mb-2">No Applications Yet</h3>
              <p class="text-gray-500 mb-6">You haven't submitted any permit or visa applications.</p>
              <div class="space-x-4">
                <button 
                  on:click={() => switchTab('gorilla-permits')}
                  class="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors"
                >
                  Apply for Gorilla Permits
                </button>
                <button 
                  on:click={() => switchTab('visa-processing')}
                  class="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Apply for Visa
                </button>
              </div>
            </div>
          {/if}
        </div>
      </div>
    {/if}
  </div>
</div>
