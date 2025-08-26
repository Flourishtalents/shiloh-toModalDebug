// Global wishlist utility functions

// Add item to wishlist
export function addToWishlist(item, userId) {
  if (!userId) return { success: false, message: 'Please log in to add items to wishlist' };
  
  const savedWishlist = localStorage.getItem(`shiloh_wishlist_${userId}`);
  let wishlist = savedWishlist ? JSON.parse(savedWishlist) : [];
  
  // Check if item already exists
  if (wishlist.find(w => w.id === item.id && w.type === item.type)) {
    return { success: false, message: 'Item already in wishlist' };
  }
  
  // Add timestamp
  const wishlistItem = {
    ...item,
    addedDate: new Date().toISOString()
  };
  
  wishlist.push(wishlistItem);
  localStorage.setItem(`shiloh_wishlist_${userId}`, JSON.stringify(wishlist));
  
  // Update count in header
  updateWishlistCount(wishlist.length);
  
  // Dispatch custom event for real-time updates
  window.dispatchEvent(new CustomEvent('wishlistUpdated', { 
    detail: { count: wishlist.length, action: 'added', item: wishlistItem } 
  }));
  
  return { success: true, message: 'Added to wishlist' };
}

// Remove item from wishlist
export function removeFromWishlist(itemId, itemType, userId) {
  if (!userId) return { success: false, message: 'Please log in' };
  
  const savedWishlist = localStorage.getItem(`shiloh_wishlist_${userId}`);
  if (!savedWishlist) return { success: false, message: 'Wishlist is empty' };
  
  let wishlist = JSON.parse(savedWishlist);
  const originalLength = wishlist.length;
  wishlist = wishlist.filter(item => !(item.id === itemId && item.type === itemType));
  
  if (wishlist.length === originalLength) {
    return { success: false, message: 'Item not found in wishlist' };
  }
  
  localStorage.setItem(`shiloh_wishlist_${userId}`, JSON.stringify(wishlist));
  
  // Update count in header
  updateWishlistCount(wishlist.length);
  
  // Dispatch custom event for real-time updates
  window.dispatchEvent(new CustomEvent('wishlistUpdated', { 
    detail: { count: wishlist.length, action: 'removed', itemId, itemType } 
  }));
  
  return { success: true, message: 'Removed from wishlist' };
}

// Check if item is in wishlist
export function isInWishlist(itemId, itemType, userId) {
  if (!userId) return false;
  
  const savedWishlist = localStorage.getItem(`shiloh_wishlist_${userId}`);
  if (!savedWishlist) return false;
  
  const wishlist = JSON.parse(savedWishlist);
  return wishlist.some(item => item.id === itemId && item.type === itemType);
}

// Get wishlist count
export function getWishlistCount(userId) {
  if (!userId) return 0;
  
  const savedWishlist = localStorage.getItem(`shiloh_wishlist_${userId}`);
  if (!savedWishlist) return 0;
  
  const wishlist = JSON.parse(savedWishlist);
  return wishlist.length;
}

// Update wishlist count in header
export function updateWishlistCount(count) {
  const countElement = document.getElementById('wishlist-count');
  if (countElement) {
    countElement.textContent = count || 0;
    if (count > 0) {
      countElement.classList.remove('hidden');
    } else {
      countElement.classList.add('hidden');
    }
  }
}

// Get all wishlist items
export function getWishlistItems(userId) {
  if (!userId) return [];
  
  const savedWishlist = localStorage.getItem(`shiloh_wishlist_${userId}`);
  if (!savedWishlist) return [];
  
  return JSON.parse(savedWishlist);
}

// Clear entire wishlist
export function clearWishlist(userId) {
  if (!userId) return { success: false, message: 'Please log in' };
  
  localStorage.removeItem(`shiloh_wishlist_${userId}`);
  updateWishlistCount(0);
  
  // Dispatch custom event for real-time updates
  window.dispatchEvent(new CustomEvent('wishlistUpdated', { 
    detail: { count: 0, action: 'cleared' } 
  }));
  
  return { success: true, message: 'Wishlist cleared' };
}
