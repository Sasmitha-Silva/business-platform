import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Directory",
  description: "Browse verified Rotaract businesses, professionals, and corporate leaders.",
};

export default function DirectoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
