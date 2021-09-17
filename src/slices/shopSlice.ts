import { AppDispatch, useAppDispatch } from "./../store";
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import axios from "axios";

interface Item {
  id: number;
  title: string;
  price: number;
  desc: string;
  img: string;
}

interface ShopItem extends Item {
  nextQuantity: number;
}

interface CartItem {
  idItem: number;
  quantity: number;
}

interface ShopPage {
  items: ShopItem[];
  cartItems: CartItem[];
}

const initialState: ShopPage = {
  items: [],
  cartItems: [],
};

// export const fetchShopPage = createAsyncThunk(
//   "shop/fetchShopPage",
//   async (limit: number) => {
//     const resp = await axios.get(
//       `https://fakestoreapi.com/products?limit=${limit}`
//     );
//     const Items: Item[] = resp.data.map((item: any) => ({
//       id: item.id,
//       title: item.title,
//       price: item.price,
//       desc: item.description,
//       img: item.image,
//     }));
//     return Items;
//   }
// );

export const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    changeNextQuantity: (
      state,
      action: PayloadAction<{ id: number; quantityChange: number }>
    ) => {
      state.items = state.items.map((item) => {
        return item.id === action.payload.id
          ? {
              ...item,
              nextQuantity: item.nextQuantity + action.payload.quantityChange,
            }
          : item;
      });
    },
    addToCart: (state, action: PayloadAction<number>) => {
      const itemById = state.items.find(
        (item) => item.id === action.payload
      ) as ShopItem;
      const alreadyInCart = state.cartItems.find(
        (item) => item.idItem === action.payload
      );
      if (alreadyInCart) {
        alreadyInCart.quantity += itemById.nextQuantity;
      } else
        state.cartItems.push({
          idItem: action.payload,
          quantity: itemById.nextQuantity,
        });
    },
    changeQuantityInCart: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) => {
      state.cartItems = state.cartItems.map((item) =>
        item.idItem === action.payload.id
          ? { ...item, quantity: item.quantity + action.payload.quantity }
          : item
      );
    },
    removeFromCard: (state, action: PayloadAction<number>) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.idItem !== action.payload
      );
    },
    fetchedShopPage: (state, action: PayloadAction<Item[]>) => {
      state.items = action.payload.map((item) => ({
        ...item,
        nextQuantity: 1,
      }));
    },
  },
  // extraReducers: (builder) => {
  //   builder.addCase(fetchShopPage.fulfilled, (state, action) => {
  //     state.items = action.payload.map((item) => ({
  //       ...item,
  //       nextQuantity: 1,
  //     }));
  //   });
  // },
});

// export const fetchShopPage = createAsyncThunk(
//   "shop/fetchShopPage",
//   async (limit: number) => {
//     const resp = await axios.get(
//       `https://fakestoreapi.com/products?limit=${limit}`
//     );
//     const Items: Item[] = resp.data.map((item: any) => ({
//       id: item.id,
//       title: item.title,
//       price: item.price,
//       desc: item.description,
//       img: item.image,
//     }));
//     return Items;
//   }
// );

export const shopActions = shopSlice.actions;

export const shopReducer = shopSlice.reducer;

export function fetchShopPage(limit: number) {
  return async function (dispatch: AppDispatch) {
    const resp = await axios.get(
      `https://fakestoreapi.com/products?limit=${limit}`
    );
    const Items: Item[] = resp.data.map((item: any) => ({
      id: item.id,
      title: item.title,
      price: item.price,
      desc: item.description,
      img: item.image,
    }));
    dispatch(shopActions.fetchedShopPage(Items));
  };
}
