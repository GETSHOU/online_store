import { ACTION_TYPE } from "../../../constants";

export const setSubcategories = subcategories => {
	return {
		type: ACTION_TYPE.SET_SUBCATEGORIES,
		payload: subcategories,
	};
};
