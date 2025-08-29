// ========== SCROLL EFFECTS ==========
function initializeScrollEffects() {
    // Add scroll event listener for animations
    window.addEventListener('scroll', handleScroll);
    
    // Initialize intersection observer for package cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideInUp 0.6s ease-out forwards';
                entry.target.style.opacity = '1';
            }
        });
    }, observerOptions);

    // Observe all package containers
    const packageContainers = document.querySelectorAll('[class^="pol"]');
    packageContainers.forEach((container, index) => {
        container.style.opacity = '0';
        container.style.transform = 'translateY(30px)';
        container.style.animationDelay = `${index * 0.1}s`;
        observer.observe(container);
    });

    // Add CSS animations
    addScrollAnimations();
}

function handleScroll() {
    // Add header background on scroll
    const header = document.querySelector('header');
    if (header) {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'transparent';
            header.style.backdropFilter = 'none';
            header.style.boxShadow = 'none';
        }
    }
}

function addScrollAnimations() {
    // Add CSS animations to head
    const style = document.createElement('style');
    style.textContent = `
        // @keyframes slideInUp {
        //     from {
        //         opacity: 0;
        //         transform: translateY(30px);
        //     }
        //     to {
        //         opacity: 1;
        //         transform: translateY(0);
        //     }
        // }
        
        // @keyframes fadeIn {
        //     from {
        //         opacity: 0;
        //     }
        //     to {
        //         opacity: 1;
        //     }
        // }
        
        // @keyframes slideOut {
        //     from {
        //         opacity: 1;
        //         transform: translateY(0);
        //     }
        //     to {
        //         opacity: 0;
        //         transform: translateY(-50px);
        //     }
        // }

        .notification {
            animation: slideInRight 0.3s ease-out;
        }

        @keyframes slideInRight {
            from {
                opacity: 0;
                transform: translateX(100%);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }

        /* Hover effects for package cards */
        [class^="pol"] {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        [class^="pol"]:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
        }

        /* Button hover effects */
        .bn1 {
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
        }

        .bn1:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        }

        .bn1:active {
            transform: translateY(0);
        }

        /* Loading button animation */
        .bn1:disabled {
            opacity: 0.7;
            cursor: not-allowed;
        }
    `;
    document.head.appendChild(style);
}

// ========== UTILITY FUNCTIONS ==========

// Enhanced notification function with better animations
function showNotification(message, type) {
    // Remove existing notifications of the same type
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => {
        if (notification.classList.contains(type)) {
            notification.remove();
        }
    });

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 16px 24px;
        border-radius: 10px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        max-width: 350px;
        word-wrap: break-word;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    `;
    
    // Set background color based on type
    switch(type) {
        case 'success':
            notification.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';
            break;
        case 'error':
            notification.style.background = 'linear-gradient(135deg, #f44336, #d32f2f)';
            break;
        case 'info':
            notification.style.background = 'linear-gradient(135deg, #2196F3, #1976D2)';
            break;
        case 'warning':
            notification.style.background = 'linear-gradient(135deg, #ff9800, #f57c00)';
            break;
        default:
            notification.style.background = 'linear-gradient(135deg, #333, #555)';
    }
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOut 0.3s ease-in forwards';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }
    }, 5000);

    // Add click to dismiss
    notification.addEventListener('click', () => {
        notification.style.animation = 'slideOut 0.3s ease-in forwards';
        setTimeout(() => {
            notification.remove();
        }, 300);
    });
}

// ========== ADDITIONAL FEATURES ==========

// Handle contact us buttons
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('con1') || e.target.classList.contains('con4')) {
        e.preventDefault();
        showContactModal();
    }
});

// Contact modal function
function showContactModal() {
    const modalOverlay = document.createElement('div');
    modalOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        z-index: 10000;
        display: flex;
        justify-content: center;
        align-items: center;
        backdrop-filter: blur(5px);
    `;

    modalOverlay.innerHTML = `
        <div style="background: white; border-radius: 15px; padding: 30px; max-width: 400px; width: 90%; text-align: center;">
            <h2 style="color: #333; margin-bottom: 20px;">Contact Us</h2>
            <div style="margin-bottom: 15px;">
                <strong>📞 Phone:</strong><br>
                <a href="tel:+919974712262" style="color: #007bff; text-decoration: none;">+91 9974712262</a>
            </div>
            <div style="margin-bottom: 15px;">
                <strong>📧 Email:</strong><br>
                <a href="mailto:tour@ttpkerala.com" style="color: #007bff; text-decoration: none;">tour@ttpkerala.com</a>
            </div>
            <div style="margin-bottom: 20px;">
                <strong>💬 WhatsApp:</strong><br>
                <a href="https://wa.me/919974712262" target="_blank" style="color: #25D366; text-decoration: none;">Chat with us</a>
            </div>
            <button onclick="this.closest('.contact-modal').remove()" style="
                background: #007bff;
                color: white;
                border: none;
                padding: 12px 30px;
                border-radius: 25px;
                cursor: pointer;
                font-size: 16px;
            ">Close</button>
        </div>
    `;

    modalOverlay.className = 'contact-modal';
    modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay) {
            modalOverlay.remove();
        }
    });

    document.body.appendChild(modalOverlay);
}

