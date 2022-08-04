import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_MEMORY } from '../../utils/mutations';
import { QUERY_MEMORIES, QUERY_ME } from '../../utils/queries';

import Auth from '../../utils/auth';

const MemoryForm = () => {
  const [memoryTitle, setMemoryTitle] = useState('');

  const [memoryText, setMemoryText] = useState('');

  const [characterCount, setCharacterCount] = useState(0);

  const [addMemory, { error }] = useMutation(ADD_MEMORY, {
    update(cache, { data: { addMemory } }) {
      try {
        const { memories } = cache.readQuery({ query: QUERY_MEMORIES });

        cache.writeQuery({
          query: QUERY_MEMORIES,
          data: { memories: [addMemory, ...memories] },
        });
      } catch (e) {
        console.error(e);
      }

      
      const { me } = cache.readQuery({ query: QUERY_ME });
      cache.writeQuery({
        query: QUERY_ME,
        data: { me: { ...me, memories: [...me.memories, addMemory] } },
      });
    },
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addMemory({
        variables: {
          memoryTitle,
          memoryText,
          memoryAuthor: Auth.getProfile().data.username,
        },
      });

      setMemoryTitle('');
      setMemoryText('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'memoryText' && value.length <= 280) {
      setMemoryText(value);
      setCharacterCount(value.length);
    }
    if (name === 'memoryTitle') {
      setMemoryTitle(value);
    }
  };

  return (
    <div className='memForm'>
      <h3>What Experience do you want to share</h3>

      {Auth.loggedIn() ? (
        <>
          <p
            className={`m-0 ${
              characterCount === 280 || error ? 'text-danger' : ''
            }`}
          >
            Character Count: {characterCount}/280
          </p>
          <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12 col-lg-9">
              <textarea
                name="memoryTitle"
                placeholder="title"
                value={memoryTitle}
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={handleChange}
                >
              </textarea>
              <textarea
                name="memoryText"
                placeholder="Share a new memory"
                value={memoryText}
                className="form-input w-100"
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="col-12 col-lg-3">
              <button className="btn btn-primary btn-block py-3 submitBtn" type="submit">
                Experience a memory
              </button>
            </div>
            {error && (
              <div className="col-12 my-3 bg-danger text-white p-3">
                {error.message}
              </div>
            )}
          </form>
        </>
      ) : (
        <p>
          You need to be logged in to add memories. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default MemoryForm;
