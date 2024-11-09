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

interface CreateWorkspaceFormProps {
	onCancel?: () => void;
}

export const CreateWorkspaceForm = ({
	onCancel,
}: CreateWorkspaceFormProps) => {

  const {mutate, isPending} = useCreateWorkspace()

	const form = useForm<CreateWorkspaceFormInferSchema>({
		resolver: zodResolver(createWorkspaceSchema),
		defaultValues: {
			name: "",
		},
	});

	const onSubmit = (values: CreateWorkspaceFormInferSchema) => {
		mutate({json: values})
	};

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
