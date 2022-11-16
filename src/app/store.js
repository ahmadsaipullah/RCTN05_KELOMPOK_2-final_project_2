import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "../features/slice/authSlice";
import productSlice from "../features/slice/productSlice";
import logger from "redux-logger";
// import soldSlice from "../features/slice/soldSlice";
import savedCartSlice from "../features/slice/savedCartSlice";

// kombinasi beberapa reducer
const rootReducer = combineReducers({
  auth: userSlice,
  products: productSlice,
  // sold: soldSlice,
  savedCart: savedCartSlice,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

// subscribe untuk menyimpan state ke local storage di setiap ada perubahan
store.subscribe(() => {
  localStorage.setItem('auth', JSON.stringify(store.getState().auth))
  localStorage.setItem('products', JSON.stringify(store.getState().products))
  localStorage.setItem('sold', JSON.stringify(store.getState().sold))
  localStorage.setItem('savedCart', JSON.stringify(store.getState().savedCart))
  // console.log("STORE STATE",store.getState().auth)
})