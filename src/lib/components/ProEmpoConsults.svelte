<script>
  import { onMount } from 'svelte';
  
  let isVisible = false;
  
  onMount(() => {
    // Set visibility after a short delay
    setTimeout(() => {
      isVisible = true;
    }, 150);
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
  .pe-root-container {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    line-height: 1.6;
    color: #1e293b;
    background: #ffffff;
    min-height: 100vh;
    width: 100%;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    position: relative;
  }

  .pe-hero-section {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 3rem 2rem;
    position: relative;
    background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%);
    overflow: hidden;
    color: #ffffff;
    max-width: 1400px;
    margin: 0 auto;
  }

  .pe-hero-content {
    flex: 1;
    max-width: 700px;
    position: relative;
    z-index: 10;
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.8s ease-out;
  }

  .pe-hero-content.pe-visible {
    opacity: 1;
    transform: translateY(0);
  }

  /* Contact Cards for Desktop */
  .pe-contact-cards {
    flex: 1;
    position: relative;
    height: 500px;
    display: none;
  }

  .pe-contact-card {
    position: absolute;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 16px;
    padding: 1.5rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    color: #ffffff;
    animation: pe-float 6s ease-in-out infinite;
    min-width: 280px;
  }

  .pe-card-1 {
    top: 20%;
    right: 20%;
    animation-delay: 0s;
  }

  .pe-card-2 {
    top: 50%;
    right: 10%;
    animation-delay: 2s;
  }

  .pe-card-3 {
    top: 70%;
    right: 30%;
    animation-delay: 4s;
  }

  .pe-contact-icon {
    width: 48px;
    height: 48px;
    background: rgba(217, 119, 6, 0.2);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .pe-contact-text {
    font-weight: 600;
    font-size: 0.9rem;
    color: #ffffff;
  }

  /* Mobile Contact Info */
  .pe-mobile-contact {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 2rem;
  }

  .pe-mobile-contact-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    color: #cbd5e1;
    font-size: 0.9rem;
  }

  .pe-main-logo {
    height: 80px;
    width: auto;
    filter: brightness(0) invert(1);
    display: block;
    margin-bottom: 3rem;
  }

  .pe-hero-title {
    font-size: 3.5rem;
    font-weight: 700;
    line-height: 1.1;
    margin-bottom: 1.5rem;
    color: #ffffff;
    letter-spacing: -0.02em;
  }

  .pe-gradient-text {
    background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    display: inline-block;
  }

  .pe-hero-subtitle {
    font-size: 1.25rem;
    color: #cbd5e1;
    margin-bottom: 3rem;
    line-height: 1.7;
    max-width: 500px;
  }

  .pe-cta-buttons {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    margin-top: 2rem;
  }

  .pe-btn-primary, .pe-btn-secondary {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 1rem 2rem;
    border-radius: 12px;
    font-weight: 600;
    font-size: 1rem;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
    text-decoration: none;
    font-family: inherit;
  }

  .pe-btn-primary {
    background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
    color: #ffffff;
    box-shadow: 0 4px 20px rgba(59, 130, 246, 0.3);
  }

  .pe-btn-secondary {
    background: rgba(255, 255, 255, 0.1);
    color: #ffffff;
    border: 1px solid rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px);
  }

  .pe-services-section {
    padding: 6rem 2rem;
    max-width: 1200px;
    margin: 0 auto;
    background: #ffffff;
  }

  .pe-section-header {
    text-align: center;
    margin-bottom: 4rem;
  }

  .pe-section-title {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
    color: #0f172a;
  }

  .pe-section-subtitle {
    font-size: 1.25rem;
    color: #64748b;
    max-width: 600px;
    margin: 0 auto;
  }

  .pe-services-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 2rem;
  }

  .pe-service-card {
    background: #ffffff;
    padding: 2.5rem;
    border-radius: 20px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
    border: 1px solid #f1f5f9;
    transition: all 0.3s ease;
  }

  .pe-service-icon {
    width: 64px;
    height: 64px;
    background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1.5rem;
    color: #ffffff;
  }

  .pe-service-title {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
    color: #0f172a;
  }

  .pe-service-description {
    color: #64748b;
    line-height: 1.7;
  }

  .pe-cta-section {
    background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
    padding: 6rem 2rem;
    text-align: center;
    color: #ffffff;
  }

  .pe-cta-content {
    max-width: 600px;
    margin: 0 auto;
  }

  .pe-cta-title {
    font-size: 2.5rem;
    font-weight: 700;
    color: #ffffff;
    margin-bottom: 1rem;
    line-height: 1.2;
  }

  .pe-cta-subtitle {
    font-size: 1.25rem;
    color: #cbd5e1;
    margin-bottom: 3rem;
    line-height: 1.6;
  }

  @media (min-width: 1024px) {
    .pe-contact-cards {
      display: block;
    }
    .pe-mobile-contact {
      display: none;
    }
    .pe-hero-title {
      font-size: 3.5rem;
    }
  }

  @media (max-width: 1023px) {
    .pe-hero-section {
      padding: 2rem 1.5rem;
      flex-direction: column;
      text-align: center;
    }
    .pe-hero-title {
      font-size: 2.5rem;
    }
    .pe-hero-subtitle {
      font-size: 1.1rem;
      max-width: 100%;
    }
    .pe-services-grid {
      grid-template-columns: 1fr;
    }
    .pe-services-section {
      padding: 4rem 1.5rem;
    }
    .pe-cta-section {
      padding: 4rem 1.5rem;
    }
  }

  @media (max-width: 480px) {
    .pe-hero-section {
      padding: 2rem 1rem;
    }
    .pe-hero-title {
      font-size: 2rem;
    }
    .pe-hero-subtitle {
      font-size: 1rem;
    }
  }
</style>
