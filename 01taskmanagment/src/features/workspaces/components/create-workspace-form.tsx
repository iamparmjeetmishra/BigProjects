"use client";
import { zodResolver } from "@hookform/resolvers/zod";

import {
	CreateWorkspaceFormInferSchema,
	createWorkspaceSchema,
} from "../schema";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import DottedSeparator from "@/components/dotted-separator";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useCreateWorkspace } from "../api/use-create-workspace";
import { useRef } from "react";
import Image from "next/image";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ImageIcon } from "lucide-react";

interface CreateWorkspaceFormProps {
	onCancel?: () => void;
}

export const CreateWorkspaceForm = ({
	onCancel,
}: CreateWorkspaceFormProps) => {

	const { mutate, isPending } = useCreateWorkspace()
	const inputRef = useRef<HTMLInputElement>(null)

	const form = useForm<CreateWorkspaceFormInferSchema>({
		resolver: zodResolver(createWorkspaceSchema),
		defaultValues: {
			name: "",
			image:"",
		},
	});

	const onSubmit = (values: CreateWorkspaceFormInferSchema) => {
		const finalValues = {
			...values,
			image: values.image instanceof File ? values.image : ""
		}
		mutate({form: finalValues})
	};

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (file) {
			form.setValue("image", file)
		}
	}

	return (
		<Card className="w-full h-full border-none shadow-none">
			<CardHeader className="flex p-7">
				<CardTitle className="text-xl font-bold">
					Create a new workspace
				</CardTitle>
			</CardHeader>
			<div className="px-8">
				<DottedSeparator />
			</div>
			<CardContent className="p-8">
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-4"
					>
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Workspace name</FormLabel>
									<FormControl>
										<Input placeholder="Add your name" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="image"
							render={({ field }) => (
								<div className="flex flex-col gap-y-2">
									<div className="flex items-center gap-x-5">
										{field.value ? (
											<div className="size-[72px] relative rounded-md overflow-hidden">
												<Image
													alt="logo"
													fill
													className="object-cover"
													src={
														field.value instanceof File 
															? URL.createObjectURL(field.value)
															: field.value
													}
												/>
											</div>
										) : (
												<Avatar className="size-[72px]">
													<AvatarFallback>
														<ImageIcon className="size-9 text-neutral-400" />
													</AvatarFallback>
												</Avatar>
										)}
										<div className="flex flex-col">
											<p className="text-sm">Workspace Icon</p>
											<p className="text-sm text-muted-foreground">
												JPG, PNG, SVG, or JPEG, Max 1mb
											</p>
											<Input
												className="hidden"
												type="file"
												accept=".jpg, .png, .jpeg, .svg"
												ref={inputRef}
												disabled={isPending}
												onChange={handleImageChange}
											/>
											<Button
												type="button"
												variant='teritary'
												size='xs'
												disabled={isPending}
												className="w-fit mt-2"
												onClick={() => inputRef.current?.click()}
											>
												Upload Image
											</Button>
										</div>
									</div>
								</div>
							)}
						/>
						<DottedSeparator className="py-8" />
						<div className="flex flex-col gap-4 lg:flex-row lg:items-center justify-between">
							<Button
								type="submit"
								variant="secondary"
                onClick={onCancel}
                disabled={isPending}  
							>
								Cancel
              </Button>
              <Button
								type="submit"
                variant="default"
                disabled={isPending}
							>
								Create Workspace
							</Button>
						</div>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
};
