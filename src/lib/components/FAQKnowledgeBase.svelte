<script>
  export let showAsModal = false;
  
  let searchTerm = '';
  let selectedCategory = 'all';
  let expandedItems = new Set();
  
  const faqCategories = [
    { id: 'all', name: 'All FAQs', icon: '📚' },
    { id: 'gorilla', name: 'Gorilla Trekking', icon: '🦍' },
    { id: 'safari', name: 'Safari & Wildlife', icon: '🦁' },
    { id: 'accommodation', name: 'Accommodation', icon: 'building' },
    { id: 'transport', name: 'Transportation', icon: 'car' },
    { id: 'visa', name: 'Visa & Entry', icon: '📋' },
    { id: 'health', name: 'Health & Safety', icon: '🏥' },
    { id: 'weather', name: 'Weather & Climate', icon: '🌤️' },
    { id: 'booking', name: 'Booking & Payment', icon: '💳' },
    { id: 'culture', name: 'Culture & Food', icon: '🇺🇬' }
  ];

  const faqItems = [
    // Gorilla Trekking FAQs
    {
      id: 1,
      category: 'gorilla',
      question: 'How much does a gorilla trekking permit cost?',
      answer: 'Gorilla trekking permits cost $800 for foreign non-residents, $700 for foreign residents, and 300,000 UGX for East African citizens (effective July 2024). This includes park entry, guide services, and one hour with the gorillas.',
      tags: ['permit', 'cost', 'price', 'gorilla'],
      popularity: 95
    },
    {
      id: 2,
      category: 'gorilla',
      question: 'What is the minimum age for gorilla trekking?',
      answer: 'The minimum age for gorilla trekking is 15 years old. This is strictly enforced for safety reasons and to minimize stress on the gorillas.',
      tags: ['age', 'requirements', 'gorilla'],
      popularity: 88
    },
    {
      id: 3,
      category: 'gorilla',
      question: 'How fit do I need to be for gorilla trekking?',
      answer: 'Moderate fitness is required as treks can last 2-8 hours through dense forest and steep terrain. Regular walking or hiking experience is helpful. Porters are available to carry your bag.',
      tags: ['fitness', 'requirements', 'difficulty'],
      popularity: 82
    },
    {
      id: 4,
      category: 'gorilla',
      question: 'What should I wear for gorilla trekking?',
      answer: 'Wear long pants, closed shoes (hiking boots recommended), long-sleeved shirt, waterproof jacket, hat, and gloves. Bring insect repellent and a small daypack for water and snacks.',
      tags: ['clothing', 'gear', 'packing'],
      popularity: 78
    },

    // Safari & Wildlife FAQs
    {
      id: 5,
      category: 'safari',
      question: 'Which national parks offer the best safari experience?',
      answer: 'Queen Elizabeth National Park offers diverse wildlife including tree-climbing lions. Murchison Falls has the Big 5 and spectacular waterfalls. Kidepo Valley is remote with unique species like cheetahs.',
      tags: ['parks', 'wildlife', 'safari'],
      popularity: 91
    },
    {
      id: 6,
      category: 'safari',
      question: 'When is the best time for wildlife viewing?',
      answer: 'Dry seasons (June-August and December-February) offer the best wildlife viewing as animals gather around water sources and vegetation is less dense.',
      tags: ['timing', 'seasons', 'wildlife'],
      popularity: 85
    },
    {
      id: 7,
      category: 'safari',
      question: 'Can I see the Big 5 in Uganda?',
      answer: 'Yes! Uganda has 4 of the Big 5 naturally (lion, elephant, buffalo, leopard). Rhinos can be seen at Ziwa Rhino Sanctuary, home to over 40 Southern White Rhinos. Queen Elizabeth and Murchison Falls are best for Big 5 viewing.',
      tags: ['big five', 'wildlife', 'animals'],
      popularity: 89
    },

    // Accommodation FAQs
    {
      id: 8,
      category: 'accommodation',
      question: 'What types of accommodation are available?',
      answer: 'We offer luxury safari guest homes ($350+/night), mid-range hotels and guest homes ($200-350/night), budget guesthouses ($150-200/night), and camping options in some locations.',
      tags: ['types', 'budget', 'options'],
      popularity: 86
    },
    {
      id: 9,
      category: 'accommodation',
      question: 'Are accommodations safe and clean?',
      answer: 'All our partner accommodations meet international safety and hygiene standards. We personally inspect accommodations and maintain strict quality criteria.',
      tags: ['safety', 'quality', 'standards'],
      popularity: 79
    },

    // Transportation FAQs
    {
      id: 10,
      category: 'transport',
      question: 'Do I need a 4WD vehicle in Uganda?',
      answer: 'Yes, 4WD is recommended for national parks and rural areas. Many roads are unpaved and can be challenging during rainy seasons. All our vehicles are 4WD.',
      tags: ['4wd', 'vehicle', 'roads'],
      popularity: 83
    },
    {
      id: 11,
      category: 'transport',
      question: 'Can I drive myself or do I need a driver?',
      answer: 'Both options are available. Self-drive is possible with an international driving permit. However, we recommend drivers who know local roads, wildlife behavior, and can enhance your experience.',
      tags: ['driving', 'driver', 'options'],
      popularity: 77
    },

    // Visa & Entry FAQs
    {
      id: 12,
      category: 'visa',
      question: 'Do I need a visa to enter Uganda?',
      answer: 'Most visitors need a visa. East African Tourist Visa ($100) covers Uganda, Kenya, and Rwanda for 90 days. Uganda-only visa ($50) is also available. Apply online or get on arrival.',
      tags: ['visa', 'requirements', 'entry'],
      popularity: 92
    },
    {
      id: 13,
      category: 'visa',
      question: 'Is yellow fever vaccination required?',
      answer: 'Yes, yellow fever vaccination is mandatory for all visitors over 1 year old. You must present a valid yellow fever certificate at immigration. Vaccination should be done at least 10 days before travel.',
      tags: ['yellow fever', 'vaccination', 'health'],
      popularity: 88
    },

    // Health & Safety FAQs
    {
      id: 14,
      category: 'health',
      question: 'Is malaria a concern in Uganda?',
      answer: 'Uganda is a malaria-endemic area. Take prophylaxis, use mosquito repellent, wear long sleeves in the evening, and sleep under nets. Consult a travel clinic 4-6 weeks before departure.',
      tags: ['malaria', 'prevention', 'health'],
      popularity: 87
    },
    {
      id: 15,
      category: 'health',
      question: 'Is Uganda safe for tourists?',
      answer: 'Uganda is generally safe for tourists. Use common sense, avoid isolated areas at night, don\'t display valuables, and follow your guide\'s advice. Tourist areas have good security.',
      tags: ['safety', 'security', 'travel'],
      popularity: 81
    },

    // Weather & Climate FAQs
    {
      id: 16,
      category: 'weather',
      question: 'What is the weather like in Uganda?',
      answer: 'Uganda has a tropical climate with temperatures 20-30°C year-round. Two dry seasons (Dec-Feb, Jun-Aug) and two wet seasons (Mar-May, Sep-Nov). Mountains are cooler.',
      tags: ['weather', 'climate', 'temperature'],
      popularity: 84
    },

    // Booking & Payment FAQs
    {
      id: 17,
      category: 'booking',
      question: 'How far in advance should I book?',
      answer: 'Gorilla permits should be booked 3-6 months in advance, especially for peak seasons. Other services can usually be booked 1-3 months ahead, but earlier is better for better availability.',
      tags: ['advance booking', 'timing', 'availability'],
      popularity: 80
    },
    {
      id: 18,
      category: 'booking',
      question: 'What payment methods do you accept?',
      answer: 'We accept credit cards (Visa, MasterCard), bank transfers, PayPal, and mobile money. A deposit is usually required to confirm bookings, with the balance due before travel.',
      tags: ['payment', 'methods', 'booking'],
      popularity: 76
    },

    // Culture & Food FAQs
    {
      id: 19,
      category: 'culture',
      question: 'What is the local food like?',
      answer: 'Ugandan cuisine features matooke (green bananas), posho (maize), rice, groundnut sauce, fresh fish, and tropical fruits. Most accommodations offer international cuisine alongside local dishes.',
      tags: ['food', 'cuisine', 'local'],
      popularity: 72
    },
    {
      id: 20,
      category: 'culture',
      question: 'What languages are spoken in Uganda?',
      answer: 'English is the official language and widely spoken in tourist areas. Luganda is common in central Uganda. There are over 40 local languages, but English will serve you well.',
      tags: ['language', 'communication', 'english'],
      popularity: 71
    }
  ];

  function toggleExpanded(id) {
    if (expandedItems.has(id)) {
      expandedItems.delete(id);
    } else {
      expandedItems.add(id);
    }
    expandedItems = new Set(expandedItems);
  }

  function handleCategoryFilter(categoryId) {
    selectedCategory = categoryId;
    expandedItems.clear();
    expandedItems = new Set();
  }

  $: filteredFAQs = faqItems
    .filter(item => selectedCategory === 'all' || item.category === selectedCategory)
    .filter(item => 
      searchTerm === '' || 
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => b.popularity - a.popularity);

  function handleClose() {
    if (onClose) onClose();
  }
