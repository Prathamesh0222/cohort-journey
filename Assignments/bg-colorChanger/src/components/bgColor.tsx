import { useState } from "react";

export const BgColor = () => {
    const [color,setColor] = useState("white");
    
    const colors = [
        {name: "Red", value: "red"},
        {name: "Blue", value: "blue"},
        {name: "Green", value: "green"},
        {name: "Yellow", value: "yellow"},
        {name: "Purple", value: "purple"},

    ]

    const handleChangeColor = ({color}:{color:string}) => {
        setColor(color);
    }
    
    return <div className="flex flex-col justify-end h-screen duration-500 bg-black" style={{backgroundColor: color}}>
          <div className='fixed inset-x-0 flex flex-wrap justify-center px-2 bottom-12'>
          <div className='flex flex-wrap justify-center gap-3 px-3 py-2 text-black bg-white shadow-lg rounded-3xl'>
            {colors.map((color)=> (
                <button
                key={color.value}
                className={`outline-none duration-500 hover:scale-110 px-4 py-2 rounded-full bg-${color.value}-600`}
                style={{ backgroundColor: color.value }}
                onClick={() => handleChangeColor({ color: color.value })}
                >
                {color.name}
                </button>
            ))}
        </div>
        </div>  
    </div>
}