// Smooth scrolling for anchor links
document.addEventListener('click', function(e) {
    if (e.target.tagName === 'A' && e.target.getAttribute('href') && e.target.getAttribute('href').startsWith('#')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    }
});

// Initialize tooltips for signup link
const signupTooltip = document.querySelector('.tooltip');
if (signupTooltip) {
    const accountWrapper = document.querySelector('.account-wrapper');
    if (accountWrapper) {
        accountWrapper.addEventListener('mouseenter', function() {
            signupTooltip.style.opacity = '1';
            signupTooltip.style.transform = 'translateY(-5px)';
        });
        
        accountWrapper.addEventListener('mouseleave', function() {
            signupTooltip.style.opacity = '0';
            signupTooltip.style.transform = 'translateY(0)';
        });
    }
}

// ========== PRICE FORMATTING ==========
function formatPrices() {
    const priceElements = document.querySelectorAll('.sp1');
    priceElements.forEach(element => {
        let price = element.textContent.trim();
        // Add comma formatting for Indian numbers
        if (price.includes('₹')) {
            let numericValue = price.replace(/[^\d]/g, '');
            if (numericValue) {
                let formattedPrice = '₹ ' + parseInt(numericValue).toLocaleString('en-IN');
                element.textContent = formattedPrice;
            }
        }
    });
}

// Call price formatting after DOM load
setTimeout(formatPrices, 100);

// ========== SEARCH FUNCTIONALITY ==========
function initializeSearch() {
    const searchIcon = document.querySelector('.search img[src="search.png"]');
    if (searchIcon) {
        searchIcon.addEventListener('click', function(e) {
            e.preventDefault();
            showSearchModal();
        });
    }
}

