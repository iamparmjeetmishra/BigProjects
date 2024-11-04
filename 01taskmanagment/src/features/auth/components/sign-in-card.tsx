"use client";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import DottedSeparator from "@/components/dotted-separator";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	SignInInferSchema,
	SignInSchema,
} from "@/schema/auth-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Link from "next/link";

export default function SignInCard() {
	return (
		<Card className="w-full h-full md:w-[488px] border-none shadow-none">
			<CardHeader className="flex items-center ">
				<CardTitle className="text-2xl">Welcome back!</CardTitle>
			</CardHeader>
			<div className="px-8">
				<DottedSeparator />
			</div>
			<CardContent className="p-8">
				<SignInForm />
			</CardContent>
			<div className="px-8">
				<DottedSeparator />
			</div>
			<CardContent className="p-8 space-y-4">
				<Button
					disabled={false}
					variant="secondary"
					size="lg"
					className="w-full"
        >
          <FcGoogle className="mr-2 size-5" />
					Login with Google
        </Button>
        <Button
					disabled={false}
					variant="secondary"
					size="lg"
					className="w-full"
        >
          <FaGithub className="mr-2 size-5" />
					Login with Github
				</Button>
			</CardContent>
			{/* <div className="px-8">
				<DottedSeparator />
			</div> */}
			<CardContent className="text-center">
				<p>
					Don&apos;t have an account?{" "}
					<Link href="/sign-up">
						<span className="text-blue-700">
							Sign up
						</span>
					</Link>
				</p>
			</CardContent>
		</Card>
	);
}

function SignInForm() {
	const form = useForm<SignInInferSchema>({
		resolver: zodResolver(SignInSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	function HandleSubmit(data: SignInInferSchema) {
		console.log(data);
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(HandleSubmit)}
				className="space-y-4"
			>
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input placeholder="Add your email" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<Input
									type="password"
									placeholder="Add your Password"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit" size="lg" className="w-full">
					Sign In
				</Button>
			</form>
		</Form>
	);
}
