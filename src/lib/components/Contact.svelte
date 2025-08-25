<script>
  // Contact form state
  let name = '';
  let email = '';
  let phone = '';
  let subject = '';
  let message = '';
  let submitted = false;
  
  // Handle form submission
  function handleSubmit() {
    // Here you would typically send the data to your backend
    // For now, we'll just mark as submitted
    
    console.log({ name, email, phone, subject, message });
    
    // Reset form and show success message
    submitted = true;
    name = '';
    email = '';
    phone = '';
    subject = '';
    message = '';
    
    // Reset submitted flag after 5 seconds
    setTimeout(() => {
      submitted = false;
    }, 5000);
  }
  
  // Contact information
  const contactInfo = {
    address: "Kutta Road, Muyenga, Kampala, Uganda",
    phone: "+256 703 462 969",
    email: "info@shiloh.com",
    hours: "Monday - Friday: 8:00 AM - 6:00 PM\nSaturday: 9:00 AM - 2:00 PM\nSunday: Closed"
  }
  
  // FAQ items
  const faqItems = [
    {
      question: "What is the best time to visit Uganda?",
      answer: "Uganda can be visited year-round, but the best time is during the dry seasons from December to February and June to August. These periods offer optimal wildlife viewing and gorilla trekking conditions."
    },
    {
      question: "Do I need a visa to visit Uganda?",
      answer: "Most visitors require a visa to enter Uganda. You can apply for an e-visa online before your trip or obtain a visa on arrival at Entebbe International Airport. We can assist with visa information as part of our service."
    },
    {
      question: "How much does gorilla trekking cost?",
      answer: "Gorilla trekking permits in Uganda cost $800 per person for foreign non-residents (effective July 2024). This fee includes park entrance and one hour with a gorilla family. We handle all permit arrangements as part of our gorilla trekking packages."
    },
    {
      question: "Is Uganda safe for tourists?",
      answer: "Uganda is generally safe for tourists, especially in areas frequented by visitors. As with any destination, common-sense precautions should be taken. Our guides and drivers prioritize guest safety throughout your journey."
    },
    {
      question: "What vaccines do I need before traveling to Uganda?",
      answer: "Yellow fever vaccination is mandatory for entry into Uganda. Other recommended vaccinations include hepatitis A and B, typhoid, and tetanus. Malaria prophylaxis is also advised. Consult your healthcare provider before travel."
    },
    {
      question: "Can you accommodate special requirements?",
      answer: "Yes, we can accommodate various special requirements including dietary needs, mobility assistance, accessibility requirements, and adventure custom needs. Please inform us of any special requirements when planning your trip."
    }
  ]
</script>

