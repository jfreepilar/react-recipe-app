import { useEffect, useState, useContext } from 'react';
import { globalContext } from '../../App';
import { useNavigate } from 'react-router-dom';
import {Link} from 'react-router-dom'
import { FiSearch } from "react-icons/fi";
import { IoIosClose } from "react-icons/io";
import '../../index.css'


  export default function HomePage() {
    const [mealId, setMealId] = useState(null);
    const navigate = useNavigate();

    const {state, dispatch, showModal, hideModal} = useContext(globalContext);

    const handleIdMeal = (idMeal) => {
      setMealId(idMeal);
      showModal();
    };
    
    const handleSubmit = (e) => {
      e.preventDefault();
      fetchMeal(state.userInput);
      dispatch({ type: 'RESET_INPUT' });
    };

    useEffect(() => {
      dispatch({ type: 'RESET_MEALS' });
      navigate('/');
      dispatch({ type: 'SEARCH_RESULT_ERROR'});
    }, [navigate, dispatch]);

    useEffect(() => {
      document.addEventListener('mousedown', hideModal);

      return () => {
        document.removeEventListener('mousedown', hideModal);
      };
    }, [])


    const fetchMeal = async (meal) => {
      try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data);
        if (data.meals === null) {
          dispatch({type: 'SEARCH_RESULT_ERROR'});
          dispatch({type: 'RECIPE_NOT_FOUND'});
          
        } else {
          dispatch({ type: 'FETCH_SUCCESS_MEALS', payload: data.meals });
          dispatch({type: 'SEARCH_RESULT_SUCCESS'});
          dispatch({type: 'RECIPE_FOUND'});
        }

      } catch (error) {
        dispatch({ type: 'FETCH_ERROR_MEALS', payload: error.message });
      }
    };

    useEffect(() => {
      let isMounted = true;

      const fetchCategory = async () => {
          try {
              const response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
              if (!response.ok) {
                  throw new Error('Network response was not ok');
              }
              const data = await response.json();

              if (isMounted) {
                  dispatch({ type: 'FETCH_SUCCESS_CATEGORIES', payload: data.categories });
              }
          } catch (error) {
              if (isMounted) {
                  dispatch({ type: 'FETCH_ERROR_CATEGORIES', payload: error.message });
              }
          }
      };

      fetchCategory();

      return () => {
          isMounted = false;
      };
  }, []);


  if (state.loading) return <p>Loading ...</p>;
  if (state.error) return <p>Error: {state.error}</p>;

  
    return (
      <>
        <div className='flex mr-16 mb-6 h-72
                        max-xl:flex-col max-xl:items-center max-xl:h-[500px]
                        max-md:h-[500px]'>

          <img src='src/assets/savory-spoon.png' className='h-56 w-96 mt-[-22px] ml-14 max-xl:h-50 max-xl:w-44' alt="Savory Sppon Logo"/>

          <div className='h-24 my-5 p-5
                          max-xl:mt-[-50px] max-xl:ml-10'>
            <p className='text-3xl italic text-silver px-12
                          max-xl:text-3xl max-xl:text-center
                          max-md:text-2xl max-md:px-7 m'>
              “I’ve long believed that good food, good eating, is all about risk. Whether we’re talking about unpasteurized Stilton, raw oysters or working for organized crime ‘associates,’ food, for me, has always been an adventure.”
            </p>
            <p className='text-xl italic text-silver mt-3.5 text-right
                          max-xl:text-xl'>
              -Anthony Bourdain, celebrity chef</p>
          </div>
        </div>
  {/* //search */}

          <form className='flex justify-center' 
                            onSubmit={handleSubmit}>
            <input
              className='rounded-full border-r-0 text-left rounded-r-none border-2 
                          border-silver outline-none px-2.5 pl-6 text-xl w-[350px]
                          focus:border-tomato'
              type="text"
              value={state.userInput}
              onChange={(e) => dispatch({ type: 'SET_USER_INPUT', payload: e.target.value })}
            />
              <div className='h-[50px] w-[50px] border-none rounded-full rounded-l-none 
                              flex justify-center items-center bg-tomato' onClick={handleSubmit}>
                                <FiSearch className='text-2xl font-bold text-white cursor-pointer'/>
              </div>
          </form>


        {state.searchResult && <p className='text-center font-bold text-3xl mt-5 mb-[-30px]
                                             max-md:text-2xl'>Search Result:</p>}
        {state.recipeNotFound && <p className='text-center font-bold text-3xl mt-5 mb-[-30px]
                                  max-md:text-2xl'>No Recipe Found 😔</p>}
  {/* //search results */}
        <div className='m-[70px] list-none grid grid-cols-auto-fit-minmax items-center justify-around gap-5
                        max-md:ml-[100px]'> 
          {state.meals.map(meal => (
            <div className='text-black shadow-light-shadow h-[300px] w-[200px] flex flex-col rounded-lg list-none pt-8 px-[70px] pb-5 text-center
                            hover:shadow-dark-shadow cursor-pointer transition-shadow duration-300 ease-out
                            max-md:' 
                 key={meal.idMeal} onClick={() => handleIdMeal(meal.idMeal)}>
              <h2 className='text-[1.2rem] font-bold mb-7 whitespace-nowrap overflow-hidden text-ellipsis w-full' >{meal.strMeal}</h2>
              <img src={meal.strMealThumb} alt={meal.strMeal} className='w-[200px] rounded-full border-4 border-tomato mx-auto' />
            </div>
          ))}
        </div>
  {/* //ingridients & instructions */}
        {mealId && (
          <div>
            {state.meals
              .filter(meal => meal.idMeal === mealId)
              .map(meal => (
                <div
                    key={meal.idMeal}
                    className={`border-5 border-white rounded-md my-5 mx-auto w-1/2 max-h-[80%] p-10 bg-tomato
                               text-white flex flex-col items-center fixed top-[20%] left-[50%] 
                                overflow-auto z-10 transform translate-x-[-50%] translate-y-[-20%]
                    ${state.isModalHidden ? 'hidden' : '' }`}>
                  <div className='flex justify-end w-full h-fit mb-[-10px]'>
                    <div className='text-end font-extrabold text-5xl cursor-pointer' onClick={hideModal}><IoIosClose /></div>
                  </div>
                  <h3 className='text-center font-black text-xl mt-[-30px] mx-auto mb-4'>{meal.strMeal}</h3>
                  <p className='mt-[-18px]'>Area: {meal.strArea}</p>
                  <div className='flex my-12 gap-24' >
                    <div className='m-[-12px]'>
                      <p className='font-bold mt-3 text-center'>Ingredients:</p>
                          <ul className='ml-12 list-disc'>
                            {Object.keys(meal)  
                              .filter(key => key.startsWith('strIngredient') && meal[key])
                              .map((ingredientKey, index) => {
                                const measureKey = `strMeasure${ingredientKey.replace('strIngredient', '')}`;
                                const ingredient = meal[ingredientKey];
                                const measure = meal[measureKey];

                                if (ingredient && ingredient.trim() !== "" && measure && measure.trim() !== "") {
                                  return (
                                    <div key={index}>
                                      <li>
                                        {measure.split(' ').join('')} {ingredient}
                                      </li>
                                    </div>
                                  );
                                }
                                return null;
                              })}
                          </ul>
                    </div>
                    <img className='w-[350px] h-[350px] rounded-full border-4 border-white' src={meal.strMealThumb} alt={meal.strMeal} />
                  </div>
                  <p  className='font-bold mt-3'>Instructions:</p>
                  <ul className='list-decimal'>
                    {meal.strInstructions && 
                      meal.strInstructions.split('. ').map((step, index) => (
                        step && <li key={index}>{step.replace(/\bstep \d+ -|\d+\./gi, '').trim()}</li>
                    ))}
                  </ul>
                </div>
              ))}
          </div>
        )}

        <p className='text-center font-bold text-3xl mt-[-20px]
                     max-md:text-2xl'>EXPLORE MORE RECIPES</p>
        
  {/* //categories     */}
            <div className='mt-10 mb-12 flex flex-wrap justify-center gap-x-12 gap-y-7
                            max-md:gap-x-10 max-md:gap-y-5'>
                {state.categories.map(item => (
                <div className='bg-tomato h-10 p-3 rounded-md
                                max-md:p-2
                                hover:shadow-dark-shadow cursor-pointer transition-shadow
                                duration-500 ease-out' key={item.idCategory}>
                  <Link to={`/recipes/${item.strCategory}`}>
                    <h2 className='text-white no-underline text-2xl
                                   max-md:text-xl'>{item.strCategory}</h2>
                  </Link>
                </div>
              ))}
            </div>

          <div className={`fixed top-0 left-0 right-0 bottom-0
                           w-full h-full bg-overlay-bg backdrop-blur-sm z-1 
                           ${state.isOverlayHidden ? 'hidden' : '' }`}> </div>
      </>
    );
  }
