import { PageTitle } from "../../components";
import styles from "./MainPage.module.scss";
import { Products } from "../Products/Products";
import { Product } from "../Product/Product";

export const MainPage = () => {
	return (
		<div className={styles.wrapper}>
			<PageTitle title="Главная страница" />
			{/* <Products /> */}
			{/* <Product /> */}
		</div>
	);
};