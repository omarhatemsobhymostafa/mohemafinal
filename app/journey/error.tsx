"use client";

import RouteError from "../components/shared/RouteError";

export default function JourneyError({ reset }: { reset: () => void }) {
  return <RouteError reset={reset} />;
}
