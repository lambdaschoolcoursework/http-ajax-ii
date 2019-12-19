import React, {useState, useEffect} from 'react';
import axios from 'axios';

const UpdateMovie = props => {
    const [edit, setEdit] = useState({title: '', director: '', metascore: '', stars: [], poster: ''});

    useEffect(() => {
        axios.get(`http://localhost:5000/api/movies/${props.match.params.id}`)
            .then(res => {
                setEdit(res.data)
            })
            .catch(err => console.log(err));
    }, [props.match.params.id]);

    const onChange = e => {
        e.persist();
        // ???
        setEdit({
            ...edit,
            [e.target.name]: e.target.value
        });
    };

    const onSubmit = e => {
        e.preventDefault();
        axios.put(`http://localhost:5000/api/movies/${props.match.params.id}`, edit)
            .then(res => {
                props.history.push('/');
            })
            .catch(err => console.log(err));
    };

    return(
        <>
            <div className='edit-movie-container'>
                <h2>Edit Movie Details</h2>
                <form onSubmit={onSubmit}>
                    <label htmlFor='title'>Title</label>
                    <input type="text" name="title" onChange={onChange} value={edit.title}/>
                    
                    <label htmlFor='director'>Director</label>
                    <input type="text" name="director" onChange={onChange} value={edit.director}/>
                    
                    <label htmlFor='metascore'>Metascore</label>
                    <input type="text" name="metascore" onChange={onChange} value={edit.metascore}/>
                    
                    {/* <label htmlFor='cast'>Cast</label> */}
                    {/* <input type="text" name="cast" onChange={onChange} value={edit.stars}/> */}
                    {/* will deal with this later */}
                    
                    <label htmlFor='poster'>Poster</label>
                    <input type="text" name="poster" onChange={onChange} value={edit.poster}/>
                    
                    <button type='submit'>Update</button>
                </form>
            </div>
        </>
    );
};

export default UpdateMovie;