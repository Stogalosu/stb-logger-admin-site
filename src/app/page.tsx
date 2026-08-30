import Image from "next/image";
import { db } from "@/lib/firebase";
import { getDocs, collection } from "firebase/firestore";
import LineCard from "@/components/line-card";
import LineMap from "@/components/line-map";

async function getLines() {
  const snap = await getDocs(collection(db, 'lines'));
  // return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return snap.docs.map(doc => ({ ...doc.data() }));
}

export default async function Home({ searchParams }: { searchParams: Promise<{ lineId?: string }> }) {
  const { lineId } = await searchParams;
  const lines = await getLines() as Line[];
  const line = lines.find((elem) => elem.id == Number(lineId));

  if(lineId != null)
    return (
      <div className="flex flex-row h-full w-full justify-start">
        <div className="flex flex-col w-[35rem] h-full overflow-y-auto gap-4 px-12 py-8 border-r">
          {lines.map((l) => (
              <LineCard key={l.id} line={l} selected={l.id == Number(lineId)}/>
          ))}
        </div>
        <LineMap line={line}/>
      </div>
    );
  else
    return (
        <div className="flex flex-col h-full w-full items-center overflow-y-auto">
          <p className="text-2xl font-bold pt-8">Lines</p>
          <div className="grid grid-cols-1 md:grid-cols-2 auto-rows-[minmax(7rem,auto)] w-[70vw] h-full gap-4 px-12 py-8 self-center items-start content-start">
            {lines.map((l) => (
                <LineCard key={l.id} line={l} selected={l.id == Number(lineId)}/>
            ))}
          </div>
        </div>
    );
}