<div class="pt-16 pb-8">
  <div class="container-custom">
    <!-- Header -->
    <div class="mb-8 text-center">
      <h1 class="text-4xl font-bold mb-4">Contact Us</h1>
      <p class="text-lg text-gray-600 max-w-3xl mx-auto">
        Have questions or ready to plan your Ugandan adventure? Get in touch with our team of travel experts.
      </p>
    </div>
    
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Contact Form -->
      <div class="lg:col-span-2">
        <div class="bg-white shadow-md rounded-lg p-6 md:p-8">
          <h2 class="text-2xl font-semibold mb-6">Send Us a Message</h2>
          
          {#if submitted}
            <div class="bg-green-50 border border-green-200 text-green-700 p-4 rounded-md mb-6 animate-fade-in">
              <div class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                <span class="font-medium">Message sent successfully!</span>
              </div>
              <p class="mt-2">Thank you for contacting us. Our team will get back to you within 24 hours.</p>
            </div>
          {/if}
          
          <form on:submit|preventDefault={handleSubmit} class="space-y-6">
            <!-- Name and Email -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label for="name" class="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <input 
                  type="text" 
                  id="name" 
                  bind:value={name}
                  required
                  class="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div>
                <label for="email" class="block text-sm font-medium text-gray-700 mb-1">
                  Email Address *
                </label>
                <input 
                  type="email" 
                  id="email" 
                  bind:value={email}
                  required
                  class="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>
            
            <!-- Phone -->
            <div>
              <label for="phone" class="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input 
                type="tel" 
                id="phone" 
                bind:value={phone}
                class="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            
            <!-- Subject -->
            <div>
              <label for="subject" class="block text-sm font-medium text-gray-700 mb-1">
                Subject *
              </label>
              <input 
                type="text" 
                id="subject" 
                bind:value={subject}
                required
                class="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            
            <!-- Message -->
            <div>
              <label for="message" class="block text-sm font-medium text-gray-700 mb-1">
                Message *
              </label>
              <textarea 
                id="message" 
                bind:value={message}
                rows="6"
                required
                class="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="How can we help you?"
              ></textarea>
            </div>
            
            <!-- Submit Button -->
            <div>
              <button 
                type="submit"
                class="bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-8 rounded-md transition-colors shadow-md"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
      
      <!-- Contact Info -->
      <div>
        <div class="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 class="text-xl font-semibold mb-6">Contact Information</h2>
          
          <div class="space-y-5">
            <div class="flex items-start">
              <div class="bg-primary-light/10 p-3 rounded-full mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h3 class="font-medium text-gray-900">Address</h3>
                <p class="text-gray-600 mt-1">{contactInfo.address}</p>
              </div>
            </div>
            
            <div class="flex items-start">
              <div class="bg-primary-light/10 p-3 rounded-full mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <h3 class="font-medium text-gray-900">Phone</h3>
                <p class="text-gray-600 mt-1">{contactInfo.phone}</p>
              </div>
            </div>
            
            <div class="flex items-start">
              <div class="bg-primary-light/10 p-3 rounded-full mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 class="font-medium text-gray-900">Email</h3>
                <p class="text-gray-600 mt-1">{contactInfo.email}</p>
              </div>
            </div>
            
            <div class="flex items-start">
              <div class="bg-primary-light/10 p-3 rounded-full mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 class="font-medium text-gray-900">Office Hours</h3>
                <p class="text-gray-600 mt-1 whitespace-pre-line">{contactInfo.hours}</p>
              </div>
            </div>
          </div>
          
          <div class="mt-8">
            <h3 class="font-medium text-gray-900 mb-3">Follow Us</h3>
            <div class="flex space-x-4">
              <a href="#" class="text-gray-500 hover:text-primary transition-colors">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fill-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clip-rule="evenodd"></path>
                </svg>
              </a>
              <a href="#" class="text-gray-500 hover:text-primary transition-colors">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                </svg>
              </a>
              <a href="#" class="text-gray-500 hover:text-primary transition-colors">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fill-rule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clip-rule="evenodd"></path>
                </svg>
              </a>
              <a href="#" class="text-gray-500 hover:text-primary transition-colors">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        <div class="bg-gray-50 rounded-lg p-6">
          <h2 class="text-xl font-semibold mb-6">Map Location</h2>
          <div class="bg-gray-200 h-64 rounded-md flex items-center justify-center">
            <div class="text-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-gray-400 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              <p class="text-gray-500">Interactive Map</p>
              <p class="text-sm text-gray-400 mt-1">(Map will be displayed here)</p>
            </div>
          </div>
          <p class="mt-3 text-sm text-gray-500">Our office is conveniently located in central Kampala, a short distance from major hotels and the city center.</p>
        </div>
      </div>
    </div>
    
    <!-- FAQs Section -->
    <div class="mt-16">
      <h2 class="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        {#each faqItems as item}
          <div class="bg-white shadow-sm rounded-lg p-6 border border-gray-100">
            <h3 class="text-lg font-semibold mb-3 text-primary">{item.question}</h3>
            <p class="text-gray-600">{item.answer}</p>
          </div>
        {/each}
      </div>
    </div>
  </div>
</div>
