import { useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoMdCart } from "react-icons/io";
import { addProductInBasket, changeNumberOfProducts } from "../../store/actions";
import { basketSelector } from "../../store/selectors";
import { COUNTER_RULES } from "../../../constants";
import { Button } from "../Button/Button";
import styles from "./ProductActions.module.scss";

export const ProductActions = ({ product, loadingStatus }) => {
	const [isDisabled, setIsDisabled] = useState(false);
	const [productLimit, setProductLimit] = useState(false);

	const dispatch = useDispatch();
	const basket = useSelector(basketSelector);

	const currentBasketDataJSON = localStorage.getItem("basket");
	const basketFromStorage = JSON.parse(currentBasketDataJSON);

	const currentProduct = basketFromStorage.find(data => data.product.id === product.id);

	useLayoutEffect(() => {
		if (basketFromStorage.length === 0) return;

		setIsDisabled(true);

		if (!loadingStatus) {
			if (currentProduct?.productCount >= COUNTER_RULES.MAX) {
				setProductLimit(true);
			} else {
				setProductLimit(false);
				setIsDisabled(false);
			}
		}
	}, [loadingStatus, basketFromStorage, product.id]);

	const handleAddToBasket = id => {
		const foundedProduct = basket.find(data => data.product.id === id);

		if (!foundedProduct) {
			dispatch(addProductInBasket({ product, productCount: 1 }));
		} else {
			if (foundedProduct.productCount < COUNTER_RULES.MAX) {
				dispatch(changeNumberOfProducts(id, foundedProduct.productCount + 1));
			}
		}
	};

	return (
		<div className={styles.wrapper}>
			<div className={styles.price}>
				<span className={styles.priceText}>{product.price} ₽</span>
			</div>
			<div className={styles.actions}>
				<Button
					type="button"
					text="В корзину"
					icon={<IoMdCart className="icon iconButton" />}
					onClick={() => handleAddToBasket(product.id)}
					isDisabled={isDisabled}
				/>
				{productLimit && <div className={styles.actionsNotice}>Достигнут лимит</div>}
			</div>
		</div>
	);
};