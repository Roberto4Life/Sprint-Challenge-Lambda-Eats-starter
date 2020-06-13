import React, {useState, useEffect} from 'react';
import axios from 'axios';
import * as Yup from 'yup';

const Pizza = () => {

    const[buttonDisabled, setButtonDisabled] = useState(true);

    const [formState, setFormState] = useState({
        name: '',
        size:'',
        Pepperoni: false,
        Sausage: false,
        Ham: false,
        Bacon: false,
        instruct: ''
    });

    const [errors, setErrors] = useState({
        name: '',
        size: ''
    });
    
    const sizes = ['Small', 'Medium', 'Large', 'XLarge']
    const top = ['Pepperoni', 'Sausage', 'Ham', 'Bacon']

    const formSchema = Yup.object().shape({
        name: Yup.string().min(2, 'Must be at least two characters long'),
        size: Yup.mixed().oneOf(sizes)
    })

    useEffect(() => {
        formSchema.isValid(formState).then(valid => {
            setButtonDisabled(!valid);
        });
    }, [formState]);

    const [post, setPost] = useState([]);

    const formSubmit = e => {
        e.preventDefault();
        axios
            .post("http://reqres.in/api/users", formState)
            .then(res => {
                setPost(res.data);
                console.log("submit", post.data)
                setFormState({
                    name: '',
                    size:'',
                    top: '',
                    instruct: ''
                });
            })
            .catch(err => console.log(err.res));
    };

    const validateChange = e => {
        if(e.target.name === 'name' || e.target.name === 'size'){
            Yup
            .reach(formSchema, e.target.name)
            .validate(e.target.value)
            .then(valid => {
                setErrors({...errors, [e.target.name]: ''});
            })
            .catch(err => {
                setErrors({...errors, [e.target.name]: err.errors[0]});
            });
        };

    }

    const inputChange = e => {
        e.persist();
        const newFormData = {
            ...formState,
            [e.target.name]:
                e.target.type === "checkbox" ? e.target.checked : e.target.value
        };

        validateChange(e);
        setFormState(newFormData)
    }

    return (
        <form onSubmit={formSubmit}>
            <h2>Create Your Own Pizza!</h2>
            <label htmlFor='name'>
                Name:
                <input
                    type='text'
                    id='name'
                    name='name'
                    data-cy="name"
                    value={formState.name}
                    onChange={inputChange} 
                />
                {errors.name.length > 0 ? <p className='error'>{errors.name}</p> : null}
            </label>
            <br />
            <label htmlFor='size'>
                Size:
                <select 
                    id='sizes' 
                    name='size' 
                    data-cy="dropdown"
                    value={formState.size}
                    onChange={inputChange} >
                        {sizes.map(size => {
                            return (
                                <option value={size}>{size}</option>
                            )
                        })}
                
                </select>
            </label>
            <br />
            <label htmlFor='top'>
                Toppings:
                    {top.map(top => {
                        return (
                            <label htmlFor={top}>{top}
                                <input type='checkbox' name={top} checked={formState.top} onChange={inputChange}/>
                            </label>
                        )
                    })}
            </label>
            <br />
            <label htmlFor='instruct'>
                Special Instructions:
                <input
                    type='text'
                    id='instruct'
                    name='instruct'
                    data-cy='text'
                    value={formState.instruct}
                    onChange={inputChange} 
                />
                {errors.name.length > 0 ? <p className='error'>{errors.name}</p> : null}
            </label>
            <pre>{JSON.stringify(post)}</pre>
            <button data-cy="submit" disabled={buttonDisabled}>GET PIZZA!</button>
        </form>
    );
}

export default Pizza