<script>
  import { onMount } from 'svelte';
  import { lazyLoadImage } from '../utils/performance.js';
  
  export let src = '';
export let alt = '';
export let placeholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2YzZjRmNiIvPjx0ZXh0IHg9IjUwIiB5PSI1NSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM5Y2EzYWYiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkxvYWRpbmcuLi48L3RleHQ+PC9zdmc+';
export let className = '';
  
  let imgElement;
  let loaded = false;
  let error = false;
  
  onMount(() => {
    if (imgElement && src) {
      lazyLoadImage(imgElement, src);
      
      imgElement.addEventListener('load', () => {
        loaded = true;
      });
      
      imgElement.addEventListener('error', () => {
        error = true;
      });
    }
  });
</script>

<div class="lazy-image-container {className}" style:width style:height>
  <img
    bind:this={imgElement}
    src={placeholder}
    {alt}
    class="lazy-image"
    class:loaded
    class:error
  />
  
  {#if !loaded && !error}
    <div class="lazy-image-loader">
      <div class="spinner"></div>
    </div>
  {/if}
  
  {#if error}
    <div class="lazy-image-error">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM13 17h-2v-2h2v2zm0-4h-2V7h2v6z" fill="currentColor"/>
      </svg>
      <span>Failed to load image</span>
    </div>
  {/if}
</div>

<style>
  .lazy-image-container {
    position: relative;
    overflow: hidden;
    background-color: #f3f4f6;
    border-radius: 0.375rem;
  }
  
  .lazy-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: opacity 0.3s ease;
    opacity: 0.7;
  }
  
  .lazy-image.loaded {
    opacity: 1;
  }
  
  .lazy-image.error {
    opacity: 0.3;
  }
  
  .lazy-image-loader {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  
  .spinner {
    width: 20px;
    height: 20px;
    border: 2px solid #e5e7eb;
    border-top: 2px solid #3b82f6;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  .lazy-image-error {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    color: #6b7280;
    font-size: 0.875rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
</style>
