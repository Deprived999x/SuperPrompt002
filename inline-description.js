// Modified to use window.featureDescriptions instead of ES6 import
// This ensures browser compatibility

document.addEventListener('DOMContentLoaded', function() {
    // Access the feature descriptions from window object instead of import
    const featureDescriptions = window.featureDescriptions;
    
    // Ensure feature descriptions are loaded before setting up event listeners
    if (!featureDescriptions) {
        console.error('Feature descriptions are not loaded. Please check feature-descriptions.js');
        return;
    }
    
    // Add description containers to all relevant select elements
    addDescriptionContainers();
    
    // Add event listeners to selects to show descriptions
    setupDescriptionListeners();
    
    // Special handling for face shape options
    setupFaceShapeDescriptions();
});

// Function to add description containers beneath select elements
function addDescriptionContainers() {
    const selects = document.querySelectorAll('select:not(#build-male):not(#build-female):not(#gender):not(#age):not([id$="-intensity"])');
    
    selects.forEach(select => {
        // Create a container for descriptions
        const descContainer = document.createElement('div');
        descContainer.className = 'description-container';
        descContainer.id = `desc-${select.id}`;
        
        // Insert after the select element
        select.parentNode.insertBefore(descContainer, select.nextSibling);
        
        // Debug log
        console.log(`Description container added for select: ${select.id}`);
    });
}

// Function to setup event listeners for descriptions
function setupDescriptionListeners() {
    const selects = document.querySelectorAll('select:not(#build-male):not(#build-female):not(#gender):not(#age):not([id$="-intensity"])');
    
    selects.forEach(select => {
        select.addEventListener('change', function() {
            const selectedOption = this.options[this.selectedIndex];
            const selectedValue = selectedOption.value;
            
            // Get the corresponding description container
            const descContainer = document.getElementById(`desc-${this.id}`);
            
            // Clear the container
            descContainer.innerHTML = '';
            
            // If a valid option is selected, show its description
            if (selectedValue) {
                const featureType = getFeatureTypeFromSelectId(this.id);
                showInlineDescription(descContainer, featureType, selectedValue);
                
                // Debug log
                console.log(`Description shown for select: ${this.id}, value: ${selectedValue}`);
            }
        });
    });
}

// Function to setup descriptions for face shape options
function setupFaceShapeDescriptions() {
    const shapeOptions = document.querySelectorAll('.shape-option');
    const descContainer = document.createElement('div');
    descContainer.className = 'description-container';
    descContainer.id = 'desc-face-shape';
    
    // Insert after the shape options container
    const shapeOptionsContainer = document.querySelector('.shape-options');
    shapeOptionsContainer.parentNode.insertBefore(descContainer, shapeOptionsContainer.nextSibling);
    
    // Add click listeners to shape options
    shapeOptions.forEach(option => {
        option.addEventListener('click', function() {
            const shapeValue = this.getAttribute('data-shape');
            
            // Clear the container
            descContainer.innerHTML = '';
            
            // Show description for selected shape
            if (shapeValue) {
                showInlineDescription(descContainer, 'Face_Shape', shapeValue);
            }
        });
    });
}

// Function to get feature type from select ID
function getFeatureTypeFromSelectId(selectId) {
    // Map select IDs to feature types
    const featureMap = {
        'eye-shape': 'Eyes',
        'eye-modifier': 'eyeModifiers',
        'nose-shape': 'Nose',
        'nose-width': 'noseWidth',
        'lips-shape': 'Lips',
        'lips-fullness': 'lipFullness',
        'lips-modifier': 'lipModifiers',
        'eyebrow-shape': 'Eyebrows',
        'eyebrow-thickness': 'eyebrowThickness',
        'cheekbone-shape': 'Cheekbones',
        'jawline-shape': 'Jaw_Line',
        'ear-shape': 'Ears',
        'head-shape-type': 'Head_Shape'
    };
    
    return featureMap[selectId] || '';
}

// Function to display an inline description
function showInlineDescription(container, featureType, featureValue) {
    // Get feature descriptions from window object
    const featureDescriptions = window.featureDescriptions;
    
    // Check if we have a description for this feature
    if (!featureDescriptions[featureType] || !featureDescriptions[featureType][featureValue]) {
        console.warn(`No description found for ${featureType} - ${featureValue}`);
        return;
    }
    
    const desc = featureDescriptions[featureType][featureValue];
    
    // Format the value for display
    let formattedValue = featureValue.replace(/_/g, ' ');
    formattedValue = formattedValue.charAt(0).toUpperCase() + formattedValue.slice(1);
    
    // Create the description elements
    const descContent = document.createElement('div');
    descContent.className = 'description-content';
    
    // Title
    const title = document.createElement('h4');
    title.className = 'description-title';
    title.textContent = formattedValue;
    
    // Primary Description
    const primaryDesc = document.createElement('p');
    primaryDesc.className = 'primary-description';
    primaryDesc.textContent = desc.primaryDescription;
    
    // Characteristics Section
    const charSection = document.createElement('div');
    charSection.className = 'characteristics-section';
    
    const charTitle = document.createElement('h5');
    charTitle.textContent = 'Characteristics:';
    charSection.appendChild(charTitle);
    
    const charList = document.createElement('ul');
    // Add only the first 3 characteristics for compact display
    const characteristicsToShow = desc.visualCharacteristics.slice(0, 3);
    characteristicsToShow.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        charList.appendChild(li);
    });
    charSection.appendChild(charList);
    
    // Ethnic Note (if available)
    const ethnicNote = document.createElement('p');
    ethnicNote.className = 'ethnic-note';
    if (desc.ethnicExample) {
        ethnicNote.textContent = desc.ethnicExample;
    }
    
    // Assemble the description
    descContent.appendChild(title);
    descContent.appendChild(primaryDesc);
    descContent.appendChild(charSection);
    descContent.appendChild(ethnicNote);
    
    // Add to container
    container.appendChild(descContent);
}
