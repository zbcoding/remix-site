import type { ActionFunction, LinksFunction } from "remix";
import { Link, useSearchParams } from "remix";
import stylesUrl from "~/styles/global.css";

export let links: LinksFunction = () => {
	return [{ rel: "stylesheet", href: stylesUrl }];
};

function validateUsername(username: unknown) {
	if (typeof username !== "string" || username.length < 3) {
		return "Usernames must be over three standard characters long"
	}
}

function validatePassword(password: unknown) {
  if (typeof password !== "string" || password.length < 6) {
    return `Passwords must be at least 6 characters long`;
  }
}

type ActionData = {
	formError?: string;
	fieldErrors?: {
		username: string | undefined;
		password: string | undefined;
	};
	fields?: {
		loginType: string;
		username: string;
		password: string;
	};
};

export let action: ActionFunction = async ({
	request
}): Promise<Response | ActionData> => {
	let form = await request.formData();
	let loginType = form.get("loginType");
	let username = form.get("username");
	let password = form.get("password");
	let redirectTo = form.get("redirectTo");
	if (
		typeof loginType !== "string" ||
		typeof username !== "string"  ||
		typeof password !== "string" ||
		typeof redirectTo !== "string"
	) {
		return { formError: `Form not submitted correctly` };
	}

	let fields = { loginType, username, password };
	let fieldErrors = { username: validateUsername(username),
	password: validatePassword(password)};
	if (Object.values(fieldErrors).some(Boolean)) {
		return { fieldErrors, fields };
	}

	switch (loginType) {
		case "login": {
			return { fields, formError: "Not yet implemented" };
		}
		case "register": {
			// let userExists = await db.user.findFirst({
      //   where: { username }
      // });
      // if (userExists) {
      //   return {
      //     fields,
      //     formError: `User with username ${username} already exists`
      //   };
      // }
      // // create the user
      // // create their session and redirect to /jokes
      // return { fields, formError: "Not implemented" };
			return { fields, formError: "Not yet implemented" };
    }
		default: {
			return { fields, formError: `Login type invalid` };
		}
	}
};

export default function Login() {
	let [searchParams] = useSearchParams();
	return (
		<div className="container">
			<div className="content" data-light="">
				<h1>Login</h1>
				<form method="post">
					<input type="hidden" name="redirectTo"
						value={searchParams.get("redirectTo") ?? undefined
					} />
					<fieldset>
						<legend className="sr-only">
							Login or Register?
						</legend>
						<label>
							<input type="radio" name="loginType" value="login"
							defaultChecked
							/>{" "}
							Login
						</label>
						<label>
							<input type="radio" name="loginType" value="register"/>{" "}
							Register
						</label>
					</fieldset>
					<div>
						<label htmlFor="username-input">Username</label>
						<input type="text" id="username-input" name="username"
						/>
					</div>
					<div>
						<label htmlFor="password-input">Password</label>
						<input type="password" id="password-input" name="password"
						/>
					</div>
					<button type="submit" className="button">
						Submit
					</button>
				</form>
			</div>
		</div>
	)
}