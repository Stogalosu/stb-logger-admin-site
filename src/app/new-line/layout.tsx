import { NewLineProvider } from "./_context/new-line-context";

export default function NewLineLayout({ children }: { children: React.ReactNode }) {
    return <NewLineProvider>{ children }</NewLineProvider>;
}