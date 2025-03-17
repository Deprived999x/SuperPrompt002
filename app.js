// Main application script for Character Description System

// Use the appropriate import mechanism for your setup
// For browser compatibility without bundling, we'll use script tags in HTML
// and access the CharacterDescriptionSystem from the window object

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the system
    // We're assuming CharacterDescriptionSystem is available globally
    // If using modules, update this to use proper import
    const characterSystem = new CharacterDescriptionSystem();
    let currentFeatureSection = 'global-params';

    console.log('Script loaded successfully');

    // DOM elements
    const featureNav = document.getElementById('feature-nav');
    const featurePanels = document.querySelectorAll('.feature-panel');
    const characterSummary = document.getElementById('character-summary');
    const promptText = document.getElementById('prompt-text');
    const compatibilityWarnings = document.getElementById('compatibility-warnings');
    const copyPromptBtn = document.getElementById('copy-prompt');
    const clearAllBtn = document.getElementById('clear-all');
    const generateImageBtn = document.getElementById('generate-image');
    const saveGlobalsBtn = document.getElementById('save-globals');
    const reloadBtn = document.getElementById('reload-page');

    // Global parameters
    const genderSelect = document.getElementById('gender');
    const ageSelect = document.getElementById('age');
    const buildSelectMale = document.getElementById('build-male');
    const buildSelectFemale = document.getElementById('build-female');

    // Intensity selectors
    const faceShapeIntensity = document.getElementById('face-shape-intensity');
    const eyesIntensity = document.getElementById('eyes-intensity');
    const noseIntensity = document.getElementById('nose-intensity');
    const lipsIntensity = document.getElementById('lips-intensity');
    const eyebrowsIntensity = document.getElementById('eyebrows-intensity');
    const cheekbonesIntensity = document.getElementById('cheekbones-intensity');
    const jawLineIntensity = document.getElementById('jaw-line-intensity');
    const earsIntensity = document.getElementById('ears-intensity');
    const headShapeIntensity = document.getElementById('head-shape-intensity');

    // Navigation between feature panels
    featureNav.addEventListener('click', function(e) {
        if (e.target.tagName === 'LI') {
            // Get section id from data attribute
            const sectionId = e.target.getAttribute('data-section');
            
            // Update active navigation item
            document.querySelectorAll('#feature-nav li').forEach(item => {
                item.classList.remove('active');
            });
            e.target.classList.add('active');
            
            // Show the corresponding panel
            featurePanels.forEach(panel => {
                panel.classList.remove('active');
            });
            document.getElementById(sectionId).classList.add('active');
            
            currentFeatureSection = sectionId;
        }
    });

    // Toggle build select inputs based on gender
    genderSelect.addEventListener('change', function() {
        const selectedGender = this.value;
        
        // Hide all build selections
        buildSelectMale.style.display = 'none';
        buildSelectFemale.style.display = 'none';
        
        // Show appropriate build selection based on gender
        if (selectedGender === 'male') {
            buildSelectMale.style.display = 'block';
            buildSelectFemale.value = '';
        } else if (selectedGender === 'female') {
            buildSelectFemale.style.display = 'block';
            buildSelectMale.value = '';
        } else if (selectedGender === 'androgynous') {
            // For androgynous, show both build options
            buildSelectMale.style.display = 'block';
            buildSelectFemale.style.display = 'block';
        }
    });

    // Save global parameters and proceed to next section
    saveGlobalsBtn.addEventListener('click', function() {
        const selectedGender = genderSelect.value;
        let selectedBuild = '';
        
        // Get build value from visible select element
        if (selectedGender === 'male') {
            selectedBuild = buildSelectMale.value;
        } else if (selectedGender === 'female') {
            selectedBuild = buildSelectFemale.value;
        } else if (selectedGender === 'androgynous') {
            selectedBuild = buildSelectMale.value || buildSelectFemale.value;
        }
        
        const globalParams = {
            gender: selectedGender,
            age: ageSelect.value,
            build: selectedBuild
        };
        
        const result = characterSystem.setGlobalParams(globalParams);
        
        if (result.valid) {
            // Move to the next section
            navigateToSection('face-shape');
            updateSummary();
            updatePrompt();
        } else {
            alert('Please fill in all required global parameters:\n' + result.errors.join('\n'));
        }
    });

    // Face Shape intensity handling
    faceShapeIntensity.addEventListener('change', function() {
        const selectedShape = document.querySelector('.shape-option.selected');
        if (selectedShape) {
            const shapeValue = selectedShape.getAttribute('data-shape');
            characterSystem.setFeature('Face_Shape', { shape: shapeValue }, this.value);
            updateSummary();
            updatePrompt();
        }
    });

    // Face shape selection
    const shapeOptions = document.querySelectorAll('.shape-option');
    shapeOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove selected class from all options
            shapeOptions.forEach(opt => opt.classList.remove('selected'));
            
            // Add selected class to clicked option
            this.classList.add('selected');
            
            // Get selected shape from data attribute
            const selectedShape = this.getAttribute('data-shape');
            
            // Get current intensity
            const intensity = faceShapeIntensity ? faceShapeIntensity.value : "moderate";
            
            // Set face shape in the system with intensity
            characterSystem.setFeature('Face_Shape', { shape: selectedShape }, intensity);
            
            updateSummary();
            updatePrompt();
        });
    });

    // Eyes intensity handling
    eyesIntensity.addEventListener('change', function() {
        if (characterSystem.featureSelections.Eyes) {
            characterSystem.setIntensity('Eyes', this.value);
            updateSummary();
            updatePrompt();
        }
    });

    // Handle select inputs for eyes
    const eyeShape = document.getElementById('eye-shape');
    const eyeColor = document.getElementById('eye-color');
    const eyeModifier = document.getElementById('eye-modifier');

    [eyeShape, eyeColor, eyeModifier].forEach(select => {
        select.addEventListener('change', function() {
            const eyesFeature = {};
            
            if (eyeShape.value) eyesFeature.shape = eyeShape.value;
            if (eyeColor.value) eyesFeature.color = eyeColor.value;
            if (eyeModifier.value) eyesFeature.modifier = eyeModifier.value;
            
            if (Object.keys(eyesFeature).length > 0) {
                // Get current intensity
                const intensity = eyesIntensity ? eyesIntensity.value : "moderate";
                characterSystem.setFeature('Eyes', eyesFeature, intensity);
                updateSummary();
                updatePrompt();
            }
        });
    });

    // Nose intensity handling
    noseIntensity.addEventListener('change', function() {
        if (characterSystem.featureSelections.Nose) {
            characterSystem.setIntensity('Nose', this.value);
            updateSummary();
            updatePrompt();
        }
    });

    // Handle select inputs for nose
    const noseShape = document.getElementById('nose-shape');
    const noseWidth = document.getElementById('nose-width');

    [noseShape, noseWidth].forEach(select => {
        select.addEventListener('change', function() {
            const noseFeature = {};
            
            if (noseShape.value) noseFeature.shape = noseShape.value;
            if (noseWidth.value) noseFeature.width = noseWidth.value;
            
            if (Object.keys(noseFeature).length > 0) {
                // Get current intensity
                const intensity = noseIntensity ? noseIntensity.value : "moderate";
                characterSystem.setFeature('Nose', noseFeature, intensity);
                updateSummary();
                updatePrompt();
            }
        });
    });

    // Lips intensity handling
    lipsIntensity.addEventListener('change', function() {
        if (characterSystem.featureSelections.Lips) {
            characterSystem.setIntensity('Lips', this.value);
            updateSummary();
            updatePrompt();
        }
    });

    // Handle select inputs for lips
    const lipsShape = document.getElementById('lips-shape');
    const lipsFullness = document.getElementById('lips-fullness');
    const lipsModifier = document.getElementById('lips-modifier');

    [lipsShape, lipsFullness, lipsModifier].forEach(select => {
        select.addEventListener('change', function() {
            const lipsFeature = {};
            
            if (lipsShape.value) lipsFeature.shape = lipsShape.value;
            if (lipsFullness.value) lipsFeature.fullness = lipsFullness.value;
            if (lipsModifier.value) lipsFeature.modifier = lipsModifier.value;
            
            if (Object.keys(lipsFeature).length > 0) {
                // Get current intensity
                const intensity = lipsIntensity ? lipsIntensity.value : "moderate";
                characterSystem.setFeature('Lips', lipsFeature, intensity);
                updateSummary();
                updatePrompt();
            }
        });
    });

    // Eyebrows intensity handling
    eyebrowsIntensity.addEventListener('change', function() {
        if (characterSystem.featureSelections.Eyebrows) {
            characterSystem.setIntensity('Eyebrows', this.value);
            updateSummary();
            updatePrompt();
        }
    });

    // Handle select inputs for eyebrows
    const eyebrowShape = document.getElementById('eyebrow-shape');
    const eyebrowThickness = document.getElementById('eyebrow-thickness');

    [eyebrowShape, eyebrowThickness].forEach(select => {
        select.addEventListener('change', function() {
            const eyebrowFeature = {};
            
            if (eyebrowShape.value) eyebrowFeature.shape = eyebrowShape.value;
            if (eyebrowThickness.value) eyebrowFeature.thickness = eyebrowThickness.value;
            
            if (Object.keys(eyebrowFeature).length > 0) {
                // Get current intensity
                const intensity = eyebrowsIntensity ? eyebrowsIntensity.value : "moderate";
                characterSystem.setFeature('Eyebrows', eyebrowFeature, intensity);
                updateSummary();
                updatePrompt();
            }
        });
    });

    // Cheekbones intensity handling
    cheekbonesIntensity.addEventListener('change', function() {
        if (characterSystem.featureSelections.Cheekbones) {
            characterSystem.setIntensity('Cheekbones', this.value);
            updateSummary();
            updatePrompt();
        }
    });

    // Handle select input for cheekbones
    const cheekboneShape = document.getElementById('cheekbone-shape');
    cheekboneShape.addEventListener('change', function() {
        if (this.value) {
            // Get current intensity
            const intensity = cheekbonesIntensity ? cheekbonesIntensity.value : "moderate";
            characterSystem.setFeature('Cheekbones', { shape: this.value }, intensity);
            updateSummary();
            updatePrompt();
        }
    });

    // Jaw Line intensity handling
    jawLineIntensity.addEventListener('change', function() {
        if (characterSystem.featureSelections.Jaw_Line) {
            characterSystem.setIntensity('Jaw_Line', this.value);
            updateSummary();
            updatePrompt();
        }
    });

    // Handle select input for jawline
    const jawlineShape = document.getElementById('jawline-shape');
    jawlineShape.addEventListener('change', function() {
        if (this.value) {
            // Get current intensity
            const intensity = jawLineIntensity ? jawLineIntensity.value : "moderate";
            characterSystem.setFeature('Jaw_Line', { shape: this.value }, intensity);
            updateSummary();
            updatePrompt();
        }
    });

    // Ears intensity handling
    earsIntensity.addEventListener('change', function() {
        if (characterSystem.featureSelections.Ears) {
            characterSystem.setIntensity('Ears', this.value);
            updateSummary();
            updatePrompt();
        }
    });

    // Handle select input for ears
    const earShape = document.getElementById('ear-shape');
    earShape.addEventListener('change', function() {
        if (this.value) {
            // Get current intensity
            const intensity = earsIntensity ? earsIntensity.value : "moderate";
            characterSystem.setFeature('Ears', { shape: this.value }, intensity);
            updateSummary();
            updatePrompt();
        }
    });

    // Head Shape intensity handling
    headShapeIntensity.addEventListener('change', function() {
        if (characterSystem.featureSelections.Head_Shape) {
            characterSystem.setIntensity('Head_Shape', this.value);
            updateSummary();
            updatePrompt();
        }
    });

    // Handle select input for head shape
    const headShapeType = document.getElementById('head-shape-type');
    headShapeType.addEventListener('change', function() {
        if (this.value) {
            // Get current intensity
            const intensity = headShapeIntensity ? headShapeIntensity.value : "moderate";
            characterSystem.setFeature('Head_Shape', { shape: this.value }, intensity);
            updateSummary();
            updatePrompt();
        }
    });

    // Handle select inputs for hair
    const hairLength = document.getElementById('hair-length');
    const hairTexture = document.getElementById('hair-texture');
    const hairColor = document.getElementById('hair-color');
    const hairStyle = document.getElementById('hair-style');

    [hairLength, hairTexture, hairColor, hairStyle].forEach(select => {
        select.addEventListener('change', function() {
            const hairFeature = {};
            
            if (hairLength.value) hairFeature.length = hairLength.value;
            if (hairTexture.value) hairFeature.texture = hairTexture.value;
            if (hairColor.value) hairFeature.color = hairColor.value;
            if (hairStyle.value) hairFeature.style = hairStyle.value;
            
            if (Object.keys(hairFeature).length > 0) {
                characterSystem.setFeature('Hair', hairFeature);
                updateSummary();
                updatePrompt();
            }
        });
    });

    // Handle select inputs for wardrobe
    const wardrobeItem = document.getElementById('wardrobe-item');
    const wardrobeFit = document.getElementById('wardrobe-fit');
    const wardrobeFabric = document.getElementById('wardrobe-fabric');
    const wardrobeColor = document.getElementById('wardrobe-color');

    [wardrobeItem, wardrobeFit, wardrobeFabric, wardrobeColor].forEach(select => {
        select.addEventListener('change', function() {
            const wardrobeFeature = {};
            
            if (wardrobeItem.value) wardrobeFeature.item = wardrobeItem.value;
            if (wardrobeFit.value) wardrobeFeature.fit = wardrobeFit.value;
            if (wardrobeFabric.value) wardrobeFeature.fabric = wardrobeFabric.value;
            if (wardrobeColor.value) wardrobeFeature.color = wardrobeColor.value;
            
            if (Object.keys(wardrobeFeature).length > 0) {
                characterSystem.setFeature('Wardrobe', wardrobeFeature);
                updateSummary();
                updatePrompt();
            }
        });
    });

    // Copy prompt to clipboard
    copyPromptBtn.addEventListener('click', function() {
        const promptToCopy = promptText.textContent;
        if (promptToCopy) {
            navigator.clipboard.writeText(promptToCopy)
                .then(() => {
                    // Temporary feedback
                    const originalText = this.textContent;
                    this.textContent = 'Copied!';
                    setTimeout(() => {
                        this.textContent = originalText;
                    }, 2000);
                })
                .catch(err => {
                    console.error('Failed to copy: ', err);
                    alert('Failed to copy to clipboard');
                });
        }
    });

    // Clear all selections
    clearAllBtn.addEventListener('click', function() {
        if (confirm('Are you sure you want to clear all selections?')) {
            // Reset the system
            characterSystem.clearAllFeatures();
            
            // Reset global parameters
            genderSelect.value = '';
            ageSelect.value = '';
            buildSelectMale.value = '';
            buildSelectFemale.value = '';
            buildSelectMale.style.display = 'none';
            buildSelectFemale.style.display = 'none';
            
            characterSystem.setGlobalParams({
                gender: null,
                age: null,
                build: null
            });
            
            // Reset all form elements
            document.querySelectorAll('select').forEach(select => {
                select.value = '';
            });
            
            // Reset face shape selection
            shapeOptions.forEach(option => {
                option.classList.remove('selected');
            });
            
            // Reset intensity selectors
            if (faceShapeIntensity) faceShapeIntensity.value = 'moderate';
            if (eyesIntensity) eyesIntensity.value = 'moderate';
            if (noseIntensity) noseIntensity.value = 'moderate';
            if (lipsIntensity) lipsIntensity.value = 'moderate';
            if (eyebrowsIntensity) eyebrowsIntensity.value = 'moderate';
            if (cheekbonesIntensity) cheekbonesIntensity.value = 'moderate';
            if (jawLineIntensity) jawLineIntensity.value = 'moderate';
            if (earsIntensity) earsIntensity.value = 'moderate';
            if (headShapeIntensity) headShapeIntensity.value = 'moderate';
            
            // Reset to first section
            navigateToSection('global-params');
            
            // Update UI
            updateSummary();
            updatePrompt();
        }
    });

    // Generate image button (placeholder for future integration)
    generateImageBtn.addEventListener('click', function() {
        const promptResult = characterSystem.generatePrompt();
        if (promptResult.success) {
            alert('Image generation will be implemented in a future update.\n\nCurrent prompt:\n' + promptResult.prompt);
        } else {
            alert('Please complete required parameters before generating an image');
        }
    });

    // Reload the page when the button is clicked
    reloadBtn.addEventListener('click', function() {
        location.reload();
    });

    // Helper function to navigate to a section
    function navigateToSection(sectionId) {
        // Update active navigation item
        document.querySelectorAll('#feature-nav li').forEach(item => {
            if (item.getAttribute('data-section') === sectionId) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
        
        // Show the corresponding panel
        document.querySelectorAll('.feature-panel').forEach(panel => {
            panel.classList.remove('active');
        });
        document.getElementById(sectionId).classList.add('active');
        
        // Update current feature section variable
        currentFeatureSection = sectionId;
    }

    // Update character summary
    function updateSummary() {
        const summary = characterSystem.getSummary();
        characterSummary.innerHTML = summary.replace(/\n/g, '<br>');
    }

    // Update prompt text
    function updatePrompt() {
        const promptResult = characterSystem.generatePrompt();
        
        if (promptResult.success) {
            promptText.textContent = promptResult.prompt;
            
            // Show compatibility warnings if any
            if (promptResult.warnings && promptResult.warnings.length > 0) {
                compatibilityWarnings.innerHTML = '';
                promptResult.warnings.forEach(warning => {
                    const warningEl = document.createElement('p');
                    warningEl.textContent = warning;
                    compatibilityWarnings.appendChild(warningEl);
                });
                compatibilityWarnings.classList.add('active');
            } else {
                compatibilityWarnings.classList.remove('active');
            }
        } else {
            promptText.textContent = 'Please complete required parameters';
            compatibilityWarnings.classList.remove('active');
        }
    }

    // Filter wardrobe items based on gender
    genderSelect.addEventListener('change', function() {
        const gender = this.value;
        const wardrobeOptions = wardrobeItem.querySelectorAll('option');
        
        wardrobeOptions.forEach(option => {
            if (option.value === '') return; // Skip placeholder
            
            if (gender === 'male') {
                option.style.display = option.classList.contains('male-item') || option.classList.contains('all-gender') ? '' : 'none';
            } else if (gender === 'female') {
                option.style.display = option.classList.contains('female-item') || option.classList.contains('all-gender') ? '' : 'none';
            } else {
                option.style.display = '';
            }
        });
    });

    // Fix for CSS :has() compatibility issues
    // Add class-based approach to show description containers with content
    function updateDescriptionContainers() {
        const descContainers = document.querySelectorAll('.description-container');
        
        descContainers.forEach(container => {
            if (container.querySelector('.description-content')) {
                container.classList.add('has-content');
            } else {
                container.classList.remove('has-content');
            }
        });
    }

    // Override showInlineDescription to update container classes
    const originalShowInlineDescription = window.showInlineDescription;
    if (typeof originalShowInlineDescription === 'function') {
        window.showInlineDescription = function(...args) {
            originalShowInlineDescription.apply(this, args);
            updateDescriptionContainers();
        };
    }

    // Initialize the UI
    updateSummary();
    updatePrompt();
});
