import React from 'react';

function RecipeInfo(item) {
    return (
        <div className="recipe-info">
            <div className="recipe-label">{item.label}</div>
            <div className="recipe-image">
                <img src={item.image} alt={item.label} />
            </div>
            <div className="recipe-calories">{item.calories}</div>
            <div className="recipe-cookingtime">{item.cookingtime}</div>
            <div className="recipe-url">{item.url}</div>
            <div className="recipe-calories">{item.calories}</div>
            <div className="recipe-ingredients">
                <div className="recipe-ingredient-title">Ingredients</div>
                <div className="recipe-ingredient-list">
                    {item.ingredients.map((ingredient) => (
                        <div className="recipe-ingredient">{ingredient}</div>
                    ))}
                </div>
            </div>
            <div className="recipe-health-labels">
                <div className="recipe-health-label-title">Health Labels</div>
                <div className="recipe-health-label-list">
                    {item.healthLabels.map((healthLabel) => (
                        <div className="recipe-health-label">{healthLabel}</div>
                    ))}
                </div>
            </div>
            <div className="recipe-diet-labels">
                <div className="recipe-diet-label-title">Diet Labels</div>
                <div className="recipe-diet-label-list">
                    {item.dietLabels.map((dietLabel) => (
                        <div className="recipe-diet-label">{dietLabel}</div>
                    ))}
                </div>
            </div>
            <div className="recipe-cautions">
                <div className="recipe-cautions-title">Cautions</div>
                <div className="recipe-cautions-list">
                    {item.cautions.map((cautions) => (
                        <div className="recipe-cautions">{cautions}</div>
                    ))}
                </div>
            </div>
        </div>

    );
}

export default RecipeInfo;