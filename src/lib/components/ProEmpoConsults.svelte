<script>
  import { onMount } from 'svelte';
  
  let isVisible = false;
  
  onMount(() => {
    // Hide all other components immediately
    const hideElements = () => {
      // Hide header and footer elements
      const headers = document.querySelectorAll('header, .header');
      const footers = document.querySelectorAll('footer, .footer');
      const chatbots = document.querySelectorAll('.chatbot-modal, [class*="chatbot"]');
      
      [...headers, ...footers, ...chatbots].forEach(el => {
        if (el && !el.closest('.pe-root-container')) {
          el.style.display = 'none';
          el.style.visibility = 'hidden';
          el.style.opacity = '0';
          el.style.pointerEvents = 'none';
          el.style.position = 'absolute';
          el.style.top = '-9999px';
          el.style.left = '-9999px';
        }
      });

      // Set body styles for complete isolation
      document.body.style.margin = '0';
      document.body.style.padding = '0';
    };

    hideElements();
    
    // Set visibility after hiding other elements
    setTimeout(() => {
      isVisible = true;
    }, 150);

    // Cleanup function to restore when component unmounts
    return () => {
      document.body.style.margin = '';
      document.body.style.padding = '';
      
      // Restore hidden elements
      const hiddenElements = document.querySelectorAll('[style*="display: none"]');
      hiddenElements.forEach(el => {
        if (!el.closest('.pe-root-container')) {
          el.style.display = '';
          el.style.visibility = '';
          el.style.opacity = '';
          el.style.pointerEvents = '';
          el.style.position = '';
          el.style.top = '';
          el.style.left = '';
        }
      });
    };
  });

  function navigateToShiloh() {
    // Use proper routing instead of page reload to prevent CSS conflicts
    try {
      // Dispatch navigation event instead of page reload
      const event = new CustomEvent('navigate', {
        detail: { route: 'home' }
      });

      if (typeof document !== 'undefined') {
        document.dispatchEvent(event);
      }

      // Also update URL manually
      if (typeof window !== 'undefined' && window.history) {
        window.history.pushState({}, '', '/shilohexperience');
      }
    } catch (error) {
      console.warn('Navigation failed, falling back to page reload:', error);
      window.location.href = '/shilohexperience';
    }
  }
</script>

