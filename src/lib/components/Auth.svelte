<script>
  import { createEventDispatcher } from 'svelte';
  
  const dispatch = createEventDispatcher();
  
  let isRegisterMode = false;
  let email = '';
  let password = '';
  let name = '';
  let confirmPassword = '';
  let errorMessage = '';
  
  function toggleMode() {
    isRegisterMode = !isRegisterMode;
    errorMessage = '';
  }
  
  function handleClose() {
    dispatch('close');
  }
  
  function handleAuth() {
    // Reset error message
    errorMessage = '';
    
    // Form validation
    if (!email || !password) {
      errorMessage = 'Please enter both email and password';
      return;
    }
    
    if (isRegisterMode) {
      if (!name) {
        errorMessage = 'Please enter your name';
        return;
      }
      
      if (password !== confirmPassword) {
        errorMessage = 'Passwords do not match';
        return;
      }
      
      // In a real app, this would call an API to register the user
      // For now, we'll simulate success and immediately log in
      const user = {
        id: 'user_' + Math.floor(Math.random() * 10000),
        name,
        email,
        role: email === 'admin@shilohexperience.com' ? 'admin' : 'customer',
        createdAt: new Date().toISOString()
      };
      
      dispatch('login', { user });
    } else {
      // In a real app, this would call an API to authenticate
      // For now, we'll simulate success with mock data
      const user = {
        id: 'user_' + Math.floor(Math.random() * 10000),
        name: email === 'admin@shilohexperience.com' ? 'Admin User' : 'Demo User',
        email,
        role: email === 'admin@shilohexperience.com' ? 'admin' : 'customer',
        createdAt: '2023-01-01T00:00:00Z'
      };
      
      dispatch('login', { user });
    }
  }
</script>

<!-- Modal Overlay -->
<div class="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4" on:click={handleClose}>
  <!-- Modal Content -->
  <div class="bg-white rounded-lg shadow-xl w-full max-w-md animate-fade-in" on:click|stopPropagation>
    <!-- Modal Header -->
    <div class="flex justify-between items-center p-6 border-b">
      <h2 class="text-2xl font-semibold text-gray-800">
        {isRegisterMode ? 'Create Account' : 'Sign In'}
      </h2>
      <button 
        class="text-gray-500 hover:text-gray-800 focus:outline-none" 
        on:click={handleClose}
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
    
    <!-- Modal Body -->
    <div class="p-6">
      {#if errorMessage}
        <div class="mb-4 bg-red-50 border border-red-200 text-red-700 p-3 rounded-md">
          {errorMessage}
        </div>
      {/if}
      
      <form on:submit|preventDefault={handleAuth}>
        {#if isRegisterMode}
          <div class="mb-4">
            <label for="name" class="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input 
              type="text" 
              id="name" 
              bind:value={name} 
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Enter your full name"
            />
          </div>
        {/if}
        
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input 
            type="email" 
            id="email" 
            bind:value={email} 
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Enter your email"
          />
        </div>
        
        <div class="mb-4">
          <label for="password" class="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input 
            type="password" 
            id="password" 
            bind:value={password} 
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Enter your password"
          />
        </div>
        
        {#if isRegisterMode}
          <div class="mb-4">
            <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input 
              type="password" 
              id="confirmPassword" 
              bind:value={confirmPassword} 
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Confirm your password"
            />
          </div>
        {/if}
        
        <button 
          type="submit" 
          class="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-2.5 px-4 rounded-md transition-colors mt-2"
        >
          {isRegisterMode ? 'Create Account' : 'Sign In'}
        </button>
      </form>
      
      <div class="mt-4 text-center">
        <p class="text-gray-600">
          {isRegisterMode ? 'Already have an account?' : 'Don\'t have an account?'}
          <button 
            class="text-primary hover:text-primary-dark font-medium focus:outline-none ml-1" 
            on:click={toggleMode}
          >
            {isRegisterMode ? 'Sign In' : 'Register Now'}
          </button>
        </p>
      </div>
    </div>
  </div>
</div>

<style>
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-fade-in {
    animation: fadeIn 0.3s ease-in-out forwards;
  }
</style>
