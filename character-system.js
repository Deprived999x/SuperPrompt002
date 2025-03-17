/**
 * Character Description System - Browser Implementation
 * 
 * This is a simplified version of the character description system
 * adapted for direct use in the browser without requiring Node.js modules.
 */

class CharacterDescriptionSystem {
    constructor() {
        // Feature construction order
        this.featureOrder = [
            "Face_Shape",
            "Eyes",
            "Nose", 
            "Lips",
            "Eyebrows",
            "Cheekbones",
            "Jaw_Line",
            "Ears",
            "Head_Shape"
        ];
        
        // Current selections
        this.globalParams = {
            gender: null,
            age: null,
            build: null,
            render_style: {
                base: "photorealistic",
                quality: ["highly detailed", "masterpiece"]
            },
            lighting: "professional studio lighting with soft key light",
            background: "neutral gray seamless",
            shot_type: "head shot, shoulders up, front view"
        };
        
        this.featureSelections = {};
        
        // Add intensity selections for tiered descriptors
        this.intensitySelections = {};
        this.validIntensityLevels = ["subtle", "moderate", "pronounced", "extreme"];
        
        // Initialize intensity descriptors
        this.initializeIntensityDescriptors();
        
        // Valid options for validation - EXPANDED WITH NEW PARAMETERS
        this.validOptions = {
            Face_Shape: {
                shape: ["oval", "round", "square", "rectangular", "heart", "diamond", "triangle", "inverted_triangle", "long", "baseball"]
            },
            
            Eyes: {
                shape: ["almond", "round", "hooded", "monolid", "cat_eyes", "slanted", "wide-set", "close-set"],
                modifier: ["upturned", "downturned"],
                color: ["blue", "green", "brown", "hazel", "gray", "amber"]
            },
            
            Nose: {
                shape: ["straight", "curved", "aquiline", "flat", "nubian", "roman", "button", "wide", "pointed", "snub"],
                width: ["wide", "narrow"]
            },
            
            Lips: {
                shape: ["full", "thin", "wide", "small", "heart-shaped", "neutral", "pouty"],
                fullness: ["upper_prominent", "lower_prominent", "balanced"],
                modifier: ["downturned", "upturned", "wide_and_thin"]
            },
            
            Eyebrows: {
                shape: ["arched", "straight", "softly_arched", "round", "flat", "s-shaped", "angled", "textured"],
                thickness: ["thin", "medium", "thick", "full"],
                density: ["sparse", "medium", "full"],
                position: ["high", "medium", "low"]
            },
            
            Cheekbones: {
                shape: ["high", "low", "wide", "narrow", "flat", "angular", "rounded", "asymmetrical", "defined", "soft"]
            },
            
            Jaw_Line: {
                shape: ["square", "oval", "round", "heart", "mandibular", "pointed", "receding", "wide", "defined", "soft"]
            },
            
            Ears: {
                shape: ["standard", "pointed", "round", "protruding", "flat", "lobed", "cupped", "rimmed", "asymmetrical", "curved"]
            },
            
            Head_Shape: {
                shape: ["oval", "round", "square", "rectangular", "heart", "diamond", "triangle", "inverted_triangle", "long", "baseball"]
            },
            
            // Additional features
            Hair: {
                length: ["short", "medium", "long"],
                texture: ["straight", "wavy", "curly", "coily"],
                color: ["black", "brown", "blonde", "red", "gray", "white"],
                style: ["with bangs", "with side part", "with center part", "slicked back", "with layers"]
            },
            
            Wardrobe: {
                item: ["suit_jacket", "dress_shirt", "crew_neck", "v_neck", "blouse", "scoop_neck", "collared_shirt"],
                fit: ["slim", "regular", "loose", "fitted"],
                fabric: ["cotton", "wool", "silk", "linen"],
                color: ["black", "white", "navy", "gray"]
            }
        };
        
        // Valid global parameters - UPDATED WITH GENDER-SPECIFIC BUILDS
        this.validGlobals = {
            gender: ["male", "female", "androgynous"],
            age: ["child", "teen", "young adult", "adult", "senior"],
            // Combined build options for validation purposes
            build: ["athletic", "lean", "muscular", "stocky", "tall_and_slim", "v-shaped", "rectangle", 
                    "hourglass", "heavyset", "endomorph", "pear", "apple", "inverted_triangle", "curvy", 
                    "slender", "plus_size"],
            // Gender-specific build categorization
            gender_specific_builds: {
                male: ["athletic", "lean", "muscular", "stocky", "tall_and_slim", "v-shaped", "rectangle", "hourglass", "heavyset", "endomorph"],
                female: ["hourglass", "pear", "apple", "rectangle", "inverted_triangle", "athletic", "curvy", "slender", "plus_size", "stocky"]
            }
        };
    }
    
