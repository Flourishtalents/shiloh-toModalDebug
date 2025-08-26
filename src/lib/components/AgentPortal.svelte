<script>
  import { createEventDispatcher, onMount } from 'svelte';
  
  const dispatch = createEventDispatcher();
  export let user = null;
  
  let activeTab = 'dashboard';
  let agentProfile = null;
  let isAgent = false;
  let applicationStatus = 'not_applied'; // not_applied, pending, approved, rejected
  let showApplicationModal = false;
  let showWithdrawModal = false;
  
  // Agent application form data
  let applicationForm = {
    fullName: '',
    email: '',
    phone: '',
    country: '',
    city: '',
    experience: '',
    marketingChannels: [],
    websiteUrl: '',
    socialMedia: {
      facebook: '',
      instagram: '',
      twitter: '',
      youtube: '',
      tiktok: ''
    },
    businessLicense: '',
    preferredCommissionType: 'percentage',
    expectedMonthlyVolume: '',
    motivation: '',
    referenceName: '',
    referenceContact: '',
    agreeToTerms: false,
    agreeToMarketing: false
  };

  // Marketing channels options
  const marketingChannelOptions = [
    'Website/Blog',
    'Social Media',
    'Email Marketing',
    'YouTube Channel',
    'Travel Forums',
    'Travel Groups',
    'Word of Mouth',
    'Events/Tours',
    'Travel Agencies',
    'Influencer Partnerships',
    'Affiliate Networks',
    'Content Marketing'
  ];

  // Sample agent data (when approved)
  const sampleAgentData = {
    id: 'AGT-001',
    status: 'approved',
    joinDate: '2024-06-15',
    commissionRate: 12, // percentage
    totalEarnings: 3420,
    pendingEarnings: 580,
    totalBookings: 47,
    conversionRate: 8.3,
    clickCount: 1247,
    monthlyEarnings: 890,
    rank: 'Gold Agent',
    paymentInfo: {
      method: 'Bank Transfer',
      lastPayment: '2024-11-25',
      nextPayment: '2024-12-25'
    },
    performance: {
      thisMonth: { bookings: 8, earnings: 890, clicks: 234 },
      lastMonth: { bookings: 12, earnings: 1240, clicks: 289 },
      thisYear: { bookings: 47, earnings: 3420, clicks: 1247 }
    },
    referralCode: 'SHILOH-AGT001',
    customLinks: [
      { id: 1, name: 'Gorilla Trekking Special', url: '/gorilla?ref=AGT001', clicks: 234, conversions: 8 },
      { id: 2, name: 'Tour Packages', url: '/safari?ref=AGT001', clicks: 189, conversions: 5 },
      { id: 3, name: 'Group Travel Deals', url: '/groups?ref=AGT001', clicks: 156, conversions: 3 }
    ]
  };

  // Commission structure
  const commissionTiers = [
    { level: 'Bronze', minBookings: 0, commissionRate: 8, color: 'bg-orange-100 text-orange-800' },
    { level: 'Silver', minBookings: 10, commissionRate: 10, color: 'bg-gray-100 text-gray-800' },
    { level: 'Gold', minBookings: 25, commissionRate: 12, color: 'bg-yellow-100 text-yellow-800' },
    { level: 'Platinum', minBookings: 50, commissionRate: 15, color: 'bg-purple-100 text-purple-800' },
    { level: 'Diamond', minBookings: 100, commissionRate: 18, color: 'bg-blue-100 text-blue-800' }
  ];

  // Recent bookings
  const recentBookings = [
    {
      id: 'BK-001',
      customerName: 'John Smith',
      service: 'Gorilla Trekking Package',
      amount: 1200,
      commission: 144,
      date: '2024-11-26',
      status: 'confirmed',
      payoutDate: '2024-12-26'
    },
    {
      id: 'BK-002',
      customerName: 'Maria Garcia',
      service: 'Queen Elizabeth Safari',
      amount: 890,
      commission: 106.8,
      date: '2024-11-24',
      status: 'confirmed',
      payoutDate: '2024-12-24'
    },
    {
      id: 'BK-003',
      customerName: 'David Chen',
      service: 'Uganda Cultural Tour',
      amount: 650,
      commission: 78,
      date: '2024-11-22',
      status: 'pending',
      payoutDate: '2024-12-22'
    },
    {
      id: 'BK-004',
      customerName: 'Sarah Wilson',
      service: 'Accommodation Package',
      amount: 340,
      commission: 40.8,
      date: '2024-11-20',
      status: 'confirmed',
      payoutDate: '2024-12-20'
    }
  ];

  // Marketing materials
  const marketingMaterials = [
    {
      id: 1,
      type: 'banner',
      title: 'Gorilla Trekking - Large Banner',
      description: 'High-resolution banner for websites and blogs',
      dimensions: '728x90',
      format: 'PNG, JPG',
      downloads: 145,
      category: 'gorilla-trekking'
    },
    {
      id: 2,
      type: 'social',
      title: 'Instagram Story Template',
      description: 'Ready-to-use Instagram story templates',
      dimensions: '1080x1920',
      format: 'PSD, PNG',
      downloads: 89,
      category: 'social-media'
    },
    {
      id: 3,
      type: 'email',
      title: 'Email Newsletter Template',
      description: 'Professional email template for campaigns',
      dimensions: 'Responsive',
      format: 'HTML, PSD',
      downloads: 67,
      category: 'email-marketing'
    },
    {
      id: 4,
      type: 'video',
      title: 'Uganda Safari Promo Video',
      description: '30-second promotional video for social media',
      dimensions: '1920x1080',
      format: 'MP4, MOV',
      downloads: 234,
      category: 'video-content'
    },
    {
      id: 5,
      type: 'brochure',
      title: 'Uganda Travel Guide PDF',
      description: 'Comprehensive travel guide for sharing',
      dimensions: 'A4',
      format: 'PDF',
      downloads: 156,
      category: 'educational'
    }
  ];

  // Check agent status
  onMount(() => {
    if (user) {
      // Check if user is already an agent
      const agentStatus = localStorage.getItem(`agent_status_${user.id}`);
      const agentData = localStorage.getItem(`agent_data_${user.id}`);
      
      if (agentStatus) {
        applicationStatus = agentStatus;
        if (agentStatus === 'approved' && agentData) {
          isAgent = true;
          agentProfile = JSON.parse(agentData);
        }
      }
    }
  });

  function submitApplication() {
    if (!validateApplication()) return;
    
    // Save application
    localStorage.setItem(`agent_application_${user.id}`, JSON.stringify(applicationForm));
    localStorage.setItem(`agent_status_${user.id}`, 'pending');
    applicationStatus = 'pending';
    showApplicationModal = false;
    
    // In real app, would submit to backend
    alert('Application submitted successfully! We will review your application within 3-5 business days.');
  }

  function validateApplication() {
    if (!applicationForm.fullName || !applicationForm.email || !applicationForm.phone) {
      alert('Please fill in all required fields');
      return false;
    }
    
    if (!applicationForm.agreeToTerms) {
      alert('Please agree to the terms and conditions');
      return false;
    }
    
    if (applicationForm.marketingChannels.length === 0) {
      alert('Please select at least one marketing channel');
      return false;
    }
    
    return true;
  }

  function toggleMarketingChannel(channel) {
    if (applicationForm.marketingChannels.includes(channel)) {
      applicationForm.marketingChannels = applicationForm.marketingChannels.filter(c => c !== channel);
    } else {
      applicationForm.marketingChannels = [...applicationForm.marketingChannels, channel];
    }
  }

  function generateReferralLink(service = '') {
    if (!agentProfile) return '';
    const baseUrl = window.location.origin;
    const servicePath = service ? `/${service}` : '';
    return `${baseUrl}${servicePath}?ref=${agentProfile.referralCode}`;
  }

  function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
      alert('Copied to clipboard!');
    });
  }

  function downloadMaterial(material) {
    // Simulate download
    alert(`Downloading ${material.title}...`);
    // In real app, would trigger actual download
  }

  function requestWithdrawal() {
    if (!agentProfile) return;
    
    const amount = prompt(`Request withdrawal amount (Available: $${agentProfile.pendingEarnings})`);
    if (amount && parseFloat(amount) > 0 && parseFloat(amount) <= agentProfile.pendingEarnings) {
      alert(`Withdrawal request for $${amount} submitted successfully! Funds will be transferred within 3-5 business days.`);
      // In real app, would submit withdrawal request
    }
  }

  function getCurrentTier() {
    if (!agentProfile) return commissionTiers[0];
    
    const bookings = agentProfile.totalBookings;
    for (let i = commissionTiers.length - 1; i >= 0; i--) {
      if (bookings >= commissionTiers[i].minBookings) {
        return commissionTiers[i];
      }
    }
    return commissionTiers[0];
  }

  function getNextTier() {
    if (!agentProfile) return commissionTiers[1];
    
    const currentTier = getCurrentTier();
    const currentIndex = commissionTiers.findIndex(t => t.level === currentTier.level);
    return currentIndex < commissionTiers.length - 1 ? commissionTiers[currentIndex + 1] : null;
  }

  function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  }

  function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  // Simulate agent approval for demo purposes
  function simulateApproval() {
    localStorage.setItem(`agent_status_${user.id}`, 'approved');
    localStorage.setItem(`agent_data_${user.id}`, JSON.stringify(sampleAgentData));
    applicationStatus = 'approved';
    isAgent = true;
    agentProfile = sampleAgentData;
  }