function showSearchModal() {
    const searchModal = document.createElement('div');
    searchModal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        z-index: 10000;
        display: flex;
        justify-content: center;
        align-items: center;
    `;

    searchModal.innerHTML = `
        <div style="background: white; border-radius: 15px; padding: 30px; max-width: 500px; width: 90%;">
            <h2 style="text-align: center; color: #333; margin-bottom: 20px;">Search Packages</h2>
            <div style="margin-bottom: 15px;">
                <input type="text" id="searchInput" placeholder="Search by destination, package name..." 
                style="width: 100%; padding: 12px; border: 2px solid #ddd; border-radius: 8px; font-size: 16px;">
            </div>
            <div style="text-align: center;">
                <button onclick="performSearch()" style="
                    background: #007bff;
                    color: white;
                    border: none;
                    padding: 12px 30px;
                    border-radius: 25px;
                    cursor: pointer;
                    font-size: 16px;
                    margin-right: 10px;
                ">Search</button>
                <button onclick="this.closest('div').parentElement.remove()" style="
                    background: #6c757d;
                    color: white;
                    border: none;
                    padding: 12px 30px;
                    border-radius: 25px;
                    cursor: pointer;
                    font-size: 16px;
                ">Cancel</button>
            </div>
        </div>
    `;

    searchModal.addEventListener('click', function(e) {
        if (e.target === searchModal) {
            searchModal.remove();
        }
    });

    document.body.appendChild(searchModal);
    document.getElementById('searchInput').focus();

    // Handle Enter key in search input
    document.getElementById('searchInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
}

function performSearch() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase().trim();
    const searchModal = document.querySelector('div[style*="position: fixed"]');
    
    if (searchModal) {
        searchModal.remove();
    }

    if (!searchTerm) {
        showNotification('⚠️ Please enter a search term', 'warning');
        return;
    }

    // Show searching notification
    showNotification('🔍 Searching packages...', 'info');

    const packages = document.querySelectorAll('[class^="pol"]');
    let foundPackages = 0;

    packages.forEach(pkg => {
        const title = pkg.querySelector('.pl1')?.textContent.toLowerCase() || '';
        const location = pkg.querySelector('.pl2')?.textContent.toLowerCase() || '';
        const duration = pkg.querySelector('.dol1')?.textContent.toLowerCase() || '';

        if (title.includes(searchTerm) || location.includes(searchTerm) || duration.includes(searchTerm)) {
            pkg.style.display = 'block';
            pkg.style.border = '2px solid #007bff';
            pkg.style.boxShadow = '0 5px 20px rgba(0, 123, 255, 0.3)';
            foundPackages++;
        } else {
            pkg.style.display = 'none';
        }
    });

    setTimeout(() => {
        if (foundPackages > 0) {
            showNotification(`✅ Found ${foundPackages} package(s) matching "${searchTerm}"`, 'success');
            document.querySelector('.s2').scrollIntoView({ behavior: 'smooth' });
        } else {
            showNotification(`😔 No packages found for "${searchTerm}"`, 'error');
            // Show all packages again
            packages.forEach(pkg => {
                pkg.style.display = 'block';
                pkg.style.border = 'none';
                pkg.style.boxShadow = 'none';
            });
        }
    }, 1000);
}

// ========== LAZY LOADING FOR IMAGES ==========
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.3s ease';
                
                const tempImg = new Image();
                tempImg.onload = function() {
                    img.src = this.src;
                    img.style.opacity = '1';
                };
                tempImg.src = img.getAttribute('data-src') || img.src;
                
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// ========== SOCIAL MEDIA LINKS ==========
function initializeSocialMedia() {
    const socialIcons = {
        '.insta': 'https://www.instagram.com/ttpkerala/',
        '.fb': 'https://www.facebook.com/ttpkerala/',
        '.whatsapp': 'https://wa.me/919974712262',
        '.yt': 'https://www.youtube.com/channel/UCxxxxxx',
        '.twit': 'https://twitter.com/ttpkerala',
        '.linkden': 'https://www.linkedin.com/company/ttpkerala'
    };

    Object.entries(socialIcons).forEach(([selector, url]) => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            element.style.cursor = 'pointer';
            element.addEventListener('click', function(e) {
                e.preventDefault();
                window.open(url, '_blank');
            });

            // Add hover effect
            element.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.1)';
                this.style.transition = 'transform 0.3s ease';
            });

            element.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
            });
        });
    });
}

// ========== FORM ENHANCEMENTS ==========
function enhanceFormInputs() {
    // Add floating labels effect to inputs
    const inputs = document.querySelectorAll('input[type="text"], select');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.style.borderColor = '#007bff';
            this.style.boxShadow = '0 0 0 0.2rem rgba(0, 123, 255, 0.25)';
            this.style.transition = 'all 0.3s ease';
        });

        input.addEventListener('blur', function() {
            this.style.borderColor = '#ddd';
            this.style.boxShadow = 'none';
        });
    });

    // Add validation styling
    const selects = document.querySelectorAll('select');
    selects.forEach(select => {
        select.addEventListener('change', function() {
            if (this.value && this.value !== '0') {
                this.style.borderColor = '#28a745';
            } else {
                this.style.borderColor = '#dc3545';
            }
        });
    });
}

// ========== PERFORMANCE MONITORING ==========
function initializePerformanceMonitoring() {
    // Monitor page load time
    window.addEventListener('load', function() {
        const loadTime = performance.now();
        console.log(`Page loaded in ${Math.round(loadTime)} milliseconds`);
        
        if (loadTime > 3000) {
            showNotification('⚠️ Page loaded slowly. Check your connection.', 'warning');
        }
    });

    // Monitor scroll performance
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            // Scroll ended
        }, 100);
    }, { passive: true });
}

// ========== ERROR HANDLING ==========
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    showNotification('⚠️ Something went wrong. Please refresh the page.', 'error');
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled Promise Rejection:', e.reason);
    showNotification('⚠️ Network error occurred. Please try again.', 'error');
});

// ========== FINAL INITIALIZATION ==========
// Initialize all additional features
document.addEventListener('DOMContentLoaded', function() {
    // Add small delay to ensure DOM is fully ready
    setTimeout(() => {
        initializeSearch();
        initializeLazyLoading();
        initializeSocialMedia();
        enhanceFormInputs();
        initializePerformanceMonitoring();
    }, 100);
});

// ========== UTILITY: RESET SEARCH ==========
function resetSearch() {
    const packages = document.querySelectorAll('[class^="pol"]');
    packages.forEach(pkg => {
        pkg.style.display = 'block';
        pkg.style.border = 'none';
        pkg.style.boxShadow = 'none';
    });
    showNotification('🔄 Search cleared. Showing all packages.', 'info');
}

// Add reset search button (you can call this function from anywhere)
function addResetButton() {
    const resetBtn = document.createElement('button');
    resetBtn.textContent = 'Show All Packages';
    resetBtn.onclick = resetSearch;
    resetBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #28a745;
        color: white;
        border: none;
        padding: 12px 20px;
        border-radius: 25px;
        cursor: pointer;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        display: none;
    `;
    document.body.appendChild(resetBtn);
    
    return resetBtn;
}