    /**
     * Initializes the intensity descriptor library
     * This contains graduated descriptors for features at different intensity levels
     */
    initializeIntensityDescriptors() {
        this.intensityDescriptors = {
            // Lips descriptors
            Lips: {
                shape: {
                    full: {
                        subtle: "slightly full",
                        moderate: "full",
                        pronounced: "very full",
                        extreme: "full"
                    },
                    thin: {
                        subtle: "slightly thin",
                        moderate: "thin",
                        pronounced: "very thin",
                        extreme: "thin"
                    },
                    wide: {
                        subtle: "somewhat wide",
                        moderate: "wide",
                        pronounced: "very wide",
                        extreme: "wide"
                    },
                    small: {
                        subtle: "somewhat small",
                        moderate: "small",
                        pronounced: "very small",
                        extreme: "small"
                    },
                    "heart-shaped": {
                        subtle: "slightly heart-shaped",
                        moderate: "heart-shaped",
                        pronounced: "distinctly heart-shaped",
                        extreme: "heart-shaped"
                    },
                    neutral: {
                        subtle: "somewhat neutral",
                        moderate: "neutral",
                        pronounced: "distinctly neutral",
                        extreme: "neutral"
                    },
                    pouty: {
                        subtle: "slightly pouty",
                        moderate: "pouty",
                        pronounced: "very pouty",
                        extreme: "pouty"
                    }
                },
                fullness: {
                    upper_prominent: {
                        subtle: "with slightly more prominent upper lip",
                        moderate: "with more prominent upper lip",
                        pronounced: "with prominently defined upper lip",
                        extreme: "with prominent upper lip"
                    },
                    lower_prominent: {
                        subtle: "with slightly more prominent lower lip",
                        moderate: "with more prominent lower lip",
                        pronounced: "with prominently defined lower lip",
                        extreme: "with prominent lower lip"
                    },
                    balanced: {
                        subtle: "with somewhat balanced fullness",
                        moderate: "with balanced fullness",
                        pronounced: "with perfectly balanced fullness",
                        extreme: "with balanced fullness"
                    }
                },
                modifier: {
                    downturned: {
                        subtle: "slightly downturned",
                        moderate: "downturned",
                        pronounced: "noticeably downturned",
                        extreme: "downturned"
                    },
                    upturned: {
                        subtle: "slightly upturned",
                        moderate: "upturned",
                        pronounced: "noticeably upturned",
                        extreme: "upturned"
                    },
                    wide_and_thin: {
                        subtle: "somewhat wide and thin",
                        moderate: "wide and thin",
                        pronounced: "distinctly wide and thin",
                        extreme: "wide and thin"
                    }
                }
            },
            
            // Nose descriptors
            Nose: {
                shape: {
                    straight: {
                        subtle: "slightly straight",
                        moderate: "straight",
                        pronounced: "very straight",
                        extreme: "straight"
                    },
                    curved: {
                        subtle: "slightly curved",
                        moderate: "curved",
                        pronounced: "distinctly curved",
                        extreme: "curved"
                    },
                    aquiline: {
                        subtle: "somewhat aquiline",
                        moderate: "aquiline",
                        pronounced: "distinctly aquiline",
                        extreme: "aquiline"
                    },
                    flat: {
                        subtle: "somewhat flat",
                        moderate: "flat",
                        pronounced: "very flat",
                        extreme: "flat"
                    },
                    nubian: {
                        subtle: "somewhat nubian",
                        moderate: "nubian",
                        pronounced: "distinctly nubian",
                        extreme: "nubian"
                    },
                    roman: {
                        subtle: "slightly roman",
                        moderate: "roman",
                        pronounced: "distinctly roman",
                        extreme: "roman"
                    },
                    button: {
                        subtle: "somewhat button",
                        moderate: "button",
                        pronounced: "distinct button",
                        extreme: "button"
                    },
                    wide: {
                        subtle: "somewhat wide",
                        moderate: "wide",
                        pronounced: "very wide",
                        extreme: "wide"
                    },
                    pointed: {
                        subtle: "slightly pointed",
                        moderate: "pointed",
                        pronounced: "very pointed",
                        extreme: "pointed"
                    },
                    snub: {
                        subtle: "slightly snub",
                        moderate: "snub",
                        pronounced: "distinctly snub",
                        extreme: "snub"
                    }
                },
                width: {
                    wide: {
                        subtle: "somewhat wide",
                        moderate: "wide",
                        pronounced: "very wide",
                        extreme: "wide"
                    },
                    narrow: {
                        subtle: "somewhat narrow",
                        moderate: "narrow",
                        pronounced: "very narrow",
                        extreme: "narrow"
                    }
                }
            },
            
            // Ears descriptors
            Ears: {
                shape: {
                    standard: {
                        subtle: "fairly standard",
                        moderate: "standard",
                        pronounced: "distinctly standard",
                        extreme: "standard"
                    },
                    pointed: {
                        subtle: "slightly pointed",
                        moderate: "pointed",
                        pronounced: "very pointed",
                        extreme: "pointed"
                    },
                    round: {
                        subtle: "somewhat round",
                        moderate: "round",
                        pronounced: "very round",
                        extreme: "round"
                    },
                    protruding: {
                        subtle: "slightly protruding",
                        moderate: "protruding",
                        pronounced: "notably protruding",
                        extreme: "protruding"
                    },
                    flat: {
                        subtle: "somewhat flat",
                        moderate: "flat",
                        pronounced: "very flat",
                        extreme: "flat"
                    },
                    lobed: {
                        subtle: "slightly lobed",
                        moderate: "lobed",
                        pronounced: "distinctly lobed",
                        extreme: "lobed"
                    },
                    cupped: {
                        subtle: "slightly cupped",
                        moderate: "cupped",
                        pronounced: "distinctly cupped",
                        extreme: "cupped"
                    },
                    rimmed: {
                        subtle: "slightly rimmed",
                        moderate: "rimmed",
                        pronounced: "distinctly rimmed",
                        extreme: "rimmed"
                    },
                    asymmetrical: {
                        subtle: "slightly asymmetrical",
                        moderate: "asymmetrical",
                        pronounced: "noticeably asymmetrical",
                        extreme: "asymmetrical"
                    },
                    curved: {
                        subtle: "slightly curved",
                        moderate: "curved",
                        pronounced: "distinctly curved",
                        extreme: "curved"
                    }
                }
            },
            
            // Face Shape descriptors
            Face_Shape: {
                shape: {
                    oval: {
                        subtle: "slightly oval",
                        moderate: "oval",
                        pronounced: "distinctly oval",
                        extreme: "oval"
                    },
                    round: {
                        subtle: "somewhat round",
                        moderate: "round",
                        pronounced: "very round",
                        extreme: "round"
                    },
                    square: {
                        subtle: "somewhat square",
                        moderate: "square",
                        pronounced: "very square",
                        extreme: "square"
                    },
                    rectangular: {
                        subtle: "somewhat rectangular",
                        moderate: "rectangular",
                        pronounced: "distinctly rectangular",
                        extreme: "rectangular"
                    },
                    heart: {
                        subtle: "slightly heart-shaped",
                        moderate: "heart-shaped",
                        pronounced: "distinctly heart-shaped",
                        extreme: "heart-shaped"
                    },
                    diamond: {
                        subtle: "somewhat diamond-shaped",
                        moderate: "diamond-shaped",
                        pronounced: "distinctly diamond-shaped",
                        extreme: "diamond-shaped"
                    },
                    triangle: {
                        subtle: "somewhat triangular",
                        moderate: "triangular",
                        pronounced: "distinctly triangular",
                        extreme: "triangular"
                    },
                    inverted_triangle: {
                        subtle: "slightly inverted triangular",
                        moderate: "inverted triangular",
                        pronounced: "distinctly inverted triangular",
                        extreme: "inverted triangular"
                    },
                    long: {
                        subtle: "somewhat long",
                        moderate: "long",
                        pronounced: "very long",
                        extreme: "elongated"
                    },
                    baseball: {
                        subtle: "somewhat baseball-shaped",
                        moderate: "baseball-shaped",
                        pronounced: "distinctly baseball-shaped",
                        extreme: "baseball-shaped"
                    }
                }
            },
            
            // Eyes descriptors
            Eyes: {
                shape: {
                    almond: {
                        subtle: "slightly almond-shaped",
                        moderate: "almond-shaped",
                        pronounced: "distinctly almond-shaped",
                        extreme: "almond-shaped"
                    },
                    round: {
                        subtle: "somewhat round",
                        moderate: "round",
                        pronounced: "very round",
                        extreme: "round"
                    },
                    hooded: {
                        subtle: "slightly hooded",
                        moderate: "hooded",
                        pronounced: "distinctly hooded",
                        extreme: "hooded"
                    },
                    monolid: {
                        subtle: "subtle monolid",
                        moderate: "monolid",
                        pronounced: "distinct monolid",
                        extreme: "monolid"
                    },
                    cat_eyes: {
                        subtle: "slightly cat-like",
                        moderate: "cat-like",
                        pronounced: "distinctly cat-like",
                        extreme: "cat-like"
                    },
                    slanted: {
                        subtle: "slightly slanted",
                        moderate: "slanted",
                        pronounced: "distinctly slanted",
                        extreme: "slanted"
                    },
                    "wide-set": {
                        subtle: "slightly wide-set",
                        moderate: "wide-set",
                        pronounced: "distinctly wide-set",
                        extreme: "wide-set"
                    },
                    "close-set": {
                        subtle: "slightly close-set",
                        moderate: "close-set",
                        pronounced: "distinctly close-set",
                        extreme: "close-set"
                    }
                },
                modifier: {
                    upturned: {
                        subtle: "slightly upturned",
                        moderate: "upturned",
                        pronounced: "distinctly upturned",
                        extreme: "upturned"
                    },
                    downturned: {
                        subtle: "slightly downturned",
                        moderate: "downturned",
                        pronounced: "distinctly downturned",
                        extreme: "downturned"
                    }
                }
            },
            
            // Eyebrows descriptors
            Eyebrows: {
                shape: {
                    arched: {
                        subtle: "slightly arched",
                        moderate: "arched",
                        pronounced: "distinctly arched",
                        extreme: "arched"
                    },
                    straight: {
                        subtle: "somewhat straight",
                        moderate: "straight",
                        pronounced: "very straight",
                        extreme: "straight"
                    },
                    softly_arched: {
                        subtle: "slightly soft-arched",
                        moderate: "softly arched",
                        pronounced: "gracefully arched",
                        extreme: "softly arched"
                    },
                    round: {
                        subtle: "slightly rounded",
                        moderate: "rounded",
                        pronounced: "distinctly rounded",
                        extreme: "rounded"
                    },
                    flat: {
                        subtle: "somewhat flat",
                        moderate: "flat",
                        pronounced: "very flat",
                        extreme: "flat"
                    },
                    "s-shaped": {
                        subtle: "slightly s-shaped",
                        moderate: "s-shaped",
                        pronounced: "distinctly s-shaped",
                        extreme: "s-shaped"
                    },
                    angled: {
                        subtle: "slightly angled",
                        moderate: "angled",
                        pronounced: "sharply angled",
                        extreme: "angled"
                    },
                    textured: {
                        subtle: "slightly textured",
                        moderate: "textured",
                        pronounced: "distinctly textured",
                        extreme: "textured"
                    }
                },
                thickness: {
                    thin: {
                        subtle: "somewhat thin",
                        moderate: "thin",
                        pronounced: "very thin",
                        extreme: "thin"
                    },
                    medium: {
                        subtle: "slightly medium",
                        moderate: "medium",
                        pronounced: "definitively medium",
                        extreme: "medium"
                    },
                    thick: {
                        subtle: "somewhat thick",
                        moderate: "thick",
                        pronounced: "very thick",
                        extreme: "thick"
                    },
                    full: {
                        subtle: "somewhat full",
                        moderate: "full",
                        pronounced: "very full",
                        extreme: "full"
                    }
                }
            },
            
            // Cheekbones descriptors
            Cheekbones: {
                shape: {
                    high: {
                        subtle: "somewhat high",
                        moderate: "high",
                        pronounced: "very high",
                        extreme: "high"
                    },
                    low: {
                        subtle: "somewhat low",
                        moderate: "low",
                        pronounced: "very low",
                        extreme: "low"
                    },
                    wide: {
                        subtle: "somewhat wide",
                        moderate: "wide",
                        pronounced: "very wide",
                        extreme: "wide"
                    },
                    narrow: {
                        subtle: "somewhat narrow",
                        moderate: "narrow",
                        pronounced: "very narrow",
                        extreme: "narrow"
                    },
                    flat: {
                        subtle: "somewhat flat",
                        moderate: "flat",
                        pronounced: "very flat",
                        extreme: "flat"
                    },
                    angular: {
                        subtle: "somewhat angular",
                        moderate: "angular",
                        pronounced: "very angular",
                        extreme: "angular"
                    },
                    rounded: {
                        subtle: "somewhat rounded",
                        moderate: "rounded",
                        pronounced: "very rounded",
                        extreme: "rounded"
                    },
                    asymmetrical: {
                        subtle: "slightly asymmetrical",
                        moderate: "asymmetrical",
                        pronounced: "distinctly asymmetrical",
                        extreme: "asymmetrical"
                    },
                    defined: {
                        subtle: "somewhat defined",
                        moderate: "defined",
                        pronounced: "well-defined",
                        extreme: "defined"
                    },
                    soft: {
                        subtle: "somewhat soft",
                        moderate: "soft",
                        pronounced: "very soft",
                        extreme: "soft"
                    }
                }
            },
            
            // Jaw Line descriptors
            Jaw_Line: {
                shape: {
                    square: {
                        subtle: "somewhat square",
                        moderate: "square",
                        pronounced: "very square",
                        extreme: "square"
                    },
                    oval: {
                        subtle: "somewhat oval",
                        moderate: "oval",
                        pronounced: "distinctly oval",
                        extreme: "oval"
                    },
                    round: {
                        subtle: "somewhat round",
                        moderate: "round",
                        pronounced: "very round",
                        extreme: "round"
                    },
                    heart: {
                        subtle: "somewhat heart-shaped",
                        moderate: "heart-shaped",
                        pronounced: "distinctly heart-shaped",
                        extreme: "heart-shaped"
                    },
                    mandibular: {
                        subtle: "somewhat mandibular",
                        moderate: "mandibular",
                        pronounced: "distinctly mandibular",
                        extreme: "mandibular"
                    },
                    pointed: {
                        subtle: "somewhat pointed",
                        moderate: "pointed",
                        pronounced: "very pointed",
                        extreme: "pointed"
                    },
                    receding: {
                        subtle: "slightly receding",
                        moderate: "receding",
                        pronounced: "distinctly receding",
                        extreme: "receding"
                    },
                    wide: {
                        subtle: "somewhat wide",
                        moderate: "wide",
                        pronounced: "very wide",
                        extreme: "wide"
                    },
                    defined: {
                        subtle: "somewhat defined",
                        moderate: "defined",
                        pronounced: "well-defined",
                        extreme: "defined"
                    },
                    soft: {
                        subtle: "somewhat soft",
                        moderate: "soft",
                        pronounced: "very soft",
                        extreme: "soft"
                    }
                }
            },
            
            // Head Shape descriptors
            Head_Shape: {
                shape: {
                    oval: {
                        subtle: "somewhat oval",
                        moderate: "oval",
                        pronounced: "distinctly oval",
                        extreme: "oval"
                    },
                    round: {
                        subtle: "somewhat round",
                        moderate: "round",
                        pronounced: "very round",
                        extreme: "round"
                    },
                    square: {
                        subtle: "somewhat square",
                        moderate: "square",
                        pronounced: "very square",
                        extreme: "square"
                    },
                    rectangular: {
                        subtle: "somewhat rectangular",
                        moderate: "rectangular",
                        pronounced: "distinctly rectangular",
                        extreme: "rectangular"
                    },
                    heart: {
                        subtle: "somewhat heart-shaped",
                        moderate: "heart-shaped",
                        pronounced: "distinctly heart-shaped",
                        extreme: "heart-shaped"
                    },
                    diamond: {
                        subtle: "somewhat diamond-shaped",
                        moderate: "diamond-shaped",
                        pronounced: "distinctly diamond-shaped",
                        extreme: "diamond-shaped"
                    },
                    triangle: {
                        subtle: "somewhat triangular",
                        moderate: "triangular",
                        pronounced: "distinctly triangular",
                        extreme: "triangular"
                    },
                    inverted_triangle: {
                        subtle: "somewhat inverted triangular",
                        moderate: "inverted triangular",
                        pronounced: "distinctly inverted triangular",
                        extreme: "inverted triangular"
                    },
                    long: {
                        subtle: "somewhat long",
                        moderate: "long",
                        pronounced: "very long",
                        extreme: "elongated"
                    },
                    baseball: {
                        subtle: "somewhat baseball-shaped",
                        moderate: "baseball-shaped",
                        pronounced: "distinctly baseball-shaped",
                        extreme: "baseball-shaped"
                    }
                }
            }
        };
    }
    
