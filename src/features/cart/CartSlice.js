import { createSlice } from "@reduxjs/toolkit";
import cartItems from "../../cartItems";

//Cartスライスのストア初期設定
const initialState = {
  //商品
  cartItems: cartItems,
  //件数
  amount: 4,
  //合計金額
  total: 0,
};

const cartSlice = createSlice({
  //スライス名
  name: "cart",
  //デフォルト設定
  initialState,
  //Reducerを作る
  reducers: {
    //アクション名とアクション内容を設定(reducerを設定すれば同名でアクションクリエイターも生成される)
    clearCart: (state) => {
      return { cartItems: [], amount: 0, total: 0 };
    },
    //actionにはtypeとpayloadが入っている
    removeItem: (state, action) => {
      //removeItemというアクションクリエイターの引数にcartItemのidを渡す予定なので、payloadにはidを入れる想定
      const itemId = action.payload;
      //filterは条件式の真の要素で新しい配列を作る関数
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
    },
    increase: (state, action) => {
      //findは条件式が真のものを取り出して配列にする関数
      const cartItem = state.cartItems.find(
        (item) => item.id === action.payload
      );
      //件数を1つ追加する
      cartItem.amount = cartItem.amount + 1;
    },
    decrease: (state, action) => {
      //findは条件式が真のものを取り出して配列にする関数
      const cartItem = state.cartItems.find(
        (item) => item.id === action.payload
      );
      //件数を1つ減算する
      cartItem.amount = cartItem.amount - 1;
    },
    calculateTotals: (state) => {
      let amount = 0;
      let total = 0;
      state.cartItems.forEach((item) => {
        amount += item.amount;
        total += item.amount * item.price;
      });
      //新しいamount totalに更新する
      state.amount = amount;
      state.total = total;
    },
  },
});

//cartSliceの中にある「clearCart」というactionsをエクスポートする
export const { clearCart, removeItem, increase, decrease, calculateTotals } =
  cartSlice.actions;
export default cartSlice.reducer;
