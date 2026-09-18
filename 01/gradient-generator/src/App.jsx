import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const App =() => {
	const [num, setNum] = useState(12)
	const [type, setType] = useState("linear")
	const [gradients, setGradients] = useState([])
	const getHexColorCode = ()=> {
		const rgb = 255*255*255
		const random = Math.random() * rgb
		const int = Math.floor(random)
		const hexCode = int.toString(16)		
		const colorHex = hexCode.padStart(6, "0")
		return `#${colorHex}`		
	}

	const generateGradient =()=> {
		const colors = []
		for (let i = 0; i < num; i++) {
			
			const color1 = getHexColorCode()
			const color2 = getHexColorCode()
			const degree = Math.floor(Math.random() * 360)
			console.log(degree, color1, color2);
			if (type === "linear"){
				colors.push({
					gradient: `linear-gradient(${degree}deg, ${color1}, ${color2})`,
					css: `background: linear-gradient(${degree}deg, ${color1}, ${color2});`
				})
			}else{
				colors.push({
					gradient: `radial-gradient(circle, ${color1}, ${color2})`,
					css: `background: radial-gradient(circle, ${color1}, ${color2});`
				})
			}
		}
		setGradients(colors);
			
	}


	const onCopy = (css) => {
		navigator.clipboard.writeText(css)
		toast.success("Gradient copied to clipboard", { position: "top-center" })

	}

	useEffect(()=>{
		generateGradient()
	}, [num, type])

  return (
	<div className="min-h-screen bg-white/90">
		<div className="w-9/12 mx-auto py-12 space-y-8"> 
			<div className="flex justify-between p-6 rounded-xl"
				style={
					{background: getHexColorCode()}
				}
			>
				<h1 className="text-3xl font-bold">
					🎨 Gradient generator 
				</h1>
				<div className="flex gap-4">
					<input 
					value={num}
					className="border border-slate-300 bg-white rounded-lg w-[100px] p-2"
					placeholder="12"
					onChange={(e)=>setNum(Number(e.target.value))}
					/>
					<select value={type}  className="border border-slate-300 bg-white rounded-lg w-[100px] p-2" onChange={(e)=>setType(e.target.value)} >
						<option value="linear">Linear</option>
						<option value="radial">Radial</option>
					</select>

					<button onClick={generateGradient} className="bg-blue-500 text-white rounded-lg px-4 py-2">Generate</button>

				</div>
			</div>

			<div className="grid grid-cols-4 gap-4">
				{
				gradients.map((item, index)=>(
					<div key={index} className="h-[180px]  rounded-xl relative" style={{background: item.gradient}}>
					
					<button onClick={() => onCopy(item.css)} className="bg-black/75 hover:bg-black text-white rounded hover:scale-105 cursor-pointer absolute bottom-3 right-3 text-[10px] py-1 px-2 ">Copy</button>

				</div>
				))
				}


			</div>
		</div>
		<ToastContainer />
	</div>
    );
}

export default App;
