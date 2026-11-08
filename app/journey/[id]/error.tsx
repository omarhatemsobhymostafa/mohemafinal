"use client";

import RouteError from "../../components/shared/RouteError";

export default function WeekError({ reset }: { reset: () => void }) {
  return <RouteError reset={reset} />;
}
