/**
 * Cookbook
 *
 * Contact: github@hulsbus.be
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


/**
 * Definition of a recipe
 */
export interface Recipe { 
    /**
     * ID of a recipe
     */
    id?: string;
    /**
     * Name of a recipe
     */
    name: string;
    /**
     * Short description of the recipe  
     */
    description: string;
    /**
     * amount of servings a recipe makes
     */
    serving_count: number;
}

