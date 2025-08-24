<script>
  let downloads = [];
  
  // Downloadable resources data
  const resourceCategories = [
    {
      id: 'guides',
      name: 'Travel Guides',
      icon: '📚',
      description: 'Comprehensive PDF guides for offline reading',
      resources: [
        {
          id: 1,
          title: 'Complete Uganda Travel Guide 2025',
          description: 'Everything you need to know about traveling to Uganda',
          fileSize: '15.2 MB',
          format: 'PDF',
          pages: 124,
          lastUpdated: '2024-11-15',
          downloadCount: 2847,
          language: 'English',
          preview: 'Complete guide covering all national parks, cities, practical information, and travel tips.',
          category: 'guides'
        },
        {
          id: 2,
          title: 'Gorilla Trekking Complete Guide',
          description: 'Detailed guide for gorilla trekking in Bwindi and Mgahinga',
          fileSize: '8.7 MB',
          format: 'PDF',
          pages: 48,
          lastUpdated: '2024-11-20',
          downloadCount: 1923,
          language: 'English',
          preview: 'Permits, preparation, what to expect, packing lists, and conservation information.',
          category: 'guides'
        },
        {
          id: 3,
          title: 'Uganda Safari Guide',
          description: 'Wildlife and safari destinations across Uganda',
          fileSize: '12.4 MB',
          format: 'PDF',
          pages: 86,
          lastUpdated: '2024-11-10',
          downloadCount: 1534,
          language: 'English',
          preview: 'All national parks, wildlife, best times to visit, and safari tips.',
          category: 'guides'
        }
      ]
    },
    {
      id: 'maps',
      name: 'Maps & Navigation',
      icon: '🗺️',
      description: 'Offline maps and navigation resources',
      resources: [
        {
          id: 4,
          title: 'Uganda National Parks Map',
          description: 'High-resolution map of all national parks',
          fileSize: '25.6 MB',
          format: 'PDF',
          pages: 1,
          lastUpdated: '2024-11-01',
          downloadCount: 3421,
          language: 'English',
          preview: 'Detailed map showing all national parks, roads, distances, and key attractions.',
          category: 'maps'
        },
        {
          id: 5,
          title: 'Kampala City Map',
          description: 'Detailed street map of Kampala with attractions',
          fileSize: '18.3 MB',
          format: 'PDF',
          pages: 2,
          lastUpdated: '2024-10-25',
          downloadCount: 2156,
          language: 'English',
          preview: 'Street-level map of Kampala with hotels, restaurants, attractions, and transport.',
          category: 'maps'
        },
        {
          id: 6,
          title: 'Bwindi Forest Trekking Map',
          description: 'Trail maps for gorilla trekking sectors',
          fileSize: '9.8 MB',
          format: 'PDF',
          pages: 4,
          lastUpdated: '2024-11-12',
          downloadCount: 1789,
          language: 'English',
          preview: 'Detailed trail maps for all four trekking sectors with difficulty levels.',
          category: 'maps'
        }
      ]
    },
    {
      id: 'checklists',
      name: 'Checklists & Planning',
      icon: '📋',
      description: 'Printable checklists and planning tools',
      resources: [
        {
          id: 7,
          title: 'Uganda Travel Checklist',
          description: 'Complete pre-travel checklist',
          fileSize: '2.1 MB',
          format: 'PDF',
          pages: 8,
          lastUpdated: '2024-11-18',
          downloadCount: 4523,
          language: 'English',
          preview: 'Visa requirements, vaccinations, packing lists, booking timeline, and travel insurance.',
          category: 'checklists'
        },
        {
          id: 8,
          title: 'Safari Packing Checklist',
          description: 'Essential items for Uganda safari',
          fileSize: '1.8 MB',
          format: 'PDF',
          pages: 4,
          lastUpdated: '2024-11-15',
          downloadCount: 2934,
          language: 'English',
          preview: 'Clothing, equipment, photography gear, and seasonal considerations.',
          category: 'checklists'
        },
        {
          id: 9,
          title: 'Emergency Contact List',
          description: 'Printable emergency contacts for Uganda',
          fileSize: '1.2 MB',
          format: 'PDF',
          pages: 2,
          lastUpdated: '2024-11-22',
          downloadCount: 1876,
          language: 'English',
          preview: 'Emergency services, hospitals, embassies, and important phone numbers.',
          category: 'checklists'
        }
      ]
    },
    {
      id: 'language',
      name: 'Language & Culture',
      icon: '🗣️',
      description: 'Language guides and cultural information',
      resources: [
        {
          id: 10,
          title: 'Basic Luganda Phrases',
          description: 'Essential Luganda phrases for travelers',
          fileSize: '3.4 MB',
          format: 'PDF',
          pages: 12,
          lastUpdated: '2024-10-30',
          downloadCount: 1654,
          language: 'English/Luganda',
          preview: 'Common greetings, directions, shopping, dining, and emergency phrases.',
          category: 'language'
        },
        {
          id: 11,
          title: 'Uganda Cultural Guide',
          description: 'Understanding Ugandan culture and customs',
          fileSize: '6.7 MB',
          format: 'PDF',
          pages: 32,
          lastUpdated: '2024-11-05',
          downloadCount: 987,
          language: 'English',
          preview: 'Cultural etiquette, traditional practices, festivals, and social customs.',
          category: 'language'
        }
      ]
    }
  ];

  // Flatten all resources for filtering
  const allResources = resourceCategories.flatMap(cat => cat.resources);

  let selectedCategory = 'all';
  let searchTerm = '';

  function downloadResource(resource) {
    // Simulate download - in real app would trigger actual file download
    downloads = [...downloads, {
      ...resource,
      downloadedAt: new Date(),
      status: 'downloading'
    }];

    // Simulate download progress
    setTimeout(() => {
      downloads = downloads.map(d => 
        d.id === resource.id ? { ...d, status: 'completed' } : d
      );
    }, 2000);

    // In real implementation:
    // const link = document.createElement('a');
    // link.href = `/downloads/${resource.filename}`;
    // link.download = resource.filename;
    // link.click();
  }

  function removeDownload(resourceId) {
    downloads = downloads.filter(d => d.id !== resourceId);
  }

  function formatFileSize(sizeStr) {
    return sizeStr;
  }

  function formatDate(dateStr) {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  $: filteredResources = allResources
    .filter(resource => selectedCategory === 'all' || resource.category === selectedCategory)
    .filter(resource => 
      searchTerm === '' || 
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
</script>

<div class="py-8">
  <div class="container-custom">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-4xl font-bold mb-4">📥 Downloadable Resources</h1>
      <p class="text-lg text-gray-600 max-w-3xl">
        Download comprehensive guides, maps, and checklists for offline access during your Uganda journey.
      </p>
    </div>

    <!-- Search and Filter -->
    <div class="bg-white rounded-lg shadow-md p-6 mb-8">
      <div class="flex flex-col md:flex-row gap-4">
        <!-- Search -->
        <div class="flex-1">
          <div class="relative">
            <input 
              type="text" 
              placeholder="Search resources..."
              bind:value={searchTerm}
              class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        <!-- Category Filter -->
        <div class="flex flex-wrap gap-2">
          <button 
            class="px-4 py-2 rounded-lg text-sm font-medium transition-colors {selectedCategory === 'all' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}"
            on:click={() => selectedCategory = 'all'}
          >
            All Resources
          </button>
          {#each resourceCategories as category}
            <button 
              class="px-4 py-2 rounded-lg text-sm font-medium transition-colors {selectedCategory === category.id ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}"
              on:click={() => selectedCategory = category.id}
            >
              {category.icon} {category.name}
            </button>
          {/each}
        </div>
      </div>
    </div>

    <!-- Current Downloads -->
    {#if downloads.length > 0}
      <div class="bg-white rounded-lg shadow-md p-6 mb-8">
        <h3 class="text-lg font-semibold mb-4">📂 Your Downloads</h3>
        <div class="space-y-3">
          {#each downloads as download}
            <div class="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <div class="flex items-center">
                <div class="p-2 bg-blue-100 rounded-full mr-3">
                  📄
                </div>
                <div>
                  <p class="font-medium">{download.title}</p>
                  <p class="text-sm text-gray-600">
                    {download.format} • {download.fileSize}
                    {#if download.status === 'downloading'}
                      • Downloading...
                    {:else}
                      • Downloaded {download.downloadedAt.toLocaleTimeString()}
                    {/if}
                  </p>
                </div>
              </div>
              <div class="flex items-center space-x-2">
                {#if download.status === 'downloading'}
                  <div class="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                {:else}
                  <button 
                    class="text-green-600 hover:text-green-700 text-sm font-medium"
                    on:click={() => downloadResource(download)}
                  >
                    Re-download
                  </button>
                {/if}
                <button 
                  class="text-red-600 hover:text-red-700 text-sm"
                  on:click={() => removeDownload(download.id)}
                >
                  ✕
                </button>
              </div>
            </div>
          {/each}
        </div>
      </div>
    {/if}

    <!-- Resources Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each filteredResources as resource}
        <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
          <!-- Header -->
          <div class="p-4 border-b border-gray-200 bg-gradient-to-r from-primary-light/10 to-primary/10">
            <div class="flex items-start justify-between">
              <div class="flex items-center">
                <div class="p-2 bg-primary-light/20 rounded-full mr-3">
                  {resourceCategories.find(cat => cat.id === resource.category)?.icon || '📄'}
                </div>
                <div>
                  <span class="text-xs font-medium text-primary uppercase tracking-wide">
                    {resource.format}
                  </span>
                  <p class="text-xs text-gray-600">{resource.fileSize}</p>
                </div>
              </div>
              <div class="text-right">
                <p class="text-xs text-gray-500">{resource.downloadCount} downloads</p>
              </div>
            </div>
          </div>

          <!-- Content -->
          <div class="p-4">
            <h3 class="font-semibold text-lg mb-2">{resource.title}</h3>
            <p class="text-gray-600 text-sm mb-3">{resource.description}</p>
            
            <!-- Preview -->
            <div class="bg-gray-50 p-3 rounded-lg mb-4">
              <p class="text-xs text-gray-700">{resource.preview}</p>
            </div>

            <!-- Meta Info -->
            <div class="grid grid-cols-2 gap-4 text-xs text-gray-600 mb-4">
              <div>
                <p><strong>Pages:</strong> {resource.pages}</p>
                <p><strong>Language:</strong> {resource.language}</p>
              </div>
              <div>
                <p><strong>Updated:</strong> {formatDate(resource.lastUpdated)}</p>
                <p><strong>Size:</strong> {formatFileSize(resource.fileSize)}</p>
              </div>
            </div>

            <!-- Actions -->
            <div class="flex space-x-2">
              <button 
                class="flex-1 bg-primary hover:bg-primary-dark text-white py-2 px-4 rounded-md transition-colors font-medium text-sm"
                on:click={() => downloadResource(resource)}
              >
                📥 Download
              </button>
              <button 
                class="bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-3 rounded-md transition-colors text-sm"
                title="Preview"
              >
                👁️
              </button>
              <button 
                class="bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-3 rounded-md transition-colors text-sm"
                title="Share"
              >
                📤
              </button>
            </div>
          </div>
        </div>
      {/each}
    </div>

    {#if filteredResources.length === 0}
      <div class="text-center py-12">
        <div class="text-6xl mb-4">🔍</div>
        <h3 class="text-lg font-medium text-gray-900 mb-2">No resources found</h3>
        <p class="text-gray-600">Try adjusting your search terms or category filter.</p>
      </div>
    {/if}

    <!-- Download Tips -->
    <div class="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
      <h3 class="text-lg font-semibold mb-4">📱 Download Tips</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-sm">
        <div>
          <h4 class="font-medium text-blue-800 mb-2">📶 Offline Access</h4>
          <p class="text-blue-700">Download resources before traveling to areas with limited internet connectivity.</p>
        </div>
        <div>
          <h4 class="font-medium text-blue-800 mb-2">📱 Mobile Friendly</h4>
          <p class="text-blue-700">All PDFs are optimized for mobile devices and can be viewed on smartphones and tablets.</p>
        </div>
        <div>
          <h4 class="font-medium text-blue-800 mb-2">🔄 Regular Updates</h4>
          <p class="text-blue-700">Resources are regularly updated with the latest information and travel conditions.</p>
        </div>
      </div>
    </div>
  </div>
</div>
