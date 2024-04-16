import {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {Input} from "@/components/ui/input.jsx";

DebouncedInput.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
    debounce: PropTypes.number,
};

export default function DebouncedInput({value: initialValue, onChange, debounce = 500, ...props}) {
    const [value, setValue] = useState(initialValue);

    useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            onChange(value);
        }, debounce);

        return () => clearTimeout(timeout);
    }, [value]);

    return (
        <Input
            {...props}
            value={value}
            onChange={(e) => setValue(e.target.value)}
        />
    );
}
