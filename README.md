
# Trustwave IT Solutions Website

A professional website for Trustwave IT Solutions featuring IT services, CCTV installation, networking solutions, hardware repair, and software development.

## Project Structure
trustwave-it-solutions/
├── index.html # Homepage
├── cctv_installation_service.html
├── Software_and_Website_Development.html
├── Networking_and_labsetup.html
├── computer_hardware_repair.html
├── css/
│ └── style.css # Main stylesheet
├── js/
│ ├── main.js # Main JavaScript functionality
│ ├── form-handler.js # Form handling logic
│ └── components-loader.js # Header/Footer loader
├── components/
│ ├── header.html # Reusable header component
│ └── footer.html # Reusable footer component
├── images/ # Image assets
│ ├── Trustwaveit2.png
│ └── favicon.png
└── README.md



## Features

- **Responsive Design**: Works on all devices (desktop, tablet, mobile)
- **Modular Components**: Reusable header and footer
- **Service Pages**: Dedicated pages for each service
- **Contact Forms**: Functional contact forms with validation
- **SEO Optimized**: Proper meta tags and structure
- **Fast Loading**: Optimized images and code

## Setup Instructions

1. Extract all files to your web server directory
2. Ensure all file paths are correct for your server setup
3. Replace placeholder images with your actual images
4. Update contact information in the components
5. Configure any necessary server settings

## Customization

### Updating Contact Information
Edit `components/header.html` and `components/footer.html` to update:
- Phone numbers
- Email addresses
- Social media links
- Business address

### Adding New Services
1. Create new HTML file following the existing structure
2. Update navigation in `components/header.html`
3. Add link in services section of `components/footer.html`

### Styling Changes
Modify `css/style.css` to change:
- Colors (CSS variables in :root)
- Fonts and typography
- Layout and spacing
- Component styles

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Technologies Used

- HTML5
- CSS3 with CSS Grid and Flexbox
- Vanilla JavaScript (ES6+)
- Font Awesome Icons
- Google Fonts (Poppins)

## License

All rights reserved by Trustwave IT Solutions.