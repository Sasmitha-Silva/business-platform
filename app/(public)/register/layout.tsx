import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register Enterprise",
  description: "Join the Rotaract Business Network and get your enterprise verified.",
};

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
