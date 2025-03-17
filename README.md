# Character Description System

A comprehensive web application for creating detailed character descriptions for text-to-image (T2I) generation systems.

## Overview

The Character Description System is a modular, feature-rich tool designed to help users create highly detailed character descriptions. These descriptions can be used as prompts for text-to-image AI systems such as Stable Diffusion, Midjourney, and DALL-E.

The system allows users to:
- Select from a wide range of facial features and characteristics
- Adjust intensity levels for each feature
- Generate optimized T2I prompts
- Receive compatibility warnings for potentially conflicting features

## Features

- **Global Parameters**: Set gender, age, and build
- **Facial Features**: Configure detailed aspects of:
  - Face Shape
  - Head Shape
  - Eyes
  - Nose
  - Lips
  - Eyebrows
  - Cheekbones
  - Jaw Line
  - Ears
- **Hair**: Set length, texture, color, and style
- **Wardrobe**: Configure clothing items, fit, fabric, and color
- **Feature Intensity**: Adjust emphasis on each feature (subtle to extreme)
- **Compatibility Checking**: Get warnings for potentially incompatible features
- **Prompt Generation**: Automatic creation of optimized T2I prompts

## Installation

1. Clone this repository:
   ```
   git clone https://github.com/yourusername/character-description-system.git
   ```

2. Navigate to the project directory:
   ```
   cd character-description-system
   ```

3. Open the `index.html` file in your web browser:
   - You can simply double-click the file
   - Or use a local server for better performance:
     ```
     npx serve .
     ```

No build process or dependencies are required to run the basic application.

## Usage

1. **Start with Global Parameters**:
   - Select gender, age, and build
   - Click "Save & Continue"

2. **Configure Facial Features**:
   - Navigate through the feature tabs on the left sidebar
   - Select appropriate options for each feature
   - Adjust intensity as needed using the dropdown at the bottom of each panel

3. **Add Hair and Wardrobe Details**:
   - Configure hair by selecting length, texture, color, and style
   - Set wardrobe options including item, fit, fabric, and color

4. **Generate and Use the Prompt**:
   - The generated prompt appears in the output section at the bottom
   - Review any compatibility warnings
   - Click "Copy Prompt" to copy the text for use in your preferred T2I system

5. **Clear or Reset**:
   - Use "Clear All" to start from scratch
   - Use "Reload Page" to reset the entire application

## File Structure

```
/
├── index.html               # Main HTML file
├── styles.css               # Main stylesheet
├── inline-styles.css        # Styles for feature descriptions
├── character-system.js      # Core system functionality
├── app.js                   # UI interaction logic
├── inline-description.js    # Description display functionality
├── feature-descriptions.js  # Feature descriptions container
├── face-shape-descriptions.js  # Face shape descriptions
├── eyes-descriptions.js     # Eye feature descriptions
├── nose-descriptions.js     # Nose feature descriptions
├── lips-descriptions.js     # Lips feature descriptions
├── eyebrows-descriptions.js # Eyebrow descriptions
├── cheekbones-descriptions.js # Cheekbone descriptions
├── jaw-line-descriptions.js  # Jaw line descriptions
├── ears-descriptions.js     # Ear feature descriptions
├── head-shape-descriptions.js # Head shape descriptions
└── README.md                # This file
```

## Browser Compatibility

The Character Description System is designed to work with modern browsers including:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Extending the System

### Adding New Features

To add a new feature:

1. Create a feature description file:
   - Follow the pattern in existing files like `eyes-descriptions.js`
   - Export using `module.exports = featureDescriptions`

2. Update the `feature-descriptions.js` file:
   - Add your new feature to the imports/requires

3. Add UI elements to `index.html`:
   - Create a new panel in the feature-panels section
   - Add navigation item to the feature-nav list

4. Update the `character-system.js` file:
   - Add the feature to the relevant arrays and objects
   - Add formatting logic for the new feature

### Customizing Feature Descriptions

Each feature description follows a standard format:

```javascript
{
    primaryDescription: "Main description of the feature",
    visualCharacteristics: [
        "First characteristic",
        "Second characteristic",
        "Third characteristic",
        "Fourth characteristic"
    ],
    distinguishingAttributes: [
        "First attribute",
        "Second attribute",
        "Third attribute"
    ],
    commonVariations: [
        "First variation",
        "Second variation",
        "Third variation"
    ],
    ethnicExample: "Example of ethnic prevalence or background"
}
```

Edit these files to customize descriptions or add new options.

## Future Development

Planned enhancements:
- Direct integration with popular T2I APIs
- Image preview functionality
- Save/load functionality for configurations
- Expanded feature sets for body shapes and poses
- User accounts and sharing capabilities

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- Developed based on research in facial feature classification and ethnically-inclusive design
- Inspired by the needs of digital artists and character creators
- Special thanks to all contributors and testers

---

For questions, support, or feature requests, please open an issue in the repository.
