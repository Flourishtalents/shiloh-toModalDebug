<script>
  import { createEventDispatcher } from 'svelte';
  
  const dispatch = createEventDispatcher();
  let activeTab = 'browse';
  let showCreateGroupModal = false;
  let showInviteModal = false;
  let selectedGroup = null;
  let newGroupData = {
    title: '',
    destination: '',
    startDate: '',
    endDate: '',
    maxParticipants: 8,
    pricePerPerson: 0,
    description: '',
    highlights: [],
    requirements: ''
  };
  let inviteEmails = [''];
  let userEmail = 'user@example.com'; // Would come from user context

  // Sample group travel data
  const groupTravels = [
    {
      id: 1,
      title: 'Gorilla Trekking Adventure',
      organizer: {
        name: 'David Mukasa',
        avatar: 'DM',
        rating: 4.9,
        toursOrganized: 15
      },
      destination: 'Bwindi Impenetrable Forest',
      startDate: '2025-03-15',
      endDate: '2025-03-18',
      duration: '4 days',
      maxParticipants: 8,
      currentParticipants: 5,
      pricePerPerson: 1200,
      discountedPrice: 999, // 16.75% discount for groups
      status: 'open',
      description: 'Join us for an unforgettable gorilla trekking experience! This 4-day adventure includes permits, accommodation, meals, and professional guide services.',
      highlights: [
        'Gorilla trekking permits included',
        'Luxury eco-guest home accommodation',
        'Professional guide services',
        'All meals and transportation',
        'Small group experience (max 8 people)',
        'Photography workshop included'
      ],
      requirements: 'Moderate fitness level required. Ages 15+. Valid passport needed.',
      commissionRate: 10, // 10% commission for referrals
      images: ['images/gorilla-group-1.jpg', 'images/bwindi-lodge.jpg'],
      participants: [
        { name: 'Sarah Johnson', joinDate: '2024-11-15', referredBy: null },
        { name: 'Mike Chen', joinDate: '2024-11-16', referredBy: 'sarah.johnson@email.com' },
        { name: 'Emma Wilson', joinDate: '2024-11-18', referredBy: null },
        { name: 'James Brown', joinDate: '2024-11-20', referredBy: 'sarah.johnson@email.com' },
        { name: 'Lisa Garcia', joinDate: '2024-11-22', referredBy: null }
      ],
      earned: 240, // Total commission earned by referrers
      reviews: 4.8,
      earlyBirdDeadline: '2025-01-15',
      earlyBirdDiscount: 150
    },
    {
      id: 2,
      title: 'Northern Uganda Cultural Safari',
      organizer: {
        name: 'Grace Atim',
        avatar: 'GA',
        rating: 4.7,
        toursOrganized: 8
      },
      destination: 'Kidepo Valley & Karamoja Region',
      startDate: '2025-04-10',
      endDate: '2025-04-17',
      duration: '8 days',
      maxParticipants: 12,
      currentParticipants: 7,
      pricePerPerson: 1800,
      discountedPrice: 1440, // 20% discount for groups
      status: 'open',
      description: 'Experience authentic Ugandan culture and stunning wildlife in the remote and beautiful Kidepo Valley National Park.',
      highlights: [
        'Cultural village experiences',
        'Kidepo Valley National Park safari',
        'Traditional ceremonies participation',
        'Local craft workshops',
        'Community homestays',
        'Professional cultural guide'
      ],
      requirements: 'No special fitness required. All ages welcome. Respect for local customs essential.',
      commissionRate: 12,
      images: ['images/kidepo-group.jpg', 'images/karamoja-culture.jpg'],
      participants: [
        { name: 'Robert Taylor', joinDate: '2024-11-10', referredBy: null },
        { name: 'Anna Schmidt', joinDate: '2024-11-12', referredBy: 'robert.taylor@email.com' },
        { name: 'Carlos Rodriguez', joinDate: '2024-11-14', referredBy: null },
        { name: 'Yuki Tanaka', joinDate: '2024-11-16', referredBy: 'robert.taylor@email.com' },
        { name: 'Sophie Dubois', joinDate: '2024-11-18', referredBy: null },
        { name: 'Ahmed Hassan', joinDate: '2024-11-20', referredBy: 'anna.schmidt@email.com' },
        { name: 'Patricia Williams', joinDate: '2024-11-22', referredBy: null }
      ],
      earned: 518, // Total commission earned
      reviews: 4.9,
      earlyBirdDeadline: '2025-02-10',
      earlyBirdDiscount: 200
    },
    {
      id: 3,
      title: 'Photography Expedition',
      organizer: {
        name: 'James Kiprotich',
        avatar: 'JK',
        rating: 5.0,
        toursOrganized: 22
      },
      destination: 'Queen Elizabeth National Park',
      startDate: '2025-05-05',
      endDate: '2025-05-12',
      duration: '8 days',
      maxParticipants: 6,
      currentParticipants: 3,
      pricePerPerson: 2200,
      discountedPrice: 1870, // 15% discount
      status: 'open',
      description: 'Perfect for photography enthusiasts! Professional guidance on wildlife photography, editing workshops, and access to exclusive shooting locations.',
      highlights: [
        'Professional photography guidance',
        'Exclusive early morning game drives',
        'Photo editing workshops',
        'Portfolio review sessions',
        'Premium guest home accommodation',
        'Small intimate group (max 6)'
      ],
      requirements: 'Own DSLR camera required. Basic photography knowledge helpful.',
      commissionRate: 15,
      images: ['images/photography-group.jpg', 'images/lions-qenp.jpg'],
      participants: [
        { name: 'Elena Popov', joinDate: '2024-11-25', referredBy: null },
        { name: 'Marcus Thompson', joinDate: '2024-11-26', referredBy: 'elena.popov@email.com' },
        { name: 'Priya Sharma', joinDate: '2024-11-28', referredBy: null }
      ],
      earned: 330,
      reviews: 5.0,
      earlyBirdDeadline: '2025-03-05',
      earlyBirdDiscount: 250
    }
  ];

  // User's group travel activity
  const userActivity = {
    joinedGroups: [
      { groupId: 1, joinDate: '2024-11-20', status: 'confirmed', referredBy: null },
      { groupId: 2, joinDate: '2024-11-22', status: 'confirmed', referredBy: null }
    ],
    organizedGroups: [],
    referrals: [
      { 
        email: 'friend1@example.com', 
        groupId: 1, 
        status: 'joined', 
        commission: 120, 
        paidOut: true,
        joinDate: '2024-11-21'
      },
      { 
        email: 'friend2@example.com', 
        groupId: 2, 
        status: 'joined', 
        commission: 180, 
        paidOut: false,
        joinDate: '2024-11-23'
      }
    ],
    totalCommissionEarned: 300,
    pendingCommission: 180
  };

  function calculateGroupDiscount(participants, maxParticipants, basePrice) {
    const fillRate = participants / maxParticipants;
    if (fillRate >= 0.75) return 20; // 20% discount when 75%+ full
    if (fillRate >= 0.5) return 15;  // 15% discount when 50%+ full
    if (fillRate >= 0.25) return 10; // 10% discount when 25%+ full
    return 5; // 5% minimum group discount
  }

  function calculateCommission(price, commissionRate) {
    return (price * commissionRate) / 100;
  }

  function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  function isEarlyBird(deadline) {
    return new Date() < new Date(deadline);
  }

  function getDaysUntilDeadline(deadline) {
    const now = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - now.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  function joinGroup(groupId) {
    const group = groupTravels.find(g => g.id === groupId);
    if (group && group.currentParticipants < group.maxParticipants) {
      // In real app, this would make API call
      group.currentParticipants++;
      userActivity.joinedGroups.push({
        groupId: groupId,
        joinDate: new Date().toISOString(),
        status: 'confirmed',
        referredBy: null
      });
      console.log('Joined group:', groupId);
    }
  }

  function openInviteModal(group) {
    selectedGroup = group;
    showInviteModal = true;
  }

  function addInviteEmail() {
    inviteEmails = [...inviteEmails, ''];
  }

  function removeInviteEmail(index) {
    inviteEmails = inviteEmails.filter((_, i) => i !== index);
  }

  function sendInvitations() {
    if (!selectedGroup) return;
    
    const validEmails = inviteEmails.filter(email => email.trim() && email.includes('@'));
    
    if (validEmails.length > 0) {
      // In real app, this would send actual invitations
      validEmails.forEach(email => {
        console.log(`Sending invitation to ${email} for group: ${selectedGroup.title}`);
        // Track referral
        userActivity.referrals.push({
          email: email,
          groupId: selectedGroup.id,
          status: 'invited',
          commission: 0,
          paidOut: false,
          inviteDate: new Date().toISOString()
        });
      });
      
      alert(`Invitations sent to ${validEmails.length} people! You'll earn ${selectedGroup.commissionRate}% commission if they join.`);
      showInviteModal = false;
      inviteEmails = [''];
      selectedGroup = null;
    }
  }

  function createNewGroup() {
    // In real app, this would submit to API
    console.log('Creating new group:', newGroupData);
    showCreateGroupModal = false;
    newGroupData = {
      title: '',
      destination: '',
      startDate: '',
      endDate: '',
      maxParticipants: 8,
      pricePerPerson: 0,
      description: '',
      highlights: [],
      requirements: ''
    };
  }
</script>

<div class="pt-16 pb-8">
  <div class="container-custom">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-4xl font-bold mb-4">Group Travel</h1>
      <p class="text-lg text-gray-600 max-w-3xl">
        Join amazing group adventures, invite friends to earn commissions, or organize your own trips. 
        Travel together, save money, and create unforgettable memories!
      </p>
    </div>

    <!-- Commission Summary -->
    <div class="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg p-6 mb-8">
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h3 class="text-xl font-bold mb-2">💰 Your Commission Earnings</h3>
          <div class="flex space-x-6">
            <div>
              <p class="text-green-100 text-sm">Total Earned</p>
              <p class="text-2xl font-bold">${userActivity.totalCommissionEarned}</p>
            </div>
            <div>
              <p class="text-green-100 text-sm">Pending</p>
              <p class="text-2xl font-bold">${userActivity.pendingCommission}</p>
            </div>
          </div>
        </div>
        <div class="mt-4 md:mt-0">
          <p class="text-green-100 text-sm mb-2">How it works:</p>
          <ul class="text-sm space-y-1">
            <li>• Invite friends to join group trips</li>
            <li>• Earn 10-15% commission when they book</li>
            <li>• Get paid within 7 days of trip completion</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Navigation Tabs -->
    <div class="bg-white shadow-md rounded-lg mb-8">
      <div class="flex border-b border-gray-200">
        <button 
          class="px-6 py-4 font-medium transition-colors {activeTab === 'browse' ? 'border-b-2 border-primary text-primary' : 'text-gray-600 hover:text-primary'}"
          on:click={() => activeTab = 'browse'}
        >
          Browse Groups
        </button>
        <button 
          class="px-6 py-4 font-medium transition-colors {activeTab === 'mygroups' ? 'border-b-2 border-primary text-primary' : 'text-gray-600 hover:text-primary'}"
          on:click={() => activeTab = 'mygroups'}
        >
          My Groups
        </button>
        <button 
          class="px-6 py-4 font-medium transition-colors {activeTab === 'earnings' ? 'border-b-2 border-primary text-primary' : 'text-gray-600 hover:text-primary'}"
          on:click={() => activeTab = 'earnings'}
        >
          Earnings
        </button>
        <button 
          class="px-6 py-4 font-medium transition-colors {activeTab === 'organize' ? 'border-b-2 border-primary text-primary' : 'text-gray-600 hover:text-primary'}"
          on:click={() => activeTab = 'organize'}
        >
          Organize Trip
        </button>
      </div>
    </div>

    <!-- Tab Content -->
    {#if activeTab === 'browse'}
      <!-- Browse Groups -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {#each groupTravels as group (group.id)}
          <div class="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow">
            <!-- Group Images -->
            <div class="grid grid-cols-2 h-48">
              {#each group.images as image, i}
                <img src={image} alt={group.title} class="w-full h-full object-cover" />
              {/each}
            </div>

            <div class="p-6">
              <!-- Header -->
              <div class="flex justify-between items-start mb-4">
                <div>
                  <h3 class="text-xl font-bold text-gray-900 mb-1">{group.title}</h3>
                  <p class="text-gray-600">{group.destination}</p>
                  <p class="text-sm text-gray-500">{formatDate(group.startDate)} - {formatDate(group.endDate)}</p>
                </div>
                <div class="text-right">
                  <p class="text-sm text-gray-500 line-through">${group.pricePerPerson}</p>
                  <p class="text-lg font-bold text-green-600">${group.discountedPrice}</p>
                  <p class="text-xs text-green-600">Group Discount!</p>
                </div>
              </div>

              <!-- Organizer -->
              <div class="flex items-center mb-4 p-3 bg-gray-50 rounded-lg">
                <div class="rounded-full bg-primary text-white h-10 w-10 flex items-center justify-center text-sm font-bold mr-3">
                  {group.organizer.avatar}
                </div>
                <div>
                  <p class="font-medium">{group.organizer.name}</p>
                  <div class="flex items-center text-sm text-gray-600">
                    <span class="flex items-center mr-2">
                      {group.organizer.rating} ���
                    </span>
                    <span>{group.organizer.toursOrganized} tours organized</span>
                  </div>
                </div>
              </div>

              <!-- Participants -->
              <div class="flex justify-between items-center mb-4">
                <div class="flex items-center">
                  <div class="flex -space-x-2">
                    {#each group.participants.slice(0, 4) as participant, i}
                      <div class="rounded-full bg-blue-500 text-white h-8 w-8 flex items-center justify-center text-xs font-bold border-2 border-white">
                        {participant.name.charAt(0)}
                      </div>
                    {/each}
                    {#if group.participants.length > 4}
                      <div class="rounded-full bg-gray-400 text-white h-8 w-8 flex items-center justify-center text-xs font-bold border-2 border-white">
                        +{group.participants.length - 4}
                      </div>
                    {/if}
                  </div>
                  <span class="ml-3 text-sm text-gray-600">
                    {group.currentParticipants}/{group.maxParticipants} joined
                  </span>
                </div>
                <span class="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                  {calculateGroupDiscount(group.currentParticipants, group.maxParticipants, group.pricePerPerson)}% discount
                </span>
              </div>

              <!-- Progress Bar -->
              <div class="mb-4">
                <div class="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    class="bg-primary h-2 rounded-full transition-all duration-300" 
                    style="width: {(group.currentParticipants / group.maxParticipants) * 100}%"
                  ></div>
                </div>
              </div>

              <!-- Early Bird Alert -->
              {#if isEarlyBird(group.earlyBirdDeadline)}
                <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                  <div class="flex items-center">
                    <span class="text-yellow-600 mr-2">🐦</span>
                    <div>
                      <p class="text-sm font-medium text-yellow-800">Early Bird Special!</p>
                      <p class="text-xs text-yellow-700">
                        Save extra ${group.earlyBirdDiscount} - {getDaysUntilDeadline(group.earlyBirdDeadline)} days left
                      </p>
                    </div>
                  </div>
                </div>
              {/if}

              <!-- Description -->
              <p class="text-gray-700 text-sm mb-4">{group.description}</p>

              <!-- Commission Opportunity -->
              <div class="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                <p class="text-sm font-medium text-blue-800 mb-1">💸 Earn ${calculateCommission(group.discountedPrice, group.commissionRate)} per referral</p>
                <p class="text-xs text-blue-600">Invite friends and earn {group.commissionRate}% commission when they join!</p>
              </div>

              <!-- Actions -->
              <div class="flex space-x-3">
                {#if group.currentParticipants < group.maxParticipants}
                  <button 
                    class="flex-1 bg-primary hover:bg-primary-dark text-white py-2 px-4 rounded-md font-medium transition-colors"
                    on:click={() => joinGroup(group.id)}
                  >
                    Join Group (${group.discountedPrice})
                  </button>
                {:else}
                  <button class="flex-1 bg-gray-300 text-gray-600 py-2 px-4 rounded-md font-medium cursor-not-allowed">
                    Fully Booked
                  </button>
                {/if}
                <button 
                  class="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md font-medium transition-colors"
                  on:click={() => openInviteModal(group)}
                >
                  Invite & Earn
                </button>
              </div>
            </div>
          </div>
        {/each}
      </div>

    {:else if activeTab === 'mygroups'}
      <!-- My Groups -->
      <div class="space-y-6">
        <h3 class="text-xl font-semibold">Your Group Trips</h3>
        {#each userActivity.joinedGroups as userGroup}
          {@const group = groupTravels.find(g => g.id === userGroup.groupId)}
          {#if group}
            <div class="bg-white shadow-md rounded-lg p-6">
              <div class="flex justify-between items-start">
                <div>
                  <h4 class="text-lg font-semibold">{group.title}</h4>
                  <p class="text-gray-600">{group.destination}</p>
                  <p class="text-sm text-gray-500">
                    {formatDate(group.startDate)} - {formatDate(group.endDate)}
                  </p>
                  <span class="inline-block bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium mt-2">
                    {userGroup.status}
                  </span>
                </div>
                <div class="text-right">
                  <p class="text-lg font-bold">${group.discountedPrice}</p>
                  <p class="text-sm text-gray-500">per person</p>
                </div>
              </div>
            </div>
          {/if}
        {/each}
      </div>

    {:else if activeTab === 'earnings'}
      <!-- Earnings -->
      <div class="space-y-6">
        <div class="bg-white shadow-md rounded-lg p-6">
          <h3 class="text-xl font-semibold mb-4">Commission History</h3>
          <div class="space-y-4">
            {#each userActivity.referrals as referral}
              {@const group = groupTravels.find(g => g.id === referral.groupId)}
              {#if group}
                <div class="flex justify-between items-center p-4 border border-gray-200 rounded-lg">
                  <div>
                    <p class="font-medium">{group.title}</p>
                    <p class="text-sm text-gray-600">Referred: {referral.email}</p>
                    <p class="text-xs text-gray-500">
                      {referral.status === 'joined' ? 'Joined' : 'Invited'} on {formatDate(referral.joinDate || referral.inviteDate)}
                    </p>
                  </div>
                  <div class="text-right">
                    <p class="font-bold text-green-600">${referral.commission}</p>
                    <span class="text-xs px-2 py-1 rounded-full {referral.paidOut ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}">
                      {referral.paidOut ? 'Paid' : 'Pending'}
                    </span>
                  </div>
                </div>
              {/if}
            {/each}
          </div>
        </div>
      </div>

    {:else if activeTab === 'organize'}
      <!-- Organize Trip -->
      <div class="bg-white shadow-md rounded-lg p-6">
        <h3 class="text-xl font-semibold mb-4">Organize Your Own Group Trip</h3>
        <p class="text-gray-600 mb-6">
          Create a group trip and earn commission from participants. We handle payments, bookings, and logistics.
        </p>
        <button 
          class="bg-primary hover:bg-primary-dark text-white py-3 px-6 rounded-md font-semibold transition-colors"
          on:click={() => showCreateGroupModal = true}
        >
          Create New Group Trip
        </button>
      </div>
    {/if}
  </div>
</div>

<!-- Invite Modal -->
{#if showInviteModal && selectedGroup}
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-lg w-full max-w-md">
      <div class="p-6">
        <h3 class="text-lg font-semibold mb-4">Invite Friends to {selectedGroup.title}</h3>
        <p class="text-gray-600 mb-4">
          Earn ${calculateCommission(selectedGroup.discountedPrice, selectedGroup.commissionRate)} for each friend who joins!
        </p>
        
        <div class="space-y-3 mb-4">
          {#each inviteEmails as email, i}
            <div class="flex space-x-2">
              <input 
                type="email" 
                bind:value={email}
                placeholder="friend@example.com"
                class="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              {#if inviteEmails.length > 1}
                <button 
                  class="text-red-500 hover:text-red-700"
                  on:click={() => removeInviteEmail(i)}
                >
                  ✕
                </button>
              {/if}
            </div>
          {/each}
        </div>
        
        <button 
          class="text-primary hover:text-primary-dark font-medium mb-4"
          on:click={addInviteEmail}
        >
          + Add another email
        </button>
        
        <div class="flex justify-end space-x-3">
          <button 
            class="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            on:click={() => showInviteModal = false}
          >
            Cancel
          </button>
          <button 
            class="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md transition-colors"
            on:click={sendInvitations}
          >
            Send Invitations
          </button>
        </div>
      </div>
    </div>
  </div>
{/if}

<!-- Create Group Modal -->
{#if showCreateGroupModal}
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
      <div class="p-6">
        <h3 class="text-lg font-semibold mb-4">Create New Group Trip</h3>
        
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Trip Title</label>
            <input 
              type="text" 
              bind:value={newGroupData.title}
              placeholder="Amazing Uganda Safari"
              class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Destination</label>
            <input 
              type="text" 
              bind:value={newGroupData.destination}
              placeholder="Queen Elizabeth National Park"
              class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
              <input 
                type="date" 
                bind:value={newGroupData.startDate}
                class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">End Date</label>
              <input 
                type="date" 
                bind:value={newGroupData.endDate}
                class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>
          
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Max Participants</label>
              <input 
                type="number" 
                bind:value={newGroupData.maxParticipants}
                min="2"
                max="20"
                class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Price per Person ($)</label>
              <input 
                type="number" 
                bind:value={newGroupData.pricePerPerson}
                min="0"
                step="50"
                class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea 
              bind:value={newGroupData.description}
              rows="3"
              placeholder="Describe your amazing trip..."
              class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
            ></textarea>
          </div>
        </div>
        
        <div class="flex justify-end space-x-3 mt-6">
          <button 
            class="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            on:click={() => showCreateGroupModal = false}
          >
            Cancel
          </button>
          <button 
            class="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-md transition-colors"
            on:click={createNewGroup}
          >
            Create Trip
          </button>
        </div>
      </div>
    </div>
  </div>
{/if}
