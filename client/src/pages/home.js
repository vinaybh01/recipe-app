import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import axios from "axios";
import Hero from "../components/hero";
import "./home.css";

export const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);

  const userID = useGetUserID();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("http://localhost:3001/recipes");
        setRecipes(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/recipes/savedRecipes/ids/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.log(err);
      }
    };

    fetchRecipes();
    fetchSavedRecipes();
  }, []);

  const saveRecipe = async (recipeID) => {
    try {
      const response = await axios.put("http://localhost:3001/recipes", {
        recipeID,
        userID,
      });
      setSavedRecipes(response.data.savedRecipes);
    } catch (err) {
      console.log(err);
    }
  };

  const isRecipeSaved = (id) => savedRecipes.includes(id);

  return (
    <>
      <div className="hero-section">
        <Hero />
      </div>
      <div className="other-section">
        <h1>
          <center>Latest Recipes!</center>
        </h1>
        <p>
          <center>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aut maxime
            voluptatem reprehenderit totam exercitationem placeat!
          </center>
        </p>
        <div className="res">
          {recipes.map((recipe) => (
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
                <button
                  onClick={() => saveRecipe(recipe._id)}
                  disabled={isRecipeSaved(recipe._id)}
                >
                  {isRecipeSaved(recipe._id) ? "Saved" : "Save"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
