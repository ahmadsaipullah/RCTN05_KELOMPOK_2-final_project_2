import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// const API_KEY = "5b47020c18d445a2ae6d03a5cd983525";
let PAGE_SIZE = 10;

// mengambil data presist dari localstorage
const initialState = JSON.parse(localStorage.getItem('products')) ?
  JSON.parse(localStorage.getItem('products'))?.entities?.length !== 0 ?
    JSON.parse(localStorage.getItem('products')) :
    {
      entities: [],
    } :
  {
    entities: [],
  }

// untuk fetching semua produk
export const fetchAllProducts = createAsyncThunk(
  "products/fetchAllProducts",
  async () => {
    console.log("FETCHING ITEMS...")
    const response = await axios.get(
      `https://fakestoreapi.com/products?limit=${PAGE_SIZE}`
    )
    const addedResponse = response.data.map(prod => {
      return ({
        ...prod,
        stock: 20,
        size: null,
        sold: 0,
      })
    })
    console.log("ADDED RESPONSE", addedResponse)
    return addedResponse
  }
);
// export const fetchProductsFromLocal = createAction('products/fetchProductsFromLocal', () => localStorage.getItem('products'));

// untuk fetching satu produk tertentu
// export const fetchSingleProduct = createAsyncThunk(
//   "products/fetchSingleProduct",
//   async () => {
//     const response = await axios.get(
//       `https://fakestoreapi.com/products/1`
//     );
//     console.log(response.data)
//     return response.data;
//   }
// );

export const Slicer = createSlice({
  name: "products",
  initialState,
  reducers: {
    // action checkout mengupdate property ketika user melakukan checkout
    checkout: (state, action) => {
      console.log("CHECKOUT CALLED")
      const resultArray = []
      action.payload.forEach(e => {
        state.entities.forEach(x => {
          if (e.id === x.id) {
            resultArray.push({
              ...e,
              sold: x.sold + e.quantity,
              stock: x.stock - e.quantity,
            })
          }
        })
      })

      state.entities.forEach(e => {
        const exists = resultArray.find((x) => e.id === x.id);

        if (!exists) {
          resultArray.push({
            ...e,
            /* sold: e.quantity,
            stock: e.stock - e.quantity */
          });
        }
      })

      action.payload.forEach(e => {
        const exists = resultArray.find((x) => e.id === x.id);

        if (!exists) {
          resultArray.push({
            ...e,
            sold: e.quantity,
            stock: e.stock - e.quantity
          });
        }
      })

      console.log("RESULT ARRAY", resultArray)
      state.entities = resultArray
    },
    updateStock: (state, action) => {
      const updated = state.entities.map(obj => {
        if (obj.id === action.payload.id) {
          return { ...obj, stock: action.payload.stock };
        }
        return obj;
      });
      state.entities = updated
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.entities = [];
        state.entities.push(...action.payload);
      })
  },
});

// console.log(Slicer)
export const { checkout, updateStock } = Slicer.actions
export default Slicer.reducer;
