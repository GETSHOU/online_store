import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useResetAuthForm } from "../../hooks";
import { closeModal, setUser } from "../../store/actions";
import { modalTypeSelector } from "../../store/selectors";
import { authFormSchema } from "../../scheme";
import { request } from "../../../utils";
import { SESSION_STORAGE_NAMES } from "../../../constants";
import { Form } from "../Form/Form";
import { FormGroup } from "../Form/components/FormGroup/FormGroup";

export const Authorization = () => {
	const [showErrorForm, setShowErrorForm] = useState(false);
	const [serverErrorForm, setServerErrorForm] = useState(null);

	const dispatch = useDispatch();
	const currentModal = useSelector(modalTypeSelector);

	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			email: "",
			password: "",
		},
		resolver: yupResolver(authFormSchema),
		mode: "all",
	});

	useResetAuthForm(reset, currentModal);

	const onSubmit = ({ email, password }) => {
		request("/api/login", "POST", { email, password }).then(({ error, user }) => {
			if (error) {
				setServerErrorForm(`Ошибка запроса: ${error}`);
				setShowErrorForm(true);
				return;
			}

			dispatch(setUser(user));

			sessionStorage.setItem(SESSION_STORAGE_NAMES.USER_DATA, JSON.stringify(user));

			dispatch(closeModal());
		});
	};

	const emailErrorMessage = errors.email?.message;
	const passwordErrorMessage = errors.password?.message;

	return (
		<Form
			onSubmit={handleSubmit(onSubmit)}
			showErrorForm={showErrorForm}
			serverErrorForm={serverErrorForm}
			emailErrorMessage={emailErrorMessage}
			passwordErrorMessage={passwordErrorMessage}
		>
			<FormGroup
				type="text"
				name="email"
				labelname="Почта"
				placeholder=""
				autoComplete="on"
				error={emailErrorMessage}
				{...register("email", {
					onChange: () => {
						setServerErrorForm(null);
						setShowErrorForm(false);
					},
				})}
			/>
			<FormGroup
				type="password"
				name="password"
				labelname="Пароль"
				placeholder=""
				autoComplete="on"
				error={passwordErrorMessage}
				{...register("password")}
			/>
			<FormGroup
				isButton={true}
				buttonText="Войти"
				serverErrorForm={serverErrorForm}
				emailErrorMessage={emailErrorMessage}
				passwordErrorMessage={passwordErrorMessage}
			/>
		</Form>
	);
};
