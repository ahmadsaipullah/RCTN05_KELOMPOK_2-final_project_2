// import { createSlice } from "@reduxjs/toolkit";

// // slice untuk menyimpan record barang-barang yang telah terjual
// const initialState =
//     localStorage.getItem('sold')
//         ? JSON.parse(localStorage.getItem('sold'))
//         :
//         { sold: [] }

// export const soldSlice = createSlice({
//     name: "sold",
//     initialState,
//     reducers: {
//         // action ketika tombol checkout ditekan, mengeksekusi perintah untuk menambahkan data dari cart ke state sold, dimana state sold ini berisi data yang akan diproses oleh admin
//         checkout: (state, action) => {
//             // console.log("PAYLOAD CHECKOUT",action.payload)
//             // action.payload.forEach((e)=>{
//             //     if (state.id===e.id) 
//             // })
//             // console.log("STATE IN SLICE", state)
//             // console.log("ACTION IN SLICE", action.payload)
//             // const itemInSold = state.cart.find((item) => item.id === action.payload.id)
//             // if (itemInSold) {
//             //     itemInSold.quantity += action.payload.quantity;
//             // } else {
//             //     state.cart.push(action.payload);
//             // }
//             const resultArray = []
//             action.payload.forEach(e => {
//                 state.sold.forEach(x => {
//                   if (e.id === x.id) {
//                     resultArray.push({
//                       ...e,
//                       sold: x.sold + e.quantity,
//                       stock: x.stock - e.quantity,
//                     })
//                   }
//                 })
//               })
              
//               state.sold.forEach(e => {
//                 const exists = resultArray.find((x) => e.id === x.id);
              
//                 if (!exists) {
//                   resultArray.push({
//                     ...e,
//                     /* sold: e.quantity,
//                     stock: e.stock - e.quantity */
//                   });
//                 }
//               })
              
//               action.payload.forEach(e => {
//                 const exists = resultArray.find((x) => e.id === x.id);
              
//                 if (!exists) {
//                   resultArray.push({
//                     ...e,
//                     sold: e.quantity,
//                     stock: e.stock - e.quantity
//                   });
//                 }
//               })

//             console.log("RESULT ARRAY", resultArray)
//             state.sold = resultArray
//         }
//     },
// });

// export const { checkout } = soldSlice.actions
// export default soldSlice.reducer;