    /**
     * Sets global parameters
     * @param {Object} params - Global parameters
     * @returns {Object} - Validation result
     */
    setGlobalParams(params) {
        const errors = [];
        
        // Check required fields
        const required = ["gender", "age", "build"];
        for (const field of required) {
            if (!params[field]) {
                errors.push(`Missing required global parameter: ${field}`);
            } else if (field === "build") {
                // Check if build is valid for the selected gender
                const gender = params["gender"].toLowerCase();
                const build = params["build"].toLowerCase();
                
                // For androgynous, allow builds from both male and female options
                if (gender === "androgynous") {
                    const allValidBuilds = [...this.validGlobals.gender_specific_builds.male, 
                                           ...this.validGlobals.gender_specific_builds.female];
                    if (!allValidBuilds.includes(build)) {
                        errors.push(`Invalid build: ${build}`);
                    }
                } else if (gender === "male" && !this.validGlobals.gender_specific_builds.male.includes(build)) {
                    errors.push(`Invalid build '${build}' for male gender`);
                } else if (gender === "female" && !this.validGlobals.gender_specific_builds.female.includes(build)) {
                    errors.push(`Invalid build '${build}' for female gender`);
                }
            } else if (this.validGlobals[field] && !this.validGlobals[field].includes(params[field].toLowerCase())) {
                errors.push(`Invalid ${field}: ${params[field]}`);
            }
        }
        
        const validationResult = {
            valid: errors.length === 0,
            errors: errors
        };
        
        if (validationResult.valid) {
            // Update global params
            for (const key in params) {
                if (this.globalParams.hasOwnProperty(key)) {
                    this.globalParams[key] = params[key];
                }
            }
        }
        
        return validationResult;
    }
    
