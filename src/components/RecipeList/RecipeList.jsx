import { useState, useEffect, useContext } from 'react';
import { globalContext } from '../../App';
import { useParams } from 'react-router-dom';
import { IoIosClose } from "react-icons/io";
import { GoHomeFill } from "react-icons/go";
import {Link} from 'react-router-dom'
import '../../index.css'


export default function RecipeList() {
    const { category } = useParams();
    const [selectedMeal, setSelectedMeal] = useState(null);
    const {state, dispatch, showModal, hideModal} = useContext(globalContext);

    const handleMealClick = async (idMeal) => {
        try {
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setSelectedMeal(data.meals[0]);
            showModal();
        } catch (error) {
            console.error('Error fetching meal details:', error.message);
        }
    };

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                dispatch({ type: 'FETCH_SUCCESS_MEALS', payload: data.meals || [] });
            } catch (error) {
                dispatch({ type: 'FETCH_ERROR_MEALS', payload: error.message });
            }
        };
        fetchRecipes();
    }, [category]);
    
    useEffect(() => {
        document.addEventListener('mousedown', hideModal);
  
        return () => {
          document.removeEventListener('mousedown', hideModal);
        };
      }, [])
      
    const { meals = [], loading = false, error = null } = state || {};

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <>  
            <Link to={'/'}>
                <div className='flex mt-5 ml-[70px]'>
                    <p className='text-2xl text-tomato font-black'>Home </p>
                    <p className='text-[1.72rem] text-tomato'><GoHomeFill /></p>
                </div> 
            </Link>
            
            <div>
                <h1 className='my-12 text-3xl text-center font-black
                               max-md:text-2xl max-md:my-5'>{category} Recipes</h1>
                <div className='m-[70px] list-none grid items-center justify-around grid-cols-auto-fit-minmax gap-5
                               max-md:mt-[50px] max-md:ml-[100px]'>
                    {meals.length > 0 ? (
                        meals.map((recipe) => (
                            <div key={recipe.idMeal} className='text-black shadow-light-shadow h-[300px] w-[200px] flex flex-col rounded-lg list-none pt-8 px-[70px] pb-5 text-center
                                                                hover:shadow-dark-shadow cursor-pointer transition-shadow duration-300 ease-out' 
                                                                onClick={() => handleMealClick(recipe.idMeal)}>
                                <h2 className='text-[1.2rem] font-bold mb-7 whitespace-nowrap overflow-hidden text-ellipsis w-full'>{recipe.strMeal}</h2>
                                <img src={recipe.strMealThumb} alt={recipe.strMeal} className='w-[200px] rounded-full border-4 border-tomato mx-auto' />
                            </div>
                        ))
                    ) : (
                        <p>No recipes found for this category.</p>
                    )}
                </div>
            </div>

            {selectedMeal && (
                <div  className={`border-4 border-white rounded-md my-5 mx-auto w-1/2 max-h-[80%] p-10 bg-tomato
                               text-white flex flex-col items-center fixed top-[20%] left-[50%] 
                                overflow-auto z-10 transform translate-x-[-50%] translate-y-[-20%]
                                 ${state.isModalHidden ? 'hidden' : ''}`}> 
                                 
                    <div className='flex justify-end w-full h-fit mb-[-10px]'>
                        <div className='text-end font-extrabold text-5xl cursor-pointer' onClick={hideModal}><IoIosClose /></div>
                    </div>
                    <h3 className='text-center font-black text-xl mt-[-30px] mx-auto mb-4'>{selectedMeal.strMeal}</h3>
                    <p className='mt-[-18px]'>Area: {selectedMeal.strArea}</p>
                    <div className='flex my-12 gap-24' >
                    <div className='m-[-12px]'>
                        <p className='font-bold mt-3 text-center'>Ingredients:</p>
                            <ul className='ml-12 list-disc'>
                                {Object.keys(selectedMeal)
                                        .filter(key => key.startsWith('strIngredient') && selectedMeal[key])
                                        .map((ingredientKey, index) => {
                                            const measureKey = `strMeasure${ingredientKey.replace('strIngredient', '')}`;
                                            const ingredient = selectedMeal[ingredientKey];
                                            const measure = selectedMeal[measureKey];

                                            if (ingredient && ingredient.trim() !== "" && measure && measure.trim() !== "") {
                                                return (
                                                        <li key={index}>
                                                            {measure.split(' ').join('')} {ingredient}
                                                        </li>
                                                );
                                            }
                                            return null;
                                })}
                            </ul>
                    </div>
                    <img src={selectedMeal.strMealThumb} alt={selectedMeal.strMeal} className='w-[350px] h-[350px] rounded-full border-4 border-white'/>
                </div>
                    <p className='font-bold mt-3'>Instructions:</p>
                    <ul className='list-decimal'>
                        {selectedMeal.strInstructions &&
                            selectedMeal.strInstructions.split('. ').map((step, index) => (
                                step && <li key={index}>{step.replace(/\bstep \d+ -|\d+\./gi, '').trim()}</li>
                        ))}
                    </ul>
                </div>
                
            )}
          <div className={`fixed top-0 left-0 right-0 bottom-0
                           w-full h-full bg-overlay-bg backdrop-blur-sm z-1 
                           ${state.isOverlayHidden ? 'hidden' : '' }`}> </div>
        </>
    );
}
