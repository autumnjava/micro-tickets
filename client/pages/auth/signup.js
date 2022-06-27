import { useState } from 'react';
import axios from 'axios';

export default () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();
        const res = await axios.post('/api/users/signup', {
            email, password
        })

        console.log(res.data);
    }

    return (
        <form onSubmit={onSubmit}>
            <h1>Sign up</h1>
            <div className="form-group">
                <label>Email Adress</label>
                <input value={email} onChange={e => setEmail(e.target.value)} type="email" className="form-control" />
            </div>
            <div className="form-group">
                <label>Password</label>
                <input value={password} onChange={e => setPassword(e.target.value)} type="password" className="form-control" />
            </div>
            <button className="btn btn-primary">Sign up</button>
        </form>

    )
}