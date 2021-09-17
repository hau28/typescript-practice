import { useEffect } from "react";
import { shopActions } from "../slices/shopSlice";
import { useAppDispatch, useAppSelector } from "../store";

export default function ShoppingPage() {
  const shopPage = useAppSelector((state) => state.shop);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch({ type: "shop/fetchShopPage", payload: 8 });
  }, []);

  function renderCartList() {
    if (!shopPage.cartItems.length) return <p>Empty cart</p>;
    return (
      <ul>
        {shopPage.cartItems.map((item) => {
          const detail = shopPage.items.find((itm) => itm.id === item.idItem);
          return (
            <li>
              {detail?.title}
              <ul>
                <li>
                  Price: <b>{detail?.price}</b>
                </li>
                <li>
                  Quantity: <b>{item.quantity}</b>
                </li>
              </ul>
            </li>
          );
        })}
      </ul>
    );
  }

  function renderItemList() {
    if (!shopPage.items.length) return <p>loading...</p>;
    return (
      <ul>
        {shopPage.items.map((item) => (
          <li>
            {item.title}
            <ul>
              <li>
                <img className="item" src={item.img} />
              </li>
              <li>{item.desc}</li>
              <li>
                Price: <b>{item.price}</b>
              </li>
              <li>
                Quantity:{" "}
                <button
                  onClick={() =>
                    dispatch(
                      shopActions.changeNextQuantity({
                        id: item.id,
                        quantityChange: -1,
                      })
                    )
                  }
                  disabled={item.nextQuantity === 1}
                >
                  -
                </button>
                <b>{item.nextQuantity}</b>
                <button
                  onClick={() => {
                    dispatch(
                      shopActions.changeNextQuantity({
                        id: item.id,
                        quantityChange: 1,
                      })
                    );
                  }}
                >
                  +
                </button>
              </li>
              <li>
                <button
                  onClick={() => dispatch(shopActions.addToCart(item.id))}
                >
                  Add to cart
                </button>
              </li>
            </ul>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div>
      <h2>Shopping page</h2>
      <h3>Cart</h3>
      {renderCartList()}
      <h3>Items</h3>
      {renderItemList()}
    </div>
  );
}