    /**
     * Validates a feature selection
     * @param {string} feature - Feature name
     * @param {Object} selection - Feature selection
     * @returns {Object} - Validation result
     */
    validateFeature(feature, selection) {
        if (!this.validOptions[feature]) {
            return {
                valid: false,
                errors: [`Unknown feature: ${feature}`]
            };
        }
        
        const errors = [];
        
        // Check each property in the selection
        for (const prop in selection) {
            if (!this.validOptions[feature][prop]) {
                errors.push(`Unknown property '${prop}' for feature '${feature}'`);
            } else if (!this.validOptions[feature][prop].includes(selection[prop])) {
                errors.push(`Invalid ${prop} '${selection[prop]}' for feature '${feature}'`);
            }
        }
        
        return {
            valid: errors.length === 0,
            errors: errors
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
            
            // Set intensity selection
            this.intensitySelections[feature] = intensity;
        }
        
        return validationResult;
    }
    
    /**
     * Gets the intensity for a specific feature
     * @param {string} feature - Feature name
     * @returns {string} - Intensity level or default "moderate"
     */
    getIntensity(feature) {
        return this.intensitySelections[feature] || "moderate";
    }
    
    /**
     * Set intensity for a specific feature
     * @param {string} feature - Feature name
     * @param {string} intensity - Intensity level
     * @returns {boolean} - Success indicator
     */
    setIntensity(feature, intensity) {
        if (!this.featureSelections[feature]) {
            return false;
        }
        
        if (!this.validIntensityLevels.includes(intensity)) {
            return false;
        }
        
        this.intensitySelections[feature] = intensity;
        return true;
    }
    
