import { Button } from "@heroui/react";

export default function Home() {
  return (
    <>
      <div className="flex flex-row gap-4 m-4">
        <Button variant="primary" >
          Click me
        </Button>
        <Button variant="secondary" >
          Click me
        </Button>
        <Button variant="tertiary" >
          Click me
        </Button>
        <Button variant="danger" >
          Click me
        </Button>
        <Button variant="danger-soft" >
          Click me
        </Button>
        <Button variant="ghost" >
          Click me
        </Button>
        <Button variant="outline" >
          Click me
        </Button>
      </div>
    </>
  );
}
