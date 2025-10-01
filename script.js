// ============================================================================
// SCRIPT PRINCIPAL - PORTFOLIO PROFESIONAL
// ============================================================================
// 
// Este archivo contiene toda la lógica de funcionalidad del portfolio.
// La configuración de proyectos se encuentra en projects-config.js
//

// DOM Elements
let projectsGrid, modal, modalClose, filterBtns, contactForm, particlesContainer;

// Initialize DOM elements when document is ready
function initializeDOMElements() {
    projectsGrid = document.getElementById('projectsGrid');
    modal = document.getElementById('projectModal');
    modalClose = document.querySelector('.modal-close');
    filterBtns = document.querySelectorAll('.filter-btn');
    contactForm = document.getElementById('contactForm');
    particlesContainer = document.getElementById('particles');
}

// Current filter
let currentFilter = 'all';

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeDOMElements();
    loadProjects();
    initializeModal();
    initializeAnimations();
    initializeContactForm();
    initializeProjectFilter();
    initializeParticles();
    initializeTechStack();
    initializeScrollAnimations();
});

// Load projects into the grid
function loadProjects(filter = 'all') {
    console.log('Loading projects...', projects.length, 'projects found');
    
    if (!projectsGrid) {
        console.error('Projects grid element not found!');
        return;
    }
    
    projectsGrid.innerHTML = '';
    
    const filteredProjects = filter === 'all' 
        ? projects 
        : projects.filter(project => project.tags.includes(filter));
    
    console.log('Filtered projects:', filteredProjects.length);
    
    filteredProjects.forEach((project, index) => {
        const projectCard = createProjectCard(project);
        projectCard.style.animationDelay = `${index * 0.1}s`;
        projectsGrid.appendChild(projectCard);
    });
    
    // Trigger animation
    setTimeout(() => {
        const cards = document.querySelectorAll('.project-card');
        cards.forEach(card => card.classList.add('animate-in'));
    }, 100);
}

// Create project card element
function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.onclick = () => openModal(project);
    
    card.innerHTML = `
        <img src="${project.image}" alt="${project.title}" class="project-image">
        <div class="project-info">
            <h3 class="project-title">${project.title}</h3>
            <p class="project-description">${project.description}</p>
            <div class="project-tags">
                ${project.tags.map(tag => `<span class="project-tag" data-tag="${tag}">${tag}</span>`).join('')}
            </div>
            <div class="project-links">
                <a href="${project.github}" target="_blank" class="project-link primary" onclick="event.stopPropagation(); if(this.href === '#') { alert('Enlace no disponible'); return false; }">
                    <i class="fab fa-github"></i>
                    Ver Código
                </a>
                <a href="${project.demo}" target="_blank" class="project-link secondary" onclick="event.stopPropagation(); if(this.href === '#') { alert('Enlace no disponible'); return false; }">
                    <i class="fas fa-external-link-alt"></i>
                    Ver Demo
                </a>
            </div>
        </div>
    `;
    
    return card;
}

// Project filter functionality
function initializeProjectFilter() {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Load filtered projects
            currentFilter = filter;
            loadProjects(filter);
        });
    });
}

// Scroll to section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Modal functionality
function initializeModal() {
    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Close modal with escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });
    
    // Close button
    modalClose.addEventListener('click', closeModal);
}

// Open project modal
function openModal(project) {
    const modalTitle = document.getElementById('modalTitle');
    const modalImage = document.getElementById('modalImage');
    const modalDescription = document.getElementById('modalDescription');
    const modalTechnologies = document.getElementById('modalTechnologies');
    const modalGithub = document.getElementById('modalGithub');
    const modalDemo = document.getElementById('modalDemo');
    
    modalTitle.textContent = project.title;
    modalImage.src = project.image;
    modalImage.alt = project.title;
    modalDescription.textContent = project.fullDescription;
    
    modalTechnologies.innerHTML = project.technologies.map(tech => 
        `<span class="modal-tech-tag">${tech}</span>`
    ).join('');
    
    modalGithub.href = project.github;
    modalDemo.href = project.demo;
    
    // Add click handlers for modal buttons
    modalGithub.onclick = function(e) {
        if (this.href === '#') {
            e.preventDefault();
            alert('Enlace no disponible');
            return false;
        }
    };
    
    modalDemo.onclick = function(e) {
        if (this.href === '#') {
            e.preventDefault();
            alert('Enlace no disponible');
            return false;
        }
    };
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Add animation
    setTimeout(() => {
        modal.querySelector('.modal-content').style.transform = 'scale(1)';
        modal.querySelector('.modal-content').style.opacity = '1';
    }, 10);
}

// Close modal
function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Initialize animations
function initializeAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.project-card, .skill-item, .contact-card, .about-card').forEach(el => {
        observer.observe(el);
    });
}





// Initialize contact form
function initializeContactForm() {
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Simulate form submission
            showNotification('Mensaje enviado correctamente. Te responderé pronto.', 'success');
            this.reset();
        });
    }
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// Initialize particles
function initializeParticles() {
    if (!particlesContainer) return;
    
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            background: rgba(255, 255, 255, ${Math.random() * 0.3 + 0.1});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${Math.random() * 10 + 5}s ease-in-out infinite;
            animation-delay: ${Math.random() * 5}s;
        `;
        particlesContainer.appendChild(particle);
    }
}

// Initialize tech stack interactions
function initializeTechStack() {
    const techItems = document.querySelectorAll('.tech-item');
    
    techItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const tech = this.getAttribute('data-tech');
            this.style.transform = 'translateY(-10px) scale(1.2)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1)';
        });
        
        item.addEventListener('click', function() {
            const tech = this.getAttribute('data-tech');
            showNotification(`Tecnología: ${tech}`, 'info');
        });
    });
}

// Initialize scroll animations
function initializeScrollAnimations() {
    const scrollElements = document.querySelectorAll('.scroll-animate');
    
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, { threshold: 0.1 });
    
    scrollElements.forEach(el => scrollObserver.observe(el));
}

// Add CSS for notifications
const notificationStyles = `
<style>
.notification {
    position: fixed;
    top: 20px;
    right: 20px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    padding: 16px 20px;
    transform: translateX(400px);
    transition: transform 0.3s ease;
    z-index: 10000;
    border-left: 4px solid #06b6d4;
}

.notification.show {
    transform: translateX(0);
}

.notification-content {
    display: flex;
    align-items: center;
    gap: 12px;
}

.notification i {
    color: #06b6d4;
    font-size: 18px;
}

.notification.notification-error {
    border-left-color: #ef4444;
}

.notification.notification-error i {
    color: #ef4444;
}

.notification.notification-warning {
    border-left-color: #f59e0b;
}

.notification.notification-warning i {
    color: #f59e0b;
}

.particle {
    pointer-events: none;
}

.nav.scrolled {
    background: rgba(255, 255, 255, 0.98);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.nav-menu.active {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: rgba(255, 255, 255, 0.98);
    backdrop-filter: blur(20px);
    padding: 20px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.hamburger.active span:nth-child(1) {
    transform: rotate(45deg) translate(5px, 5px);
}

.hamburger.active span:nth-child(2) {
    opacity: 0;
}

.hamburger.active span:nth-child(3) {
    transform: rotate(-45deg) translate(7px, -6px);
}

@media (max-width: 768px) {
    .nav-menu {
        display: none;
    }
    
    .nav-menu.active {
        display: flex;
    }
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', notificationStyles);