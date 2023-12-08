import { ProductDetails, ProductInfo } from "../../../../components";
import styles from "./ProductCard.module.scss";

export const ProductCard = ({ productId, title, specs, previewImageUrl, price }) => {
	return (
		<li className={styles.card}>
			<div className={styles.cardInnerWrapper}>
				<ProductInfo
					productId={productId}
					title={title}
					specs={specs}
					previewImageUrl={previewImageUrl}
				/>
			</div>
			<div className={`${styles.cardInnerWrapper} ${styles.actions}`}>
				<ProductDetails price={price} />
			</div>
		</li>
	);
};
