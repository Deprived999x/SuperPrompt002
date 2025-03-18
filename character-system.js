/**
 * Character Description System - Browser Implementation
 * 
 */

class CharacterDescriptionSystem {
    constructor() {
        this.globalParams = {
            gender: null,
            age: null,
            build: null,
            render_style: {
                base: "photorealistic",
                quality: ["8k", "high resolution", "detailed"]
            },
            shot_type: "medium shot",
            lighting: "soft natural lighting",
            background: "simple background"
        };
        
        this.featureSelections = {};
        this.intensitySelections = {}; // ADDED
        this.validIntensityLevels = ["subtle", "moderate", "strong", "extreme"];
        this.featureOrder = [
            "Face_Shape", "Eyes", "Nose", "Lips", "Eyebrows",
            "Cheekbones", "Jaw_Line", "Ears", "Head_Shape"
        ];
        this.compatibilityMatrix = {
            // ...existing code...
        };
    }
    
    /**
     * Generates a complete T2I prompt based on current selections
     * IMPROVED: Better organization, grammar, and avoids redundancy
     * @returns {Object} - Generated prompt result
     */
    generatePrompt(featureSelections) {
        console.log("generatePrompt", featureSelections, this.featureSelections);
        // Check if required globals are set
        if (!this.globalParams.gender || !this.globalParams.age || !this.globalParams.build) {
            return {
                success: false,
                error: "Missing required global parameters (gender, age, build)",
                prompt: ""
            };
        }
        
        // Start with render style
        let prompt = `${this.globalParams.render_style.base}`;
        
        // Add quality modifiers
        if (this.globalParams.render_style.quality.length > 0) {
            prompt += `, ${this.globalParams.render_style.quality.join(", ")}`;
        }
        
        // Add base descriptors with formatted build
        const buildDescription = this.formatBuild();
        prompt += ` of a ${this.globalParams.gender} ${this.globalParams.age} with ${buildDescription} build`;
        
        // Add hair if provided
        if (featureSelections.Hair) {
            const hair = this.formatHair(featureSelections.Hair);
            if (hair) {
                prompt += `, ${hair}`;
            }
        }
        
        // Add facial features in order
        const featureDescriptions = [];
        
        for (const feature of this.featureOrder) {
            if (featureSelections[feature]) {
                const intensity = this.intensitySelections[feature] || "moderate"; // ADDED
                const formattedFeature = this.formatFeature(feature, featureSelections[feature], intensity); // MODIFIED
                if (formattedFeature) {
                    featureDescriptions.push(formattedFeature);
                }
            }
        }
        
        // Join features with commas
        if (featureDescriptions.length > 0) {
            prompt += `, ${featureDescriptions.join(", ")}`;
        }
        
        // Add wardrobe if provided
        if (featureSelections.Wardrobe) {
            const wardrobe = this.formatWardrobe(featureSelections.Wardrobe);
            if (wardrobe) {
                prompt += `, wearing ${wardrobe}`;
            }
        }
        
        // Add shot type, lighting and background
        prompt += `, ${this.globalParams.shot_type}, ${this.globalParams.lighting}, ${this.globalParams.background}`;
        
        // Check feature compatibility (warnings only)
        const compatibilityResult = this.checkCompatibility();
        
        return {
            success: true,
            prompt: prompt.trim(),
            warnings: compatibilityResult.compatible ? [] : compatibilityResult.warnings
        };
    }

    /**
     * Sets a feature selection with intensity
     * @param {string} feature - Feature name
     * @param {Object} selection - Feature selection
     * @param {string} intensity - Intensity level (default: "moderate")
     * @returns {Object} - Validation result
     */
    setFeature(feature, selection, intensity = "moderate") {
        // Validate feature selection
        const validationResult = this.validateFeature(feature, selection);
        
        // Validate intensity level if provided
        if (intensity && !this.validIntensityLevels.includes(intensity)) {
            validationResult.valid = false;
            if (!validationResult.errors) validationResult.errors = [];
            validationResult.errors.push(`Invalid intensity level: ${intensity}`);
        }
        
        if (validationResult.valid) {
            // Set feature selection
            this.featureSelections[feature] = selection;
            console.log("setFeature", feature, selection, this.featureSelections);
            
            // Set intensity selection
            this.intensitySelections[feature] = intensity; // ADDED
        }
        
        return validationResult;
    }

    /**
     * Sets the intensity level for a specific feature
     * @param {string} feature - Feature name
     * @param {string} intensity - Intensity level
     */
    setIntensity(feature, intensity) { // ADDED
        if (this.validIntensityLevels.includes(intensity)) {
            this.intensitySelections[feature] = intensity;
        } else {
            console.warn(`Invalid intensity level: ${intensity}`);
        }
    }
}