import { cn } from "@/lib/utils";
import { SettingsIcon, UserIcon } from "lucide-react";
import { Route } from "next";
import Link from "next/link";

import {
	GoCheckCircle,
	GoCheckCircleFill,
	GoHome,
	GoHomeFill,
} from "react-icons/go";

interface RoutesProps  {
  label: string;
  href: string| Route;
  icon: React.ElementType;
  activeIcon: React.ElementType
}

const routes: RoutesProps[] = [
	{
		label: "Home",
		href: "/" as string,
		icon: GoHome,
		activeIcon: GoHomeFill,
	},
	{
		label: "My Tasks",
		href: "/tasks" as string,
		icon: GoCheckCircle,
		activeIcon: GoCheckCircleFill,
	},
	{
		label: "Settings",
		href: "/settings" as string,
		icon: SettingsIcon,
		activeIcon: SettingsIcon,
	},
	{
		label: "Members",
		href: "/members" as string,
		icon: UserIcon,
		activeIcon: UserIcon,
	},
];

export default function Navigation() {
	return (
		<ul className="flex flex-col">
			{routes.map((item) => {
				const isActive = false;
				const Icon = isActive ? item.activeIcon : item.icon;

				return (
					<Link key={item.href.toString()} href={item.href as Route}>
						<div
							className={cn(
								"flex items-center gap-2.5 p-2.5 rounded-md font-medium hover:text-primary transition text-neutral-500",
								isActive &&
									"bg-white shadow-sm hover:opacity-100 text-primary"
							)}
						>
							<Icon className="size-5 text-neutral-500" />
							{item.label}
						</div>
					</Link>
				);
			})}
		</ul>
	);
}
