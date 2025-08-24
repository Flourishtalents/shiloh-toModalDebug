// Performance utilities for lightning-fast rendering

/**
 * Debounce function to prevent excessive function calls
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @param {boolean} immediate - Execute immediately on first call
 * @returns {Function} Debounced function
 */
export function debounce(func, wait, immediate = false) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      timeout = null;
      if (!immediate) func(...args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func(...args);
  };
}

/**
 * Throttle function to limit function execution frequency
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in milliseconds
 * @returns {Function} Throttled function
 */
export function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

/**
 * Lazy image loading with intersection observer
 * @param {HTMLElement} img - Image element
 * @param {string} src - Image source URL
 * @param {Object} options - Observer options
 */
export function lazyLoadImage(img, src, options = {}) {
  const defaultOptions = {
    root: null,
    rootMargin: '50px',
    threshold: 0.1
  };
  
  const config = { ...defaultOptions, ...options };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const image = entry.target;
        image.src = src;
        image.classList.add('loaded');
        observer.unobserve(image);
      }
    });
  }, config);
  
  observer.observe(img);
}

/**
 * Preload critical resources
 * @param {Array} resources - Array of resource URLs
 * @param {string} type - Resource type (script, style, image)
 */
export function preloadResources(resources, type = 'script') {
  resources.forEach(resource => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = resource;
    link.as = type;
    document.head.appendChild(link);
  });
}

/**
 * Memory-efficient component store
 */
export class ComponentStore {
  constructor(maxSize = 5) {
    this.cache = new Map();
    this.maxSize = maxSize;
    this.accessOrder = [];
  }
  
  set(key, component) {
    if (this.cache.has(key)) {
      this.updateAccessOrder(key);
    } else {
      if (this.cache.size >= this.maxSize) {
        const oldest = this.accessOrder.shift();
        this.cache.delete(oldest);
      }
      this.accessOrder.push(key);
    }
    this.cache.set(key, component);
  }
  
  get(key) {
    if (this.cache.has(key)) {
      this.updateAccessOrder(key);
      return this.cache.get(key);
    }
    return null;
  }
  
  updateAccessOrder(key) {
    const index = this.accessOrder.indexOf(key);
    if (index > -1) {
      this.accessOrder.splice(index, 1);
      this.accessOrder.push(key);
    }
  }
  
  clear() {
    this.cache.clear();
    this.accessOrder = [];
  }
}

/**
 * Performance monitoring
 */
export class PerformanceMonitor {
  constructor() {
    this.marks = new Map();
    this.measures = [];
  }
  
  mark(name) {
    performance.mark(name);
    this.marks.set(name, performance.now());
  }
  
  measure(name, startMark, endMark) {
    if (startMark && endMark) {
      performance.measure(name, startMark, endMark);
    }
    const measure = performance.getEntriesByName(name, 'measure')[0];
    if (measure) {
      this.measures.push({
        name,
        duration: measure.duration,
        timestamp: Date.now()
      });
    }
    return measure?.duration;
  }
  
  getReport() {
    return {
      marks: Object.fromEntries(this.marks),
      measures: this.measures,
      memory: performance.memory ? {
        used: performance.memory.usedJSHeapSize,
        total: performance.memory.totalJSHeapSize,
        limit: performance.memory.jsHeapSizeLimit
      } : null
    };
  }
}

/**
 * Virtual scrolling for large lists
 * @param {Array} items - All items
 * @param {number} itemHeight - Height of each item
 * @param {number} containerHeight - Height of container
 * @param {number} scrollTop - Current scroll position
 * @returns {Object} Visible items and offsets
 */
export function virtualScroll(items, itemHeight, containerHeight, scrollTop) {
  const startIndex = Math.floor(scrollTop / itemHeight);
  const endIndex = Math.min(
    startIndex + Math.ceil(containerHeight / itemHeight) + 1,
    items.length
  );
  
  return {
    visibleItems: items.slice(startIndex, endIndex),
    startIndex,
    endIndex,
    offsetY: startIndex * itemHeight,
    totalHeight: items.length * itemHeight
  };
}
