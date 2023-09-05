import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from './Layout';
import axios from 'axios';
import { isAuth, getCookie, signout, updateUser } from '../auth/Helpers';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import '../App.css';

const Recipes = () => {
  const [formFieldValue, setFormFieldValues] = useState({
    recipe_name: '',
    image_url: '',
    instructions: '',
    ingredients: '',
    buttonText: 'Submit'
  });
  const {recipe_name, image_url, instructions, ingredients, buttonText} = formFieldValue;
  const [initialRecipes, setRecipes] = useState([]); 

  const token = getCookie('token');
  const navigate = useNavigate();

  useEffect(() => {
    loadAllRecipes();
  }, []);

  const loadAllRecipes = () => {
    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_API}/recipe`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      // console.log(response.data.message);
      for (let i=0; i<response.data.message.length; i++) {
        initialRecipes.push(response.data.message[i]);

        // save each object to state array
        setRecipes([
          ...initialRecipes,
          response.data.message[i]
        ])
      }
    })
    .catch(error => {
      console.log('LOAD ALL RECIPES ERROR', error.response.data.error);
      if (error.response.status === 401) {
        signout(() => {
          navigate('/');
        });
      }
    });
  };

  const handleChange = (name) => (event) => {
    setFormFieldValues({...formFieldValue, [name]: event.target.value});
  };

  const handleSubmit = event => {
    event.preventDefault();

    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API}/recipe`,
      headers: {
        Authorization: `Bearer ${token}`
      },
      data: {recipe_name, image_url, instructions, ingredients}
    })
    .then(response => {
      // console.log('RECIPE IS SAVED SUCCESSFULLY!', response);
      setFormFieldValues({
        recipe_name: '',
        image_url: '',
        instructions: '',
        ingredients: '',
        buttonText: 'Submit'
      });
      toast.success('Recipe is saved successfully!');
    })
    .catch(error => {
      // console.log('SAVING RECIPE ERROR', error.response.data.error);
      setFormFieldValues({...formFieldValue, buttonText: 'Submit'});
      toast.error(error.response.data.error);
    });
  };

  const addRecipeForm = () => (
    <form>
      <div className="form-group">
        <label className="text-muted">Recipe name</label>
        <input type="text" className="form-control recipe-form-input" value={recipe_name} onChange={handleChange('recipe_name')} />
      </div>

      <div className="form-group">
        <label className="text-muted">Image url</label>
        <input type="text" className="form-control recipe-form-input" value={image_url} onChange={handleChange('image_url')} />
      </div>

      <div className="form-group">
        <label className="text-muted">Instructions</label>
        <textarea className="form-control recipe-form-textarea" value={instructions} onChange={handleChange('instructions')} />
      </div>

      <div className="form-group">
        <label className="text-muted">Ingredients</label>
        <textarea className="form-control recipe-form-textarea" value={ingredients} onChange={handleChange('ingredients')} />
      </div>

      <div>
        <button className="btn btn-primary btn-submit" onClick={handleSubmit}>Submit</button>
      </div>
    </form>
  );

  return (
    <Layout>
      <div className="row">
        <div className="section first col-md-8 mx-auto">
          <ToastContainer />
          <h2 className="title text-center">Add New Recipe</h2>
          <p className="lead text-center none" style={{display: "none"}}>Recipes update</p>
          {addRecipeForm()}
        </div>
      </div>

      <div className="row">
        <div className="section section-all-recipes">
          <h2 className="title text-center">List of Recipes</h2>
          <div className="all-recipes-list ">
            {
              initialRecipes.map((recipe, index) => {
                if (index + 1 !== initialRecipes.length) {
                  // prevent last item from showing up. the last item is a duplicate
                  return (
                    <div key={index} className="wrapper">
                      <img className="image" src={recipe.image_url} />
                      <a className="link" href="#">
                        <h4 className="title">{recipe.recipe_name}</h4>
                      </a>
                    </div>
                  );
                }
              })
            }
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Recipes;