    /**
     * Sets multiple features at once
     * @param {Object} features - Feature selections
     * @returns {Object} - Validation result
     */
    setFeatures(features) {
        const errors = [];
        
        for (const feature in features) {
            const result = this.validateFeature(feature, features[feature]);
            if (!result.valid) {
                errors.push(...result.errors);
            }
        }
        
        const validationResult = {
            valid: errors.length === 0,
            errors: errors
        };
        
        if (validationResult.valid) {
            // Update selections
            for (const feature in features) {
                this.featureSelections[feature] = features[feature];
            }
        }
        
        return validationResult;
    }
    
    /**
     * Clears a specific feature selection and its intensity
     * @param {string} feature - Feature name
     */
    clearFeature(feature) {
        if (this.featureSelections[feature]) {
            delete this.featureSelections[feature];
        }
        
        if (this.intensitySelections[feature]) {
            delete this.intensitySelections[feature];
        }
    }
    
    /**
     * Clears all feature selections and intensities
     */
    clearAllFeatures() {
        this.featureSelections = {};
        this.intensitySelections = {};
    }
    
    /**
     * Checks compatibility of all features
     * @returns {Object} - Compatibility result
     */
    checkCompatibility() {
        const warnings = [];
        
        // Face shape and head shape compatibility
        if (this.featureSelections.Face_Shape && this.featureSelections.Head_Shape) {
            const incompatible = {
                "round": ["rectangular", "oblong", "triangle", "inverted_triangle"],
                "square": ["oval", "egg_shaped", "round", "baseball"],
                "triangle": ["inverted_triangle", "diamond"],
                "inverted_triangle": ["triangle", "diamond"]
            };
            
            if (incompatible[this.featureSelections.Face_Shape.shape] && 
                incompatible[this.featureSelections.Face_Shape.shape].includes(this.featureSelections.Head_Shape.shape)) {
                warnings.push(`Potentially incompatible face shape (${this.featureSelections.Face_Shape.shape}) and head shape (${this.featureSelections.Head_Shape.shape})`);
            }
        }
        
        // Check wardrobe compatibility with gender
        if (this.featureSelections.Wardrobe && this.featureSelections.Wardrobe.item) {
            const maleOnly = ["suit_jacket"];
            const femaleOnly = ["blouse", "scoop_neck"];
            
            if (this.globalParams.gender === "male" && femaleOnly.includes(this.featureSelections.Wardrobe.item)) {
                warnings.push(`Item '${this.featureSelections.Wardrobe.item}' is typically associated with female wardrobe`);
            } else if (this.globalParams.gender === "female" && maleOnly.includes(this.featureSelections.Wardrobe.item)) {
                warnings.push(`Item '${this.featureSelections.Wardrobe.item}' is typically associated with male wardrobe`);
            }
        }
        
        // Check lips shape and modifier compatibility
        if (this.featureSelections.Lips) {
            if (this.featureSelections.Lips.shape === "wide" && 
                this.featureSelections.Lips.modifier === "wide_and_thin") {
                warnings.push("Redundant specification: 'wide' shape with 'wide and thin' modifier");
            }
            
            if (this.featureSelections.Lips.shape === "thin" && 
                this.featureSelections.Lips.modifier === "wide_and_thin") {
                warnings.push("Redundant specification: 'thin' shape with 'wide and thin' modifier");
            }
        }
        
        // Check build and facial feature compatibility
        if (this.globalParams.build) {
            const build = this.globalParams.build.toLowerCase();
            
            // Check cheekbones compatibility with build
            if (this.featureSelections.Cheekbones && this.featureSelections.Cheekbones.shape) {
                const cheekbones = this.featureSelections.Cheekbones.shape;
                
                if ((build === "heavyset" || build === "plus_size" || build === "endomorph") && 
                    (cheekbones === "high" || cheekbones === "angular" || cheekbones === "defined")) {
                    warnings.push(`The selected cheekbones (${cheekbones}) may be less visible with the selected build (${build})`);
                }
            }
            
            // Check jawline compatibility with build
            if (this.featureSelections.Jaw_Line && this.featureSelections.Jaw_Line.shape) {
                const jawline = this.featureSelections.Jaw_Line.shape;
                
                if ((build === "heavyset" || build === "plus_size" || build === "endomorph") && 
                    (jawline === "defined" || jawline === "angular" || jawline === "sharp")) {
                    warnings.push(`The selected jawline (${jawline}) may be less visible with the selected build (${build})`);
                }
            }
        }
        
        return {
            compatible: warnings.length === 0,
            warnings: warnings
        };
    }
    
