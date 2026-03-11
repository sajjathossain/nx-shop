'use client'
import { CompoundComponent } from "./components/compound-component";

export default function TestPage() {
  return <CompoundComponent>
    <>
      <div className="w-dvw grid place-items-center">
        <CompoundComponent.Logo />
      </div>
      <CompoundComponent.Header />
      <div className="w-full mx-auto">
        <CompoundComponent.ActionCard />
      </div>
    </>
  </CompoundComponent>
}
