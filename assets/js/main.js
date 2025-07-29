/**
* Template Name: iPortfolio
* Updated: Mar 10 2023 with Bootstrap v5.2.3
* Template URL: https://bootstrapmade.com/iportfolio-bootstrap-portfolio-websites-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos,
      behavior: 'smooth'
    })
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('body').classList.toggle('mobile-nav-active')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let body = select('body')
      if (body.classList.contains('mobile-nav-active')) {
        body.classList.remove('mobile-nav-active')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Hero type effect
   */
  const typed = select('.typed')
  if (typed) {
    let typed_strings = typed.getAttribute('data-typed-items')
    typed_strings = typed_strings.split(',')
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 20
      }
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

  /**
   * Initiate Pure Counter 
   */
  new PureCounter();

  /**
   * ------------------------------------------------------------------
   *         ADDED FADE SEQUENCE LOGIC (No existing code removed)
   * ------------------------------------------------------------------
   */
  window.addEventListener('load', () => {
    // Find all hero lines or text elements that should fade in
    // Example: If you've given them all the class "fade-sequence"
    const fadeSequence = document.querySelectorAll('.fade-sequence');

    let delay = 0;
    fadeSequence.forEach((element) => {
      setTimeout(() => {
        element.classList.add('fade-in'); // e.g. toggles CSS that transitions opacity from 0 to 1
      }, delay);
      // Increase delay by 2 seconds (2000 ms) per element
      delay += 1500;
    });
  });

  /**
   * ------------------------------------------------------------------
   *         LOADING ANIMATION LOGIC
   * ------------------------------------------------------------------
   */
  
  // Initialize loading animation
  function initLoadingAnimation() {
    const loadingOverlay = document.getElementById('loading-overlay');
    const body = document.body;
    const heroVideo = document.getElementById('hero-video');
    
    // Add loading class to body to prevent scrolling
    body.classList.add('loading');
    
    // Set a minimum loading time to ensure the animation is visible
    const minLoadingTime = 3000; // 3 seconds minimum
    const startTime = Date.now();
    
    // Track if video is ready
    let videoReady = false;
    let videoPlaying = false;
    
    // Function to handle video loading and show it when ready
    function handleVideoReady() {
      if (heroVideo && !videoReady) {
        videoReady = true;
        console.log('Video ready - adding ready class');
        
        // Add the 'ready' class to trigger the CSS transition
        heroVideo.classList.add('ready');
        
        // Add video-ready class to hero section to fade out fallback background
        const heroSection = document.getElementById('hero');
        if (heroSection) {
          heroSection.classList.add('video-ready');
        }
        
        // Ensure video is playing
        if (heroVideo.paused) {
          heroVideo.play().then(() => {
            videoPlaying = true;
            console.log('Video started playing successfully');
          }).catch(e => {
            console.log('Video autoplay failed:', e);
            // Even if autoplay fails, we still show the video
            videoPlaying = true;
          });
        } else {
          videoPlaying = true;
          console.log('Video was already playing');
        }
      }
    }
    
    // Preload video immediately when function starts
    if (heroVideo) {
      // Force video to start loading
      heroVideo.load();
      
      // Add event listeners for video readiness
      heroVideo.addEventListener('canplaythrough', handleVideoReady, { once: true });
      heroVideo.addEventListener('loadeddata', handleVideoReady, { once: true });
      heroVideo.addEventListener('canplay', handleVideoReady, { once: true });
    }
    
    // Function to check if we can proceed with hiding the overlay
    function canHideOverlay() {
      return videoReady && (videoPlaying || heroVideo.readyState >= 3);
    }
    
    // Function to hide loading overlay
    function hideLoadingOverlay() {
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, minLoadingTime - elapsedTime);
      
      setTimeout(() => {
        // First, ensure video is ready
        if (heroVideo) {
          // Check if video is already loaded enough to play
          if (heroVideo.readyState >= 3) { // HAVE_FUTURE_DATA
            handleVideoReady();
          } else {
            // Video is still loading, but we already added event listeners above
            // Fallback: if video takes too long, show it anyway after 3 seconds
            setTimeout(() => {
              if (!videoReady) {
                handleVideoReady();
              }
            }, 3000);
          }
        }
        
        // Wait for video to be ready before fading out loading overlay
        function checkAndHide() {
          if (canHideOverlay()) {
            console.log('Video ready and playing - starting video fade-in');
            
            // First, make the video visible
            handleVideoReady();
            
            // Wait for video to be fully visible before hiding loading overlay
            setTimeout(() => {
              console.log('Video should be visible now - hiding loading overlay');
              loadingOverlay.classList.add('fade-out');
              
                              // Remove loading class from body after fade out
                setTimeout(() => {
                  body.classList.remove('loading');
                  loadingOverlay.style.display = 'none';
                }, 800); // Match the CSS transition duration
            }, 1000); // Wait 1 second for video to start fading in
          } else {
            // Check again in 100ms
            setTimeout(checkAndHide, 100);
          }
        }
        
        // Start checking after a short delay
        setTimeout(checkAndHide, 200);
      }, remainingTime);
    }
    
    // Hide loading overlay when page is fully loaded
    if (document.readyState === 'complete') {
      hideLoadingOverlay();
    } else {
      window.addEventListener('load', hideLoadingOverlay);
    }
  }
  
  // Start loading animation immediately when script loads
  initLoadingAnimation();

})();