    /**
     * Formats a feature selection into natural language with intensity-based descriptors
     * IMPROVED: Better handling of descriptors to avoid redundancy and improve readability
     * @param {string} feature - The feature name
     * @param {Object} selection - The selected options for the feature
     * @returns {string} - Formatted feature description
     */
    formatFeature(feature, selection) {
        if (!selection || Object.keys(selection).length === 0) {
            return "";
        }
        
        // Get the intensity level for this feature (defaults to "moderate")
        const intensity = this.getIntensity(feature);
        let formatted = "";
        
        // Check if we have intensity descriptors for this feature
        const hasIntensityDescriptors = this.intensityDescriptors && 
                                       this.intensityDescriptors[feature];
        
        switch (feature) {
            case "Face_Shape":
                if (hasIntensityDescriptors && 
                    this.intensityDescriptors[feature]?.shape?.[selection.shape]?.[intensity]) {
                    formatted = `${this.intensityDescriptors[feature].shape[selection.shape][intensity]} face`;
                } else {
                    formatted = `${selection.shape || ""} face`;
                }
                break;
            
            case "Eyes":
                let eyeShape = selection.shape || "";
                let eyeColor = selection.color || "";
                
                // Apply intensity descriptors to eye shape if available
                if (hasIntensityDescriptors && 
                    this.intensityDescriptors[feature]?.shape?.[selection.shape]?.[intensity]) {
                    eyeShape = this.intensityDescriptors[feature].shape[selection.shape][intensity];
                }
                
                // Structure the eye description
                if (eyeShape && eyeColor) {
                    formatted = `${eyeShape} ${eyeColor} eyes`;
                } else if (eyeShape) {
                    formatted = `${eyeShape} eyes`;
                } else if (eyeColor) {
                    formatted = `${eyeColor} eyes`;
                }
                
                // Add modifier if present, but only if not redundant
                if (selection.modifier) {
                    if (hasIntensityDescriptors && 
                        this.intensityDescriptors[feature]?.modifier?.[selection.modifier]?.[intensity]) {
                        formatted += formatted ? `, ${this.intensityDescriptors[feature].modifier[selection.modifier][intensity]}` : 
                            `${this.intensityDescriptors[feature].modifier[selection.modifier][intensity]} eyes`;
                    } else {
                        formatted += formatted ? `, ${selection.modifier}` : `${selection.modifier} eyes`;
                    }
                }
                break;
                
            case "Nose":
                let noseShape = selection.shape || "";
                let noseWidth = selection.width || "";
                
                // Apply intensity descriptors to nose shape if available
                if (hasIntensityDescriptors && 
                    this.intensityDescriptors[feature]?.shape?.[selection.shape]?.[intensity]) {
                    noseShape = this.intensityDescriptors[feature].shape[selection.shape][intensity];
                }
                
                // Structure the nose description
                formatted = noseShape ? `${noseShape} nose` : "nose";
                
                // Add width if present and not redundant with shape
                // (e.g., don't add "wide" width if shape is already "wide")
                if (noseWidth && noseShape !== noseWidth) {
                    if (hasIntensityDescriptors && 
                        this.intensityDescriptors[feature]?.width?.[noseWidth]?.[intensity]) {
                        formatted += `, ${this.intensityDescriptors[feature].width[noseWidth][intensity]}`;
                    } else {
                        formatted += `, ${noseWidth}`;
                    }
                }
                break;
                
            case "Lips":
                let lipShape = selection.shape || "";
                
                // Apply intensity descriptors to lip shape if available
                if (hasIntensityDescriptors && 
                    this.intensityDescriptors[feature]?.shape?.[selection.shape]?.[intensity]) {
                    lipShape = this.intensityDescriptors[feature].shape[selection.shape][intensity];
                }
                
                // Structure the lips description, avoiding redundancy
                formatted = lipShape ? `${lipShape} lips` : "lips";
                
                // Check for redundancy before adding fullness
                let canAddFullness = selection.fullness && 
                    !(selection.shape === "thin" && selection.fullness === "balanced");
                
                // Add fullness if present and not redundant
                if (canAddFullness) {
                    if (hasIntensityDescriptors && 
                        this.intensityDescriptors[feature]?.fullness?.[selection.fullness]?.[intensity]) {
                        formatted += ` ${this.intensityDescriptors[feature].fullness[selection.fullness][intensity]}`;
                    } else {
                        formatted += ` with ${selection.fullness.replace('_', ' ')}`;
                    }
                }
                
                // Check for redundancy before adding modifier
                let canAddModifier = selection.modifier && 
                    !(selection.shape === "wide" && selection.modifier === "wide_and_thin") &&
                    !(selection.shape === "thin" && selection.modifier === "wide_and_thin");
                
                // Add modifier if present and not redundant
                if (canAddModifier) {
                    if (hasIntensityDescriptors && 
                        this.intensityDescriptors[feature]?.modifier?.[selection.modifier]?.[intensity]) {
                        formatted += `, ${this.intensityDescriptors[feature].modifier[selection.modifier][intensity]}`;
                    } else {
                        formatted += `, ${selection.modifier.replace(/_/g, ' ')}`;
                    }
                }
                break;
                
            case "Eyebrows":
                let eyebrowShape = selection.shape || "";
                let eyebrowThickness = selection.thickness || "";
                
                // Apply intensity descriptors to eyebrow shape if available
                if (hasIntensityDescriptors && 
                    this.intensityDescriptors[feature]?.shape?.[selection.shape]?.[intensity]) {
                    eyebrowShape = this.intensityDescriptors[feature].shape[selection.shape][intensity];
                } else {
                    eyebrowShape = eyebrowShape.replace(/_/g, ' ');
                }
                
                // Apply intensity descriptors to thickness if available
                if (eyebrowThickness && hasIntensityDescriptors && 
                    this.intensityDescriptors[feature]?.thickness?.[eyebrowThickness]?.[intensity]) {
                    eyebrowThickness = this.intensityDescriptors[feature].thickness[eyebrowThickness][intensity];
                }
                
                // Structure the eyebrows description
                if (eyebrowShape && eyebrowThickness) {
                    formatted = `${eyebrowThickness} ${eyebrowShape} eyebrows`;
                } else if (eyebrowThickness) {
                    formatted = `${eyebrowThickness} eyebrows`;
                } else if (eyebrowShape) {
                    formatted = `${eyebrowShape} eyebrows`;
                } else {
                    formatted = "eyebrows";
                }
                break;
                
            case "Cheekbones":
                if (hasIntensityDescriptors && 
                    this.intensityDescriptors[feature]?.shape?.[selection.shape]?.[intensity]) {
                    formatted = `${this.intensityDescriptors[feature].shape[selection.shape][intensity]} cheekbones`;
                } else {
                    formatted = `${selection.shape || ""} cheekbones`;
                }
                break;
                
            case "Jaw_Line":
                if (hasIntensityDescriptors && 
                    this.intensityDescriptors[feature]?.shape?.[selection.shape]?.[intensity]) {
                    formatted = `${this.intensityDescriptors[feature].shape[selection.shape][intensity]} jawline`;
                } else {
                    formatted = `${selection.shape || ""} jawline`;
                }
                break;
                
            case "Ears":
                if (hasIntensityDescriptors && 
                    this.intensityDescriptors[feature]?.shape?.[selection.shape]?.[intensity]) {
                    formatted = `${this.intensityDescriptors[feature].shape[selection.shape][intensity]} ears`;
                } else {
                    formatted = `${selection.shape || ""} ears`;
                }
                break;
                
            case "Head_Shape":
                if (hasIntensityDescriptors && 
                    this.intensityDescriptors[feature]?.shape?.[selection.shape]?.[intensity]) {
                    formatted = `${this.intensityDescriptors[feature].shape[selection.shape][intensity]} head shape`;
                } else {
                    formatted = `${selection.shape || ""} head shape`;
                }
                break;
                
            default:
                formatted = "";
        }
        
        return formatted.trim();
    }
    
