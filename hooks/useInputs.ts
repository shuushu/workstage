import { useState } from 'react';

const useInputs = (initalForm) => {
    const [form, setForm] = useState(initalForm);
}

export {
    useInputs
}