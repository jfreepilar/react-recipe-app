import {useReducer, createContext} from 'react';
import HomePage from './components/HomePage/HomePage';
import RecipeList from './components/RecipeList/RecipeList';
import Footer from './components/Footer/Footer';
import {Routes, Route} from 'react-router-dom';

const initialState = {
  userInput: '',
  meals: [],
  categories: [],
  loading: true,
  error: null,
  searchResult: false,
  recipeNotFound: false,
  isModalHidden: true,
  isOverlayHidden: true
};

export function reducer(state, action) {
  switch (action.type) {
    case 'SET_USER_INPUT':
      return { ...state, userInput: action.payload };
    case 'RESET_INPUT':
      return { ...state, userInput: '' };
    case 'FETCH_SUCCESS_MEALS':
      return {
        ...state,
        meals: action.payload,
        loading: false,
        error: null,
      };
    case 'FETCH_ERROR_MEALS':
      return {
        ...state,
        meals: [],
        loading: false,
        error: action.payload,
      };
    case 'RESET_MEALS':
      return {
        ...state,
        meals: []
      };
    case 'FETCH_SUCCESS_CATEGORIES':
      return {
        ...state,
        categories: action.payload,
        loading: false,
        error: null,
      };
    case 'FETCH_ERROR_CATEGORIES':
      return {
        ...state,
        categories: [],
        loading: false,
        error: action.payload,
      };
    case 'SEARCH_RESULT_SUCCESS':
      return {
        ...state,
        searchResult: true,
      }
    case 'SEARCH_RESULT_ERROR':
      return {
        ...state,
        searchResult: false,
      }
    case 'RECIPE_NOT_FOUND':
      return {
        ...state,
        recipeNotFound: true,
        meals: [],
      }
    case 'RECIPE_FOUND':
      return {
        ...state,
        recipeNotFound: false,
      }
    case 'HIDE_MODAL':
      return {
        ...state,
        isModalHidden: true,
      }
    case 'SHOW_MODAL':
      return {
        ...state,
        isModalHidden: false,
      }
    case 'HIDE_OVERLAY':
      return {
        ...state,
        isOverlayHidden: true,
      }
    case 'SHOW_OVERLAY':
      return {
        ...state,
        isOverlayHidden: false,
      }
    default:
      return state; 
  }
}

export const globalContext = createContext();

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const showModal = () => {
    console.log('Show Modal')
    dispatch({type: 'SHOW_MODAL'});
    dispatch({type: 'SHOW_OVERLAY'});
  };

  const hideModal = () => {
    console.log('Hide Modal')
    dispatch({type: 'HIDE_MODAL'});
    dispatch({type: 'HIDE_OVERLAY'});
  };

  return (
    <>
    <globalContext.Provider value={{state, dispatch, showModal, hideModal}}>
      <Routes>
          <Route path='/' element={<HomePage />}/>
          <Route path='/recipes/:category' element={<RecipeList/>}/>                                 
      </Routes>
    </globalContext.Provider>
    <Footer/>
    </>
  )
}
