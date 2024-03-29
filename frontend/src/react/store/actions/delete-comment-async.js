import { ACTION_TYPE, ACTION_TYPE_ERORRS } from "../../../constants";
import { commentsService } from "../../../services";

export const deleteCommentAsync = (productId, commentId) => dispatch =>
	commentsService
		.delete(productId, commentId)
		.then(res => {
			if (res.error) {
				throw new Error(res.error);
			}

			dispatch({
				type: ACTION_TYPE.DELETE_COMMENT,
				payload: commentId,
			});
		})
		.catch(e => {
			dispatch({ type: ACTION_TYPE_ERORRS.DELETE_COMMENT_ERROR, payload: e.message });
		});