    /**
     * Formats hair description
     * IMPROVED: More natural language structure
     * @param {Object} hair - Hair selection
     * @returns {string} - Formatted hair description
     */
    formatHair(hair) {
        if (!hair || Object.keys(hair).length === 0) {
            return "";
        }
        
        const parts = [];
        
        // Order: length, texture, color, style
        if (hair.length && hair.texture && hair.color) {
            parts.push(`${hair.length}-length ${hair.texture} ${hair.color}`);
        } else {
            if (hair.length) parts.push(hair.length);
            if (hair.texture) parts.push(hair.texture);
            if (hair.color) parts.push(hair.color);
        }
        
        // Add hair style as a separate component for better readability
        if (hair.style) {
            parts.push(hair.style);
        }
        
        return parts.length > 0 ? `${parts.join(' ')} hair` : "";
    }
    
    /**
     * Formats wardrobe description
     * IMPROVED: More natural language structure
     * @param {Object} wardrobe - Wardrobe selection
     * @returns {string} - Formatted wardrobe description
     */
    formatWardrobe(wardrobe) {
        if (!wardrobe || Object.keys(wardrobe).length === 0) {
            return "";
        }
        
        const parts = [];
        
        // Order: color, fabric, fit, item
        if (wardrobe.color) parts.push(wardrobe.color);
        if (wardrobe.fabric) parts.push(wardrobe.fabric);
        if (wardrobe.fit) parts.push(wardrobe.fit);
        if (wardrobe.item) parts.push(wardrobe.item.replace(/_/g, ' '));
        
        return parts.join(' ');
    }
    
