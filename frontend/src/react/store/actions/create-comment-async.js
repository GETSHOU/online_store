import { ACTION_TYPE } from "../../../constants";
import { commentsService } from "../../../services";

export const createCommentAsync = (productId, comment) => dispatch => {
	return commentsService
		.create(productId, comment)
		.then(res => {
			if (res.error) {
				throw new Error(res.error);
			}

			dispatch({
				type: ACTION_TYPE.CREATE_COMMENT,
				payload: res.data,
			});
		})
		.catch(e => {
			dispatch({ type: ACTION_TYPE.CREATE_COMMENT_ERROR, payload: e.message });
		});
};
