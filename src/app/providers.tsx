"use client";
import { Next13ProgressBar } from "next13-progressbar";
import React from "react";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
        <Next13ProgressBar
          height="4px"
          color="#fff"
          options={{ showSpinner: true }}
          showOnShallow
        />

        {children}
    </>
  );
};

export default Providers;
