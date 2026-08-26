import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BusFront } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen w-full px-12 py-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex flex-row gap-2">
            <BusFront className="text-trolleybus-green"/>
            Line 70
          </CardTitle>
          <CardDescription >Bd. Basarabia - Facultatea de Medicină</CardDescription>
          <CardAction className="flex flex-col items-center gap-1">
            <Button variant="link">View</Button>
            <Button>Edit</Button>
          </CardAction>
        </CardHeader>
      </Card>
    </div>
  );
}
