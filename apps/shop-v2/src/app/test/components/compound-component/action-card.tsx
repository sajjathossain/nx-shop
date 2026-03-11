import { useState } from "react"

export const ActionCard = () => {
  const [isActive, setIsActive] = useState(false)
  const [isDone, setIsDone] = useState(false)

  return <div className="w-full bg-white rounded-lg shadow-md grid place-items-center p-4">
    <button className="relative grid place-items-center">
      <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500" className="w-48 aspect-square rounded-full grayscale" alt="product" />
      <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500" className="w-36 aspect-square rounded-full absolute" alt="product" />
    </button>

    <h3>Press to begin</h3>
    <h6>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quos, voluptatem tempore explicabo beatae obcaecati provident nobis pariatur placeat doloribus neque?</h6>
  </div>
}
