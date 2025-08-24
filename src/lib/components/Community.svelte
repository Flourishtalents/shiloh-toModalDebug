<script>
  import { createEventDispatcher } from 'svelte';
  
  const dispatch = createEventDispatcher();
  let activeTab = 'feed';
  let newPostContent = '';
  let showNewPostModal = false;
  let selectedCategory = 'experience';
  let uploadedImages = [];
  let uploadedVideos = [];

  // Group Travel functionality
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
      discountedPrice: 999,
      status: 'open',
      description: 'Join us for an unforgettable gorilla trekking experience! This 4-day adventure includes permits, accommodation, meals, and professional guide services.',
      highlights: [
        'Gorilla trekking permits included',
        'Luxury eco-guest home accommodation',
        'Professional guide services',
        'All meals and transportation'
      ],
      commissionRate: 10,
      earned: 240
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
      discountedPrice: 1440,
      status: 'open',
      description: 'Experience authentic Ugandan culture and stunning wildlife in the remote and beautiful Kidepo Valley National Park.',
      highlights: [
        'Cultural village experiences',
        'Kidepo Valley National Park safari',
        'Traditional ceremonies participation',
        'Local craft workshops'
      ],
      commissionRate: 12,
      earned: 360
    }
  ];

  function calculateGroupDiscount(participants, maxParticipants, basePrice) {
    const fillRate = participants / maxParticipants;
    if (fillRate >= 0.75) return 20; // 20% discount when 75%+ full
    if (fillRate >= 0.5) return 15;  // 15% discount when 50%+ full
    if (fillRate >= 0.25) return 10; // 10% discount when 25%+ full
    return 5; // 5% minimum group discount
  }

  function joinGroup(groupId) {
    // Implementation for joining a group
    alert('Group join functionality - would integrate with booking system');
  }

  function createGroup() {
    if (!newGroupData.title || !newGroupData.destination || !newGroupData.startDate || !newGroupData.endDate || !newGroupData.pricePerPerson) {
      alert('Please fill in all required fields');
      return;
    }

    const newGroup = {
      id: Date.now(),
      title: newGroupData.title,
      organizer: {
        name: 'You', // Would be from user context
        avatar: 'YU',
        rating: 4.5,
        toursOrganized: 1
      },
      destination: newGroupData.destination,
      startDate: newGroupData.startDate,
      endDate: newGroupData.endDate,
      duration: calculateDuration(newGroupData.startDate, newGroupData.endDate),
      maxParticipants: newGroupData.maxParticipants,
      currentParticipants: 1,
      pricePerPerson: newGroupData.pricePerPerson,
      discountedPrice: Math.round(newGroupData.pricePerPerson * 0.9), // 10% group discount
      status: 'open',
      description: newGroupData.description,
      highlights: newGroupData.highlights.filter(h => h.trim()),
      commissionRate: 12,
      earned: 0
    };

    // Add to groupTravels array (in real app, would make API call)
    groupTravels.push(newGroup);

    // Reset form
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

    showCreateGroupModal = false;
    alert('Group trip created successfully! Others can now join your adventure.');
  }

  function calculateDuration(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return `${diffDays} days`;
  }

  function addHighlight() {
    newGroupData.highlights = [...newGroupData.highlights, ''];
  }

  function removeHighlight(index) {
    newGroupData.highlights = newGroupData.highlights.filter((_, i) => i !== index);
  }

  function updateHighlight(index, value) {
    newGroupData.highlights[index] = value;
    newGroupData = {...newGroupData}; // Trigger reactivity
  }

  // Sample community posts data - would come from Firebase/API in real app
  const communityPosts = [
    {
      id: 1,
      author: {
        name: 'Sarah Johnson',
        avatar: 'SJ',
        level: 'Explorer',
        trips: 5,
        followers: 234,
        verified: true
      },
      timestamp: '2024-11-20T10:30:00Z',
      category: 'experience',
      title: 'Gorilla Trekking in Bwindi - Life Changing!',
      content: `Just returned from the most incredible gorilla trekking experience in Bwindi Impenetrable Forest! ����✨\n\nThe 4-hour hike was challenging but SO worth it. Our guide Moses was amazing - his knowledge of the forest and gorilla families was incredible. We spent an hour with the Mubare family, including a playful juvenile who came within 3 meters of us!\n\nTips for future trekkers:\n�� Book permits early (they sell out!)\n• Pack light rain gear\n• Bring extra camera batteries\n• Tip your porters well - they're lifesavers!\n\nWho else has done gorilla trekking? Share your experiences! 👇`,
      images: [
        'images/community/gorilla-1.jpg',
        'images/community/gorilla-2.jpg',
        'images/community/forest-hike.jpg'
      ],
      videos: ['images/community/gorilla-video.mp4'],
      location: 'Bwindi Impenetrable Forest',
      tags: ['gorilla-trekking', 'wildlife', 'adventure', 'uganda'],
      likes: 127,
      comments: 23,
      shares: 12,
      hasLiked: false,
      hasBookmarked: true
    },
    {
      id: 2,
      author: {
        name: 'David Mukasa',
        avatar: 'DM',
        level: 'Local Guide',
        trips: 15,
        followers: 892,
        verified: true
      },
      timestamp: '2024-11-19T15:45:00Z',
      category: 'tip',
      title: 'Hidden Gems: Secret Waterfalls Near Jinja',
      content: `Local secret: there are 3 amazing waterfalls within 30 minutes of Jinja that most tourists never see! ���\n\nAs a local guide, I love showing visitors these hidden gems:\n\n🌊 Sezibwa Falls - cultural significance + beautiful swimming hole\n🌊 Namawojjolo Falls - perfect for photography\n🌊 Kyabirwa Falls - the most secluded and pristine\n\nBest part? Entry is usually free or very cheap compared to the main attractions. Pack a picnic and make a day of it!\n\nWho wants GPS coordinates? Drop a comment! 📍`,
      images: [
        'images/community/waterfall-1.jpg',
        'images/community/waterfall-2.jpg'
      ],
      videos: [],
      location: 'Jinja, Uganda',
      tags: ['waterfalls', 'hidden-gems', 'local-tips', 'jinja'],
      likes: 89,
      comments: 31,
      shares: 18,
      hasLiked: true,
      hasBookmarked: false
    },
    {
      id: 3,
      author: {
        name: 'Maria Santos',
        avatar: 'MS',
        level: 'Adventurer',
        trips: 8,
        followers: 156,
        verified: false
      },
      timestamp: '2024-11-18T08:20:00Z',
      category: 'planning',
      title: 'Planning a 2-week Uganda itinerary - need advice!',
      content: `Hi everyone! Planning my first trip to Uganda for March 2025. I have 14 days and want to see as much as possible while being respectful of local communities.\n\nCurrent rough plan:\n📅 Days 1-3: Kampala & surroundings\n📅 Days 4-6: Murchison Falls National Park\n📅 Days 7-9: Kibale Forest (chimps!)\n📅 Days 10-12: Bwindi (gorillas!)\n📅 Days 13-14: Lake Victoria relaxation\n\nQuestions:\n• Is this too rushed?\n• Best way to travel between parks?\n• Must-try local foods?\n• Cultural experiences recommendations?\n\nFirst-time Africa traveler, so any advice appreciated! 🙏`,
      images: [],
      videos: [],
      location: 'Planning Phase',
      tags: ['itinerary', 'planning', 'first-timer', 'advice-needed'],
      likes: 45,
      comments: 67,
      shares: 8,
      hasLiked: false,
      hasBookmarked: true
    },
    {
      id: 4,
      author: {
        name: 'James Kiprotich',
        avatar: 'JK',
        level: 'Wildlife Photographer',
        trips: 22,
        followers: 1205,
        verified: true
      },
      timestamp: '2024-11-17T19:10:00Z',
      category: 'photography',
      title: 'Golden Hour at Queen Elizabeth National Park',
      content: `Magic happens during golden hour in QENP! 📸✨\n\nThis shot took 3 hours of patient waiting, but when this lioness emerged from the tall grass with the Rwenzori Mountains in the background... absolutely breathtaking!\n\nPhotography tips for QENP:\n📷 Early morning (6-8am) and late afternoon (4-6pm) are golden\n📷 Bring a telephoto lens (300mm minimum)\n📷 Kazinga Channel boat cruise = incredible bird photography\n📷 Don't forget landscape shots - the scenery is stunning!\n\nSwipe to see more shots from this incredible 5-day safari ➡️\n\n#UgandaWildlife #PhotographyTips #SafariLife`,
      images: [
        'images/community/lion-golden-hour.jpg',
        'images/community/elephants-qenp.jpg',
        'images/community/kazinga-channel.jpg',
        'images/community/rwenzori-mountains.jpg'
      ],
      videos: ['images/community/lions-video.mp4'],
      location: 'Queen Elizabeth National Park',
      tags: ['photography', 'wildlife', 'golden-hour', 'qenp', 'lions'],
      likes: 203,
      comments: 34,
      shares: 45,
      hasLiked: true,
      hasBookmarked: true
    }
  ];

  // Sample group activities and travel invitations
  const groupActivities = [
    {
      id: 1,
      title: 'Northern Uganda Cultural Safari',
      organizer: 'David Mukasa',
      dates: 'March 15-22, 2025',
      maxParticipants: 8,
      currentParticipants: 5,
      price: '$1,200 per person',
      description: 'Join us for an authentic cultural experience in Northern Uganda, including visits to traditional villages, local craft workshops, and lesser-known wildlife reserves.',
      highlights: ['Kidepo Valley National Park', 'Cultural village stays', 'Traditional craft workshops', 'Local cuisine experiences'],
      interested: 23,
      hasJoined: false
    },
    {
      id: 2,
      title: 'Photography Workshop Safari',
      organizer: 'James Kiprotich',
      dates: 'April 10-17, 2025',
      maxParticipants: 6,
      currentParticipants: 3,
      price: '$1,800 per person',
      description: 'Perfect for photography enthusiasts! Professional guidance on wildlife photography, editing workshops, and access to exclusive shooting locations.',
      highlights: ['Professional photography guidance', 'Editing workshops', 'Exclusive locations', 'Portfolio review'],
      interested: 18,
      hasJoined: true
    }
  ];

  function formatTimeAgo(timestamp) {
    const now = new Date();
    const posted = new Date(timestamp);
    const diffInHours = Math.floor((now - posted) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return 'Yesterday';
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} days ago`;
  }

  function toggleLike(postId) {
    // In a real app, this would make an API call
    const post = communityPosts.find(p => p.id === postId);
    if (post) {
      post.hasLiked = !post.hasLiked;
      post.likes += post.hasLiked ? 1 : -1;
    }
  }

  function toggleBookmark(postId) {
    const post = communityPosts.find(p => p.id === postId);
    if (post) {
      post.hasBookmarked = !post.hasBookmarked;
    }
  }

  function sharePost(postId) {
    // In a real app, this would open sharing options
    console.log('Sharing post:', postId);
  }

  function openNewPostModal() {
    showNewPostModal = true;
  }

  function closeNewPostModal() {
    showNewPostModal = false;
    newPostContent = '';
    uploadedImages = [];
    uploadedVideos = [];
  }

  function submitNewPost() {
    // In a real app, this would submit to API
    console.log('New post:', {
      content: newPostContent,
      category: selectedCategory,
      images: uploadedImages,
      videos: uploadedVideos
    });
    closeNewPostModal();
  }

  function joinGroupActivity(activityId) {
    const activity = groupActivities.find(a => a.id === activityId);
    if (activity && activity.currentParticipants < activity.maxParticipants) {
      activity.hasJoined = true;
      activity.currentParticipants++;
    }
  }

  function expressInterest(activityId) {
    const activity = groupActivities.find(a => a.id === activityId);
    if (activity) {
      activity.interested++;
    }
  }
</script>

<div class="pt-16 pb-8">
  <div class="container-custom">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-4xl font-bold mb-4">Travel Community</h1>
      <p class="text-lg text-gray-600 max-w-3xl">
        Connect with fellow travelers, share your experiences, get insider tips, and find travel companions for your next Ugandan adventure.
      </p>
    </div>

    <!-- Navigation Tabs -->
    <div class="bg-white shadow-md rounded-lg mb-8">
      <div class="flex border-b border-gray-200 overflow-x-auto">
        <button
          class="flex-shrink-0 px-3 sm:px-6 py-4 font-medium transition-colors {activeTab === 'feed' ? 'border-b-2 border-primary text-primary' : 'text-gray-600 hover:text-primary'}"
          on:click={() => activeTab = 'feed'}
        >
          <div class="flex items-center whitespace-nowrap">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
              <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
            </svg>
            <span class="hidden sm:inline">Community </span>Feed
          </div>
        </button>
        <button
          class="flex-shrink-0 px-3 sm:px-6 py-4 font-medium transition-colors {activeTab === 'groups' ? 'border-b-2 border-primary text-primary' : 'text-gray-600 hover:text-primary'}"
          on:click={() => activeTab = 'groups'}
        >
          <div class="flex items-center whitespace-nowrap">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
            </svg>
            <span class="hidden sm:inline">Group </span>Travel
          </div>
        </button>
        <button
          class="flex-shrink-0 px-3 sm:px-6 py-4 font-medium transition-colors {activeTab === 'tips' ? 'border-b-2 border-primary text-primary' : 'text-gray-600 hover:text-primary'}"
          on:click={() => activeTab = 'tips'}
        >
          <div class="flex items-center whitespace-nowrap">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
            </svg>
            <span class="hidden sm:inline">Travel </span>Tips
          </div>
        </button>
      </div>
    </div>

    {#if activeTab === 'feed'}
      <!-- Community Feed -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Main Feed -->
        <div class="lg:col-span-2">
          <!-- New Post Button -->
          <div class="bg-white shadow-md rounded-lg p-6 mb-6">
            <button 
              class="w-full bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg p-4 text-left transition-colors"
              on:click={openNewPostModal}
            >
              <div class="flex items-center">
                <div class="rounded-full bg-primary text-white h-10 w-10 flex items-center justify-center text-sm font-bold mr-3">
                  U
                </div>
                <span class="text-gray-500">Share your travel experience...</span>
              </div>
            </button>
          </div>

          <!-- Posts -->
          {#each communityPosts as post (post.id)}
            <div class="bg-white shadow-md rounded-lg mb-6 overflow-hidden hover:shadow-lg transition-shadow">
              <!-- Post Header -->
              <div class="p-6 pb-4">
                <div class="flex justify-between items-start">
                  <div class="flex items-center">
                    <div class="rounded-full bg-primary text-white h-12 w-12 flex items-center justify-center text-sm font-bold mr-3">
                      {post.author.avatar}
                    </div>
                    <div>
                      <div class="flex items-center">
                        <h4 class="font-semibold text-gray-900 mr-2">{post.author.name}</h4>
                        {#if post.author.verified}
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                          </svg>
                        {/if}
                      </div>
                      <div class="flex items-center text-sm text-gray-600">
                        <span class="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs mr-2">
                          {post.author.level}
                        </span>
                        <span>{post.author.trips} trips • {post.author.followers} followers</span>
                      </div>
                      <p class="text-sm text-gray-500">{formatTimeAgo(post.timestamp)} • {post.location}</p>
                    </div>
                  </div>
                  <div class="flex items-center space-x-2">
                    <span class="bg-accent text-white px-3 py-1 rounded-full text-xs font-medium capitalize">
                      {post.category}
                    </span>
                    <button class="text-gray-400 hover:text-gray-600">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              <!-- Post Content -->
              <div class="px-6 pb-4">
                <h3 class="text-lg font-semibold mb-3">{post.title}</h3>
                <p class="text-gray-700 whitespace-pre-line mb-4">{post.content}</p>
                
                <!-- Tags -->
                <div class="flex flex-wrap gap-2 mb-4">
                  {#each post.tags as tag}
                    <span class="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                      #{tag}
                    </span>
                  {/each}
                </div>
              </div>

              <!-- Media -->
              {#if post.images.length > 0}
                <div class="grid {post.images.length === 1 ? 'grid-cols-1' : post.images.length === 2 ? 'grid-cols-2' : 'grid-cols-2 lg:grid-cols-3'} gap-2 px-6 pb-4">
                  {#each post.images as image}
                    <img src={image} alt="Post content" class="w-full h-48 object-cover rounded-lg" />
                  {/each}
                </div>
              {/if}

              {#if post.videos.length > 0}
                <div class="px-6 pb-4">
                  {#each post.videos as video}
                    <video
                      controls
                      class="w-full rounded-lg"
                      aria-label="Community post video content"
                      title="Video shared by community member"
                    >
                      <source src={video} type="video/mp4">
                      <track kind="captions" src="" label="English captions" default>
                      Your browser does not support the video tag.
                    </video>
                  {/each}
                </div>
              {/if}

              <!-- Actions -->
              <div class="px-6 py-4 bg-gray-50 border-t border-gray-100">
                <div class="flex justify-between items-center">
                  <div class="flex space-x-6">
                    <button 
                      class="flex items-center text-sm transition-colors {post.hasLiked ? 'text-red-500' : 'text-gray-600 hover:text-red-500'}"
                      on:click={() => toggleLike(post.id)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1 {post.hasLiked ? 'fill-current' : ''}" fill={post.hasLiked ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      {post.likes}
                    </button>
                    <button class="flex items-center text-sm text-gray-600 hover:text-primary transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.959 8.959 0 01-4.906-1.434A3.993 3.993 0 003 16v-5.197c0-.798.232-1.577.665-2.234C4.267 7.288 6.215 7 8.395 7H16a8 8 0 015 5z" />
                      </svg>
                      {post.comments}
                    </button>
                    <button 
                      class="flex items-center text-sm text-gray-600 hover:text-primary transition-colors"
                      on:click={() => sharePost(post.id)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                      </svg>
                      {post.shares}
                    </button>
                  </div>
                  <button 
                    class="text-sm transition-colors {post.hasBookmarked ? 'text-yellow-500' : 'text-gray-600 hover:text-yellow-500'}"
                    on:click={() => toggleBookmark(post.id)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 {post.hasBookmarked ? 'fill-current' : ''}" fill={post.hasBookmarked ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          {/each}
        </div>

        <!-- Sidebar -->
        <div class="space-y-6">
          <!-- Trending Tags -->
          <div class="bg-white shadow-md rounded-lg p-6">
            <h3 class="text-lg font-semibold mb-4">🔥 Trending Topics</h3>
            <div class="space-y-2">
              <a href="#" class="block text-sm text-gray-600 hover:text-primary">#gorilla-trekking (45 posts)</a>
              <a href="#" class="block text-sm text-gray-600 hover:text-primary">#photography (32 posts)</a>
              <a href="#" class="block text-sm text-gray-600 hover:text-primary">#budget-travel (28 posts)</a>
              <a href="#" class="block text-sm text-gray-600 hover:text-primary">#solo-travel (21 posts)</a>
              <a href="#" class="block text-sm text-gray-600 hover:text-primary">#local-tips (19 posts)</a>
            </div>
          </div>

          <!-- Active Communities -->
          <div class="bg-white shadow-md rounded-lg p-6">
            <h3 class="text-lg font-semibold mb-4">👥 Active Groups</h3>
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <div>
                  <h4 class="font-medium text-sm">Wildlife Photographers</h4>
                  <p class="text-xs text-gray-600">2.1k members</p>
                </div>
                <button class="text-xs bg-primary text-white px-2 py-1 rounded">Join</button>
              </div>
              <div class="flex items-center justify-between">
                <div>
                  <h4 class="font-medium text-sm">Solo Travelers</h4>
                  <p class="text-xs text-gray-600">1.8k members</p>
                </div>
                <button class="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">Joined</button>
              </div>
              <div class="flex items-center justify-between">
                <div>
                  <h4 class="font-medium text-sm">Budget Backpackers</h4>
                  <p class="text-xs text-gray-600">3.2k members</p>
                </div>
                <button class="text-xs bg-primary text-white px-2 py-1 rounded">Join</button>
              </div>
            </div>
          </div>

          <!-- Upcoming Events -->
          <div class="bg-white shadow-md rounded-lg p-6">
            <h3 class="text-lg font-semibold mb-4">📅 Upcoming Events</h3>
            <div class="space-y-3">
              <div class="border-l-4 border-accent pl-3">
                <h4 class="font-medium text-sm">Virtual Uganda Travel Q&A</h4>
                <p class="text-xs text-gray-600">Dec 15, 7 PM EAT</p>
              </div>
              <div class="border-l-4 border-primary pl-3">
                <h4 class="font-medium text-sm">Photography Meetup - Kampala</h4>
                <p class="text-xs text-gray-600">Dec 20, 2 PM EAT</p>
              </div>
            </div>
          </div>
        </div>
      </div>

    {:else if activeTab === 'groups'}
      <!-- Group Travel -->
      <div class="space-y-8">
        <div class="bg-white shadow-md rounded-lg p-6">
          <h2 class="text-2xl font-bold mb-4">Join a Group Adventure</h2>
          <p class="text-gray-600 mb-6">
            Travel with like-minded adventurers, share costs, and create unforgettable memories together. 
            Perfect for solo travelers looking for company or anyone wanting to try something new!
          </p>
        </div>

        {#each groupActivities as activity (activity.id)}
          <div class="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow">
            <div class="flex flex-col lg:flex-row lg:items-start gap-6">
              <div class="flex-1">
                <div class="flex items-center justify-between mb-4">
                  <h3 class="text-xl font-semibold">{activity.title}</h3>
                  <span class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    {activity.currentParticipants}/{activity.maxParticipants} spots filled
                  </span>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p class="text-sm text-gray-600 mb-1">Organized by</p>
                    <p class="font-medium">{activity.organizer}</p>
                  </div>
                  <div>
                    <p class="text-sm text-gray-600 mb-1">Dates</p>
                    <p class="font-medium">{activity.dates}</p>
                  </div>
                  <div>
                    <p class="text-sm text-gray-600 mb-1">Price per person</p>
                    <p class="font-medium text-lg text-primary">{activity.price}</p>
                  </div>
                  <div>
                    <p class="text-sm text-gray-600 mb-1">Interested travelers</p>
                    <p class="font-medium">{activity.interested} people</p>
                  </div>
                </div>

                <p class="text-gray-700 mb-4">{activity.description}</p>

                <div class="mb-4">
                  <h4 class="font-medium mb-2">Trip Highlights:</h4>
                  <ul class="grid grid-cols-1 md:grid-cols-2 gap-1">
                    {#each activity.highlights as highlight}
                      <li class="flex items-center text-sm text-gray-600">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                        </svg>
                        {highlight}
                      </li>
                    {/each}
                  </ul>
                </div>

                <div class="flex flex-col sm:flex-row gap-3">
                  {#if activity.hasJoined}
                    <button class="bg-green-500 text-white py-2 px-6 rounded-md font-medium">
                      ✓ Joined - View Details
                    </button>
                  {:else if activity.currentParticipants < activity.maxParticipants}
                    <button 
                      class="bg-primary hover:bg-primary-dark text-white py-2 px-6 rounded-md font-medium transition-colors"
                      on:click={() => joinGroupActivity(activity.id)}
                    >
                      Join This Adventure
                    </button>
                  {:else}
                    <button class="bg-gray-300 text-gray-600 py-2 px-6 rounded-md font-medium cursor-not-allowed">
                      Fully Booked
                    </button>
                  {/if}
                  
                  <button 
                    class="border border-primary text-primary hover:bg-primary hover:text-white py-2 px-6 rounded-md font-medium transition-colors"
                    on:click={() => expressInterest(activity.id)}
                  >
                    Express Interest
                  </button>
                  
                  <button class="border border-gray-300 text-gray-600 hover:bg-gray-50 py-2 px-6 rounded-md font-medium transition-colors">
                    Contact Organizer
                  </button>
                </div>
              </div>
            </div>
          </div>
        {/each}

        <!-- Create Group Activity CTA -->
        <div class="bg-gradient-to-r from-accent to-accent-dark text-white rounded-lg p-8 text-center">
          <h3 class="text-2xl font-bold mb-4">Want to Organize Your Own Group Trip?</h3>
          <p class="mb-6 max-w-2xl mx-auto">
            Create your own group adventure and find travel companions who share your interests. 
            Set your itinerary, manage bookings, and explore Uganda together!
          </p>
          <button class="bg-white text-accent hover:bg-gray-100 py-3 px-8 rounded-md font-semibold transition-colors">
            Create Group Activity
          </button>
        </div>
      </div>

    {:else if activeTab === 'tips'}
      <!-- Travel Tips -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div class="space-y-6">
          {#each communityPosts.filter(post => post.category === 'tip') as post (post.id)}
            <div class="bg-white shadow-md rounded-lg p-6">
              <div class="flex items-center mb-4">
                <div class="rounded-full bg-primary text-white h-10 w-10 flex items-center justify-center text-sm font-bold mr-3">
                  {post.author.avatar}
                </div>
                <div>
                  <h4 class="font-semibold">{post.author.name}</h4>
                  <p class="text-sm text-gray-600">{post.author.level}</p>
                </div>
              </div>
              <h3 class="text-lg font-semibold mb-3">{post.title}</h3>
              <p class="text-gray-700 mb-4 line-clamp-3">{post.content}</p>
              <div class="flex justify-between items-center">
                <div class="flex space-x-4 text-sm text-gray-600">
                  <span>❤️ {post.likes}</span>
                  <span>💬 {post.comments}</span>
                </div>
                <button class="text-primary hover:text-primary-dark font-medium">Read More</button>
              </div>
            </div>
          {/each}
        </div>

        <!-- Tips Categories -->
        <div class="space-y-6">
          <div class="bg-white shadow-md rounded-lg p-6">
            <h3 class="text-lg font-semibold mb-4">Popular Tip Categories</h3>
            <div class="space-y-3">
              <a href="#" class="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div class="font-medium">Wildlife & Safaris</div>
                <div class="text-sm text-gray-600">23 tips</div>
              </a>
              <a href="#" class="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div class="font-medium">Budget Travel</div>
                <div class="text-sm text-gray-600">18 tips</div>
              </a>
              <a href="#" class="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div class="font-medium">Adventure Activities</div>
                <div class="text-sm text-gray-600">15 tips</div>
              </a>
              <a href="#" class="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div class="font-medium">Accommodations</div>
                <div class="text-sm text-gray-600">12 tips</div>
              </a>
            </div>
          </div>

          <div class="bg-white shadow-md rounded-lg p-6">
            <h3 class="text-lg font-semibold mb-4">Share Your Tip</h3>
            <p class="text-gray-600 mb-4">
              Help fellow travelers with your local knowledge and travel experience!
            </p>
            <button class="w-full bg-accent hover:bg-accent-dark text-white py-3 rounded-md font-semibold transition-colors">
              Submit a Travel Tip
            </button>
          </div>
        </div>
      </div>

    {:else if activeTab === 'groups'}
      <!-- Group Travel Section -->
      <div class="space-y-8">
        <!-- Header -->
        <div class="bg-gradient-to-r from-primary to-primary-dark text-white rounded-lg p-8 text-center">
          <h2 class="text-3xl font-bold mb-4">Group Travel Adventures</h2>
          <p class="text-lg mb-6 max-w-3xl mx-auto">
            Join amazing group adventures, invite friends to earn commissions, or organize your own trips.
            Travel together, save money, and create unforgettable memories!
          </p>
          <button
            class="bg-white text-primary hover:bg-gray-100 py-3 px-8 rounded-md font-semibold transition-colors"
            on:click={() => showCreateGroupModal = true}
          >
            Create Group Trip
          </button>
        </div>

        <!-- Group Travel Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          {#each groupTravels as group (group.id)}
            <div class="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow">
              <!-- Group Header -->
              <div class="p-6 border-b">
                <div class="flex justify-between items-start mb-4">
                  <div>
                    <h3 class="text-xl font-bold mb-2">{group.title}</h3>
                    <p class="text-gray-600 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                      </svg>
                      {group.destination}
                    </p>
                  </div>
                  <span class="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                    {group.status === 'open' ? 'Open' : 'Full'}
                  </span>
                </div>

                <!-- Organizer Info -->
                <div class="flex items-center mb-4">
                  <div class="rounded-full bg-primary text-white h-10 w-10 flex items-center justify-center text-sm font-bold mr-3">
                    {group.organizer.avatar}
                  </div>
                  <div>
                    <p class="font-medium">{group.organizer.name}</p>
                    <p class="text-sm text-gray-600">{group.organizer.rating} ★ • {group.organizer.toursOrganized} trips organized</p>
                  </div>
                </div>
              </div>

              <!-- Group Details -->
              <div class="p-6">
                <p class="text-gray-700 mb-4">{group.description}</p>

                <!-- Key Info -->
                <div class="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p class="text-sm text-gray-500">Duration</p>
                    <p class="font-medium">{group.duration}</p>
                  </div>
                  <div>
                    <p class="text-sm text-gray-500">Dates</p>
                    <p class="font-medium">{new Date(group.startDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p class="text-sm text-gray-500">Participants</p>
                    <p class="font-medium">{group.currentParticipants}/{group.maxParticipants} joined</p>
                  </div>
                  <div>
                    <p class="text-sm text-gray-500">Group Savings</p>
                    <p class="font-medium text-green-600">${group.pricePerPerson - group.discountedPrice} saved</p>
                  </div>
                </div>

                <!-- Progress Bar -->
                <div class="mb-4">
                  <div class="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Group Progress</span>
                    <span>{Math.round((group.currentParticipants / group.maxParticipants) * 100)}% full</span>
                  </div>
                  <div class="w-full bg-gray-200 rounded-full h-2">
                    <div
                      class="bg-primary h-2 rounded-full transition-all duration-300"
                      style="width: {(group.currentParticipants / group.maxParticipants) * 100}%"
                    ></div>
                  </div>
                </div>

                <!-- Pricing -->
                <div class="bg-gray-50 rounded-lg p-4 mb-4">
                  <div class="flex justify-between items-center">
                    <div>
                      <p class="text-sm text-gray-500">Original Price</p>
                      <p class="text-lg line-through text-gray-400">${group.pricePerPerson}</p>
                    </div>
                    <div class="text-right">
                      <p class="text-sm text-gray-500">Group Price</p>
                      <p class="text-2xl font-bold text-green-600">${group.discountedPrice}</p>
                    </div>
                  </div>
                  <div class="text-center mt-2">
                    <span class="inline-block bg-red-500 text-white px-3 py-1 rounded-full text-sm">
                      Save ${group.pricePerPerson - group.discountedPrice} per person!
                    </span>
                  </div>
                </div>

                <!-- Highlights -->
                <div class="mb-4">
                  <p class="font-medium mb-2">What's Included:</p>
                  <ul class="text-sm text-gray-600 space-y-1">
                    {#each group.highlights.slice(0, 3) as highlight}
                      <li class="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                        </svg>
                        {highlight}
                      </li>
                    {/each}
                  </ul>
                </div>

                <!-- Action Buttons -->
                <div class="flex space-x-3">
                  <button
                    class="flex-1 bg-primary hover:bg-primary-dark text-white py-3 px-4 rounded-md font-semibold transition-colors"
                    on:click={() => joinGroup(group.id)}
                  >
                    Join Group - ${group.discountedPrice}
                  </button>

                  <button
                    class="border border-gray-300 text-gray-600 hover:bg-gray-50 py-3 px-4 rounded-md font-medium transition-colors"
                    on:click={() => {selectedGroup = group; showInviteModal = true}}
                  >
                    Invite & Earn ${group.discountedPrice * group.commissionRate / 100}
                  </button>
                </div>

                <!-- Commission Earnings -->
                {#if group.earned > 0}
                  <div class="mt-3 bg-green-50 border border-green-200 rounded-lg p-3">
                    <p class="text-sm text-green-800">
                      💰 You've earned <strong>${group.earned}</strong> in commissions from this group!
                    </p>
                  </div>
                {/if}
              </div>
            </div>
          {/each}
        </div>

        <!-- Commission Info Section -->
        <div class="bg-gradient-to-r from-accent to-accent-dark text-white rounded-lg p-8">
          <h3 class="text-2xl font-bold mb-4">Earn While You Share! 💰</h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="text-center">
              <div class="text-4xl mb-2">🎯</div>
              <h4 class="font-semibold mb-2">Invite Friends</h4>
              <p class="text-accent-light">Share group trips with your network</p>
            </div>
            <div class="text-center">
              <div class="text-4xl mb-2">💵</div>
              <h4 class="font-semibold mb-2">Earn Commissions</h4>
              <p class="text-accent-light">Get 10-15% when they book</p>
            </div>
            <div class="text-center">
              <div class="text-4xl mb-2">🏆</div>
              <h4 class="font-semibold mb-2">Build Community</h4>
              <p class="text-accent-light">Help others discover Uganda</p>
            </div>
          </div>
        </div>
      </div>
    {/if}
  </div>
</div>

<!-- Create Group Trip Modal -->
{#if showCreateGroupModal}
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
      <div class="p-6 border-b border-gray-200">
        <div class="flex justify-between items-center">
          <h3 class="text-2xl font-bold">Create Group Trip</h3>
          <button
            class="text-gray-400 hover:text-gray-600"
            on:click={() => showCreateGroupModal = false}
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <p class="text-gray-600 mt-2">Organize your own group adventure and find travel companions to join you!</p>
      </div>

      <div class="p-6">
        <form on:submit|preventDefault={createGroup} class="space-y-6">
          <!-- Basic Info -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label for="trip-title" class="block text-sm font-medium text-gray-700 mb-2">Trip Title *</label>
              <input
                id="trip-title"
                type="text"
                bind:value={newGroupData.title}
                placeholder="e.g., Gorilla Trekking Adventure"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              >
            </div>

            <div>
              <label for="destination" class="block text-sm font-medium text-gray-700 mb-2">Destination *</label>
              <input
                id="destination"
                type="text"
                bind:value={newGroupData.destination}
                placeholder="e.g., Bwindi Impenetrable Forest"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              >
            </div>
          </div>

          <!-- Dates and Participants -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label for="start-date" class="block text-sm font-medium text-gray-700 mb-2">Start Date *</label>
              <input
                id="start-date"
                type="date"
                bind:value={newGroupData.startDate}
                min={new Date().toISOString().split('T')[0]}
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              >
            </div>

            <div>
              <label for="end-date" class="block text-sm font-medium text-gray-700 mb-2">End Date *</label>
              <input
                id="end-date"
                type="date"
                bind:value={newGroupData.endDate}
                min={newGroupData.startDate}
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              >
            </div>

            <div>
              <label for="max-participants" class="block text-sm font-medium text-gray-700 mb-2">Max Participants</label>
              <select
                id="max-participants"
                bind:value={newGroupData.maxParticipants}
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                {#each Array(16) as _, i}
                  <option value={i + 4}>{i + 4} people</option>
                {/each}
              </select>
            </div>
          </div>

          <!-- Price -->
          <div>
            <label for="price" class="block text-sm font-medium text-gray-700 mb-2">Price per Person (USD) *</label>
            <input
              id="price"
              type="number"
              bind:value={newGroupData.pricePerPerson}
              placeholder="1200"
              min="1"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            >
            <p class="text-sm text-gray-500 mt-1">This will be the full price. Group discounts will be applied automatically based on participation.</p>
          </div>

          <!-- Description -->
          <div>
            <label for="description" class="block text-sm font-medium text-gray-700 mb-2">Trip Description *</label>
            <textarea
              id="description"
              bind:value={newGroupData.description}
              placeholder="Describe your trip, what's included, what makes it special..."
              rows="4"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
              required
            ></textarea>
          </div>

          <!-- Trip Highlights -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Trip Highlights</label>
            <div class="space-y-2">
              {#each newGroupData.highlights as highlight, index}
                <div class="flex items-center space-x-2">
                  <input
                    type="text"
                    value={highlight}
                    on:input={(e) => updateHighlight(index, e.target.value)}
                    placeholder="e.g., Gorilla trekking permits included"
                    aria-label="Trip highlight {index + 1}"
                    class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                  <button
                    type="button"
                    class="text-red-500 hover:text-red-700 p-1"
                    on:click={() => removeHighlight(index)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                    </svg>
                  </button>
                </div>
              {/each}

              <button
                type="button"
                class="text-primary hover:text-primary-dark text-sm font-medium flex items-center"
                on:click={addHighlight}
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
                </svg>
                Add Highlight
              </button>
            </div>
          </div>

          <!-- Requirements -->
          <div>
            <label for="requirements" class="block text-sm font-medium text-gray-700 mb-2">Requirements & Notes</label>
            <textarea
              id="requirements"
              bind:value={newGroupData.requirements}
              placeholder="Any specific requirements, fitness level needed, what to bring, etc."
              rows="3"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
            ></textarea>
          </div>

          <!-- Preview Section -->
          {#if newGroupData.title && newGroupData.pricePerPerson}
            <div class="bg-gray-50 rounded-lg p-4">
              <h4 class="font-medium mb-2">Preview:</h4>
              <div class="text-sm text-gray-600">
                <p><strong>Trip:</strong> {newGroupData.title}</p>
                <p><strong>Duration:</strong> {newGroupData.startDate && newGroupData.endDate ? calculateDuration(newGroupData.startDate, newGroupData.endDate) : 'Select dates'}</p>
                <p><strong>Group Size:</strong> Up to {newGroupData.maxParticipants} participants</p>
                <p><strong>Price:</strong> ${newGroupData.pricePerPerson} per person (${Math.round(newGroupData.pricePerPerson * 0.9)} with group discount)</p>
                <p><strong>Your Commission:</strong> 12% of bookings (${Math.round(newGroupData.pricePerPerson * 0.12)} per person)</p>
              </div>
            </div>
          {/if}

          <!-- Action Buttons -->
          <div class="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              class="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              on:click={() => showCreateGroupModal = false}
            >
              Cancel
            </button>
            <button
              type="submit"
              class="px-6 py-2 bg-primary hover:bg-primary-dark text-white rounded-md transition-colors font-semibold"
            >
              Create Group Trip
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
{/if}

<!-- Invite Modal -->
{#if showInviteModal && selectedGroup}
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" on:click={() => showInviteModal = false}>
    <div class="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto" on:click|stopPropagation>
      <div class="p-6 border-b border-gray-200">
        <div class="flex justify-between items-center">
          <h3 class="text-xl font-bold">Invite Friends & Earn Commission</h3>
          <button
            class="text-gray-400 hover:text-gray-600"
            on:click={() => showInviteModal = false}
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <p class="text-gray-600 mt-2">Share this trip with friends and earn ${selectedGroup.discountedPrice * selectedGroup.commissionRate / 100} for each person who books!</p>
      </div>

      <div class="p-6">
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Invite by Email</label>
            {#each inviteEmails as email, index}
              <div class="flex items-center space-x-2 mb-2">
                <input
                  type="email"
                  bind:value={inviteEmails[index]}
                  placeholder="friend@example.com"
                  aria-label="Friend's email address {index + 1}"
                  class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                {#if index > 0}
                  <button
                    type="button"
                    class="text-red-500 hover:text-red-700 p-1"
                    on:click={() => inviteEmails = inviteEmails.filter((_, i) => i !== index)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                    </svg>
                  </button>
                {/if}
              </div>
            {/each}
            <button
              type="button"
              class="text-primary hover:text-primary-dark text-sm font-medium flex items-center mt-2"
              on:click={() => inviteEmails = [...inviteEmails, '']}
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
              </svg>
              Add Another Email
            </button>
          </div>

          <div class="border-t border-gray-200 pt-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">Or Share Link</label>
            <div class="flex items-center space-x-2">
              <input
                type="text"
                value="https://shilohexperience.com/groups/{selectedGroup.id}?ref={userEmail}"
                readonly
                aria-label="Shareable group invitation link"
                class="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700"
              >
              <button
                type="button"
                class="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors"
                on:click={() => navigator.clipboard.writeText(`https://shilohexperience.com/groups/${selectedGroup.id}?ref=${userEmail}`)}
              >
                Copy
              </button>
            </div>
          </div>

          <div class="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 class="font-medium text-green-800 mb-2">💰 Commission Details</h4>
            <ul class="text-sm text-green-700 space-y-1">
              <li>• Earn {selectedGroup.commissionRate}% commission on each booking</li>
              <li>• ${selectedGroup.discountedPrice * selectedGroup.commissionRate / 100} per person who books through your link</li>
              <li>• Commission paid after trip completion</li>
              <li>• Track your earnings in your dashboard</li>
            </ul>
          </div>
        </div>

        <div class="flex justify-end space-x-3 pt-6 border-t border-gray-200 mt-6">
          <button
            type="button"
            class="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            on:click={() => showInviteModal = false}
          >
            Close
          </button>
          <button
            type="button"
            class="px-6 py-2 bg-primary hover:bg-primary-dark text-white rounded-md transition-colors font-semibold"
            on:click={() => alert('Invitations sent! Track responses in your dashboard.')}
          >
            Send Invitations
          </button>
        </div>
      </div>
    </div>
  </div>
{/if}

<!-- New Post Modal -->
{#if showNewPostModal}
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" on:click={closeNewPostModal}>
    <div class="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto" on:click|stopPropagation>
      <div class="p-6 border-b border-gray-200">
        <div class="flex justify-between items-center">
          <h3 class="text-lg font-semibold">Share Your Experience</h3>
          <button 
            class="text-gray-400 hover:text-gray-600"
            on:click={closeNewPostModal}
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
      
      <div class="p-6">
        <div class="mb-4">
          <label for="category" class="block text-sm font-medium text-gray-700 mb-2">Category</label>
          <select 
            id="category" 
            bind:value={selectedCategory}
            class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="experience">Travel Experience</option>
            <option value="tip">Travel Tip</option>
            <option value="planning">Trip Planning</option>
            <option value="photography">Photography</option>
            <option value="question">Question</option>
          </select>
        </div>
        
        <div class="mb-4">
          <label for="content" class="block text-sm font-medium text-gray-700 mb-2">Your Post</label>
          <textarea 
            id="content"
            bind:value={newPostContent}
            placeholder="Share your travel story, tips, or ask questions..."
            rows="6"
            class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
          ></textarea>
        </div>
        
        <div class="mb-6">
          <div class="flex space-x-4">
            <button class="flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Add Photos
            </button>
            <button class="flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Add Video
            </button>
          </div>
        </div>
        
        <div class="flex justify-end space-x-3">
          <button 
            class="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            on:click={closeNewPostModal}
          >
            Cancel
          </button>
          <button 
            class="px-6 py-2 bg-primary hover:bg-primary-dark text-white rounded-md transition-colors"
            on:click={submitNewPost}
            disabled={!newPostContent.trim()}
          >
            Share Post
          </button>
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  .line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>
