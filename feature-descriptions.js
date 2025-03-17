// Modified to use CommonJS require syntax for better browser compatibility
// This is a browser-compatible version that doesn't use ES6 imports

// First define an empty object to hold all descriptions
const featureDescriptions = {};

// Set each feature's descriptions manually
// You can either use direct assignment or a function to load these

// Load descriptions from module files
// In a real implementation, you would need to ensure these are loaded properly
// or bundle them with a tool like Webpack
try {
    featureDescriptions.Face_Shape = require('./face-shape-descriptions.js');
    featureDescriptions.Eyes = require('./eyes-descriptions.js');
    featureDescriptions.Nose = require('./nose-descriptions.js');
    featureDescriptions.Lips = require('./lips-descriptions.js');
    featureDescriptions.Eyebrows = require('./eyebrows-descriptions.js');
    featureDescriptions.Cheekbones = require('./cheekbones-descriptions.js');
    featureDescriptions.Jaw_Line = require('./jaw-line-descriptions.js');
    featureDescriptions.Ears = require('./ears-descriptions.js');
    featureDescriptions.Head_Shape = require('./head-shape-descriptions.js');
} catch (e) {
    console.error('Error loading feature descriptions:', e);
}

// Export for use in other modules
// For browser compatibility without bundling, consider:
window.featureDescriptions = featureDescriptions;

// Export for CommonJS modules if available
if (typeof module !== 'undefined' && module.exports) {
    module.exports = featureDescriptions;
}