console.log('✅ Kerala Travel Website Script Loaded Successfully!');
console.log('📱 Features: Booking System, Mobile Menu, Image Slider, Search, Social Media Links');
console.log('🚀 Ready for user interactions!');// script.js - Complete Travel Website JavaScript

// Wait for DOM to be loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initializeBookingSystem();
    initializeMobileMenu();
    initializeImageSlider();
    initializeFormValidation();
    initializeScrollEffects();
});

// ========== BOOKING SYSTEM ==========
function initializeBookingSystem() {
    // Get all "Book Now" buttons
    const bookNowButtons = document.querySelectorAll('.bn1');
    
    // Add click event listener to each button
    bookNowButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent form submission if inside a form
            
            // Add loading state to button
            const originalText = this.textContent;
            this.textContent = 'BOOKING...';
            this.disabled = true;
            
            // Find the parent container of the clicked button
            const packageContainer = this.closest('[class^="pol"]');
            
            if (packageContainer) {
                // Extract package data from the container
                const packageData = extractPackageData(packageContainer);
                
                // Send booking data to backend
                createBooking(packageData, this, originalText);
            } else {
                // Reset button if no container found
                this.textContent = originalText;
                this.disabled = false;
            }
        });
    });

    // Handle "Find Now" button in search section
    const findNowButton = document.querySelector('.box5');
    if (findNowButton) {
        findNowButton.addEventListener('click', function(e) {
            e.preventDefault();
            handleSearchPackages();
        });
    }
}

// Function to extract package data from the HTML container
function extractPackageData(container) {
    try {
        // Extract duration from the time element
        const durationElement = container.querySelector('.dol1');
        const duration = durationElement ? durationElement.textContent.trim() : 'Not specified';
        
        // Extract title from the package title element
        const titleElement = container.querySelector('.pl1');
        const title = titleElement ? titleElement.textContent.trim() : 'Package';
        
        // Extract location from the location element
        const locationElement = container.querySelector('.pl2');
        const location = locationElement ? locationElement.textContent.trim() : 'Kerala';
        
        // Extract price from the price span
        const priceElement = container.querySelector('.sp1');
        const price = priceElement ? priceElement.textContent.trim() : 'Contact for price';
        
        return {
            title: title,
            location: location,
            price: price,
            duration: duration
        };
    } catch (error) {
        console.error('Error extracting package data:', error);
        return {
            title: 'Package',
            location: 'Kerala',
            price: 'Contact for price',
            duration: 'Not specified'
        };
    }
}

