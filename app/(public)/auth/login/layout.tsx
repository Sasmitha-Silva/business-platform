import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Member Login",
  description: "Sign in to your Rotaract Business Network founder dashboard.",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