<div class="pe-root-container" style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1e293b; background: #ffffff; min-height: 100vh; width: 100%; margin: 0; padding: 0; box-sizing: border-box; position: relative;">
  <!-- Hero Section -->
  <section class="pe-hero-section" style="min-height: 100vh; display: flex; align-items: center; padding: 4rem 2rem; position: relative; background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%); overflow: hidden; color: #ffffff;">
    <div class="pe-hero-content" class:pe-visible={isVisible} style="text-align: center; width: 100%; max-width: none;">
      <div class="pe-logo-container" style="text-align: center; margin-bottom: 2rem;">
        <img
          src="https://cdn.builder.io/api/v1/image/assets%2F6bf1d296c8264135b5e422d6aa09d792%2F25a1201d1f0e42d290686eb0738677ec?format=webp&width=800"
          alt="Pro Empo Consults Logo"
          class="pe-main-logo"
          style="height: 120px; width: auto; display: block; margin: 0 auto;"
        />
      </div>
      
      <h1 class="pe-hero-title">
        Transforming Business Through
        <span class="pe-gradient-text">Digital Innovation</span>
      </h1>
      
      <p class="pe-hero-subtitle">
        Modern consultancy solutions that propel your business into the digital future.
        We bridge the gap between traditional business practices and cutting-edge technology.
      </p>

      <!-- Contact Information for Mobile -->
      <div class="pe-mobile-contact">
        <div class="pe-mobile-contact-item">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22 16.92V19.92C22 21.01 21.01 22 19.92 22H4.08C2.99 22 2 21.01 2 19.92V4.08C2 2.99 2.99 2 4.08 2H7.08" stroke="#D97706" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span>info@proempoconsults.com</span>
        </div>
        <div class="pe-mobile-contact-item">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="#D97706" stroke-width="2"/>
          </svg>
          <span>+256 703 462 969</span>
        </div>
        <div class="pe-mobile-contact-item">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 10C21 17 12 23 12 23S3 17 3 10C3 6.13401 6.13401 3 10 3H14C17.866 3 21 6.13401 21 10Z" stroke="#D97706" stroke-width="2"/>
          </svg>
          <span>Kampala, Uganda</span>
        </div>
      </div>
      
    </div>
    
    <!-- Contact Information Cards for Desktop -->
    <div class="pe-contact-cards">
      <div class="pe-contact-card pe-card-1">
        <div class="pe-contact-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22 16.92V19.92C22 21.01 21.01 22 19.92 22H4.08C2.99 22 2 21.01 2 19.92V4.08C2 2.99 2.99 2 4.08 2H7.08" stroke="#D97706" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M16 2L22 8M22 2L16 8" stroke="#D97706" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div class="pe-contact-text">info@proempoconsults.com</div>
      </div>

      <div class="pe-contact-card pe-card-2">
        <div class="pe-contact-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="#D97706" stroke-width="2"/>
            <path d="M8 12L10.5 14.5L16 9" stroke="#D97706" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div class="pe-contact-text">+256 703 462 969</div>
      </div>

      <div class="pe-contact-card pe-card-3">
        <div class="pe-contact-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 10C21 17 12 23 12 23S3 17 3 10C3 6.13401 6.13401 3 10 3H14C17.866 3 21 6.13401 21 10Z" stroke="#D97706" stroke-width="2"/>
            <circle cx="12" cy="10" r="3" stroke="#D97706" stroke-width="2"/>
          </svg>
        </div>
        <div class="pe-contact-text">Kampala, Uganda</div>
      </div>
    </div>
  </section>

  <!-- Services Section -->
  <section class="pe-services-section">
    <div class="pe-section-header">
      <h2 class="pe-section-title">Our Expertise</h2>
      <p class="pe-section-subtitle">Comprehensive digital solutions tailored to your business needs</p>
    </div>
    
    <div class="pe-services-grid">
      <div class="pe-service-card" style="background: #ffffff; padding: 2.5rem; border-radius: 20px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05); border: 1px solid #f1f5f9; transition: all 0.3s ease;">
        <div class="pe-service-icon" style="width: 64px; height: 64px; background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%); border-radius: 16px; display: flex; align-items: center; justify-content: center; margin-bottom: 1.5rem; color: #ffffff;">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" stroke-width="2"/>
            <circle cx="9" cy="9" r="2" stroke="currentColor" stroke-width="2"/>
            <path d="M21 15L16 10L5 21" stroke="currentColor" stroke-width="2"/>
          </svg>
        </div>
        <h3 class="pe-service-title" style="font-size: 1.5rem; font-weight: 700; margin-bottom: 1rem; color: #0f172a;">Digital Transformation</h3>
        <p class="pe-service-description" style="color: #64748b; line-height: 1.7;">Modernize your business operations with cutting-edge digital solutions and strategic technology implementation.</p>
      </div>
      
      <div class="pe-service-card" style="background: #ffffff; padding: 2.5rem; border-radius: 20px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05); border: 1px solid #f1f5f9; transition: all 0.3s ease;">
        <div class="pe-service-icon" style="width: 64px; height: 64px; background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%); border-radius: 16px; display: flex; align-items: center; justify-content: center; margin-bottom: 1.5rem; color: #ffffff;">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7V17C2 18.1 2.9 19 4 19H20C21.1 19 22 18.1 22 17V7L12 2Z" stroke="currentColor" stroke-width="2"/>
            <polyline points="8,11 12,15 16,11" stroke="currentColor" stroke-width="2"/>
          </svg>
        </div>
        <h3 class="pe-service-title" style="font-size: 1.5rem; font-weight: 700; margin-bottom: 1rem; color: #0f172a;">Business Strategy</h3>
        <p class="pe-service-description" style="color: #64748b; line-height: 1.7;">Data-driven strategic planning to accelerate growth and optimize performance across all business verticals.</p>
      </div>
      
      <div class="pe-service-card" style="background: #ffffff; padding: 2.5rem; border-radius: 20px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05); border: 1px solid #f1f5f9; transition: all 0.3s ease;">
        <div class="pe-service-icon" style="width: 64px; height: 64px; background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%); border-radius: 16px; display: flex; align-items: center; justify-content: center; margin-bottom: 1.5rem; color: #ffffff;">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="2"/>
            <path d="M16 8V5A3 3 0 0 0 10 5V8" stroke="currentColor" stroke-width="2"/>
            <rect x="8" y="12" width="8" height="5" rx="1" stroke="currentColor" stroke-width="2"/>
          </svg>
        </div>
        <h3 class="pe-service-title" style="font-size: 1.5rem; font-weight: 700; margin-bottom: 1rem; color: #0f172a;">Security & Compliance</h3>
        <p class="pe-service-description" style="color: #64748b; line-height: 1.7;">Comprehensive cybersecurity solutions and regulatory compliance frameworks to protect your digital assets.</p>
      </div>
      
      <div class="pe-service-card" style="background: #ffffff; padding: 2.5rem; border-radius: 20px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05); border: 1px solid #f1f5f9; transition: all 0.3s ease;">
        <div class="pe-service-icon" style="width: 64px; height: 64px; background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%); border-radius: 16px; display: flex; align-items: center; justify-content: center; margin-bottom: 1.5rem; color: #ffffff;">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <polyline points="22,12 18,12 15,21 9,3 6,12 2,12" stroke="currentColor" stroke-width="2"/>
          </svg>
        </div>
        <h3 class="pe-service-title" style="font-size: 1.5rem; font-weight: 700; margin-bottom: 1rem; color: #0f172a;">Performance Analytics</h3>
        <p class="pe-service-description" style="color: #64748b; line-height: 1.7;">Advanced analytics and business intelligence solutions to drive informed decision-making and measurable results.</p>
      </div>
      
      <div class="pe-service-card" style="background: #ffffff; padding: 2.5rem; border-radius: 20px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05); border: 1px solid #f1f5f9; transition: all 0.3s ease;">
        <div class="pe-service-icon" style="width: 64px; height: 64px; background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%); border-radius: 16px; display: flex; align-items: center; justify-content: center; margin-bottom: 1.5rem; color: #ffffff;">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 19C-2 19 -2 5 9 5C20 5 20 19 9 19Z" stroke="currentColor" stroke-width="2"/>
            <path d="M9 12H24" stroke="currentColor" stroke-width="2"/>
          </svg>
        </div>
        <h3 class="pe-service-title" style="font-size: 1.5rem; font-weight: 700; margin-bottom: 1rem; color: #0f172a;">Cloud Solutions</h3>
        <p class="pe-service-description" style="color: #64748b; line-height: 1.7;">Scalable cloud infrastructure and migration services to enhance flexibility and reduce operational costs.</p>
      </div>
      
      <div class="pe-service-card" style="background: #ffffff; padding: 2.5rem; border-radius: 20px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05); border: 1px solid #f1f5f9; transition: all 0.3s ease;">
        <div class="pe-service-icon" style="width: 64px; height: 64px; background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%); border-radius: 16px; display: flex; align-items: center; justify-content: center; margin-bottom: 1.5rem; color: #ffffff;">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17 21V19C17 17.9 16.1 17 15 17H9C7.9 17 7 17.9 7 19V21" stroke="currentColor" stroke-width="2"/>
            <circle cx="12" cy="7" r="4" stroke="currentColor" stroke-width="2"/>
          </svg>
        </div>
        <h3 class="pe-service-title" style="font-size: 1.5rem; font-weight: 700; margin-bottom: 1rem; color: #0f172a;">Training & Support</h3>
        <p class="pe-service-description" style="color: #64748b; line-height: 1.7;">Comprehensive training programs and ongoing support to ensure successful technology adoption and team empowerment.</p>
      </div>
    </div>
  </section>

  <!-- CTA Section -->
  <section class="pe-cta-section" style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 6rem 2rem; text-align: center; color: #ffffff;">
    <div class="pe-cta-content" style="max-width: 600px; margin: 0 auto;">
      <h2 class="pe-cta-title" style="font-size: 2.5rem; font-weight: 700; color: #ffffff; margin-bottom: 1rem; line-height: 1.2;">Ready to Transform Your Business?</h2>
      <p class="pe-cta-subtitle" style="font-size: 1.25rem; color: #cbd5e1; margin-bottom: 3rem; line-height: 1.6;">Let's discuss how Pro Empo Consults can accelerate your digital journey</p>
      <button class="pe-btn-primary" style="display: inline-flex; align-items: center; gap: 0.5rem; padding: 1rem 2rem; border-radius: 12px; font-weight: 600; font-size: 1rem; border: none; cursor: pointer; transition: all 0.3s ease; text-decoration: none; font-family: inherit; background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%); color: #ffffff; box-shadow: 0 4px 20px rgba(59, 130, 246, 0.3);">
        <span>Schedule Consultation</span>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </div>
  </section>
