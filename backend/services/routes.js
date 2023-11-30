const baseUrl = "/api/";

const routes = {
	auth: {
		register: `${baseUrl}register`,
		login: `${baseUrl}login`,
		logout: `${baseUrl}logout`,
	},
	usersManagement: {
		users: `${baseUrl}users`,
		update: `${baseUrl}users/:userId/update`,
		delete: `${baseUrl}users/:userId/delete`,
		roles: `${baseUrl}users/roles`,
	},
	categoriesManagement: {
		categories: `${baseUrl}categories`,
		create: `${baseUrl}categories/create`,
	},
	subcategoriesManagement: {
		subcategories: `${baseUrl}categories/:categoryId/subcategories`,
		create: `${baseUrl}categories/:categoryId/subcategories/create`,
	},
	productsManagement: {
		products: `${baseUrl}subcategories/:subcategoryId/products`,
		create: `${baseUrl}subcategories/:subcategoryId/products/create`,
	},
};

module.exports = routes;
