import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import axios from "axios";

export const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const userID = useGetUserID();

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/recipes/savedRecipes/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.log(err);
      }
    };

    fetchSavedRecipes();
  }, []);
  return (
    <div className="">
      <h1>Saved Recipes</h1>
      <div className="res">
        {savedRecipes.map((recipe) => (
          <div key={recipe._id} className="resp">
            <div className="left-side">
              <h2>{recipe.name}</h2>
              <img src={recipe.imageUrl} alt={recipe.name} />
            </div>
            <div className="right-side">
              <div className="ingredients">
                <p>
                  <span>Ingredients:</span>
                </p>
                <p>{recipe.ingredients[0]}</p>
                <p> {recipe.ingredients[1]}</p>
                <p> {recipe.ingredients[2]}</p>
                <p> {recipe.ingredients[3]}</p>
              </div>
              <div className="instructions">
                <p>
                  <span>Instructions:</span>
                </p>
                <p>{recipe.instructions}</p>
              </div>

              <p>
                <span>Cooking Time:</span>
              </p>
              <p>{recipe.cookingTime} minutes</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
