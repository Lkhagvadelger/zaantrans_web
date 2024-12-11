import { useEffect, useState } from "react";

export const useAnalytics = () => {
  const [analytics, setAnalytics] = useState<{
    id: string;
    getFlag: (key: string) => string | boolean | undefined;
  }>();

  return analytics;
};
