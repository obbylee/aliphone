import GlobalFooter from "@/components/shared/global-footer";
import GlobalHeader from "@/components/shared/global-header";
import React from "react";

export default function CatalogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <GlobalHeader />
      {children}
      <GlobalFooter />
    </>
  );
}
