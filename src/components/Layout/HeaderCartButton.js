import React, { useContext, useEffect, useState } from "react";
import classes from "./HeaderCartButton.module.css";
import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/cart-context";

const HeaderCartButton = (props) => {
  const [hasAnimation, setHasAnimation] = useState(false);

  const ctx = useContext(CartContext);
  const numberOfCartItems = ctx.items.reduce((a, b) => {
    return a + b.amount;
  }, 0);

  const buttonClasses = `${classes.button} ${hasAnimation ? classes.bump : ""}`;

  useEffect(() => {
    if (ctx.items.length === 0) {
      return;
    }
    setHasAnimation(true);
    const timer = setTimeout(() => {
      setHasAnimation(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [ctx.items]);

  return (
    <button className={buttonClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
