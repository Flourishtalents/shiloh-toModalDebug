<script>
  import { createEventDispatcher, onMount } from 'svelte';
  
  const dispatch = createEventDispatcher();
  export let user = null;
  
  let isOpen = false;
  let isTyping = false;
  let messages = [];
  let currentMessage = '';
  let chatContainer;
  let isMinimized = false;
  let unreadCount = 0;
  let isInitialized = false;
  let isMobile = false;
  
  // Comprehensive FAQ and response system
  const knowledgeBase = {
    // Gorilla Trekking
    gorilla: {
      keywords: ['gorilla', 'trekking', 'bwindi', 'mgahinga', 'permit', 'tracking'],
      responses: [
        "**Gorilla Trekking:** Uganda's most popular experience! Here's what you need to know:",
        "📍 **Best Locations:** Bwindi Impenetrable Forest (most groups) and Mgahinga Gorilla National Park",
        "���� **Cost:** Permits are $700 for foreign non-residents, $600 for foreign residents",
        "⏰ **Best Time:** Year-round, but dry seasons (June-August, December-February) are easier",
        "📋 **Requirements:** Minimum age 15, moderate fitness level, valid passport",
        "🎒 **What to Bring:** Waterproof jacket, hiking boots, gloves, long pants",
        "Would you like me to help you book a gorilla trekking experience or check availability?"
      ]
    },
    
    // Safari & Wildlife
    safari: {
      keywords: ['safari', 'wildlife', 'animals', 'big five', 'lion', 'elephant', 'buffalo', 'leopard', 'rhino', 'queen elizabeth', 'murchison'],
      responses: [
        "**Safari Experiences:** Uganda offers incredible safari experiences! Here are the top destinations:",
        "🏞️ **Queen Elizabeth National Park:** Famous for tree-climbing lions, boat safaris on Kazinga Channel",
        "🌊 **Murchison Falls:** Spectacular waterfalls, Big 5 wildlife, Nile boat cruises",
        "🦏 **Ziwa Rhino Sanctuary:** Only place to see rhinos in Uganda, home to over 40 Southern White Rhinos",
        "🐆 **Kidepo Valley:** Remote park with unique wildlife like cheetahs and ostriches",
        "📅 **Best Time:** Dry seasons for easier game viewing",
        "Would you like recommendations for a specific safari package or duration?"
      ]
    },
    
    // Accommodation
    accommodation: {
      keywords: ['hotel', 'lodge', 'accommodation', 'stay', 'where to stay', 'booking', 'rooms'],
      responses: [
        "**Accommodations:** We offer diverse accommodations across Uganda:",
        "**Luxury:** 5-star hotels and safari guest homes ($350+/night)",
        "**Mid-range:** Comfortable guest homes and guesthouses ($200-350/night)",
        "**Budget:** Clean, safe options ($150-200/night)",
        "**Shiloh Hospitality:** Our featured accommodations with exceptional service",
        "**Locations:** Kampala, Entebbe, all national parks, and tourist destinations",
        "I can help you find the perfect accommodation based on your budget and preferences. What's your preferred location and budget range?"
      ]
    },
    
    // Transportation
    transport: {
      keywords: ['transport', 'car hire', 'driver', 'airport transfer', 'travel', 'vehicle'],
      responses: [
        "**Transportation:** Transportation options in Uganda:",
        "**Airport Transfers:** Reliable pickup/drop-off from Entebbe Airport",
        "🚙 **Self-Drive:** 4WD vehicles with GPS and support",
        "👨‍💼 **With Driver:** Professional, licensed drivers who know Uganda well",
        "🛣️ **Tour Vehicles:** Safari-equipped vehicles with pop-up roofs",
        "💳 **Rates:** From $40/day for self-drive, $60/day with driver",
        "All vehicles are well-maintained and include insurance. Would you like a quote for specific dates?"
      ]
    },
    
    // Visas & Entry
    visa: {
      keywords: ['visa', 'entry', 'passport', 'requirements', 'immigration', 'border'],
      responses: [
        "📋 Uganda Visa Requirements:",
        "🌍 **East African Visa:** $100 - Valid for Uganda, Kenya, Rwanda (90 days)",
        "🇺🇬 **Uganda Only:** $50 - Single entry (90 days)",
        "**Online Application:** Apply at visas.immigration.go.ug",
        "**Requirements:** Valid passport (6+ months), yellow fever certificate, return ticket",
        "**On Arrival:** Available at Entebbe Airport and land borders",
        "**Yellow Fever vaccination is mandatory!** Would you like help with visa application or yellow fever clinic locations?"
      ]
    },
    
    // Weather & Best Time
    weather: {
      keywords: ['weather', 'climate', 'rain', 'season', 'when to visit', 'best time'],
      responses: [
        "🌤️ Uganda's Weather Guide:",
        "🌡️ **Temperature:** 20-30°C year-round (cooler in mountains)",
        "☀️ **Dry Seasons:** December-February, June-August (best for trekking/safaris)",
        "🌧️ **Wet Seasons:** March-May, September-November (lush green, fewer crowds)",
        "🦍 **Gorilla Trekking:** Year-round, but dry seasons are more comfortable",
        "🏞️ **Safaris:** Dry seasons offer better wildlife viewing",
        "📸 **Photography:** Wet season has dramatic skies and green landscapes",
        "What activities are you most interested in? I can suggest the best times for your specific plans."
      ]
    },
    
    // Health & Safety
    health: {
      keywords: ['health', 'safety', 'malaria', 'vaccination', 'medical', 'insurance', 'hospital'],
      responses: [
        "🏥 Health & Safety in Uganda:",
        "💉 **Required:** Yellow fever vaccination certificate",
        "💊 **Recommended:** Malaria prophylaxis, Hepatitis A/B, Typhoid",
        "🦟 **Malaria Prevention:** Use repellent, sleep under nets, take prophylaxis",
        "🏥 **Medical Care:** Good facilities in Kampala/Entebbe, basic care elsewhere",
        "🚰 **Water:** Stick to bottled water or purified water",
        "📞 **Emergency:** 999 or 112 (Police), 0800-211-088 (Ambulance), travel insurance strongly recommended",
        "Always consult a travel medicine clinic 4-6 weeks before departure. Would you like recommendations for travel insurance?"
      ]
    },
    
    // Booking & Prices
    booking: {
      keywords: ['book', 'booking', 'price', 'cost', 'payment', 'reservation', 'availability'],
      responses: [
        "💳 Booking with The Shiloh Experience:",
        "📅 **How to Book:** Online through our website or contact our team",
        "�� **Payment:** Multiple options - card, bank transfer, mobile money",
        "📋 **Deposit:** Usually 30% to secure booking, balance before travel",
        "❌ **Cancellation:** Flexible policies, depends on service type",
        "📱 **Confirmation:** Instant confirmation for most services",
        "🎁 **Discounts:** Group discounts, loyalty member benefits, seasonal offers",
        "I can help you book specific services right now! What would you like to reserve?"
      ]
    },
    
    // Food & Culture
    culture: {
      keywords: ['food', 'culture', 'local', 'tradition', 'cuisine', 'people', 'language'],
      responses: [
        "🇺🇬 Ugandan Culture & Cuisine:",
        "🍽️ **Local Food:** Matooke (banana), posho, groundnut sauce, rolex (egg roll)",
        "☕ **Coffee:** Uganda is a major coffee producer - try local brews!",
        "🗣️ **Languages:** English (official), Luganda, and 40+ local languages",
        "🎵 **Culture:** Friendly people, rich traditions, diverse ethnic groups",
        "🎨 **Crafts:** Beautiful basketry, pottery, wood carvings",
        "💡 **Etiquette:** Greet elders first, use right hand, dress modestly",
        "🏛️ **Cultural Sites:** Kasubi Tombs, Uganda Museum, cultural centers",
        "Would you like recommendations for cultural experiences or local restaurants?"
      ]
    },

    // Emergency Contacts
    emergency: {
      keywords: ['emergency', 'police', 'ambulance', 'hospital', 'fire', 'help', 'urgent', 'contact'],
      responses: [
        "🚨 **Uganda Emergency Contacts:**",
        "🚔 **Police Emergency:** 999 or 112 (toll-free, 24/7)",
        "🚑 **Ambulance:** 0800-211-088 (Uganda Red Cross, 24/7)",
        "🔥 **Fire & Rescue:** 112 (toll-free, 24/7)",
        "👮 **Tourist Police:** 0800-300-117 (24/7)",
        "🏥 **Major Hospitals:**",
        "   • International Hospital Kampala: +256-312-200-400",
        "   • Nakasero Hospital: +256-414-346-150",
        "   • Mulago Hospital: +256-414-554-001",
        "**Important:** Always call emergency services first, then contact your travel insurance provider."
      ]
    }
  };

  // Quick reply suggestions
  const quickReplies = [
    "Plan my gorilla trek",
    "Best tour packages", 
    "Accommodation options",
    "Visa requirements",
    "Transport & car hire",
    "Weather & best time",
    "Health & safety tips",
    "Book now"
  ];

  // Greeting messages based on time/context
  const greetingMessages = {
    first: [
      "👋 Hi there! I'm Shiloh AI, your Uganda travel assistant!",
      "I can help you with gorilla trekking, safaris, accommodations, visas, and all things Uganda.",
      "What would you like to know about your Uganda adventure?"
    ],
    returning: [
      "Welcome back! How can I assist you with your Uganda travel plans today?"
    ]
  };

  function initializeChat() {
    if (!isInitialized) {
      const hasVisited = localStorage.getItem('shiloh_chatbot_visited');
      const messages = hasVisited ? greetingMessages.returning : greetingMessages.first;
      
      messages.forEach((msg, index) => {
        setTimeout(() => {
          addBotMessage(msg);
        }, index * 800);
      });
      
      // Add quick replies after greetings
      setTimeout(() => {
        addQuickReplies();
      }, messages.length * 800 + 500);
      
      localStorage.setItem('shiloh_chatbot_visited', 'true');
      isInitialized = true;
    }
  }

  function toggleChat() {
    isOpen = !isOpen;
    if (isOpen) {
      unreadCount = 0;
      initializeChat();
      setTimeout(() => {
        scrollToBottom();
      }, 100);
    }
  }

  function handleOutsideClick(event) {
    if (isOpen && !isMinimized && event.target.closest('.chatbot-modal') === null && event.target.closest('.chatbot-button') === null) {
      isOpen = false;
    }
  }

  function minimizeChat() {
    isMinimized = !isMinimized;
  }

  function addBotMessage(text, isQuickReply = false) {
    const message = {
      id: Date.now() + Math.random(),
      text,
      isBot: true,
      timestamp: new Date(),
      isQuickReply
    };
    messages = [...messages, message];
    
    if (!isOpen) {
      unreadCount++;
    }
    
    setTimeout(scrollToBottom, 100);
  }

  function addUserMessage(text) {
    const message = {
      id: Date.now(),
      text,
      isBot: false,
      timestamp: new Date()
    };
    messages = [...messages, message];
    currentMessage = '';
    setTimeout(scrollToBottom, 100);
  }

  function addQuickReplies() {
    addBotMessage(quickReplies, true);
  }

  function processMessage(message) {
    const lowerMessage = message.toLowerCase();
    
    // Find matching knowledge base entry
    let bestMatch = null;
    let maxMatches = 0;
    
    for (const [category, data] of Object.entries(knowledgeBase)) {
      const matches = data.keywords.filter(keyword => 
        lowerMessage.includes(keyword.toLowerCase())
      ).length;
      
      if (matches > maxMatches) {
        maxMatches = matches;
        bestMatch = data;
      }
    }

    // Show typing indicator
    isTyping = true;
    
    setTimeout(() => {
      isTyping = false;
      
      if (bestMatch && maxMatches > 0) {
        // Found relevant information
        bestMatch.responses.forEach((response, index) => {
          setTimeout(() => {
            addBotMessage(response);
          }, index * 1000);
        });
      } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
        // Greeting
        addBotMessage("Hello! 👋 I'm here to help with your Uganda travel plans. What would you like to know?");
        setTimeout(() => addQuickReplies(), 1000);
      } else if (lowerMessage.includes('thank') || lowerMessage.includes('thanks')) {
        // Thanks
        addBotMessage("You're welcome! 😊 Is there anything else about Uganda travel I can help you with?");
      } else if (lowerMessage.includes('contact') || lowerMessage.includes('human') || lowerMessage.includes('speak to')) {
        // Human support
        addBotMessage("I'd be happy to connect you with our human team! 👨‍💼");
        addBotMessage("📧 Email: info@shiloh.com");
        addBotMessage("📞 Phone: +256 703 462 969");
        addBotMessage("💬 WhatsApp: +256 703 462 969");
        addBotMessage("**The Shiloh Experience Customer Support:**");
        addBotMessage("📧 Email: info@shiloh.com");
        addBotMessage("🌐 Website: shiloh.com");
        addBotMessage("📍 Location: Kutta Road, Muyenga, Kampala, Uganda");
        addBotMessage("⏰ Business Hours: Mon-Fri 8:00 AM - 6:00 PM, Sat 9:00 AM - 2:00 PM");
        addBotMessage("Our friendly team is ready to help plan your perfect Uganda adventure!");
      } else {
        // Fallback response
        addBotMessage("I'd love to help you with that! ���� Let me suggest some topics I can assist with:");
        setTimeout(() => addQuickReplies(), 1000);
      }
    }, 1500); // Simulate thinking time
  }

  function sendMessage() {
    if (currentMessage.trim()) {
      addUserMessage(currentMessage);
      processMessage(currentMessage);
    }
  }

  function handleQuickReply(reply) {
    addUserMessage(reply);
    processMessage(reply);
  }

  function scrollToBottom() {
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }

  function formatTime(date) {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  }

  onMount(() => {
    // Detect mobile screen size
    const checkMobile = () => {
      isMobile = window.innerWidth <= 768;
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Show welcome notification after 3 seconds if user hasn't opened chat
    setTimeout(() => {
      if (!isOpen && !localStorage.getItem('shiloh_chatbot_welcomed')) {
        addBotMessage("👋 Need help planning your Uganda adventure! I'm here to assist!");
        localStorage.setItem('shiloh_chatbot_welcomed', 'true');
      }
    }, 3000);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  });
</script>

<!-- Chat Button - Circular Design with Refined UX -->
{#if !isOpen}
  <button
    class="chatbot-button fixed bottom-5 right-5 bg-white hover:bg-gray-50 text-primary rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-200 z-50 group border border-gray-200"
    on:click={toggleChat}
    aria-label="Open chat assistant"
    style="position: fixed !important; bottom: 20px !important; right: 20px !important; z-index: 9999 !important;"
  >
    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary transition-transform duration-200 group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>

    <!-- Improved tooltip that appears above -->
    <span class="absolute bottom-full right-0 mb-2 bg-gray-900 text-white text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap transform -translate-x-1/2 group-hover:translate-y-0 translate-y-1">
      💬 Let's Chat
      <!-- Tooltip arrow -->
      <svg class="absolute top-full right-1/2 transform translate-x-1/2 text-gray-900" width="8" height="4" viewBox="0 0 8 4" fill="none">
        <path d="M0 0L4 4L8 0H0Z" fill="currentColor"/>
      </svg>
    </span>

    <!-- Unread Badge -->
    {#if unreadCount > 0}
      <span class="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold animate-pulse">
        {unreadCount}
      </span>
    {/if}
  </button>
{/if}

<!-- Chat Window -->
{#if isOpen}
  <!-- Overlay for click-outside-to-close with mobile darkened background -->
  <div class="fixed inset-0 z-50 {isMobile ? 'bg-black bg-opacity-50' : ''}" on:click={handleOutsideClick}></div>

  <div class="chatbot-modal fixed bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col z-50 animate-fade-in
              md:bottom-6 md:right-6 md:w-96 md:h-[500px] md:max-h-[calc(100vh-100px)]
              bottom-4 right-4 left-4 top-20 w-auto h-auto max-h-[calc(100vh-6rem)]
              sm:left-auto sm:top-auto sm:w-80 sm:h-[450px]"
       class:h-12={isMinimized}>
    
    <!-- Chat Header -->
    <div class="bg-gradient-to-r from-primary to-primary-dark text-white p-4 rounded-t-2xl flex justify-between items-center">
      <div class="flex items-center">
        <div class="rounded-full bg-white/20 p-2 mr-3 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.847a4.5 4.5 0 003.09 3.09L15.75 12l-2.847.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
          </svg>
        </div>
        <div>
          <h3 class="font-semibold text-sm leading-tight">Shiloh AI Assistant</h3>
          <p class="text-primary-light text-xs">Uganda Travel Expert</p>
        </div>
      </div>
      <div class="flex items-center space-x-2">
        <button 
          class="text-white/80 hover:text-white p-1"
          on:click={minimizeChat}
          aria-label={isMinimized ? 'Expand chat' : 'Minimize chat'}
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
          </svg>
        </button>
        <button 
          class="text-white/80 hover:text-white p-1"
          on:click={toggleChat}
          aria-label="Close chat"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>

    {#if !isMinimized}
      <!-- Chat Messages -->
      <div class="flex-1 overflow-y-auto p-4 space-y-4" bind:this={chatContainer}>
        {#each messages as message (message.id)}
          <div class="flex {message.isBot ? 'justify-start' : 'justify-end'}">
            <div class="max-w-[80%] {message.isBot ? 'bg-gray-100 text-gray-800' : 'bg-primary text-white'} rounded-lg p-3">
              {#if message.isQuickReply}
                <!-- Quick Replies -->
                <div class="space-y-2">
                  <p class="text-sm font-medium mb-3">Quick suggestions:</p>
                  <div class="grid grid-cols-2 gap-2">
                    {#each message.text as reply}
                      <button 
                        class="text-xs bg-white border border-gray-300 hover:bg-gray-50 rounded-lg p-2 transition-colors text-left"
                        on:click={() => handleQuickReply(reply)}
                      >
                        {reply}
                      </button>
                    {/each}
                  </div>
                </div>
              {:else}
                <!-- Regular Message -->
                <div class="text-sm whitespace-pre-line">{@html message.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</div>
                <div class="text-xs opacity-60 mt-1">
                  {formatTime(message.timestamp)}
                </div>
              {/if}
            </div>
          </div>
        {/each}
        
        <!-- Typing Indicator -->
        {#if isTyping}
          <div class="flex justify-start">
            <div class="bg-gray-100 rounded-lg p-3 max-w-[80%]">
              <div class="flex space-x-1">
                <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
                <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
              </div>
            </div>
          </div>
        {/if}
      </div>

      <!-- Chat Input -->
      <div class="p-4 border-t border-gray-200">
        <div class="flex space-x-2">
          <input
            type="text"
            bind:value={currentMessage}
            placeholder="Ask me about Uganda travel..."
            aria-label="Ask a question about Uganda travel"
            class="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
            on:keydown={(e) => e.key === 'Enter' && sendMessage()}
          />
          <button 
            class="bg-primary hover:bg-primary-dark text-white rounded-lg px-4 py-2 transition-colors"
            on:click={sendMessage}
            disabled={!currentMessage.trim()}
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
        
        <!-- Quick Actions -->
        <div class="mt-2 flex flex-wrap gap-1">
          <button 
            class="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full px-3 py-1 transition-colors"
            on:click={() => handleQuickReply('Contact human support')}
          >
            💬 Human Support
          </button>
          <button 
            class="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full px-3 py-1 transition-colors"
            on:click={() => handleQuickReply('Emergency contacts')}
          >
            🚨 Emergency
          </button>
        </div>
      </div>
    {/if}
  </div>
{/if}

<style>
  @keyframes fade-in {
    from {
      opacity: 0;
      transform: translateY(20px) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
  
  .animate-fade-in {
    animation: fade-in 0.3s ease-out;
  }
  
  @keyframes bounce {
    0%, 80%, 100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-5px);
    }
  }
  
  .animate-bounce {
    animation: bounce 1.4s infinite;
  }
  
  @keyframes ping {
    75%, 100% {
      transform: scale(2);
      opacity: 0;
    }
  }
  
  .animate-ping {
    animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;
  }
  
  /* Custom scrollbar */
  .overflow-y-auto::-webkit-scrollbar {
    width: 4px;
  }
  
  .overflow-y-auto::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  
  .overflow-y-auto::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 2px;
  }
  
  .overflow-y-auto::-webkit-scrollbar-thumb:hover {
    background: #a1a1a1;
  }

  /* Mobile-specific chatbot positioning and sizing */
  @media (max-width: 768px) {
    .chatbot-modal {
      /* On mobile, take up most of the screen with safe margins */
      top: 1rem !important;
      bottom: 1rem !important;
      left: 1rem !important;
      right: 1rem !important;
      width: auto !important;
      height: auto !important;
      max-height: calc(100vh - 2rem) !important;
      border-radius: 1rem;
    }

    /* Ensure proper spacing for mobile chat content */
    .chatbot-modal .flex-1 {
      min-height: 0; /* Allow flex item to shrink */
    }
  }

  @media (max-width: 480px) {
    .chatbot-modal {
      /* On very small screens, use even smaller margins */
      top: 0.5rem !important;
      bottom: 0.5rem !important;
      left: 0.5rem !important;
      right: 0.5rem !important;
      max-height: calc(100vh - 1rem) !important;
    }
  }
</style>