</div>

<style>
  /* Force all styles to apply globally to bypass Svelte scoping issues */
  :global(.pe-root-container) {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
    line-height: 1.6 !important;
    color: #1e293b !important;
    background: #ffffff !important;
    min-height: 100vh !important;
    width: 100% !important;
    margin: 0 !important;
    padding: 0 !important;
    box-sizing: border-box !important;
    position: relative !important;
  }

  :global(.pe-hero-section) {
    min-height: 100vh !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    padding: 3rem 2rem !important;
    position: relative !important;
    background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%) !important;
    overflow: hidden !important;
    color: #ffffff !important;
    max-width: 1400px !important;
    margin: 0 auto !important;
  }

  :global(.pe-hero-content) {
    flex: 1 !important;
    max-width: 700px !important;
    position: relative !important;
    z-index: 10 !important;
    opacity: 0 !important;
    transform: translateY(30px) !important;
    transition: all 0.8s ease-out !important;
  }

  :global(.pe-hero-content.pe-visible) {
    opacity: 1 !important;
    transform: translateY(0) !important;
  }

  /* Contact Cards for Desktop */
  :global(.pe-contact-cards) {
    flex: 1 !important;
    position: relative !important;
    height: 500px !important;
    display: none !important;
  }

  :global(.pe-contact-card) {
    position: absolute !important;
    background: rgba(255, 255, 255, 0.1) !important;
    backdrop-filter: blur(20px) !important;
    border: 1px solid rgba(255, 255, 255, 0.2) !important;
    border-radius: 16px !important;
    padding: 1.5rem !important;
    display: flex !important;
    align-items: center !important;
    gap: 1rem !important;
    color: #ffffff !important;
    animation: pe-float 6s ease-in-out infinite !important;
    min-width: 280px !important;
  }

  :global(.pe-card-1) {
    top: 20% !important;
    right: 20% !important;
    animation-delay: 0s !important;
  }

  :global(.pe-card-2) {
    top: 50% !important;
    right: 10% !important;
    animation-delay: 2s !important;
  }

  :global(.pe-card-3) {
    top: 70% !important;
    right: 30% !important;
    animation-delay: 4s !important;
  }

  :global(.pe-contact-icon) {
    width: 48px !important;
    height: 48px !important;
    background: rgba(217, 119, 6, 0.2) !important;
    border-radius: 12px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    flex-shrink: 0 !important;
  }

  :global(.pe-contact-text) {
    font-weight: 600 !important;
    font-size: 0.9rem !important;
    color: #ffffff !important;
  }

  /* Mobile Contact Info */
  :global(.pe-mobile-contact) {
    display: flex !important;
    flex-direction: column !important;
    gap: 1rem !important;
    margin-top: 2rem !important;
  }

  :global(.pe-mobile-contact-item) {
    display: flex !important;
    align-items: center !important;
    gap: 0.75rem !important;
    color: #cbd5e1 !important;
    font-size: 0.9rem !important;
  }

  :global(.pe-main-logo) {
    height: 80px !important;
    width: auto !important;
    filter: brightness(0) invert(1) !important;
    display: block !important;
    margin-bottom: 3rem !important;
  }

  :global(.pe-hero-title) {
    font-size: 3.5rem !important;
    font-weight: 700 !important;
    line-height: 1.1 !important;
    margin-bottom: 1.5rem !important;
    color: #ffffff !important;
    letter-spacing: -0.02em !important;
  }

  :global(.pe-gradient-text) {
    background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%) !important;
    -webkit-background-clip: text !important;
    -webkit-text-fill-color: transparent !important;
    background-clip: text !important;
    display: inline-block !important;
  }

  :global(.pe-hero-subtitle) {
    font-size: 1.25rem !important;
    color: #cbd5e1 !important;
    margin-bottom: 3rem !important;
    line-height: 1.7 !important;
    max-width: 500px !important;
  }

  :global(.pe-cta-buttons) {
    display: flex !important;
    gap: 1rem !important;
    flex-wrap: wrap !important;
    margin-top: 2rem !important;
  }

  :global(.pe-btn-primary), :global(.pe-btn-secondary) {
    display: inline-flex !important;
    align-items: center !important;
    gap: 0.5rem !important;
    padding: 1rem 2rem !important;
    border-radius: 12px !important;
    font-weight: 600 !important;
    font-size: 1rem !important;
    border: none !important;
    cursor: pointer !important;
    transition: all 0.3s ease !important;
    text-decoration: none !important;
    font-family: inherit !important;
  }

  :global(.pe-btn-primary) {
    background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%) !important;
    color: #ffffff !important;
    box-shadow: 0 4px 20px rgba(59, 130, 246, 0.3) !important;
  }

  :global(.pe-btn-secondary) {
    background: rgba(255, 255, 255, 0.1) !important;
    color: #ffffff !important;
    border: 1px solid rgba(255, 255, 255, 0.2) !important;
    backdrop-filter: blur(10px) !important;
  }

  :global(.pe-services-section) {
    padding: 6rem 2rem !important;
    max-width: 1200px !important;
    margin: 0 auto !important;
    background: #ffffff !important;
  }

  :global(.pe-section-header) {
    text-align: center !important;
    margin-bottom: 4rem !important;
  }

  :global(.pe-section-title) {
    font-size: 2.5rem !important;
    font-weight: 700 !important;
    margin-bottom: 1rem !important;
    color: #0f172a !important;
  }

  :global(.pe-section-subtitle) {
    font-size: 1.25rem !important;
    color: #64748b !important;
    max-width: 600px !important;
    margin: 0 auto !important;
  }

  :global(.pe-services-grid) {
    display: grid !important;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)) !important;
    gap: 2rem !important;
  }

  :global(.pe-service-card) {
    background: #ffffff !important;
    padding: 2.5rem !important;
    border-radius: 20px !important;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05) !important;
    border: 1px solid #f1f5f9 !important;
    transition: all 0.3s ease !important;
  }

  :global(.pe-service-icon) {
    width: 64px !important;
    height: 64px !important;
    background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%) !important;
    border-radius: 16px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    margin-bottom: 1.5rem !important;
    color: #ffffff !important;
  }

  :global(.pe-service-title) {
    font-size: 1.5rem !important;
    font-weight: 700 !important;
    margin-bottom: 1rem !important;
    color: #0f172a !important;
  }

  :global(.pe-service-description) {
    color: #64748b !important;
    line-height: 1.7 !important;
  }

  :global(.pe-cta-section) {
    background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%) !important;
    padding: 6rem 2rem !important;
    text-align: center !important;
    color: #ffffff !important;
  }

  :global(.pe-cta-content) {
    max-width: 600px !important;
    margin: 0 auto !important;
  }

  :global(.pe-cta-title) {
    font-size: 2.5rem !important;
    font-weight: 700 !important;
    color: #ffffff !important;
    margin-bottom: 1rem !important;
    line-height: 1.2 !important;
  }

  :global(.pe-cta-subtitle) {
    font-size: 1.25rem !important;
    color: #cbd5e1 !important;
    margin-bottom: 3rem !important;
    line-height: 1.6 !important;
  }

  @media (min-width: 1024px) {
    :global(.pe-contact-cards) {
      display: block !important;
    }
    :global(.pe-mobile-contact) {
      display: none !important;
    }
    :global(.pe-hero-title) {
      font-size: 3.5rem !important;
    }
  }

  @media (max-width: 1023px) {
    :global(.pe-hero-section) {
      padding: 2rem 1.5rem !important;
      flex-direction: column !important;
      text-align: center !important;
    }
    :global(.pe-hero-title) {
      font-size: 2.5rem !important;
    }
    :global(.pe-hero-subtitle) {
      font-size: 1.1rem !important;
      max-width: 100% !important;
    }
    :global(.pe-services-grid) {
      grid-template-columns: 1fr !important;
    }
    :global(.pe-services-section) {
      padding: 4rem 1.5rem !important;
    }
    :global(.pe-cta-section) {
      padding: 4rem 1.5rem !important;
    }
  }

  @media (max-width: 480px) {
    :global(.pe-hero-section) {
      padding: 2rem 1rem !important;
    }
    :global(.pe-hero-title) {
      font-size: 2rem !important;
    }
    :global(.pe-hero-subtitle) {
      font-size: 1rem !important;
    }
  }
</style>
