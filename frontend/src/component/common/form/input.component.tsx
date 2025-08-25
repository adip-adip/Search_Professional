export type TextInputProps =  {
    name : string
}

export type InputLabelProps = {
    htmlFor : string,
    label :string
}



export const InputLabelCompnent = ({htmlFor, label} : InputLabelProps) => {
    return(<>
        <label htmlFor={htmlFor} className="block text-sm font-medium mb-1">{label}</label>
    </>)
}


export const TextInputComponent = ( {name} :  TextInputProps) => {
    return(<>
        <input
            type="text"
            id={name}
            name = {name}
            className="w-full px-4 py-3 bg-[#222831] border rounded focus:outline-none focus:ring-2 focus:ring-[#00ADB5] text-[#EEEEEE] transition-all"
        />
        
    </>)
}