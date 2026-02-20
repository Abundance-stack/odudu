// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar')) {
        navMenu.classList.remove('active');
    }
});

// Back to Top Button
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Lazy Loading Images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Form Validation
const forms = document.querySelectorAll('form');
forms.forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Basic validation
        const inputs = form.querySelectorAll('input[required], textarea[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.style.borderColor = 'red';
            } else {
                input.style.borderColor = '';
            }
        });
        
        if (isValid) {
            alert('Thank you! Your message has been sent. We will contact you within 24 hours.');
            form.reset();
        } else {
            alert('Please fill in all required fields.');
        }
    });
});

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '#!') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Active Navigation Highlighting
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-menu a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (pageYOffset >= sectionTop) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Google Analytics Placeholder
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
// gtag('config', 'GA_MEASUREMENT_ID'); // Replace with actual ID

// Track WhatsApp Clicks
document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
    link.addEventListener('click', () => {
        // gtag('event', 'whatsapp_click', {
        //     'event_category': 'engagement',
        //     'event_label': 'WhatsApp Contact'
        // });
        console.log('WhatsApp link clicked');
    });
});

// Track Form Submissions
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', () => {
        // gtag('event', 'form_submit', {
        //     'event_category': 'engagement',
        //     'event_label': 'Contact Form'
        // });
        console.log('Form submitted');
    });
});


// Modal Functionality
const loginModal = document.getElementById('loginModal');
const signupModal = document.getElementById('signupModal');
const paymentModal = document.getElementById('paymentModal');

// Get all buttons that open modals
const loginBtn = document.getElementById('loginBtn');
const portalLoginBtn = document.getElementById('portalLoginBtn');
const payFeesBtn = document.getElementById('payFeesBtn');
const showSignup = document.getElementById('showSignup');
const showLogin = document.getElementById('showLogin');

// Get all close buttons
const closeButtons = document.querySelectorAll('.close-modal');

// Open Login Modal
if (loginBtn) {
    loginBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openModal(loginModal);
    });
}

if (portalLoginBtn) {
    portalLoginBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openModal(loginModal);
    });
}

// Open Signup Modal
if (showSignup) {
    showSignup.addEventListener('click', (e) => {
        e.preventDefault();
        closeModal(loginModal);
        setTimeout(() => openModal(signupModal), 300);
    });
}

// Open Login from Signup
if (showLogin) {
    showLogin.addEventListener('click', (e) => {
        e.preventDefault();
        closeModal(signupModal);
        setTimeout(() => openModal(loginModal), 300);
    });
}

// Open Payment Modal
if (payFeesBtn) {
    payFeesBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openModal(paymentModal);
    });
}

// Close modal when clicking close button
closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('.modal');
        closeModal(modal);
    });
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        closeModal(e.target);
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal.show').forEach(modal => {
            closeModal(modal);
        });
    }
});

// Modal helper functions
function openModal(modal) {
    if (modal) {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modal) {
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }
}

// Tab Switching
const tabButtons = document.querySelectorAll('.tab-btn');
tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const parent = button.parentElement;
        parent.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        button.classList.add('active');
        
        // Update form placeholder or behavior based on tab
        const userType = button.dataset.tab;
        console.log('Selected user type:', userType);
    });
});

// API Configuration
const API_URL = 'http://localhost:5000/api';

// Login Form Submission
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const userType = document.querySelector('.login-tabs .tab-btn.active').dataset.tab;
        
        // Basic validation
        if (!username || !password) {
            alert('Please fill in all fields');
            return;
        }
        
        try {
            // Call backend API
            const response = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password, userType })
            });
            
            const data = await response.json();
            
            if (data.success) {
                // Store token
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                
                alert(`Login successful! Welcome ${data.user.fullname}`);
                
                // Redirect based on user type
                if (userType === 'student') {
                    window.location.href = 'https://uiss.schulup.com';
                } else {
                    window.location.href = 'https://uiss.schulup.com/admin';
                }
                
                closeModal(loginModal);
                loginForm.reset();
            } else {
                alert(data.message || 'Login failed. Please check your credentials.');
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('Connection error. Please try again later.');
        }
    });
}

// Signup Form Submission
const signupForm = document.getElementById('signupForm');
if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const fullname = document.getElementById('fullname').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const studentId = document.getElementById('studentId').value;
        const newPassword = document.getElementById('newPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const userType = document.querySelector('#signupModal .tab-btn.active').dataset.tab;
        
        // Validation
        if (!fullname || !email || !phone || !studentId || !newPassword || !confirmPassword) {
            alert('Please fill in all fields');
            return;
        }
        
        if (newPassword !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        
        if (newPassword.length < 6) {
            alert('Password must be at least 6 characters long');
            return;
        }
        
        try {
            // Call backend API
            const response = await fetch(`${API_URL}/auth/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    fullname,
                    email,
                    phone,
                    studentId,
                    password: newPassword,
                    userType
                })
            });
            
            const data = await response.json();
            
            if (data.success) {
                alert('Account created successfully! Please login to continue.');
                closeModal(signupModal);
                setTimeout(() => openModal(loginModal), 300);
                signupForm.reset();
            } else {
                alert(data.message || 'Signup failed. Please try again.');
            }
        } catch (error) {
            console.error('Signup error:', error);
            alert('Connection error. Please try again later.');
        }
    });
}

// Payment Form Submission
const paymentForm = document.getElementById('paymentForm');
if (paymentForm) {
    paymentForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const studentId = document.getElementById('paymentStudentId').value;
        const studentName = document.getElementById('paymentName').value;
        const studentClass = document.getElementById('paymentClass').value;
        const paymentType = document.getElementById('paymentType').value;
        const amount = document.getElementById('amount').value;
        const paymentMethod = document.getElementById('paymentMethod').value;
        
        // Validation
        if (!studentId || !studentName || !studentClass || !paymentType || !amount || !paymentMethod) {
            alert('Please fill in all fields');
            return;
        }
        
        if (amount <= 0) {
            alert('Please enter a valid amount');
            return;
        }
        
        try {
            // Call backend API
            const response = await fetch(`${API_URL}/payment/initialize`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    studentId,
                    studentName,
                    class: studentClass,
                    paymentType,
                    amount: parseFloat(amount),
                    paymentMethod,
                    email: `${studentId}@uiss.edu.ng`,
                    term: 'First Term'
                })
            });
            
            const data = await response.json();
            
            if (data.success) {
                if (data.data.authorizationUrl) {
                    // Redirect to Paystack payment page
                    alert('Redirecting to payment gateway...');
                    window.location.href = data.data.authorizationUrl;
                } else {
                    // Show payment instructions
                    alert(`Payment Reference: ${data.data.reference}\n\n${data.data.instructions || 'Please complete your payment.'}`);
                    closeModal(paymentModal);
                    paymentForm.reset();
                }
            } else {
                alert(data.message || 'Payment initialization failed. Please try again.');
            }
        } catch (error) {
            console.error('Payment error:', error);
            alert('Connection error. Please try again later.');
        }
    });
}

