<script>
  import { createEventDispatcher, onMount } from 'svelte';
  import { addToWishlist, removeFromWishlist, isInWishlist } from '../utils/wishlist.js';

  const dispatch = createEventDispatcher();
  export let user = null;
  
  let activeTab = 'products';
  let selectedCategory = 'all';
  let searchTerm = '';
  let sortBy = 'featured';
  let priceRange = [0, 500];
  let cart = [];
  let showCart = false;
  let selectedProduct = null;
  let showProductModal = false;
  let currentImageIndex = 0;
  let showCheckout = false;
  let checkoutStep = 1; // 1: shipping, 2: payment, 3: review, 4: confirmation
  let checkoutData = {
    shipping: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      postalCode: '',
      country: 'Uganda'
    },
    payment: {
      method: 'credit', // credit, paypal, mobile_money
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      cardName: '',
      mobileMoneyNumber: '',
      mobileMoneyProvider: 'MTN' // MTN, Airtel
    },
    orderNotes: ''
  };
  let orderConfirmation = null;

  // Wishlist functionality
  function toggleWishlist(product) {
    if (!user) {
      alert('Please sign in to add items to your wishlist');
      return;
    }

    const wishlistItem = {
      id: product.id,
      name: product.name,
      price: `$${product.price}`,
      image: product.images[0],
      type: 'product',
      description: product.description,
      rating: product.rating
    };

    if (isInWishlist(product.id, 'product', user.id)) {
      const result = removeFromWishlist(product.id, 'product', user.id);
      if (result.success) {
        showNotification('Removed from wishlist', 'success');
      }
    } else {
      const result = addToWishlist(wishlistItem, user.id);
      if (result.success) {
        showNotification('Added to wishlist!', 'success');
      } else {
        showNotification(result.message, 'error');
      }
    }
  }

  // Simple notification system
  let notification = null;
  function showNotification(message, type = 'success') {
    notification = { message, type };
    setTimeout(() => {
      notification = null;
    }, 3000);
  }
  
  // Product categories
  const categories = [
    { id: 'all', name: 'All Products', icon: 'grid', count: 0 },
    { id: 'traditional-crafts', name: 'Traditional Crafts', icon: 'sparkles', count: 0 },
    { id: 'jewelry', name: 'Jewelry & Accessories', icon: 'star', count: 0 },
    { id: 'textiles', name: 'Textiles & Clothing', icon: 'scissors', count: 0 },
    { id: 'art', name: 'Art & Paintings', icon: 'paint-brush', count: 0 },
    { id: 'woodwork', name: 'Woodwork & Carvings', icon: 'cube', count: 0 },
    { id: 'pottery', name: 'Pottery & Ceramics', icon: 'beaker', count: 0 },
    { id: 'souvenirs', name: 'Souvenirs & Gifts', icon: 'gift', count: 0 },
    { id: 'coffee-tea', name: 'Coffee & Tea', icon: 'coffee', count: 0 }
  ];

  // Products data
  const products = [
    // Traditional Crafts
    {
      id: 1,
      name: 'Handwoven Banana Fiber Basket',
      description: 'Beautiful traditional basket handwoven from banana fibers by Ugandan artisans',
      category: 'traditional-crafts',
      price: 45,
      originalPrice: 55,
      currency: 'USD',
      images: [
        'https://images.pexels.com/photos/18686057/pexels-photo-18686057.jpeg',
        'https://images.pexels.com/photos/18686057/pexels-photo-18686057.jpeg',
        'https://images.pexels.com/photos/18686057/pexels-photo-18686057.jpeg'
      ],
      featured: true,
      inStock: true,
      stockCount: 12,
      rating: 4.8,
      reviews: 23,
      artisan: {
        name: 'Grace Nakato',
        location: 'Masaka District',
        story: 'Grace has been weaving baskets for over 15 years, continuing a family tradition passed down through generations.'
      },
      specifications: {
        material: 'Banana fiber, natural dyes',
        dimensions: '30cm x 25cm x 20cm',
        weight: '0.5kg',
        careInstructions: 'Wipe with damp cloth, air dry'
      },
      tags: ['handmade', 'sustainable', 'traditional', 'home-decor'],
      shippingInfo: {
        domestic: 'Free shipping within Uganda',
        international: '$15 worldwide shipping'
      },
      discount: 18
    },
    {
      id: 2,
      name: 'Traditional Drum (Ngoma)',
      description: 'Authentic Ugandan drum handcrafted from cowhide and quality wood',
      category: 'traditional-crafts',
      price: 120,
      originalPrice: 150,
      currency: 'USD',
      images: [
        'https://images.pexels.com/photos/14848348/pexels-photo-14848348.jpeg',
        'https://images.pexels.com/photos/14848348/pexels-photo-14848348.jpeg'
      ],
      featured: true,
      inStock: true,
      stockCount: 8,
      rating: 4.9,
      reviews: 15,
      artisan: {
        name: 'Moses Kigongo',
        location: 'Kampala',
        story: 'Moses learned drum making from his grandfather and creates instruments used in traditional ceremonies.'
      },
      specifications: {
        material: 'Hardwood, cowhide',
        dimensions: '40cm x 40cm x 60cm',
        weight: '3.5kg',
        careInstructions: 'Keep dry, oil leather periodically'
      },
      tags: ['musical-instrument', 'traditional', 'ceremonial'],
      discount: 20
    },

    // Jewelry & Accessories
    {
      id: 3,
      name: 'Handcrafted Seed Bead Necklace',
      description: 'Colorful necklace made from traditional seed beads in vibrant African patterns',
      category: 'jewelry',
      price: 28,
      originalPrice: 35,
      currency: 'USD',
      images: [
        'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80'
      ],
      featured: false,
      inStock: true,
      stockCount: 25,
      rating: 4.7,
      reviews: 41,
      artisan: {
        name: 'Sarah Namutebi',
        location: 'Jinja District',
        story: 'Sarah creates beautiful jewelry using traditional beading techniques learned from her community elders.'
      },
      specifications: {
        material: 'Seed beads, cotton thread',
        dimensions: '45cm length, adjustable',
        weight: '0.1kg',
        careInstructions: 'Avoid water, store in dry place'
      },
      tags: ['jewelry', 'beadwork', 'colorful', 'traditional'],
      discount: 20
    },
    {
      id: 4,
      name: 'Cow Horn Bracelet Set',
      description: 'Set of 3 polished cow horn bracelets with traditional engravings',
      category: 'jewelry',
      price: 18,
      originalPrice: 25,
      currency: 'USD',
      images: [
        'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80'
      ],
      featured: false,
      inStock: true,
      stockCount: 30,
      rating: 4.5,
      reviews: 18,
      artisan: {
        name: 'Peter Ssekandi',
        location: 'Mukono District',
        story: 'Peter specializes in horn carving, creating beautiful accessories from ethically sourced materials.'
      },
      specifications: {
        material: 'Polished cow horn',
        dimensions: 'Various sizes available',
        weight: '0.2kg',
        careInstructions: 'Polish with soft cloth'
      },
      tags: ['bracelet', 'horn', 'set', 'natural'],
      discount: 28
    },

    // Textiles & Clothing
    {
      id: 5,
      name: 'Bark Cloth Wall Hanging',
      description: 'Traditional bark cloth art piece with hand-painted African motifs',
      category: 'textiles',
      price: 65,
      originalPrice: 80,
      currency: 'USD',
      images: [
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80'
      ],
      featured: true,
      inStock: true,
      stockCount: 6,
      rating: 4.9,
      reviews: 12,
      artisan: {
        name: 'James Mukasa',
        location: 'Buganda Region',
        story: 'James is a master bark cloth maker, preserving this UNESCO-recognized traditional craft.'
      },
      specifications: {
        material: 'Mutuba tree bark, natural pigments',
        dimensions: '80cm x 60cm',
        weight: '0.8kg',
        careInstructions: 'Hang away from direct sunlight'
      },
      tags: ['wall-art', 'bark-cloth', 'traditional', 'UNESCO'],
      discount: 19
    },
    {
      id: 6,
      name: 'Kitenge Fabric Bundle',
      description: 'Authentic Kitenge fabric bundle - 3 yards of vibrant African print',
      category: 'textiles',
      price: 32,
      originalPrice: 40,
      currency: 'USD',
      images: [
        'https://images.unsplash.com/photo-1594736797933-d0a2e4ebd1ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1594736797933-d0a2e4ebd1ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80'
      ],
      featured: false,
      inStock: true,
      stockCount: 20,
      rating: 4.6,
      reviews: 35,
      specifications: {
        material: '100% cotton',
        dimensions: '3 yards (2.7 meters)',
        weight: '0.6kg',
        careInstructions: 'Machine washable, cold water'
      },
      tags: ['fabric', 'kitenge', 'cotton', 'sewing'],
      discount: 20
    },

    // Art & Paintings
    {
      id: 7,
      name: 'Kampala Cityscape Painting',
      description: 'Original acrylic painting depicting modern Kampala with traditional elements',
      category: 'art',
      price: 180,
      originalPrice: 220,
      currency: 'USD',
      images: [
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80'
      ],
      featured: true,
      inStock: true,
      stockCount: 3,
      rating: 5.0,
      reviews: 8,
      artisan: {
        name: 'David Kibuuka',
        location: 'Kampala',
        story: 'David is a contemporary artist who blends modern techniques with traditional African themes.'
      },
      specifications: {
        material: 'Acrylic on canvas',
        dimensions: '60cm x 40cm',
        weight: '1.2kg',
        careInstructions: 'Frame and hang away from direct sunlight'
      },
      tags: ['painting', 'original', 'kampala', 'contemporary'],
      discount: 18
    },

    // Woodwork & Carvings
    {
      id: 8,
      name: 'Wooden Giraffe Sculpture',
      description: 'Hand-carved wooden giraffe sculpture with intricate details',
      category: 'woodwork',
      price: 75,
      originalPrice: 95,
      currency: 'USD',
      images: [
        'https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80'
      ],
      featured: false,
      inStock: true,
      stockCount: 10,
      rating: 4.8,
      reviews: 22,
      artisan: {
        name: 'Emmanuel Bwesigye',
        location: 'Kisoro District',
        story: 'Emmanuel has been carving for 20 years, specializing in African wildlife sculptures.'
      },
      specifications: {
        material: 'Mahogany wood',
        dimensions: '35cm x 15cm x 8cm',
        weight: '1.0kg',
        careInstructions: 'Dust regularly, oil occasionally'
      },
      tags: ['sculpture', 'giraffe', 'handcarved', 'wildlife'],
      discount: 21
    },
    {
      id: 9,
      name: 'African Mask Collection',
      description: 'Set of 3 traditional African masks representing different tribal styles',
      category: 'woodwork',
      price: 140,
      originalPrice: 175,
      currency: 'USD',
      images: [
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80'
      ],
      featured: false,
      inStock: true,
      stockCount: 5,
      rating: 4.9,
      reviews: 16,
      artisan: {
        name: 'Anthony Wasswa',
        location: 'Northern Uganda',
        story: 'Anthony creates authentic masks representing various Ugandan tribal traditions and ceremonies.'
      },
      specifications: {
        material: 'African hardwood, natural pigments',
        dimensions: 'Various sizes (20-30cm height)',
        weight: '2.5kg',
        careInstructions: 'Display away from moisture'
      },
      tags: ['masks', 'traditional', 'ceremonial', 'collection'],
      discount: 20
    },

    // Pottery & Ceramics
    {
      id: 10,
      name: 'Traditional Clay Water Pot',
      description: 'Handmade clay water pot with traditional Ugandan design patterns',
      category: 'pottery',
      price: 55,
      originalPrice: 70,
      currency: 'USD',
      images: [
        'https://images.unsplash.com/photo-1606107557309-4d734e90ed85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80'
      ],
      featured: false,
      inStock: true,
      stockCount: 8,
      rating: 4.7,
      reviews: 14,
      artisan: {
        name: 'Ruth Nakabugo',
        location: 'Central Uganda',
        story: 'Ruth learned pottery from her grandmother and creates functional and decorative pieces.'
      },
      specifications: {
        material: 'Natural clay, fired ceramic',
        dimensions: '25cm x 25cm x 30cm',
        weight: '2.8kg',
        careInstructions: 'Hand wash only, air dry'
      },
      tags: ['pottery', 'functional', 'water-pot', 'traditional'],
      discount: 21
    },

    // Coffee & Tea
    {
      id: 11,
      name: 'Premium Ugandan Coffee Beans',
      description: 'Single-origin Arabica coffee beans from Mount Elgon region - 1kg bag',
      category: 'coffee-tea',
      price: 25,
      originalPrice: 30,
      currency: 'USD',
      images: [
        'https://images.unsplash.com/photo-1447933601403-0c6688de566e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80'
      ],
      featured: true,
      inStock: true,
      stockCount: 50,
      rating: 4.9,
      reviews: 67,
      specifications: {
        material: '100% Arabica coffee beans',
        origin: 'Mount Elgon, Uganda',
        weight: '1kg',
        careInstructions: 'Store in cool, dry place'
      },
      tags: ['coffee', 'arabica', 'single-origin', 'premium'],
      discount: 17
    },

    // Souvenirs & Gifts
    {
      id: 12,
      name: 'Uganda Souvenir Magnet Set',
      description: 'Set of 6 colorful magnets featuring iconic Uganda landmarks and animals',
      category: 'souvenirs',
      price: 12,
      originalPrice: 15,
      currency: 'USD',
      images: [
        'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80'
      ],
      featured: false,
      inStock: true,
      stockCount: 100,
      rating: 4.4,
      reviews: 89,
      specifications: {
        material: 'Ceramic, magnetic backing',
        dimensions: 'Various sizes (5-8cm)',
        weight: '0.3kg',
        careInstructions: 'Wipe clean with damp cloth'
      },
      tags: ['magnets', 'souvenirs', 'landmarks', 'gifts'],
      discount: 20
    }
  ];

  // Update category counts
  categories.forEach(category => {
    if (category.id === 'all') {
      category.count = products.length;
    } else {
      category.count = products.filter(p => p.category === category.id).length;
    }
  });

  // Shopping cart functionality
  function addToCart(product, quantity = 1) {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart = [...cart, { ...product, quantity }];
    }
    
    // Save to localStorage
    localStorage.setItem('shiloh_cart', JSON.stringify(cart));

    // Dispatch custom event for instant sync
    window.dispatchEvent(new CustomEvent('cartUpdated'));

    // Dispatch custom event for instant sync
    window.dispatchEvent(new CustomEvent('cartUpdated'));

    // Show success message
    showNotification(`Added ${product.name} to basket!`);
  }

  function updateCartQuantity(productId, newQuantity) {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    cart = cart.map(item => 
      item.id === productId ? { ...item, quantity: newQuantity } : item
    );
    localStorage.setItem('shiloh_cart', JSON.stringify(cart));

    // Dispatch custom event for instant sync
    window.dispatchEvent(new CustomEvent('cartUpdated'));
  }

  function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('shiloh_cart', JSON.stringify(cart));

    // Dispatch custom event for instant sync
    window.dispatchEvent(new CustomEvent('cartUpdated'));
  }

  function clearCart() {
    cart = [];
    localStorage.removeItem('shiloh_cart');
  }

  // Product filtering and sorting
  $: filteredProducts = products
    .filter(product => {
      // Category filter
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }
      
      // Search filter
      if (searchTerm && !product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !product.description.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !product.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))) {
        return false;
      }
      
      // Price filter
      if (product.price < priceRange[0] || product.price > priceRange[1]) {
        return false;
      }
      
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low': return a.price - b.price;
        case 'price-high': return b.price - a.price;
        case 'rating': return b.rating - a.rating;
        case 'newest': return b.id - a.id;
        case 'featured': return b.featured - a.featured;
        default: return 0;
      }
    });

  // Calculate cart totals
  $: cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  $: cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  function openProductModal(product) {
    selectedProduct = product;
    currentImageIndex = 0;
    showProductModal = true;
  }

  function closeProductModal() {
    selectedProduct = null;
    showProductModal = false;
  }

  function nextImage() {
    if (selectedProduct && currentImageIndex < selectedProduct.images.length - 1) {
      currentImageIndex++;
    }
  }

  function prevImage() {
    if (currentImageIndex > 0) {
      currentImageIndex--;
    }
  }

  function startCheckout() {
    if (!user) {
      // Show login modal instead of redirecting
      showNotification('Please sign in to checkout', 'error');

      // Auto-open sign-in modal after notification disappears
      setTimeout(() => {
        dispatch('login');
      }, 2000); // Wait for notification to disappear
      return;
    }

    if (cart.length === 0) {
      showNotification('Your cart is empty', 'error');
      return;
    }

    // Pre-populate user data if available
    if (user) {
      checkoutData.shipping.firstName = user.firstName || '';
      checkoutData.shipping.lastName = user.lastName || '';
      checkoutData.shipping.email = user.email || '';
      checkoutData.shipping.phone = user.phone || '';
    }

    showCheckout = true;
    showCart = false;
    checkoutStep = 1;
  }

  function nextCheckoutStep() {
    if (checkoutStep === 1) {
      // Validate shipping information
      const shipping = checkoutData.shipping;
      if (!shipping.firstName || !shipping.lastName || !shipping.email || !shipping.phone || !shipping.address || !shipping.city) {
        showNotification('Please fill in all required shipping fields', 'error');
        return;
      }
      checkoutStep = 2;
    } else if (checkoutStep === 2) {
      // Validate payment information
      const payment = checkoutData.payment;
      if (payment.method === 'credit') {
        if (!payment.cardNumber || !payment.expiryDate || !payment.cvv || !payment.cardName) {
          showNotification('Please fill in all credit card details', 'error');
          return;
        }
      } else if (payment.method === 'mobile_money') {
        if (!payment.mobileMoneyNumber) {
          showNotification('Please enter your mobile money number', 'error');
          return;
        }
      }
      checkoutStep = 3;
    } else if (checkoutStep === 3) {
      // Process order
      processOrder();
    }
  }

  function prevCheckoutStep() {
    if (checkoutStep > 1) {
      checkoutStep--;
    }
  }

  function processOrder() {
    // Generate order ID
    const orderId = 'ORD-' + Date.now().toString(36).toUpperCase();

    // Calculate order totals
    const subtotal = cartTotal;
    const shipping = subtotal > 100 ? 0 : 15; // Free shipping over $100
    const tax = subtotal * 0.18; // 18% VAT
    const total = subtotal + shipping + tax;

    // Create order object
    const order = {
      orderId,
      userId: user.id,
      items: [...cart],
      shipping: { ...checkoutData.shipping },
      payment: {
        method: checkoutData.payment.method,
        // Don't store sensitive payment details
        last4: checkoutData.payment.method === 'credit' ? checkoutData.payment.cardNumber.slice(-4) : null
      },
      pricing: {
        subtotal: subtotal,
        shipping: shipping,
        tax: tax,
        total: total
      },
      orderDate: new Date().toISOString(),
      status: 'processing',
      notes: checkoutData.orderNotes,
      estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString() // 5 days
    };

    // Save order to localStorage (in real app, send to server)
    const userOrders = JSON.parse(localStorage.getItem(`shiloh_orders_${user.id}`) || '[]');
    userOrders.push(order);
    localStorage.setItem(`shiloh_orders_${user.id}`, JSON.stringify(userOrders));

    // Clear cart
    cart = [];
    localStorage.removeItem('shiloh_cart');
    window.dispatchEvent(new CustomEvent('cartUpdated'));

    // Send confirmation email (simulated)
    sendOrderConfirmationEmail(order);

    // Show confirmation
    orderConfirmation = order;
    checkoutStep = 4;

    showNotification('Order placed successfully! Check your email for confirmation.', 'success');
  }

  function sendOrderConfirmationEmail(order) {
    // Simulate email sending
    const emailContent = `
      Order Confirmation - ${order.orderId}

      Dear ${order.shipping.firstName} ${order.shipping.lastName},

      Thank you for your order! Your order has been received and is being processed.

      Order Details:
      ${order.items.map(item => `- ${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`).join('\n')}

      Subtotal: $${order.pricing.subtotal.toFixed(2)}
      Shipping: $${order.pricing.shipping.toFixed(2)}
      Tax: $${order.pricing.tax.toFixed(2)}
      Total: $${order.pricing.total.toFixed(2)}

      Estimated Delivery: ${new Date(order.estimatedDelivery).toLocaleDateString()}

      Your order will be shipped to:
      ${order.shipping.address}
      ${order.shipping.city}, ${order.shipping.state} ${order.shipping.postalCode}
      ${order.shipping.country}

      Thank you for shopping with Shiloh E-Store!
    `;

    console.log('Email sent to:', order.shipping.email);
    console.log('Email content:', emailContent);
  }

  function closeCheckout() {
    showCheckout = false;
    checkoutStep = 1;
    orderConfirmation = null;
  }

  // Load cart from localStorage on mount
  onMount(() => {
    const savedCart = localStorage.getItem('shiloh_cart');
    if (savedCart) {
      try {
        cart = JSON.parse(savedCart);
      } catch (e) {
        console.error('Failed to load cart:', e);
      }
    }
  });
</script>

<div class="pt-16 pb-8">
  <div class="container-custom">
    <!-- Header -->
    <div class="mb-8">
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <div class="flex items-center mb-4">
            <div class="bg-primary rounded-lg p-3 mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119.993zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
            </div>
            <h1 class="text-4xl font-bold">Uganda Artisan Store</h1>
          </div>
          <p class="text-lg text-gray-600 max-w-3xl">
            Discover authentic Ugandan arts, crafts, and souvenirs handmade by local artisans. 
            Every purchase supports traditional craftspeople and their communities.
          </p>
        </div>
        
        <!-- Cart Button -->
        <div class="mt-4 md:mt-0">
          <button
            class="relative bg-gray-200 hover:bg-gray-300 text-primary py-3 px-6 rounded-lg transition-colors font-medium flex items-center justify-center"
            on:click={() => showCart = true}
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119.993zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
            Basket ({cartItemCount})
            {#if cartItemCount > 0}
              <span class="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            {/if}
          </button>
        </div>
      </div>
    </div>

    <!-- Filters & Search -->
    <div class="bg-white rounded-lg shadow-md p-6 mb-8">
      <!-- Search Bar -->
      <div class="mb-6">
        <div class="relative">
          <input 
            type="text" 
            placeholder="Search products, artisans, or categories..."
            bind:value={searchTerm}
            class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      <!-- Category Filters -->
      <div class="mb-6">
        <h3 class="font-semibold mb-3">Categories</h3>
        <div class="flex flex-wrap gap-2">
          {#each categories as category}
            <button
              class="px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center {selectedCategory === category.id ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}"
              on:click={() => selectedCategory = category.id}
            >
              {#if category.icon === 'grid'}
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                </svg>
              {:else if category.icon === 'sparkles'}
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.847a4.5 4.5 0 003.09 3.09L15.75 12l-2.847.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                </svg>
              {:else if category.icon === 'star'}
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                </svg>
              {:else if category.icon === 'scissors'}
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M7.848 8.25l1.536.887M7.848 8.25a3 3 0 11-5.196-3 3 3 0 015.196 3zm1.536.887a2.165 2.165 0 011.083 1.839c.005.351.054.695.14 1.024M9.384 9.137l2.077 1.199M7.848 15.75l1.536-.887m-1.536.887a3 3 0 11-5.196 3 3 3 0 015.196-3zm1.536-.887a2.165 2.165 0 001.083-1.838c.005-.352.054-.695.14-1.025m-1.223 2.863l2.077-1.199m0-3.328a4.323 4.323 0 012.068-1.379l5.325-1.628a4.5 4.5 0 012.48-.044l.803.215-7.794 4.5m-2.882-1.664A4.331 4.331 0 0010.607 12m3.736 0l7.794 4.5-.802.215a4.5 4.5 0 01-2.48-.043l-5.326-1.629a4.324 4.324 0 01-2.068-1.379M14.343 12l-2.882 1.664" />
                </svg>
              {:else if category.icon === 'paint-brush'}
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
                </svg>
              {:else}
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
                </svg>
              {/if}
              {category.name} ({category.count})
            </button>
          {/each}
        </div>
      </div>

      <!-- Sort & Price Filter -->
      <div class="flex flex-col md:flex-row gap-4">
        <div class="flex-1">
          <label class="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
          <select 
            bind:value={sortBy}
            class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="featured">Featured Items</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
            <option value="newest">Newest First</option>
          </select>
        </div>
        
        <div class="flex-1">
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Price Range: ${priceRange[0]} - ${priceRange[1]}
          </label>
          <div class="px-2">
            <!-- Dual Range Slider -->
            <div class="relative mb-4">
              <input
                type="range"
                min="0"
                max="500"
                bind:value={priceRange[0]}
                class="absolute w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                style="z-index: 1;"
              />
              <input
                type="range"
                min="0"
                max="500"
                bind:value={priceRange[1]}
                class="absolute w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                style="z-index: 2;"
              />
            </div>
            <div class="flex justify-between text-xs text-gray-500 mt-2">
              <span>$0</span>
              <span>$100</span>
              <span>$200</span>
              <span>$300</span>
              <span>$400</span>
              <span>$500+</span>
            </div>
            <!-- Quick Price Presets -->
            <div class="flex flex-wrap gap-1 mt-3">
              <button
                class="px-2 py-1 text-xs border rounded {priceRange[0] === 0 && priceRange[1] === 50 ? 'bg-primary text-white' : 'bg-gray-100 hover:bg-gray-200'}"
                on:click={() => priceRange = [0, 50]}
              >
                Under $50
              </button>
              <button
                class="px-2 py-1 text-xs border rounded {priceRange[0] === 50 && priceRange[1] === 100 ? 'bg-primary text-white' : 'bg-gray-100 hover:bg-gray-200'}"
                on:click={() => priceRange = [50, 100]}
              >
                $50-$100
              </button>
              <button
                class="px-2 py-1 text-xs border rounded {priceRange[0] === 100 && priceRange[1] === 200 ? 'bg-primary text-white' : 'bg-gray-100 hover:bg-gray-200'}"
                on:click={() => priceRange = [100, 200]}
              >
                $100-$200
              </button>
              <button
                class="px-2 py-1 text-xs border rounded {priceRange[0] === 200 && priceRange[1] === 500 ? 'bg-primary text-white' : 'bg-gray-100 hover:bg-gray-200'}"
                on:click={() => priceRange = [200, 500]}
              >
                $200+
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Results Summary -->
    <div class="mb-6 flex justify-between items-center">
      <p class="text-gray-600">
        Showing {filteredProducts.length} of {products.length} products
        {#if selectedCategory !== 'all'}
          in {categories.find(c => c.id === selectedCategory)?.name}
        {/if}
      </p>
      <div class="flex items-center space-x-4">
        <button class="text-primary hover:text-primary-dark font-medium text-sm flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 17.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
          </svg>
          View as List
        </button>
        <button class="text-primary hover:text-primary-dark font-medium text-sm">
          ⚡ Featured Only
        </button>
      </div>
    </div>

    <!-- Products Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {#each filteredProducts as product}
        <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow group">
          <!-- Product Image -->
          <div class="relative h-64 overflow-hidden cursor-pointer" on:click={() => openProductModal(product)}>
            <img 
              src={product.images[0]} 
              alt={product.name}
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            
            <!-- Badges -->
            <div class="absolute top-3 left-3 space-y-2">
              {#if product.featured}
                <span class="bg-yellow-500 text-white text-xs px-2 py-1 rounded-full font-medium flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  Featured
                </span>
              {/if}
              {#if product.discount}
                <span class="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                  -{product.discount}%
                </span>
              {/if}
            </div>
            
            <!-- Quick Actions -->
            <div class="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                class="bg-white p-2 rounded-full shadow-md hover:bg-gray-50 transition-colors mb-2"
                on:click|stopPropagation={() => toggleWishlist(product)}
                title={isInWishlist(product.id, 'product', user?.id) ? 'Remove from wishlist' : 'Add to wishlist'}
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 {isInWishlist(product.id, 'product', user?.id) ? 'text-red-500 fill-current' : 'text-gray-600 hover:text-red-500'}" fill={isInWishlist(product.id, 'product', user?.id) ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
              </button>
            </div>
            
            <!-- Stock Status -->
            {#if !product.inStock}
              <div class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <span class="bg-red-500 text-white px-4 py-2 rounded-lg font-medium">
                  Out of Stock
                </span>
              </div>
            {/if}
          </div>

          <!-- Product Info -->
          <div class="p-4">
            <!-- Category -->
            <span class="text-xs text-primary font-medium uppercase tracking-wide">
              {categories.find(c => c.id === product.category)?.name}
            </span>
            
            <!-- Name -->
            <h3 class="font-semibold text-lg mt-1 mb-2 line-clamp-2">{product.name}</h3>
            
            <!-- Description -->
            <p class="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
            
            <!-- Artisan -->
            {#if product.artisan}
              <div class="flex items-center mb-3 text-xs text-gray-500">
                <span class="mr-1">👨‍🎨</span>
                <span>By {product.artisan.name}, {product.artisan.location}</span>
              </div>
            {/if}
            
            <!-- Rating -->
            <div class="flex items-center mb-3">
              <div class="flex items-center">
                {#each Array(5) as _, i}
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 {i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                {/each}
                <span class="ml-2 text-sm text-gray-600">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>
            </div>
            
            <!-- Price -->
            <div class="flex items-center justify-between mb-4">
              <div>
                {#if product.originalPrice && product.originalPrice > product.price}
                  <span class="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                {/if}
                <span class="text-lg font-bold text-primary">${product.price}</span>
              </div>
              {#if product.stockCount}
                <span class="text-xs text-gray-500">{product.stockCount} in stock</span>
              {/if}
            </div>
            
            <!-- Actions -->
            <div class="flex space-x-2">
              <button 
                class="flex-1 bg-primary hover:bg-primary-dark text-white py-2 px-4 rounded-md transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!product.inStock}
                on:click={() => addToCart(product)}
              >
                {product.inStock ? 'Add to Basket' : 'Out of Stock'}
              </button>
              <button 
                class="bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-3 rounded-md transition-colors"
                on:click={() => openProductModal(product)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      {/each}
    </div>

    <!-- No Results -->
    {#if filteredProducts.length === 0}
      <div class="text-center py-12">
        <div class="text-6xl mb-4">🔍</div>
        <h3 class="text-lg font-medium text-gray-900 mb-2">No products found</h3>
        <p class="text-gray-600 mb-4">Try adjusting your search terms or filters.</p>
        <button 
          class="text-primary hover:text-primary-dark font-medium"
          on:click={() => { searchTerm = ''; selectedCategory = 'all'; }}
        >
          Clear all filters
        </button>
      </div>
    {/if}
  </div>
</div>

<!-- Shopping Cart Modal -->
{#if showCart}
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" on:click={() => showCart = false}>
    <div class="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-hidden" on:click|stopPropagation>
      <!-- Cart Header -->
      <div class="p-6 border-b border-gray-200">
        <div class="flex justify-between items-center">
          <h2 class="text-2xl font-bold flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119.993zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
            Shopping Basket
          </h2>
          <button 
            class="text-gray-500 hover:text-gray-700 p-2"
            on:click={() => showCart = false}
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Cart Content -->
      <div class="flex-1 overflow-y-auto p-6">
        {#if cart.length === 0}
          <div class="text-center py-12">
            <div class="mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119.993zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
            </div>
            <h3 class="text-lg font-medium text-gray-900 mb-2">Your basket is empty</h3>
            <p class="text-gray-600 mb-4">Add some beautiful Ugandan crafts to get started!</p>
            <button 
              class="text-primary hover:text-primary-dark font-medium"
              on:click={() => showCart = false}
            >
              Continue Shopping
            </button>
          </div>
        {:else}
          <div class="space-y-4">
            {#each cart as item}
              <div class="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                <img 
                  src={item.images[0]} 
                  alt={item.name}
                  class="w-16 h-16 object-cover rounded-md"
                />
                <div class="flex-1">
                  <h4 class="font-medium">{item.name}</h4>
                  <p class="text-sm text-gray-600">${item.price} each</p>
                </div>
                <div class="flex items-center space-x-2">
                  <button 
                    class="bg-gray-100 hover:bg-gray-200 text-gray-700 w-8 h-8 rounded-full flex items-center justify-center"
                    on:click={() => updateCartQuantity(item.id, item.quantity - 1)}
                  >
                    -
                  </button>
                  <span class="w-8 text-center">{item.quantity}</span>
                  <button 
                    class="bg-gray-100 hover:bg-gray-200 text-gray-700 w-8 h-8 rounded-full flex items-center justify-center"
                    on:click={() => updateCartQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
                <div class="text-right">
                  <p class="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                  <button 
                    class="text-red-500 hover:text-red-700 text-xs"
                    on:click={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            {/each}
          </div>
        {/if}
      </div>

      <!-- Cart Footer -->
      {#if cart.length > 0}
        <div class="border-t border-gray-200 p-6">
          <div class="flex justify-between items-center mb-4">
            <span class="text-lg font-semibold">Total:</span>
            <span class="text-2xl font-bold text-primary">${cartTotal.toFixed(2)}</span>
          </div>
          <div class="flex space-x-3">
            <button 
              class="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-md transition-colors font-medium"
              on:click={() => showCart = false}
            >
              Continue Shopping
            </button>
            <button 
              class="flex-1 bg-primary hover:bg-primary-dark text-white py-3 px-4 rounded-md transition-colors font-medium"
              on:click={startCheckout}
            >
              Checkout
            </button>
          </div>
          <button 
            class="w-full mt-2 text-sm text-red-600 hover:text-red-700"
            on:click={clearCart}
          >
            Clear Basket
          </button>
        </div>
      {/if}
    </div>
  </div>
{/if}

<!-- Product Detail Modal -->
{#if showProductModal && selectedProduct}
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" on:click={closeProductModal}>
    <div class="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto" on:click|stopPropagation>
      <div class="p-6">
        <!-- Modal Header -->
        <div class="flex justify-between items-start mb-6">
          <h2 class="text-2xl font-bold">{selectedProduct.name}</h2>
          <button 
            class="text-gray-500 hover:text-gray-700 p-2"
            on:click={closeProductModal}
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Image Gallery -->
          <div>
            <div class="relative h-96 mb-4">
              <img 
                src={selectedProduct.images[currentImageIndex]} 
                alt={selectedProduct.name}
                class="w-full h-full object-cover rounded-lg"
              />
              {#if selectedProduct.images.length > 1}
                <button 
                  class="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-50"
                  on:click={prevImage}
                  disabled={currentImageIndex === 0}
                >
                  ←
                </button>
                <button 
                  class="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-50"
                  on:click={nextImage}
                  disabled={currentImageIndex === selectedProduct.images.length - 1}
                >
                  →
                </button>
              {/if}
            </div>
            
            <!-- Thumbnail Gallery -->
            {#if selectedProduct.images.length > 1}
              <div class="flex space-x-2">
                {#each selectedProduct.images as image, index}
                  <button 
                    class="w-20 h-20 rounded-md overflow-hidden border-2 {index === currentImageIndex ? 'border-primary' : 'border-gray-200'}"
                    on:click={() => currentImageIndex = index}
                  >
                    <img src={image} alt="Product image {index + 1} of {selectedProduct.name}" class="w-full h-full object-cover" />
                  </button>
                {/each}
              </div>
            {/if}
          </div>

          <!-- Product Details -->
          <div>
            <!-- Category & Price -->
            <div class="mb-4">
              <span class="text-sm text-primary font-medium uppercase">
                {categories.find(c => c.id === selectedProduct.category)?.name}
              </span>
              <div class="flex items-center mt-2">
                {#if selectedProduct.originalPrice && selectedProduct.originalPrice > selectedProduct.price}
                  <span class="text-lg text-gray-500 line-through mr-2">${selectedProduct.originalPrice}</span>
                {/if}
                <span class="text-3xl font-bold text-primary">${selectedProduct.price}</span>
                {#if selectedProduct.discount}
                  <span class="ml-2 bg-red-500 text-white text-sm px-2 py-1 rounded-full">
                    -{selectedProduct.discount}%
                  </span>
                {/if}
              </div>
            </div>

            <!-- Rating -->
            <div class="flex items-center mb-4">
              <div class="flex items-center">
                {#each Array(5) as _, i}
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 {i < Math.floor(selectedProduct.rating) ? 'text-yellow-400' : 'text-gray-300'}" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                {/each}
                <span class="ml-2 text-gray-600">
                  {selectedProduct.rating} ({selectedProduct.reviews} reviews)
                </span>
              </div>
            </div>

            <!-- Description -->
            <p class="text-gray-700 mb-6">{selectedProduct.description}</p>

            <!-- Artisan Info -->
            {#if selectedProduct.artisan}
              <div class="bg-gray-50 p-4 rounded-lg mb-6">
                <h4 class="font-semibold mb-2">👨‍🎨 Meet the Artisan</h4>
                <p class="text-sm text-gray-700">
                  <strong>{selectedProduct.artisan.name}</strong> from {selectedProduct.artisan.location}
                </p>
                <p class="text-sm text-gray-600 mt-1">{selectedProduct.artisan.story}</p>
              </div>
            {/if}

            <!-- Specifications -->
            {#if selectedProduct.specifications}
              <div class="mb-6">
                <h4 class="font-semibold mb-3">Specifications</h4>
                <div class="grid grid-cols-2 gap-4 text-sm">
                  {#each Object.entries(selectedProduct.specifications) as [key, value]}
                    <div>
                      <span class="text-gray-500 capitalize">{key.replace(/([A-Z])/g, ' $1').toLowerCase()}:</span>
                      <span class="ml-1 text-gray-700">{value}</span>
                    </div>
                  {/each}
                </div>
              </div>
            {/if}

            <!-- Stock Status -->
            <div class="mb-6">
              {#if selectedProduct.inStock}
                <span class="text-green-600 text-sm">✅ In Stock ({selectedProduct.stockCount} available)</span>
              {:else}
                <span class="text-red-600 text-sm">❌ Out of Stock</span>
              {/if}
            </div>

            <!-- Add to Cart -->
            <div class="flex space-x-3">
              <button 
                class="flex-1 bg-primary hover:bg-primary-dark text-white py-3 px-6 rounded-md transition-colors font-medium disabled:opacity-50"
                disabled={!selectedProduct.inStock}
                on:click={() => { addToCart(selectedProduct); closeProductModal(); }}
              >
                Add to Basket - ${selectedProduct.price}
              </button>
              <button
                class="bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-md transition-colors flex items-center justify-center"
                on:click={() => toggleWishlist(selectedProduct)}
                title={isInWishlist(selectedProduct.id, 'product', user?.id) ? 'Remove from wishlist' : 'Add to wishlist'}
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 {isInWishlist(selectedProduct.id, 'product', user?.id) ? 'text-red-500 fill-current' : 'text-gray-600 hover:text-red-500'}" fill={isInWishlist(selectedProduct.id, 'product', user?.id) ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
              </button>
            </div>

            <!-- Shipping Info -->
            {#if selectedProduct.shippingInfo}
              <div class="mt-6 text-sm text-gray-600">
                <p>🚚 {selectedProduct.shippingInfo.domestic}</p>
                <p>🌍 {selectedProduct.shippingInfo.international}</p>
              </div>
            {/if}
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}

<!-- Comprehensive Checkout Modal -->
{#if showCheckout}
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" on:click={closeCheckout}>
    <div class="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto" on:click|stopPropagation>
      <!-- Header -->
      <div class="flex justify-between items-center p-6 border-b border-gray-200">
        <h2 class="text-2xl font-semibold text-gray-800">
          {#if checkoutStep === 1}Shipping Information
          {:else if checkoutStep === 2}Payment Details
          {:else if checkoutStep === 3}Review Order
          {:else}Order Confirmation{/if}
        </h2>
        <button class="text-gray-500 hover:text-gray-800" on:click={closeCheckout}>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Progress Bar -->
      {#if checkoutStep < 4}
        <div class="px-6 pt-4">
          <div class="flex items-center justify-between mb-2">
            <span class="text-sm font-medium text-gray-600">Step {checkoutStep} of 3</span>
            <span class="text-sm text-gray-500">{Math.round((checkoutStep / 3) * 100)}% Complete</span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-2">
            <div class="h-2 rounded-full bg-primary-light" style="width: {(checkoutStep / 3) * 100}%"></div>
          </div>
        </div>
      {/if}

      <div class="p-6">
        <!-- Step 1: Shipping Information -->
        {#if checkoutStep === 1}
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
              <input
                type="text"
                bind:value={checkoutData.shipping.firstName}
                class="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
              <input
                type="text"
                bind:value={checkoutData.shipping.lastName}
                class="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
              <input
                type="email"
                bind:value={checkoutData.shipping.email}
                class="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
              <input
                type="tel"
                bind:value={checkoutData.shipping.phone}
                class="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-1">Address *</label>
              <input
                type="text"
                bind:value={checkoutData.shipping.address}
                class="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Street address"
                required
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">City *</label>
              <input
                type="text"
                bind:value={checkoutData.shipping.city}
                class="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">State/Region</label>
              <input
                type="text"
                bind:value={checkoutData.shipping.state}
                class="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
              <input
                type="text"
                bind:value={checkoutData.shipping.postalCode}
                class="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Country</label>
              <select
                bind:value={checkoutData.shipping.country}
                class="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="Uganda">Uganda</option>
                <option value="Kenya">Kenya</option>
                <option value="Tanzania">Tanzania</option>
                <option value="Rwanda">Rwanda</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

        <!-- Step 2: Payment Details -->
        {:else if checkoutStep === 2}
          <div class="space-y-6">
            <!-- Payment Method Selection -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-3">Payment Method</label>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
                <label class="flex items-center p-4 border rounded-lg cursor-pointer {checkoutData.payment.method === 'credit' ? 'border-primary-light bg-primary-light/10' : 'border-gray-300'}">
                  <input type="radio" bind:group={checkoutData.payment.method} value="credit" class="mr-3" />
                  <div class="text-center">
                    <div class="text-sm font-medium">Credit Card</div>
                    <div class="text-xs text-gray-500">Visa, MasterCard</div>
                  </div>
                </label>
                <label class="flex items-center p-4 border rounded-lg cursor-pointer {checkoutData.payment.method === 'mobile_money' ? 'border-primary-light bg-primary-light/10' : 'border-gray-300'}">
                  <input type="radio" bind:group={checkoutData.payment.method} value="mobile_money" class="mr-3" />
                  <div class="text-center">
                    <div class="text-sm font-medium">Mobile Money</div>
                    <div class="text-xs text-gray-500">MTN, Airtel</div>
                  </div>
                </label>
                <label class="flex items-center p-4 border rounded-lg cursor-pointer {checkoutData.payment.method === 'paypal' ? 'border-primary-light bg-primary-light/10' : 'border-gray-300'}">
                  <input type="radio" bind:group={checkoutData.payment.method} value="paypal" class="mr-3" />
                  <div class="text-center">
                    <div class="text-sm font-medium">PayPal</div>
                    <div class="text-xs text-gray-500">Secure payment</div>
                  </div>
                </label>
              </div>
            </div>

            <!-- Credit Card Details -->
            {#if checkoutData.payment.method === 'credit'}
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Card Number *</label>
                  <input
                    type="text"
                    bind:value={checkoutData.payment.cardNumber}
                    placeholder="1234 5678 9012 3456"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md"
                    maxlength="19"
                  />
                </div>
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Expiry Date *</label>
                    <input
                      type="text"
                      bind:value={checkoutData.payment.expiryDate}
                      placeholder="MM/YY"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md"
                      maxlength="5"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">CVV *</label>
                    <input
                      type="text"
                      bind:value={checkoutData.payment.cvv}
                      placeholder="123"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md"
                      maxlength="4"
                    />
                  </div>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Cardholder Name *</label>
                  <input
                    type="text"
                    bind:value={checkoutData.payment.cardName}
                    class="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>

            <!-- Mobile Money Details -->
            {:else if checkoutData.payment.method === 'mobile_money'}
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Mobile Money Provider</label>
                  <select
                    bind:value={checkoutData.payment.mobileMoneyProvider}
                    class="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="MTN">MTN Mobile Money</option>
                    <option value="Airtel">Airtel Money</option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Mobile Number *</label>
                  <input
                    type="tel"
                    bind:value={checkoutData.payment.mobileMoneyNumber}
                    placeholder="256777123456"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>

            <!-- PayPal -->
            {:else if checkoutData.payment.method === 'paypal'}
              <div class="text-center p-8 bg-gray-50 rounded-lg">
                <p class="text-gray-600 mb-2">You will be redirected to PayPal to complete your payment.</p>
                <p class="text-sm text-gray-500">This is secure and your payment information is protected.</p>
              </div>
            {/if}
          </div>

        <!-- Step 3: Review Order -->
        {:else if checkoutStep === 3}
          <div class="space-y-6">
            <!-- Order Summary -->
            <div>
              <h3 class="text-lg font-semibold mb-4">Order Summary</h3>
              <div class="bg-gray-50 rounded-lg p-4">
                {#each cart as item}
                  <div class="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
                    <div class="flex items-center">
                      <img src={item.images[0]} alt={item.name} class="w-12 h-12 object-cover rounded mr-3" />
                      <div>
                        <p class="font-medium">{item.name}</p>
                        <p class="text-sm text-gray-600">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <p class="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                {/each}

                <div class="mt-4 space-y-2">
                  <div class="flex justify-between">
                    <span>Subtotal</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                  <div class="flex justify-between">
                    <span>Shipping</span>
                    <span>{cartTotal > 100 ? 'Free' : '$15.00'}</span>
                  </div>
                  <div class="flex justify-between">
                    <span>Tax (18%)</span>
                    <span>${(cartTotal * 0.18).toFixed(2)}</span>
                  </div>
                  <div class="flex justify-between font-bold text-lg border-t pt-2">
                    <span>Total</span>
                    <span>${(cartTotal + (cartTotal > 100 ? 0 : 15) + (cartTotal * 0.18)).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Shipping Address -->
            <div>
              <h3 class="text-lg font-semibold mb-2">Shipping Address</h3>
              <div class="bg-gray-50 rounded-lg p-4">
                <p>{checkoutData.shipping.firstName} {checkoutData.shipping.lastName}</p>
                <p>{checkoutData.shipping.address}</p>
                <p>{checkoutData.shipping.city}, {checkoutData.shipping.state} {checkoutData.shipping.postalCode}</p>
                <p>{checkoutData.shipping.country}</p>
                <p>{checkoutData.shipping.phone}</p>
                <p>{checkoutData.shipping.email}</p>
              </div>
            </div>

            <!-- Payment Method -->
            <div>
              <h3 class="text-lg font-semibold mb-2">Payment Method</h3>
              <div class="bg-gray-50 rounded-lg p-4">
                {#if checkoutData.payment.method === 'credit'}
                  <p>Credit Card ending in {checkoutData.payment.cardNumber.slice(-4)}</p>
                {:else if checkoutData.payment.method === 'mobile_money'}
                  <p>{checkoutData.payment.mobileMoneyProvider} Mobile Money - {checkoutData.payment.mobileMoneyNumber}</p>
                {:else}
                  <p>PayPal</p>
                {/if}
              </div>
            </div>

            <!-- Order Notes -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Order Notes (Optional)</label>
              <textarea
                bind:value={checkoutData.orderNotes}
                rows="3"
                class="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Any special instructions for your order..."
              ></textarea>
            </div>
          </div>

        <!-- Step 4: Order Confirmation -->
        {:else if checkoutStep === 4 && orderConfirmation}
          <div class="text-center space-y-6">
            <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <div>
              <h3 class="text-2xl font-bold text-gray-900 mb-2">Order Confirmed!</h3>
              <p class="text-gray-600">Thank you for your purchase. Your order has been received and is being processed.</p>
            </div>

            <div class="bg-gray-50 rounded-lg p-6 text-left">
              <h4 class="font-semibold mb-3">Order Details</h4>
              <div class="space-y-2 text-sm">
                <div class="flex justify-between">
                  <span>Order ID:</span>
                  <span class="font-mono">{orderConfirmation.orderId}</span>
                </div>
                <div class="flex justify-between">
                  <span>Order Date:</span>
                  <span>{new Date(orderConfirmation.orderDate).toLocaleDateString()}</span>
                </div>
                <div class="flex justify-between">
                  <span>Total Amount:</span>
                  <span class="font-semibold">${orderConfirmation.pricing.total.toFixed(2)}</span>
                </div>
                <div class="flex justify-between">
                  <span>Estimated Delivery:</span>
                  <span>{new Date(orderConfirmation.estimatedDelivery).toLocaleDateString()}</span>
                </div>
                <div class="flex justify-between">
                  <span>Status:</span>
                  <span class="capitalize text-orange-600 font-medium">{orderConfirmation.status}</span>
                </div>
              </div>
            </div>

            <div class="text-sm text-gray-600">
              <p>📧 A confirmation email has been sent to <strong>{orderConfirmation.shipping.email}</strong></p>
              <p>📱 We'll send you updates via SMS to <strong>{orderConfirmation.shipping.phone}</strong></p>
            </div>

            <button
              class="btn-primary px-8 py-3"
              on:click={closeCheckout}
            >
              Continue Shopping
            </button>
          </div>
        {/if}
      </div>

      <!-- Footer with navigation buttons -->
      {#if checkoutStep < 4}
        <div class="flex justify-between items-center p-6 border-t border-gray-200">
          <button
            class="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            on:click={checkoutStep === 1 ? closeCheckout : prevCheckoutStep}
          >
            {checkoutStep === 1 ? 'Cancel' : 'Previous'}
          </button>

          <button
            class="px-6 py-2 bg-primary-light hover:bg-primary text-white rounded-md transition-colors font-medium"
            on:click={nextCheckoutStep}
          >
            {checkoutStep === 3 ? 'Place Order' : 'Continue'}
          </button>
        </div>
      {/if}
    </div>
  </div>
{/if}

<!-- Notification Toast -->
{#if notification}
  <div class="fixed top-4 right-4 z-50 animate-fade-in">
    <div class="bg-white border border-gray-200 rounded-lg shadow-lg p-4 max-w-sm">
      <div class="flex items-center space-x-3">
        {#if notification.type === 'success'}
          <div class="bg-green-100 rounded-full p-1">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        {:else}
          <div class="bg-red-100 rounded-full p-1">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        {/if}
        <p class="text-gray-900 font-medium">{notification.message}</p>
      </div>
    </div>
  </div>
{/if}

<style>
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  /* Premium Range Slider Styling */
  input[type="range"] {
    -webkit-appearance: none;
    appearance: none;
    background: transparent;
    cursor: pointer;
  }

  /* Range Track */
  input[type="range"]::-webkit-slider-track {
    background: transparent;
    height: 8px;
  }

  input[type="range"]::-moz-range-track {
    background: transparent;
    height: 8px;
    border: none;
  }

  /* Range Thumb - WebKit */
  input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background: #1e40af;
    box-shadow: 0 2px 6px rgba(30, 64, 175, 0.3);
    cursor: pointer;
    border: 2px solid white;
    transition: all 0.2s ease;
  }

  input[type="range"]::-webkit-slider-thumb:hover {
    background: #1e3a8a;
    box-shadow: 0 4px 12px rgba(30, 64, 175, 0.4);
    transform: scale(1.1);
  }

  /* Range Thumb - Firefox */
  input[type="range"]::-moz-range-thumb {
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background: #1e40af;
    box-shadow: 0 2px 6px rgba(30, 64, 175, 0.3);
    cursor: pointer;
    border: 2px solid white;
    transition: all 0.2s ease;
  }

  input[type="range"]::-moz-range-thumb:hover {
    background: #1e3a8a;
    box-shadow: 0 4px 12px rgba(30, 64, 175, 0.4);
    transform: scale(1.1);
  }

  /* Focus states */
  input[type="range"]:focus::-webkit-slider-thumb {
    outline: none;
    box-shadow: 0 0 0 3px rgba(30, 64, 175, 0.2);
  }

  input[type="range"]:focus::-moz-range-thumb {
    outline: none;
    box-shadow: 0 0 0 3px rgba(30, 64, 175, 0.2);
  }
</style>
