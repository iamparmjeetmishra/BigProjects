import DottedSeparator from "./dotted-separator";
import Logo from "./logo";
import Navigation from "./navigation";
import WorkspaceSwithcer from "./workspace-switcher";

export default function Sidebar() {
  return (
    <aside className="h-full bg-neutral-100 p-4 w-full">
      <Logo />
      <DottedSeparator className="my-4" />
      <WorkspaceSwithcer />
      <DottedSeparator className="my-4" />
      <Navigation />
    </aside>
  )
}
