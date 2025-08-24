<script>
  import { onMount } from 'svelte';
  import PersonalizedRecommendations from './PersonalizedRecommendations.svelte';

  export let user = null;
  
  let activeTab = 'dashboard';
  let bookingHistory = [];
  let userCredits = 0;
  let loyaltyPoints = 0;
  let membershipLevel = 'Explorer';
  let travelGoals = [];
  let upcomingTrips = [];
  let showAddGoalModal = false;
  let showAddCreditModal = false;
  let newGoalTitle = '';
  let newGoalAmount = 0;
  let newGoalDate = '';
  let creditAmount = 0;

  const membershipLevels = {
    'Explorer': { minPoints: 0, benefits: ['5% booking discount', 'Priority support'], color: 'bg-blue-500' },
    'Adventurer': { minPoints: 500, benefits: ['10% booking discount', 'Early access to deals', 'Free upgrades'], color: 'bg-green-500' },
    'Pioneer': { minPoints: 1500, benefits: ['15% booking discount', 'VIP support', 'Free cancellations', 'Exclusive experiences'], color: 'bg-purple-500' },
    'Legend': { minPoints: 3000, benefits: ['20% booking discount', 'Concierge service', 'Private tours', 'Lifetime privileges'], color: 'bg-yellow-500' }
  };

  // Load all user data
  $: {
    if (user?.id) {
      // Load credits and points
      userCredits = parseFloat(localStorage.getItem(`shiloh_credits_${user.id}`) || '0');
      loyaltyPoints = parseInt(localStorage.getItem(`shiloh_loyalty_points_${user.id}`) || '0');

      // Calculate membership level
      if (loyaltyPoints >= 3000) membershipLevel = 'Legend';
      else if (loyaltyPoints >= 1500) membershipLevel = 'Pioneer';
      else if (loyaltyPoints >= 500) membershipLevel = 'Adventurer';
      else membershipLevel = 'Explorer';

      // Load travel goals
      const storedGoals = localStorage.getItem(`shiloh_travel_goals_${user.id}`);
      travelGoals = storedGoals ? JSON.parse(storedGoals) : [];

      // Load bookings and upcoming trips
      const storedBookings = localStorage.getItem(`shiloh_bookings_${user.id}`);
      if (storedBookings) {
        bookingHistory = JSON.parse(storedBookings);
        const now = new Date();
        upcomingTrips = bookingHistory.filter(booking => {
          const travelDate = new Date(booking.travelDate || booking.date);
          return travelDate > now && booking.status !== 'cancelled';
        }).sort((a, b) => new Date(a.travelDate || a.date) - new Date(b.travelDate || b.date));
      }
    }
  }

  function calculateDaysUntil(dateString) {
    const targetDate = new Date(dateString);
    const today = new Date();
    const timeDiff = targetDate.getTime() - today.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  }

  function getProgressPercentage(current, target) {
    return Math.min((current / target) * 100, 100);
  }

  function addCredits() {
    if (creditAmount > 0) {
      userCredits += creditAmount;
      localStorage.setItem(`shiloh_credits_${user.id}`, userCredits.toString());
      
      const pointsEarned = Math.floor(creditAmount / 10);
      loyaltyPoints += pointsEarned;
      localStorage.setItem(`shiloh_loyalty_points_${user.id}`, loyaltyPoints.toString());
      
      creditAmount = 0;
      showAddCreditModal = false;
    }
  }

  function addTravelGoal() {
    if (newGoalTitle && newGoalAmount > 0 && newGoalDate) {
      const newGoal = {
        id: Date.now(),
        title: newGoalTitle,
        targetAmount: newGoalAmount,
        currentAmount: 0,
        targetDate: newGoalDate,
        completed: false
      };
      
      travelGoals = [...travelGoals, newGoal];
      localStorage.setItem(`shiloh_travel_goals_${user.id}`, JSON.stringify(travelGoals));
      
      newGoalTitle = '';
      newGoalAmount = 0;
      newGoalDate = '';
      showAddGoalModal = false;
    }
  }

  function contributeToGoal(goalId, amount) {
    if (amount > 0 && amount <= userCredits) {
      travelGoals = travelGoals.map(goal => {
        if (goal.id === goalId) {
          goal.currentAmount += amount;
          if (goal.currentAmount >= goal.targetAmount) {
            goal.completed = true;
            loyaltyPoints += 100;
            localStorage.setItem(`shiloh_loyalty_points_${user.id}`, loyaltyPoints.toString());
          }
        }
        return goal;
      });
      
      userCredits -= amount;
      localStorage.setItem(`shiloh_credits_${user.id}`, userCredits.toString());
      localStorage.setItem(`shiloh_travel_goals_${user.id}`, JSON.stringify(travelGoals));
    }
  }

  function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  function getNextMembershipLevel() {
    const levels = Object.keys(membershipLevels);
    const currentIndex = levels.indexOf(membershipLevel);
    return currentIndex < levels.length - 1 ? levels[currentIndex + 1] : null;
  }

  function getPointsToNextLevel() {
    const nextLevel = getNextMembershipLevel();
    return nextLevel ? membershipLevels[nextLevel].minPoints - loyaltyPoints : 0;
  }
