import React from "react";

export default function Button({
    children,
    type = "button",
    bgColor = "bg-main-color",
    textColor = "text-white",
    className = "",
    disabled = false,
    ...props
}) {
    return (
        <button className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className} rounded-3xl`} disabled={disabled} {...props}>
            {children}
        </button>
    );
}