// Advanced form handling with Supabase integration
class FormHandler {
    constructor() {
        this.supabaseUrl = 'https://aimpubnwugoufijpitnu.supabase.co';
        this.supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFpbXB1Ym53dWdvdWZpanBpdG51Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI0Mjc3NDQsImV4cCI6MjA3ODAwMzc0NH0.9XodTaWvt4WOzSPeErRXPWVsGKFFgVsAvPjpJukI10k';
        this.supabase = null;
        this.init();
    }

    init() {
        this.initializeSupabase();
        this.attachFormHandlers();
    }

    initializeSupabase() {
        if (typeof supabase !== 'undefined') {
            this.supabase = supabase.createClient(this.supabaseUrl, this.supabaseKey);
        }
    }

    attachFormHandlers() {
        document.querySelectorAll('form[id="contactForm"]').forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmission(form);
            });
        });
    }

    async handleFormSubmission(form) {
        const formData = new FormData(form);
        const formValues = Object.fromEntries(formData.entries());
        
        // Validate form
        if (!this.validateForm(form, formValues)) {
            return;
        }

        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        this.showLoadingState(submitBtn);

        try {
            // Save to Supabase if available
            if (this.supabase) {
                await this.saveToSupabase(formValues);
            }

            // Send email notification (you can integrate with your backend)
            await this.sendEmailNotification(formValues);

            // Show success message
            this.showSuccessMessage(form, formValues);
            form.reset();

        } catch (error) {
            console.error('Form submission error:', error);
            this.showErrorMessage(form, 'Sorry, there was an error submitting your form. Please try again or contact us directly.');
        } finally {
            this.restoreButtonState(submitBtn, originalText);
        }
    }

    validateForm(form, values) {
        // Required fields validation
        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            if (!values[field.name] || values[field.name].trim() === '') {
                this.highlightError(field);
                isValid = false;
            } else {
                this.removeErrorHighlight(field);
            }
        });

        // Email validation
        if (values.email && !this.isValidEmail(values.email)) {
            this.showMessage('Please enter a valid email address.', 'error', form);
            isValid = false;
        }

        // Phone validation (basic)
        if (values.phone && !this.isValidPhone(values.phone)) {
            this.showMessage('Please enter a valid phone number.', 'error', form);
            isValid = false;
        }

        return isValid;
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    isValidPhone(phone) {
        // Basic phone validation - adjust based on your requirements
        const phoneRegex = /^[0-9+\-\s()]{10,}$/;
        return phoneRegex.test(phone.replace(/\s/g, ''));
    }

    highlightError(field) {
        field.style.borderColor = 'var(--error)';
        field.classList.add('error-field');
    }

    removeErrorHighlight(field) {
        field.style.borderColor = '';
        field.classList.remove('error-field');
    }

    showLoadingState(button) {
        button.innerHTML = 'Sending... <div class="spinner"></div>';
        button.disabled = true;
    }

    restoreButtonState(button, originalText) {
        button.innerHTML = originalText;
        button.disabled = false;
    }

    async saveToSupabase(formData) {
        if (!this.supabase) return;

        const { data, error } = await this.supabase
            .from('contacts')
            .insert([{
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                service: formData.service || formData.device || formData.business || 'General Inquiry',
                message: formData.message || formData.issue || 'No message provided',
                created_at: new Date().toISOString()
            }]);

        if (error) {
            throw new Error(`Supabase error: ${error.message}`);
        }

        return data;
    }

    async sendEmailNotification(formData) {
        // This is where you would integrate with your email service
        // For example: SendGrid, Mailgun, or your custom backend
        console.log('Email notification would be sent:', formData);
        
        // Simulate API call
        return new Promise((resolve) => {
            setTimeout(resolve, 1000);
        });
    }

    showSuccessMessage(form, formValues) {
        let successMessage = `Thank you ${formValues.name}! Your message has been sent successfully. `;
        
        if (formValues.service) {
            successMessage += `We will contact you regarding ${formValues.service} soon.`;
        } else if (formValues.device) {
            successMessage += `Our technician will contact you about your ${formValues.device} repair soon.`;
        } else {
            successMessage += `We will contact you soon.`;
        }

        this.showMessage(successMessage, 'success', form);
    }

    showErrorMessage(form, message) {
        this.showMessage(message, 'error', form);
    }

    showMessage(text, type, form) {
        let messageDiv = form.querySelector('.form-message');
        if (!messageDiv) {
            messageDiv = document.createElement('div');
            messageDiv.className = 'form-message';
            form.appendChild(messageDiv);
        }
        
        messageDiv.textContent = text;
        messageDiv.className = `form-message ${type}`;
        messageDiv.style.display = 'block';

        // Auto-hide success messages after 5 seconds
        if (type === 'success') {
            setTimeout(() => {
                messageDiv.style.display = 'none';
            }, 5000);
        }

        // Scroll to message
        messageDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

// Initialize form handler when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new FormHandler();
});

// Add some CSS for error fields
const errorStyles = document.createElement('style');
errorStyles.textContent = `
    .error-field {
        border-color: var(--error) !important;
        background-color: rgba(220, 53, 69, 0.05) !important;
    }
    
    .error-field:focus {
        border-color: var(--error) !important;
        box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25) !important;
    }
`;
document.head.appendChild(errorStyles);