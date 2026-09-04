import Image from "next/image";
import { db } from "@/lib/firebase";
import { getDocs, collection } from "firebase/firestore";
import LineCard from "@/components/line-card";
import LineMap from "@/components/line-map";
import NewLineButton from "@/components/new-line-button";
import ErrorToaster from "@/components/error-toaster";

async function getLines() {
  const snap = await getDocs(collection(db, 'lines'));
  return snap.docs.map(doc => ({ ...doc.data() }));
}

export default async function Home({ searchParams }: { searchParams: Promise<{ lineId?: string, err?: string }> }) {
    const { lineId, err } = await searchParams;
    const lines = await getLines() as Line[];

    if(lineId != null) {
        const line = lines.find((elem) => elem.id == Number(lineId));

        return (
            <div className="flex flex-row h-full w-full justify-start">
                <div className="flex flex-col h-full gap-4 border-r relative">
                    <div className="flex flex-col w-[38vw] h-full overflow-y-auto px-12 pb-24 py-8 gap-4">
                        {lines.map((l) => (
                            <LineCard key={l.id} line={l} selected={l.id == Number(lineId)}/>
                        ))}
                        <div className="flex h-40 w-1"/>
                    </div>
                    <NewLineButton/>
                </div>
                <LineMap line={line}/>
            </div>
        );
    }
  else
    return (
        <div className="flex flex-col h-full w-full relative">
          <div className="flex flex-col h-full w-full items-center overflow-y-auto">
            <ErrorToaster error={err}/>
            <p className="text-2xl font-bold pt-8">Lines</p>
            <div className="grid grid-cols-1 md:grid-cols-2 auto-rows-[minmax(7rem,auto)] w-[70vw] h-full gap-4 px-[5vw] py-8 self-center items-start content-start">
              {lines.map((l) => (
                  <LineCard key={l.id} line={l} selected={false}/>
              ))}
            </div>
          </div>
          <NewLineButton/>
        </div>
    );
}
