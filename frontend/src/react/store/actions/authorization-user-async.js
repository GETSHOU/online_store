import { ACTION_TYPE } from "../../../constants";
import { authService } from "../../../services";
import { closeModal } from "./close-modal";
import { setUser } from "./set-user";

export const authorizationUserAsync = user => dispatch =>
	authService
		.authorization(user)
		.then(res => {
			if (res.error) {
				throw new Error(res.error);
			}

			dispatch(setUser(res.user));

			sessionStorage.setItem("userData", JSON.stringify(res.user));

			dispatch(closeModal());
		})
		.catch(e => {
			dispatch({ type: ACTION_TYPE.AUTHORIZATION_USER_ERROR, payload: e.message });
		});