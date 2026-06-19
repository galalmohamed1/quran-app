import { lazy, Suspense } from "react";

const HomeCom = lazy(() => import("@/components/Home/Index"));

export default function Home() {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<HomeCom />
		</Suspense>
	);
}
