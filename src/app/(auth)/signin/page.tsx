import { auth } from "@/server/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { SignInForm } from "./signin-form";

export default async function SignUpPage() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (session) {
		redirect("/");
	}

	return (
		<div className="flex min-h-screen flex-col items-center justify-center ">
			<SignInForm />
		</div>
	);
}
