import { Route, Routes, useMatch } from "react-router-dom";
import { useSelector } from "react-redux";
import { userRoleSelector } from "./react/store/selectors";
import { checkAccess } from "./utils";
import { ERRORS, ROLES } from "./constants";
import {
	Users,
	Basket,
	Product,
	Products,
	MainPage,
	Categories,
	Subcategories,
	ProductsManagement,
	CategoriesManagement,
	SubcategoriesManagement,
} from "./react/pages";
import { Error, PrivateNavMenu } from "./react/components";
import styles from "./App.module.scss";

export const App = () => {
	const roleId = useSelector(userRoleSelector);
	const isAllowedRoles = checkAccess([ROLES.ADMIN, ROLES.MODERATOR], roleId);

	const isUsersPage = !!useMatch("/users");
	const isNotExistPage = !!useMatch("/users-not-exist");
	const isProductsManagementPage = !!useMatch("/subcategories-m/:id/products-m");
	const isCategoriesManagementPage = !!useMatch("/categories-m");
	const isSubcategoriesManagementPage = !!useMatch("/categories-m/:id/subcategories-m");

	const privatePages =
		isUsersPage ||
		isNotExistPage ||
		isProductsManagementPage ||
		isCategoriesManagementPage ||
		isSubcategoriesManagementPage;

	return (
		<div
			className={
				!privatePages
					? `${styles.pageWrapper}`
					: `${styles.pageWrapper} ${styles.privatePage}`
			}
		>
			{isAllowedRoles && <PrivateNavMenu />}
			<Routes>
				{/*Интернет-магазин*/}
				<Route path="/" element={<MainPage />}>
					<Route path="categories" element={<Categories />} />
					<Route path="categories/:id/subcategories" element={<Subcategories />} />
					<Route path="subcategories/:id/products" element={<Products />} />
					<Route path="products/:id" element={<Product />} />
					<Route path="basket" element={<Basket />} />

					{/*Ошибки*/}
					<Route path="categories-not-exist" element={<div>Категорий нет</div>} />
					<Route path="subcategories-not-exist" element={<div>Подкатегорий нет</div>} />
					<Route path="products-not-exist" element={<div>Товаров нет</div>} />
				</Route>

				{/*Админ-панель*/}
				<Route path="/users" element={<Users />} />
				<Route path="/categories-m" element={<CategoriesManagement />} />
				<Route
					path="/categories-m/:id/subcategories-m"
					element={<SubcategoriesManagement />}
				/>
				<Route path="/subcategories-m/:id/products-m" element={<ProductsManagement />} />

				{/*Ошибки*/}
				<Route path="/users-m-not-exist" element={<div>Пользователей нет</div>} />
				<Route path="/categories-m-not-exist" element={<div>Категорий нет</div>} />
				<Route path="/subcategories-m-not-exist" element={<div>Подкатегорий нет</div>} />
				<Route path="/products-m-not-exist" element={<div>Товаров нет</div>} />

				{/*Общие Ошибки*/}
				<Route path="*" element={<Error error={ERRORS.PAGE_NOT_EXIST} />} />
			</Routes>
		</div>
	);
};

// TODO: 0. ЗАДАЧИ ПИСАТЬ ЗДЕСЬ
// TODO: 1. Проверить все запросы на сервер на клиенте. В catch, вместо console.log, возвращать ошибку пользователю
