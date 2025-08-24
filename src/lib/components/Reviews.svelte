<script>
  import { createEventDispatcher } from 'svelte';
  
  const dispatch = createEventDispatcher();
  let activeTab = 'all';
  let sortBy = 'newest';

  // Review data from multiple sources
  const reviews = [
    {
      id: 1,
      source: 'tripadvisor',
      sourceLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/TripAdvisor_logo.svg/320px-TripAdvisor_logo.svg.png',
      sourceUrl: 'https://tripadvisor.com/shiloh-experience',
      customerName: 'Michael Chen',
      customerAvatar: 'MC',
      location: 'Singapore',
      rating: 5,
      date: '2025-11-15',
      verified: true,
      title: 'Outstanding Safari Experience',
      review: 'The Shiloh Experience exceeded all our expectations! The gorilla trekking tour was perfectly organized, our guide James was incredibly knowledgeable, and the accommodations were top-notch. The attention to detail and genuine care for their guests really sets them apart.',
      helpful: 24,
      property: 'Shiloh Safari Tours',
      images: ['images/review-1-photo.jpg']
    },
    {
      id: 2,
      source: 'google',
      sourceLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/320px-Google_2015_logo.svg.png',
      sourceUrl: 'https://google.com/maps/shiloh-experience',
      customerName: 'Sarah Williams',
      customerAvatar: 'SW',
      location: 'London, UK',
      rating: 5,
      date: '2025-11-10',
      verified: true,
      title: 'Perfect Family Vacation',
      review: 'We stayed at the Muyenga guest home for a week with our three children. The staff were amazing with kids, the location is secure and peaceful, and the cultural experiences they arranged were educational and fun. Best family vacation ever!',
      helpful: 18,
      property: 'Shiloh Guest Home - Muyenga',
      images: []
    },
    {
      id: 3,
      source: 'tripadvisor',
      sourceLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/TripAdvisor_logo.svg/320px-TripAdvisor_logo.svg.png',
      sourceUrl: 'https://tripadvisor.com/shiloh-experience',
      customerName: 'Ahmed Hassan',
      customerAvatar: 'AH',
      location: 'Dubai, UAE',
      rating: 4,
      date: '2025-10-28',
      verified: true,
      title: 'Great Value for Money',
      review: 'Professional service and competitive pricing. The car hire service was reliable throughout our 10-day trip. Some minor issues with WiFi at one location, but overall very satisfied with the experience.',
      helpful: 12,
      property: 'Shiloh Car Hire Service',
      images: ['images/review-3-photo.jpg']
    },
    {
      id: 4,
      source: 'google',
      sourceLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/320px-Google_2015_logo.svg.png',
      sourceUrl: 'https://google.com/maps/shiloh-experience',
      customerName: 'Maria Rodriguez',
      customerAvatar: 'MR',
      location: 'Madrid, Spain',
      rating: 5,
      date: '2025-10-15',
      verified: true,
      title: 'Exceptional Customer Service',
      review: 'From booking to departure, every detail was handled professionally. The team went above and beyond when we had a flight delay, rearranging our entire itinerary without extra charges. Truly exceptional service!',
      helpful: 31,
      property: 'Shiloh Guest Home - Muyenga',
      images: []
    },
    {
      id: 5,
      source: 'booking',
      sourceLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Booking.com_logo.svg/320px-Booking.com_logo.svg.png',
      sourceUrl: 'https://booking.com/shiloh-experience',
      customerName: 'Johan Eriksson',
      customerAvatar: 'JE',
      location: 'Stockholm, Sweden',
      rating: 5,
      date: '2025-09-22',
      verified: true,
      title: 'Wildlife Photography Paradise',
      review: 'As a wildlife photographer, I\'ve traveled extensively. The access to prime shooting locations and the guides\' knowledge of animal behavior patterns made this trip incredibly productive. Got shots I\'ve been dreaming of for years!',
      helpful: 27,
      property: 'Shiloh Safari Tours',
      images: ['images/review-5-photo1.jpg', 'images/review-5-photo2.jpg']
    },
    {
      id: 6,
      source: 'tripadvisor',
      sourceLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/TripAdvisor_logo.svg/320px-TripAdvisor_logo.svg.png',
      sourceUrl: 'https://tripadvisor.com/shiloh-experience',
      customerName: 'Priya Patel',
      customerAvatar: 'PP',
      location: 'Mumbai, India',
      rating: 4,
      date: '2025-09-08',
      verified: true,
      title: 'Authentic Cultural Experience',
      review: 'The cultural village visits were authentic and respectful. Great balance between tourism and supporting local communities. The traditional cooking class was a highlight. Only wished we had more time!',
      helpful: 15,
      property: 'Cultural Tours Package',
      images: ['images/review-6-photo.jpg']
    }
  ];

  // Filter and sort reviews
  $: filteredReviews = reviews
    .filter(review => {
      if (activeTab === 'all') return true;
      return review.source === activeTab;
    })
    .sort((a, b) => {
      if (sortBy === 'newest') return new Date(b.date) - new Date(a.date);
      if (sortBy === 'oldest') return new Date(a.date) - new Date(b.date);
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'helpful') return b.helpful - a.helpful;
      return 0;
    });

  // Calculate statistics
  $: averageRating = (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1);
  $: totalReviews = reviews.length;
  $: ratingDistribution = {
    5: reviews.filter(r => r.rating === 5).length,
    4: reviews.filter(r => r.rating === 4).length,
    3: reviews.filter(r => r.rating === 3).length,
    2: reviews.filter(r => r.rating === 2).length,
    1: reviews.filter(r => r.rating === 1).length
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  }

  function openReviewSource(url) {
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  function markHelpful(reviewId) {
    // In a real app, this would make an API call
    console.log('Marked review as helpful:', reviewId);
  }
</script>

<div class="pt-16 pb-8">
  <div class="container-custom">
    <!-- Header -->
    <div class="mb-8 text-center">
      <h1 class="text-4xl font-bold mb-4">Reviews & Testimonials</h1>
      <p class="text-lg text-gray-600 max-w-3xl mx-auto">
        See what our guests are saying about their experiences with The Shiloh Experience. 
        Real reviews from verified customers across multiple platforms.
      </p>
    </div>

    <!-- Stats Overview -->
    <div class="bg-white shadow-md rounded-lg p-8 mb-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Overall Rating -->
        <div class="text-center">
          <div class="text-5xl font-bold text-primary mb-2">{averageRating}</div>
          <div class="flex justify-center mb-2">
            {#each Array(5) as _, i}
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 {i < Math.floor(averageRating) ? 'text-yellow-400' : 'text-gray-300'}" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            {/each}
          </div>
          <p class="text-gray-600">Average Rating</p>
          <p class="text-sm text-gray-500">Based on {totalReviews} reviews</p>
        </div>

        <!-- Rating Distribution -->
        <div>
          <h3 class="font-semibold mb-4 text-center">Rating Distribution</h3>
          {#each [5, 4, 3, 2, 1] as rating}
            <div class="flex items-center mb-2">
              <span class="text-sm w-8">{rating}★</span>
              <div class="flex-1 bg-gray-200 rounded-full h-2 mx-2">
                <div 
                  class="bg-yellow-400 h-2 rounded-full" 
                  style="width: {(ratingDistribution[rating] / totalReviews) * 100}%"
                ></div>
              </div>
              <span class="text-sm text-gray-600 w-8">{ratingDistribution[rating]}</span>
            </div>
          {/each}
        </div>

        <!-- Review Sources -->
        <div>
          <h3 class="font-semibold mb-4 text-center">Review Sources</h3>
          <div class="space-y-3">
            <div class="flex justify-between items-center">
              <div class="flex items-center">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/TripAdvisor_logo.svg/320px-TripAdvisor_logo.svg.png" alt="TripAdvisor" class="h-6 w-auto mr-2" />
                <span class="text-sm">TripAdvisor</span>
              </div>
              <span class="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                {reviews.filter(r => r.source === 'tripadvisor').length} reviews
              </span>
            </div>
            <div class="flex justify-between items-center">
              <div class="flex items-center">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/320px-Google_2015_logo.svg.png" alt="Google" class="h-6 w-auto mr-2" />
                <span class="text-sm">Google</span>
              </div>
              <span class="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                {reviews.filter(r => r.source === 'google').length} reviews
              </span>
            </div>
            <div class="flex justify-between items-center">
              <div class="flex items-center">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Booking.com_logo.svg/320px-Booking.com_logo.svg.png" alt="Booking.com" class="h-6 w-auto mr-2" />
                <span class="text-sm">Booking.com</span>
              </div>
              <span class="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs">
                {reviews.filter(r => r.source === 'booking').length} reviews
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Filters and Controls -->
    <div class="bg-white shadow-md rounded-lg p-6 mb-8">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <!-- Source Filter Tabs -->
        <div class="flex space-x-2 overflow-x-auto pb-2">
          <button
            class="flex-shrink-0 px-3 sm:px-4 py-2 rounded-md font-medium transition-colors whitespace-nowrap {activeTab === 'all' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}"
            on:click={() => activeTab = 'all'}
          >
            All <span class="hidden sm:inline">Sources </span>({totalReviews})
          </button>
          <button
            class="flex-shrink-0 px-3 sm:px-4 py-2 rounded-md font-medium transition-colors whitespace-nowrap {activeTab === 'tripadvisor' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}"
            on:click={() => activeTab = 'tripadvisor'}
          >
            TripAdvisor
          </button>
          <button
            class="flex-shrink-0 px-3 sm:px-4 py-2 rounded-md font-medium transition-colors whitespace-nowrap {activeTab === 'google' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}"
            on:click={() => activeTab = 'google'}
          >
            Google
          </button>
          <button
            class="flex-shrink-0 px-3 sm:px-4 py-2 rounded-md font-medium transition-colors whitespace-nowrap {activeTab === 'booking' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}"
            on:click={() => activeTab = 'booking'}
          >
            Booking.com
          </button>
        </div>

        <!-- Sort Controls -->
        <div class="flex items-center space-x-2">
          <label for="sort" class="text-sm font-medium text-gray-700">Sort by:</label>
          <select 
            id="sort" 
            bind:value={sortBy}
            class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="rating">Highest Rating</option>
            <option value="helpful">Most Helpful</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Reviews Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {#each filteredReviews as review (review.id)}
        <div class="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow">
          <!-- Review Header -->
          <div class="flex justify-between items-start mb-4">
            <div class="flex items-center">
              <div class="rounded-full bg-primary text-white h-12 w-12 flex items-center justify-center text-sm font-bold mr-3">
                {review.customerAvatar}
              </div>
              <div>
                <h4 class="font-semibold text-gray-900">{review.customerName}</h4>
                <p class="text-sm text-gray-600">{review.location}</p>
                <p class="text-xs text-gray-500">{formatDate(review.date)}</p>
              </div>
            </div>
            <div class="flex items-center">
              {#if review.verified}
                <span class="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium mr-2">
                  ✓ Verified
                </span>
              {/if}
              <button 
                class="p-1 hover:bg-gray-100 rounded"
                on:click={() => openReviewSource(review.sourceUrl)}
                title="View on {review.source}"
              >
                <img src={review.sourceLogo} alt={review.source} class="h-6 w-auto" />
              </button>
            </div>
          </div>

          <!-- Rating and Title -->
          <div class="mb-3">
            <div class="flex items-center mb-2">
              <div class="flex mr-2">
                {#each Array(5) as _, i}
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 {i < review.rating ? 'text-yellow-400' : 'text-gray-300'}" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                {/each}
              </div>
              <span class="text-sm text-gray-600">{review.rating}/5</span>
            </div>
            <h5 class="font-semibold text-gray-900">{review.title}</h5>
            <p class="text-sm text-gray-600">{review.property}</p>
          </div>

          <!-- Review Content -->
          <p class="text-gray-700 mb-4 leading-relaxed">{review.review}</p>

          <!-- Review Images -->
          {#if review.images.length > 0}
            <div class="flex space-x-2 mb-4">
              {#each review.images as image}
                <img src={image} alt="Review photo" class="h-20 w-20 object-cover rounded-md" />
              {/each}
            </div>
          {/if}

          <!-- Review Actions -->
          <div class="flex justify-between items-center pt-4 border-t border-gray-100">
            <button 
              class="flex items-center text-sm text-gray-600 hover:text-primary transition-colors"
              on:click={() => markHelpful(review.id)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V9a2 2 0 00-2-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v2a2 2 0 00-2 2v1h6m7 0V9a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-1z" />
              </svg>
              Helpful ({review.helpful})
            </button>
            <button 
              class="text-sm text-primary hover:text-primary-dark font-medium"
              on:click={() => openReviewSource(review.sourceUrl)}
            >
              View on {review.source}
            </button>
          </div>
        </div>
      {/each}
    </div>

    <!-- Load More / Pagination would go here -->
    <div class="text-center mt-12">
      <button class="bg-primary hover:bg-primary-dark text-white py-3 px-8 rounded-md font-semibold transition-colors">
        Load More Reviews
      </button>
    </div>

    <!-- Call to Action -->
    <div class="bg-gradient-to-r from-accent to-accent-dark rounded-lg p-8 mt-12 text-center text-white">
      <h3 class="text-2xl font-bold mb-4">Share Your Experience</h3>
      <p class="mb-6 max-w-2xl mx-auto">
        Help future travelers by sharing your experience with The Shiloh Experience. 
        Your review helps us improve and assists others in planning their perfect Ugandan adventure.
      </p>
      <div class="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
        <button 
          class="bg-white text-accent hover:bg-gray-100 py-3 px-6 rounded-md font-semibold transition-colors"
          on:click={() => openReviewSource('https://tripadvisor.com/shiloh-experience')}
        >
          Review on TripAdvisor
        </button>
        <button 
          class="bg-white text-accent hover:bg-gray-100 py-3 px-6 rounded-md font-semibold transition-colors"
          on:click={() => openReviewSource('https://google.com/maps/shiloh-experience')}
        >
          Review on Google
        </button>
      </div>
    </div>
  </div>
</div>
