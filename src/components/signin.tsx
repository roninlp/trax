"use client";

import { authClient } from "@/libs/auth-client";
import Link from "next/link";

export function SignIn() {
	const { data: session, isPending } = authClient.useSession();
	if (isPending) return <div>Loading...</div>;
	if (session) return <div>hello {session.user.name}</div>;
	return <Link href="/signup">Sign In</Link>;
}
