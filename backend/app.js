require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const {
	authController,
	rolesController,
	usersController,
	categoriesController,
	subcategoriesController,
	productsController,
} = require("./controllers");
const { authenticated, hasRole } = require("./middlewares");
const { ROLES } = require("./constants/roles");
const routes = require("./services/routes");

const devPort = 3000;
const port = 3005;
const app = express();

// app.use(express.static("../frontend/build"));

app.use(cors({ origin: `http://localhost:${devPort}`, credentials: true }));

app.use(cookieParser());
app.use(express.json());

// Регистрация
app.post(routes.auth.register, (req, res) => {
	authController.register(
		req.body.email,
		req.body.name,
		req.body.password,
		res
	);
});

// Авторизация
app.post(routes.auth.login, (req, res) => {
	authController.login(req.body.email, req.body.password, res);
});

// Получение категорий
app.get(routes.categoriesManagement.categories, (req, res) => {
	categoriesController.get(res);
});

// Получение подкатегорий выбранной категории
app.get(routes.subcategoriesManagement.subcategories, (req, res) => {
	subcategoriesController.get(req.params.categoryId, res);
});

// Получение товаров выбранной подкатегории
app.get(routes.productsManagement.products, (req, res) => {
	productsController.get(req.params.subcategoryId, res);
});

// ---------------- НИЖЕ ДЛЯ АВТОРИЗОВАННЫХ ПОЛЬЗОВАТЕЛЕЙ ---------------
app.use(authenticated);

// Выход
app.post(routes.auth.logout, (req, res) => {
	authController.logout(res);
});

// Получение пользователей
app.get(routes.usersManagement.users, hasRole([ROLES.ADMIN]), (req, res) => {
	usersController.get(res);
});

// Получение ролей
app.get(routes.usersManagement.roles, hasRole([ROLES.ADMIN]), (req, res) => {
	rolesController.get(res);
});

// Редактирование роли пользователя
app.patch(
	routes.usersManagement.update,
	hasRole([ROLES.ADMIN]),
	async (req, res) => {
		usersController.update(req.params.userId, req.body.roleId, res);
	}
);

// Удаление пользователя
app.delete(
	routes.usersManagement.delete,
	hasRole([ROLES.ADMIN]),
	async (req, res) => {
		usersController.delete(req.params.userId, res);
	}
);

// Добавление категории
app.post(
	routes.categoriesManagement.create,
	hasRole([ROLES.ADMIN, ROLES.MODERATOR]),
	(req, res) => {
		categoriesController.create(req.body.title, res);
	}
);

// Добавление подкатегорий
app.post(
	routes.subcategoriesManagement.create,
	hasRole([ROLES.ADMIN, ROLES.MODERATOR]),
	(req, res) => {
		subcategoriesController.create(req.params.categoryId, req.body.title, res);
	}
);

// Добавление товара
app.post(
	routes.productsManagement.create,
	hasRole([ROLES.ADMIN, ROLES.MODERATOR]),
	(req, res) => {
		productsController.create(
			req.params.subcategoryId,
			{
				title: req.body.title,
				vendor: req.body.vendor,
				vendorCode: req.body.vendorCode,
				specs: req.body.specs,
				price: req.body.price,
				previewImage: req.body.previewImage,
			},
			res
		);
	}
);

mongoose.connect(process.env.MONGODB_CONNECTION_STRING).then(() => {
	app.listen(port, () => {
		console.log(`Server has been started on port ${port} ...`);
	});
});
