// Modified to use global variables instead of require

// First define an empty object to hold all descriptions
const featureDescriptions = {};

// Set each feature's descriptions manually, reading from global variables
try {
    featureDescriptions.Face_Shape = window.faceShapeDescriptions;
    featureDescriptions.Eyes = window.eyesDescriptions;
    featureDescriptions.Nose = window.noseDescriptions;
    featureDescriptions.Lips = window.lipsDescriptions;
    featureDescriptions.Eyebrows = window.eyebrowsDescriptions;
    featureDescriptions.Cheekbones = window.cheekbonesDescriptions;
    featureDescriptions.Jaw_Line = window.jawLineDescriptions;
    featureDescriptions.Ears = window.earsDescriptions;
    featureDescriptions.Head_Shape = window.headShapeDescriptions;
} catch (e) {
    console.error('Error loading feature descriptions:', e);
    // Display an error message in the UI
    const errorContainer = document.createElement('div');
    errorContainer.style.color = 'red';
    errorContainer.textContent = 'Failed to load feature descriptions. Please check the console for details.';
    document.body.insertBefore(errorContainer, document.body.firstChild);
}

// Export for use in other modules
// For browser compatibility without bundling, consider:
window.featureDescriptions = featureDescriptions;

// Export for CommonJS modules if available
if (typeof module !== 'undefined' && module.exports) {
    module.exports = featureDescriptions;
}
