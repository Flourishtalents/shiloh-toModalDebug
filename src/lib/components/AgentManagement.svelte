<script>
  export let user = null;
  
  let activeTab = 'applications';
  let selectedApplication = null;
  let showApplicationModal = false;
  
  // Sample agent applications data
  let applications = [
    {
      id: 'APP-001',
      applicantName: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      phone: '+1-555-0123',
      country: 'United States',
      city: 'New York',
      applicationDate: '2024-11-25',
      status: 'pending',
      experience: 'Travel blogger with 50k+ followers across social media platforms. 5 years experience in affiliate marketing.',
      marketingChannels: ['Website/Blog', 'Social Media', 'Email Marketing', 'Influencer Partnerships'],
      websiteUrl: 'https://sarahtravels.com',
      socialMedia: {
        facebook: 'https://facebook.com/sarahtravels',
        instagram: 'https://instagram.com/sarah_travels',
        youtube: 'https://youtube.com/sarahtravels'
      },
      expectedVolume: '$10,000-25,000',
      motivation: 'I love Uganda and want to share authentic travel experiences with my audience. My followers trust my recommendations and I believe Shiloh Experience offers exactly what they\'re looking for.',
      score: 85
    },
    {
      id: 'APP-002',
      applicantName: 'Mike Chen',
      email: 'mike.chen@email.com',
      phone: '+44-20-1234-5678',
      country: 'United Kingdom',
      city: 'London',
      applicationDate: '2024-11-23',
      status: 'pending',
      experience: 'Professional photographer and travel content creator. Work with luxury travel brands and have experience promoting African destinations.',
      marketingChannels: ['Social Media', 'YouTube Channel', 'Content Marketing', 'Travel Forums'],
      websiteUrl: 'https://mikechenphotography.com',
      socialMedia: {
        instagram: 'https://instagram.com/mikechenphotos',
        youtube: 'https://youtube.com/mikechenphotography'
      },
      expectedVolume: '$25,000-50,000',
      motivation: 'As a travel photographer, I want to promote ethical and sustainable tourism in Africa. Shiloh Experience aligns with my values.',
      score: 92
    },
    {
      id: 'APP-003',
      applicantName: 'Emma Wilson',
      email: 'emma.wilson@email.com',
      phone: '+61-2-9876-5432',
      country: 'Australia',
      city: 'Sydney',
      applicationDate: '2024-11-20',
      status: 'approved',
      experience: 'Travel agency owner with 10+ years experience. Specialize in African safaris and adventure tourism.',
      marketingChannels: ['Travel Agencies', 'Website/Blog', 'Word of Mouth', 'Events/Tours'],
      websiteUrl: 'https://wilsonadventures.com.au',
      expectedVolume: '$50,000+',
      motivation: 'We want to add Uganda to our safari offerings and believe Shiloh Experience would be a perfect partner.',
      score: 96,
      approvedDate: '2024-11-22',
      agentId: 'AGT-003'
    },
    {
      id: 'APP-004',
      applicantName: 'David Rodriguez',
      email: 'david@email.com',
      phone: '+34-91-123-4567',
      country: 'Spain',
      city: 'Madrid',
      applicationDate: '2024-11-18',
      status: 'rejected',
      experience: 'New to affiliate marketing, interested in travel promotion.',
      marketingChannels: ['Social Media'],
      expectedVolume: '$1,000-5,000',
      motivation: 'Want to make money promoting travel.',
      score: 35,
      rejectedDate: '2024-11-21',
      rejectionReason: 'Insufficient marketing experience and limited channels'
    }
  ];

  // Active agents data
  let activeAgents = [
    {
      id: 'AGT-001',
      name: 'John Smith',
      email: 'john.smith@email.com',
      country: 'Canada',
      joinDate: '2024-06-15',
      status: 'active',
      tier: 'Gold',
      commissionRate: 12,
      totalEarnings: 5420,
      monthlyEarnings: 1240,
      totalBookings: 67,
      conversionRate: 8.9,
      performance: 'excellent'
    },
    {
      id: 'AGT-002',
      name: 'Maria Garcia',
      email: 'maria.garcia@email.com',
      country: 'Mexico',
      joinDate: '2024-08-20',
      status: 'active',
      tier: 'Silver',
      commissionRate: 10,
      totalEarnings: 2150,
      monthlyEarnings: 890,
      totalBookings: 23,
      conversionRate: 6.2,
      performance: 'good'
    },
    {
      id: 'AGT-003',
      name: 'Emma Wilson',
      email: 'emma.wilson@email.com',
      country: 'Australia',
      joinDate: '2024-11-22',
      status: 'active',
      tier: 'Bronze',
      commissionRate: 8,
      totalEarnings: 320,
      monthlyEarnings: 320,
      totalBookings: 4,
      conversionRate: 12.5,
      performance: 'excellent'
    }
  ];

  // Agent statistics
  let agentStats = {
    totalApplications: applications.length,
    pendingApplications: applications.filter(a => a.status === 'pending').length,
    approvedApplications: applications.filter(a => a.status === 'approved').length,
    rejectedApplications: applications.filter(a => a.status === 'rejected').length,
    activeAgents: activeAgents.length,
    totalAgentEarnings: activeAgents.reduce((sum, agent) => sum + agent.totalEarnings, 0),
    avgConversionRate: activeAgents.reduce((sum, agent) => sum + agent.conversionRate, 0) / activeAgents.length,
    topPerformer: activeAgents.sort((a, b) => b.totalEarnings - a.totalEarnings)[0]
  };

  function viewApplication(application) {
    selectedApplication = application;
    showApplicationModal = true;
  }

  function closeApplicationModal() {
    selectedApplication = null;
    showApplicationModal = false;
  }

  function approveApplication(applicationId) {
    const application = applications.find(a => a.id === applicationId);
    if (application) {
      application.status = 'approved';
      application.approvedDate = new Date().toISOString().split('T')[0];
      application.agentId = `AGT-${String(activeAgents.length + 1).padStart(3, '0')}`;
      
      // Add to active agents
      activeAgents = [...activeAgents, {
        id: application.agentId,
        name: application.applicantName,
        email: application.email,
        country: application.country,
        joinDate: application.approvedDate,
        status: 'active',
        tier: 'Bronze',
        commissionRate: 8,
        totalEarnings: 0,
        monthlyEarnings: 0,
        totalBookings: 0,
        conversionRate: 0,
        performance: 'new'
      }];
      
      applications = [...applications];
      updateStats();
      closeApplicationModal();
      
      alert(`Application approved! Agent ID ${application.agentId} assigned to ${application.applicantName}.`);
    }
  }

  function rejectApplication(applicationId, reason = '') {
    const application = applications.find(a => a.id === applicationId);
    if (application) {
      application.status = 'rejected';
      application.rejectedDate = new Date().toISOString().split('T')[0];
      application.rejectionReason = reason || 'Application does not meet current requirements';
      
      applications = [...applications];
      updateStats();
      closeApplicationModal();
      
      alert(`Application rejected. Rejection email will be sent to ${application.email}.`);
    }
  }

  function suspendAgent(agentId) {
    const agent = activeAgents.find(a => a.id === agentId);
    if (agent && confirm(`Are you sure you want to suspend agent ${agent.name}?`)) {
      agent.status = 'suspended';
      activeAgents = [...activeAgents];
      updateStats();
    }
  }

  function updateCommissionRate(agentId, newRate) {
    const agent = activeAgents.find(a => a.id === agentId);
    if (agent) {
      agent.commissionRate = newRate;
      activeAgents = [...activeAgents];
    }
  }

  function updateStats() {
    agentStats = {
      totalApplications: applications.length,
      pendingApplications: applications.filter(a => a.status === 'pending').length,
      approvedApplications: applications.filter(a => a.status === 'approved').length,
      rejectedApplications: applications.filter(a => a.status === 'rejected').length,
      activeAgents: activeAgents.filter(a => a.status === 'active').length,
      totalAgentEarnings: activeAgents.reduce((sum, agent) => sum + agent.totalEarnings, 0),
      avgConversionRate: activeAgents.length > 0 ? activeAgents.reduce((sum, agent) => sum + agent.conversionRate, 0) / activeAgents.length : 0,
      topPerformer: activeAgents.sort((a, b) => b.totalEarnings - a.totalEarnings)[0]
    };
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

  function getStatusColor(status) {
    switch(status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'active': return 'bg-green-100 text-green-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }

  function getTierColor(tier) {
    switch(tier) {
      case 'Bronze': return 'bg-orange-100 text-orange-800';
      case 'Silver': return 'bg-gray-100 text-gray-800';
      case 'Gold': return 'bg-yellow-100 text-yellow-800';
      case 'Platinum': return 'bg-purple-100 text-purple-800';
      case 'Diamond': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }

  function getPerformanceColor(performance) {
    switch(performance) {
      case 'excellent': return 'text-green-600';
      case 'good': return 'text-blue-600';
      case 'average': return 'text-yellow-600';
      case 'poor': return 'text-red-600';
      case 'new': return 'text-gray-600';
      default: return 'text-gray-600';
    }
  }

  function getScoreColor(score) {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  }
</script>

<div class="space-y-8">
  <!-- Header -->
  <div class="flex justify-between items-center">
    <div>
      <h2 class="text-2xl font-bold text-gray-900">🤝 Agent Management</h2>
      <p class="text-gray-600">Manage affiliate applications, approvals, and agent performance</p>
    </div>
    <div class="text-right">
      <div class="text-sm text-gray-500">Total Agent Earnings</div>
      <div class="text-2xl font-bold text-green-600">{formatCurrency(agentStats.totalAgentEarnings)}</div>
    </div>
  </div>

  <!-- Stats Cards -->
  <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
    <div class="bg-white rounded-lg shadow-md p-6">
      <div class="flex items-center">
        <div class="p-3 bg-blue-100 rounded-full">
          📋
        </div>
        <div class="ml-4">
          <h3 class="text-lg font-semibold text-gray-900">{agentStats.totalApplications}</h3>
          <p class="text-sm text-gray-600">Total Applications</p>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-md p-6">
      <div class="flex items-center">
        <div class="p-3 bg-yellow-100 rounded-full">
          ⏳
        </div>
        <div class="ml-4">
          <h3 class="text-lg font-semibold text-gray-900">{agentStats.pendingApplications}</h3>
          <p class="text-sm text-gray-600">Pending Review</p>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-md p-6">
      <div class="flex items-center">
        <div class="p-3 bg-green-100 rounded-full">
          ✅
        </div>
        <div class="ml-4">
          <h3 class="text-lg font-semibold text-gray-900">{agentStats.activeAgents}</h3>
          <p class="text-sm text-gray-600">Active Agents</p>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-md p-6">
      <div class="flex items-center">
        <div class="p-3 bg-purple-100 rounded-full">
          📊
        </div>
        <div class="ml-4">
          <h3 class="text-lg font-semibold text-gray-900">{agentStats.avgConversionRate.toFixed(1)}%</h3>
          <p class="text-sm text-gray-600">Avg Conversion</p>
        </div>
      </div>
    </div>
  </div>

  <!-- Quick Actions -->
  {#if agentStats.pendingApplications > 0}
    <div class="bg-orange-50 border border-orange-200 rounded-lg p-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <div class="p-2 bg-orange-100 rounded-full mr-3">
            ⚡
          </div>
          <div>
            <h3 class="font-semibold text-orange-800">Action Required</h3>
            <p class="text-sm text-orange-600">{agentStats.pendingApplications} applications awaiting review</p>
          </div>
        </div>
        <button 
          class="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-md transition-colors"
          on:click={() => activeTab = 'applications'}
        >
          Review Applications
        </button>
      </div>
    </div>
  {/if}

  <!-- Navigation Tabs -->
  <div class="bg-white shadow-md rounded-lg">
    <div class="flex border-b border-gray-200">
      <button 
        class="px-6 py-4 font-medium transition-colors {activeTab === 'applications' ? 'border-b-2 border-primary text-primary' : 'text-gray-600 hover:text-primary'}"
        on:click={() => activeTab = 'applications'}
      >
        📋 Applications ({agentStats.pendingApplications})
      </button>
      <button 
        class="px-6 py-4 font-medium transition-colors {activeTab === 'agents' ? 'border-b-2 border-primary text-primary' : 'text-gray-600 hover:text-primary'}"
        on:click={() => activeTab = 'agents'}
      >
        🤝 Active Agents ({agentStats.activeAgents})
      </button>
      <button 
        class="px-6 py-4 font-medium transition-colors {activeTab === 'performance' ? 'border-b-2 border-primary text-primary' : 'text-gray-600 hover:text-primary'}"
        on:click={() => activeTab = 'performance'}
      >
        📊 Performance
      </button>
      <button 
        class="px-6 py-4 font-medium transition-colors {activeTab === 'settings' ? 'border-b-2 border-primary text-primary' : 'text-gray-600 hover:text-primary'}"
        on:click={() => activeTab = 'settings'}
      >
        ⚙️ Settings
      </button>
    </div>
  </div>

  <!-- Tab Content -->
  {#if activeTab === 'applications'}
    <!-- Applications Tab -->
    <div class="bg-white rounded-lg shadow-md">
      <div class="p-6 border-b border-gray-200">
        <h3 class="text-lg font-semibold">Agent Applications</h3>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Applicant</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Country</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Experience</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Channels</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Score</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            {#each applications as application}
              <tr>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div class="text-sm font-medium text-gray-900">{application.applicantName}</div>
                    <div class="text-sm text-gray-500">{application.email}</div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{application.country}</td>
                <td class="px-6 py-4">
                  <div class="text-sm text-gray-900 max-w-xs truncate">{application.experience}</div>
                  <div class="text-sm text-gray-500">{application.expectedVolume}</div>
                </td>
                <td class="px-6 py-4">
                  <div class="text-sm text-gray-900">{application.marketingChannels.length} channels</div>
                  <div class="text-xs text-gray-500">{application.marketingChannels.slice(0, 2).join(', ')}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="text-sm font-semibold {getScoreColor(application.score)}">
                    {application.score}/100
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatDate(application.applicationDate)}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="text-xs px-2 py-1 rounded-full {getStatusColor(application.status)}">
                    {application.status}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <button 
                    class="text-primary hover:text-primary-dark"
                    on:click={() => viewApplication(application)}
                  >
                    Review
                  </button>
                  {#if application.status === 'pending'}
                    <button 
                      class="text-green-600 hover:text-green-700"
                      on:click={() => approveApplication(application.id)}
                    >
                      Approve
                    </button>
                    <button 
                      class="text-red-600 hover:text-red-700"
                      on:click={() => rejectApplication(application.id)}
                    >
                      Reject
                    </button>
                  {/if}
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>

  {:else if activeTab === 'agents'}
    <!-- Active Agents Tab -->
    <div class="bg-white rounded-lg shadow-md">
      <div class="p-6 border-b border-gray-200">
        <h3 class="text-lg font-semibold">Active Agents</h3>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Agent</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Country</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tier</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Commission</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Bookings</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Earnings</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Conversion</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            {#each activeAgents as agent}
              <tr>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div class="text-sm font-medium text-gray-900">{agent.name}</div>
                    <div class="text-sm text-gray-500">{agent.id}</div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{agent.country}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="text-xs px-2 py-1 rounded-full {getTierColor(agent.tier)}">
                    {agent.tier}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <input 
                    type="number" 
                    value={agent.commissionRate}
                    on:change={(e) => updateCommissionRate(agent.id, parseFloat(e.target.value))}
                    class="w-16 text-sm border border-gray-300 rounded px-2 py-1"
                    min="0"
                    max="20"
                  />%
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{agent.totalBookings}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-medium text-gray-900">{formatCurrency(agent.totalEarnings)}</div>
                  <div class="text-xs text-gray-500">This month: {formatCurrency(agent.monthlyEarnings)}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="text-sm font-medium {getPerformanceColor(agent.performance)}">
                    {agent.conversionRate}%
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="text-xs px-2 py-1 rounded-full {getStatusColor(agent.status)}">
                    {agent.status}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <button class="text-primary hover:text-primary-dark">View</button>
                  <button class="text-blue-600 hover:text-blue-700">Pay</button>
                  {#if agent.status === 'active'}
                    <button 
                      class="text-red-600 hover:text-red-700"
                      on:click={() => suspendAgent(agent.id)}
                    >
                      Suspend
                    </button>
                  {/if}
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>

  {:else if activeTab === 'performance'}
    <!-- Performance Tab -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Top Performers -->
      <div class="bg-white rounded-lg shadow-md p-6">
        <h3 class="text-lg font-semibold mb-4">🏆 Top Performers</h3>
        <div class="space-y-4">
          {#each activeAgents.sort((a, b) => b.totalEarnings - a.totalEarnings).slice(0, 5) as agent, index}
            <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div class="flex items-center">
                <div class="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                  {index + 1}
                </div>
                <div>
                  <p class="font-medium">{agent.name}</p>
                  <p class="text-sm text-gray-600">{agent.tier} Agent</p>
                </div>
              </div>
              <div class="text-right">
                <p class="font-semibold">{formatCurrency(agent.totalEarnings)}</p>
                <p class="text-sm text-gray-600">{agent.totalBookings} bookings</p>
              </div>
            </div>
          {/each}
        </div>
      </div>

      <!-- Performance Metrics -->
      <div class="bg-white rounded-lg shadow-md p-6">
        <h3 class="text-lg font-semibold mb-4">📊 Performance Metrics</h3>
        <div class="space-y-4">
          <div class="flex justify-between items-center">
            <span class="text-gray-600">Total Commissions Paid</span>
            <span class="font-semibold">{formatCurrency(agentStats.totalAgentEarnings)}</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-gray-600">Average Conversion Rate</span>
            <span class="font-semibold">{agentStats.avgConversionRate.toFixed(1)}%</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-gray-600">Active Agents</span>
            <span class="font-semibold">{agentStats.activeAgents}</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-gray-600">Application Approval Rate</span>
            <span class="font-semibold">
              {agentStats.totalApplications > 0 ? ((agentStats.approvedApplications / agentStats.totalApplications) * 100).toFixed(1) : 0}%
            </span>
          </div>
        </div>
      </div>
    </div>

  {:else if activeTab === 'settings'}
    <!-- Settings Tab -->
    <div class="space-y-6">
      <!-- Commission Settings -->
      <div class="bg-white rounded-lg shadow-md p-6">
        <h3 class="text-lg font-semibold mb-4">💰 Commission Structure</h3>
        <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div class="border border-gray-200 rounded-lg p-4">
            <h4 class="font-medium text-orange-800 mb-2">Bronze</h4>
            <div class="text-2xl font-bold mb-1">8%</div>
            <div class="text-sm text-gray-600">0+ bookings</div>
          </div>
          <div class="border border-gray-200 rounded-lg p-4">
            <h4 class="font-medium text-gray-800 mb-2">Silver</h4>
            <div class="text-2xl font-bold mb-1">10%</div>
            <div class="text-sm text-gray-600">10+ bookings</div>
          </div>
          <div class="border border-gray-200 rounded-lg p-4">
            <h4 class="font-medium text-yellow-800 mb-2">Gold</h4>
            <div class="text-2xl font-bold mb-1">12%</div>
            <div class="text-sm text-gray-600">25+ bookings</div>
          </div>
          <div class="border border-gray-200 rounded-lg p-4">
            <h4 class="font-medium text-purple-800 mb-2">Platinum</h4>
            <div class="text-2xl font-bold mb-1">15%</div>
            <div class="text-sm text-gray-600">50+ bookings</div>
          </div>
          <div class="border border-gray-200 rounded-lg p-4">
            <h4 class="font-medium text-blue-800 mb-2">Diamond</h4>
            <div class="text-2xl font-bold mb-1">18%</div>
            <div class="text-sm text-gray-600">100+ bookings</div>
          </div>
        </div>
      </div>

      <!-- Application Settings -->
      <div class="bg-white rounded-lg shadow-md p-6">
        <h3 class="text-lg font-semibold mb-4">📋 Application Settings</h3>
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <div>
              <h4 class="font-medium">Auto-approval for high scores</h4>
              <p class="text-sm text-gray-600">Automatically approve applications with score 90+</p>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" class="sr-only peer" checked>
              <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          
          <div class="flex items-center justify-between">
            <div>
              <h4 class="font-medium">Email notifications</h4>
              <p class="text-sm text-gray-600">Send email when new applications are received</p>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" class="sr-only peer" checked>
              <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  {/if}
</div>

<!-- Application Review Modal -->
{#if showApplicationModal && selectedApplication}
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
      <div class="p-6">
        <div class="flex justify-between items-start mb-6">
          <h2 class="text-2xl font-bold">Application Review - {selectedApplication.applicantName}</h2>
          <button 
            class="text-gray-500 hover:text-gray-700 p-2"
            on:click={closeApplicationModal}
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Application Score -->
          <div class="lg:col-span-1">
            <div class="bg-gray-50 rounded-lg p-4 mb-6">
              <div class="text-center">
                <div class="text-4xl font-bold {getScoreColor(selectedApplication.score)} mb-2">
                  {selectedApplication.score}/100
                </div>
                <p class="text-sm text-gray-600">Application Score</p>
              </div>
            </div>
            
            <!-- Quick Info -->
            <div class="space-y-3">
              <div>
                <label class="text-sm font-medium text-gray-700">Status</label>
                <div class="text-sm {getStatusColor(selectedApplication.status)} px-2 py-1 rounded-full inline-block">
                  {selectedApplication.status}
                </div>
              </div>
              <div>
                <label class="text-sm font-medium text-gray-700">Applied</label>
                <div class="text-sm">{formatDate(selectedApplication.applicationDate)}</div>
              </div>
              <div>
                <label class="text-sm font-medium text-gray-700">Country</label>
                <div class="text-sm">{selectedApplication.country}</div>
              </div>
              <div>
                <label class="text-sm font-medium text-gray-700">Expected Volume</label>
                <div class="text-sm">{selectedApplication.expectedVolume}</div>
              </div>
            </div>
          </div>

          <!-- Application Details -->
          <div class="lg:col-span-2 space-y-6">
            <!-- Contact Information -->
            <div>
              <h3 class="font-semibold mb-3">Contact Information</h3>
              <div class="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <label class="text-gray-600">Email:</label>
                  <div>{selectedApplication.email}</div>
                </div>
                <div>
                  <label class="text-gray-600">Phone:</label>
                  <div>{selectedApplication.phone}</div>
                </div>
              </div>
            </div>

            <!-- Marketing Channels -->
            <div>
              <h3 class="font-semibold mb-3">Marketing Channels</h3>
              <div class="flex flex-wrap gap-2">
                {#each selectedApplication.marketingChannels as channel}
                  <span class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    {channel}
                  </span>
                {/each}
              </div>
            </div>

            <!-- Experience -->
            <div>
              <h3 class="font-semibold mb-3">Experience & Background</h3>
              <p class="text-sm text-gray-700">{selectedApplication.experience}</p>
            </div>

            <!-- Website & Social Media -->
            <div>
              <h3 class="font-semibold mb-3">Online Presence</h3>
              <div class="space-y-2 text-sm">
                {#if selectedApplication.websiteUrl}
                  <div>
                    <label class="text-gray-600">Website:</label>
                    <a href={selectedApplication.websiteUrl} target="_blank" class="text-primary hover:underline ml-2">
                      {selectedApplication.websiteUrl}
                    </a>
                  </div>
                {/if}
                {#each Object.entries(selectedApplication.socialMedia || {}) as [platform, url]}
                  {#if url}
                    <div>
                      <label class="text-gray-600 capitalize">{platform}:</label>
                      <a href={url} target="_blank" class="text-primary hover:underline ml-2">
                        {url}
                      </a>
                    </div>
                  {/if}
                {/each}
              </div>
            </div>

            <!-- Motivation -->
            <div>
              <h3 class="font-semibold mb-3">Motivation</h3>
              <p class="text-sm text-gray-700">{selectedApplication.motivation}</p>
            </div>

            <!-- Rejection Reason (if rejected) -->
            {#if selectedApplication.status === 'rejected' && selectedApplication.rejectionReason}
              <div>
                <h3 class="font-semibold mb-3 text-red-800">Rejection Reason</h3>
                <p class="text-sm text-red-700">{selectedApplication.rejectionReason}</p>
              </div>
            {/if}
          </div>
        </div>

        <!-- Action Buttons -->
        {#if selectedApplication.status === 'pending'}
          <div class="flex justify-end space-x-3 mt-6 pt-6 border-t border-gray-200">
            <button 
              class="px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              on:click={closeApplicationModal}
            >
              Close
            </button>
            <button 
              class="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors"
              on:click={() => {
                const reason = prompt('Rejection reason (optional):');
                rejectApplication(selectedApplication.id, reason);
              }}
            >
              Reject Application
            </button>
            <button 
              class="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-md transition-colors"
              on:click={() => approveApplication(selectedApplication.id)}
            >
              Approve Application
            </button>
          </div>
        {:else}
          <div class="flex justify-end mt-6 pt-6 border-t border-gray-200">
            <button 
              class="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-md transition-colors"
              on:click={closeApplicationModal}
            >
              Close
            </button>
          </div>
        {/if}
      </div>
    </div>
  </div>
{/if}
