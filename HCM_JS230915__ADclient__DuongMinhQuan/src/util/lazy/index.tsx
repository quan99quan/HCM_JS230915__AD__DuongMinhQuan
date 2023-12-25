import { lazy, Suspense } from "react";
import FallBack from "./components/FallBack";

const lazyFn = (importFn: any, access: boolean = true, fallback: string | null = null) => {
  if(!access) {
    return () => {
      return <FallBack fallback={fallback}/>
    }
  }
  const LazyComponent = lazy(importFn)
  return () => (
    <Suspense fallback={<div style={{color: "red"}}>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
};

export default lazyFn