</script>

<div class="pt-16 pb-8">
  <div class="container-custom">
    <!-- Header -->
    <div class="mb-8">
      <div class="flex items-center mb-4">
        <div class="bg-primary rounded-lg p-3 mr-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
          </svg>
        </div>
        <h1 class="text-4xl font-bold">Agent Portal</h1>
      </div>
      <p class="text-lg text-gray-600 max-w-3xl">
        Join our affiliate program and earn commissions by promoting Uganda's finest travel experiences. 
        Help travelers discover authentic adventures while building your income.
      </p>
    </div>

    {#if !user}
      <!-- Not Logged In -->
      <div class="bg-white rounded-lg shadow-md p-8 text-center">
        <div class="text-6xl mb-4">🔐</div>
        <h2 class="text-2xl font-bold mb-4">Login Required</h2>
        <p class="text-gray-600 mb-6">Please log in to access the Agent Portal and manage your affiliate marketing activities.</p>
        <button 
          class="bg-primary hover:bg-primary-dark text-white py-3 px-6 rounded-md transition-colors font-medium"
          on:click={() => dispatch('login')}
        >
          Login to Continue
        </button>
      </div>

    {:else if applicationStatus === 'not_applied'}
      <!-- Application Form -->
      <div class="bg-white rounded-lg shadow-md p-8">
        <div class="text-center mb-8">
          <div class="text-6xl mb-4">🚀</div>
          <h2 class="text-2xl font-bold mb-4">Become a Shiloh Experience Agent</h2>
          <p class="text-gray-600 max-w-2xl mx-auto">
            Join our exclusive network of travel affiliates and start earning up to 18% commission 
            on every booking you generate. No fees, no hidden costs - just pure earning potential.
          </p>
        </div>

        <!-- Benefits Section -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div class="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
            <div class="text-3xl mb-3">��</div>
            <h3 class="font-semibold mb-2">High Commissions</h3>
            <p class="text-sm text-gray-600">Earn 8-18% commission on all bookings with tiered rewards for top performers</p>
          </div>
          <div class="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
            <div class="text-3xl mb-3">🎯</div>
            <h3 class="font-semibold mb-2">Marketing Support</h3>
            <p class="text-sm text-gray-600">Access professional marketing materials, banners, and promotional content</p>
          </div>
          <div class="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
            <div class="text-3xl mb-3">📊</div>
            <h3 class="font-semibold mb-2">Real-time Analytics</h3>
            <p class="text-sm text-gray-600">Track clicks, conversions, and earnings with detailed performance reports</p>
          </div>
        </div>

        <!-- Commission Tiers -->
        <div class="mb-8">
          <h3 class="text-xl font-semibold mb-4">Commission Structure</h3>
          <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
            {#each commissionTiers as tier}
              <div class="text-center p-4 border border-gray-200 rounded-lg">
                <div class="px-3 py-1 rounded-full text-sm font-medium mb-2 {tier.color}">
                  {tier.level}
                </div>
                <div class="text-2xl font-bold text-primary mb-1">{tier.commissionRate}%</div>
                <div class="text-xs text-gray-600">{tier.minBookings}+ bookings</div>
              </div>
            {/each}
          </div>
        </div>

        <!-- Application CTA -->
        <div class="text-center">
          <button 
            class="bg-primary hover:bg-primary-dark text-white py-4 px-8 rounded-lg transition-colors font-semibold text-lg"
            on:click={() => showApplicationModal = true}
          >
            Apply to Become an Agent
          </button>
          <p class="text-sm text-gray-500 mt-2">Application review takes 3-5 business days</p>
        </div>

        <!-- Demo Button for Testing -->
        {#if user.email === 'admin@shilohexperience.com'}
          <div class="mt-4 text-center">
            <button 
              class="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md transition-colors text-sm"
              on:click={simulateApproval}
            >
              🔧 Simulate Approval (Admin Only)
            </button>
          </div>
        {/if}
      </div>

    {:else if applicationStatus === 'pending'}
      <!-- Pending Application -->
      <div class="bg-white rounded-lg shadow-md p-8 text-center">
        <div class="text-6xl mb-4">⏳</div>
        <h2 class="text-2xl font-bold mb-4">Application Under Review</h2>
        <p class="text-gray-600 mb-6">
          Thank you for your interest in becoming a Shiloh Experience Agent! 
          Our team is currently reviewing your application and will get back to you within 3-5 business days.
        </p>
        <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h3 class="font-semibold text-blue-800 mb-2">What happens next?</h3>
          <ul class="text-sm text-blue-700 space-y-1 text-left max-w-md mx-auto">
            <li>✅ Application received</li>
            <li>🔍 Background and experience verification</li>
            <li>📞 Reference check (if applicable)</li>
            <li>✅ Approval decision & agent setup</li>
          </ul>
        </div>
        <p class="text-sm text-gray-500">
          Questions? Contact us at <a href="mailto:agents@shilohexperience.com" class="text-primary">agents@shilohexperience.com</a>
        </p>
      </div>

    {:else if applicationStatus === 'rejected'}
      <!-- Rejected Application -->
      <div class="bg-white rounded-lg shadow-md p-8 text-center">
        <div class="text-6xl mb-4">❌</div>
        <h2 class="text-2xl font-bold mb-4">Application Not Approved</h2>
        <p class="text-gray-600 mb-6">
          Unfortunately, we are unable to approve your agent application at this time. 
          This could be due to various factors including market saturation in your region or specific requirements not being met.
        </p>
        <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <p class="text-sm text-yellow-700">
            You may reapply after 90 days. Focus on building your travel marketing experience and audience in the meantime.
          </p>
        </div>
        <button 
          class="bg-gray-600 hover:bg-gray-700 text-white py-3 px-6 rounded-md transition-colors font-medium"
          on:click={() => dispatch('navigate', { route: 'contact' })}
        >
          Contact Support
        </button>
      </div>

    {:else if applicationStatus === 'approved' && isAgent}
      <!-- Agent Dashboard -->
      <div class="space-y-8">
        <!-- Agent Stats -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div class="bg-white rounded-lg shadow-md p-6">
            <div class="flex items-center">
              <div class="p-3 bg-green-100 rounded-full">
                💰
              </div>
              <div class="ml-4">
                <h3 class="text-lg font-semibold text-gray-900">{formatCurrency(agentProfile.totalEarnings)}</h3>
                <p class="text-sm text-gray-600">Total Earnings</p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow-md p-6">
            <div class="flex items-center">
              <div class="p-3 bg-blue-100 rounded-full">
                📊
              </div>
              <div class="ml-4">
                <h3 class="text-lg font-semibold text-gray-900">{agentProfile.totalBookings}</h3>
                <p class="text-sm text-gray-600">Total Bookings</p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow-md p-6">
            <div class="flex items-center">
              <div class="p-3 bg-purple-100 rounded-full">
                🎯
              </div>
              <div class="ml-4">
                <h3 class="text-lg font-semibold text-gray-900">{agentProfile.conversionRate}%</h3>
                <p class="text-sm text-gray-600">Conversion Rate</p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow-md p-6">
            <div class="flex items-center">
              <div class="p-3 bg-orange-100 rounded-full">
                🏆
              </div>
              <div class="ml-4">
                <h3 class="text-lg font-semibold text-gray-900">{getCurrentTier().level}</h3>
                <p class="text-sm text-gray-600">{getCurrentTier().commissionRate}% Commission</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="bg-gradient-to-r from-primary to-primary-dark text-white rounded-lg p-6">
          <div class="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h3 class="text-xl font-bold mb-2">💸 Ready to Withdraw?</h3>
              <p class="text-primary-light">You have {formatCurrency(agentProfile.pendingEarnings)} available for withdrawal</p>
            </div>
            <div class="mt-4 md:mt-0 flex space-x-3">
              <button 
                class="bg-white text-primary hover:bg-gray-100 py-2 px-4 rounded-md transition-colors font-medium"
                on:click={requestWithdrawal}
              >
                Request Withdrawal
              </button>
              <button 
                class="bg-white/20 hover:bg-white/30 text-white py-2 px-4 rounded-md transition-colors font-medium"
                on:click={() => activeTab = 'earnings'}
              >
                View Details
              </button>
            </div>
          </div>
        </div>

        <!-- Navigation Tabs -->
        <div class="bg-white shadow-md rounded-lg">
          <div class="flex border-b border-gray-200 overflow-x-auto">
            <button 
              class="px-6 py-4 font-medium transition-colors whitespace-nowrap {activeTab === 'dashboard' ? 'border-b-2 border-primary text-primary' : 'text-gray-600 hover:text-primary'}"
              on:click={() => activeTab = 'dashboard'}
            >
              📊 Dashboard
            </button>
            <button 
              class="px-6 py-4 font-medium transition-colors whitespace-nowrap {activeTab === 'links' ? 'border-b-2 border-primary text-primary' : 'text-gray-600 hover:text-primary'}"
              on:click={() => activeTab = 'links'}
            >
              🔗 Referral Links
            </button>
            <button 
              class="px-6 py-4 font-medium transition-colors whitespace-nowrap {activeTab === 'earnings' ? 'border-b-2 border-primary text-primary' : 'text-gray-600 hover:text-primary'}"
              on:click={() => activeTab = 'earnings'}
            >
              💰 Earnings
            </button>
            <button 
              class="px-6 py-4 font-medium transition-colors whitespace-nowrap {activeTab === 'materials' ? 'border-b-2 border-primary text-primary' : 'text-gray-600 hover:text-primary'}"
              on:click={() => activeTab = 'materials'}
            >
              🎨 Marketing Materials
            </button>
            <button 
              class="px-6 py-4 font-medium transition-colors whitespace-nowrap {activeTab === 'profile' ? 'border-b-2 border-primary text-primary' : 'text-gray-600 hover:text-primary'}"
              on:click={() => activeTab = 'profile'}
            >
              👤 Profile
            </button>
          </div>
        </div>

        <!-- Tab Content -->
        {#if activeTab === 'dashboard'}
          <!-- Dashboard Tab -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <!-- Performance Chart -->
            <div class="bg-white rounded-lg shadow-md p-6">
              <h3 class="text-lg font-semibold mb-4">Performance Overview</h3>
              <div class="space-y-4">
                <div class="flex justify-between items-center">
                  <span class="text-gray-600">This Month</span>
                  <div class="text-right">
                    <div class="font-semibold">{agentProfile.performance.thisMonth.bookings} bookings</div>
                    <div class="text-sm text-gray-500">{formatCurrency(agentProfile.performance.thisMonth.earnings)}</div>
                  </div>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-gray-600">Last Month</span>
                  <div class="text-right">
                    <div class="font-semibold">{agentProfile.performance.lastMonth.bookings} bookings</div>
                    <div class="text-sm text-gray-500">{formatCurrency(agentProfile.performance.lastMonth.earnings)}</div>
                  </div>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-gray-600">This Year</span>
                  <div class="text-right">
                    <div class="font-semibold">{agentProfile.performance.thisYear.bookings} bookings</div>
                    <div class="text-sm text-gray-500">{formatCurrency(agentProfile.performance.thisYear.earnings)}</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Commission Tier Progress -->
            <div class="bg-white rounded-lg shadow-md p-6">
              <h3 class="text-lg font-semibold mb-4">Commission Tier Progress</h3>
              <div class="text-center mb-4">
                <div class="text-3xl font-bold text-primary mb-1">{getCurrentTier().level}</div>
                <div class="text-gray-600">Current Tier - {getCurrentTier().commissionRate}% Commission</div>
              </div>
              
              {#if getNextTier()}
                {@const nextTier = getNextTier()}
                {@const progress = (agentProfile.totalBookings / nextTier.minBookings) * 100}
                <div class="mb-4">
                  <div class="flex justify-between text-sm mb-1">
                    <span>Progress to {nextTier.level}</span>
                    <span>{agentProfile.totalBookings}/{nextTier.minBookings} bookings</span>
                  </div>
                  <div class="w-full bg-gray-200 rounded-full h-2">
                    <div class="bg-primary h-2 rounded-full transition-all duration-300" style="width: {Math.min(progress, 100)}%"></div>
                  </div>
                </div>
                <p class="text-sm text-gray-600 text-center">
                  {nextTier.minBookings - agentProfile.totalBookings} more bookings to reach {nextTier.level} tier ({nextTier.commissionRate}% commission)
                </p>
              {:else}
                <p class="text-sm text-gray-600 text-center">🏆 Congratulations! You've reached the highest tier.</p>
              {/if}
            </div>
          </div>

          <!-- Recent Bookings -->
          <div class="bg-white rounded-lg shadow-md">
            <div class="p-6 border-b border-gray-200">
              <h3 class="text-lg font-semibold">Recent Bookings</h3>
            </div>
            <div class="overflow-x-auto">
              <table class="w-full">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Service</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Commission</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  {#each recentBookings.slice(0, 5) as booking}
                    <tr>
                      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {booking.customerName}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {booking.service}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatCurrency(booking.amount)}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600">
                        {formatCurrency(booking.commission)}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatDate(booking.date)}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <span class="text-xs px-2 py-1 rounded-full {booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}">
                          {booking.status}
                        </span>
                      </td>
                    </tr>
                  {/each}
                </tbody>
              </table>
            </div>
          </div>

        {:else if activeTab === 'links'}
          <!-- Referral Links Tab -->
          <div class="space-y-6">
            <!-- Main Referral Code -->
            <div class="bg-white rounded-lg shadow-md p-6">
              <h3 class="text-lg font-semibold mb-4">Your Referral Code</h3>
              <div class="bg-gray-50 p-4 rounded-lg border-2 border-dashed border-gray-300">
                <div class="text-center">
                  <div class="text-2xl font-bold text-primary mb-2">{agentProfile.referralCode}</div>
                  <p class="text-sm text-gray-600 mb-4">Use this code in all your marketing materials</p>
                  <button 
                    class="bg-primary hover:bg-primary-dark text-white py-2 px-4 rounded-md transition-colors"
                    on:click={() => copyToClipboard(agentProfile.referralCode)}
                  >
                    Copy Code
                  </button>
                </div>
              </div>
            </div>

            <!-- Quick Link Generator -->
            <div class="bg-white rounded-lg shadow-md p-6">
              <h3 class="text-lg font-semibold mb-4">Generate Referral Links</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {#each ['home', 'accommodations', 'tours', 'transport', 'group-travel', 'store'] as page}
                  <div class="border border-gray-200 rounded-lg p-4">
                    <h4 class="font-medium mb-2 capitalize">{page.replace('-', ' ')}</h4>
                    <div class="text-xs text-gray-600 mb-3 break-all">
                      {generateReferralLink(page)}
                    </div>
                    <button 
                      class="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-3 rounded-md transition-colors text-sm"
                      on:click={() => copyToClipboard(generateReferralLink(page))}
                    >
                      Copy Link
                    </button>
                  </div>
                {/each}
              </div>
            </div>

            <!-- Custom Links Performance -->
            <div class="bg-white rounded-lg shadow-md">
              <div class="p-6 border-b border-gray-200">
                <h3 class="text-lg font-semibold">Link Performance</h3>
              </div>
              <div class="overflow-x-auto">
                <table class="w-full">
                  <thead class="bg-gray-50">
                    <tr>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Link Name</th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">URL</th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Clicks</th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Conversions</th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Conversion Rate</th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200">
                    {#each agentProfile.customLinks as link}
                      <tr>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {link.name}
                        </td>
                        <td class="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">
                          {link.url}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {link.clicks}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {link.conversions}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          {link.clicks > 0 ? ((link.conversions / link.clicks) * 100).toFixed(1) : 0}%
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button 
                            class="text-primary hover:text-primary-dark"
                            on:click={() => copyToClipboard(link.url)}
                          >
                            Copy
                          </button>
                        </td>
                      </tr>
                    {/each}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        {:else if activeTab === 'earnings'}
          <!-- Earnings Tab -->
          <div class="space-y-6">
            <!-- Earnings Summary -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div class="bg-white rounded-lg shadow-md p-6">
                <h3 class="text-lg font-semibold mb-4">💰 Total Earnings</h3>
                <div class="text-3xl font-bold text-green-600 mb-2">{formatCurrency(agentProfile.totalEarnings)}</div>
                <p class="text-sm text-gray-600">Since {formatDate(agentProfile.joinDate)}</p>
              </div>
              
              <div class="bg-white rounded-lg shadow-md p-6">
                <h3 class="text-lg font-semibold mb-4">⏳ Pending</h3>
                <div class="text-3xl font-bold text-orange-600 mb-2">{formatCurrency(agentProfile.pendingEarnings)}</div>
                <p class="text-sm text-gray-600">Available for withdrawal</p>
              </div>
              
              <div class="bg-white rounded-lg shadow-md p-6">
                <h3 class="text-lg font-semibold mb-4">📅 This Month</h3>
                <div class="text-3xl font-bold text-blue-600 mb-2">{formatCurrency(agentProfile.monthlyEarnings)}</div>
                <p class="text-sm text-gray-600">{agentProfile.performance.thisMonth.bookings} bookings</p>
              </div>
            </div>

            <!-- Payment Information -->
            <div class="bg-white rounded-lg shadow-md p-6">
              <h3 class="text-lg font-semibold mb-4">💳 Payment Information</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p class="text-sm text-gray-600 mb-1">Payment Method</p>
                  <p class="font-medium">{agentProfile.paymentInfo.method}</p>
                </div>
                <div>
                  <p class="text-sm text-gray-600 mb-1">Last Payment</p>
                  <p class="font-medium">{formatDate(agentProfile.paymentInfo.lastPayment)}</p>
                </div>
                <div>
                  <p class="text-sm text-gray-600 mb-1">Next Payment</p>
                  <p class="font-medium">{formatDate(agentProfile.paymentInfo.nextPayment)}</p>
                </div>
                <div>
                  <p class="text-sm text-gray-600 mb-1">Commission Rate</p>
                  <p class="font-medium">{agentProfile.commissionRate}%</p>
                </div>
              </div>
              <div class="mt-6">
                <button 
                  class="bg-primary hover:bg-primary-dark text-white py-2 px-4 rounded-md transition-colors"
                  on:click={requestWithdrawal}
                >
                  Request Withdrawal
                </button>
              </div>
            </div>

            <!-- Detailed Earnings -->
            <div class="bg-white rounded-lg shadow-md">
              <div class="p-6 border-b border-gray-200">
                <h3 class="text-lg font-semibold">Earnings History</h3>
              </div>
              <div class="overflow-x-auto">
                <table class="w-full">
                  <thead class="bg-gray-50">
                    <tr>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Booking ID</th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Service</th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Booking Value</th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Commission</th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Payout Date</th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200">
                    {#each recentBookings as booking}
                      <tr>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {booking.id}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {booking.customerName}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {booking.service}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatCurrency(booking.amount)}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600">
                          {formatCurrency(booking.commission)}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatDate(booking.payoutDate)}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                          <span class="text-xs px-2 py-1 rounded-full {booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}">
                            {booking.status}
                          </span>
                        </td>
                      </tr>
                    {/each}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        {:else if activeTab === 'materials'}
          <!-- Marketing Materials Tab -->
          <div class="space-y-6">
            <div class="bg-white rounded-lg shadow-md p-6">
              <h3 class="text-lg font-semibold mb-4">🎨 Marketing Materials</h3>
              <p class="text-gray-600 mb-6">
                Download professional marketing materials to promote Shiloh Experience services. 
                All materials are optimized for different platforms and include your referral tracking.
              </p>
              
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {#each marketingMaterials as material}
                  <div class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div class="flex items-start justify-between mb-3">
                      <div class="p-2 bg-primary-light/10 rounded-lg">
                        {#if material.type === 'banner'}
                          🖼️
                        {:else if material.type === 'social'}
                          📱
                        {:else if material.type === 'email'}
                          📧
                        {:else if material.type === 'video'}
                          🎥
                        {:else}
                          📄
                        {/if}
                      </div>
                      <span class="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                        {material.downloads} downloads
                      </span>
                    </div>
                    
                    <h4 class="font-semibold mb-2">{material.title}</h4>
                    <p class="text-sm text-gray-600 mb-3">{material.description}</p>
                    
                    <div class="text-xs text-gray-500 mb-4">
                      <div>Format: {material.format}</div>
                      <div>Size: {material.dimensions}</div>
                    </div>
                    
                    <button 
                      class="w-full bg-primary hover:bg-primary-dark text-white py-2 px-4 rounded-md transition-colors text-sm"
                      on:click={() => downloadMaterial(material)}
                    >
                      Download
                    </button>
                  </div>
                {/each}
              </div>
            </div>

            <!-- Usage Guidelines -->
            <div class="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h4 class="font-semibold text-blue-800 mb-3">📋 Usage Guidelines</h4>
              <ul class="text-sm text-blue-700 space-y-2">
                <li>• Always include your referral code or link when using materials</li>
                <li>• Do not modify logos or brand elements without permission</li>
                <li>• Ensure all claims about services are accurate and up-to-date</li>
                <li>• Follow platform-specific guidelines when posting on social media</li>
                <li>• Contact support for custom materials or special requests</li>
              </ul>
            </div>
          </div>

        {:else if activeTab === 'profile'}
          <!-- Profile Tab -->
          <div class="bg-white rounded-lg shadow-md p-6">
            <h3 class="text-lg font-semibold mb-6">👤 Agent Profile</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 class="font-medium mb-4">Basic Information</h4>
                <div class="space-y-3">
                  <div>
                    <label class="block text-sm text-gray-600 mb-1">Agent ID</label>
                    <div class="font-medium">{agentProfile.id}</div>
                  </div>
                  <div>
                    <label class="block text-sm text-gray-600 mb-1">Join Date</label>
                    <div class="font-medium">{formatDate(agentProfile.joinDate)}</div>
                  </div>
                  <div>
                    <label class="block text-sm text-gray-600 mb-1">Status</label>
                    <span class="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                      {agentProfile.status}
                    </span>
                  </div>
                  <div>
                    <label class="block text-sm text-gray-600 mb-1">Current Tier</label>
                    <span class="px-3 py-1 rounded-full text-sm {getCurrentTier().color}">
                      {getCurrentTier().level}
                    </span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 class="font-medium mb-4">Performance Metrics</h4>
                <div class="space-y-3">
                  <div>
                    <label class="block text-sm text-gray-600 mb-1">Total Bookings</label>
                    <div class="font-medium">{agentProfile.totalBookings}</div>
                  </div>
                  <div>
                    <label class="block text-sm text-gray-600 mb-1">Conversion Rate</label>
                    <div class="font-medium">{agentProfile.conversionRate}%</div>
                  </div>
                  <div>
                    <label class="block text-sm text-gray-600 mb-1">Total Clicks</label>
                    <div class="font-medium">{agentProfile.clickCount.toLocaleString()}</div>
                  </div>
                  <div>
                    <label class="block text-sm text-gray-600 mb-1">Commission Rate</label>
                    <div class="font-medium">{agentProfile.commissionRate}%</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="mt-8">
              <button class="bg-primary hover:bg-primary-dark text-white py-2 px-4 rounded-md transition-colors">
                Update Profile
              </button>
            </div>
          </div>
        {/if}
      </div>
    {/if}
  </div>
</div>

<!-- Application Modal -->
{#if showApplicationModal}
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
      <div class="p-6">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold">Agent Application</h2>
          <button 
            class="text-gray-500 hover:text-gray-700 p-2"
            on:click={() => showApplicationModal = false}
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div class="space-y-6">
          <!-- Personal Information -->
          <div>
            <h3 class="text-lg font-semibold mb-4">Personal Information</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                <input 
                  type="text" 
                  bind:value={applicationForm.fullName}
                  class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                <input 
                  type="email" 
                  bind:value={applicationForm.email}
                  class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                <input 
                  type="tel" 
                  bind:value={applicationForm.phone}
                  class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Country *</label>
                <input 
                  type="text" 
                  bind:value={applicationForm.country}
                  class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>
          </div>

          <!-- Marketing Experience -->
          <div>
            <h3 class="text-lg font-semibold mb-4">Marketing Experience</h3>
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Marketing Channels *</label>
                <div class="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {#each marketingChannelOptions as channel}
                    <label class="flex items-center">
                      <input 
                        type="checkbox" 
                        class="mr-2"
                        checked={applicationForm.marketingChannels.includes(channel)}
                        on:change={() => toggleMarketingChannel(channel)}
                      />
                      <span class="text-sm">{channel}</span>
                    </label>
                  {/each}
                </div>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Website/Blog URL</label>
                <input 
                  type="url" 
                  bind:value={applicationForm.websiteUrl}
                  placeholder="https://your-website.com"
                  class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Marketing Experience</label>
                <textarea 
                  bind:value={applicationForm.experience}
                  rows="3"
                  placeholder="Describe your marketing experience, audience size, and relevant achievements..."
                  class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                ></textarea>
              </div>
            </div>
          </div>

          <!-- Social Media -->
          <div>
            <h3 class="text-lg font-semibold mb-4">Social Media Presence</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Facebook</label>
                <input 
                  type="url" 
                  bind:value={applicationForm.socialMedia.facebook}
                  placeholder="https://facebook.com/yourpage"
                  class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Instagram</label>
                <input 
                  type="url" 
                  bind:value={applicationForm.socialMedia.instagram}
                  placeholder="https://instagram.com/youraccount"
                  class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">YouTube</label>
                <input 
                  type="url" 
                  bind:value={applicationForm.socialMedia.youtube}
                  placeholder="https://youtube.com/yourchannel"
                  class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">TikTok</label>
                <input 
                  type="url" 
                  bind:value={applicationForm.socialMedia.tiktok}
                  placeholder="https://tiktok.com/@youraccount"
                  class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>
          </div>

          <!-- Motivation -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Why do you want to become a Shiloh Experience agent?</label>
            <textarea 
              bind:value={applicationForm.motivation}
              rows="3"
              placeholder="Tell us about your motivation and how you plan to promote our services..."
              class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
            ></textarea>
          </div>

          <!-- Terms and Conditions -->
          <div class="space-y-3">
            <label class="flex items-start">
              <input 
                type="checkbox" 
                bind:checked={applicationForm.agreeToTerms}
                class="mt-1 mr-3"
              />
              <span class="text-sm">
                I agree to the <a href="#" class="text-primary hover:underline">Agent Terms and Conditions</a> 
                and understand the commission structure and payment terms. *
              </span>
            </label>
            
            <label class="flex items-start">
              <input 
                type="checkbox" 
                bind:checked={applicationForm.agreeToMarketing}
                class="mt-1 mr-3"
              />
              <span class="text-sm">
                I agree to receive marketing communications and updates about the agent program.
              </span>
            </label>
          </div>

          <!-- Submit Button -->
          <div class="flex justify-end space-x-3 pt-6 border-t border-gray-200">
            <button 
              class="px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              on:click={() => showApplicationModal = false}
            >
              Cancel
            </button>
            <button 
              class="px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-md transition-colors font-medium"
              on:click={submitApplication}
            >
              Submit Application
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}
