"use client";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import DottedSeparator from "@/components/dotted-separator";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
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
	SignUpInferSchema,
	SignUpSchema,
} from "@/schema/auth-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Link from "next/link";

export default function SignUpCard() {
	return (
		<Card className="w-full h-full md:w-[488px] border-none shadow-none">
			<CardHeader className="flex items-center text-center">
				<CardTitle className="text-2xl">Sign Up</CardTitle>
				<CardDescription>
					By signing up, you agree to our{" "}
					<Link href="/privacy">
						<span className="underline text-blue-700">
							Privacy Policy
						</span>
          </Link>
          {" "}and {" "}
          <Link href="/terms">
						<span className="underline text-blue-700">
							Terms of Service
						</span>
					</Link>
				</CardDescription>
			</CardHeader>
			<div className="px-8">
				<DottedSeparator />
			</div>
			<CardContent className="p-8">
				<SignUpForm />
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
					Signup with Google
				</Button>
				<Button
					disabled={false}
					variant="secondary"
					size="lg"
					className="w-full"
				>
					<FaGithub className="mr-2 size-5" />
					Signup with Github
				</Button>
			</CardContent>
		</Card>
	);
}

function SignUpForm() {
	const form = useForm<SignUpInferSchema>({
		resolver: zodResolver(SignUpSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	function HandleSubmit(data: SignUpInferSchema) {
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
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Your Name</FormLabel>
							<FormControl>
								<Input placeholder="Add your name" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Your Email</FormLabel>
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
							<FormLabel>Your Password</FormLabel>
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
					Sign Up
				</Button>
			</form>
		</Form>
	);
}
