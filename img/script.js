// Add this at the end of your existing script.js file

// Certifications Section Functionality
function initCertifications() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const certificateCards = document.querySelectorAll('.certificate-card');
    const viewButtons = document.querySelectorAll('.view-btn');
    const modal = document.getElementById('certificateModal');
    const modalImage = document.getElementById('modalImage');
    const closeModal = document.getElementById('closeModal');
    
    // Set Data Analytics as default view
    const defaultCategory = '1';
    filterCertificates(defaultCategory);
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const category = button.getAttribute('data-category');
            filterCertificates(category);
        });
    });
    
    function filterCertificates(category) {
        certificateCards.forEach(card => {
            if (category === 'all' || card.getAttribute('data-category') === category) {
                card.style.display = 'block';
                // Trigger animation again when showing
                card.style.animation = 'none';
                card.offsetHeight; // Trigger reflow
                card.style.animation = 'fadeInUp 0.6s forwards';
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    // Certificate viewing functionality
    viewButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const certificatePath = button.getAttribute('data-certificate');
            modalImage.src = certificatePath;
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    closeModal.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}

// Initialize certifications when the section is in view
const certificationsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            initCertifications();
            certificationsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

const certificationsSection = document.querySelector('.certifications');
if (certificationsSection) {
    certificationsObserver.observe(certificationsSection);
}

// Add certifications to ScrollReveal
ScrollReveal().reveal('.certificate-card', { 
    origin: 'bottom',
    interval: 100 
});