    /**
     * Formats build description based on gender and build type
     * @returns {string} - Formatted build description
     */
    formatBuild() {
        if (!this.globalParams.build || !this.globalParams.gender) {
            return "";
        }
        
        const build = this.globalParams.build.toLowerCase();
        const gender = this.globalParams.gender.toLowerCase();
        
        // Gender-specific build descriptions
        const buildDescriptions = {
            male: {
                "athletic": "athletic, well-toned",
                "muscular": "muscular, broad-shouldered",
                "lean": "lean, slender",
                "stocky": "stocky, solid",
                "tall_and_slim": "tall and slim",
                "v-shaped": "v-shaped, broad-shouldered",
                "rectangle": "rectangular",
                "hourglass": "hourglass-shaped",
                "heavyset": "heavyset, substantial",
                "endomorph": "full-bodied"
            },
            female: {
                "hourglass": "hourglass-figured",
                "pear": "pear-shaped",
                "apple": "apple-shaped",
                "rectangle": "rectangular",
                "inverted_triangle": "inverted triangle",
                "athletic": "athletic, toned",
                "curvy": "curvy",
                "slender": "slender",
                "plus_size": "plus-sized",
                "stocky": "stocky"
            }
        };
        
        // For androgynous, check both male and female descriptions
        if (gender === "androgynous") {
            if (buildDescriptions.male[build]) {
                return buildDescriptions.male[build];
            } else if (buildDescriptions.female[build]) {
                return buildDescriptions.female[build];
            } else {
                return build.replace(/_/g, ' ');
            }
        }
        
        // Return gender-specific description or default to build name
        return buildDescriptions[gender][build] || build.replace(/_/g, ' ');
    }
    
    /**
     * Generates a complete T2I prompt based on current selections
     * IMPROVED: Better organization, grammar, and avoids redundancy
     * @returns {Object} - Generated prompt result
     */
    generatePrompt() {
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
        if (this.featureSelections.Hair) {
            const hair = this.formatHair(this.featureSelections.Hair);
            if (hair) {
                prompt += `, ${hair}`;
            }
        }
        
        // Add facial features in order
        const featureDescriptions = [];
        
        for (const feature of this.featureOrder) {
            if (this.featureSelections[feature]) {
                const formattedFeature = this.formatFeature(feature, this.featureSelections[feature]);
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
        if (this.featureSelections.Wardrobe) {
            const wardrobe = this.formatWardrobe(this.featureSelections.Wardrobe);
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
     * Gets a simple text summary of current selections including intensity
     * @returns {string} - Text summary
     */
    getSummary() {
        let summary = `Character: ${this.globalParams.gender || '[unspecified]'} ${this.globalParams.age || '[unspecified]'} with ${this.globalParams.build || '[unspecified]'} build\n\n`;
        
        summary += "Selected Features:\n";
        
        // List features in order
        for (const feature of this.featureOrder) {
            if (this.featureSelections[feature]) {
                summary += `- ${feature}: `;
                const properties = [];
                for (const prop in this.featureSelections[feature]) {
                    properties.push(`${prop}: ${this.featureSelections[feature][prop]}`);
                }
                
                // Add intensity if set
                if (this.intensitySelections[feature]) {
                    properties.push(`intensity: ${this.intensitySelections[feature]}`);
                }
                
                summary += properties.join(", ") + "\n";
            }
        }
        
        // Add other features like Hair and Wardrobe
        if (this.featureSelections.Hair) {
            summary += "- Hair: ";
            const properties = [];
            for (const prop in this.featureSelections.Hair) {
                properties.push(`${prop}: ${this.featureSelections.Hair[prop]}`);
            }
            summary += properties.join(", ") + "\n";
        }
        
        if (this.featureSelections.Wardrobe) {
            summary += "- Wardrobe: ";
            const properties = [];
            for (const prop in this.featureSelections.Wardrobe) {
                properties.push(`${prop}: ${this.featureSelections.Wardrobe[prop]}`);
            }
            summary += properties.join(", ") + "\n";
        }
        
        return summary;
    }
}