// Function to send booking data to backend
async function createBooking(packageData, button, originalText) {
    try {
        // Show loading notification
        showNotification('Processing your booking request...', 'info');
        
        const response = await fetch('http://localhost:3000/booking', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(packageData)
        });
        
        const result = await response.json();
        
        if (response.ok) {
            // Success
            showNotification('🎉 Booking request submitted successfully!', 'success');
            console.log('Booking created:', result);
            
            // Show booking details to user
            showBookingModal(packageData, result.bookingId);
            
            // Reset button after delay
            setTimeout(() => {
                button.textContent = originalText;
                button.disabled = false;
            }, 2000);
            
        } else {
            // Error from server
            showNotification(`❌ Error: ${result.error}`, 'error');
            console.error('Booking error:', result);
            
            // Reset button immediately on error
            button.textContent = originalText;
            button.disabled = false;
        }
        
    } catch (error) {
        // Network or other error
        showNotification('🔌 Network error. Please check your connection and try again.', 'error');
        console.error('Network error:', error);
        
        // Reset button on error
        button.textContent = originalText;
        button.disabled = false;
    }
}

// Function to show notifications to user
function showNotification(message, type) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 5px;
        color: white;
        font-weight: bold;
        z-index: 10000;
        max-width: 300px;
        word-wrap: break-word;
    `;
    
    // Set background color based on type
    switch(type) {
        case 'success':
            notification.style.backgroundColor = '#4CAF50';
            break;
        case 'error':
            notification.style.backgroundColor = '#f44336';
            break;
        case 'info':
            notification.style.backgroundColor = '#2196F3';
            break;
        default:
            notification.style.backgroundColor = '#333';
    }
    
    // Add to page
    document.body.appendChild(notification);
    
    // Remove after 4 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 4000);
}

// Function to show booking confirmation modal
function showBookingModal(packageData, bookingId) {
    // Remove existing modal if any
    const existingModal = document.querySelector('.booking-modal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Create modal overlay
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'booking-modal';
    modalOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        z-index: 10000;
        display: flex;
        justify-content: center;
        align-items: center;
        backdrop-filter: blur(5px);
    `;
    
    // Create modal content
    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: white;
        border-radius: 15px;
        padding: 30px;
        max-width: 500px;
        width: 90%;
        max-height: 80%;
        overflow-y: auto;
        position: relative;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        animation: slideIn 0.3s ease-out;
    `;
    
    modalContent.innerHTML = `
        <style>
            @keyframes slideIn {
                from {
                    opacity: 0;
                    transform: translateY(-50px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        </style>
        <div style="text-align: center; margin-bottom: 20px;">
            <div style="background: #4CAF50; color: white; border-radius: 50%; width: 60px; height: 60px; display: inline-flex; align-items: center; justify-content: center; font-size: 30px; margin-bottom: 15px;">
                ✓
            </div>
            <h2 style="color: #333; margin: 0; font-size: 24px;">Booking Confirmed!</h2>
        </div>
        
        <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
            <h3 style="color: #666; margin-top: 0; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Booking Details</h3>
            
            <div style="margin-bottom: 15px;">
                <strong style="color: #333;">Booking ID:</strong>
                <span style="background: #e9ecef; padding: 5px 10px; border-radius: 5px; font-family: monospace; margin-left: 10px;">${bookingId}</span>
            </div>
            
            <div style="margin-bottom: 10px;">
                <strong style="color: #333;">Package:</strong>
                <span style="color: #666; margin-left: 10px;">${packageData.title}</span>
            </div>
            
            <div style="margin-bottom: 10px;">
                <strong style="color: #333;">Location:</strong>
                <span style="color: #666; margin-left: 10px;">${packageData.location}</span>
            </div>
            
            <div style="margin-bottom: 10px;">
                <strong style="color: #333;">Duration:</strong>
                <span style="color: #666; margin-left: 10px;">${packageData.duration}</span>
            </div>
            
            <div style="margin-bottom: 10px;">
                <strong style="color: #333;">Price:</strong>
                <span style="color: #ff6b35; font-weight: bold; margin-left: 10px; font-size: 18px;">${packageData.price}</span>
            </div>
        </div>
        
        <div style="background: #fff3cd; border: 1px solid #ffeaa7; border-radius: 8px; padding: 15px; margin-bottom: 20px;">
            <p style="margin: 0; color: #856404; font-size: 14px;">
                <strong>📞 Next Steps:</strong><br>
                Our travel experts will contact you within 24 hours to confirm your booking and discuss the itinerary details.
            </p>
        </div>
        
        <div style="text-align: center;">
            <button onclick="closeBookingModal()" style="
                background: #007bff;
                color: white;
                border: none;
                padding: 12px 30px;
                border-radius: 25px;
                cursor: pointer;
                font-size: 16px;
                font-weight: bold;
                margin-right: 10px;
                transition: background 0.3s;
            " onmouseover="this.style.background='#0056b3'" onmouseout="this.style.background='#007bff'">
                Great, Thanks!
            </button>
            <button onclick="contactUs()" style="
                background: #28a745;
                color: white;
                border: none;
                padding: 12px 30px;
                border-radius: 25px;
                cursor: pointer;
                font-size: 16px;
                font-weight: bold;
                transition: background 0.3s;
            " onmouseover="this.style.background='#1e7e34'" onmouseout="this.style.background='#28a745'">
                Contact Us Now
            </button>
        </div>
    `;
    
    modalOverlay.appendChild(modalContent);
    document.body.appendChild(modalOverlay);
    
    // Close modal when clicking overlay
    modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay) {
            closeBookingModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeBookingModal();
        }
    });
}

// Function to close booking modal
function closeBookingModal() {
    const modal = document.querySelector('.booking-modal');
    if (modal) {
        modal.style.animation = 'slideOut 0.3s ease-in forwards';
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

// Function to handle contact us from modal
function contactUs() {
    closeBookingModal();
    // Scroll to contact section or open WhatsApp
    window.open('https://wa.me/919974712262?text=Hi, I just made a booking and would like to discuss the details.', '_blank');
}

// ========== MOBILE MENU FUNCTIONALITY ==========
function initializeMobileMenu() {
    const openButton = document.getElementById('open4');
    const closeButton = document.getElementById('close4');
    const sidebar = document.getElementById('sid4');

    if (openButton && closeButton && sidebar) {
        openButton.addEventListener('click', function(e) {
            e.preventDefault();
            sidebar.style.display = 'block';
            openButton.style.display = 'none';
            closeButton.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });

        closeButton.addEventListener('click', function(e) {
            e.preventDefault();
            sidebar.style.display = 'none';
            openButton.style.display = 'block';
            closeButton.style.display = 'none';
            document.body.style.overflow = 'auto'; // Restore scrolling
        });

        // Close menu when clicking outside
        sidebar.addEventListener('click', function(e) {
            if (e.target === sidebar) {
                closeButton.click();
            }
        });
    }
}

// ========== IMAGE SLIDER FUNCTIONALITY ==========
function initializeImageSlider() {
    const sliderImages = document.querySelectorAll('.slider img');
    let currentImageIndex = 0;

    if (sliderImages.length > 0) {
        // Hide all images except first
        sliderImages.forEach((img, index) => {
            if (index === 0) {
                img.style.display = 'block';
                img.style.opacity = '1';
            } else {
                img.style.display = 'none';
                img.style.opacity = '0';
            }
        });

        // Auto-slide every 5 seconds
        setInterval(() => {
            // Fade out current image
            sliderImages[currentImageIndex].style.opacity = '0';
            
            setTimeout(() => {
                sliderImages[currentImageIndex].style.display = 'none';
                currentImageIndex = (currentImageIndex + 1) % sliderImages.length;
                sliderImages[currentImageIndex].style.display = 'block';
                
                // Fade in new image
                setTimeout(() => {
                    sliderImages[currentImageIndex].style.opacity = '1';
                }, 50);
            }, 500);
        }, 5000);

        // Add transition effect to all slider images
        sliderImages.forEach(img => {
            img.style.transition = 'opacity 0.5s ease-in-out';
        });
    }
}

// ========== FORM VALIDATION ==========
function initializeFormValidation() {
    // Validate search form
    const searchForm = document.querySelector('.over');
    if (searchForm) {
        const destinationSelect = searchForm.querySelector('.sel1');
        const travelTypeSelect = searchForm.querySelector('.sel2');
        const durationInput = searchForm.querySelector('.dur1');
        const dateInput = searchForm.querySelector('.jur1');

        // Add date picker functionality
        if (dateInput) {
            dateInput.type = 'date';
            dateInput.min = new Date().toISOString().split('T')[0]; // Minimum date is today
        }

        // Validate duration input (numbers only)
        if (durationInput) {
            durationInput.addEventListener('input', function() {
                this.value = this.value.replace(/[^0-9]/g, '');
                if (this.value > 30) {
                    this.value = '30'; // Max 30 days
                }
            });
        }
    }
}

// Handle search form submission
function handleSearchPackages() {
    const destinationSelect = document.querySelector('.sel1');
    const travelTypeSelect = document.querySelector('.sel2');
    const durationInput = document.querySelector('.dur1');
    const dateInput = document.querySelector('.jur1');

    // Get values
    const destination = destinationSelect ? destinationSelect.value : '';
    const travelType = travelTypeSelect ? travelTypeSelect.value : '';
    const duration = durationInput ? durationInput.value : '';
    const date = dateInput ? dateInput.value : '';

    // Validate required fields
    if (!destination || destination === '0') {
        showNotification('⚠️ Please select a destination', 'error');
        destinationSelect.focus();
        return;
    }

    if (!travelType || travelType === '0') {
        showNotification('⚠️ Please select a travel type', 'error');
        travelTypeSelect.focus();
        return;
    }

    if (!duration) {
        showNotification('⚠️ Please enter duration', 'error');
        durationInput.focus();
        return;
    }

    if (!date) {
        showNotification('⚠️ Please select a journey date', 'error');
        dateInput.focus();
        return;
    }

    // Show success message and filter packages
    showNotification('🔍 Searching for packages...', 'info');
    
    // Simulate search delay
    setTimeout(() => {
        filterPackagesBySearch(destination, travelType, duration, date);
        showNotification('✅ Packages filtered based on your search!', 'success');
    }, 1500);
}

// Filter packages based on search criteria
function filterPackagesBySearch(destination, travelType, duration, date) {
    const packageContainers = document.querySelectorAll('[class^="pol"]');
    let visibleCount = 0;

    packageContainers.forEach(container => {
        const packageLocation = container.querySelector('.pl2')?.textContent || '';
        const packageDuration = container.querySelector('.dol1')?.textContent || '';
        
        // Simple filtering logic (you can enhance this)
        let shouldShow = true;

        // Filter by destination
        if (destination !== '0') {
            const destinationText = getDestinationText(destination);
            if (!packageLocation.toLowerCase().includes(destinationText.toLowerCase())) {
                shouldShow = false;
            }
        }

        // Show/hide package
        if (shouldShow) {
            container.style.display = 'block';
            container.style.animation = 'fadeIn 0.5s ease-in';
            visibleCount++;
        } else {
            container.style.display = 'none';
        }
    });

    // Scroll to packages section
    if (visibleCount > 0) {
        document.querySelector('.s2').scrollIntoView({ behavior: 'smooth' });
    } else {
        showNotification('😔 No packages found matching your criteria', 'error');
        // Show all packages again
        packageContainers.forEach(container => {
            container.style.display = 'block';
        });
    }
}

// Helper function to get destination text
function getDestinationText(value) {
    const destinations = {
        '1': 'Gujarat',
        '2': 'Karnataka',
        '3': 'Maharashtra',
        '4': 'Arunachal Pradesh',
        '5': 'Rajasthan',
        '6': 'Kerala'
    };
    return destinations[value] || '';
}