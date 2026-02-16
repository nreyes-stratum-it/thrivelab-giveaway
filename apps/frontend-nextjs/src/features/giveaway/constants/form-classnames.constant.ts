export const inputClasses = {
    base: [
        "data-[hover=true]:opacity-100 ",
    ].join(" "),
    input: [
        "h-full",
        "font-semibold",
        "text-olive-700",
        "placeholder:font-thin",
        "placeholder:text-gray-400",

    ].join(" "),
    inputWrapper: [
        "min-h-16",
        "!rounded-lg",
        "border",
        "!border-olive-200",
        "data-[hover=true]:!border-olive-300",
        "group-data-[focus=true]:!border-olive-400",
        "data-[focus=true]:!border-olive-400",
        "!shadow-none",
        "transition-colors",
        "duration-200",
    ].join(" "),
    label: [
        "-top-[5%]",
        "px-2",
        "bg-background",
        "!text-olive-700",
        "!font-medium",
    ].join(" "),
}