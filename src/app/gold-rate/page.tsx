import { Metadata } from "next";
import { GoldRateClient } from "@/components/features/GoldRateClient";

export const metadata: Metadata = {
  title: "Today's Live Gold Rates | Bhagat Ji Jewels",
  description: "Check live gold, silver, platinum, and diamond benchmark rates. View real-time charts and set price alerts.",
};

export default function GoldRatePage() {
  return <GoldRateClient />;
}
