"use client";

import RouteError from "../components/shared/RouteError";

export default function ProductError({ reset }: { reset: () => void }) {
  return <RouteError reset={reset} />;
}
