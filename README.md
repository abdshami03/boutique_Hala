# Boutique Hala - Luxury Abayas Gallery

A mobile-first, bilingual (Arabic/English) static website for showcasing luxury abayas with filtering capabilities and admin management.

## 🌟 Features

### Customer Side

- **Bilingual Support**: Full Arabic/English RTL/LTR switching
- **Responsive Gallery**: Mobile-first design with beautiful card layout
- **Advanced Filtering**: Filter by size, color, and category
- **Item Details**: Detailed product pages with images and videos
- **Real-time Updates**: Live updates when admin makes changes

### Admin Side

- **Secure Login**: Simple authentication system
- **CRUD Operations**: Add, edit, and delete items
- **Data Management**: Persistent storage with localStorage
- **Export Functionality**: Download data for GitHub Pages deployment
- **Live Preview**: See changes immediately across all pages

## 🚀 Quick Start

1. **Clone the repository**:

   ```bash
   git clone <repository-url>
   cd boutique-hala
   ```

2. **Open in browser**:

   - Customer side: Open `index.html` in your browser
   - Admin side: Navigate to `admin/index.html`

3. **Admin Access**:
   - Username: `admin`
   - Password: `hala123`

## 📁 Project Structure

```
boutique-hala/
├── index.html              # Main gallery page
├── item.html               # Product detail page
├── admin/
│   ├── index.html          # Admin login
│   └── dashboard.html      # Admin dashboard
├── js/
│   ├── data-manager.js     # Data management system
│   ├── main.js            # Gallery functionality
│   ├── item.js            # Item detail functionality
│   └── lang.js            # Language switching
├── css/
│   └── style.css          # Main stylesheet
├── data/
│   └── items.json         # Product data
└── assets/
    └── images/
        └── logo.jpg       # Logo and images
```

## 🔧 Technical Details

### Data Management

- **Primary Storage**: localStorage for immediate persistence
- **Fallback**: JSON file loading for initial data
- **Real-time Sync**: Custom events for live updates
- **Export**: Simulated GitHub Pages API for data export

### Data Structure

```json
{
  "id": 1,
  "name": "عباية سوداء مطرزة",
  "nameEn": "Black Embroidered Abaya",
  "description": "عباية أنيقة سوداء مع تطريز فضي",
  "descriptionEn": "Elegant black abaya with silver embroidery",
  "price": 299,
  "sizes": ["S", "M", "L", "XL"],
  "colors": ["Black"],
  "imageUrls": ["assets/images/logo.jpg"],
  "videoUrls": [],
  "category": "عبايات كلاسيكية",
  "categoryEn": "Classic Abayas"
}
```

### Key Components

#### DataManager Class

- Handles all CRUD operations
- Manages localStorage persistence
- Provides filtering and search capabilities
- Exports data for deployment

#### GalleryManager Class

- Renders product gallery
- Handles filtering and sorting
- Manages language switching
- Responsive grid layout

#### ItemDetailManager Class

- Displays product details
- Handles image/video display
- Manages RTL/LTR layout
- Contact integration

#### AdminDashboard Class

- Complete admin interface
- Form validation and submission
- Real-time data updates
- Export functionality

## 🎨 Design Features

### Responsive Design

- Mobile-first approach
- CSS Grid for flexible layouts
- Smooth animations and transitions
- Touch-friendly interactions

### Bilingual Support

- RTL/LTR layout switching
- Arabic font optimization
- Cultural design considerations
- Seamless language transitions

### Visual Design

- Warm, elegant color palette
- Card-based layout
- Hover effects and animations
- Professional typography

## 🔒 Security & Performance

### Security

- Client-side authentication
- Input validation
- XSS prevention
- Secure data handling

### Performance

- Lazy loading images
- Efficient DOM manipulation
- Minimal dependencies
- Optimized CSS

## 📱 Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- Mobile browsers

## 🚀 Deployment

### GitHub Pages

1. Push code to GitHub repository
2. Enable GitHub Pages in repository settings
3. Use admin export function to update data
4. Access via `https://username.github.io/repository-name`

### Local Development

1. Use any local server (Live Server, Python, etc.)
2. All features work locally
3. Data persists in browser localStorage

## 🔧 Customization

### Adding New Fields

1. Update data structure in `data/items.json`
2. Modify admin form in `admin/dashboard.html`
3. Update display logic in `js/main.js` and `js/item.js`
4. Add CSS styles as needed

### Styling Changes

- Modify `css/style.css` for visual changes
- CSS variables for easy theming
- Responsive breakpoints included
- RTL/LTR support maintained

### Language Support

- Add new languages in `js/lang.js`
- Update HTML structure for new languages
- Maintain RTL/LTR considerations

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Support

For support or questions:

- Create an issue in the repository
- Contact the development team
- Check the documentation

---

**Boutique Hala** - Where elegance meets technology ✨
