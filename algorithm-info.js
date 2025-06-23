// Algorithm Info Page JavaScript

document.addEventListener('DOMContentLoaded', () => {
    // Navigation highlighting
    const navLinks = document.querySelectorAll('.algo-navigation a');
    const sections = document.querySelectorAll('.algorithm-section');
    
    // Handle navigation clicks
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                
                // Remove active class from all links
                navLinks.forEach(link => link.classList.remove('active'));
                
                // Add active class to clicked link
                this.classList.add('active');
                
                // Scroll to the section
                const targetId = this.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Handle scroll to update active navigation
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
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
    
    // Create placeholders for images until they're available
    const imagePlaceholders = document.querySelectorAll('.algorithm-image');
    
    imagePlaceholders.forEach(img => {
        // Check if image exists, if not create a placeholder
        img.addEventListener('error', function() {
            this.src = createPlaceholderImage(this.alt);
            this.classList.add('placeholder');
        });
    });
    
    function createPlaceholderImage(text) {
        // This would typically create a placeholder image, but for now just return a data URI
        return `data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22400%22%20height%3D%22200%22%20viewBox%3D%220%200%20400%20200%22%20preserveAspectRatio%3D%22none%22%3E%3Crect%20fill%3D%22%23366dc2%22%20width%3D%22400%22%20height%3D%22200%22%3E%3C%2Frect%3E%3Ctext%20fill%3D%22%23ffffff%22%20font-family%3D%22sans-serif%22%20font-size%3D%2220%22%20font-weight%3D%22bold%22%20text-anchor%3D%22middle%22%20x%3D%22200%22%20y%3D%22100%22%3E${text}%20Diagram%3C%2Ftext%3E%3C%2Fsvg%3E`;
    }
    
    // Optional: Add interactive features to the algorithm examples
    // This could show step-by-step execution or highlight different parts of the algorithms
    
    const algorithmExamples = document.querySelectorAll('.algorithm-example');
    
    algorithmExamples.forEach(example => {
        example.addEventListener('click', () => {
            // Toggle a class for expanded view or details
            example.classList.toggle('expanded');
        });
    });
}); 