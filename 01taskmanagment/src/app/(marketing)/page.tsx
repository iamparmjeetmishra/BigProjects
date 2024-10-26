import { Button } from "@/components/ui/button";

export default function HomePage() {
  return <div>
    <Button>Primary</Button>
    <Button variant='secondary'>Secondary</Button>
    <Button variant='destructive'>Destructive</Button>
    <Button variant='ghost'>Ghost</Button>
    <Button variant='muted'>muted</Button>
    <Button variant='outline'>Outline</Button>
    <Button variant='teritary'>Teritary</Button>
  </div>;
}
