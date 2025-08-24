<script>
  export let user = null;
  
  // Sample chatbot analytics data
  const chatbotStats = {
    totalConversations: 1247,
    activeUsers: 89,
    avgResponseTime: 2.3,
    satisfactionRate: 94.2,
    topQuestions: [
      { question: "Gorilla trekking permits", count: 234, percentage: 18.8 },
      { question: "Best time to visit", count: 198, percentage: 15.9 },
      { question: "Accommodation options", count: 156, percentage: 12.5 },
      { question: "Tour packages", count: 134, percentage: 10.7 },
      { question: "Visa requirements", count: 112, percentage: 9.0 }
    ],
    weeklyStats: [
      { day: 'Mon', conversations: 45, resolved: 42 },
      { day: 'Tue', conversations: 52, resolved: 49 },
      { day: 'Wed', conversations: 38, resolved: 36 },
      { day: 'Thu', conversations: 61, resolved: 58 },
      { day: 'Fri', conversations: 48, resolved: 45 },
      { day: 'Sat', conversations: 34, resolved: 32 },
      { day: 'Sun', conversations: 29, resolved: 27 }
    ],
    recentConversations: [
      {
        id: 1,
        timestamp: '2024-11-28 14:32',
        user: 'Anonymous',
        topic: 'Gorilla Trekking',
        status: 'resolved',
        satisfaction: 5
      },
      {
        id: 2,
        timestamp: '2024-11-28 14:15',
        user: 'john@example.com',
        topic: 'Safari Booking',
        status: 'escalated',
        satisfaction: null
      },
      {
        id: 3,
        timestamp: '2024-11-28 13:58',
        user: 'Anonymous',
        topic: 'Visa Information',
        status: 'resolved',
        satisfaction: 4
      }
    ]
  };

  // Chatbot configuration
  let chatbotSettings = {
    isEnabled: true,
    welcomeMessage: "👋 Hi there! I'm Shiloh AI, your Uganda travel assistant!",
    fallbackMessage: "I'd love to help you with that! Let me connect you with our human team.",
    businessHours: {
      enabled: true,
      start: "08:00",
      end: "20:00",
      timezone: "EAT"
    },
    autoEscalation: {
      enabled: true,
      threshold: 3,
      keywordTriggers: ['complaint', 'problem', 'issue', 'cancel']
    }
  };

  function toggleChatbot() {
    chatbotSettings.isEnabled = !chatbotSettings.isEnabled;
    // In real app, would save to backend
  }

  function saveSettings() {
    // In real app, would save settings to backend
    alert('Chatbot settings saved successfully!');
  }

  function exportConversations() {
    // In real app, would export conversation data
    alert('Exporting conversation data...');
  }

  function getStatusColor(status) {
    switch(status) {
      case 'resolved': return 'text-green-600 bg-green-100';
      case 'escalated': return 'text-orange-600 bg-orange-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  }

  function getSatisfactionStars(rating) {
    if (!rating) return '—';
    return '★'.repeat(rating);
  }
</script>

<div class="space-y-8">
  <!-- Header -->
  <div class="flex justify-between items-center">
    <div>
      <h2 class="text-2xl font-bold text-gray-900">AI Chatbot Management</h2>
      <p class="text-gray-600">Monitor performance and manage chatbot settings</p>
    </div>
    <div class="flex items-center space-x-4">
      <label class="flex items-center">
        <input 
          type="checkbox" 
          bind:checked={chatbotSettings.isEnabled}
          on:change={toggleChatbot}
          class="mr-2"
        />
        <span class="text-sm font-medium">Chatbot Enabled</span>
      </label>
      <button 
        class="bg-primary hover:bg-primary-dark text-white py-2 px-4 rounded-md transition-colors"
        on:click={exportConversations}
      >
        Export Data
      </button>
    </div>
  </div>

  <!-- Stats Cards -->
  <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
    <div class="bg-white rounded-lg shadow-md p-6">
      <div class="flex items-center">
        <div class="p-3 bg-blue-100 rounded-full">
          💬
        </div>
        <div class="ml-4">
          <h3 class="text-lg font-semibold text-gray-900">{chatbotStats.totalConversations}</h3>
          <p class="text-sm text-gray-600">Total Conversations</p>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-md p-6">
      <div class="flex items-center">
        <div class="p-3 bg-green-100 rounded-full">
          👥
        </div>
        <div class="ml-4">
          <h3 class="text-lg font-semibold text-gray-900">{chatbotStats.activeUsers}</h3>
          <p class="text-sm text-gray-600">Active Users</p>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-md p-6">
      <div class="flex items-center">
        <div class="p-3 bg-purple-100 rounded-full">
          ⚡
        </div>
        <div class="ml-4">
          <h3 class="text-lg font-semibold text-gray-900">{chatbotStats.avgResponseTime}s</h3>
          <p class="text-sm text-gray-600">Avg Response Time</p>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-md p-6">
      <div class="flex items-center">
        <div class="p-3 bg-yellow-100 rounded-full">
          😊
        </div>
        <div class="ml-4">
          <h3 class="text-lg font-semibold text-gray-900">{chatbotStats.satisfactionRate}%</h3>
          <p class="text-sm text-gray-600">Satisfaction Rate</p>
        </div>
      </div>
    </div>
  </div>

  <!-- Top Questions and Weekly Stats -->
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
    <!-- Top Questions -->
    <div class="bg-white rounded-lg shadow-md p-6">
      <h3 class="text-lg font-semibold mb-4">Most Asked Questions</h3>
      <div class="space-y-4">
        {#each chatbotStats.topQuestions as question}
          <div class="flex justify-between items-center">
            <div class="flex-1">
              <p class="font-medium text-gray-900">{question.question}</p>
              <div class="w-full bg-gray-200 rounded-full h-2 mt-1">
                <div 
                  class="bg-primary h-2 rounded-full transition-all duration-300" 
                  style="width: {question.percentage}%"
                ></div>
              </div>
            </div>
            <div class="ml-4 text-right">
              <p class="text-sm font-semibold text-gray-900">{question.count}</p>
              <p class="text-xs text-gray-500">{question.percentage}%</p>
            </div>
          </div>
        {/each}
      </div>
    </div>

    <!-- Weekly Stats -->
    <div class="bg-white rounded-lg shadow-md p-6">
      <h3 class="text-lg font-semibold mb-4">Weekly Performance</h3>
      <div class="space-y-3">
        {#each chatbotStats.weeklyStats as stat}
          <div class="flex justify-between items-center">
            <span class="text-sm font-medium text-gray-700">{stat.day}</span>
            <div class="flex items-center space-x-4">
              <div class="text-sm">
                <span class="text-gray-600">{stat.conversations} conversations</span>
              </div>
              <div class="text-sm">
                <span class="text-green-600">{stat.resolved} resolved</span>
              </div>
              <div class="text-sm font-medium">
                {Math.round((stat.resolved / stat.conversations) * 100)}%
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>

  <!-- Recent Conversations -->
  <div class="bg-white rounded-lg shadow-md">
    <div class="p-6 border-b border-gray-200">
      <h3 class="text-lg font-semibold">Recent Conversations</h3>
    </div>
    <div class="overflow-x-auto">
      <table class="w-full">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Topic</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Satisfaction</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          {#each chatbotStats.recentConversations as conversation}
            <tr>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{conversation.timestamp}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{conversation.user}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{conversation.topic}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="text-xs px-2 py-1 rounded-full {getStatusColor(conversation.status)}">
                  {conversation.status}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {getSatisfactionStars(conversation.satisfaction)}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button class="text-primary hover:text-primary-dark">View Details</button>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>

  <!-- Settings Panel -->
  <div class="bg-white rounded-lg shadow-md p-6">
    <h3 class="text-lg font-semibold mb-4">Chatbot Settings</h3>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Welcome Message</label>
          <textarea 
            bind:value={chatbotSettings.welcomeMessage}
            rows="3"
            class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
          ></textarea>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Fallback Message</label>
          <textarea 
            bind:value={chatbotSettings.fallbackMessage}
            rows="2"
            class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
          ></textarea>
        </div>
      </div>
      
      <div class="space-y-4">
        <div>
          <h4 class="font-medium text-gray-900 mb-2">Business Hours</h4>
          <div class="space-y-2">
            <label class="flex items-center">
              <input 
                type="checkbox" 
                bind:checked={chatbotSettings.businessHours.enabled}
                class="mr-2"
              />
              <span class="text-sm">Enable business hours</span>
            </label>
            <div class="grid grid-cols-2 gap-2">
              <div>
                <label class="block text-xs text-gray-500">Start Time</label>
                <input 
                  type="time" 
                  bind:value={chatbotSettings.businessHours.start}
                  class="w-full border border-gray-300 rounded-md px-2 py-1 text-sm"
                />
              </div>
              <div>
                <label class="block text-xs text-gray-500">End Time</label>
                <input 
                  type="time" 
                  bind:value={chatbotSettings.businessHours.end}
                  class="w-full border border-gray-300 rounded-md px-2 py-1 text-sm"
                />
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <h4 class="font-medium text-gray-900 mb-2">Auto Escalation</h4>
          <div class="space-y-2">
            <label class="flex items-center">
              <input 
                type="checkbox" 
                bind:checked={chatbotSettings.autoEscalation.enabled}
                class="mr-2"
              />
              <span class="text-sm">Auto escalate to human</span>
            </label>
            <div>
              <label class="block text-xs text-gray-500">Escalation Threshold (failed attempts)</label>
              <input 
                type="number" 
                bind:value={chatbotSettings.autoEscalation.threshold}
                min="1"
                max="10"
                class="w-full border border-gray-300 rounded-md px-2 py-1 text-sm"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="mt-6 flex justify-end">
      <button 
        class="bg-primary hover:bg-primary-dark text-white py-2 px-6 rounded-md transition-colors"
        on:click={saveSettings}
      >
        Save Settings
      </button>
    </div>
  </div>
</div>
