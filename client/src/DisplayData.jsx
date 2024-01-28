import React, { useState } from 'react';
import { useQuery, gql, useLazyQuery, useMutation } from '@apollo/client';

function DisplayData() {
    const [searchedData, setSearchedData] = useState("");

    const [name, setName] = useState("")
    const [age, setAge] = useState()
    const [username, setUsername] = useState("")
    const [nationality, setNationality] = useState("")

    const QUERY_ALL_USERS = gql`
        query getAllUsers {
            users {
                id
                name
                username
                age
            }
        }
    `;

    const QUERY_ALL_MOVIES = gql`
        query getAllMovies {
            movies {
                id
                name
                year
                isInTheaters
            }
        }
    `;

    const QUERY_MOVIE_BY_NAME = gql`
    query getMovieByName($name: String!){
        movie(name: $name) {
          name
          year
          isInTheaters
        }
      }
    `;

    const CREATE_USER_MUTATION = gql`
     mutation CreateUser($input: CreateUserInput!){
        createUser(input: $input) {
          name
          username
          age
          nationality
        }
      }
     `;

    const { data, loading, refetch } = useQuery(QUERY_ALL_USERS);
    const { data: movieData } = useQuery(QUERY_ALL_MOVIES);

    const [fetchMovie, { data: movieSearchedData, error: movieSearchError }] = useLazyQuery(QUERY_MOVIE_BY_NAME);
    const [CreateUser] = useMutation(CREATE_USER_MUTATION)
    if (loading) return <h1>Loading....</h1>;
    if (movieSearchError) console.log(movieSearchError);

    return (
        <div>
            <div>
                <input type="text" placeholder='Name' onChange={(e) => setName(e.target.value)} />
                <input type="number" placeholder='Age' onChange={(e) => setAge(e.target.value)} />
                <input type="text" placeholder='Username' onChange={(e) => setUsername(e.target.value)} />
                <input type="text" placeholder='Nationality' onChange={(e) => setNationality(e.target.value.toUpperCase())} />
                <button
                    onClick={() => {
                        CreateUser({
                            variables: {
                                input: { name, username, age:Number(age), nationality },
                            },
                        })
                            .then(() => {

                                refetch();
                            })
                            .catch((error) => {
                                console.error('Error creating user:', error);
                            });
                    }}
                >
                    Create User
                </button>
            </div>
            <h1>User Data</h1>
            {data && data.users.map((item) => (
                <ul key={item.id}>
                    <li>{item.id}</li>
                    <li>{item.name}</li>
                    <li>Age:{item.age}</li>
                    <li>{item.username}</li>
                </ul>
            ))}
            <hr />

            {movieData && movieData.movies.map((item) => (
                <ul key={item.id}>
                    <li>{item.id}</li>
                    <li>{item.name}</li>
                    <li>{item.year}</li>
                    <li>{item.isInTheaters}</li>
                </ul>
            ))}
            <input type="text" onChange={(e) => setSearchedData(e.target.value)} />
            <button onClick={() => fetchMovie({ variables: { name: searchedData } })}>Fetch Data</button>
            <div>
                {movieSearchedData && (
                    <div>
                        <h2>{movieSearchedData.movie.name}</h2>
                        <h2>{movieSearchedData.movie.year}</h2>
                        <h2>{movieSearchedData.movie.isInTheaters}</h2>
                    </div>
                )}
            </div>
        </div>
    );
}

export default DisplayData;