</script>

<section class="bg-gray-50 py-12">
  <div class="container-custom">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-2">My Dashboard</h1>
      <p class="text-gray-600">Welcome back, {user?.firstName || 'Traveler'}! Manage your travel experience and track your journey with The Shiloh Experience.</p>
    </div>

    <!-- Quick Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <!-- Credits Card -->
      <div class="bg-white rounded-lg shadow-md p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Account Credits</p>
            <p class="text-2xl font-bold text-green-600">${userCredits.toFixed(2)}</p>
          </div>
          <div class="p-3 bg-green-100 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
          </div>
        </div>
        <button 
          class="mt-3 text-sm text-green-600 hover:text-green-700 font-medium"
          on:click={() => showAddCreditModal = true}
        >
          Add Credits
        </button>
      </div>

      <!-- Loyalty Points Card -->
      <div class="bg-white rounded-lg shadow-md p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Loyalty Points</p>
            <p class="text-2xl font-bold text-purple-600">{loyaltyPoints.toLocaleString()}</p>
          </div>
          <div class="p-3 bg-purple-100 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
        </div>
        <p class="mt-1 text-xs text-gray-500">
          {#if getNextMembershipLevel()}
            {getPointsToNextLevel()} points to {getNextMembershipLevel()}
          {:else}
            Maximum level achieved!
          {/if}
        </p>
      </div>

      <!-- Membership Level Card -->
      <div class="bg-white rounded-lg shadow-md p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Membership Level</p>
            <p class="text-lg font-bold text-gray-900">{membershipLevel}</p>
          </div>
          <div class="p-3 {membershipLevels[membershipLevel].color} rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
          </div>
        </div>
        <div class="mt-2">
          {#if getNextMembershipLevel()}
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div 
                class="bg-purple-500 h-2 rounded-full transition-all duration-300" 
                style="width: {((loyaltyPoints - membershipLevels[membershipLevel].minPoints) / (membershipLevels[getNextMembershipLevel()].minPoints - membershipLevels[membershipLevel].minPoints)) * 100}%"
              ></div>
            </div>
          {/if}
        </div>
      </div>

      <!-- Travel Goals Card -->
      <div class="bg-white rounded-lg shadow-md p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Active Travel Goals</p>
            <p class="text-2xl font-bold text-blue-600">{travelGoals.filter(g => !g.completed).length}</p>
          </div>
          <div class="p-3 bg-blue-100 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
          </div>
        </div>
        <button 
          class="mt-3 text-sm text-blue-600 hover:text-blue-700 font-medium"
          on:click={() => showAddGoalModal = true}
        >
          Add New Goal
        </button>
      </div>
    </div>

    <!-- Navigation Tabs -->
    <div class="bg-white rounded-lg shadow-md mb-8">
      <div class="flex border-b border-gray-200 overflow-x-auto">
        <button 
          class="px-6 py-4 text-gray-700 hover:text-primary focus:outline-none whitespace-nowrap {activeTab === 'dashboard' ? 'border-b-2 border-primary text-primary font-medium' : ''}" 
          on:click={() => activeTab = 'dashboard'}
        >
          Overview
        </button>
        <button 
          class="px-6 py-4 text-gray-700 hover:text-primary focus:outline-none whitespace-nowrap {activeTab === 'trips' ? 'border-b-2 border-primary text-primary font-medium' : ''}" 
          on:click={() => activeTab = 'trips'}
        >
          My Trips
        </button>
        <button 
          class="px-6 py-4 text-gray-700 hover:text-primary focus:outline-none whitespace-nowrap {activeTab === 'goals' ? 'border-b-2 border-primary text-primary font-medium' : ''}" 
          on:click={() => activeTab = 'goals'}
        >
          Travel Goals
        </button>
        <button 
          class="px-6 py-4 text-gray-700 hover:text-primary focus:outline-none whitespace-nowrap {activeTab === 'loyalty' ? 'border-b-2 border-primary text-primary font-medium' : ''}" 
          on:click={() => activeTab = 'loyalty'}
        >
          Loyalty Program
        </button>
      </div>
      
      <!-- Tab Content -->
      <div class="p-6">
        {#if activeTab === 'dashboard'}
          <!-- Overview Tab -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <!-- Upcoming Trips -->
            <div>
              <h3 class="text-lg font-semibold mb-4">Upcoming Trips</h3>
              {#if upcomingTrips.length > 0}
                <div class="space-y-4">
                  {#each upcomingTrips.slice(0, 3) as trip}
                    <div class="bg-gray-50 rounded-lg p-4">
                      <div class="flex justify-between items-start">
                        <div>
                          <h4 class="font-medium">{trip.item.name}</h4>
                          <p class="text-sm text-gray-600">{trip.item.location}</p>
                        </div>
                        <div class="text-right">
                          <p class="text-sm font-medium text-accent">
                            {calculateDaysUntil(trip.travelDate || trip.date)} days
                          </p>
                          <p class="text-xs text-gray-500">to go</p>
                        </div>
                      </div>
                      <div class="mt-2 pt-2 border-t border-gray-200">
                        <p class="text-sm text-gray-600">{formatDate(trip.travelDate || trip.date)}</p>
                      </div>
                    </div>
                  {/each}
                </div>
              {:else}
                <p class="text-gray-500">No upcoming trips. Start planning your next adventure!</p>
              {/if}
            </div>

            <!-- Recent Activity -->
            <div>
              <h3 class="text-lg font-semibold mb-4">Recent Activity</h3>
              <div class="space-y-3">
                <div class="flex items-center">
                  <div class="p-2 bg-green-100 rounded-full mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                  </div>
                  <div>
                    <p class="text-sm font-medium">Credits added to account</p>
                    <p class="text-xs text-gray-500">2 days ago</p>
                  </div>
                </div>
                <div class="flex items-center">
                  <div class="p-2 bg-purple-100 rounded-full mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <div>
                    <p class="text-sm font-medium">Earned 50 loyalty points</p>
                    <p class="text-xs text-gray-500">1 week ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Personalized Recommendations -->
          <div class="mt-8">
            <PersonalizedRecommendations {user} showCompact={false} category="all" maxItems={6} on:book />
          </div>

        {:else if activeTab === 'trips'}
          <!-- My Trips Tab -->
          <div>
            <h3 class="text-lg font-semibold mb-6">Trip Countdown</h3>
            {#if upcomingTrips.length > 0}
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {#each upcomingTrips as trip}
                  <div class="bg-gradient-to-br from-primary to-primary-dark text-white rounded-lg p-6">
                    <h4 class="font-semibold text-lg mb-2">{trip.item.name}</h4>
                    <p class="text-primary-light mb-4">{trip.item.location}</p>
                    <div class="text-center">
                      <div class="text-3xl font-bold mb-1">{calculateDaysUntil(trip.travelDate || trip.date)}</div>
                      <div class="text-sm text-primary-light">days to go</div>
                    </div>
                    <div class="mt-4 pt-4 border-t border-primary-light">
                      <p class="text-sm">{formatDate(trip.travelDate || trip.date)}</p>
                    </div>
                  </div>
                {/each}
              </div>
            {:else}
              <div class="text-center py-12">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                <h3 class="text-lg font-medium text-gray-900 mb-2">No upcoming trips</h3>
                <p class="text-gray-500 mb-6">Start planning your next Uganda adventure!</p>
                <button class="bg-primary hover:bg-primary-dark text-white py-2 px-6 rounded-md transition-colors">
                  Explore Tours
                </button>
              </div>
            {/if}
          </div>

        {:else if activeTab === 'goals'}
          <!-- Travel Goals Tab -->
          <div>
            <div class="flex justify-between items-center mb-6">
              <h3 class="text-lg font-semibold">Travel Goals & Savings</h3>
              <button 
                class="bg-primary hover:bg-primary-dark text-white py-2 px-4 rounded-md transition-colors"
                on:click={() => showAddGoalModal = true}
              >
                Add New Goal
              </button>
            </div>
            
            {#if travelGoals.length > 0}
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                {#each travelGoals as goal}
                  <div class="bg-white border border-gray-200 rounded-lg p-6 {goal.completed ? 'bg-green-50 border-green-200' : ''}">
                    <div class="flex justify-between items-start mb-4">
                      <h4 class="font-semibold text-lg">{goal.title}</h4>
                      {#if goal.completed}
                        <span class="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                          ✓ Completed
                        </span>
                      {/if}
                    </div>
                    
                    <div class="mb-4">
                      <div class="flex justify-between text-sm mb-1">
                        <span>Progress</span>
                        <span>${goal.currentAmount.toFixed(2)} / ${goal.targetAmount.toFixed(2)}</span>
                      </div>
                      <div class="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          class="bg-blue-500 h-2 rounded-full transition-all duration-300" 
                          style="width: {getProgressPercentage(goal.currentAmount, goal.targetAmount)}%"
                        ></div>
                      </div>
                    </div>
                    
                    <div class="flex justify-between items-center text-sm text-gray-600 mb-4">
                      <span>Target: {formatDate(goal.targetDate)}</span>
                      <span>{calculateDaysUntil(goal.targetDate)} days left</span>
                    </div>
                    
                    {#if !goal.completed}
                      <div class="flex space-x-2">
                        <input 
                          type="number" 
                          placeholder="Amount" 
                          class="flex-1 border border-gray-300 rounded-md px-3 py-1 text-sm"
                          min="1"
                          max={userCredits}
                        />
                        <button 
                          class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm transition-colors"
                          on:click={() => contributeToGoal(goal.id, 25)}
                        >
                          Add $25
                        </button>
                      </div>
                    {/if}
                  </div>
                {/each}
              </div>
            {:else}
              <div class="text-center py-12">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                <h3 class="text-lg font-medium text-gray-900 mb-2">No travel goals yet</h3>
                <p class="text-gray-500 mb-6">Set savings goals for your dream Uganda experiences!</p>
                <button 
                  class="bg-primary hover:bg-primary-dark text-white py-2 px-6 rounded-md transition-colors"
                  on:click={() => showAddGoalModal = true}
                >
                  Create Your First Goal
                </button>
              </div>
            {/if}
          </div>

        {:else if activeTab === 'loyalty'}
          <!-- Loyalty Program Tab -->
          <div>
            <div class="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg p-8 mb-8">
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="text-2xl font-bold mb-2">You're a {membershipLevel}!</h3>
                  <p class="text-purple-100">You have {loyaltyPoints.toLocaleString()} loyalty points</p>
                </div>
                <div class="text-right">
                  {#if getNextMembershipLevel()}
                    <p class="text-purple-100 text-sm">Next level: {getNextMembershipLevel()}</p>
                    <p class="text-lg font-semibold">{getPointsToNextLevel()} points to go</p>
                  {:else}
                    <p class="text-lg font-semibold">Maximum Level!</p>
                  {/if}
                </div>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {#each Object.entries(membershipLevels) as [level, details]}
                <div class="bg-white border-2 rounded-lg p-6 {membershipLevel === level ? 'border-purple-500 bg-purple-50' : 'border-gray-200'}">
                  <div class="flex items-center mb-4">
                    <div class="p-2 {details.color} rounded-full mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                      </svg>
                    </div>
                    <div>
                      <h4 class="font-semibold">{level}</h4>
                      <p class="text-sm text-gray-600">{details.minPoints}+ points</p>
                    </div>
                  </div>
                  <ul class="space-y-1">
                    {#each details.benefits as benefit}
                      <li class="text-sm text-gray-600 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                        {benefit}
                      </li>
                    {/each}
                  </ul>
                </div>
              {/each}
            </div>
          </div>
        {/if}
      </div>
    </div>
  </div>
</section>

<!-- Add Credits Modal -->
{#if showAddCreditModal}
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-lg w-full max-w-md">
      <div class="p-6">
        <h3 class="text-lg font-semibold mb-4">Add Credits to Your Account</h3>
        <div class="mb-4">
          <label for="creditAmount" class="block text-sm font-medium text-gray-700 mb-2">Amount (USD)</label>
          <input 
            type="number" 
            id="creditAmount"
            bind:value={creditAmount}
            min="1"
            step="0.01"
            class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Enter amount"
          />
        </div>
        <p class="text-sm text-gray-600 mb-6">
          You'll earn {Math.floor(creditAmount / 10)} loyalty points for this transaction.
        </p>
        <div class="flex justify-end space-x-3">
          <button 
            class="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            on:click={() => showAddCreditModal = false}
          >
            Cancel
          </button>
          <button 
            class="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md transition-colors"
            on:click={addCredits}
            disabled={!creditAmount || creditAmount <= 0}
          >
            Add Credits
          </button>
        </div>
      </div>
    </div>
  </div>
{/if}

<!-- Add Goal Modal -->
{#if showAddGoalModal}
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-lg w-full max-w-md">
      <div class="p-6">
        <h3 class="text-lg font-semibold mb-4">Create Travel Goal</h3>
        <div class="space-y-4">
          <div>
            <label for="goalTitle" class="block text-sm font-medium text-gray-700 mb-2">Goal Title</label>
            <input 
              type="text" 
              id="goalTitle"
              bind:value={newGoalTitle}
              class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="e.g., Gorilla Trekking Adventure"
            />
          </div>
          <div>
            <label for="goalAmount" class="block text-sm font-medium text-gray-700 mb-2">Target Amount (USD)</label>
            <input 
              type="number" 
              id="goalAmount"
              bind:value={newGoalAmount}
              min="1"
              step="0.01"
              class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Enter target amount"
            />
          </div>
          <div>
            <label for="goalDate" class="block text-sm font-medium text-gray-700 mb-2">Target Date</label>
            <input 
              type="date" 
              id="goalDate"
              bind:value={newGoalDate}
              class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>
        <div class="flex justify-end space-x-3 mt-6">
          <button 
            class="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            on:click={() => showAddGoalModal = false}
          >
            Cancel
          </button>
          <button 
            class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors"
            on:click={addTravelGoal}
            disabled={!newGoalTitle || !newGoalAmount || !newGoalDate}
          >
            Create Goal
          </button>
        </div>
      </div>
    </div>
  </div>
{/if}
