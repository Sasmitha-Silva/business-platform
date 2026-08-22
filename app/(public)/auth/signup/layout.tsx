import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Account",
  description: "Create an account on the Rotaract Business Network.",
};

export default function SignUpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