</script>

<div class="{showAsModal ? 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4' : ''}">
  <div class="{showAsModal ? 'bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden' : 'w-full'}">
    
    <!-- Header -->
    <div class="bg-primary text-white p-6 {showAsModal ? 'rounded-t-lg' : 'rounded-lg mb-6'}">
      <div class="flex justify-between items-center">
        <div>
          <h2 class="text-2xl font-bold mb-2">Uganda Travel FAQ</h2>
          <p class="text-primary-light">Everything you need to know about traveling to Uganda</p>
        </div>
        {#if showAsModal}
          <button 
            class="text-white/80 hover:text-white p-2"
            on:click={handleClose}
            aria-label="Close FAQ"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        {/if}
      </div>
    </div>

    <div class="{showAsModal ? 'p-6 overflow-y-auto max-h-[calc(90vh-140px)]' : ''}">
      <!-- Search and Filter -->
      <div class="mb-8">
        <!-- Search Bar -->
        <div class="relative mb-6">
          <input 
            type="text" 
            placeholder="Search FAQs..."
            bind:value={searchTerm}
            class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
          />
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        <!-- Category Filters -->
        <div class="flex flex-wrap gap-2">
          {#each faqCategories as category}
            <button 
              class="px-4 py-2 rounded-full text-sm font-medium transition-colors {selectedCategory === category.id ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}"
              on:click={() => handleCategoryFilter(category.id)}
            >
              {category.icon} {category.name}
            </button>
          {/each}
        </div>
      </div>

      <!-- FAQ Results -->
      <div class="space-y-4">
        {#if filteredFAQs.length === 0}
          <div class="text-center py-12">
            <div class="text-6xl mb-4">🤔</div>
            <h3 class="text-lg font-medium text-gray-900 mb-2">No FAQs found</h3>
            <p class="text-gray-600">Try adjusting your search terms or category filter.</p>
          </div>
        {:else}
          <div class="text-sm text-gray-600 mb-4">
            Showing {filteredFAQs.length} result{filteredFAQs.length !== 1 ? 's' : ''}
            {#if selectedCategory !== 'all'}
              in {faqCategories.find(c => c.id === selectedCategory)?.name}
            {/if}
          </div>
          
          {#each filteredFAQs as faq (faq.id)}
            <div class="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
              <button 
                class="w-full p-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                on:click={() => toggleExpanded(faq.id)}
              >
                <div class="flex-1">
                  <div class="flex items-center mb-1">
                    <span class="text-lg mr-2">
                      {faqCategories.find(c => c.id === faq.category)?.icon}
                    </span>
                    <h3 class="font-medium text-gray-900">{faq.question}</h3>
                  </div>
                  <div class="flex items-center space-x-4 text-xs text-gray-500">
                    <span class="capitalize">{faq.category}</span>
                    <span>•</span>
                    <span>Popularity: {faq.popularity}%</span>
                  </div>
                </div>
                <div class="ml-4 transition-transform duration-200 {expandedItems.has(faq.id) ? 'rotate-180' : ''}">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>
              
              {#if expandedItems.has(faq.id)}
                <div class="px-4 pb-4 border-t border-gray-100">
                  <div class="pt-4">
                    <p class="text-gray-700 leading-relaxed mb-4">{faq.answer}</p>
                    
                    <!-- Tags -->
                    <div class="flex flex-wrap gap-2 mb-4">
                      {#each faq.tags as tag}
                        <span class="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                          #{tag}
                        </span>
                      {/each}
                    </div>
                    
                    <!-- Actions -->
                    <div class="flex items-center justify-between pt-3 border-t border-gray-100">
                      <div class="text-xs text-gray-500">
                        Was this helpful?
                      </div>
                      <div class="flex space-x-2">
                        <button class="text-xs text-primary hover:text-primary-dark font-medium">
                          👍 Yes
                        </button>
                        <button class="text-xs text-gray-600 hover:text-gray-800 font-medium">
                          👎 No
                        </button>
                        <button class="text-xs text-primary hover:text-primary-dark font-medium">
                          📧 Contact Us
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              {/if}
            </div>
          {/each}
        {/if}
      </div>

      <!-- Still have questions? -->
      <div class="mt-12 bg-gradient-to-r from-primary to-primary-dark rounded-lg p-6 text-white text-center">
        <h3 class="text-xl font-bold mb-2">Still have questions?</h3>
        <p class="mb-4 text-primary-light">Our Uganda travel experts are here to help you plan the perfect trip!</p>
        <div class="flex flex-col sm:flex-row gap-3 justify-center">
          <button class="bg-white text-primary hover:bg-gray-100 px-6 py-2 rounded-md font-medium transition-colors">
            💬 Chat with AI Assistant
          </button>
          <button class="bg-white/20 hover:bg-white/30 text-white px-6 py-2 rounded-md font-medium transition-colors">
            📞 Speak to Human Expert
          </button>
          <button class="bg-white/20 hover:bg-white/30 text-white px-6 py-2 rounded-md font-medium transition-colors">
            📧 Send Email Inquiry
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
