import React from 'react';
import {FormTextareaCompTypes} from "@/app/types/type";

const Textarea = (props: FormTextareaCompTypes) => {
    const { name, id, cols, rows, onChange, value, maxLength, className } = props;
    return (
        <>
            <textarea name={name}
                      id={id}
                      cols={cols}
                      rows={rows}
                      value={value}
                      onChange={onChange}
                      maxLength={maxLength}
                      className={className}
            ></textarea>
            <p className="text-[11px] text-gray-500">
                {value ? value.length : 0}/80자
            </p>
        </>
    );
}

export default Textarea;