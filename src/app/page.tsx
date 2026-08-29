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
import { db } from "@/lib/firebase";
import { getDocs, collection } from "firebase/firestore";
import LineIcon from "@/components/line-icon";

async function getLines() {
  const snap = await getDocs(collection(db, 'lines'));
  // return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return snap.docs.map(doc => ({ ...doc.data() }));
}

function LineCard({ line }: { line: Line }) {
  return (
      <Card className="w-full max-w-md shrink-0">
        <CardHeader>
          <CardTitle className="flex flex-row gap-2">
            <LineIcon line={line}/>
            Line {line.name}
          </CardTitle>
          <CardDescription >{line.from} - {line.to}</CardDescription>
          <CardAction className="flex flex-col items-center gap-1">
            <Button variant="link">View</Button>
            <Button>Edit</Button>
          </CardAction>
        </CardHeader>
      </Card>
  );
}

export default async function Home() {
  const lines = await getLines() as Line[];

  return (
    <div className="flex flex-row h-full w-full justify-start">
      <div className="flex flex-col w-[35rem] h-full overflow-y-auto gap-4 px-12 py-8 border-r">
        {lines.map((line) => (
            <LineCard key={line.id} line={line}/>
        ))}
      </div>
      <div className="flex flex-1 p-8 justify-center items-center">
        <p>Map</p>
      </div>
    </div>
  );
}
